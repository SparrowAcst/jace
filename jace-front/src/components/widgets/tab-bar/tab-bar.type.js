export default {
  name: "tab-bar-widget",

  icon: "mdi-tab",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {

      type: "tab-bar-widget",
      // id:Vue.prototype.$djvue.randomName(),
      name: "noname",
      icon: "mdi-page-layout-header",
      options: {
        widget: {
          visible: true
        }
      },
      data: {
        source: "embedded",
        embedded: {
          decoration:{

          },
          tabs: [{
            title: "Home",
            id: " "
          }]
        }
      }

    }
  }

}
