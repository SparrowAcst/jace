<template>
  <div>
    <div v-if="!options" class="text-xs-center">
      <v-progress-circular indeterminate color="secondary ligten-2"></v-progress-circular>
    </div>
    <v-tabs v-else v-model="active">
      <v-tab key="general" ripple>General</v-tab>
      <v-tab key="alt" ripple>Alternatives</v-tab>
      <v-tab key="statistic" ripple>Statistic</v-tab>
      <v-tab-item key="general" ripple>
        <v-card flat>
          <v-container>
            <h3 class="headline">Priority</h3>
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
import { sumBy, orderBy } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"
import djKeyValue from "@/components/core/ext/dj-field-editor.vue"

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




  data: () => ({
    active: null,
    height: null
  }),

  mounted() { this.$emit("init") }
}

</script>
