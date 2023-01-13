<template>
  <div>
    <div v-if="!options" class="text-xs-center">
      <v-progress-circular indeterminate color="secondary ligten-2"></v-progress-circular>
    </div>
    <v-tabs v-else v-model="active">
      <v-tab key="general" ripple>General</v-tab>
      <v-tab key="alt" ripple>Alternatives</v-tab>
      <v-tab key="rules" ripple>Rules</v-tab>
      <v-tab key="statistic" ripple>Statistic</v-tab>
      <v-tab-item key="general" ripple>
        <v-card flat>
          <v-container>
            <h3 class="headline">Many of many selection</h3>
            <v-switch :hint="(options.required) ? 'All constraints will be checked' : 'Response validation will be disabled'" persistent-hint label="Required" v-model="options.required" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <v-textarea v-model="options.title" label="Question"></v-textarea>
            <v-textarea v-model="options.note" label="Note"></v-textarea>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="alt" ripple>
        <v-card flat>
          <v-container fluid grid-list-md pl-3>
            <v-switch :hint="(options.addEnabled) ? 'Respondent can add new variants' : ''" persistent-hint label="Custom response" v-model="options.addEnabled" @change="$emit('update:options',options)"></v-switch>
            <v-divider v-if="options.addEnabled"></v-divider>
            <v-input v-if="options.addEnabled" label="Max count of custom responses" persistent-hint :hint="`Respondent can add max ${options.maxCustomResponses} responses`" class="mt-3">
              <div style="padding: 0 0 0 1em;">
                <input type="number" style="border: 1px solid #e0e0e0;" v-model="options.maxCustomResponses" :min="1" @input="$emit('update:options', options)" />
              </div>
            </v-input>
            <v-divider></v-divider>
            <v-switch v-if="options.addEnabled" :hint="(options.showUserInfo) ? 'Show info about respondents' : ''" persistent-hint label="Show respondent info" v-model="options.showUserInfo" @change="$emit('update:options',options)"></v-switch>
            <v-divider v-if="options.addEnabled"></v-divider>
            <v-switch v-if="options.addEnabled" :hint="(options.userCollaboration) ? 'Respondents will collaborate' : 'Respondents will be isolated'" persistent-hint label="Users collaboration" v-model="options.userCollaboration" @change="$emit('update:options',options)"></v-switch>
            <v-divider v-if="options.addEnabled"></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-container pa-3 ma-0>
                  <v-layout column>
                    <dj-list :items="options.nominals" itemField="title" title="Alternatives" label="Enter alternative" @update="onChangeNominals" draggable></dj-list>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="rules" ripple>
        <v-card flat>
          <v-container>
            <v-input label="Min" persistent-hint hint="Min alternatives shuld be selected">
              <div style="padding: 0 0 0 1em;">
                <input type="number" style="border: 1px solid #e0e0e0;" v-model="options.rule.min" min=0 :max="options.rule.max" @input="$emit('update:options', options)" />
              </div>
            </v-input>
            <v-divider></v-divider>
            <v-input class="mt-2" label="Max" persistent-hint hint="Max alternatives may be selected">
              <div style="padding: 0 0 0 1em;">
                <input type="number" style="border: 1px solid #e0e0e0;" v-model="options.rule.max" :min="options.rule.min" :max="(options.nominals) ? options.nominals.length : 0" @input="$emit('update:options', options)" />
              </div>
            </v-input>
            <v-divider></v-divider>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="statistic" ripple>
        <v-card flat>
          <v-container>
            <v-switch :hint="(options.showResponsesStat) ? 'Show statistical distribution in production mode' : ''" persistent-hint label="Statistical hints" v-model="options.showResponsesStat" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <echart :options="statOptions" :height="height"></echart>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import { countBy } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import djKeyValue from "@/components/core/ext/dj-field-editor.vue"
import statMixin from "../mixins/statistic.mixin.js"

export default {

  mixins: [djvueMixin, listenerMixin, statMixin],

  props: ["config", "options", "stat"],

  components: {
    "dj-list": djKeyValue
  },


  methods: {

    onChangeNominals(items) {
      this.options.nominals = items.map(d => {
        d.id = (d.id) ? d.id : this.randomName()
        return d
      })
      this.$emit("update:options", this.options)
    },


    onChange() {
      this.$emit("update:options", this.options)
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
      this.height = (this.options.nominals) ? this.options.nominals.length * 36 + 70 : 70
      return statOptions
    }
  },




  data: () => ({
    active: null,
    height: null
  }),


  mounted() { this.$emit("init") }
}

</script>
