<template>
    <v-container fluid>
        <v-layout wrap>
            <v-switch v-model="yamlNotation" label="YAML notation"></v-switch>
            <v-flex xs12 v-show="!yamlNotation">
                <editor :content="JSON_Source" lang="json" ref="jsonEditor" :sync="true" @change="onUpdateJSON" style="border:1px solid #999;height:28em !important">
                </editor>
            </v-flex>
            <v-flex xs12 v-show="yamlNotation">
                <editor :content="YAML_Source" lang="yaml" ref="yamlEditor" :sync="true" @change="onUpdateYAML" style="border:1px solid #999;height:28em !important">
                </editor>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import editor from '@/components/core/ext/ace-editor.vue';
import { isString } from "lodash"
import * as YAML from "js-yaml/dist/js-yaml.mjs"

export default {
    name: "options-editor",
    
    components: {
        editor
    },

    props: ["config"],

    data: () => ({
        editor: null,
        yamlNotation: false,
        JSON_Source: "{}",
        YAML_Source: ""
    }),

    watch: {
        yamlNotation(value) {
            if(value) {
              this.YAML_Source = YAML.dump(JSON.parse(this.JSON_Source))  
              this.$nextTick(() => {
                  this.$refs.yamlEditor.editor.gotoLine(0, 0)
              })
            } else {
              this.JSON_Source = JSON.stringify(YAML.load(this.YAML_Source), null, " ")
              this.$nextTick(() => {
                  this.$refs.jsonEditor.editor.gotoLine(0, 0)
              })  
            }
        }
    },

    methods: {

      onUpdateJSON(value) {
            this.JSON_Source = value
            // if (value === JSON.stringify(this.config.data.embedded, null, " ")) return
            // this.config.data.embedded = JSON.parse(value || '""')
        },

      onUpdateYAML(value) {
            this.YAML_Source = value
            // if (value === YAML.dump(this.config.data.embedded)) return
            // this.config.data.embedded = YAML.load(value)
        }

      },

    created() {

        this.JSON_Source = JSON.stringify(this.config.data.embedded, null, " ")
        this.YAML_Source = YAML.dump(this.config.data.embedded)

    },

    beforeDestroy() {
      
      if(!this.yamlNotation){
          this.config.data.embedded = JSON.parse(this.JSON_Source)
      } else {
          this.config.data.embedded = YAML.load(this.YAML_Source)
      }   
    
    }

}
</script>