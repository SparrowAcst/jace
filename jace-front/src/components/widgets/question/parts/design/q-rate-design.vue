<template>
  <div>
    <div v-if="!options" class="text-xs-center">
      <v-progress-circular indeterminate color="secondary ligten-2"></v-progress-circular>
    </div>
    <v-tabs v-else v-model="active">
      <v-tab key="general" ripple>General</v-tab>
      <v-tab key="rate" ripple>Rate</v-tab>
      <v-tab key="statistic" ripple>Statistic</v-tab>
      <v-tab-item key="general" ripple>
        <v-card flat>
          <v-container>
            <h3 class="headline">Rate</h3>
            <v-switch :hint="(options.required) ? 'All constraints will be checked' : 'Response validation will be disabled'" persistent-hint label="Required" v-model="options.required" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <v-textarea v-model="options.title" label="Question"></v-textarea>
            <v-textarea v-model="options.note" label="Note"></v-textarea>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="rate" ripple>
        <v-card flat>
          <v-container>
            <v-row class="mx-0 px-3">
              <v-col cols="6" class="mx-0 px-3">
                Options
                <v-select :items="[3,5,7,9]" label="Maximum rate value" v-model="max" @change="generateScale">
                </v-select>
                <v-layout row v-for="(s, scaleIndex) in options.scale" :key="scaleIndex">
                  <v-text-field :label="`${s.value} title`" v-model="s.title" @input="$emit('update:options',options)"></v-text-field>
                </v-layout>
                <v-divider></v-divider>
                <v-select :items="icons" v-model="icon" label="Icon" @change="changeIcon">
                  <v-icon slot="selection" slot-scope="props">{{props.item.icon}}</v-icon>
                  <v-icon slot="item" slot-scope="props">{{props.item.icon}}</v-icon>
                </v-select>
                <v-divider></v-divider>
                <v-switch label="Show value" v-model="options.showValue" @change="$emit('update:options',options)"></v-switch>
                <v-divider></v-divider>
                <v-switch label="Show title" v-model="options.showTitle" @change="$emit('update:options',options)"></v-switch>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="6" class="mx-0 px-3">
                Preview
                <v-layout row align-end>
                  <v-rating v-model="rating" :length="options.scale.length" :empty-icon="`mdi-${options.icon}-outline`" :full-icon="`mdi-${options.icon}`" color="accent" background-color="secondary lighten-2"></v-rating>
                  <span v-if="rating && (options.showValue || (options.showTitle && !options.scale[rating-1].title))" class=" accent--text caption">
                    {{rating}}
                  </span>
                  <span v-if="rating && options.showTitle && options.scale[rating-1].title" class="accent--text caption">
                    ( {{options.scale[rating-1].title}} )
                  </span>
                </v-layout>
              </v-col>
            </v-row>
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
import { countBy, find } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"

export default {

  mixins: [djvueMixin, listenerMixin, statMixin],

  props: ["config", "options", "stat"],

  methods: {

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
    rating: null,
    height: null,
    max: null,
    icon: null,
    icons: [
      { icon: "mdi-star", title: "star" },
      { icon: "mdi-square", title: "square" },
      { icon: "mdi-chevron-right-box", title: "chevron-right-box" },
      { icon: "mdi-chevron-right-circle", title: "chevron-right-circle" },
      { icon: "mdi-circle", title: "circle" },
      { icon: "mdi-heart", title: "heart" },
      { icon: "mdi-thumb-down", title: "thumb-down" },
      { icon: "mdi-thumb-up", title: "thumb-up" }
    ]
  }),

  watch: {
    options: {
      handler(value) {
        if (value && value.scale) {
          this.max = value.scale.length
          this.icon = find(this.icons, i => i.title == value.icon) || this.icons[0]
        }
      },
      deep: true
    }
  },

  mounted() {
    if (this.options && this.options.scale) {
      this.max = this.options.scale.length
      this.icon = find(this.icons, i => i.title == this.options.icon) || this.icons[0]
    }
    this.$emit("init")
  }
}

</script>
