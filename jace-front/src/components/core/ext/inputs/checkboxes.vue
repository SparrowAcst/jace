<template>
	<div class="dj-checkboxes">
		<div 
			v-if="options && options.data"
			:class="(options.decoration) ? getPropertyValue(options.decoration.classes) : ''" 
			:style="(options.decoration) ? getPropertyValue(options.decoration.style) : ''" >
			<v-checkbox   	
				v-for="(variant, index) in vars"
				:key="index"
				hide-details
				v-model="selection[index]" 
				:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
				:readonly="(options.data) ? getPropertyValue(options.data.readonly) : false"
				:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
				:flat="(options.decoration) ? getPropertyValue(options.decoration.flat) : false"
				:inset="(options.decoration) ? getPropertyValue(options.decoration.inset) : false"
				:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
				:messages="(options.decoration) ? getPropertyValue(options.decoration.messages) : []"
				 
				@change="inputData"
			>
				<template v-slot:label>
					<v-div
						:class="(options.decoration) ? getPropertyValue(options.decoration.labelClass) : ''"
						:style="(options.decoration) ? getPropertyValue(options.decoration.labelStyle) : ''"
					>
						{{ (options.data) ? getPropertyValue(variant) : '' }}
					</v-div>
				</template>	
			</v-checkbox>

		</div>
	</div>
</template>	

<script>

import { isUndefined, isArray } from "lodash"

export default {
	
	props:[ "options", "getPropertyValue" ],

	data: () => ({
		selection: [],
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required."
		}
	}),

	computed:{
		vars() {
			let res = this.getPropertyValue(this.options.data.variants)
			if(res && isArray(res)) return res
			return []	
		}
	},
	
	methods:{
		
		inputData(data){
			this.$emit("change", this, this.getPropertyValue(this.options.data.variants).filter( (d,index) => this.selection[index]))
		}
	}, 


	created(){
		if(this.options.data){
			let resp = this.getPropertyValue(this.options.data.value) || []
			let variants = this.getPropertyValue(this.options.data.variants || [])
			if(variants && isArray(variants)){
				let selection = variants.map(d => resp.includes(d))
				this.selection = selection
			} 	
		}
	}
}
</script>

<style scoped>
    .v-input--selection-controls {
        margin:0px !important;
    }
</style>