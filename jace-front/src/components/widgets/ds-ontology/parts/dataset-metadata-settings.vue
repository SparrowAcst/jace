<template>
	<v-layout column wrap pa-2>

          <v-flex>
            <v-text-field
              v-model="config.metadata.concepts"
              label="Collection name for indicators metadata"
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