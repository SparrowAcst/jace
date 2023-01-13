<template>
  <div v-if="options">
    <v-footer 
      height="auto" 
      :color="(options.decoration) ? options.decoration.color || 'primary darken-1 white--text' : 'primary darken-1 white--text'" 
      :class="(options.decoration) ? options.decoration.color || 'px-0' : 'px-0'" 
    >
      <v-col cols-12>
        <v-row>
          <v-flex xs12 md6 px-5 py-2>
            <h3 class="headline font-weight-light">{{options.title}}</h3>
            <p class="font-weight-thin body-2">
              {{options.description}}
            </p>
          </v-flex>
        </v-row>
        <v-divider v-if="options.references && options.references.length > 0" class="theme--dark"></v-divider>
        <v-row>
          <v-layout justify-center row wrap py-2 style="font-weight:300;">
            <div v-for="(page, pageIndex) in options.references" :key="pageIndex">
              <router-link v-if="page.id" :to="`/${page.id || ''}`" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
                {{page.title}}
              </router-link>
              <a v-if="page.url" :href="page.url" :target="page.target" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
                {{page.title}}
              </a>
            </div>
          </v-layout>
        </v-row>
        <v-row class="font-weight-thin  py-3 justify-right pb-4 pt-1 px-3">
      <v-spacer></v-spacer>
      <v-col class="py-0 px-2" style="max-width:18em;">
        <div class="ma-0" style="height: 1em;">
          <span class="body-2">JACE</span><i class="caption"> Online SPA Development Tools</i>
        </div>
        <div class="mt-1 mb-0 mx-0 caption font-weight-thin" style="height: 1em;">
          Copyright &copy; 2014-{{currentYear}} <a href="mailto:boldak.andrey@gmail.com" target="_blank" class="white--text">Andrey Boldak</a>.
        </div>
        <div class="mt-1 caption font-weight-thin" style="height: 1em;">
          Licensed under the terms of the MIT License
        </div>
      </v-col>
    </v-row>
      </v-col>

    </v-footer>
    
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import moment from "moment"
import { isString } from "lodash"

<<< if( jace.mode == "development") { >>>
import FooterConfig from "./app-footer-config.vue";
<<< } >>>

export default {

  name: "app-footer-widget",

  icon: "mdi-page-layout-footer",

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
      return this.$dialogManager.showAndWait(FooterConfig, { width: "90%" }, { config: widgetConfig })
    }
  
  <<< } >>>
    
  },

  props: ["config"],

  computed: {
    options() {
      return this.config.data.embedded
    },

    currentYear() {
      return moment(new Date()).format("YYYY")
    }

  },

  mounted() { this.$emit("init") },

}

</script>
<style>
a:hover {
  font-weight: 500;
}

</style>
