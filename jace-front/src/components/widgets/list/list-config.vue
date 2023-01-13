<template>
    <config-dialog 
      :options="props"
      :submit="submit"
    ></config-dialog>  
 </template> 




<script>

import configDialog from "@/components/dialogs/config/config-dialog.vue"


export default {
  
  name: "ListConfig",
  
  components:{ "config-dialog": configDialog},

  props:["options", "submit"],

  computed:{

    props(){
      return {
        icon: this.options.config.icon,
        title: `app-footer-widget: ${this.options.config.id} ${this.options.config.name}`,
        config: this.options.config,
        editorTree: this.editorTree
      }
    }
  },

  
  data () {
      return {
        editorTree:[
          {
            name: "Configuration",
            children: [
              {
                name: 'Widget',
                editor:() => import("@/components/dialogs/config/parts/name-editor.vue")
              },
              {
                name: 'Style',
                editor: () => import("@/components/dialogs/config/parts/css-editor.vue")
              },
              {
                name: "Options",
                editor:() => import("@/components/dialogs/config/parts/options-editor.vue")
              }
            ]
          }
        ],
      }
    }
}

</script>