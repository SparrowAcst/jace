<template>
  <v-flex xs12>
      {{wrap}}
    <div class="editor" :style="(wrap || wrap=='') ? 'height:auto !important':''" v-html="highlighted.html"></div>
  </v-flex>  
</template>

<script>



  export default {
    
    name:"editor",

    props:["content","lang","theme","wrap"], 
    
    data: () => ({
        highlighted: null,
        highlight:null
    }),

    methods:{
    },

    created() {
      // const vm = this;
      // var lang = vm.lang;
      // var theme = vm.theme;
     
      this.highlight = window.ace.require("ace/ext/static_highlight");


      let mode = window.ace.require("ace/mode/"+ this.lang);
      console.log("created ",mode)
      mode = (mode) ? mode.Mode : mode;  
      
      let theme = window.ace.require("ace/theme/tomorrow");
      
      if(!mode){
          window.console.error("Highlighter mode: "+this.lang+" not supported")
          return
      }
      
      if(!theme){
          window.console.error("Highlighter theme: "+this.theme+" not supported")
      }

      // let content = (this.content) ? JSON.parse(JSON.stringify(this.content)) : ""

      this.highlighted = this.highlight.renderSync(
              this.content,
              new mode(),
              theme
      );
      // console.log(this.highlighted.css)
      // console.log(this.highlighted.html)
      
      

      window.ace.require("ace/lib/dom").importCssString(
          this.highlighted.css
              .replace("font-size: 12px;","")
              .replace(
                  ".ace_static_highlight .ace_gutter-cell:before {",
                  ".ace_static_highlight .ace_gutter-cell:before { font-size: xx-small; padding-right: 0.5em; "
              ),
          "ace_highlight"
      );     
      
      this.$emit("mount")

      // elm.html(highlighted.html)
// var session = vm.session = editor.getSession();
// editor.$blockScrolling = Infinity;
// session.setMode('ace/mode/' + lang);
// editor.setTheme('ace/theme/' + theme);
// session.setValue(vm.content, 1);
// session.on('change', () => {
// vm.$emit('change', session.getValue());
// });

     
    },

    watch: {
      
      content: function (newContent) {
        let mode = window.ace.require("ace/mode/"+ this.lang);
        console.log(mode)
        mode = (mode) ? mode.Mode : mode;  
        let theme = window.ace.require("ace/theme/tomorrow");
        
        if(!mode){
            window.console.error("Highlighter mode: "+this.lang+" not supported")
            return
        }
        
        if(!theme){
            window.console.error("Highlighter theme: "+this.theme+" not supported")
        }

        let content = (newContent) ? JSON.parse(JSON.stringify(newContent)) : ""

        this.highlighted = this.highlight.renderSync(
                content,
                new mode(),
                theme
        );
        
        window.ace.require("ace/lib/dom").importCssString(
            this.highlighted.css
                .replace("font-size: 12px;","")
                .replace(
                    ".ace_static_highlight .ace_gutter-cell:before {",
                    ".ace_static_highlight .ace_gutter-cell:before { font-size: xx-small; padding-right: 0.5em; "
                ),
            "ace_highlight"
        );     
      },

      // theme: function (newTheme) {
      //   const vm = this;
      //   vm.editor.setTheme('ace/theme/' + newTheme);
      // }
    }
  }

</script>

<style scoped>
  .editor {
    width: 100%;
    font-size: 14px;
    border: 1px solid #dedede;
  }
</style>
