<template>
		<div v-if="options && getPropertyValue">
		<v-text-field 
			
			:v-model="(options.data && options.data.value) ? getPropertyValue(options.data.value) : null" 
			:value = "(options.data && options.data.value) ? getPropertyValue(options.data.value) : null"
			:label="(options.data) ? getPropertyValue(options.data.label) : ''" 
			:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
			:required="(options.data) ? getPropertyValue(options.data.required) : false"  
			:clearable="(options.data) ? getPropertyValue(options.data.clearable) : false"
			:type="(showChars) ? 'text' : 'password'"
			@click:append="showChars = !showChars"
			:append-icon="(showChars) ? 'visibility_off' : 'visibility' "
			
			:rules="(options.data && options.data.required) ? [rules.required] : []"
			
			:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			:flat="(options.decoration) ? getPropertyValue(options.decoration.flat) : false"
			:outlined="(options.decoration) ? getPropertyValue(options.decoration.outlined) : false"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
			:hide-details="(options.decoration) ? getPropertyValue(options.decoration.hideDetails) : false"
			:prepend-icon="(options.decoration) ? getPropertyValue(options.decoration.prependIcon) || 'mdi-textbox-password' : ''" 

			@input="inputData"
			
		></v-text-field>
		
	</div>
</template>	

<script>

import { isUndefined } from "lodash"

export default {
	props:["options","getPropertyValue"],
	data: () => ({
		showChars: false,
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required."
	    }
	}),
	methods:{
		inputData(data){
			this.$emit("change", this, data)
		}
	}
}
</script>