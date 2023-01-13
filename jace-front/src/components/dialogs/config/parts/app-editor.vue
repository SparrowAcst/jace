<template>
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
          <dj-img :src="app.config.icon" icon="mdi-image-off" color="error"></dj-img>
        </v-avatar>
      </v-flex>
      <v-flex xs11 pl-3 pr-3 justify-center>
        <v-text-field label="App icon" v-model="app.config.icon"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs1 pl-3 pr-3 justify-center>
      </v-flex>
      <v-flex xs11 pl-3 pr-3 justify-center>
        <v-text-field label="App name" v-model="app.config.name"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs1 pl-3 pr-3 justify-center>
      </v-flex>
      <v-flex xs11 pl-3 pr-3 justify-center>
        <v-text-field label="App title" v-model="app.config.title"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs1 pl-3 pr-3 justify-center>
      </v-flex>
      <v-flex xs11 pl-3 pr-3 justify-center>
        <v-textarea label="App description" v-model="app.config.description"></v-textarea>
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
        <v-autocomplete v-model="appKeywords" :items="availableKeywords" color="primary" label="Keywords" multiple :search-input.sync="searchKeyword" chips>
          <template v-slot:selection="data">
            <v-chip close-icon="mdi-close-outline" close color="primary" outlined label :input-value="data.selected" v-bind="data.attrs" @click="data.select" @click:close="removeKeyword(data.item)">
              {{ data.item }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template slot="no-data">
            <v-btn text color="primary" @click="createKeyword(searchKeyword)">
              Create "{{searchKeyword}}"
            </v-btn>
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
        <v-text-field label="DPS url" v-model="app.config.dpsURL" @input="onInputHandler"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"

import i18nMixin from "@/mixins/core/i18n.mixin.js"
import themePeaker from "@/components/core/ext/theme-peaker.vue"

import { union, remove } from "lodash"


let i18n = {
  en: {
    "Application_settings": "Application settings"
  },
  uk: {
    "Application_settings": "Налаштування застосунку"
  }
}



export default {
  name: "app-editor",
  props: ["config"],

  mixins: [djvueMixin, i18nMixin],

  components: {
    "theme-peaker": themePeaker
  },

  data() {
    return {
      availableKeywords: [],
      searchKeyword: null,
      appKeywords: [],
      checkURL: false,
      validURL: false,
      timer: null,
      i18n
    }
  },

  methods: {

    onSetTheme(theme) {
      this.app.config.theme = theme;
      this.$vuetify.theme.themes.light = this.app.config.theme
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
      this.checkURL = true;
      this.$http.get(this.app.config.dpsURL)
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
      this.appKeywords.push(keyword)
    },

    initiate() {

      this.appKeywords = this.app.config.keywords.map(d => d)
      this.availableKeywords = this.app.config.keywords.map(d => d);
      this.$portal
        .get('api/app/get-list')
        .then(response => {
          response.data.forEach(app => {
            this.availableKeywords = union(this.availableKeywords, app.keywords)
          })
          remove(this.availableKeywords, k => k == "");
        })
      this.checkDpsURL()
    },

    removeKeyword(item) {
      const index = this.appKeywords.indexOf(item)
      if (index >= 0) this.appKeywords.splice(index, 1)
    },

  },

  watch: {
    appKeywords: {
      handler(newValue) {
        this.app.config.keywords = newValue
      },
      deep: true
    }
  },

  created() {
    this.initiate()
  }
}

</script>
