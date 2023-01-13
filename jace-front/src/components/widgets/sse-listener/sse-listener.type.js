export default {
  name: "sse-listener-widget",
  icon: "mdi-bell",

  getInitialConfig() {

    return {
      type: "sse-listener-widget",
      name: "noname",
      icon: "mdi-bell",
      options: {
        widget: {
          visible: true
        }

      },

      data: {
        source:"embedded",
        embedded:{
          align: "right",
          readonly: true,
          channel: "app",
          title: "User Activity",
          dateFormat:null,
          icon:"mdi-bell"
        },
        script: `type code here`
      }
    }

  }
}
