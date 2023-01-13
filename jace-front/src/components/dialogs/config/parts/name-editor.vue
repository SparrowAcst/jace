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

          <v-flex>
            <v-text-field
              v-model="config.title"
              label="Title"
            ></v-text-field>
          </v-flex>
         
         <!-- <v-flex>
                <v-switch
                  label="Activated"
                  v-model="config.activated"
                  color="primary"
              ></v-switch>
          </v-flex> -->  
            
     </v-layout>      
</template>	

<script>
	export default {
		name:"name-editor",
		props:["config"]
	}
</script>