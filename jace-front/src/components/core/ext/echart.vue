<template>
    <div class="echart" :style="style"></div>
</template>
<script>

import * as echarts from 'echarts'

// import echarts from "echarts/dist/echarts.esm"//"echarts/dist/echarts-en"

// import registerWordCloud from "@/modules/echarts-wordcloud"
// registerWordCloud(echarts)

import listenerMixin from "@/mixins/core/listener.mixin.js"

export default {

  name: "echart",

  mixins: [listenerMixin],

  computed: {
    style() {
      return {
        height: (this.height || 250) + "px"
      }
    }
  },

  methods:{

    initChart(options){
      
      this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })
      
      this.resizeHandler = () => {
        this.width = this.$el.clientWidth
        this.chart.resize()
      }  

      if (window.attachEvent) {
        window.attachEvent('onresize', this.resizeHandler);
      } else {
        window.addEventListener('resize', this.resizeHandler);
      }

      if (options) {
       setTimeout(()=>{
          this.chart.setOption(options)
          this.chart.on('click', params => { 
            // console.log("echart component", params)
            this.$emit("chart-event", params)
          })

        },10)  
      }

      this.on({
        event: "slide-start",
        callback: () => {
          // console.log(this._uid, "SLIDE START",this.$el.clientWidth)
         setTimeout(()=>{
         // this.$nextTick(()=>{ 
            // console.log("Slide start",this._uid)
            // if(!this.chart && this.$el.clientWidth > 0){
            //   this.initChart(this.options)
            //   return
            //   console.log("Create chart", _uid)
            //   // this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })

            // }
            if (this.chart && this.options)
              // console.log("Slide start", this._uid, this.options) 
              this.chart.setOption(this.options, true)
              this.chart.resize()
              // console.log(this._uid, "RESIZE",this.$el.clientWidth)
          }, 10)   
        },
        rule: () => true
      })

     this.on({
        event: "update-dialog-view",
        callback: () => {
          // console.log(this._uid, "UPDATE-DIALOG-VIEW")
         setTimeout(()=>{
         // this.$nextTick(()=>{ 
            // console.log("Slide start",this._uid)
            // if(!this.chart && this.$el.clientWidth > 0){
            //   this.initChart(this.options)
            //   return
            //   console.log("Create chart", _uid)
            //   // this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })

            // }
            if (this.chart && this.options)
              // console.log("Slide start", this._uid, this.options) 
              this.chart.setOption(this.options, true)
              this.chart.resize()
              // console.log(this._uid, "RESIZE",this.$el.clientWidth)
          }, 10)   
        },
        rule: () => true
      })

    }
  },


  props: ["options", "height"],

  watch: {
    options: {
      handler: function(value) {

        if (value) {
          // // this.$nextTick(() => {
          // if(!this.chart && this.$el.clientWidth > 0){
          //   this.initChart()
          //   return
          //   // console.log("Create chart")
          //   // this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })
          // }
          if (this.chart) {
            setTimeout(()=>{
              // console.log("set options", this._uid, value)
              this.chart.setOption(value, true)
              this.chart.resize()
            },10)
            // this.chart.resize()
          }  
        // })
        }
      },
      deep: true
    },

   
    height(value) {
      // this.$nextTick(() => {
     // if(!this.chart && this.$el.clientWidth > 0){
     //    this.initChart()
     //    return
     //    // console.log("Create chart")
     //    // this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })
     //  }
      setTimeout(()=>{
        this.chart.resize({
          height: value
        },10)
      })
      
      // })
    }
  },

  mounted() {

    // console.log("MOUNTED", this)
    
    // if( this.$el.clientWidth > 0 ) {
      this.initChart(this.options)  
      // this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })
      
      // this.resizeHandler = () => {
      //   this.width = this.$el.clientWidth
      //   this.chart.resize()
      // }  

      // if (window.attachEvent) {
      //   window.attachEvent('onresize', this.resizeHandler);
      // } else {
      //   window.addEventListener('resize', this.resizeHandler);
      // }

      // if (this.options) {
      //   this.chart.setOption(this.options)
      // }

      // this.on({
      //   event: "slide-start",
      //   callback: () => {
      //     // console.log(this._uid, "SLIDE START",this.$el.clientWidth)
      //    setTimeout(()=>{
      //    // this.$nextTick(()=>{ 
      //       // console.log("Slide start",this.$el.clientWidth)
      //       if(!this.chart && this.$el.clientWidth > 0){
      //         // console.log("Create chart")
      //         this.chart = echarts.init(this.$el, null, { height: this.height,  width: "auto" })

      //       }
      //       if (this.chart && this.options) 
      //           this.chart.setOption(value, true)
      //         // this.chart.resize()
      //         // console.log(this._uid, "RESIZE",this.$el.clientWidth)
      //     }, 10)   
      //   },
      //   rule: () => true
      // })
    // }  

  },

  beforeDestroy() {
    if (window.attachEvent) {
      window.detachEvent('onresize', this.resizeHandler);
    } else {
      window.removeEventListener('resize', this.resizeHandler, false);
    }
    this.off()
  },


  data: () => ({
    chart: null,
    resizeHandler: null
  })
}

</script>
<style scoped>
.echart {
  width: 100% !important;
}

</style>
