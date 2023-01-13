<template>
    <config-dialog 
      :icon="config.icon"
      :title="`chart-widget: ${config.id} ${config.name}`"
      :resolve="resolve"
      :reject="reject"
      :config="config"
      :editorTree="editorTree"
    ></config-dialog>  
 </template> 




<script>
import components from "./index.js";
import mixin from "djvue/mixins/core/configDialog.mixin.js"



export default {
	
  name: "LineChartConfig",
  
  components:{ "config-dialog": Vue.createConfigDialog(components)},

  mixins:[mixin],
  
	props:["config"],

	
  data () {
      return {
        editorTree:[
          {
            name: "Configuration",
            children: [
              {
                name: 'Widget',
                editor:"name-editor"
              },
              {
                name: "Data",
                editor:"source-editor"
              },
              {
                name: "Decoration",
                editor:"decoration-editor"
              },
              {
                name: "Select-data Behavior",
                editor:"select-data-editor"
              }

            ]
          }
        ],
      }
    }
}

</script>