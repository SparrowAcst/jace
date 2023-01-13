export default {
  name: "app-topbar-widget",

  icon: "mdi-page-layout-header",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {

      type: "app-topbar-widget",
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
          title: "Application Title",
          locale: true,
          user: true,
          login: true,
          references: [{
            title: "Home",
            id: " "
          }]
        }
      }

    }
  }

}
