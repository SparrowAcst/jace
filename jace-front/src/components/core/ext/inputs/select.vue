<template>
	<div v-if="options && getPropertyValue">
	
		<v-autocomplete 
			v-model="selection" 
			
			:label="(options.data) ? getPropertyValue(options.data.label) : ''" 
			:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
			:required="(options.data) ? getPropertyValue(options.data.required) : false"  
			:clearable="(options.data) ? getPropertyValue(options.data.clearable) : false"
			:multiple="(options.data) ? getPropertyValue(options.data.multiple) : false" 
			:auto-select-first = "(options.data) ? getPropertyValue(options.data.autoSelectFirst) : false"

			:items="(options.data) ? getPropertyValue(options.data.items) || [] : [] " 
			:item-text = "(options.data) ? getPropertyValue(options.data['itemText']) || '' : '' "
			:item-value="(options.data) ? getPropertyValue(options.data['itemValue']) || 'item => item' : 'item => item'" 
			
			:search-input.sync="search"
			:prepend-icon = "(options.decoration) ? getPropertyValue(options.decoration['prepend-icon']) : ''"
			:color="(options.decoration) ? getPropertyValue(options.decoration.color) : '' "
			:flat="(options.decoration) ? getPropertyValue(options.decoration.flat) : false"
			:outlined="(options.decoration) ? getPropertyValue(options.decoration.outlined) : false"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
			:hide-details="(options.decoration) ? getPropertyValue(options.decoration.hideDetails) : false"
			
		>
        </v-autocomplete>
		
	</div>

</template>	

<script>

import { isUndefined } from "lodash"

export default {
	props:["options","getPropertyValue"],
	

	data: () => ({
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required."
		},
		search:null,
		selection:[]
	}),

	methods:{
		updateSelection(options){
			this.selection = (options.data && options.data.value) ? this.getPropertyValue(options.data.value) : []
			// console.log("update selection", this.selection)
			
		}
	},

	watch:{
		options:{
			handler(val){
				if (!val) return
				if (!this.getPropertyValue) return
				this.updateSelection(val)	
			},
			deep:true
		},
		getPropertyValue:{
			handler(val){
				if (!this.options) return
				if (!val) return
				this.updateSelection(this.options)	
			},
			deep:true
		},

		selection(){
			this.search = null
			this.$emit("change",this, this.selection)
		}
	},

	created(){
		this.updateSelection(this.options)
	}
}
</script>