<template>
  
  <div>
    
    <div v-if="config.data.embedded.decoration.loggedIn.title" class="caption secondary--text">
      <center>
        {{config.data.embedded.decoration.loggedIn.title}}
      </center>
    </div>  
    
    <div  class="d-flex" :class="config.data.embedded.decoration.loggedIn.classes" >
        <v-avatar v-if="config.data.embedded.decoration.loggedIn.photo">
          <dj-img :src="app.user.photo" icon="mdi-account"></dj-img>
        </v-avatar>
        <div v-if="config.data.embedded.decoration.loggedIn.name">
          {{app.user.name}}
        </div>  
    </div>
  
  </div>

</template>

<script>


  import djvueMixin from "@/mixins/core/djvue.mixin";
  import listenerMixin from "@/mixins/core/listener.mixin";

<<< if( jace.mode == "development") { >>>  
  import LoginConfig from "./login-config.vue";
<<< } >>>  
  
  import _katex from "katex"
  import "katex/dist/katex.min.css"
  import asciimath2latex from "asciimath-to-latex" 
  import { template, templateSettings } from "lodash"
  

  let compile = (_template,context) => {
     templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    let result = template(_template)(context)

    templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

    return result
    
  }

  const mathBlock = (code) => {
    let tex = ''
    code.split(/(?:\n\s*){2,}/).forEach((line) => { // consecutive new lines means a new formula
      try {
       tex += _katex.renderToString(line.trim())
      } catch (err) {
        tex += `<pre>${err}</pre>`
      }
    })
    return tex
  }


  

 export default  {
    
    name:"login-widget",

    icon: "mdi-language-html5",

    mixins:[djvueMixin, listenerMixin],

    methods:{

      $asciiMath (formula){
        formula = formula.split(/(?:\n\s*){2,}/).map((item) => { return asciimath2latex(item) }).join('\n\n')
        // console.log(formula)
        return mathBlock(formula)
      },

      $latex ( formula ){
        // formula = formula.split(/(?:\n\s*){2,}/).map((item) => { return asciimath2latex(item) }).join('\n\n')
        return mathBlock(formula)
        // return _katex.renderToString(_ascii2latex(formula))
      },

      $f (formula){
        return this.$asciiMath(formula)
      },

      onUpdate ({data}) {
       this.template = data;
      },

<<< if( jace.mode == "development") { >>>
      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(LoginConfig,{width:"90%"}, {config:widgetConfig})  
      },
<<< } >>>      

      onClear(){
        this.onUpdate({
          data: "<div></div>"
        })
      },

      onError (error) {
        this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      },

      onDataSelect (emitter, data) {
        // console.log(JSON.stringify(data))
        this.template = data.selection.filter(item => item.selected).map(item => item.entity).join(", ")
        // this.emit("data-select", this, data+" redirected")
      } 

    },

    
    props:["config"],

    computed:{


      html(){

         try {
          return compile(this.template, this);  
        } catch(e) {
          this.$djvue.warning({
                      type:"error",
                      title:"Cannot compile template",
                      text:e.toString()
                    })
        }
        return "<div></div>"
      }

    },

    created(){ 
      // if(!this.$dialog._components.HtmlConfig){
      //  this.$dialog.component('HtmlConfig', HtmlConfig)
      // }
      
      this.template = this.config.data.embedded || "";

    },

    mounted(){ this.$emit("init") },
    
    data: () =>({
      // user: null
    })

  }

</script>	
<style>
  span.mord.accent {
    background: transparent !important;
  }
</style>