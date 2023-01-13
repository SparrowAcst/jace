<template>
  <v-card flat>
   
   <!-- <v-combobox
          v-model="select"
          :items="items"
          label="Select a configuration parts"
   ></v-combobox> -->

   <h3 class="headline">Page Config</h3>
   <v-layout row  class="caption" style="height:70em; overflow:auto;border:1px solid #dedede;">
     <!--  <h3>app pages</h3>
      <pre>{{JSON.stringify(app.pages, null,"\t")}}</pre>
      <h3>app current page</h3>
      <pre>{{JSON.stringify(app.currentPage, null,"\t")}}</pre>
       -->
      <v-flex>
        <highlight :content="result" lang="json"></highlight>
      </v-flex>
    </v-layout>
    
  </v-card>
</template>

<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import highlight from 'djvue/components/core/ext/ace-highlight.vue';
import { find } from "lodash"

export default {

  name: "config-widget",

  icon: "mdi-language-javascript",

  mixins: [djvueMixin, listenerMixin],

  components: { highlight },

  methods: {

  },


  props: ["config"],

  computed: {
    result() {
    	
    	let context = {};
    	
    	if(this.select == "Page Config"){
    		context =  (this.app.currentPage) ? find(this.app.pages, p => p.id == this.app.currentPage.id) : {}
    	} else {
    		context =  this.app.config
    	}

        return JSON.stringify(context, null, "\t")
      }  
  },

  created() {
  },

  mounted() { this.$emit("init") },

  data: () => ({
  	items:["App Config", "Page Config"],
  	select:"Page Config"
  })

}

</script>
