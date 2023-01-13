<template>
  <<< if( jace.mode == "development") { >>>
  
  <v-container pa-0 style="border: 1px solid #dcdcdc;" v-if="!isProductionMode">
    <v-row class="mx-0">
      <v-btn icon :disabled="scripts.length==0" @click="showSnippets = !showSnippets">
        <v-icon class="primary--text">{{(!showSnippets)?'mdi-arrow-expand-right':'mdi-arrow-collapse-left'}}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="createScript()">
        <v-icon class="primary--text">mdi-plus</v-icon>
      </v-btn>
      <v-btn icon @click="renameScript()" :disabled="scripts.length==0">
        <v-icon class="primary--text">mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-divider vertical class="mx-3"></v-divider>
      <v-btn icon :loading="process" :disabled="process" @click="showResults = !showResults">
        <v-icon v-if="success" color="success">mdi-sync</v-icon>
        <v-icon v-else class="error white--text" style="border-radius:50%; padding:2px;">mdi-sync-off</v-icon>
      </v-btn>
      <v-btn icon :disabled="scripts.length==0" @click="runScript">
        <v-icon class="primary--text">mdi-play</v-icon>
      </v-btn>
      <v-btn icon :disabled="scripts.length==0" @click="uploadAndRunScript()">
        <v-icon class="primary--text">mdi-animation-play-outline</v-icon>
      </v-btn>
      <v-divider vertical class="mx-3"></v-divider>
      <v-btn icon @click="deleteScript" :disabled="scripts.length==0">
        <v-icon class="primary--text">mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-col v-if="scripts.length == 0" class="text-center">
      <h3 class="warning--text font-weight-light"> NO DATA PROCESSING SCRIPT AVAILABLE </h3>
    </v-col>
    <v-row v-else>
      <v-expand-x-transition>
        <v-col cols="3" v-if="showSnippets" class="pa-0 ml-3">
          <v-toolbar dark flat color="primary" height=36>
            <v-toolbar-title class="subheading white--text"> Snippets </v-toolbar-title>
          </v-toolbar>
          <snippet-tree :editor="editor" style="height:600px; overflow:auto"></snippet-tree>
        </v-col>
      </v-expand-x-transition>
      <v-divider vertical v-if="showSnippets"></v-divider>
      <v-col class="pa-0" :class="(showSnippets) ?'ml-0 mr-3' :'mx-3' ">
        <v-tabs v-model="tab" show-arrows>
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="(item, index) in scripts" :key="index" :href="`#tab-${item.name}`">
            <span class="my-0 py-0 caption font-weight-bold">{{ item.name }}</span>
          </v-tab>
          <v-tab-item v-for="(item, index) in scripts" :value="'tab-' + item.name" :key="index">
            <v-card flat>
              <!-- <pre>{{item.script}}</pre> -->
              <editor :content="item.script" lang="dps" :sync="true" @change="onUpdateScript" @mount="setEditor">
              </editor>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-divider v-if="showResults && dpsResult && scripts.length > 0"></v-divider>
    <v-col class="mx-0 pa-0" v-if="showResults && dpsResult && scripts.length > 0" style="max-height:35em; overflow:auto;">
      <v-flex v-if="success">
        <highlight :content="result" :lang="lang">
        </highlight>
      </v-flex>
      <pre class="body-2 error--text pl-2" v-else>{{result.message}}</pre>
    </v-col>
  </v-container>
  <<< } else { >>>
    <div></div>
  <<< } >>>
</template>
<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";

<<< if( jace.mode == "development") { >>>

import { findIndex, find } from "lodash"

let components = {
  "snippet-tree": () => import("./dps-snippets-tree.vue"),
  editor: () => import("@/components/core/ext/ace-editor.vue"),
  highlight: () => import("@/components/core/ext/ace-highlight.vue")
}

import createScriptDialog from "./dialogs/create-script.vue"
import renameScriptDialog from "./dialogs/rename-script.vue"



let supportedMode = {
  text: "text",
  string: "text",
  xml: "xml",
  csv: "csv",
  javascript: "javascript",
  json: "json",
  object: "json",
  "function": "json",
  dps: "dps",
  dataset: "json",
  error: "json",
  table: "json",
  help: "json",
  html: "html",
  bar: "json",
  hbar: "json",
  line: "json",
  area: "json",
  scatter: "json",
  radar: "json",
  deps: "json",
  pie: "json"
}

<<< } >>>

export default {

  name: "dps-suite-widget",

  icon: "mdi-card-text-outline",

  mixins: [djvueMixin, listenerMixin],

<<< if( jace.mode == "development") { >>>
  components,

  methods: {

    createScript() {
      this.$dialogManager.showAndWait(createScriptDialog, { width: "30%" })
        .then(name => {
          if (name) this.resolve(name)
        })
    },

    renameScript() {
      this.$dialogManager.showAndWait(renameScriptDialog, { width: "30%" })
        .then(name => {
          if (name) this.resolveRename(name)
        })
    },

    uploadAndRunScript() {
      this.selectFile()
        .then(file => {
          if (file) this.resolveFile(file)
        })
    },

    setEditor(editor) {
      this.editor = editor;
    },

    resolveFile(file) {
      this.process = true;
      this.dpsResult = null;

      this.$dps.run({
          script: this.selected.script,
          state: {},
          file
        })
        .then(res => {
          this.process = false;
          this.success = true
          this.dpsResult = res.data;
        })
        .catch(e => {
          this.process = false;
          this.success = false;
          this.dpsResult = { message: e.toString() }
        })
    },

    onUpdateScript(value) {
      this.selected.script = value
      this.setNeedSave(true)
    },

    checkDpsURL() {
      this.process = true;
      this.$http.get(this.app.config.dpsURL)
        .then(() => {
          this.process = false;
          this.success = true;
        })
        .catch(() => {
          this.process = false;
          this.success = false;
          this.dpsResult = { message: "Data processing server not available." }
        })
    },

    runScript() {
      this.process = true;
      this.dpsResult = null;
      this.$dps.run({
          script: this.selected.script
        })
        .then(res => {
          this.process = false;
          if (res.type != "error") {
            this.success = true;
            this.dpsResult = res
          } else {
            this.success = false;
            this.dpsResult = res
          }
          // console.log(res)
        })
        .catch(e => {
          this.process = false;
          this.success = false;
          this.dpsResult = { message: e.toString() }
          window.console.warn(e)
        })
    },


    deleteScript() {
      this.$djvue.confirm({
          type: "warning",
          text: `Do you want delete script ${this.selected.name}`,
          rejectText: "Cancel",
          resolveText: "Delete"
        })
        .then(() => {
          let index = findIndex(this.scripts, s => s.name == this.selected.name)
          let selectedIndex = (this.scripts.length == 1) ?
            -1 :
            (index == (this.scripts.length - 1)) ?
            this.scripts.length - 2 :
            index;

          this.scripts.splice(index, 1)
          if (this.scripts.length > 0) {
            this.selected = this.scripts[selectedIndex]
            this.tab = "tab-" + this.selected.name
          }

          this.setNeedSave(true)
        })
    },


    validateScriptName(name) {
      if (!name || name == "") return false;
      return findIndex(this.scripts, s => s.name == name) == -1
    },

    resolve(name) {
      if (this.validateScriptName(name)) {

        this.scripts.push({
          name,
          script: `
/**
 **
 **     DATA PROCESSING SCRIPT: ${name}
 **     SERVICE: ${this.app.config.dpsURL}
 **
 **/
`
        })
        this.selected = findIndex(this.scripts, s => s.name == name)
        this.currentScript = "tab-" + name

        this.setNeedSave(true)

      } else {
        this.$djvue.warning({
          type: "error",
          title: "Cannot create dps",
          text: "Script name is empty or doublicated"
        })
      }
      this.$nextTick(() => {
        this.tab = "tab-" + name
      })

    },

    resolveRename(name) {
      if (this.validateScriptName(name)) {
        this.renameDpsDialog = false
        this.selected.name = name
        this.currentScript = "tab-" + name
        this.newScriptName = null
        this.setNeedSave(true)

      } else {
        this.$djvue.warning({
          type: "error",
          title: "Cannot rename dps",
          text: "Script name is empty or doublicates detected."
        })
      }

    }




    // onUpdate ({data, options}) {
    //   this.template = data;
    // },

    // onReconfigure (widgetConfig) {
    //  return this.$dialog.showAndWait(HtmlConfig, {config:widgetConfig})
    // },

    // onError (error) {
    //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
    // },

    // onDataSelect (emitter, data) {
    //   // console.log(JSON.stringify(data))
    //   this.template = data.selection.filter(item => item.selected).map(item => item.entity).join(", ")
    //   // this.emit("data-select", this, data+" redirected")
    // } 

  },

  computed: {
    
    tabs() {
      return this.scripts.map(s => s.name)
    },

    lang() {
      return supportedMode[this.dpsResult.type] || "json"
    },

    result() {

      let mode = supportedMode[this.dpsResult.type] || "json"
      // this.lang = mode

      if (this.dpsResult.type == "error") {
        // this.success = false
        return (this.dpsResult.message) ? this.dpsResult : this.dpsResult.data
      }

      if (mode == "json") {
        return (this.dpsResult.data) ? JSON.stringify(this.dpsResult.data, null, "\t") : JSON.stringify(this.dpsResult)
      }

      return (this.dpsResult.data) ? this.dpsResult.data : this.dpsResult

    }
  },

  

  mounted() {
    if (this.scripts.length > 0) {
      this.tab = "tab-" + this.scripts[0].name
    }
    this.$emit("init")
  },

  data: () => ({
    tab: null,
    scripts: [],
    selected: null,
    currentScript: null,
    process: false,
    success: false,
    showSnippets: false,
    dpsResult: null,
    newScriptName: null,
    file: null,
    editor: null,
    showResults: false
  }),

  watch: {
    tab(value) {
      if (value)
        this.selected = find(this.scripts, s => s.name == value.substring(4))
    }
  },

  created() {
    this.scripts = this.config.scripts;
    if (this.scripts.length > 0) this.selected = this.scripts[0]
    this.checkDpsURL()
  },

<<< } else { >>>
  mounted() {
   this.$emit("init")
  },
  created() {
    this.scripts = this.config.scripts;
  },
<<< } >>>  

 
  
  props: ["config"]

  


}

</script>
<style>
.v-tabs-bar {
  border-radius: inherit;
  height: 36px;
  border-bottom: 1px solid #dedede;
}

</style>
