<template>

  <v-card flat>
    <key-value-editor :object="form.metadata" value="value"></key-value-editor>
    
  </v-card>  

</template>

<script>
  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";
  // import moment from "moment"
  import keyValueEditor from "@/components/core/ext/key-value-list.vue"
  import { findIndex, toPairs } from "lodash"


  export default  {
      
      mixins:[djvueMixin, listenerMixin],
      props:["form"],
      components:{
        "key-value-editor":keyValueEditor
      },
      computed:{
        
      },

      methods:{
        cancelNewMetadata(){
          
          this.newMetadataKey = null
          this.newMetadataValue = null
          
          this.showNewMetadataDialog = false;
        
        },

        validate(){
          if(!this.newMetadataKey) return false
          if(findIndex(this.items, m => m.key == this.newMetadataKey)>=0) return false
          return true  
        },
        
        commitNewMetadata(){
          if(this.validate()){
            this.form.metadata[this.newMetadataKey] = {
              value: this.newMetadataValue,
              required:false,
              editable:true
            }
          }
          
          this.newMetadataKey = null
          this.newMetadataValue = null
          
          this.$emit("update",this.form.metadata)
          this.prepare()
          this.showNewMetadataDialog = false;
        },

        updateMetadata(){
          let updatedMeta = {}
          this.items.forEach(m => {
            updatedMeta[m.key] = JSON.parse(JSON.stringify(m))
            updatedMeta[m.key].key = undefined;
          })
          this.$emit("update",updatedMeta)
        },

        prepare(){
          if(!this.form) return
          this.items = toPairs(this.form.metadata)
            .map(item => {
              return {
                key:item[0],
                value:item[1].value,
                required:item[1].required,
                editable: item[1].editable
              }
            })
        },

        onSelect(){
          this.selection = this.items.filter( m => m.selected)
        },

        deleteMetadata(){
          this.selection.forEach( m => {
            let index = findIndex(this.items, i => m.key == i.key)
            this.items.splice(index,1)
          })
          this.updateMetadata()
        }

      },

      watch:{
        form(){
          this.prepare()
        }
      },

      created(){
        this.prepare()
      },

      data:() => ({
        newMetadataKey: null,
        newMetadataValue: null,
        showNewMetadataDialog: false,
        items:[],
        selection:[]
      })


  }    

</script>