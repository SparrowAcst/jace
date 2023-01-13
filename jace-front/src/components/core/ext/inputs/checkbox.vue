<template>
	<div 
		:class="(options.decoration) ? getPropertyValue(options.decoration.classes) : ''" 
		:style="(options.decoration) ? getPropertyValue(options.decoration.style) : ''" >

		<v-checkbox 
			:label="(options.data) ? getPropertyValue(options.data.label) : ''" 
			:v-model="(options.data && options.data.value) ? getPropertyValue(options.data.value) : null" 
			:value="(options.data && options.data.value) ? getPropertyValue(options.data.value) : false" 
			:input-value ="(options.data && options.data.value) ? getPropertyValue(options.data.value) : false"
			
			:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
			
			:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			:flat="(options.decoration) ? getPropertyValue(options.decoration.flat) : false"
			:inset="(options.decoration) ? getPropertyValue(options.decoration.inset) : false"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
			:messages="(options.decoration) ? getPropertyValue(options.decoration.messages) : []"
			hide-details = "(options.decoration) ? getPropertyValue(options.decoration.hideDetails) : true"
			@change="inputData"
		>
			<template v-slot:label>
					<v-div
						:class="(options.decoration) ? getPropertyValue(options.decoration.labelClass) : ''"
						:style="(options.decoration) ? getPropertyValue(options.decoration.labelStyle) : ''"
					>
						{{ (options.data) ? getPropertyValue(options.data.label) : '' }}
					</v-div>
				</template>	
		</v-checkbox>
		
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
	})
	,
	methods:{
		inputData(data){
			this.$emit("change", this, !!data)
		}
	}
}
</script>
<style scoped>
    .v-input--selection-controls {
        margin:0px !important;
    }
</style>