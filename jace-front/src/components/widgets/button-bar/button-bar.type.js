export default {
  name: "button-bar-widget",
  icon: "mdi-table-row",

  getInitialConfig() {

    return {
      type: "button-bar-widget",
      name: "noname",
      icon: "mdi-table-row",
      options: {
        widget: {
          visible: true
        }

      },

      data: {
        embedded: {
          decoration:{

          },
          buttons:[{
              title: "Run",
              event: "push",
              decoration:{}
            }
          ]
        }
      }
    }

  }
}
