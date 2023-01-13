<template>
  <div>
      <mapbox  v-if="options" :options="options" ref="mapbox" @loaded="onLoad"/>
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import mapbox from "@/components/core/ext/mapbox/mapbox.vue"
import { isString, extend } from "lodash"

<<< if( jace.mode == "development") { >>>
  import MapConfig from "./mapbox-config-dialog.vue"
<<< } >>>









export default {

  name: "mapbox-widget",

  icon: "mdi-chart-bar",

  mixins: [djvueMixin, listenerMixin],

  components: { mapbox },

  data: () => ({
    options: null,
    loaded: false
  }),

  
  methods: {

    getMap(){
      return (this.$refs["mapbox"]) ? this.$refs["mapbox"].getMap() : undefined
    },

    addOptions(options){
      if(this.$refs["mapbox"]){
        this.$refs["mapbox"].addOptions(options)  
      }
    },

    setOptions(options){
      if(this.$refs["mapbox"]){
        this.$refs["mapbox"].setOptions(options)  
      }
    },

    replaceOptions(options){
      if(this.$refs["mapbox"]){
        this.$refs["mapbox"].replaceOptions(options)  
      }
    },


    onUpdate ({data, options}) {
      this.options = extend( {}, data, options.widget )
    },

    chartEventHandler(params){
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
      return this.$dialogManager.showAndWait(MapConfig, { width: "90%" }, { config: widgetConfig })
    },
    
<<< } >>>
  
    onSlideStart(wrapper){
      wrapper._updateConfig()
    },

    onLoad(){
      this.loaded = true
    }



  },


  props: ["config"],

  created(){
  },

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
