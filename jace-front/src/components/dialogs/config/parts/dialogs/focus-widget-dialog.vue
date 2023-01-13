<template>
  
  <v-card>
    <v-card-text class="pa-3">
      <w
        :config="options.widget"
      ></w>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="resolve">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js"

export default {

  props: ["options", "submit"],
  
  components: {
    w: () => {
      return import("@/components/core/widget.vue")
    }
  },
    
  mixins: [djvueMixin],

  methods: {

    resolve() {
      // this.$emit('submit', true)
      this.submit(true)
    },

    reject() {
      // this.$emit('submit', false)
      this.submit(false)
    }
  }
}

</script>
