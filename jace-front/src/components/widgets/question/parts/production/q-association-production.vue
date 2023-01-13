<template>
  <div>
    <div v-if="!options || !answer" class="text-xs-center">
    </div>
    <v-card flat color="transparent" v-else>
      <v-container pa-2>
        <q-view :id="config.id" v-if="isValid" :title="options.title" :note="options.note" :validation="isValid"></q-view>
        <v-tabs v-model="active">
          <v-tab key="response" ripple>{{translate('Your_Response')}}</v-tab>
          <v-tab key="statistic" ripple v-if="options.showResponsesStat">{{translate('Report')}}</v-tab>
          <v-tab-item key="response" ripple>
            <v-card v-if="!options.entities || options.entities.length < 2" flat color="transparent" class="mt-3">
              <h3 class="headline warning--text font-weight-light">{{translate('Answer_not_configured')}}</h3>
            </v-card>
            <v-card v-else flat color="transparent" class="mt-3 mx-0 pa-3">
              <v-data-table :headers="headers" :items="items" style="border:1px solid #dedede;" dense :items-per-page="Number.POSITIVE_INFINITY" hide-default-footer item-key="id">
                <template v-slot:body="{items}">
                  <tbody>
                    <tr v-for="(item, rowIndex) in items" :key="rowIndex">
                      <td v-for="(col, index) in headers" :key="index" :class="(index==0) ? 'text-start' : 'text-center'" style="font-size:12px;">
                        <span v-if="index==0 || (index <= rowIndex+1)" class="caption text-start" style="line-height:1.4em;">
                          {{(item[col.value] == 'null')? ' ': item[col.value]}}
                        </span>
                        <v-menu v-else close-on-content-click>
                          <template v-slot:activator="{on}">
                            <v-chip small outlined class="ma-2" v-on="on" :style="`min-width:3em; ${getStyle(item,col)}`">
                              {{getValue(item,col)}}
                            </v-chip>
                          </template>
                          <v-list>
                            <v-list-item-title v-for="(v, scaleIndex) in scale" :key="scaleIndex" :style="`${v.style} padding:0.25em 1em;cursor:pointer;`" @click="setValue(v.value,item,col)">
                              {{(v.value) ? v.value : '...'}}
                            </v-list-item-title>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
            <v-card v-if="options.entities.length < 2" flat color="transparent" class="mt-3">
              <h3 class="headline warning--text font-weight-light">{{translate('No_data_available')}}</h3>
            </v-card>
            <v-card v-else flat color="transparent" class="mt-3">
              <v-layout fill-height row>
                <v-flex xs2 pa-2 class="text-xs-center headline" style="border-left:1px solid #dedede; border-bottom:1px solid #dcdcdc;  border-top:1px solid #dcdcdc;">
                </v-flex>
                <v-flex v-for="(e, idx) in options.entities" :key="idx" :class="`${cellClass} text-xs-center`" :style="`
                      min-height:3em; 
                      border-left:1px solid #dedede; 
                      border-bottom:1px solid #dcdcdc;  
                      border-top:1px solid #dcdcdc;
                      ${ (idx == (options.entities.length-1)) ? 'border-right: 1px solid #dcdcdc !important;' : ''}
                    `">
                  <span class="caption">{{e.title}}</span>
                </v-flex>
              </v-layout>
              <v-layout fill-height row v-for="(f, index1) in options.entities" :key="index1">
                <v-flex xs2 pa-2 class="caption" align-center style="border-left: 1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc; ">
                  {{f.title}}
                </v-flex>
                <v-flex v-for="(e, index2) in options.entities" :key="index2" :class="`${cellClass} text-xs-center`" :style="`
                    min-height:3em; 
                    border-left: 1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc; 
                    ${ (index2 < (options.entities.length-1)) ? '' :'border-right: 1px solid #dcdcdc !important;'}
                  `" align-center>
                  <v-layout v-if="index2 > index1" align-center style="height:100%;">
                    <v-flex class="text-xs-center body-2">
                      <echart v-if="getChartOptions(f,e)" :options="getChartOptions(f,e)" :height="height"></echart>
                    </v-flex>
                  </v-layout>
                  <v-layout v-else style="height:100%;"></v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { find, findIndex, countBy, isNumber, isUndefined, zipObject} from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"
import i18nMixin from "@/mixins/core/widget-i18n.mixin.js"
import qView from "../../question-view.vue"



export default {

  mixins: [djvueMixin, listenerMixin, statMixin, i18nMixin],

  props: ["config", "options", "answer", "stat"],

  components: {
    "q-view": qView
  },

  computed: {

    cellClass() {
      let width = Math.trunc(10 / this.options.entities.length);
      width = (width > 2) ? 2 : width;
      return `xs${width}`
    },

    isValid() {
      if (!this.options) return "Not configured"
      if (!this.answer) return "No response data"

      if (this.options.required) {
        if (this.answer.data.length > 0) {
          return true
        } else {
          return this.translate("Validation_Error")
        }
      } else {
        return true
      }

    },

    scale() {

      let s = JSON.parse(JSON.stringify(this.options.scale))
      s.push({
        value: null,
        style: (this.options.undefinedValue) ?
          this.options.undefinedValue.style : `color:${this.$vuetify.theme.secondary} !important;`,
        title: ""
      })
      return s

    }
  },

  methods: {
    
    // onSlideStart(wrapper){
    //   this.$forceUpdate()
    // },

    onSetValue(event, e1, e2) {
      this.selection = { e1, e2 }
      event.preventDefault()
      this.showMenu = false
      this.posX = event.clientX
      this.posY = event.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },


    getValue(e1, e2) {

      if (!this.answer) return "null"

      let f = find(this.answer.data, a => a.e1 == e1.id && a.e2 == e2.id)

      let value = (!isUndefined(f)) ? f.value : null;

      let s = find(this.scale, s => s.value == value)

      s = (s) ? s : { value: null, title: "" }

      let res = (this.options.showValue) ?
        (isNumber(s.value)) ?
        s.value.toFixed(0) :
        "" :
        ""

      res += (this.options.showTitle) ?
        (s.title) ?
        (this.options.showValue) ?
        (s.title == "") ?
        "" :
        `(${s.title})` :
        s.title :
        (this.options.showValue) ?
        "" :
        s.value :
        ""
      res = (res == null || res == "null") ? "" : res;
      return res

    },

    getStyle(e1, e2) {
      let f = find(this.answer.data, a => a.e1 == e1.id && a.e2 == e2.id)
      let value = (!isUndefined(f)) ? f.value : null;
      let s = find(this.options.scale, s => s.value == value)
      return (s) ?
        (s.style) ?
        s.style :
        `color:${this.$vuetify.theme.themes.light.accent} !important;` :
        (this.options.undefinedValue) ?
        this.options.undefinedValue.style :
        `color:${this.$vuetify.theme.themes.light.secondary} !important;`
    },

    setValue(value, item, col) {
      item[col.value] = value
      let factor = find(this.options.entities, d => d.id == item.id)
      let effect = find(this.options.entities, d => d.id == col.id)

      let index = findIndex(this.answer.data, a => a.e1 == factor.id && a.e2 == effect.id)
      if (index >= 0) {
        this.answer.data.splice(index, 1, { e1: factor.id, e2: effect.id, value: value })
      } else {
        this.answer.data.push({ e1: factor.id, e2: effect.id, value: value })
      }
      if (this.answer && this.answer.valid != this.isValid) this.answer.valid = this.isValid;

      this.$emit("update:answer", this.answer)

    },


    getChartOptions(e1, e2) {
      let f = find(this.statOptions, s => s.e1.id == e1.id && s.e2.id == e2.id)
      if (f) return f.chartOptions
      return null
    },



    calculateStat() {
      if (!this.options) return {}
      
      if (!this.options.entities) return {}

      let s = this.stat.responses.filter(a => a)

      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })

      let r = []

      this.options.entities.forEach(f => {
        this.options.entities.forEach(e => {
          r.push({
            e1: f,
            e2: e,
            values: stats
              .filter(s => s.e1 == f.id && s.e2 == e.id && s.value && find(this.options.scale, v => v.value == s.value))
              .map(s => s.value)
          })
        })
      })

      r = r.filter(s => s.values.length > 0)

      r.forEach(s => {
        let c = countBy(s.values);
        s.data = this.options.scale.map(v => ({
          title: v.value,
          value: (c[v.value]) ? c[v.value] : 0
        }))
      })


      r.forEach(s => {
        s.chartOptions = {
          color: [this.$vuetify.theme.themes.light.primary],
          angleAxis: {
            type: 'category',
            data: this.options.scale.map(d => d.value),
            axisLabel: {
              margin: 2,
              fontSize: 8,
              fontWeight: "bold",
              color: this.$vuetify.theme.themes.light.secondary
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


      this.height = 150;

      return r

    }

  },

  data: () => ({
    active: null,
    height: null,
    showMenu: false,
    selection: null,
    posX: null,
    posY: null,
    headers: [],
    items: [],

    i18n: {
      en: {
        "Your_Response": "Your Response",
        "Report": "Report",
        "Validation_Error": "No response for this question but it is required.",
        "Answer_not_configured": "Structure of answer not configured",
        "No_data_available": "No data available"
      },

      uk: {
        "Your_Response": "Ваша відповідь",
        "Report": "Звіт",
        "Validation_Error": "Відсутня відповідь на обов'язкове запитання.",
        "Answer_not_configured": "Структура відповіді не визначена",
        "No_data_available": "Дані відсутні"
      }
    }

  }),

  watch: {
    options: {
      handler(value) {

        if (!value) return

        this.headers = [{
          text: "Entity",
          value: "$entity"
        }].concat(this.options.entities.map(d => {
          d.value = d.title
          d.text = d.title
          return d
        }))
        this.items = this.options.entities.map(f => {
          let keys = ["id", "$entity"].concat(this.options.entities.map(e => e.title))
          let values = [f.id, f.title].concat(this.options.entities.map(e => this.getValue(f, e)))
          return zipObject(keys, values)
        })
      },
      deep: true
    }
  },


  mounted() { this.$emit("init") }
}

</script>
