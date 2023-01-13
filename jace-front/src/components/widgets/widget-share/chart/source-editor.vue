<template>
	<v-container fluid>
		<v-layout wrap>
	      <v-flex xs12>
	        <v-combobox
	          v-model="mode"
	          :items="sourceTypes"
	          dense
	          label="Select a data source type"
	        ></v-combobox>
	      </v-flex>

	      <v-flex xs12>
	      	<v-text-field
	      		  v-show="mode == 'url'"	
	              v-model="config.data.url"
	              label="url"
	              hint="For example, djvue/components/widgets/html/1.htm"
	        >         	
	         </v-text-field>

	         	
	         </v-text-field> 
			
			<editor 	v-show="mode == 'embedded'"
		                :content="embeddedSource" 
		                lang="json" 
		                :sync="true"
		                @change="onUpdateSource"
		                style="border:1px solid #999;height:350px !important"
		    > 
		    </editor>
		    
		    <v-layout column v-show="mode == 'dps'">
			    <v-dialog  v-model="snippets" max-width="50%">
			    	<v-layout row slot="activator">
			    		<v-spacer></v-spacer>
			    		<v-btn class="primary--text" flat :disabled="!editor">Snippets</v-btn>
			    	</v-layout>
			    	<v-card flat>
			    		<snippet-tree :editor="editor" @select="snippets = false"></snippet-tree>
			    	</v-card>	
			    </v-dialog>	
			    <editor 	
			                :content="config.data.script" 
			                lang="dps" 
			                :sync="true"
			                @change="onUpdateScript"
			                @mount = "setEditor"
			                style="border:1px solid #999;height:350px !important"
			    > 
			    </editor>
			</v-layout>    
			
			
		  </v-flex>  
		</v-layout>
	</v-container>  
</template>

<script>
	import editor from 'djvue/components/core/ext/ace-editor.vue';
	import snippetTree from "../dps/dps-snippets-tree.vue"
	// import highlight from 'djvue/components/core/ext/ace-highlight.vue';


	export default {
		name:"html-editor",
		components:{
			editor,
			"snippet-tree": snippetTree
		},
		
		props:["config"],

		computed:{
			// test(){
			// 	return JSON.stringify(this.sourceTypes, null,"\t")
			// }
			embeddedSource(){
				return JSON.stringify(this.config.data.embedded, null, "\t")
			}
		},

		data:()=>({
			sourceTypes:["url", "dps", "embedded"], 
			mode:"",
			snippets:false,
			editor:null
		}),

		methods:{

		  setEditor(editor){
		     this.editor = editor;
		  },

		  onUpdateSource(value){
		  	try {
		  		this.config.data.embedded = JSON.parse(value)	
		  	} catch(e) {

		  	}
	      },
	      
	      onUpdateScript(value){
	        this.config.data.script = value
	      }
		},

		created(){
			this.mode = this.config.data.source;
			this.clearWatch = this.$watch("mode", ()=>{this.config.data.source = this.mode})
		},

		destroyed(){
			this.clearWatch();	
		}

	}

</script>     