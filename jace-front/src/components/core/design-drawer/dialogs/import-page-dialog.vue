<template>
  <v-card>
          <v-toolbar dence color="primary white--text">
              <v-icon class="white--text">mdi-download</v-icon>
              <v-toolbar-title class="font-weight-light">Import Page</v-toolbar-title>
            </v-toolbar>
            <v-container>
              
              
              <v-layout column>
                <v-flex xs12 pl-3 pr-3 justify-center>
                  <v-text-field label="Page title" v-model="pageTitle">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 px-3 justify-center>
                  <v-text-field label="Page path" v-model="pageId" prefix="/" hint="Enter unique page path">
                  </v-text-field>
                </v-flex>
                <v-flex xs1 px-3 justify-center>
                </v-flex>
                <v-flex xs11 px-3 pt-3 justify-center>
                    <input type="file" label="file" v-on:change="fileChanged"/>
                </v-flex>
              </v-layout>


            </v-container>  
            

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="reject()">Cancel</v-btn>
              <v-btn flat color="primary" @click="resolve()">Import</v-btn>
            </v-card-actions>

          </v-card>
</template>	

<script>
	

	export default {

    props:["submit"],

		data () {
	    return {
	      pageId: '',
	      pageTitle: '',
        file:null
	    }
	  },
		
		methods:{
      fileChanged(e) {
        if (e) {
            if (e.target.files) {
              if (!this.multiple && e.target.files[0]) {
                this.file = e.target.files[0];
              } else if (this.multiple) {
                this.file = e.target.files
              } else {
                this.file = null
              }
            } else {
              this.file = null
            }
        }

      },
			
      resolve(){
	        	// this.$emit('submit', this.getOptions(this.opts))
            this.submit({
              pageId: this.pageId,
              pageTitle: this.pageTitle,
              file: this.file
            })
		    },

		    reject(){
		       	this.submit(null)
		    }
		}
	}

</script>