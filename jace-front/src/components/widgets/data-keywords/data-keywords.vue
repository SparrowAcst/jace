<template>
     <v-autocomplete
      v-model="keywords"
      :items="availableKeywords"
      chips
      :label="config.title"
      :search-input.sync="searchKeyword" 
      @keyup.enter="createKeyword(searchKeyword)"
      multiple
      clearable
      dense
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          outlined 
          label
          color="primary--text"
          @click:close="removeKeyword(data.item)"
        >
          {{ data.item }}
        </v-chip>
      </template>

      <template v-slot:no-data>
          <v-btn text color="primary" @click="createKeyword(searchKeyword)">
            Create "{{searchKeyword}}"
          </v-btn>
        </template>
    </v-autocomplete>
 </template>

<script>

  import djvueMixin from "@/mixins/core/djvue.mixin.js";
  import listenerMixin from "@/mixins/core/listener.mixin.js";
  import configDialog from "./data-keywords-config.vue"
  import { isString } from "lodash"

  export default {
    
    props:["config"],

    mixins:[djvueMixin, listenerMixin],

    computed:{
      items(){
        if(!this.source) return
        return this.source
      }
    },

    
    methods: {

      onValidate(data,options){
      if( isString(data) ) {
          try {
            data = JSON.parse(data)
            return data
          } catch (e) {
            return { error: e.toString() }
          }
        }
      return data  
    },


      onUpdate ({data}) {
         this.availableKeywords = data
      },

      createKeyword(keyword) {
        if(keyword && keyword.length>0){
          this.availableKeywords.push(keyword)
          this.keywords.push(keyword)  
        }
      },

      removeKeyword(item) {
        const index = this.keywords.indexOf(item)
        if (index >= 0) this.keywords.splice(index, 1)
      },

      onReconfigure (widgetConfig) {
       return this.$dialogManager.showAndWait(configDialog, {width:"90%"}, {config:widgetConfig} )
      }

      
    },

    watch:{
      keywords(value){
        this.searchKeyword = null
        this.emit("keywords-select", this, value)
      }  
    },

    data: () => ({
      keywords: [],
      availableKeywords: [],
      searchKeyword: null,
      
    }),

       
    mounted(){this.$emit("init")}

  }
</script>
