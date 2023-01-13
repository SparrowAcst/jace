<template>
  <v-card flat class="pa-3">
    <v-row class="mx-2 my-0">
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon small @click="importForm()" v-on="on" class="primary--text pr-1">
            <v-icon>mdi-import</v-icon>
          </v-btn>
        </template>
        <span>Import Form</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon small @click="exportForm()" v-on="on" class="primary--text pr-1">
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </template>
        <span>Export Form</span>
      </v-tooltip>
      <v-divider vertical class="mx-3"></v-divider>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon small @click="changeLocale()" v-on="on" class="primary--text pr-2">
            <img :src="`img/${form.config.locale}.png`" small>
          </v-btn>
        </template>
        <span>Change Locale</span>
      </v-tooltip>
    </v-row>
    <v-divider></v-divider>
    <div class="pa-3">
      <v-row class="mx-0 caption accent--text font-weight-regular">
        <v-col cols="2" class="pa-0">
          id
        </v-col>
        <v-col class="pa-0">
          {{form.id}}
        </v-col>
      </v-row>
      <v-row class="mx-0 caption secondary--text font-weight-light">
        <v-col cols="2" class="pa-0 font-weight-regular">
          host
        </v-col>
        <v-col class="pa-0">
          {{app.config.dpsURL}}
        </v-col>
      </v-row>
      <div v-if="form">
        <v-row class="mx-0 caption secondary--text font-weight-light" v-for="(f, index ) in metadataFields" :key="index">
          <v-col cols="2" class="pa-0 font-weight-regular">
            {{f.key}}
          </v-col>
          <v-col class="pa-0">
            {{f.value}}
          </v-col>
        </v-row>
      </div>
      <v-row class="mx-0 caption secondary--text font-weight-light">
        <v-col cols="2" class="pa-0 font-weight-regular">
          Total questions
        </v-col>
        <v-col class="pa-0">
          {{form.config.questions.length}}
        </v-col>
      </v-row>
      <v-row class="mx-0 caption secondary--text font-weight-light">
        <v-col cols="2" class="pa-0 font-weight-regular">
          Locale
        </v-col>
        <v-col class="pa-0">
          {{form.config.locale}}
        </v-col>
      </v-row>
      <v-row class="mx-0 caption secondary--text font-weight-light">
        <v-col cols="2" class="pa-0 font-weight-regular">
          Created
        </v-col>
        <v-col class="pa-0">
          {{timeAgo(form.createdAt)}}
        </v-col>
      </v-row>
      <v-row class="mx-0 caption secondary--text font-weight-light">
        <v-col cols="2" class="pa-0 font-weight-regular">
          Updated
        </v-col>
        <v-col class="pa-0">
          {{timeAgo(form.updatedAt)}}
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <v-col wrap v-if="app.currentPage.url != form.metadata.app_url.value">
      <h3 class="headline warning--text font-weight-light pl-3 pt-3">Page and Form mismatch</h3>
      <p class="warning--text font-weight-light pl-3">
        Current app url is {{app.currentPage.url}} . But form {{form.id}} links to {{form.metadata.app_url.value}}.
      </p>
    </v-col>
    <v-col wrap v-if="!form.config.questions || form.config.questions.length == 0">
      <h3 class="headline warning--text font-weight-light pl-3 pt-3">No questions detected</h3>
      <p class="warning--text font-weight-light pl-3">
        Insert one or more question-widgets
      </p>
    </v-col>
  </v-card>
</template>
<script>
import { toPairs } from "lodash"

import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import moment from "moment"

export default {

  mixins: [djvueMixin, listenerMixin],

  computed: {
    metadataFields() {
      return toPairs(this.form.metadata).map(d => ({ key: d[0], value: d[1].value }))
    }
  },


  methods: {

    timeAgo(d) {
      return moment(new Date(d)).fromNow();
    },

    changeLocale() {
      let locale = (this.form.config.locale == "en") ? "uk" : "en"
      this.setLocale(locale)
      this.$emit("update", locale)
    },

    exportForm() {
      this.emit("form-export")
    },

    importForm() {
      this.selectFile()
        .then(file => {
          this.$djvue.loadLocalFile(file)
            .then(text => {
              let resp = JSON.parse(text).map(q => {
                q.id = this.$djvue.randomName()
                return q
              })
              this.emit("form-import", resp)
            })
        })
    }

  },

  props: ["form"]
}

</script>
