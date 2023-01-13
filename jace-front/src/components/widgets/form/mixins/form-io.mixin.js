import moment from "moment"
import { template, templateSettings } from "lodash"
import script from "./dps/dps-scripts" 



export default {

    methods: {

        randomName: () => Math.random().toString(36).substring(2),

        createForm(form) {
            form.id = this.randomName()
            form.updatedAt = new Date()
            form.createddAt = new Date()

            return this.$dps.run({
                script: script["formCreateOrReplace"], //_dps.createForm,
                state: { form: form }
            }).then(res => res.data[0])

        },

        cloneForm(form) {
            let f = JSON.parse(JSON.stringify(form))
            f.config.cloned = form.id;
            f.metadata.app_url.value = location.href;
            f.id = this.randomName()
            f.updatedAt = new Date()
            f.createdAt = new Date()
            delete f._id;
            // delete f.updatedAt;
            // delete f.createdAt;

            return this.$dps.run({
                script: script["formCreateOrReplace"], //_dps.createForm,
                state: { form: f }
            }).then(res => res.data[0])

        },

        loadForm(formId) {

            return this.$dps.run({
                script: script["formGet"], //_dps.getForm,
                state: { form: formId }
            }).then(res => res.data[0])

        },

        updateForm(form) {
            
            form.updatedAt = new Date()
            delete form._id

            return this.$dps.run({
                script: script["formCreateOrReplace"], //_dps.updateForm,
                state: { form: form }
            }).then(res => res.data[0])

        },

        extendForm(form) {
            
            form.updatedAt = new Date()
            delete form._id
            
            return this.$dps.run({
                script: script["formExtend"], //_dps.extendForm,
                state: { form: form }
            })
        },

        deleteForm(formId) {

            return this.$dps.run({
                script: script["formDelete"], //_dps.deleteForm,
                state: { form: formId }
            })

        },

        exportForm() {

            let questions = this.$djvue
                .selectWidgets(this.$root, widget => (widget.config) && widget.config.type == "question-widget")
                .map(q => {
                    let res = JSON.parse(JSON.stringify(q.config))
                    res.question.options = JSON.parse(JSON.stringify(q.$refs.instance.options))
                    return res
                })

            let a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(questions, null, '\t')));
            a.setAttribute('download', 'form_config.json');
            a.click()

            // this.$dps.run({
            //   script: _dps.exportForm,
            //   state: { form: questions }
            // }).then( res => {
            //   window.location.href = this.app.config.dpsURL+res.data.url
            // })      


        },

        findUserProfile(email) {

            return this.$dps.run({
                script: script["userFind"], //_dps.findUserProfile,
                state: { email: email }
            }).then(res => res.data)

        },

        loadAnswer(user, formId) {
            return this.$dps.run({
                script: script["answerGet"], //_dps.getAnswer,
                state: {
                    user: user,
                    form: formId
                }
            }).then(res => {
                if (res.data) return res.data
                return {
                    form: formId,
                    user: user,
                    data: []
                }
            })
        },

        updateAnswer(answer) {

            answer.id = this.randomName()
            answer.updatedAt = new Date()
            delete answer._id

            return this.$dps.run({
                script: script["answerUpdate"], //_dps.updateAnswer,
                state: { answer: answer }
            })

        },

        exportResponses(form_id) {
            return this.$dps.run({
                script: script["answerExport"], //_dps.exportResponses,
                state: { form: form_id }
            }).then(res => this.app.config.dpsURL + res.data.url)
        },

        sendMails(users, _template) {
            let state = {}
            let script = "";

            // users
            //   .forEach((u, index) => {
            //     script += `sendmail({{o${index}}});
            //     `
            //   })

            // set {{}} template delimiters 
            templateSettings.interpolate = /{{([\s\S]+?)}}/g;

            users
                .forEach((u, index) => {

                    script += `sendmail({{o${index}}});
            `
                    state[("o" + index)] = {
                        to: u.email,
                        subject: "DJVUE Forms Service notiification",
                        html: template(_template)(u.context)
                    }
                })

            // back to default template delimiters
            templateSettings.interpolate = /<%=([\s\S]+?)%>/g;


            // TODO Comments 3 lines below for production mode
            // return new Promise((resolve) => {
            //  resolve({script:script, state:state})
            // }) 




            return this.$dps.run({
                script: script,
                state: state
            })

        },

        getStat(formId) {

            return new Promise((resolve, reject) => {
                this.$dps.run({
                    script: script["statGet"], //_dps.getStat,
                    state: {
                        form: formId
                    }
                }).then(res => {
                    if (res.type == "error") {
                        reject(res.data)
                    } else {
                        resolve(res.data)
                    }
                })
            })

        },

        round(date, start, level, value) {
            let defFormat = "YYYY-MM-DD HH:mm";

            let lo = moment(start).startOf(level).format(defFormat)
            let hi = moment(lo).add(value, level).format(defFormat)
            while (!(moment(date).isSameOrAfter(lo) && moment(date).isSameOrBefore(hi))) {
                lo = hi;
                hi = moment(lo).add(value, level).format(defFormat);
            }

            let dLo = moment(date).diff(lo)
            let dHi = -moment(date).diff(hi)
            return (dLo < dHi) ? lo : hi
        },

        getResponseDynamic(r) {
            let responses = r.events.timeline;
            //responses.push({date: new Date()})

            let defFormat = "YYYY-MM-DD HH:mm";
            // let inputFormat = "DD/MM/YY HH:mm";


            let RStat = responses
                .map(item => moment(new Date(item.date)))
                .sort((a, b) => a.diff(b))
                .map(item => item.format(defFormat))

            RStat.push(moment(new Date()).format(defFormat))

            let p = [
                ['m', 1],
                ['m', 5],
                ['m', 10],
                ['m', 15],
                ['m', 20],
                ['m', 30],
                ['h', 1],
                ['h', 2],
                ['h', 4],
                ['h', 12],
                ['d', 1],
                ['d', 3],
                ['d', 7],
                ['M', 1],
                ['M', 3],
                ['M', 6],
                ['y', 1],
                ['y', 2],
                ['y', 5],
                ['y', 10]
            ]


            let getPoints = (start, stop, level, value) => {
                let res = [];
                start = moment(start).add(-value, level).format(defFormat);
                stop = moment(new Date()).format(defFormat);

                let lo = moment(start).startOf(level).format(defFormat)
                let hi = moment(lo).add(value, level).format(defFormat)
                res.push(lo)
                while (!(moment(stop).isSameOrAfter(lo) && moment(stop).isSameOrBefore(hi))) {
                    lo = hi;
                    hi = moment(lo).add(value, level).format(defFormat);
                    res.push(lo)
                }
                res.push(hi)
                return res;
            }



            let titleFormat = {
                'm': ['HH:mm', ''],
                'h': ['DD.MM HH:', '00'],
                'd': ['DD.MM', ''],
                'M': ['MM.YY', ''],
                'y': ['YYYY', '']
            }

            let u;

            for (u of p) {
                if ((moment(RStat[RStat.length - 1]).diff(RStat[0], u[0]) / u[1]) <= 24) break;
            }

            this.u = u;

            if (moment(RStat[RStat.length - 1]).diff(RStat[0], u[0]) < 1) return;

            RStat.splice(RStat.length - 1, 1)

            RStat = RStat.map(
                item => this.round(item, RStat[0], u[0], u[1])
            );

            let points = getPoints(RStat[0], RStat[RStat.length - 1], u[0], u[1]);

            let stats = points.map(item => RStat.filter(t => moment(t).isSame(item, u[0])).length)
            let sum = stats.reduce((item, sum) => { return sum + item })


            if (sum == 0) {
                stats = stats.map(() => 0)
            } else {
                stats = stats.map(item => item) //sum )
            }

            let max = stats.reduce((item, max) => { return (max > item) ? max : item })

            RStat = points.map((item, index) => {
                return {
                    title: moment(item).format(titleFormat[u[0]][0]) + titleFormat[u[0]][1],
                    value: stats[index],
                    height: (max > 0) ? stats[index] / max : 0
                }
            })

            this.points = points;
            // console.log(RStat)
            return RStat;
        }

    }
}