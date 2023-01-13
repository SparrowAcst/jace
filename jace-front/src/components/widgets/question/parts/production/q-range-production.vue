<template>
  <div>
    <div v-if="!options || !answer" class="text-xs-center">
    </div>
    <v-card flat v-else>
      <v-container pa-2>
      
        <q-view :id="config.id" v-if="isValid" :title="options.title" :note="options.note" :validation="isValid"></q-view>
        
         <v-tabs v-model="active">
          <v-tab key="response" ripple>{{translate('Your_Response')}}</v-tab>
          <v-tab key="statisti c" ripple v-if="options.showResponsesStat">{{translate('Report')}}</v-tab>

          <v-tab-item key="response" ripple>
            <v-range-slider 
              class="px-3 pt-5 mt-3"
              v-model="answer.data[0]" 
              :max="options.range[1]" 
              :min="options.range[0]" 
              :step="options.step" 
              thumb-size="24" 
              thumb-label="always" 
              thumb-color="accent" 
              ticks="always" 
              tick-size="2">
            </v-range-slider>
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
import { union, uniq, countBy,sum } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js";
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
    //   console.log("SlideStart")
    //   this.$forceUpdate()
    // },

    calculateStat() {
      let s = this.stat.responses.filter(a => a)


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

      if(result.length == 0) return {}

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

      this.height = 250;
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

  mounted() { 
    this.$emit("init") 
  }
}

</script>

