<template>
  <div>
    <v-container v-if="message">
      <v-flex xs12>
        <h2 class="warning--text font-weight-light headline">{{message}}</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="uploadCollections()">Upload collections...</v-btn>
    </v-container>
    <v-container v-else pa-0>
      <v-row class="mx-0" v-if="!collections">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-row>
      <v-layout column v-if="collections">
        <div v-if="collections">
          <v-row class="mx-0" align-center>
            <h3 class="primary--text font-weight-light subheading">
              Schema: "dj-data" ( {{collections.length}} items )
            </h3>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="uploadCollections()">Upload collections...</v-btn>
          </v-row>
          <v-flex xs12 pa-2 style="max-height:10em; overflow:auto; border:1px solid #dedede;">
            <v-row v-for="(c, cIndex) in collections" :key="cIndex" class="pt-2 mx-0" style="cursor:pointer;" @click="select(c)">
              <v-icon class="body-1 pr-2" :class="(selected && c == selected) ? 'primary--text' : 'secondary--text font-weight-light'">
                mdi-grid-large
              </v-icon>
              <h3 class="body-1" :class="(selected && c == selected) ? 'primary--text' : 'secondary--text font-weight-light'">
                {{c}}
              </h3>
            </v-row>
          </v-flex>
        </div>
        <div v-if="sampleTable">
          <v-flex xs12 pa-2>
            <v-layout row align-center>
              <h3 class="primary--text subheading font-weight-light">
                Sample from "{{selected}}"
              </h3>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="exportCollection(selected)">Download</v-btn>
            </v-layout>
            <v-data-table :headers="sampleTable.headers" :items="sampleTable.rows" dense calculate-widths :items-per-page="Number.POSITIVE_INFINITY" hide-default-footer style="display: inline-grid;" height="300px" fixed-header>
              <template v-slot:header="props">
                <td :colspan="sampleTable.headers.length">
                  <v-divider></v-divider>
                </td>
              </template>
              <template v-slot:body="props">
                <tbody>
                  <tr v-for="(item, rowIndex) in props.items" :key="rowIndex">
                    <td v-for="(col, index) in sampleTable.headers" :key="index" class="caption">
                      {{item[col.value]}}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { isString } from "lodash"
let _ = { isString }
import ioMixin from "./ds-io.mixin.js"

export default {

  name: "dataset-management",

  props: ["config"],

  mixins: [ioMixin],

  methods: {

    exportCollection(c) {
      this.dpsDownloadCollection(c)
        .then(url => {
          window.location.href = url
        })
    },

    loadCollections() {
      this.collections = null;
      this.dpsLoadSchema()
        .then(res => {
          this.collections = res;
          this.message = null
        })
        .catch(() => {
          this.message = `Schema "dj-data" is empty.`
        })
    },

    select(item) {
      if (!this.selected) {
        this.selected = item
      } else {
        this.selected = (this.selected == item) ? null : item
      }
    },


    uploadCollections() {
      this.selectFile()
        .then(file => {
          if (!file) return
          this.resolveFile(file)
        })
    },

    resolveFile(file) {
      this.selectFileDialog = false;
      this.sample = null;
      this.collections = null;
      this.message = "Uploading..."
      this.dpsUploadCollections(file)
        .then(res => {
          let messages = res.data.map(m => {
            let res = JSON.parse(m.message[0])
            res = (_.isString(res)) ? res : JSON.stringify(res.data)
            return res
          }).join("\n")

          this.$djvue.warning({
            type: "success",
            title: "Upload Collections",
            text: messages
          })
          this.message = "Loading..."
          this.loadCollections()
        })
        .catch(e => {
          this.$djvue.warning({
            type: "error",
            title: "Cannot Upload Collections",
            text: e.toString()
          })
        })
    }

  },

  computed: {

    sampleTable() {
      if (!this.sample) return null
      return {
        headers: this.sample.dataset.dimensions.map(item => ({
          text: item,
          align: 'center',
          value: item
        })),
        rows: this.sample.dataset.source
      }
    }

  },

  watch: {

    selected(newValue) {
      if (!newValue) {
        this.sample = null
      } else {
        this.dpsLoadCollectionSample(newValue)
          .then(res => {
            this.sample = res
          })
      }
    }
  },

  data: () => ({
    collections: null,
    selected: null,
    sample: null,
    file: null,
    selectFileDialog: false,
    message: "Loading..."
  }),

  created() {
    this.loadCollections()
  }
}

</script>
