<template>

  <v-card flat>
    <v-toolbar flat color="transparent" dense>
        
     <v-dialog v-model="showNewMetadataDialog" max-width="30%">
       <v-btn slot="activator" fab dark icon absolute bottom left small color="primary" @click="">
          <v-icon>mdi-plus</v-icon>
       </v-btn>
        <v-card>
          <v-toolbar dark flat color="primary">
            <v-icon large>mdi-plus</v-icon>
            <v-toolbar-title>New metadata</v-toolbar-title>
          </v-toolbar>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-text-field label="Metadata key" v-model="newMetadataKey" hint="Enter unique metadata key">
            </v-text-field>
          </v-flex>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-text-field label="Metadata Value" v-model="newMetadataValue">
            </v-text-field>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancelNewMetadata">Cancel</v-btn>
            <v-btn flat color="primary" @click="commitNewMetadata">Ok</v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>  
      
      <v-btn fab dark icon absolute bottom right small color="primary" @click="deleteMetadata()" :disabled="selection.length == 0">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>

    </v-toolbar> 
    
    <v-divider></v-divider> 
    
    <v-data-iterator :items="items" :rows-per-page-items="[-1]" column wrap>

      <v-layout row slot="item" slot-scope="props">
        <v-flex xs1>
          <v-checkbox secondary hide-details :disabled="props.item.required" v-model="props.item.selected" @change="onSelect()"></v-checkbox>
        </v-flex>
        <v-flex xs11>
          <v-text-field v-model="props.item.value" :disabled="!props.item.editable" :label=" props.item.key" @input="updateMetadata"></v-text-field>
        </v-flex>
      </v-layout>  

    </v-data-iterator> 
  
  </v-card>  

</template>

<script>
  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";

  export default  {
      
      mixins:[djvueMixin, listenerMixin],
      props:["form"],
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
          if(_.findIndex(this.items, m => m.key == this.newMetadataKey)>=0) return false
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
          this.items = _.toPairs(this.form.metadata)
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
            let index = _.findIndex(this.items, i => m.key == i.key)
            this.items.splice(index,1)
          })
          this.updateMetadata()
        }

      },

      watch:{
        form(value){
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