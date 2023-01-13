<template>
  <v-layout column>
    <v-flex xs12 v-if="this.message || !this.options">
      <h2 class="warning--text font-weight-light headline">{{message}}</h2>
    </v-flex>  
    <v-flex v-else xs12 style="border:1px solid #dedede; background:#ffffff;">
        <echart v-if="options" :options="chartOptions" :height="options.widget.height"></echart>
    </v-flex>
  </v-layout>  
</template>



<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";
  import echart from "@/components/core/ext/echart.vue"

  import ioMixin from "./io.mixin.js";

<<< if( jace.mode == "development") { >>>

  import DsOntologyConfigDialog from "./ds-ontology-config.vue";
 
<<< } >>>
   
   
 export default  {
    
    name:"ds-ontology-widget",

    icon: "mdi-triforce",

    mixins:[djvueMixin, listenerMixin, ioMixin],

    components:{ echart },
    
    computed:{
        
        chartOptions(){
          if(!this.options) return {}
          return JSON.parse(JSON.stringify(this.options))
      }  
    },

    methods:{

       updateOptions ({data, options}) {
        if(!data) return 
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        this.data = data;
        tempOptions.series[0].data = [data];
        
        this.options = tempOptions;
      },

  <<< if( jace.mode == "development") { >>>    
     
     onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(DsOntologyConfigDialog, {width:"80%"}, {config:widgetConfig})
      },

  <<< } >>>    

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      loadTree(){
       this.message="Loading..." 
       this.getOntology()
        .then(res => {
          this.message = null
          this.updateOptions({data:res, options:this.config.options})
        })
        .catch(() => { this.message = `Dataset "${this.config.metadata.concepts}" not found` } )  

      }

    },
    
    props:["config"],
    
    mounted(){      
      this.$emit("init") 
    },

    watch:{
           
      "config.options.widget.height"(){
        this.$nextTick( ()=> {
            this.updateOptions({data:this.data, options:this.config.options})
        })
      },

      "config.metadata.concepts"(value){
        if( value )

          this.$nextTick( ()=> {
              this.loadTree()
          })  
      }

    },

    created(){
      if( this.config.metadata.concepts){
        this.loadTree()
      }
    },

    
     data: () =>({
     
      options:null,
      message:"No data available",
      selection:[],
      series:[],
      indicator_select:null,
      country_selection:[],
      year_select:null,
      indicators:null,
      countries:null,
      years:null,
      indicator_filter:''

    })

  }

</script> 
