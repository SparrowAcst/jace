<template>
  <v-layout column wrap pa-2>
    <v-flex xs12 md8>
      <v-input label="Chart Height">
        <div style="padding: 0 0 0 1em;">
          <input type="number" style="border: 1px solid #e0e0e0;" v-model="config.options.widget.height" min=0 />
        </div>
      </v-input>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "name-editor",
  props: ["config"]
}

</script>
