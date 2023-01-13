<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <editor :content="embeddedSource" lang="css" :sync="true" @change="onUpdateSource" style="border:1px solid #999;height:28em !important">
        </editor>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import editor from '@/components/core/ext/ace-editor.vue';

let extractor = /(widget-style {)[\n\r]*([\W\w]*)[\n\r]*(})/m

export default {
  name: "options-editor",
  components: {
    editor
  },

  props: ["config"],

  computed: {
    embeddedSource() {
      return this.config.options.style || 
`
  widget-style {
    
  }
`                
    }
  },

  data: () => ({
    editor: null
  }),

  methods: {

    setEditor(editor) {
      this.editor = editor;
    },

    onUpdateSource(value) {
      this.config.options.style = value //(extractor.test(value)) ? value.match(extractor)[2] : this.config.options.style
    },

  },

  created() {
    this.mode = this.config.options.style || "";
    this.clearWatch = this.$watch("mode", () => { this.config.options.style = this.mode })
  },

  destroyed() {
    this.clearWatch();
  }

}

</script>
