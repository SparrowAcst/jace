<template>
    <v-card flat>
      <v-layout row>
        <v-card-text class="subheading pa-1">Form: {{form.id}}</v-card-text>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <v-btn slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>Export form</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Import form</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Clone form</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout> 
      <v-divider></v-divider> 
      <v-card-text class="pa-1">Created: {{timeAgo(form.createdAt)}}</v-card-text>
      <v-card-text class="pa-1">Updated: {{timeAgo(form.updatedAt)}}</v-card-text>

      <v-layout column wrap class="warning darken-1" v-if="app.config.name != form.metadata.app_name.value">
        <v-card-text class="pa-1 white--text subheading">
          <v-icon color="white">mdi-alert-outline</v-icon>
          Page and Form mismatch
        </v-card-text>
        <v-card-text class="pa-1 pt-0 pb-0 white--text caption">Current app url is  . But form metadata is . For clone form select "Clone" command or ignore this message.</v-card-text>
      </v-layout>
      
    </v-card>
  
</template>

<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";

 export default  {
    
    mixins:[djvueMixin, listenerMixin],

    // components,

    methods:{
      timeAgo(d) {
        return moment(new Date(d)).fromNow();
      }
    },

    props:["form"],

    data: () =>({
    })

  }

</script>	