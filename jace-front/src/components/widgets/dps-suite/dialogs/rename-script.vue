<template>

  <v-card>

    <v-card-title class="white--text title primary py-1">
      <v-icon small class="white--text">mdi-square-edit-outline</v-icon>
      <span class="ml-1 font-weight-light">Rename  Script</span>
      <v-spacer></v-spacer>
      <v-btn text icon small @click="reject">
        <v-icon small class="white--text">mdi-close</v-icon>
      </v-btn>  
    </v-card-title>

    <v-flex xs12 pl-3 pr-3 justify-center>
      <v-text-field label="Script name" v-model="name"></v-text-field>
    </v-flex>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="secondary" @click="reject">Cancel</v-btn>
      <v-btn text color="secondary" @click="resolve">Create</v-btn>
    </v-card-actions>

  </v-card>

</template>

<script>
  export default {
    props:["submit"],
    data:() => ({
      name: ""
    }),
    methods:{
      resolve(){
        this.submit(this.name)
      },
      reject(){
        this.submit(null)
      }
    }
  }
</script>
