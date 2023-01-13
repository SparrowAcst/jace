<template>
  <<< if( jace.mode=="development" ) {>>>
    <v-container fluid class="pa-0" v-show="!isProductionMode">
      <v-layout wrap v-if="!isProductionMode">
        <v-flex xs12>
          <editor :content="config.data.script" lang="javascript" :sync="true" @change="onUpdateSource" style="border:1px solid #999">
          </editor>
        </v-flex>
      </v-layout>
      <v-layout v-if="!isProductionMode">
        <v-spacer></v-spacer>
        <v-btn text color="primary" v-on:click="_runScript()">
          Run
        </v-btn>
      </v-layout>
    </v-container>
    <<< } else {>>>
      <div></div>
      <<< }>>>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import axios from "axios";
import {v4} from "uuid"
import * as ast from "yaml-ast-parser"
import activityDetector from 'activity-detector'


import Ajv from "ajv"
const ajv = new Ajv({ allErrors: true })

import ajvErrors from "ajv-errors"

ajvErrors(ajv /*, {singleError: true} */ )


import * as YAML from "js-yaml/dist/js-yaml.mjs"


import Validator from "@/components/core/ext/molfar/schema-validator/index.js"

<<<
if (jace.mode == "development") { >>>

  import editor from '@/components/core/ext/ace-editor.vue';

  <<<
} >>>

import * as _ from "lodash"
import moment from "moment"
// import * as Cookie from "tiny-cookie"


class MediatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "Mediator Error";
  }
}

export default {

  name: "mediator-widget",

  icon: "mdi-language-javascript",

  <<<
  if (jace.mode == "development") { >>>

    components: { editor },

      <<<
  } >>>

  mixins: [djvueMixin, listenerMixin],

  
  methods: {

    // onReconfigure (widgetConfig) {
    //  return this.$dialog.showAndWait(MediatorConfig, {config:widgetConfig})
    // },

    onUpdateSource(value) {
      this.config.data.script = value
      this.setNeedSave(true)
    },

    // onPageStart () {
    //  this._runScript();
    // },


    onRun() {
      return new Promise((resolve, reject) => {
        try {
          this._runScript()
          resolve()
        } catch (e) {
          reject(`Mediator ${this.config.id} : ${e.toString()}`)
        }
      })
    },

    _runScript() {

//       window.console.log(`Run script ${this.config.id}
// ${this.config.data.script}
// `)

      window._ = window._ || _
      window.axios = window.axios || axios
      window.moment = window.moment || moment
      window.uuid = window.uuid || v4
      window.activityDetector = window.activityDetector || activityDetector

      this.api = {
        selectWidgets: (filter) => {
          filter = filter || (() => true);
          if (!_.isFunction(filter)) {
            let identifiers = (_.isArray(filter)) ? filter : [filter];
            filter = (item) => _.find(identifiers, i => item.config.id == i)
          }

          let res = this.$djvue.selectWidgets(this.$root, item => item.config && filter(item));

          return (res.length == 0) ?
            undefined :
            (res.length == 1) ?
            res[0] :
            res
        },

        selectSections: (filter) => {
          filter = filter || (() => true);
          if (!_.isFunction(filter)) {
            let identifiers = (_.isArray(filter)) ? filter : [filter];
            filter = (item) => item.config && identifiers.includes(item.config.id)
          }

          let res = this.$djvue.selectSections(this.$root, item => filter(item));

          return (res.length == 0) ?
            undefined :
            (res.length == 1) ?
            res[0] :
            res
        },

        reactive: data => {
          const name = this.randomName()
          // console.log("this.reactiveContext", this)
          this.$set(this.wrapper.reactiveContext, name, data)
          return this.wrapper.reactiveContext[name]
        }, 

        upload: (url, file, data) => {
          let formData = new FormData();
          if(data) formData.append("data", JSON.stringify(data))
          formData.append('file', file);
          return axios.post(url,
            formData, 
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
        },

        download: url => {
          this.openUrl(url,"_blank")
        },

        on: this.on,
        off: this.off,
        emit: (event, data) => { this.emit(event, this, data) },

        progress: this.$djvue.progress,
        selectFile: this.$djvue.selectFile,
        confirm: this.$djvue.confirm,
        warning: this.$djvue.warning,
        dialog: this.$djvue.customDialog,
        _: _,
        moment: moment,
        axios: axios,
        YAML: YAML,
        SchemaValidator: Validator,
        ajv,
        ast,

        Cookie: this.$cookie,

        eval: (script, context) => {
          try {

            eval(
              `
                (function() {
                  ${script} }
                )

                `
            ).apply(context)

          } catch (e) {
            console.error(e.toString())
          }
        },

        runDps: (script, state, file) => this.$dps.run({
          script,
          state: state || {},
          file
        }),

        // .then(res => {
        //   res.data.$$error = (res.type=="error") ? res.data.message: undefined
        //   return res.data
        // })
        
        flickrImage: tag => {

          let flickr =  (method, params) => {
              return axios({
                method: 'get',
                url: 'https://api.flickr.com/services/rest',
                params: {
                  api_key: "6f394a89a9739808123ba0808bdaf9d3",
                  format: 'json',
                  nojsoncallback: 1,
                  ...params,
                  method: `flickr.${method}`,
                }
              })
            }
          
          return flickr('photos.search', {
                tags: tag.split(" ").join(","),
                tag_mode: "all",
                extras: 'url_n, owner_name, description, date_taken, views',
                page: 1,
                per_page: 1,
            }).then((response) => {
                return response.data.photos.photo
            })
        }

      }

      try {

        eval(
          `
            (function() { 
              let reactive = this.api.reactive;
              let runDps = this.api.runDps; 
              let selectWidgets = this.api.selectWidgets;
              let selectSections = this.api.selectSections;
              let on = this.api.on;
              let off = this.api.off;
              let emit = this.api.emit;
              let moment = this.api.moment;
              let _ = this.api._;
              let Cookie = this.api.Cookie;
              let YAML = this.api.YAML;
              let axios = this.api.axios;
              let ast = this.api.ast;
              let ajv = this.api.ajv;
              let SchemaValidator = this.api.SchemaValidator


              ${this.config.data.script} }
            )

            `
        ).apply(this)

      } catch (e) {

        // this.$djvue.warning({
        //           type:"error",
        //           title:`Error mediator ${this.config.id}:${this.config.name} script error`,
        //           text:e.toString()
        //         })
        throw new MediatorError(` Mediator ${this.config.id}: ${e.toString()} `)
      }
    }

  },


  props: ["config"],


  mounted() {
    this.context = []
    this.$emit("init")
  }

}

</script>
