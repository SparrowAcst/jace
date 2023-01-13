// import snippets from "./snippets.js"

export default {
  name: "data-keywords-widget",

  icon: "mdi-format-list-checks",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {



      type: "data-keywords-widget",
      name: "noname",
      icon: "mdi-format-list-checks",

      options: {
        widget: {
          visible: true
        }
      },

      data: {
        source: "embedded",
        embedded: []
      }


    }
  }
}
