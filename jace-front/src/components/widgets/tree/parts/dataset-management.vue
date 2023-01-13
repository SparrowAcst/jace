<template>
	<v-container pa-0>
		<v-layout row v-if="!collections">
			<v-progress-circular
		      indeterminate
		      color="primary"
		    ></v-progress-circular>
		</v-layout>	
		<v-layout column v-if="collections">
			<div v-if="collections">
				<v-layout row align-center>
					<h3 class="primary--text subheading"> 
						Schema: "dj-data" ( {{collections.length}} items )
					</h3>
					<v-spacer></v-spacer>
					<v-dialog v-model="selectFileDialog" persistent max-width="50%">
		                <v-btn flat color="primary" slot="activator">Upload collections</v-btn>
		                <v-card>
		                  <v-toolbar dense color="primary" dark flat>
		                    <v-icon>mdi-animation-play-outline</v-icon>
		                    <v-toolbar-title>Select File</v-toolbar-title>
		                  </v-toolbar>
		                  <v-flex xs12 pl-3 pr-3 justify-center>
		                    <input type="file" label="file" v-on:change="fileChanged"/>
		                  </v-flex>  
		                  <v-divider></v-divider>
		                  <v-card-actions>
		                    <v-spacer></v-spacer>
		                    <v-btn flat color="primary" @click="rejectFile">Cancel</v-btn>
		                    <v-btn flat color="primary" @click="resolveFile" :disabled="!file">Ok</v-btn>
		                  </v-card-actions>
		                </v-card>
		              </v-dialog>
				</v-layout>	
					
				<v-flex xs12 pa-2  style="max-height:10em; overflow:auto; border:1px solid #dedede;">

					<v-layout 
	                  row 
	                  v-for="c in collections" 
	                  pt-2
	                  style="cursor:pointer;"
	                  @click="select(c)"
	                >
	                  <v-icon 
	                  	class="body-1 pr-2"
	                  	:class="(selected && c == selected) ? 'primary--text' : 'secondary--text font-weight-light'"
	                  >
	                    mdi-grid-large
	                  </v-icon>  
	                   
	                  <h3 
	                  	class="body-1"
	                  	:class="(selected && c == selected) ? 'primary--text' : 'secondary--text font-weight-light'"
	                  >
	                     {{c}}
	                  </h3>
	               </v-layout>
				</v-flex>
			</div>
			<div v-if="sampleTable">

				<v-flex xs12 pa-2>
					<v-layout row align-center>
						<h3 class="primary--text subheading"> 
							Sample from "{{selected}}"
						</h3>
						<v-spacer></v-spacer>
						<v-btn flat color="primary" @click="exportCollection(selected)">Download</v-btn>
					</v-layout>	
				
					
						
						<v-data-table
			                :headers="sampleTable.headers"
			                :items="sampleTable.rows"
			                :hide-actions="sampleTable.rows.length < 15"
			                style="border:1px solid #dedede; max-height:17.5em; overflow:auto;"
			            >
		                
			                <template slot="items" slot-scope="props">
			                  <td :class="{'text-xs-right':(index > 0) }" v-for="(col, index) in sampleTable.headers">
			                      {{props.item[col.value]}}
			                  </td>
			                </template>

		              	</v-data-table>
		        </v-flex>      	
			
			</div>		
		</v-layout>	
	</v-container>	
</template>	

<script>

	import ioMixin from "./ds-io.mixin.js"

	export default {
		
		name:"dataset-management",
		
		props:["config"],
		
		mixins:[ioMixin],
	    
	    methods:{
	    	
	    	exportCollection(c){
		        this.dpsDownloadCollection(c)
		        .then( url => {
		          window.location.href = url
		        })
		    },

	    	loadCollections(){
	    		this.collections = null;
	    		this.dpsLoadSchema()
	    		.then( res => {
	    			this.collections = res;
	    		})
	    	},
	    	
	    	select(item){
	        	if( !this.selected ){
	          		this.selected = item  
	        	} else {
	          		this.selected = (this.selected == item) ? null : item  
	        	}
	      	},

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

		    rejectFile(){
		      this.selectFileDialog = false
		    },

		    resolveFile(){
		      this.selectFileDialog = false;
		      this.sample = null;
		      this.collections = null;
		      this.dpsUploadCollections(this.file)
		        .then(res => {
		          let messages = res.data.map( m => {
		          	let res  = JSON.parse(m.message[0])
		          	res = (_.isString(res)) ? res : JSON.stringify(res.data)
		          	return res
		          }).join("\n")
		          
		          this.$djvue.warning(
	                  {
	                      type: "success",
	                      title: "Upload Collections",
	                      text: messages   
	                  }
	              )

		          this.loadCollections()
		        })
		        .catch(e => {
		        	this.$djvue.warning(
		                {
		                    type: "error",
		                    title: "Cannot Upload Collections",
		                    text: e.toString()   
		                }
		            )
		        })
		    }

	    },

	    computed:{

	    	sampleTable(){
		        if(!this.sample) return null
		        return {
		          headers: this.sample.dataset.dimensions.map( item => ({
		              text: item,
		              align: 'center',
		              value: item
		          })),
		          rows: this.sample.dataset.source
		        }  
		    }

	    },

	    watch:{

	    	selected(newValue){
	    		if(!newValue){
	    			this.sample = null
	    		} else {
	    			this.dpsLoadCollectionSample(newValue)
	    			.then(res => {
	    				this.sample = res
	    			})
	    		}
	    	}
	    },
	    
	    data:() => ({
	    	collections: null,
	    	selected: null,
	    	sample:null, 
	    	file: null,
	    	selectFileDialog: false
	    }),

	    created(){
	    	this.loadCollections()
	    }
	}
</script>