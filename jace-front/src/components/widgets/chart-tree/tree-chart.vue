<template>
    <div>
    <v-layout column justify-center>
      <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;"> 
        {{config.title}}
      </h3>
      <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
        {{config.note}}
      </p>
      <echart v-if="options" :options="chartOptions" :height="options.widget.height"></echart>
      <!-- <div v-if="options">
          <pre class="caption">{{JSON.stringify(options, null, "\t")}}</pre>
      </div> -->
  </div>  
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
   import echart from "djvue/components/core/ext/echart.vue"
  
  var  ChartConfigDialog;
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
    // if(!Vue.prototype.$dialog._components["ChartConfigDialog"]){
      import("djvue/components/widgets/widget-share/chart/chart-config.vue")
        .then( res => {
          ChartConfigDialog = res.default
          Vue.prototype.$dialog.component('ChartConfigDialog', ChartConfigDialog)
      })
    // } else {
    //   ChartConfigDialog = Vue.prototype.$dialog._components["ChartConfigDialog"]
    // }      
  }
   
 export default  {
    
    name:"input-widget",

    icon: "mdi-triforce",

    mixins:[djvueMixin, listenerMixin],
    components:{ echart},
    
    computed:{
      chartOptions(){
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
         return res
      }
    },

    methods:{

      onUpdate ({data, options}) {
        const temp = _.extend(options,data);
        this.options = temp;
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(ChartConfigDialog, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      // onDataSelect (emitter, data) {
      //   console.log("onDataSelect", this.config.id, data)
      //   setTimeout(()=> {
      //     this.template = data
      //   },1000)
      //   this.emit("data-select", this, data+" redirected")
      // }

    },

    
    props:["config"],

    
    mounted(){      
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      series:[]

    })

  }

</script> 

<style scoped>
  .chart {
    width: 100%;
  }
</style>