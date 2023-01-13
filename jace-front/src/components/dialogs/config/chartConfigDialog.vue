<template>
    <config-dialog 
      :options="props"
      :submit="submit"
    ></config-dialog>  
 </template> 




<script>
import configDialog from "./config-dialog.vue"

export default {
	
  name: "chartConfigDialog",
  
  
	props:["options","submit"],

  components:{
    "config-dialog": configDialog 
  },

  computed:{
    props(){
      return {
        icon: this.options.config.icon,
        title: `echart-widget: ${this.options.config.id} ${this.options.config.name}`,
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
                editor: () => import("@/components/dialogs/config/parts/name-editor.vue")
              },
              {
                name: "Data",
                editor: () => import("@/components/dialogs/config/parts/source-editor.vue")
              },
              {
                name: "Decoration",
                editor:() => import("@/components/dialogs/config/parts/decoration-editor.vue")
              },
              {
                name: "Select-data Behavior",
                editor: () => import("@/components/dialogs/config/parts/data-select-emitters.vue")
              }

            ]
          }
        ],
      }
    }
}

</script>