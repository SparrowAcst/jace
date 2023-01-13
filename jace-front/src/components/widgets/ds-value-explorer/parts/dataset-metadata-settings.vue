<template>
	<v-layout column wrap pa-2>

          <v-flex>
            <v-text-field
              v-model="config.metadata.concepts"
              label="Collection name for indicators metadata"
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="config.metadata.collections"
              label="Collection name for datapoints metadata"
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="config.metadata.countries"
              label="Collection name for entities metadata"
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="config.metadata.mapper.id"
              label="Entity id field"
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="config.metadata.mapper.name"
              label="Entity name field"
            ></v-text-field>
          </v-flex>



     </v-layout>      
</template>	

<script>

	export default {
		name:"ds-meta-settings",
		props:["config"],
    methods:{
    },
    components:{
    }
	}
</script>