<template>
	<dj-list :list="dataSelectEmitters" title="Emitter id" :maxLength="Number.POSITIVE_INFINITY" @update="onChange"></dj-list>
</template>	

<script>
	import djList from "djvue/components/core/ext/dj-list.vue"
	export default {
		name:"set-data-emitters",
		components:{"dj-list": djList},
		props:["config"],
		computed:{
			dataSelectEmitters(){
					if(!this.config.dataSelectEmitters) return []
					return this.config.dataSelectEmitters.map( d => ({id:this.$djvue.randomName(), title:d}))
			}
		},
		methods:{
			onChange(value){
					this.config.dataSelectEmitters = value.map(d => d.title.trim())	
			}
		}
	}

</script>