export default {
  name: "edu-toc-widget",
  icon: "mdi-file-outline",

  getInitialConfig() {

    return {
      type: "edu-toc-widget",
      name: "noname",
      icon: "mdi-file-outline",
      options: {
        widget: {
          visible: true
        }

      },

      data: {
        source:"embedded",
        embedded:{
          event:"select-toc",
          toc: [
            {
              title: "Section 1",
              type: "topic",
              children:[
                {
                  title: "Subsection 1.1",
                  type: "topic"
                },
                {
                  title:"Doc 1.1",
                  type:"doc"
                },
                {
                  title:"Doc 1.2",
                  type:"doc"
                }
              ]
            },
            {
              title: "Section 2",
              type: "topic",
              children:[
                {
                  title: "Subsection 2.1",
                  type: "topic"
                },
                {
                  title:"Doc 2.1",
                  type:"doc"
                },
                {
                  title:"Doc 2.2",
                  type:"doc"
                }
              ]
            }
          ]
        },
        script: `type code here`
      }
    }

  }
}
