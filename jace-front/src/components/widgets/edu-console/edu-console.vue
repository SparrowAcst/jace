<template>
<pre class="">
<span v-for="(m, index) in messages" :key="index" :class="m['class']">{{m.text}}
</span>  
</pre>
</template>

<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";


<<< if( jace.mode == "development") { >>>  
  import ConsoleConfig from "./edu-console-config.vue";
<<< } >>>


  export default  {
    
    name:"edu-console-widget",

    icon: "mdi-console-line",

    mixins:[djvueMixin, listenerMixin],

    data: () => ({
      messages: [],
      listen: false
    }),

    methods:{


      onUpdate ({data}) {
        // console.log("On update console", data)
        if (data.active) {
          this.addListeners()
        } else {
          this.removeListeners()
        }
      },

      push( type, text ){
        let classMap = {
          log: "secondary--text",
          clear: "secondary--text font-weight-light",
          warn: "warning--text",
          error: "error--text",
          info: "info--text",
          dir: "secondary--text",
          trace: "error--text",
          debug: "accent--text",
        }

        this.messages.push({
          "class": classMap[type],
          text
        })

        this.$nextTick(() => {
          this.$el.scrollTop = this.$el.scrollHeight - this.$el.clientHeight;
        })
      },

      addListeners(){
        if( this.listen ) return
        
        this.on({
          event:"console.log",
          callback: (data) => {
            this.push("log", data)
          }
        })
        this.on({
          event:"console.warn",
          callback: (data) => {
            this.push("warn", data)
          }
        })
        this.on({
          event:"console.error",
          callback: (data) => {
            this.push("error", data)
          }
        })
        this.on({
          event:"console.debug",
          callback: (data) => {
            this.push("debug", data)
          }
        })
        this.on({
          event:"console.info",
          callback: (data) => {
            this.push("info", data)
          }
        })
        this.on({
          event:"console.dir",
          callback: (data) => {
            this.push("dir", data)
          }
        })
        this.on({
          event:"console.trace",
          callback: (data) => {
            this.push("trace", data)
          }
        })
        this.on({
          event:"console.clear",
          callback: (data) => {
            this.messages = []
            this.push("clear", "--- Console was cleared ---")
          }
        })
        this.listen = true
        this.push("clear","--- Console was started ---")  
      },

      removeListeners(){
        this.off("console.log")
        this.off("console.debug")
        this.off("console.dir")
        this.off("console.info")
        this.off("console.warn")
        this.off("console.error")
        this.off("console.trace")
        this.off("console.clear")
        this.listen = false
        this.push("clear","--- Console was stopped ---")
      },


<<< if( jace.mode == "development") { >>>
      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(ConsoleConfig, {width:"90%"},{config:widgetConfig})
      }
<<<}>>>            

      
    },

    
    props:["config"],

    
    created(){
      // if (this.config.data.embedded.active) this.addListeners()
    },

    mounted(){ this.$emit("init") }

  }

</script> 
