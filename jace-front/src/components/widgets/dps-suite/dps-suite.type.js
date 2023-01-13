export default {
  name: "dps-suite-widget",

  icon: "mdi-card-text-outline",

  getInitialConfig() {
    return {

      type: "dps-suite-widget",
      name: "noname",
      icon: "mdi-card-text-outline",
      options: {
        widget: {
          visible: true
        }
      },
      scripts: [],
      data: {
        source: "embedded",
        embedded: `<h2 color="#eee"><center>not configured<center></h2><p>Use options dialog for configure this widget</p>`
      }

    }
  }

}
