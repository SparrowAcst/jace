<template>
    <annotator 
      v-if="options"
      ref="annotator"
      :id="config.id" 
      :data="options.document" 
      :options="getOptions"
      @select = "onSelectNodes"
    ></annotator>
</template>

<script>

  import annotator from "@/components/core/ext/nlp/annotator.vue"
  import * as utils from "@/components/core/ext/nlp/utils.js"

  import djvueMixin from "@/mixins/core/djvue.mixin";
  import listenerMixin from "@/mixins/core/listener.mixin";
  import { extend, template, templateSettings, isArray, keys, findIndex, flattenDeep, flatten, get, set } from "lodash"
  import { v4 } from "uuid/dist"


<<< if( jace.mode == "development") { >>>  
  import NlpResolverConfig from "./nlp-resolver-config.vue";
<<< } >>>  
  
  

  

  let compile = (_template,context) => {
     templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    let result = template(_template)(context)

    templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

    return result
    
  }

  

 export default  {
    
    name:"nlp-resolver-widget",

    components:{
      annotator
    },

    icon: "mdi-source-merge",

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


    onSelectNodes(selection){
      if(this.options.events){
        let event = this.options.events.select || "select-nodes"
        this.emit(event, selection, this)  
      }
    },


    createAnnotation(annotation){
      return selection => {
        if(selection.length == 0) return

        let parent = utils.getParent(selection[0], this.options.document)
        let start = findIndex(parent.childs, node => node.id == selection[0].id)
        let stop = findIndex(parent.childs, node => node.id == selection[selection.length-1].id)
        let childs = parent.childs.splice(start, stop-start+1)
        let newAnnotation = {
          type: annotation,
          childs,
          id: `${this.config.id}-${v4()}`
        }

        parent.childs.splice(start, 0, newAnnotation)

        this.$nextTick(() => {this.$refs.annotator.select(newAnnotation)})

        if(this.options.events){
          let event = this.options.events.create || "create-annotation"
          this.emit(event, newAnnotation, this)  
        }

        if(this.options.events){
          let event = this.options.events.change || "change-document"
          this.emit(event, this.options.document, this)  
        }
    
      }
  
    },

    nestingTest( node, annotation){
      let a = this.options.availableAnnotation[annotation]
      if(!a) return true
      a.nestedIn = a.nestedIn || [] 
      let parent = utils.getParent(node, this.options.document)
      return (parent && a.nestedIn.includes(parent.type)) || a.nestedIn.length == 0
    },

    _remove(selection){
      if(selection.length == 0 || selection.length > 1) return

        
      let parent = utils.getParent(selection[0], this.options.document)
      if(parent){
        let pos = findIndex(parent.childs, node => node.id == selection[0].id)
        parent.childs.splice(pos,1)
        parent.childs.splice(pos,0,selection[0].childs)
        parent.childs = flattenDeep(parent.childs)
        
        parent.childs.forEach( child => {
          if (!this.nestingTest(child, child.type)) this._remove([child])
        })  
      }
     
      if(this.options.events){
        let event = this.options.events.remove || "remove-annotation"
        this.emit(event, selection[0], this)  
      }

      if(this.options.events){
        let event = this.options.events.change || "change-document"
        this.emit(event, this.options.document, this)  
      }
  
    


    },

    removeAnnotation(selection){
      this._remove(selection)
      // this.$nextTick(() => {
        this.$refs.annotator.select(selection[0].childs)
      // })
      this.onUpdate({data:this.options})
    },


    resolveBranch(selection){
      // console.log("RESOLVE", selection)
      let branch = selection[0]
      let diff = utils.getParent(branch, this.options.document)
      let parent = utils.getParent(diff, this.options.document)
      // console.log(branch, diff, parent,findIndex(parent.childs, node => node.id == diff.id))
      
      parent.childs.splice(
        findIndex(parent.childs, node => node.id == diff.id),
        1,
        branch.childs
      )

      parent.childs = flatten(parent.childs)
      this.onUpdate({data:this.options})
    },
      
    getOptions(){
      if(!this.config) return {}
      let self = this  
      return {

            availableSelectionMode(){
              return ["singly", "bundly"]
            },

            menu(node){
              if(!node) return

              return (node.type == "BRANCH") 
                ? [{
                    title:node.name,
                    action: self.resolveBranch,
                    icon:"mdi-source-pull"
                  }]
                : null  
            }, 

            
            selectable(node){ 
              return  (node)
                        ? (node.type == "BRANCH")
                          ? ["singly","wrap"]
                          : null
                        : null                
            },

            classes(node){ 
              return   (node)
                        ?  (self.options && self.options.decoration.classes) 
                                ? self.options.decoration.classes[node.type] 
                                : null
                        : null        
            },

            color(node){
              return   (node)
                        ?  (self.options && self.options.decoration.color) 
                                ? self.options.decoration.color[node.type] 
                                : null
                        : null        
            },
            
            label(node){
              // console.log(node.type)
              // if(node.type == "BRANCH"){
              //   console.log(self.config.data.embedded.decoration.label[node.type], {node})
              //   console.log(compile(self.config.data.embedded.decoration.label[node.type], {node} ))
                 
              // }
              return   (node)
                        ?  (self.options && self.options.decoration.label) 
                                ? compile(self.options.decoration.label[node.type], {node} )
                                : null
                        : null        
            },
            
            tooltip(node){
              if (!self.options) return null
              return   (node)
                        ?  (self.options && self.options.decoration.tooltip && self.options.decoration.tooltip[node.type]) 
                                ? compile(self.options.decoration.tooltip[node.type], {node} ) 
                                : null
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
       return this.$dialogManager.showAndWait(NlpResolverConfig,{width:"90%"}, {config:widgetConfig})  
      },
<<< } >>>      

  },

    created(){ 
    },

    mounted(){ this.$emit("init") },
    
      

  }

</script>	
