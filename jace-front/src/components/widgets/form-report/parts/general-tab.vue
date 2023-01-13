<template>
    <v-card flat>
      <v-layout row>
        <v-card-text class="subheading pa-1">Form: {{form.id}} hosted on {{app.config.dpsURL}}</v-card-text>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <v-btn slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            
            <v-list-tile @click="exportForm()">
              <v-list-tile-title>Export form</v-list-tile-title>
            </v-list-tile>
            
            <v-list-tile @click="importForm()">
              <v-list-tile-title>Import form</v-list-tile-title>
            </v-list-tile>
            
          </v-list>
        </v-menu>
      </v-layout> 
      <v-divider></v-divider>
        <v-layout row>
          <v-flex xs4 pa-1>
            Locale:
            <v-menu offset-y>
              <v-btn 
                slot="activator"
                flat
              >
                <img :src="`img/${form.config.locale}.png`" small>
              </v-btn>
              <v-list>
                <v-list-tile
                  key="uk"
                  @click="onChangeLocale('uk')"
                >
                  <img :src="'img/uk.png'" small>
                </v-list-tile>
                <v-list-tile
                  key="en"
                  @click="onChangeLocale('en')"
                >
                  <img :src="'img/en.png'" small>
                </v-list-tile>

              </v-list>
            </v-menu>
          </v-flex>  
        </v-layout>   
      <v-divider></v-divider>
      <v-card-text class="pa-1">Created: {{timeAgo(form.createdAt)}}</v-card-text>
      <v-card-text class="pa-1">Updated: {{timeAgo(form.updatedAt)}}</v-card-text>

      <v-layout column wrap v-if="app.config.name != form.metadata.app_name.value">
        <v-divider></v-divider>
        <h3 class="headline warning--text font-weight-light pl-3 pt-3">Page and Form mismatch</h3>
        <p class="warning--text font-weight-light pl-3">
          Current app url is  . But form metadata is . For clone form select "Clone" command or ignore this message.
        </p>
      </v-layout>

      <v-layout column wrap v-if="!form.config.questions || form.config.questions.length == 0">
        <v-divider></v-divider>
        <h3 class="headline warning--text font-weight-light pl-3 pt-3">No questions detected</h3>
        <p class="warning--text font-weight-light pl-3">
          Insert one or more question-widgets
        </p>
      </v-layout>




    </v-card>
  
</template>

<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import importFormDialog from "./import-form-dialog.vue"

Vue.prototype.$dialog.component('importFormDialog', importFormDialog)

 export default  {
    
    mixins:[djvueMixin, listenerMixin],

    // components,

    methods:{
      
      timeAgo(d) {
        return moment(new Date(d)).fromNow();
      },
      
      onChangeLocale(locale){
        this.setLocale(locale)
        this.$emit("update", locale)
      },
      
      exportForm(){
        this.emit("form-export")
      },

      importForm(){
        this.$dialog.showAndWait(importFormDialog)
          .then(res => {
            this.$djvue.loadLocalFile(res)
              .then( text => {
                let resp = JSON.parse(text).map( q => {
                  q.id = this.$djvue.randomName()
                  return q
                })
                this.emit("form-import", resp)
              })
          })
      }

    },

    props:["form"]
  }

</script>	