<template>
  <div class="mb-1">
    <div v-if="answer==null || answer.length == 0" ></div>
    <div v-else class="ma-0 pa-5" style="border:1px solid #dedede;background:white;">
      
      <response :form="form" :answer="answer"></response> 
      

    </div>  
  </div>
</template>
<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";
import response from "./response.vue"
// import components from "./parts/index.js"
// import { find, isFunction } from "lodash"

export default {

  name: "form-response-widget",

  icon: "mdi-file-document-outline",

  mixins: [djvueMixin, listenerMixin],

  components: { response },

  computed: {
    production() {
      return this.isProductionMode
    }
  },

  data: () => ({
    form: null,
    answer: null
  }),

  created() {
    this.$nextTick(() => { this.emit("form-response") })
    
    this.on({
      event: "form-update",
      callback: (form) => {
        this.form = form
      },
      rule: () => true
    })

    this.on({
      event: "answer-update",
      callback: (answer) => {
        this.answer = answer
      },
      rule: () => true
    })

  },

  mounted() { this.$emit("init") },

  beforeDestroy() { this.off() }

}

</script>
