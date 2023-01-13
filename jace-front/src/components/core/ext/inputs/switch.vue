<template>
	<div v-if="options && getPropertyValue">
		<v-switch 
			:label="(options.data) ? getPropertyValue(options.data.label) : ''" 
			:v-model="(options.data && options.data.value) ? getPropertyValue(options.data.value) : null" 
			:value="(options.data && options.data.value) ? getPropertyValue(options.data.value) : false" 
			:input-value ="(options.data && options.data.value) ? getPropertyValue(options.data.value) : false"
			
			:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
			
			:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			:flat="(options.decoration) ? getPropertyValue(options.decoration.flat) : false"
			:inset="(options.decoration) ? getPropertyValue(options.decoration.inset) : false"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
			
			@change="inputData"
		></v-switch>
		
	</div>
</template>	

<script>

import { isUndefined } from "lodash"

export default {
	props:["options","getPropertyValue"],
	data: () => ({
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required."
		}
	}),
	methods:{
		inputData(data){
			this.$emit("change", this, !!data)
		}
	}
}
</script>