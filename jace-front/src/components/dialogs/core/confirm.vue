<template>
   <v-card>

      <v-card-title class="white--text title warning py-1">
        <v-icon  class="white--text">{{decoration[options.type].icon}}</v-icon>
        <span class="ml-1 font-weight-light">{{options.title}}</span>
      </v-card-title>


          <v-card-text class="pa-3">
            <pre class="subtitle-1 font-weight-light" style="line-height:1.2em; max-height:20em; overflow:auto;">{{options.text}}</pre>
          </v-card-text>
       
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text--darken-3"
            :color="decoration[options.type].color"
            text
            @click="reject"
          >
            {{options.rejectText || 'Cancel'}}
          </v-btn>
          <v-btn
            class="text--darken-3"
            :color="decoration[options.type].color"
            text
            @click="resolve"
          >
            {{options.resolveText || 'Ok'}}
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
   export default {
    
    name:"confirmDialog",

    props:["options", "submit"],

    data:() => ({
        decoration:{
          info:{
            color:"primary",
            icon:"mdi-information-outline"
          },
          error:{
            color:"error",
            icon:"mdi-alert-outline"
          },
          success:{
            color:"success",
            icon:"mdi-checkbox-marked-circle-outline"
          },
          warning:{
            color:"warning",
            icon:"mdi-alert-outline"
          }
        }
    }),

    methods:{
      
      resolve(){
        // this.$emit('submit', true)
        this.submit(true)
      },

      reject(){
        // this.$emit('submit', false)
        this.submit(false)
      }  
    },

    // layout: warningLayout

    


  }
</script>