export default {
  name: "app-footer-widget",

  icon: "mdi-page-layout-footer",

  getInitialConfig() {
    // snippet = snippet || "default"
    // let res = snippets[snippet] || snippets["default"]
    // return res

    return {

      type: "app-footer-widget",
      // id:Vue.prototype.$djvue.randomName(),
      name: "noname",
      icon: "mdi-page-layout-footer",
      options: {
        widget: {
          visible: true
        }
      },
      data: {
        source: "embedded",
        embedded: {

          title: "Application Title",
          description: "Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          references: [{
            title: "Home",
            id: " "
          }]
        }
      }

    }
  }

}
