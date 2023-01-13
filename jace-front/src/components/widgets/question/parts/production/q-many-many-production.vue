<template>
  <div>
    <div v-if="!options || !answer" class="text-xs-center">
    </div>
    <v-card flat color="transparent" v-else>
      <v-container pa-2>
        <q-view v-if="isValid" :id="config.id" :title="options.title" :note="options.note" :validation="isValid"></q-view>
        <v-tabs v-model="active">
          <v-tab key="response" ripple>{{translate('Your_Response')}}</v-tab>
          <v-tab key="statistic" ripple v-if="options.showResponsesStat">{{translate('Report')}}</v-tab>
          <v-tab-item key="response" ripple>
            <v-container pa-2>
              <v-card v-if="(!options.nominals || options.nominals.length == 0) && !options.addEnabled" flat color="transparent" class="mt-3">
                <h3 class="headline warning--text font-weight-light">{{translate('Answer_not_configured')}}</h3>
              </v-card>
              <v-layout v-else align-center justify-end row fill-height v-for="(alt, altIndex) in options.nominals" :key="altIndex" style="padding-bottom: 0.5em;">
                <div style="width:2em;margin:auto;">
                  <v-checkbox secondary hide-details v-model="alt.selected" style="padding:0;margin:0;" @change="select()"></v-checkbox>
                </div>
                <v-flex class="col-10 py-0" style="line-height:1.2em;">
                  <div class="body-1 pl-3" @click="select(alt.id)" style="cursor: pointer;">
                    {{alt.title}}
                  </div>
                </v-flex>
                <v-flex xs1 v-if="options.showUserInfo">
                  <v-layout v-if="alt.user" column>
                    <v-tooltip top>
                      <template v-slot:activator="{on}">
                        <v-avatar v-on="on">
                          <dj-img :src="alt.user.photo" :icon="(alt.user.icon)?alt.user.icon : 'mdi-account'" style="margin:auto;"></dj-img>
                        </v-avatar>
                      </template>
                      <span>{{alt.user.name}}</span>
                    </v-tooltip>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-text-field v-if="options.addEnabled" class="px-2" v-model="newAltTitle" :label="translate('Alt_label')" @keyup.enter="addAlternative" :disabled="customAltCount >= options.maxCustomResponses">
            </v-text-field>
            <!-- <v-divider v-if="options.addEnabled"></v-divider> -->
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
import { find, findIndex, countBy } from "lodash"
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
      if (!this.options.required) return true

      if (this.options.required &&
        (this.answer.data.length >= this.options.rule.min) &&
        (this.answer.data.length <= this.options.rule.max)
      ) return true

      return `${this.translate('You_shuld_select_between')} ${this.options.rule.min} ${this.translate('And')} ${this.options.rule.max} ${this.translate('Alternatives')}.`

    }
  },

  methods: {

    // onSlideStart(wrapper){
    //   this.$forceUpdate()
    // },

    addAlternative() {
      let newAlt = {
        id: this.$djvue.randomName(),
        title: this.newAltTitle,
        user: this.app.user
      }

      this.options.nominals = this.options.nominals || []
      this.options.nominals.push(newAlt)
      this.newAltTitle = null
      this.$emit("extend:options", this.options)
      this.select(newAlt.id)
      this.$nextTick(() => { this.customAltCount++ })
    },

    select(nominal) {
      // console.log(JSON.stringify(nominal))
      if (nominal) {
        let f = find(this.options.nominals, n => n.id == nominal)
        f.selected = !f.selected
      }

      this.answer.data = this.options.nominals.filter(n => n.selected).map(n => n.id)
      this.answer.valid = this.isValid;
      this.$emit("update:answer")
    },

    calculateStat() {
      if (!this.options) return {}
      
      if (!this.options.nominals) return {}
      // console.log(JSON.stringify(this.stat.responses, null, "\t"))
      let s = this.stat.responses.filter(a => a) // &&  find(this.options.nominals, n => n.id == a[0]))
      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })
      let result = this.options.nominals.map(n => {
        let c = countBy(stats)[n.id]
        return {
          id: n.id,
          title: n.title,
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
    answer(value) {
      value.data = (value) ? value.data.filter(a => find(this.options.nominals, alt => alt.id == a)) : []
      if (this.options && this.options.nominals && this.options.nominals.forEach)
        this.options.nominals.forEach(n => {
          n.selected = findIndex(value.data, a => a == n.id) >= 0
        })

    }
  },


  data: () => ({
    active: null,
    newAltTitle: null,
    selection: [],
    height: null,
    customAltCount: 0,

    i18n: {
      en: {
        "Your_Response": "Your Response",
        "Report": "Report",
        "Validation_Error": "No response for this question but it is required.",
        "Answer_not_configured": "Structure of answer not configured",
        "No_data_available": "No data available",
        "Alt_label": 'Type your response and press "Enter"',
        "You_shuld_select_between": "You shuld select between",
        "And": "and",
        "Alternatives": "alternatives"
      },

      uk: {
        "Your_Response": "Ваша відповідь",
        "Report": "Звіт",
        "Validation_Error": "Відсутня відповідь на обов'язкове запитання.",
        "Answer_not_configured": "Структура відповіді не визначена",
        "No_data_available": "Дані відсутні",
        "Alt_label": 'Надрукуйте Вашу відповідь та натисніть "Enter"',
        "You_shuld_select_between": "Ви повинні вибрати від",
        "And": "до",
        "Alternatives": "варіантів"

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
