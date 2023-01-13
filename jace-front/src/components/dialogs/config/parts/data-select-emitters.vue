<template>
		<dj-list 
			:items="dataSelectEmitters"
			required="Listener id is required."
			unique="Listener id must be unique."
			title="Widget listens for emitter events"
			label="Enter Emitter Id" 
			@update="onChange"
			draggable
		></dj-list>
</template>	

<script>
	import djKeyValue from "@/components/core/ext/dj-field-editor.vue"
	
	export default {
		name:"set-data-emitters",
		components:{"dj-list": djKeyValue},
		props:["config"],
		computed:{
			dataSelectEmitters(){
					return this.config.dataSelectEmitters || []
			}
		},
		methods:{
			onChange(value){
					this.config.dataSelectEmitters = value//.map(d => d.title.trim())	
			}
		}
	}

</script>