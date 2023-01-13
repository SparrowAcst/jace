<template>

	<div v-if="options && getPropertyValue">
		<v-text-field 
			
			:v-model="(options.data && options.data.value) ? getPropertyValue(options.data.value) : null" 
			:value = "(options.data && options.data.value) ? getPropertyValue(options.data.value) : null"
			:label="(options.data) ? getPropertyValue(options.data.label) : ''" 
			:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
			:required="(options.data) ? getPropertyValue(options.data.required) : false"  
			:clearable="(options.data) ? getPropertyValue(options.data.clearable) : false"
			
			:rules="(options.data && options.data.required) ? [rules.required] : []"
			
			:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			:flat="(options.decoration) ? getPropertyValue(options.decoration.flat) : false"
			:outlined="(options.decoration) ? getPropertyValue(options.decoration.outlined) : false"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
			:hide-details="(options.decoration) ? getPropertyValue(options.decoration.hideDetails) : false"
			:prepend-icon="(options.decoration) ? getPropertyValue(options.decoration.prependIcon) || 'mdi-email-outline' : ''" 

			@input="inputData"
			
		></v-text-field>
		
	</div>
</template>	

<script>

import { isUndefined } from "lodash"

export default {
	props:["options","getPropertyValue"],
	data: () => ({
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required.",
	      	valid: value => {
		        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		        return pattern.test(value) || 'Invalid e-mail.'
		      }
		}
	}),
	methods:{
		inputData(data){
			this.$emit("change", this, data)
			
			// if(
			// 	!isUndefined(this.options) 
			// 	&& !isUndefined(this.options.data) 
			// 	&& !isUndefined(this.options.data.value)
			// ) this.options.data.value = data 
		}
	}
}
</script>