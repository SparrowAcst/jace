<template>
  <v-card>
    <v-toolbar dense dark flat :color="decoration[options.type].color">
      <v-icon class="pr-2">{{decoration[options.type].icon}}</v-icon>
      <v-toolbar-title class="font-weight-light title">{{options.title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="pa-3">
      <pre class="subtitle-1 font-weight-light" style="line-height:1.2em; max-height:20em; overflow:auto;">{{options.text}}</pre>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="text--darken-3" :color="decoration[options.type].color" text @click="resolve">
        Ok
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {

  name: "warningDialog",

  props: ["options", "submit"],

  data: () => ({
    decoration: {
      info: {
        color: "primary",
        icon: "mdi-information-outline"
      },
      error: {
        color: "error",
        icon: "mdi-alert-outline"
      },
      success: {
        color: "success",
        icon: "mdi-checkbox-marked-circle-outline"
      },
      warning: {
        color: "warning",
        icon: "mdi-alert-outline"
      }
    }
  }),

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
