import moment from "moment"
import { find, countBy, orderBy, uniq, union, sum, sumBy } from "lodash"


let round = (date, start, level, value) => {
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
}



let eventDynamic = (timeline) => {

  let defFormat = "YYYY-MM-DD HH:mm";
  // let inputFormat = "DD/MM/YY HH:mm";


  let RStat = timeline
    .map(item => moment(new Date(item)))
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
    start = moment(start).add(-value, level).format(defFormat)
    stop = moment(stop).add(value, level).format(defFormat)

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
    'd': ['DD.MM.YY', ''],
    'M': ['MM.YYYY', ''],
    'y': ['YYYY', '']
  }

  let u;

  for (u of p) {
    if ((moment(RStat[RStat.length - 1]).diff(RStat[0], u[0]) / u[1]) <= 24) break;
  }


  if (moment(RStat[RStat.length - 1]).diff(RStat[0], u[0]) < 1) return;

  RStat.splice(RStat.length-1,1)
  
  RStat = RStat.map(
    item => round(item, RStat[0], u[0], u[1])
  );


  let points = getPoints(RStat[0], RStat[RStat.length - 1], u[0], u[1]);

  let stats = points.map(item => RStat.filter(t => moment(t).isSame(item, u[0])).length)

  // let sum = stats.reduce((item,sum) => {return sum+item})


  // if(sum==0){
  //       stats = stats.map(item => 0)
  //     }else{
  //       stats = stats.map(item => item/sum )
  //     }

  // let max = stats.reduce((item,max) => {return (max>item) ? max : item})

  RStat = points.map((item, index) => {
    return {
      title: moment(item).format(titleFormat[u[0]][0]) + titleFormat[u[0]][1],
      value: stats[index],
    }
  })

  return RStat;
}





export default {
  methods: {

    oneOfManyStat(question, stat) {

      if (!question.options.nominals) return {}

      let stats = stat.responses.filter(a => a && find(question.options.nominals, n => n.id == a[0]))
      let result = question.options.nominals.map(n => {
        let c = countBy(stats, s => s[0])[n.id]
        return {
          id: n.id,
          title: n.title,
          value: ((c) ? c : 0) / ((stats.length == 0) ? 1 : stats.length)
        }
      })
      let statOptions = {
        color: [ this.$vuetify.theme.themes.light.primary ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 1.0
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [{
          name: '',
          type: 'bar',
          data: [],
          itemStyle: {
            opacity: 0.5
          }
        }]
      }

      statOptions.yAxis.data = result.map(r => this.truncate(r.title)).reverse()
      statOptions.series[0].data = result.map(r => r.value).reverse()

      return statOptions
    },

    manyOfManyStat(question, stat) {

      if (!question.options.nominals) return {}

      let s = stat.responses.filter(a => a)
      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })
      let result = question.options.nominals.map(n => {
        let c = countBy(stats)[n.id]
        return {
          id: n.id,
          title: n.title,
          value: ((c) ? c : 0) / ((stats.length == 0) ? 1 : stats.length)
        }
      })
      let statOptions = {
        color: [ this.$vuetify.theme.themes.light.primary ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 1.0
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [{
          name: '',
          type: 'bar',
          data: [],
          itemStyle: {
            opacity: 0.5
          }
        }]
      }

      statOptions.yAxis.data = result.map(r => this.truncate(r.title)).reverse()
      statOptions.series[0].data = result.map(r => r.value).reverse()

      return statOptions
    },

    rateStat(question, stat) {

      let s = stat.responses.filter(a => a)
      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let result = question.options.scale.map( n => {
        let c = countBy(stats)[n.value]
        return {
          title: `${n.value} ${(n.title) ? ' ('+n.title+')': ''}`,
          value: ((c) ? c : 0) / ((stats.length == 0) ? 1 : stats.length)
        }
      })
      let statOptions = {
        color: [ this.$vuetify.theme.themes.light.primary ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 1.0
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [{
          name: '',
          type: 'bar',
          data: [],
          itemStyle: {
            opacity: 0.5
          }
        }]
      }

      statOptions.yAxis.data = result.map(r => this.truncate(r.title)).reverse()
      statOptions.series[0].data = result.map(r => r.value).reverse()

      return statOptions
    },

    rangeStat(question, stat) {

      let s = stat.responses.filter(a => a)


      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let left = stats.map(item => item[0])
      let right = stats.map(item => item[1])

      let r = union(uniq(left), uniq(right)).sort((a, b) => a - b).map(item => ({ title: item }))

      let result = r.map( n => {
        let l = countBy(left)[n.title]
        let r = countBy(right)[n.title]

        return {
          title: n.title,
          left: ((l) ? l : 0),
          right: ((r) ? r : 0)
        }
      })

      if (result.length == 0) return {}

      let statOptions = {

        legend: {
          data: ['Left boundary', 'Right boundary']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }

      statOptions.series.push({
        name: 'Left boundary',
        type: 'line',
        step: 'middle',
        areaStyle: {
          opacity: 0.25
        },
        data: result.map(item => [item.title, item.left]),
        markLine: {
          data: [{
            xAxis: (sum(left) / left.length)
          }]
        }
      })
      statOptions.series.push({
        name: 'Right boundary',
        type: 'line',
        step: 'middle',
        areaStyle: {
          opacity: 0.25
        },
        data: result.map(item => [item.title, item.right]),
        markLine: {
          data: [{
            xAxis: (sum(right) / right.length)
          }]
        }
      })


      return statOptions
    },

    dateStat(question, stat) {

      let s = stat.responses.filter(a => a)
      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let result = eventDynamic(stats);

      if (!result) return {}

      let statOptions = {
        color: [ this.$vuetify.theme.themes.light.primary ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category'
        },

        yAxis: {
          type: 'value'
        },

        series: [{
          name: '',
          type: 'bar',
          itemStyle: {
            opacity: 0.5
          },
          data: []
        }]
      }

      statOptions.xAxis.data = result.map(r => r.title)
      statOptions.series[0].data = result.map(r => r.value)

      this.height = 250;
      return statOptions

    },

    associationStat(question, stat) {

      if (!question.options.entities) return {}

      let s = stat.responses.filter(a => a)

      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })

      let r = []

      question.options.entities.forEach(f => {
        question.options.entities.forEach(e => {
          r.push({
            e1: f,
            e2: e,
            values: stats
              .filter(s => s.e1 == f.id && s.e2 == e.id && s.value && find(question.options.scale, v => v.value == s.value))
              .map(s => s.value)
          })
        })
      })

      r = r.filter(s => s.values.length > 0)

      r.forEach(s => {
        let c = countBy(s.values);
        s.data = question.options.scale.map(v => ({
          title: v.value,
          value: (c[v.value]) ? c[v.value] : 0
        }))
      })

      r.forEach(s => {
        s.chartOptions = {
          color: [ this.$vuetify.theme.themes.light.primary ],

          angleAxis: {
            type: 'category',
            data: question.options.scale.map(d => d.value),
            axisLabel: {
              margin: 2,
              fontSize: 8,
              fontWeight: "bold",
              color:  this.$vuetify.theme.themes.light.secondary
            }
          },
          radiusAxis: {
            splitNumber: 1,
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          polar: {},
          series: [{
            type: 'bar',
            itemStyle: {
              opacity: 0.5
            },
            data: s.data.map(d => d.value),
            coordinateSystem: 'polar'
          }]
        }
      })

      return r

    },

    influenceStat(question, stat) {

      if (!question.options.effects || !question.options.factors) return {}

      let s = stat.responses.filter(a => a)

      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })

      let r = []

      question.options.factors.forEach(f => {
        question.options.effects.forEach(e => {
          r.push({
            factor: f,
            effect: e,
            values: stats
              .filter(s => s.e1 == f.id && s.e2 == e.id && s.value && find(question.options.scale, v => v.value == s.value))
              .map(s => s.value)
          })
        })
      })

      r = r.filter(s => s.values.length > 0)

      r.forEach(s => {
        let c = countBy(s.values);
        s.data = question.options.scale.map(v => ({
          title: v.value,
          value: (c[v.value]) ? c[v.value] : 0
        }))
      })


      r.forEach(s => {
        s.chartOptions = {
          color: [ this.$vuetify.theme.themes.light.primary ],
          angleAxis: {
            type: 'category',
            data: question.options.scale.map(d => d.value),
            axisLabel: {
              margin: 2,
              fontSize: 8,
              fontWeight: "bold",
              color:  this.$vuetify.theme.themes.light.secondary
            }
          },
          radiusAxis: {
            splitNumber: 1,
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          polar: {},
          series: [{
            type: 'bar',
            itemStyle: {
              opacity: 0.5
            },
            data: s.data.map(d => d.value),
            coordinateSystem: 'polar'
          }]
        }
      })

      return r


    },

    priorityStat(question, stat) {
      if (!question.options.nominals) return {}
      let stats = stat.responses.filter(a => a);

      let r = [];
      stats.forEach(s => {
        r = r.concat(s)
      })

      let res = question.options.nominals.map(n => {
        let data = r.filter(item => item.id == n.id);
        n.data = question.options.nominals.map((t, idx) => ({
          priority: (idx + 1),
          value: data.filter(d => (d.priority == (idx + 1))).length / data.length
        }))
        n.priority = sumBy(n.data, item => item.priority * item.value)
        return n
      })

      res = res.map(item => {
        item.data = item.data.map(d => {
          d.value = d.value * item.priority
          return d
        })
        return item
      })

      res = orderBy(res, 'priority')
      res.reverse()


      let statOptions = {

        legend: {
          data: question.options.nominals.map((d, idx) => (idx + 1).toFixed(0))
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'value'
        },

        yAxis: {
          type: 'category',
          data: res.map(d => this.truncate(d.title))
        },

        series: res.map((t, idx) => ({
          name: (idx + 1).toFixed(0),
          type: 'bar',
          stack: '1',
          itemStyle: {
            opacity: 0.75
          },
          data: res.map(d => d.data[idx].value)
        }))

      }

      return statOptions
    },



    truncate(value, length) {
      length = length || 50;
      return (value.toString().length <= length) ?
        value.toString() :
        ((value.toString().length - length) > 10) ?
        value.toString().substring(0, length) + '...' :
        value.toString()
    },


    getQuestionChartOptions(question, stat) {

      let statMap = {
        "One of many selection": this.oneOfManyStat,
        "Many of many selection": this.manyOfManyStat,
        "Range": this.rangeStat,
        "Rate": this.rateStat,
        "Date": this.dateStat,
        "Association": this.associationStat,
        "Influence": this.influenceStat,
        "Priority": this.priorityStat
      }

      let s = find(stat.questions, s => s.id == question.id)
      // console.log(question)
      if (!question.options) return {}
      if (s && question.options.type && statMap[question.options.type]) return statMap[question.options.type](question, s)
      return {}
    }

  }
}
