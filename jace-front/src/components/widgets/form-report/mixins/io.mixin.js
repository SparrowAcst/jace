import { templateSettings, template } from "lodash"
import moment from "moment"


let _dps = {

  createForm: `
            // createForm 
            client();
            set("owner")
            <?javascript
                $scope.form = {
                    metadata: $scope.form.metadata,
                    config: $scope.form.config,
                    owner:$scope.owner.client.user,
                    history:[
                        {
                            state:"created",
                            message:"Create form via "+$scope.owner.client.app,
                            user: $scope.owner.client.user,
                            date: new Date()
                        }
                    ]
                }
            ?>
            dml.insert(into:"form", values:{{form}})
        `,

    cloneForm: `
            // cloneForm 
            client();
            set("owner")
            <?javascript
                $scope.form.owner = $scope.owner.client.user;
                $scope.form.history.push({
                            state:"created",
                            message:"Clone form via "+$scope.owner.client.app,
                            user: $scope.owner.client.user,
                            date: new Date()
                })
            ?>
            dml.insert(into:"form", values:{{form}})
        `,    

  updateForm: `
        // updateForm
            client();
            set("owner")

            <?javascript

                $scope.updatedForm = (item) => item.id == $scope.form.id;
                $scope.update = (item) => {
                    
                    // $scope.form.history.push({
                    //     date: new Date(),
                    //     message:"Update form",
                    //     state:"updated",
                    //     user: $scope.owner.client.user
                    // });
                    
                    return $scope.form;
                };

            ?>

            dml.update(for:"form", as:{{update}}, where:{{updatedForm}})
        `,

  extendForm: `
        // extendForm
            <?javascript
    
                $scope.updatedForm = (item) => item.id == $scope.form.id;
                
                $scope.extendNominals = (form) => {
                  
                  if (!form.config.questions) return form

                  form.config.questions.forEach( q => {
                    let fromForm = _.find($scope.form.config.questions, ff => ff.id == q.id)
                    if(fromForm && fromForm.options.nominals){
                      q.options.nominals = (q.options.nominals || []).concat(fromForm.options.nominals)
                      q.options.nominals = _.unique(q.options.nominals,'id')  
                    }
                  })
                  
                  return form
                }
    
            ?>


            dml.update(for:"form", as:{{extendNominals}}, where:{{updatedForm}})


            
        `,


  getForm: `
            // getForm
            <?javascript
                $scope.filter = (item) => item.id == $scope.form;
            ?>

            dml.select(from:"form", where:{{filter}}, populate:"project")
        `,



  deleteForm: `
            // deleteForm
            <?javascript
                $scope.filter = (item) => item.id == $scope.form;
            ?>

            dml.delete(from:"form", where:{{filter}})
    `,

  exportForm:`
      get("form")
      export("formExport.json")
  `,  

  updateAnswer: `
            // updateAnswer
            dml.insertOrUpdate(into:"answer", value:{{answer}})
    `,

  getAnswer: `
      // getAnswer
      
      <?javascript

        $scope.forUser = item => {
        
            if(!$scope.form) return false;
                     
            if($scope.user.apikey){
                return (item.form == $scope.form) && (item.user.apikey == $scope.user.apikey);
            }
            
            if($scope.user.id){
                return (item.form == $scope.form) && (item.user.id == $scope.user.id);
            }
            
            return false;
        }    
              
        $scope.byDate = _util.comparator.Date["Z-A"](item => item.updatedAt)

      ?>

      dml.select(from:"answer",where:{{forUser}})
      c.order(by:"updatedAt")
      set("res")
      return("res[0]")

    `,
    loadResponseStat:
    `
        <?javascript
          $scope.f = item => item.form == $scope.form;
          $scope.map = (item,index) => {return {date:item.updatedAt,v:1}};
          $scope.sort = _util.comparator.Date["A-Z"](item => item.date);
        ?>

        dml.select(from:"answer", where:{{f}}, as:{{map}})
        // json()
        c.order(by:"date")
    `,
    exportResponses:`

<?javascript
    // $scope.form = "5c38b9a9327cb41c1df5d8ea"
    $scope.forForm = item => $scope.form && (item.form == $scope.form);
    $scope.filter = (item) => item.id == $scope.form;
    $scope.byDate = _util.comparator.Date["A-Z"](item => item.updatedAt);
?>

dml.select(from:"answer",where:{{forForm}})
c.order(by:"updatedAt")
set("responses")

dml.select(from:"form", where:{{filter}})
set("form")

<?javascript
    $scope.form = $scope.form[0]
    
    
    $scope.responses = $scope.responses.map( (r, index) => ({
        response_id: r.id
        ,form: r.form
        ,access: r.updatedAt
        ,respondent_id: (r.user.id) ? r.user.id : null
        ,respondent_apikey: (r.user.apikey) ? r.user.apikey : null
        ,respondent_index: (!r.user.id && !r.user.apikey) ? index : null
        ,data: r.data
    }));
    
    
    
    let rawData = []
    $scope.responses.forEach( r => {
        if(r.data)
            r.data.forEach( q => {
                let q_desc = _.find($scope.form.config.questions, qd => qd.id == q.id)
                rawData.push({
                     response_id: r.response_id
                    ,response_valid: r.response_valid
                    ,form: r.form
                    ,access: r.access
                    ,respondent_id: r.respondent_id
                    ,respondent_apikey: r.respondent_apikey
                    ,respondent_index: r.respondent_index
                    ,question_id: q.id
                    ,question_type: q.type
                    ,question_required: (q_desc) ? q_desc.options.required : null
                    ,response_valid: q.valid
                    ,question_title: (q_desc) ? q_desc.options.title : null
                    ,question_note: (q_desc) ? q_desc.options.note : null
                    ,data: q.data
                })          
            })
    })
    
    rawData = rawData.filter( 
        r => _.find($scope.form.config.questions, qd => r.question_id == qd.id)
    );
    
    let rawData1 = []
    
    rawData.forEach( r => {
        r.data.forEach( d => {
            
            let conf = _.find($scope.form.config.questions, q => q.id == r.question_id)
            
            let nominal = null;
            let entity_1 = null;
            let entity_2 = null;
            let factor = null;
            let effect = null;
            let value = null;
            let min = null;
            let max = null;
            let nominal_title = null;
            let entity_1_title = null;
            let entity_2_title = null;
            let factor_title = null;
            let effect_title = null;
            let value_title = null;
            let v;
            
            switch (r.question_type) {
              
                case 'One of many selection' : 
                case 'Many of many selection' : 
                    let n = _.find(conf.options.nominals, n => n.id == d)
                
                    nominal = d;
                    nominal_title = n.title
                    value = true;
                    break
              
                case 'Association' : 
                    let e1 = _.find(conf.options.entities, n => n.id == d.e1)
                    let e2 = _.find(conf.options.entities, n => n.id == d.e2)
                    v = conf.options.scale[d.value-1]
                    entity_1 = d.e1;
                    entity_1_title = e1.title
                    entity_2 = d.e2;
                    entity_2_title = e2.title
                    value = d.value;
                    value_title = (v) ? (v.title) ? v.title : null : null
                    break
                    
                case 'Influence' : 
                    let f = _.find(conf.options.factors, n => n.id == d.e1)
                    let e = _.find(conf.options.effects, n => n.id == d.e2)
                    v = conf.options.scale[d.value-1]
                    
                    factor = d.e1;
                    factor_title = f.title
                    effect = d.e2;
                    effect_title = e.title
                    value = d.value;
                    value_title = (v) ? (v.title) ? v.title : null : null
                    break
                    
                case 'Range':
                    min = d[0];
                    max = d[1];
                    value = true;
                    break
                    
                case 'Date':
                    value = d
                    break    
                
                case 'Rate':
                    v = conf.options.scale[d-1]
                    value = d
                    value_title = v.title
                    break
            }
            
            
            rawData1.push({
                 response_id: r.response_id
                ,response_valid: r.response_valid
                ,form: r.form
                ,access: r.access
                ,respondent_id: r.respondent_id
                ,respondent_apikey: r.respondent_apikey
                ,respondent_index: r.respondent_index
                ,question_id: r.question_id
                ,question_type: r.question_type
                ,question_required: r.question_required
                ,question_valid: r.question_valid
                ,question_title: r.question_title
                ,question_note: r.question_note
                ,nominal 
                ,nominal_title
                ,entity_1
                ,entity_1_title
                ,entity_2
                ,entity_2_title
                ,factor
                ,factor_title
                ,effect
                ,effect_title
                ,min
                ,max
                ,value
                ,value_title
                
            })
        })
    })
    
    $scope.rawData = rawData1.filter(r => r.value != null)
    $scope.filename = $scope.form.id + "_" + _util.format.date(new Date(),"YYYY_MM_DD_HH_mm") + "_responses.csv";
    
?>
get("rawData")
export({{filename}})



    `,
    loadAllResponses:
    `
      // loadAllResponses    
        <?javascript
            $scope.forForm = (item) => item.form == $scope.form_id;
            $scope.isForm = (item) => item.id == $scope.form_id;

            // $scope.filename = $scope.form_id+"_"+_util.format.date(new Date(),"YYYY_MM_DD_HH_mm")+"_responses.csv";
        ?>

        dml.select(from:"answer", where:{{forForm}})
        set("answers")
        dml.select(from:"form", where:{{isForm}})
        set("form")

        <?javascript

        let questions = $scope.form[0].config.questions;

        let answers = $scope.answers.map ((a) => {
          a.data = _.pairs(a.data).map(d => {
            d[1].title = questions[d[0]].options.title;
            
            d[1].id = d[0];
            
            if (!d[1].value) {
              return d[1]
            }
            
            if( ["influences"].indexOf(d[1].type) >=0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: v.property,
                  property_title: questions[d[0]].options.properties[v.property].title,
                  value:v.value
                }
              }) 
            }

            if( ["pairs","radiopairs"].indexOf(d[1].type) >=0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: v.property,
                  property_title: questions[d[0]].options.properties[v.property].title,
                  value:1
                }
              }) 
            }

            if( ["radio","check","dropdown"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v,
                  entity_title: questions[d[0]].options.nominals[v].title,
                  property_id: "",
                  property_title:"",
                  value:1
                }
              }) 
            }
            
            if( ["scales"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: "",
                  property_title:"",
                  value:v.value
                }
              }) 
            }
            
            
            if( ["text","rate","range","datetime","scale"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: "",
                  entity_title: "",
                  property_id: "",
                  property_title:"",
                  value:(d[1].type=="datetime")? _util.format.date(new Date(v), "DD/MM/YY HH:mm") : v
                }
              }) 
            }
            
            return d[1];
          })
          return a;
        });





        let responses = [];

        answers = answers.forEach( a => {
            a.data.forEach( d => {
              if(d.value){
                d.value.forEach( v => {
                    responses.push({
                      response_id:a.id,
                      updatedAt: _util.format.date(a.updatedAt, "DD/MM/YY HH:mm"),
                      form:a.form,
                      respondent:(a.user.email)? a.user.email : "",
                      question_id: d.id,
                      question_title: d.title,
                      question_type: d.type,
                      valid:(d.valid)? 1 : 0,
                      entity_id: v.entity_id,
                      entity_title:v.entity_title,
                      property_id:v.property_id,
                      property_title:v.property_title,
                      value:v.value     
                    })
                  })    
              } 
            })
        });

        $scope.responses = responses;

        ?>

        get("responses")

    `,
    findUserProfile: `
      // <?javascript
      //     $scope.email = "annakukharuk@gmail.com";
      //     $scope.email = "ishchenko.kpi@gmail.com";
      // ?>

      profile.find({{email}})
    `,
    getStat:`

// getStat

<?javascript
    // $scope.form = "5c24becd327cb41c1df5d85f"
    $scope.forForm = item => $scope.form && (item.form == $scope.form);
    $scope.filter = (item) => item.id == $scope.form;
    $scope.byDate = _util.comparator.Date["A-Z"](item => item.updatedAt);
    $scope.stat = {};
?>

dml.select(from:"answer",where:{{forForm}})
c.order(by:"updatedAt")
set("responses")
dml.select(from:"form", where:{{filter}})
set("form")

<?javascript
    
    $scope.stat.events = {
        total: $scope.responses.length,
        range: {
          min: $scope.responses[0].updatedAt,
          max: $scope.responses[$scope.responses.length-1].updatedAt
        },
        timeline: $scope.responses.map( r => ({
                        user: r.user,
                        date: r.updatedAt
                    }))
    }; 

?>

<?javascript

    let questions = $scope.form[0].config.questions;

    $scope.stat.questions = questions.map( q => ({
        id: q.id,
        responses: $scope.responses.map( r => {
            let f = _.find(r.data, a => a.id == q.id) 
            return (f) ? (f.data) ? f.data : null : null
        })
    }))


?>

return("stat")

    `,

getFormList:`
  <?javascript
    $scope.filter = item => true;
    $scope.mapper = item => ({id: item.id, metadata: item.metadata})
  ?>

  dml.select(from:"form", where:{{filter}}, map:{{mapper}})
`    


}


export default {

  methods:{


    loadFormList(){
      return this.$dps.run({
        script: _dps.getFormList,
        state: {}
      }).then(res => res.data)
    },
    
    createForm(form) {
      return this.$dps.run({
        script: _dps.createForm,
        state: { form: form }
      }).then(res => res.data[0])

    },

    cloneForm(form) {
      let f = Object.assign({}, form);
      f.config.cloned = form.id;
      f.metadata.app_url.value = location.href;
      delete f.id;
      delete f.updatedAt;
      delete f.createdAt;
      
      return this.$dps.run({
        script: _dps.cloneForm,
        state: { form: f }
      })

    },

    loadForm(formId) {

      return this.$dps.run({
        script: _dps.getForm,
        state: { form: formId }
      }).then(res => res.data[0])

    },

    updateForm(form) {

      return this.$dps.run({
        script: _dps.updateForm,
        state: { form: form }
      }).then(res => res.data[0])

    },

    extendForm(form) {
      return this.$dps.run({
        script: _dps.extendForm,
        state: { form: form }
      })
    },

    deleteForm(formId) {

      return this.$dps.run({
        script: _dps.deleteForm,
        state: { form: formId }
      })

    },

    exportForm(){
      
      let questions = this.$djvue
        .selectWidgets( this.$root, widget => (widget.config) && widget.config.type == "question-widget" )
        .map( q => {
          let res = JSON.parse(JSON.stringify(q.config))
          res.question.options = JSON.parse(JSON.stringify(q.$refs.instance.options))
          return res
        })

      let a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(JSON.stringify(questions,null,'\t')));
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
        script: _dps.findUserProfile,
        state: { email: email }
      }).then(res => res.data)

    },

    loadAnswer(user,formId) {
      return this.$dps.run({
        script: _dps.getAnswer,
        state: {
          user: user,
          form: formId
        }
      }).then(res => {
        if(res.data) return res.data[0]
        return {
          form: formId,
          user: user,
          data: []
        }  
      })
    },

    updateAnswer(answer) {

      return this.$dps.run({
        script: _dps.updateAnswer,
        state: { answer: answer }
      })

    },

    exportResponses(form_id){
      return this.$dps.run({
        script: _dps.exportResponses,
        state: { form: form_id }
      }).then( res => this.app.config.dpsURL+res.data.url )
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
          .forEach( (u, index) => {

             script += `sendmail({{o${index}}});
            `
            state[("o"+index)] = {
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

      return new Promise((resolve,reject) => {
          this.$dps.run({
            script: _dps.getStat,
            state: {
              form: formId
            }
          }).then( res => {
            if(res.type == "error") {
              reject()
            } else {
              resolve(res.data)
            }  
          })
      })
       
    },

    round( date, start, level, value) {
      let defFormat = "YYYY-MM-DD HH:mm";
    
      let lo = moment(start).startOf(level).format(defFormat)
      let hi = moment(lo).add(value,level).format(defFormat)
      while(!(moment(date).isSameOrAfter(lo) && moment(date).isSameOrBefore(hi))){
        lo = hi;
        hi = moment(lo).add(value,level).format(defFormat);
      }

      let dLo = moment(date).diff(lo)
      let dHi = -moment(date).diff(hi)
      return (dLo < dHi) ? lo: hi
    },

    getResponseDynamic(r) {
      let responses = r.events.timeline;
      //responses.push({date: new Date()})

      let defFormat = "YYYY-MM-DD HH:mm";
      // let inputFormat = "DD/MM/YY HH:mm";


      let RStat = responses
          .map(item => moment(new Date(item.date)))
          .sort((a,b) => a.diff(b))
          .map(item => item.format(defFormat))

      RStat.push(moment(new Date()).format(defFormat))  

      let p = [
        ['m',1],
        ['m',5],
        ['m',10],
        ['m',15],
        ['m',20],
        ['m',30],
        ['h',1],
        ['h',2],
        ['h',4],
        ['h',12],
        ['d',1],
        ['d',3],
        ['d',7],
        ['M',1],
        ['M',3],
        ['M',6],
        ['y',1],
        ['y',2],
        ['y',5],
        ['y',10]
      ]
      
      
      let getPoints = (start, stop, level, value) => {
        let res =[];
        start = moment(start).add(-value,level).format(defFormat);
        stop = moment(new Date()).format(defFormat);
         
        let lo = moment(start).startOf(level).format(defFormat)
        let hi = moment(lo).add(value,level).format(defFormat)
        res.push(lo)
        while(!(moment(stop).isSameOrAfter(lo) && moment(stop).isSameOrBefore(hi))){
          lo = hi;
          hi = moment(lo).add(value,level).format(defFormat);
          res.push(lo)
        }
        res.push(hi)
        return res;      
      }

      

      let titleFormat = {
        'm' :['HH:mm',''],
        'h' :['DD.MM HH:','00'],
        'd' :['DD.MM',''],
        'M' :['MM.YY',''],
        'y' :['YYYY','']
      } 
      
      let u;
      
      for(u of p){
        if( (moment(RStat[RStat.length-1]).diff(RStat[0],u[0]) / u[1]) <= 24) break;
      }
      
      this.u = u;

      if(moment(RStat[RStat.length-1]).diff(RStat[0],u[0])<1) return;

      RStat.splice(RStat.length-1,1)
      
      RStat = RStat.map(
        item => this.round(item,RStat[0],u[0],u[1])
      );

      let points = getPoints(RStat[0], RStat[RStat.length-1], u[0], u[1]);

      let stats = points.map(item => RStat.filter(t => moment(t).isSame(item,u[0])).length)
      let sum = stats.reduce((item,sum) => {return sum+item})
      
      
      if(sum==0){
            stats = stats.map(() => 0)
          }else{
            stats = stats.map(item => item)//sum )
          }
      
      let max = stats.reduce((item,max) => {return (max>item) ? max : item})
          
      RStat = points.map((item,index) => {
        return {
          title: moment(item).format(titleFormat[u[0]][0])+titleFormat[u[0]][1],
          value: stats[index],
          height: (max>0) ? stats[index]/max : 0
        }
      })

      this.points = points;
      return RStat;
    }

  }
}