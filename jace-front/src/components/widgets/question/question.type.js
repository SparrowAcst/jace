import snippets from "./snippets.js"
import { toPairs } from "lodash"


export default {
  name: "question",

  icon: "mdi-help-circle-outline",

  getInitialConfig(snippet) {

    let res = snippets[snippet]
    return res
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
        title: "Cannot create question",
        text: "Form not detected.  Before create form."
      })
      return false;
    }
    return true;
  }

}
