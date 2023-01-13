<template>
  <div class="ma-3">
    <v-layout row wrap>
      <v-flex xs12 pa-1>
        <dj-holder name="Holder" @init="onInitChild"></dj-holder>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import mixin from "@/mixins/core/layout.mixin.js"

export default {
  components: {
    "dj-holder": () => import("@/components/core/holder.vue")
  },
  mixins: [mixin],

  methods: {
    onBeforeInit() {
      this._waitList = ["Holder"]
    }
  }

}

</script>
