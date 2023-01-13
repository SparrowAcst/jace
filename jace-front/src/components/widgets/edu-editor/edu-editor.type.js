export default {
  name: "edu-editor-widget",
  icon: "mdi-code-braces",

  getInitialConfig() {

    return {
      type: "edu-editor-widget",
      name: "noname",
      icon: "mdi-code-braces",
      options: {
        widget: {
          visible: true
        }

      },

      data: {
        source:"embedded",
        embedded: {
          lang: "javascript",
          button: {
            title: "Run",
            event: "run-editor-script"
          },
          readOnly: true,
          
        },
        content: `// type script here\n`
        
      }
    }

  }
}
