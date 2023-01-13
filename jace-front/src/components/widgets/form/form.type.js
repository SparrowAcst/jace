import { toPairs } from "lodash"
let _ = { toPairs }
export default {
  name: "form-widget",

  icon: "mdi-cards-variant",

  getInitialConfig() {
    return {
      type: "form-widget",
      name: "noname",
      icon: "mdi-cards-variant",
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

    _.toPairs(this.app.config.skin.holders)
      .map(h => h[1].widgets)
      .forEach(w => {
        widgets = widgets.concat(w)
      })

    _.toPairs(this.app.currentPage.holders)
      .map(h => h[1].widgets)
      .forEach(w => {
        widgets = widgets.concat(w)
      })

    let forms = widgets.filter(w => w.type == "form-widget")

    if (forms.length > 0) {
      this.$djvue.warning({
        type: "error",
        title: "Cannot create form",
        text: "Cannot create many form instance."
      })
      return false;
    }
    return true;
  }



}
