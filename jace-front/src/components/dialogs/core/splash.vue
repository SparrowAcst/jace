<template>
  <!--  -->
  <v-card justify-center  class="secondary pa-5" style="opacity:0.7;">
    <span class="white--text body-1 font-weight-light">{{opts.text}}</span>
  </v-card>
</template>

<script>
import { isString } from "lodash"

export default {

  name: "splashDialog",

  props: ["options", "submit"],

  methods: {

    resolve() {
      // this.$emit('submit', true)
      this.submit(true)
    }
  },

  data:()=>({
    opts:{}
  }),

  created(){
    this.opts = this.options || {text:"Wait one moment."}
    this.opts = isString(this.opts) ? {text:this.opts} : this.opts
    this.opts.timeout = this.options.timeout || 3000
    setTimeout(() => { this.resolve() }, this.options.timeout) 
  }
}

</script>