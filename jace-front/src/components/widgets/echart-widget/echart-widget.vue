<template>
  <div>
    <v-layout column justify-center>
      <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;">
        {{config.title}}
      </h3>
      <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
        {{config.note}}
      </p>
      <echart v-if="options" :options="chartOptions" :height="options.widget.height" @chart-event="chartEventHandler"></echart>
    </v-layout>
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import echart from "@/components/core/ext/echart.vue"
import { isString } from "lodash"

<<< if( jace.mode == "development") { >>>
  import ChartConfig from "./echart-config-dialog.vue"
<<< } >>>

export default {

  name: "echart-widget",

  icon: "mdi-chart-bar",

  mixins: [djvueMixin, listenerMixin],

  components: { echart },

  methods: {

    chartEventHandler(params){
      // console.log("echart widget", params)
      this.emit("chart-event", this, params)
    },

<<< if( jace.mode == "development") { >>>

    onValidate(data,options){
      if( isString(data) ) {
          try {
            data = JSON.parse(data)
            return data
          } catch (e) {
            return { error: e.toString() }
          }
        }
      if(data.message){
        return { error: "\nDATA PROCESSING SCRIPT\n" + data.message } 
      }  
      return data  
    },

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(ChartConfig, { width: "90%" }, { config: widgetConfig })
    },
    
<<< } >>>
  
    onSlideStart(wrapper){
      wrapper._updateConfig()
    }


  },


  props: ["config"],

  mounted() {
    this.$emit("init")  
  }

}

</script>
<style scoped>
.chart {
  width: 100%;
}

</style>
