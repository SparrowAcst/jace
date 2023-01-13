<template>
  <v-container fluid class="pa-1">
    <v-row class="mx-0">
      <v-spacer></v-spacer>
      <v-btn v-for="(b, index) in config.data.embedded " :key="index"  text :disabled="b.disabled" :color="b.color || 'primary'" class="pr-3" @click="resolve(index)" >{{b.title}}</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";



<<< if (jace.mode == "development") { >>>
  import EduPushButtonConfig from "./edu-push-button-config.vue"; 
<<<} >>>



export default {

  name: "edu-push-button-widget",

  icon: "mdi-card-outline",


  mixins: [djvueMixin, listenerMixin],

  methods: {

    onUpdate({ data }) {
      this.config.data.embedded = []
      this.$nextTick(() => {
        this.config.data.embedded = data;  
      })
    },


    resolve(index) {
      let event = this.config.data.embedded[index].event || "push"
      this.emit(event)
    },

    <<< if (jace.mode == "development") { >>>
      onReconfigure(widgetConfig) {
          return this.$dialogManager.showAndWait(EduPushButtonConfig, { width: "90%" }, { config: widgetConfig })
        }, 
    <<< } >>>

  },


  props: ["config"],


  mounted() {
    this.$emit("init")
  }

}

</script>
