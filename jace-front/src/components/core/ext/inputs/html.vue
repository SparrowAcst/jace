<template>
	<div v-if="options && getPropertyValue" v-html="getPropertyValue(settings.value)"> 
	</div>
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