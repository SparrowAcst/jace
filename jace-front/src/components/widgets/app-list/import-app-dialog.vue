<template>
  <v-card>
    
    <v-card-title class="white--text title primary py-1">
      <v-icon small class="white--text">mdi-import</v-icon>
      <span class="ml-1 font-weight-light">Import App</span>
      <v-spacer></v-spacer>
      <v-btn text icon small @click="reject">
        <v-icon small class="white--text">mdi-close</v-icon>
      </v-btn>  
    </v-card-title>

    <v-container>
      


      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
             <v-text-field label="App name" v-model="name" :rules="[required, uniqueAppName]"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
           <v-file-input type="file" label="file" @change="fileChanged" :rules="[required]"/>
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
import { find, findIndex } from "lodash"

export default {

  name: "ImportAppDialog",

  mixins: [djvueMixin],

  props:["options","submit"],

  data: () => ({

    name:null,
    file:null

  }),

  methods: {

    required(value){
      return !!value || 'Required.'
    }, 

    uniqueAppName(value){
       return !find(this.options.appList, a => a.name == value) || 'Doublicate App name.'
    },

    fileChanged(file) {
      this.file = file
    },

    isValid(){
      
      if(!this.name){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import app",
          text:"Empty app name detected"
        })
        return false
      }

      if(findIndex(this.options.appList, a => a.name.toUpperCase() == this.name.toUpperCase())>=0){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import app",
          text:"App name doublicates detected"
        })
        return false
      }

      if(!this.file){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import app",
          text:"Configuration file not selected"
        })
        return false
      }

      return true
   
    },

    reject() {
      this.submit(null)
    },

    resolve() {
      if(this.isValid()){
        this.submit({name:this.name, file:this.file})  
      }
    }

  }

}

</script>
