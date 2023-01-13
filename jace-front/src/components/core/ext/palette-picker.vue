<template>
  <v-layout column>
    <v-combobox label="Color Palette" v-model="model" :items="palettes" @input="onChange" dense>
      <template slot="selection">
        <span v-for="c in view" :key="c" :style="`margin:0; padding:0; background:${c}; width:16px; height:20px;`">
        </span>
      </template>
      <template slot="item" slot-scope="{ item }">
        <v-row ma-0 pa-0>
          <span v-for="c in item.color" :key="c" :style="`margin:0; padding:0; background:${c}; width:16px; height:20px;`">
          </span>
        </v-row>
      </template>
    </v-combobox>
    <v-switch label="Reverse colors" :disabled="!model" v-model="isReverse" @change="onChange" color="primary"></v-switch>
    
  </v-layout>
</template>
<script>

import palettes from "./dj-palettes.js"

export default {
  props: ["value"],
  data: () => ({
    model: {},
    isReverse: {},
    palettes: palettes
  }),

  computed: {
    view() {
      let temp;
      if (!this.model || !this.model.color) return []

      if (this.model.color) {
        temp = JSON.parse(JSON.stringify(this.model.color))
        if (this.isReverse) temp.reverse()
      }
      return temp
    }
  },

  created() {
    this.model = this.value || palettes[0]
    this.isReverse = (this.model) ? this.model.isReverse : false
    this.$emit("change", this.model)
   },

  methods: {
    onChange() {
      if (this.model) {
        this.model.isReverse = this.isReverse;
        this.$emit("change", this.model)
      }
    }
  }
}

</script>
<style>

.v-list--dense .v-list__tile:not(.v-list__tile--avatar) {
  height: 2em !important;
}

.v-list--dense .v-list-item, .v-list-item--dense {
    min-height: 25px;
}

</style>
