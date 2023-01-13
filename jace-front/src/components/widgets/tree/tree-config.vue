<template>
    <config-dialog 
      :icon="config.icon"
      :title="`dataset-explorer-widget: ${config.id} ${config.name}`"
      :resolve="resolve"
      :reject="reject"
      :config="config"
      :editorTree="editorTree"
    ></config-dialog>  
 </template> 




<script>
import components from "./parts/index.js";
import mixin from "djvue/mixins/core/configDialog.mixin.js"



export default {
	
  name: "HtmlConfig",
  
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
                name: "Dataset Metadata Settings",
                editor:"ds-editor"
              },
              
              {
                name: "Datasets management",
                editor:"ds-management"
              }

            ]
          }
        ]
      }
    }
}

</script>