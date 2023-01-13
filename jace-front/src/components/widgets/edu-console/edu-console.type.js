export default {
  name: "edu-console-widget",
  icon: "mdi-console-line",

  getInitialConfig() {

    return {
      type: "edu-console-widget",
      name: "noname",
      icon: "mdi-console-line",
      options: {
        widget: {
          visible: true
        }

      },

      data: {
        source:"embedded",
        embedded: {
          active: true
        },
        script: `type code here`
      }
    }

  }
}
