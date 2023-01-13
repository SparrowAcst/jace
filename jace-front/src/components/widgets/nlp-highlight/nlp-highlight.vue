<template>
    <annotator 
      v-if="options"
      ref="annotator" 
      :id="config.id"
      :data="options.document" 
      :options="getOptions"
    ></annotator>
</template>

<script>

  import annotator from "@/components/core/ext/nlp/annotator.vue"
  import * as utils from "@/components/core/ext/nlp/utils.js"

  import djvueMixin from "@/mixins/core/djvue.mixin";
  import listenerMixin from "@/mixins/core/listener.mixin";
  import { extend, template, templateSettings, set, get } from "lodash"

<<< if( jace.mode == "development") { >>>  
  import NlpHighlightConfig from "./nlp-highlight-config.vue";
<<< } >>>  
  
  

  

  let compile = (_template,context) => {
     templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    let result = template(_template)(context)

    templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

    return result
    
  }

  

 export default  {
    
    name:"nlp-highlight-widget",

    components:{
      annotator
    },

    icon: "mdi-format-color-highlight",

    mixins:[djvueMixin, listenerMixin],

    props:["config"],

    data: () => ({
      options:null
    }),

    methods:{

    getDocument(){
      return this.options.document 
    },
    
    getDecoration(){
      return this.options.decoration 
    },

    getAvailableAnnotation(){
      return this.options.availableAnnotation 
    },

    getSelection(){
      return this.options.selection
    },

    getEvents(){
      return this.options.events
    },

    getUtils(){
      return utils
    },

    getData(){
      return this.options
    },


    getOptions(){
      if(!this.options) return {}
      let self = this  
      return {
            
            
            classes(node){ 
              return (self.options && self.options.decoration.classes) 
                                ? self.options.decoration.classes[node.type] 
                                : null
            },

            color(node){
              return (self.options && self.options.decoration.color) 
                                ? self.options.decoration.color[node.type] 
                                : null
            },
            
            label(node){
              return (self.options && self.options.decoration.label) 
                                ? compile(self.options.decoration.label[node.type], {node} ) //self.config.data.embedded.decoration.label[node.type] 
                                : null
            },
            
            tooltip(node){
              if (!self.options) return null
              return (self.options && self.options.decoration.tooltip && self.options.decoration.tooltip[node.type]) 
                                ? compile(self.options.decoration.tooltip[node.type], {node} ) 
                                : null
            }
        
      }       
    },  

    onUpdate ({data}, mode) {
   
      if( mode ){
        if (mode.override) {
          set(this, mode.override, data)
        }
        if (mode.extend) {
          set(this, mode.extend, extend(get(this, mode.extend), data))
        }
      } else {
        this.options = data  
      }
      let temp = this.options
   
      this.options = null
      
      this.$nextTick(() => {
        this.options = temp
        if(this.options.events){
          let event = this.options.events.change || "change-document"
          this.emit(event, this.options.document, this)  
        }
      })
    },

<<< if( jace.mode == "development") { >>>
      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(NlpHighlightConfig,{width:"90%"}, {config:widgetConfig})  
      },
<<< } >>>      

  },

    created(){ 
    },

    mounted(){ this.$emit("init") },
    
      

  }

</script>	
