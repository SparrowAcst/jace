<template>
  <div>
  <v-app-bar 
    v-if="options" 
    :dark = "(options.decoration) ? options.decoration.dark  : true" 
    :light = "(options.decoration) ? options.decoration.light : false"
    :height = "(options.decoration) ? options.decoration.height : undefined"
    :tile = "(options.decoration) ? options.decoration.tile : true"
     
    :dence = "(options.decoration) ? options.decoration.dence : true"
    :flat =  "(options.decoration) ? options.decoration.flat : true"
    :color="(options.decoration) ? options.decoration.color || 'primary darken-1' : 'primary darken-1'" 
    :class="(options.decoration) ? options.decoration.class || 'my-0 py-0' : 'my-0 py-0'" 
    :style="(options.decoration) ? options.decoration.style : 'padding-top: 1em; font-weight:300;'"
    :src= "(options.decoration) ? options.decoration.bgImage : undefined"
  >
   
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
      ></v-img>
    </template>
    
    <div>
      <img
          v-if="options.decoration && options.decoration.appIcon"
          :src= "options.decoration.appIcon.src"
          :class="options.decoration.appIcon.class || ''" 
          :style="options.decoration.appIcon.style || ''"
      
      ></img>
    </div>

    <div>  
      <div 
        :class="(options.decoration && options.decoration.title) ? options.decoration.title.class || 'display-2 font-weight-light white--text' : 'display-2 font-weight-light white--text'"
        :style="(options.decoration && options.decoration.title) ? options.decoration.title.style || '' : ''"
      
      >
        {{options.title}}
      
      </div>
      <div 
        :class="(options.decoration && options.decoration.subTitle) ? options.decoration.subTitle.class || 'pl-1 headline font-weight-light white--text' : 'pl-1 headline font-weight-light white--text'"
        :style="(options.decoration && options.decoration.subTitle) ? options.decoration.subTitle.style || '' : ''"
      >
        {{options.subTitle}}
      </div>  
    </div>

    <template v-slot:extension>
      
    <v-spacer></v-spacer>

    <span v-for="(page, pageIndex) in options.references" :key="pageIndex">
      <router-link v-if="page.id" :to="`/${page.id || ''}`" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
        {{page.title}}
      </router-link>
      <a v-if="page.url" :href="page.url" :target="page.target" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
        {{page.title}}
      </a>
    </span>
    <v-divider vertical v-if="options.login || options.locale || options.user"></v-divider>
    <v-tooltip left v-if="!app.user.isLoggedIn && options.login">
      <template v-slot:activator="{ on }">
        <v-btn outlined x-small  color="white" @click="login()">
          Log in with Google
          <!-- <v-icon>mdi-google-plus</v-icon> -->
        </v-btn>
      </template>
      <span>Log in with Google</span>
    </v-tooltip>
    <v-menu offset-y v-if="options.locale">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <img :src="'./img/'+$i18n.locale+'.png'" small>
        </v-btn>
      </template>
      <v-list>
        <v-list-item key="uk" @click="setLocale('uk')">
          <img :src="'./img/uk.png'" small>
        </v-list-item>
        <v-list-item key="en" @click="setLocale('en')">
          <img :src="'./img/en.png'" small>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tooltip left v-if="app.user.isLoggedIn && options.user">
      <template v-slot:activator="{ on }">
        <v-avatar size="32" class="ml-2" v-on="on" style="border: 1px solid rgba(255, 255, 255, 0.3);">
          <dj-img :src="app.user.photo" icon="mdi-account"></dj-img>
        </v-avatar>
      </template>
      <span>{{app.user.name}}</span>
    </v-tooltip>
  </template>
  </v-app-bar>
 </div> 
</template>
<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import { isString } from "lodash"

<<< if( jace.mode == "development") { >>>

import TopBarConfig from "./app-topbar-config.vue"


<<< } >>>


export default {

  name: "app-topbar-widget",

  icon: "mdi-page-layout-header",

  mixins: [djvueMixin, listenerMixin],

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


<<< if( jace.mode == "development") { >>>

    onReconfigure(widgetConfig) {
      return this.$dialogManager.showAndWait(TopBarConfig, { width: "90%" }, { config: widgetConfig })
    }

<<< } >>>

  },


  props: ["config"],

  computed: {
    options() {
      return this.config.data.embedded
    }
  },

  mounted() { this.$emit("init") }

}

</script>
<style>
a:hover {
  font-weight: 500;
}

</style>
