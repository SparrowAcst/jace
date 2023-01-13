<template>
  <v-card>
    <v-card-title class="white--text title primary py-1">
      <v-icon small class="white--text">mdi-import</v-icon>
      <span class="ml-1 font-weight-light">{{options.title}}</span>
      <v-spacer></v-spacer>
      <v-btn text icon small @click="reject">
        <v-icon small class="white--text">mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-flex xs12 pl-3 pr-3 justify-center>
      <v-file-input type="file" label="file" @change="fileChanged" />
    </v-flex>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="secondary" @click="reject">Cancel</v-btn>
      <v-btn text color="secondary" @click="resolve" :disabled="!file">Upload</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {

  name: "selectFileDialog",

  props: ["options", "submit"],

  data: () => ({
    file: null,
    multiple: false
  }),

  methods: {
    fileChanged(file) {
      this.file = file
    },

    resolve() {
      this.submit(this.file)
    },

    reject() {
      this.submit(null)
    }
  }

}

</script>
