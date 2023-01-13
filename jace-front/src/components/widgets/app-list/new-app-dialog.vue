<template>
  <v-card>
    
    <v-card-title class="white--text title primary py-1">
      <v-icon small class="white--text">mdi-settings-outline</v-icon>
      <span class="ml-1 font-weight-light">New Application Settings</span>
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
          <v-text-field label="App name" :rules="[required, uniqueAppName]" v-model="name"></v-text-field>
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
          <v-textarea label="App description" v-model="description"/>
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
      <v-btn text color="primary" @click="reject">Cancel</v-btn>
      <v-btn text color="primary" @click="resolve">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js"
import themePeaker from "@/components/core/ext/theme-peaker.vue"
import { find, union, remove } from "lodash"

export default {

  name: "NewAppDialog",

  mixins: [djvueMixin],

  components: {
    "theme-peaker": themePeaker
  },

  props: ["options","submit"],

  data: () => ({

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
    theme: null
    
  }),

  methods: {

    required(value){
      return !!value || 'Required.'
    }, 

    uniqueAppName(value){
       return !find(this.options.appList, a => a.name == value) || 'Doublicate App name.'
    },
    
    onSetTheme(theme) {
      this.theme = theme
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
      this.icon = "./img/djvue.png"
      this.availableKeywords = [];
      this.$portal
        .get('api/app/get-list')
        .then(response => {
          response.data.forEach(app => {
            this.availableKeywords = union(this.availableKeywords, app.keywords)
          })
          remove(this.availableKeywords, k => k == "");
        })
    },

    removeKeyword(item) {
      const index = this.keywords.indexOf(item)
      if (index >= 0) this.keywords.splice(index, 1)
    },

    reject() {
      this.submit(null)
    },

    isValid() {

      if (this.name == "") {
        this.$djvue.warning({
          type: "error",
          title: "Cannot create app",
          text: "Empty app name detected"
        })
        return false
      }

      if (this.uniqueAppName(this.name) != true) {
        this.$djvue.warning({
          type: "error",
          title: "Cannot create app",
          text: "App name doublicates detected"
        })
        return false
      }

      let warnings = []

      if (this.title == "") {
        warnings.push('app title is empty')
        this.title = this.name
      }
      if (this.description == "") {
        warnings.push('app description is empty')
        this.description = "Djvue app template. If you is author or collaborator use design tools for modify it"
      }
      if (this.dpsURL == "") warnings.push('DPS url not defined')

      if (warnings.length > 0) {
        this.$djvue.warning({
          type: "warning",
          title: "Warnings",
          text: "Try create app, \nbut " + warnings.join(",\n")
        })
        return true
      }

      return true
    },

    resolve() {

      if (this.isValid()) {
        this.submit({
          icon: this.icon,
          name: this.name,
          title: this.title,
          description: this.description,
          keywords: this.keywords,
          dpsURL: this.dpsURL,
          theme: this.theme
        })
      }
    }

  },

  created() {
    this.initiate()
  }

}

</script>
