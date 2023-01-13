// import snippets from "./snippets.js"

export default {
  name: "data-selector-widget",

  icon: "mdi-format-list-checks",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {

      type: "data-selector-widget",
      name: "noname",
      icon: "mdi-format-list-checks",

      options: {
        widget: {
          visible: true,
          multiple: true,
          label: "Select Entities",
          event: "data-select"
        },
        
        mapper: {
          id: "3_alpha_code",
          title: "name"
        }
      },

      data: {
        source: "embedded",
        embedded: [{
            "id": "ABW",
            "title": "Aruba"
          },
          {
            "id": "ADO",
            "title": "Andorra"
          },
          {
            "id": "AFG",
            "title": "Afghanistan"
          },
          {
            "id": "AGO",
            "title": "Angola"
          },
          {
            "id": "ALB",
            "title": "Albania"
          }
        ]
      }
    }
  }
}
