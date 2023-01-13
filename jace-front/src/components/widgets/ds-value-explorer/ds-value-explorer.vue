<template>
  <div>
    <v-layout v-if="error1 || error2 || error3 || !options">
      <v-flex xs12>
        <h2 class="warning--text font-weight-light headline">{{message}}</h2>
      </v-flex>
    </v-layout>
    <div v-else>
      <v-layout column v-if="indicators && countries && years">
        <v-flex xs12>
          <v-layout column justify-center>
            <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;">
              {{config.title}}
            </h3>
            <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
              {{config.note}}
            </p>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row class="mx-0 px-1">
            <v-flex xs4 pr-1 pl-1>
              <v-autocomplete v-model="country_selection" :items="countries" item-text="name" color="primary" :filter="filter" label="Select entity" multiple class="caption" v-if="!this.config.dataSelectEmitters || (this.config.dataSelectEmitters.length == 0)">
              </v-autocomplete>
            </v-flex>
            <v-flex xs6 pr-1 pl-1>
              <v-autocomplete class="caption" v-model="indicator_select" :items="indicators" item-text="name" item-value="concept" color="primary" :filter="filter" label="Select indicator"></v-autocomplete>
            </v-flex>
            <v-flex xs2 pr-1 pl-1>
              <v-combobox class="caption" v-model="year_select" :items="years" label="Select year"></v-combobox>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 style="border:1px solid #dedede; background:#ffffff;">
          <echart v-if="options" :options="chartOptions" :height="options.widget.height"></echart>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import ioMixin from "./io.mixin.js";

<<< if( jace.mode == "development") { >>>

  import DsValueExplorerConfigDialog from "./ds-value-explorer-config.vue";

<<< } >>>

import echart from "@/components/core/ext/echart.vue"
import { find, includes } from "lodash"

export default {

  name: "ds-value-explorer-widget",

  icon: "mdi-triforce",

  mixins: [djvueMixin, listenerMixin, ioMixin],

  components: { echart },

  computed: {

    chartOptions() {

      if (!this.options) return {}

      let res = JSON.parse(JSON.stringify(this.options));


      res.series[0].label.normal.formatter = d => {
        let tooltip = `{title|${d.data.name}}` + "\n"
        if (d.data.values) {
          let range = (d.data.range) ?
            d.data.range.split(",").map(d => Number.parseFloat(d.trim())) :
            undefined;

          let rows = d.data.values.map(r => {

            let cls = "norange"

            if (range && r.value != "n/a") {

              let norm;

              if ((range[1] - range[0]) >= 0) {
                norm = (r.value - range[0]) / (range[1] - range[0])
              } else {
                norm = -(r.value - range[1]) / (range[0] - range[1])
              }

              // r.norm= norm.toFixed(3)

              if (norm >= 0) {
                cls = (norm <= 0.25) ? "low" : (norm >= 0.75) ? "high" : "middle"
              } else {
                cls = (norm <= -0.75) ? "low" : (norm >= -0.25) ? "high" : "middle"
              }
            }


            let row = Object.keys(r)
              .map(k => (k == "value") ?
                (r[k] == "n/a") ? r[k] : Number.parseFloat(r[k]).toFixed(3) :
                (k == "id") ?
                this.getName(r[k]) :
                r[k]
              )
              .join("\t\t\t")
            return `{${cls}|${row}}`
          }).join("\n")

          tooltip += rows
        }

        return tooltip
      }


      return res
    }
  },

  methods: {

    getName(code) {
      let f = find(this.countries, c => c.id == code)
      return (f) ? f.name : f
    },

    remove(item) {
      if (this.country_selection.length == 1) return
      const index = this.country_selection.indexOf(item)
      if (index >= 0) this.country_selection.splice(index, 1)
    },

    updateOptions({ data, options }) {
      if (!data) return

      const tempOptions = JSON.parse(JSON.stringify(options));
      // const tempData = JSON.parse(JSON.stringify(data));
      this.data = data;
      tempOptions.series[0].data = [data];

      this.options = tempOptions;
    },

    onUpdate({ data, options }){
      this.updateOptions({ data: this.data, options: this.config.options })
    },


    filter(item, queryText) {
      return includes(((item.name) ? item.name.toLowerCase() : ""), ((queryText) ? queryText.toLowerCase() : ""))
    },

<<< if( jace.mode == "development") { >>>

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(DsValueExplorerConfigDialog, { width: "80%" }, { config: widgetConfig })
    },
    
<<< } >>> 

    onSlideStart(wrapper){
      wrapper._updateConfig()
    },   

    // onError (error) {
    //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
    // },

    onDataSelect(emitter, data) {
      this.country_selection = data.selection
        .filter(s => s.selected)
        .map(d => ({
          id: d.entity.id,
          name: d.entity.title
        }))
    },

    loadTree() {
      if (
        !this.indicator_select ||
        (this.country_selection.length == 0) ||
        !this.year_select ||
        !this.config.metadata.concepts ||
        !this.config.metadata.countries ||
        !this.config.metadata.collections
      ) return

      this.msg = this.progress({text:`Loading tree for ${this.indicator_select}...`}) 
      // console.log(this.country_selection)  
      this.getTree(
        this.indicator_select,
        this.config.metadata.concepts,
        this.config.metadata.collections,
        this.country_selection.map(c => {
          let filter = {}
          filter[this.config.metadata.mapper.id] = find(this.countries, d => d.name == c).id
          filter.year = this.year_select
          return filter
        })

      ).then(res => {
        this.msg.cancel()
        this.updateOptions({ data: res, options: this.config.options })
      })

    },

    initiate() {
      if (this.config.metadata.concepts && this.config.metadata.collections && this.config.metadata.countries) {
        this.message = "Loading..."
        this.getIndicatorList(this.config.metadata.concepts).then(res => {
            this.indicators = res;
            this.indicator_select = res[0].concept
            this.error1 = false

            this.getCountryList(
                this.indicator_select,
                this.config.metadata.concepts,
                this.config.metadata.collections,
                this.config.metadata.countries
              ).then(res => {
                this.error2 = false
                this.countries = res;
                if (!this.config.dataSelectEmitters || this.config.dataSelectEmitters.length == 0) this.country_selection = [res[0].name]
              })
              .catch(() => {
                this.error2 = true
                this.message = `Entities definition "${this.config.metadata.countries}" or definition of dataset collections "${this.config.metadata.collections}" not found`
              })

            this.getYearList(
                this.indicator_select,
                this.config.metadata.concepts,
                this.config.metadata.collections
              ).then(res => {
                this.error3 = false
                this.years = res;
                this.year_select = res[0]
              })
              .catch(() => {
                this.error3 = true
                this.message = `Definition of dataset collections "${this.config.metadata.collections}" not found`
              })

          })
          .catch(() => {
            this.error1 = true
            this.message = `Dataset concepts definition "${this.config.metadata.concepts}" not found`
          })
      }
    }

  },


  props: ["config"],


  mounted() {
    this.$emit("init")
  },


  watch: {

    indicator_select() { this.loadTree() },

    country_selection() { this.loadTree() },

    year_select() { this.loadTree() },

    "config.options.widget.height"() {

      this.$nextTick(() => {
        this.updateOptions({ data: this.data, options: this.config.options })
      })

    },

    "config.metadata": {
      handler() {

        this.$nextTick(() => {
          this.initiate()
        })

      },
      deep: true
    }

  },

  created() {
    this.initiate()
  },

  data: () => ({

    options: null,
    error1: true,
    error2: true,
    error3: true,
    message: "No data available",
    selection: [],
    series: [],
    indicator_select: null,
    country_selection: [],
    year_select: null,
    indicators: null,
    countries: null,
    years: null,
    indicator_filter: '',
    completed: false

  })

}

</script>
