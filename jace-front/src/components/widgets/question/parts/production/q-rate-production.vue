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
            <v-row class="mx-0 px-3 d-flex align-end">
              <v-rating v-model="answer.data[0]" :length="options.scale.length" :empty-icon="`mdi-${options.icon}-outline`" :full-icon="`mdi-${options.icon}`" color="accent" background-color="secondary lighten-2">
              </v-rating>
              <span v-if="answer.data[0] && (options.showValue || (options.showTitle && !options.scale[answer.data[0]-1].title))" class=" accent--text caption">
                {{answer.data[0]}}&nbsp;
              </span>
              <span v-if="answer.data[0] && options.showTitle && options.scale[answer.data[0]-1].title" class="accent--text caption">
                ( {{options.scale[answer.data[0]-1].title}} )
              </span>
            </v-row>
          </v-tab-item>
          <v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
            <echart :options="statOptions" :height="height"></echart>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { countBy } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"
import i18nMixin from "@/mixins/core/widget-i18n.mixin.js";

import qView from "../../question-view.vue";



export default {

  mixins: [djvueMixin, listenerMixin, statMixin, i18nMixin],

  components: {
    "q-view": qView
  },

  props: ["config", "options", "answer", "stat"],

  computed: {

    isValid() {
      if (!this.options) return "Not configured"
      if (!this.answer) return "No response data"
      if (this.options.required && this.answer.data.length == 0) return this.translate("Validation_Error")
      return true
    }
  },



  methods: {

    // onSlideStart(wrapper){
    //   this.$forceUpdate()
    // },

    calculateStat() {
      let s = this.stat.responses.filter(a => a) // &&  find(this.options.nominals, n => n.id == a[0]))
      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let result = this.options.scale.map(n => {
        let c = countBy(stats)[n.value]
        return {
          title: `${n.value} ${(n.title) ? ' ('+n.title+')': ''}`,
          value: ((c) ? c : 0) / ((stats.length == 0) ? 1 : stats.length)
        }
      })
      let statOptions = {
        color: [this.$vuetify.theme.themes.light.primary],
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
      // statOptions.color = [this.$vuetify.theme.primary]

      // this.statOptions = statOptions
      this.height = (this.options.nominals) ? this.options.nominals.length * 36 + 50 : null
      return statOptions
    }

  },

  watch: {

    'answer.data': {
      handler(value, oldValue) {
        if (!oldValue) return
        if (this.answer && this.answer.valid != this.isValid) this.answer.valid = this.isValid;
        this.$emit("update:answer")
      },
      deep: true
    }

  },


  data: () => ({
    active: null,
    height: null,

    i18n: {
      en: {
        "Your_Response": "Your Response",
        "Report": "Report",
        "Validation_Error": "No response for this question but it is required.",
        "Answer_not_configured": "Structure of answer not configured",
        "No_data_available": "No data available",
        "Alt_label": 'Type your response and press "Enter"'
      },

      uk: {
        "Your_Response": "Ваша відповідь",
        "Report": "Звіт",
        "Validation_Error": "Відсутня відповідь на обов'язкове запитання.",
        "Answer_not_configured": "Структура відповіді не визначена",
        "No_data_available": "Дані відсутні",
        "Alt_label": 'Надрукуйте Вашу відповідь та натисніть "Enter"'
      }
    }
  }),

  mounted() { this.$emit("init") }
}

</script>
