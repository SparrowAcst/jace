<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-combobox v-model="mode" :items="sourceTypes" dense label="Select a data source type"></v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-text-field v-show="mode == 'url'" v-model="config.data.url" label="url" hint="For example, djvue/components/widgets/html/1.htm">
        </v-text-field>
        <editor v-show="mode == 'embedded'" :content="embeddedSource" lang="json" :sync="true" @change="onUpdateSource" style="border:1px solid #999;height:24em !important">
        </editor>
        <v-layout column v-show="mode == 'dps'">
          <v-dialog v-model="snippets" max-width="50%">
            <template v-slot:activator="{ on }">
              <v-layout row>
                <v-spacer></v-spacer>
                <v-btn class="primary--text" text :disabled="!editor" v-on="on">Snippets</v-btn>
              </v-layout>
            </template>
            <v-card flat>
              <snippet-tree :editor="editor" @select="snippets = false"></snippet-tree>
            </v-card>
          </v-dialog>
          <editor :content="config.data.script" lang="dps" :sync="true" @change="onUpdateScript" @mount="setEditor" style="border:1px solid #999;height:24em !important">
          </editor>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import editor from '@/components/core/ext/ace-editor.vue';
import snippetTree from "./dps/dps-snippets-tree.vue"
import { isString } from "lodash"

export default {
  name: "source-editor",
  components: {
    editor,
    "snippet-tree": snippetTree
  },

  props: ["config"],

  computed: {
    embeddedSource() {

      return (isString(this.config.data.embedded))
                ? this.config.data.embedded
                : JSON.stringify(this.config.data.embedded, null, "\t")

    }
  },

  data: () => ({
    sourceTypes: ["url", "dps", "embedded"],
    mode: "",
    snippets: false,
    editor: null,
    esource:null
  }),

  methods: {

    setEditor(editor) {
      this.editor = editor;
    },

    onUpdateSource(value) {
      this.esource = value
    },

    onUpdateScript(value) {
      this.config.data.script = value
    }
  },

  created() {

    this.mode = this.config.data.source;
    this.esource = (isString(this.config.data.embedded))
                ? this.config.data.embedded
                : JSON.stringify(this.config.data.embedded, null, "\t")

    this.clearWatch = this.$watch("mode", () => { this.config.data.source = this.mode })
    
  },

  beforeDestroy () {
    
    try {
      this.config.data.embedded = JSON.parse(this.esource)  
    } catch (e) {
      this.config.data.embedded = this.esource
      this.warning({
        type: "error",
        title: "Data error",
        text: e.toString()
      })
    }
  },

  destroyed() {
    this.clearWatch();
  }

}

</script>
