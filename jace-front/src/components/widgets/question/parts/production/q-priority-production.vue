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
            <v-card v-if="(!options.nominals || options.nominals.length == 0)" flat color="transparent" class="mt-3">
              <h3 class="headline warning--text font-weight-light">{{translate('Answer_not_configured')}}</h3>
            </v-card>
            <dj-priority class="mx-5" v-if="answer" :list="answer.data" @update="onUpdateAnswer"></dj-priority>
          </v-tab-item>
          <v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
            <v-card v-if="(!options.nominals || options.nominals.length == 0) && !options.addEnabled" flat color="transparent" class="mt-3">
              <h3 class="headline warning--text font-weight-light">{{translate('No_data_available')}}</h3>
            </v-card>
            <echart v-else :options="statOptions" :height="height"></echart>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { sumBy, orderBy, find } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"
import i18nMixin from "@/mixins/core/widget-i18n.mixin.js";

import qView from "../../question-view.vue";
import djPriority from "@/components/core/ext/dj-priority.vue"



export default {

  mixins: [djvueMixin, listenerMixin, statMixin, i18nMixin],

  components: {
    "q-view": qView,
    "dj-priority": djPriority
  },

  props: ["config", "options", "answer", "stat"],

  computed: {

    isValid() {
      if (!this.options) return "Not configured"
      if (!this.answer) return "No response data"
      if (this.options.required && this.answer.data.filter(a => a.priority == null).length > 0) return this.translate("Validation_Error")
      return true
    }
  },

  methods: {

    // onSlideStart(wrapper){
    //   this.$forceUpdate()
    // },

    onUpdateAnswer(value) {
      this.answer.data = JSON.parse(JSON.stringify(value))
      this.$emit("update:answer")
    },


    calculateStat() {
      if (!this.options) return {}
      
      if (!this.options.nominals) return {}
      let stats = this.stat.responses.filter(a => a);

      let r = [];
      stats.forEach(s => {
        r = r.concat(s)
      })

      let res = this.options.nominals.map(n => {
        let data = r.filter(item => item.id == n.id);
        n.data = this.options.nominals.map((t, idx) => ({
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
          data: this.options.nominals.map((d, idx) => (idx + 1).toFixed(0))
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

      this.height = (this.options.nominals) ? this.options.nominals.length * 36 + 70 : 70
      return statOptions
    }

  },

  watch: {

    answer(value) {

      if (value) {
        let d = this.options.nominals.map(n => {
          let f = find(value.data, v => v.id == n.id)
          n.priority = (f) ? f.priority : null
          return n
        })

        let nua = false

        d = orderBy(d, "priority").map((d, index) => {
          let oldPriority = d.priority;
          d.priority = (d.priority) ? index + 1 : null
          nua |= d.priority != oldPriority
          return d
        })
        this.answer.data = d
        // console.log(nua)
        if (nua) this.$emit("update:answer", this.answer)
      }

    }
  },


  data: () => ({
    active: null,
    height: null,
    ss: null,

    i18n: {
      en: {
        "Your_Response": "Your Response",
        "Report": "Report",
        "Validation_Error": "Undefined priorities detected",
        "Answer_not_configured": "Structure of answer not configured",
        "No_data_available": "No data available",
        "Alt_label": 'Type your response and press "Enter"'
      },

      uk: {
        "Your_Response": "Ваша відповідь",
        "Report": "Звіт",
        "Validation_Error": "Є невизначені пріорітети.",
        "Answer_not_configured": "Структура відповіді не визначена",
        "No_data_available": "Дані відсутні",
        "Alt_label": 'Надрукуйте Вашу відповідь та натисніть "Enter"'
      }
    }

  }),

  mounted() { this.$emit("init") }
}

</script>

<style>
.v-input__control {
  width: 100% !important;
}

.v-input--selection-controls .v-input__control {
  width: 100% !important;
}

</style>
