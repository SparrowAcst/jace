<template>
  <v-card>
    <v-toolbar dark color="primary darken-2">
      <v-icon large>mdi-download</v-icon>
      <v-toolbar-title>Import Form</v-toolbar-title>
    </v-toolbar>
    <v-container>
      
      
      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
            <input type="file" label="file" v-on:change="fileChanged"/>
        </v-flex>
      </v-layout>


    </v-container>  
    

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="reject">Cancel</v-btn>
      <v-btn text color="primary" @click="resolve">Import</v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js"

export default {

  name: "ImportFormDialog",

  mixins: [djvueMixin],

  data: () => ({

    file:null

  }),

  methods: {

    
    fileChanged(e) {
      if (e) {
          if (e.target.files) {
            if (!this.multiple && e.target.files[0]) {
              this.file = e.target.files[0];
            } else if (this.multiple) {
              this.file = e.target.files
            } else {
              this.file = null
            }
          } else {
            this.file = null
          }
      }

    },

    isValid(){
      
      if(!this.file){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import form",
          text:"Form configuration file not selected"
        })
        return false
      }

      return true
   
    },

    reject() {
      this.$emit('submit', null)
    },

    resolve() {
      if(this.isValid()){
        this.$emit('submit', this.file)  
      }
    }

  }

}

</script>
