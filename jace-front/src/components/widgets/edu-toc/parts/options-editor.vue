<template>
	<v-container fluid>
		<v-layout wrap>
	      
	      <v-flex xs12>
	      				
			<editor 	v-show="mode == 'embedded'"
		                :content="embeddedSource" 
		                lang="json" 
		                :sync="true"
		                @change="onUpdateSource"
		                style="border:1px solid #999"
		    > 
		    </editor>
		    
		</v-layout>    
	</v-container>  
</template>

<script>
	import editor from 'djvue/components/core/ext/ace-editor.vue';

	export default {
		name:"options-editor",
		components:{
			editor
		},
		
		props:["config"],

		computed:{
			embeddedSource(){
				return JSON.stringify(this.config.data.embedded, null, "\t")
			}
		},

		data:()=>({
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