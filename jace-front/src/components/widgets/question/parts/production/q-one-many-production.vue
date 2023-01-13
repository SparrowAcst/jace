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
            <v-card v-if="(!options.nominals || options.nominals.length == 0) && !options.addEnabled" flat color="transparent" class="mt-3">
              <h3 class="headline warning--text font-weight-light">{{translate('Answer_not_configured')}}</h3>
            </v-card>
            <v-radio-group v-else v-model="answer.data[0]" style="width:100%;">
              <v-layout align-center justify-end row fill-height v-for="(alt, altIndex)  in nominals" :key="altIndex" style="padding-bottom: 0.5em; cursor: pointer;" @click="select(alt.id)">
                <div style="width:2em;">
                  <v-radio :key="alt.id" :value="alt.id"></v-radio>
                </div>
                <div class="col-10 pa-0" style="line-height:1.2em;">
                  <div class="body-1 pl-3">{{alt.title}}</div>
                </div>
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
            </v-radio-group>
            <v-divider></v-divider>
            <v-text-field class="px-2" v-if="options.addEnabled" v-model="newAltTitle" :label="translate('Alt_label')" @keyup.enter="addAlternative" :disabled="customAltCount >= options.maxCustomResponses"></v-text-field>
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
import { find, countBy } from "lodash"
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
    },

    nominals() {
      if (this.options.userCollaboration) return this.options.nominals
      return this.options.nominals.filter(n => {
        if (!n.user) return true
        if (n.user.id) return n.user.id == this.app.user.id
        if (n.user.apikey) return n.user.apikey == this.app.user.apikey
      })
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
      this.answer.data = []
      this.answer.data.push(nominal)
      this.answer.valid = this.isValid;
      this.$emit("update:answer")
    },

    calculateStat() {

      if (!this.options) return {}
      
      if (!this.options.nominals) return {}
      let stats = this.stat.responses.filter(a => a && find(this.options.nominals, n => n.id == a[0]))
      let result = this.options.nominals.map(n => {
        let c = countBy(stats, s => s[0])[n.id]
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
      this.height = (this.options.nominals) ? this.options.nominals.length * 36 + 70 : 70
      return statOptions
    }

  },

  watch: {
    answer() {
      this.answer.data = (this.answer.data) ? this.answer.data.filter(a => find(this.options.nominals, alt => alt.id == a)) : []
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
<style>
.v-input__control {
  width: 100% !important;
}

.v-input--selection-controls .v-input__control {
  width: 100% !important;
}

</style>
