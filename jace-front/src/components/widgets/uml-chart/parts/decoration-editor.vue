<template>
	<v-layout column wrap pa-2>
        <v-row>
         
          <v-col>
            <v-combobox
              v-model="config.options.typography"
              :items="typography"
              label="Select a typography display class"
            ></v-combobox>
          </v-col>
          <v-col>
            <v-combobox
              v-model="config.options.textColor"
              :items="txcolors"
              label="Select a text color"
            ></v-combobox>
          </v-col>
          <v-col>
            <v-combobox
              v-model="config.options.textBackground"
              :items="bgcolors"
              label="Select a text background"
            ></v-combobox>
          </v-col>
         
         </v-row> 

          <v-row>
            <v-col>
              <v-switch
                label="Dense"
                v-model="config.options.dense"
                color="primary"
                @change="onchangeDense"
              ></v-switch>
            </v-col>  
            <!-- <v-col>
              <v-switch
                label="Fixed Header"
                v-model="config.options.fixedHeader"
                color="primary"
                @change="onchangeFixedHeader"
              ></v-switch>           
            </v-col> -->

            <v-col>
              
              <v-switch
                label="Pagination"
                v-model="config.options.pagination"
                color="primary"
                @change="onchangePagination"
              ></v-switch>      

                         
            </v-col>

          </v-row>    

          <v-switch
            label="Use colors"
            v-model="config.options.useColors"
            color="primary"
            @change="onchangeColorSettings"
          ></v-switch>

          <v-combobox
            v-if="showColorSettings"
            v-model="config.options.colorMode"
            :items="['row', 'column', 'table']"
            label="Use colors for"
          ></v-combobox>

          <v-flex xs12 md8 v-if="showColorSettings">
            <palette-picker :value = "config.options.palette" @change="onChangePalette"></palette-picker>
          </v-flex>
          
         <!--  <v-combobox
            v-if="showColorSettings"
            v-model="config.options.headerTextOrientation"
            :items="['horizontal', 'vertical']"
            label="Header Text Orientation"
          ></v-combobox> -->



     </v-layout>      
</template>	

<script>
import palettePicker from "@/components/core/ext/palette-picker.vue"
	export default {
		
    name:"name-editor",
		
    props:["config"],
    
    data:()=> ({
      showColorSettings: false,
      
      typography:[
              'display-4',
              'display-3',
              'display-2',
              'display-1',
              'headline',
              'title',
              'subtitle-1',
              'subtitle-2',
              'body-1',
              'body-2',
              'caption',
              'overline'
            ],
      bgcolors:[
        "default",
        "primary darken-2",
        "primary darken-1",
        "primary",
        "primary lighten-1",
        "primary lighten-2",
        "secondary",
        "accent",
        "error",
        "warning",
        "info",
        "success"
      ], 
      
      txcolors:[
          "default",
        "white",
        "primary",
        "secondary",
        "accent",
        "error",
        "warning",
        "info",
        "success"
      
      ]  
    }),

    methods:{
      onChangePalette(value){
        this.config.options.palette = value
        console.log("CHANGE PALETTE", this.config.options)
      },
      onchangeColorSettings(value){
        this.showColorSettings = value
      },
      onchangeDense(value){
        this.config.options.dense = value
      },
      onchangeFixedHeader(value){
        this.config.options.fixedHeader = value
      },
      onchangePagination(value){
        this.config.options.pagination = value
      },
      
    },

    components:{
      "palette-picker": palettePicker
    },

    created(){
      this.showColorSettings =  this.config.options.useColors
      this.config.options.headerTextOrientation = this.config.options.headerTextOrientation || "horizontal" 

      this.config.options.dense = this.config.options.dense || false
      this.config.options.fixedHeader = this.config.options.fixedHeader || false
      this.config.options.pagination = (this.config.options.pagination)? true : false
      
      this.config.options.typography = this.config.options.typography || 'body-2'
      this.config.options.textColor = this.config.options.textColor || 'default'
      this.config.options.textBackground = this.config.options.textBackground || 'default'
    }
	}
</script>