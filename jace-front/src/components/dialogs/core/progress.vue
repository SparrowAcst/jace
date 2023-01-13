<template>
  <v-card>
    <v-card-title class="white--text title primary py-1">
      <span class="ml-1 font-weight-light">{{opts.title}}</span>
    </v-card-title>
    <v-row class="mx-3">
      <v-col v-if="opts.value">
        <v-row class="justify-center subheading secondary--text font-weight-light">
          {{opts.value.toFixed(0)}}%
        </v-row>
        <v-progress-linear color="secondary" height="6" :value="opts.value" class="mt-0 mb-2"></v-progress-linear>
        <div style="height:5em; overflow: hidden;">
          <div class="caption primary--text font-weight-light" v-for="(msg, msgIndex) in opts.text" :key="msgIndex">
            {{ msg }}
          </div>
        </div>
      </v-col>
      <v-row v-else class="mx-0 pa-3">
        <v-flex xs1 class="justify-center">
          <v-progress-circular indeterminate size="24" color="secondary lighten-2"></v-progress-circular>
        </v-flex>
        <v-flex xs10 class="primary--text font-weight-light pa-1">
          {{ opts.text[0] }}
        </v-flex>
      </v-row>
    </v-row>
  </v-card>
</template>
<script>
import { isString } from "lodash"
import listenerMixin from "@/mixins/core/listener.mixin.js";
import moment from "moment"

export default {

  name: "progressDialog",
  mixins: [listenerMixin],

  props: ["options", "submit", "dialogID"],


  data: () => ({
    opts: { text: [] },
    maxStage: null,
    stage: 0
  }),

  methods: {

    resolve() {
      // this.$emit('submit', true)
      this.submit(true)
    },

    reject() {
      // this.$emit('submit', false)
      this.submit(false)
    },

    setOptions(options) {

      options = options || { text: "wait one moment" }

      options = isString(options) ? { text: options } : options
      this.opts.text = [moment(new Date()).format("HH:mm:ss") + " " + options.text].concat(this.opts.text)

      this.opts.title = options.title || this.opts.title || "Progress"

      if (options.maxStage) this.maxStage = options.maxStage

      if (this.maxStage) {
        this.stage = options.stage || (this.stage + 1)
      }

      if (this.stage && this.maxStage) {
        this.opts.value = 100 * Math.min(this.stage, this.maxStage) / this.maxStage
      }
    }
  },

  // layout: progressLayout,

  created() {

    this.setOptions(this.options)

    this.on({
      event: "progress-dialog-cancel",
      callback: () => {
        this.off()
        this.resolve()
      },
      rule: params => {
        // console.log("CANCEL",params.dialogID, this.dialogID)
        return params.dialogID == this.dialogID
      }
    })

    this.on({
      event: "progress-dialog-set",
      callback: (options) => {
        // console.log("OPTIONS",options)
        // this.off()
        this.setOptions(options)
      },
      rule: params => {
        // console.log("SET",this.dialogID, params)
        return params.dialogID == this.dialogID
      }
    })
  }




}

</script>
