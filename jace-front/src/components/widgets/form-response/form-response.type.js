import { toPairs } from "lodash"


export default {
  name: "form-response-widget",

  icon: "mdi-file-document-outline",

  getInitialConfig() {
    return {
      type: "form-response-widget",
      name: "noname",
      icon: "mdi-file-document-outline",
      options: {
        widget: {
          visible: true
        }
      },
      data: {
        source: "embedded",
        embedded: `<h2 color="#eee"><center>not configured<center></h2><p>Use options dialog for configure this widget</p>`
      }
    }
  },

  isCreateAvailable() {

    let widgets = [];

    toPairs(this.app.config.skin.holders)
      .map(h => h[1].widgets)
      .forEach(w => {
        widgets = widgets.concat(w)
      })

    toPairs(this.app.currentPage.holders)
      .map(h => h[1].widgets)
      .forEach(w => {
        widgets = widgets.concat(w)
      })

    let forms = widgets.filter(w => w.type == "form-widget")

    if (forms.length == 0) {
      this.$djvue.warning({
        type: "error",
        title: "Cannot create response report",
        text: "Form not detected.  Before create form."
      })
      return false;
    }
    return true;
  }

}
