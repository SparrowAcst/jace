<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <editor :content="embeddedSource" lang="json" :sync="true" @change="onUpdateSource" style="border:1px solid #999;height:28em !important">
        </editor>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import editor from '@/components/core/ext/ace-editor.vue';

export default {
  name: "options-editor",
  components: {
    editor
  },

  props: ["config"],

  computed: {
    embeddedSource() {
      return JSON.stringify(this.config.config, null, "\t") || "{}"
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
      try {
        this.config.config = JSON.parse(value)
      } catch (e) {}
    },

    // onUpdateScript(value) {
    //   this.config.config = value
    // }
  },

  created() {
    // this.mode = this.config.data.source;
    // this.clearWatch = this.$watch("mode", () => { this.config.data.source = this.mode })
  },

  destroyed() {
    // this.clearWatch();
  }

}

</script>
