export default {
  name: "list-widget",

  icon: "mdi-format-list-text",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {

      type: "list-widget",
      // id:Vue.prototype.$djvue.randomName(),
      name: "noname",
      icon: "mdi-format-list-text",
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
          items: [
            {
              title: "Home",
              id: " "
            },
            {
              title: "Next",
              id: " "
            }
          ]
        }
      }

    }
  }

}
