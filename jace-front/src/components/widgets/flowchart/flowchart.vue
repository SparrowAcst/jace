<template>
   
    <div style="text-align:center;" v-html="html"></div>
    
</template>

<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";
  import FlowchartConfig from "./flowchart-config.vue";
  import mermaid from "mermaid"

  export default  {
    
    name:"flowchart-widget",

    icon: "mdi-shape-outline",

    mixins:[djvueMixin, listenerMixin],

    methods:{

     
      onUpdate ({data}) {
       this.template = data;
       try {
          mermaid.render("d"+this.$djvue.randomName(), this.template, svg => {this.$nextTick(() => {this.html = svg})})  
        } catch(e) {
          this.$djvue.warning({
                      type:"error",
                      title:"Cannot compile template",
                      text:e.toString()
                    })
        }
      },

      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(FlowchartConfig, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      onDataSelect (emitter, data) {
        // console.log(JSON.stringify(data))
        this.template = data.selection.filter(item => item.selected).map(item => item.entity).join(", ")
        // this.emit("data-select", this, data+" redirected")
      } 

    },

    
    props:["config"],

    // computed:{
    //   html(){

    //     try {
    //       return mermaid.render("d"+this.config.id, this.template)  
    //     } catch(e) {
    //       this.$djvue.warning({
    //                   type:"error",
    //                   title:"Cannot compile template",
    //                   text:e.toString()
    //                 })
    //     }
    //   }

    // },

    created(){ this.template = this.config.data.embedded || ""; },

    mounted(){ this.$emit("init") },
    
    data: () =>({
      template:"",
      html:""
    })

  }

</script>	
