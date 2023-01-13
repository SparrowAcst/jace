<template>
	<v-icon v-if="options && getPropertyValue"
		:left = "getPropertyValue(decoration.left)"
		:right = "getPropertyValue(decoration.right)"
		:color = "getPropertyValue(decoration.color)"
		:size = "getPropertyValue(decoration.size)"
		:dense = "getPropertyValue(decoration.dense)"
	>
          {{getPropertyValue(decoration.name)}}
    </v-icon>
</template>	

<script>
export default {
	props:["options","getPropertyValue"],
	computed:{
		decoration(){
			return ( this.options && this.options.decoration ) ? this.options.decoration : {}
		}
	}
}
</script>