<template>
	<span v-if="options && settings && getPropertyValue"> 
		{{getPropertyValue(settings.value)}}
	</span>
</template>	

<script>
export default {
	props:["options","getPropertyValue"],
	computed:{
		settings(){
			return ( this.options && this.options.data ) ? this.options.data : {}
		}
	}
}
</script>