<template>
	<v-layout column wrap pa-2>
    
    <v-flex xs12 md8>
      <v-input label="Chart Height">
        <div style="padding: 0 0 0 1em;">
          <input 
            type="number" 
            style="border: 1px solid #e0e0e0;" 
            v-model="config.options.widget.height"
            min=0
          ></input>
        </div>  
      </v-input>
    </v-flex>  

    <v-flex xs12 md8>
      <palette-picker :value = "config.options.palette" @change="onChangePalette"></palette-picker>
    </v-flex>
    
    
  </v-layout>      
</template>	

<script>
import palettePicker from "djvue/components/core/ext/palette-picker.vue"
	export default {
		name:"name-editor",
		props:["config"],
    methods:{
      onChangePalette(value){
        let color = JSON.parse(JSON.stringify(value)).color;
        if(value.isReverse) color.reverse();
        this.config.options.color = color
        this.config.options.palette  = value
      }
    },
    components:{
      "palette-picker": palettePicker
    }
	}
</script>