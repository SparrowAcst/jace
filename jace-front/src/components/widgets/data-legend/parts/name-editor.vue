<template>
	<v-layout column wrap pa-2>

          <v-flex>
            <v-text-field
              :value="config.id"
              label="Widget Id"
              disabled
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="config.name"
              label="Name"
            ></v-text-field>
          </v-flex>

          <v-switch
            label="Visible in Production Mode"
            v-model="config.options.widget.visible"
            color="primary"
          ></v-switch>
          <v-divider></v-divider>
          
          <v-flex>
            <v-text-field
              v-model="config.options.widget.label"
              label="Label"
            ></v-text-field>
          </v-flex>
          
          <v-switch
            label="Multiple selection"
            v-model="config.options.widget.multiple"
            color="primary"
          ></v-switch>


          <!-- <v-flex xs12 md8>
            <palette-picker :value = "config.options.palette" @change="onChangePalette"></palette-picker>
          </v-flex> -->


     </v-layout>      
</template>	

<script>
import palettePicker from "djvue/components/core/ext/palette-picker.vue"
	export default {
		name:"name-editor",
		props:["config"],
    components:{
      "palette-picker": palettePicker
    }
	}
</script>