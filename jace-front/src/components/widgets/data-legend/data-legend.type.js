// import snippets from "./snippets.js"

export default {
  name: "data-legend-widget",

  icon: "mdi-repeat",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {

      type: "data-legend-widget",
      name: "noname",
      icon: "mdi-repeat",

      options: {
        widget: {
          visible: true,
          multiple: true,
          label: "Items"
        },

        mapper: {
          id: "3_alpha_code",
          title: "name"
        }
      },

      data: {
        source: "embedded",
        embedded: {
          "event": "data-select",
          "items":["2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014"]
        }  
      }
    }
  }
}
