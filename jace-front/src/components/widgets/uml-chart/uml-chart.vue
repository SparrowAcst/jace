<template>
  <div>
    <center>
      <!-- <v-fade-transition v-if="plantRef"> -->
          <img  v-if="!loading" :src="plantRef" style="width:100%">
      <!-- </v-fade-transition> -->

      <!-- <v-fade-transition v-if="loading"> -->
        <div v-if="loading" class="title font-weight-light secondary--text"> 
          Rendering
          <div>
            <i class="mdi mdi-36px mdi-spin mdi-loading"></i>
          </div>
        </div>
      <!-- </v-fade-transition>   -->

    </center>
  </div>
</template>


<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";

<<< if( jace.mode == "development") { >>>  
  import UmlChartConfigDialog from "./uml-chart-config.vue";
<<< } >>>

  import { isNumber, isBoolean, isString, find, min, max, values } from "lodash"
 
  let dps = `service.uml(source:{{source}})`
  

 export default  {
    
    name:"uml-chart-widget",

    icon: "mdi-shape-outline",

    mixins:[djvueMixin, listenerMixin],

    props:["config"],

    methods:{

      onUpdate ({data}) {
        // console.log("update")
        // console.log(data)
        let runDps =  (script, state, file) => this.$dps.run({
          script,
          state: state || {},
          file
        })

        this.plantRef = null
        if(!data) return
        
        setTimeout(()=>{
          if(!this.plantRef) this.loading = true
        },250)  

          runDps(dps, {source:data})
          .then( res => {
            this.loading = false
            this.$nextTick(() => {this.plantRef = res.data})
          })  
       
      },

<<< if( jace.mode == "development") { >>>
      
      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(UmlChartConfigDialog, {width:"90%"},{config:widgetConfig})
      },

<<< } >>>
    
    },

    mounted(){ 
      this.$emit("init") 
    },
    
    data: () =>({
      plantRef: null,
      loading: false
    })
}


</script> 
