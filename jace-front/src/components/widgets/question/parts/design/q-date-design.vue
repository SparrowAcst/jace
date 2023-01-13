<template>
  <div>
    <div v-if="!options" class="text-xs-center">
      <v-progress-circular indeterminate color="secondary ligten-2"></v-progress-circular>
    </div>
    <v-tabs v-else v-model="active">
      <v-tab key="general" ripple>General</v-tab>
      <v-tab key="statistic" ripple>Statistic</v-tab>
      <v-tab-item key="general" ripple>
        <v-card flat>
          <v-container>
            <h3 class="headline">Date</h3>
            <v-switch :hint="(options.required) ? 'All constraints will be checked' : 'Response validation will be disabled'" persistent-hint label="Required" v-model="options.required" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <v-textarea v-model="options.title" label="Question"></v-textarea>
            <v-textarea v-model="options.note" label="Note"></v-textarea>
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
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"
import eventDynamic from "../../event-dynamic.js"


export default {

  mixins: [djvueMixin, listenerMixin, statMixin],

  props: ["config", "options", "stat"],

  methods: {

    calculateStat() {
      let s = this.stat.responses.filter(a => a)
      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let result = eventDynamic(stats);

      if (!result) return {}

      let statOptions = {
        color: [this.$vuetify.theme.themes.light.primary],
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


    changeIcon() {
      this.options.icon = this.icon.title;
      this.onChange()
    },

    generateScale() {
      if (this.max != this.options.scale.length) {
        let newScale = [];
        for (let i = 0; i < this.max; i++) {
          newScale.push({ value: i + 1 })
        }
        this.options.scale = newScale
        this.onChange()
      }
    },

    onChange() {
      this.$emit("update:options", this.options)
    }
  },

  data: () => ({
    active: null,
    height: null,
    date: null,
    l: null,
    qq: 1
  }),


  mounted() {
    this.l = (this.$i18n.locale == "uk") ? "ua-uk" : null
    this.$emit("init")
  }
}

</script>
