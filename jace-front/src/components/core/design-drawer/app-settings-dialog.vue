<template>
  <v-card>
    <v-toolbar dark flat height="36px" color="primary">
      <v-icon small>mdi-settings-outline</v-icon>
      <v-toolbar-title class="ml-1 font-weight-light">{{translate("Application_settings")}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text icon small class="mr-1">
        <v-icon small>mdi-close</v-icon>
      </v-btn>  
    </v-toolbar>
    <v-container>
      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
            <theme-peaker :value="$vuetify.theme.themes.light" @change="onSetTheme"></theme-peaker>
        </v-flex>
      </v-layout>
      <v-layout row> 
        <v-flex xs1 pl-3 pr-3 justify-center align-self-center>
          <v-avatar tile size="36">
            <dj-img :src="icon" icon="mdi-image-off" color="error"></dj-img>
          </v-avatar>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
          <v-text-field label="App icon" v-model="icon"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
          <v-text-field label="App name" v-model="name"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
          <v-text-field label="App title" v-model="title"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
          <v-textarea label="App description" v-model="description"></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
          <v-autocomplete v-model="keywords" :items="availableKeywords" color="primary" label="Keywords" multiple :search-input.sync="searchKeyword">
            <template slot="selection" slot-scope="data">
              <v-chip outline label color="primary" :selected="data.selected" close class="chip--select-multi" @input="removeKeyword(data.item)">
                {{ data.item }}
              </v-chip>
            </template>
            <template slot="item" slot-scope="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
            <template slot="no-data">
              <v-list-tile>
                <v-btn flat color="primary" @click="createKeyword(searchKeyword)">
                  Create "{{searchKeyword}}"
                </v-btn>
              </v-list-tile>
            </template>
          </v-autocomplete>
        </v-flex>
      </v-layout>
      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
          <v-progress-circular indeterminate color="secondary lighten-4" v-if="checkURL" size=24></v-progress-circular>
          <v-icon v-else-if="validURL" color="success">mdi-sync</v-icon>
          <v-icon v-else-if="!validURL" color="error">mdi-sync-off</v-icon>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
          <v-text-field label="DPS url" v-model="dpsURL" @input="onInputHandler"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="cancel">Cancel</v-btn>
      <v-btn text color="primary" @click="commit">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"

import i18nMixin from "@/mixins/core/i18n.mixin.js"
import themePeaker from "@/components/core/ext/theme-peaker.vue"

import * as _ from "lodash"

let i18n = {
  en:{
    "Application_settings": "Application settings"
  },
  uk:{
    "Application_settings": "Налаштування застосунку"
  }
}

export default {

  name: "AppSettingsDialog",

  props:["submit"],

  mixins: [djvueMixin, i18nMixin],

  components:{
    "theme-peaker": themePeaker
  },

  layout:"config",

 data () {
    return {
      editMode: false,
      search: "",
      translations: [],
      selected: [],
      icon: '',
      name: '',
      keywords: [],
      dpsURL: '',
      title: '',
      description: '',
      availableKeywords: [],
      searchKeyword: null,
      checkURL: false,
      validURL: false,
      timer: null,
      theme:null,
      i18n
    }
  },

  methods: {

    onSetTheme(theme){
      this.theme = theme;
      this.$vuetify.theme.themes.light = this.theme
    },

    onInputHandler() {

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.checkDpsURL()
      }, 1000);

    },

    checkDpsURL() {
      // console.log("checkDpsURL", this.dpsURL)
      this.checkURL = true;
      this.$http.get(this.dpsURL)
        .then(() => {
          this.checkURL = false;
          this.validURL = true;
        })
        .catch(() => {
          this.checkURL = false;
          this.validURL = false;
        })
    },


    createKeyword(keyword) {
      this.availableKeywords.push(keyword)
      this.keywords.push(keyword)
    },

    initiate() {
      this.icon = this.app.config.icon
      this.name = this.app.config.name
      this.title = this.app.config.title
      this.description = this.app.config.description
      this.keywords = this.app.config.keywords //.split(",").trim()
      this.dpsURL = this.app.config.dpsURL //$dps.getBaseURL()
      this.availableKeywords = [];
      this.$portal
        .get('api/app/get-list')
        .then(response => {
          response.data.forEach(app => {
            this.availableKeywords = _.union(this.availableKeywords, app.keywords)
          })
          _.remove(this.availableKeywords, k => k == "");
        })
      this.checkDpsURL()
    },

    removeKeyword(item) {
      const index = this.keywords.indexOf(item)
      if (index >= 0) this.keywords.splice(index, 1)
    },

    cancel() {
      // this.$emit('submit', null)
      this.submit(null)
    },

    commit() {
      this.submit( {
        icon: this.icon,
        name: this.name,
        title: this.title,
        description: this.description,
        keywords: this.keywords,
        dpsURL: this.dpsURL,
        theme: this.theme
      })
    }

  },

  created() {
    this.initiate()
  }

}

</script>
