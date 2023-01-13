<template>
	<div 
		:class="(options.decoration) ? getPropertyValue(options.decoration.classes) : ''" 
		:style="(options.decoration) ? getPropertyValue(options.decoration.style) : ''" 
	>
	
		<div class="d-flex align-center" 
			v-for="(feature, index) in getPropertyValue(options.data.features)"
			:key="index"
		>
	      	
	      <div class="flex"
	      	:class="(options.decoration && options.decoration.feature) ? getPropertyValue(options.decoration.feature.classes) : ''"
	      	:style="(options.decoration && options.decoration.feature) ? getPropertyValue(options.decoration.feature.style) : ''"
	      	>	
	      	{{ feature }}
	      </div>	
	      <v-spacer></v-spacer>
	      
	      <v-rating
	      	class="flex"
	        v-model="response[feature]"
	        :length="scale.length || 5"
	        :background-color="(options.decoration) ? getPropertyValue(options.decoration.bgColor) : ''"
			:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
			:size="(options.decoration) ? getPropertyValue(options.decoration.size) : 18"
		  	:empty-icon="(options.decoration && options.decoration.icon) ? getPropertyValue(options.decoration.icon)+'-outline' : 'mdi-rectangle-outline'"
		  	:full-icon="(options.decoration && options.decoration.icon) ? getPropertyValue(options.decoration.icon) : 'mdi-rectangle'"
		  	@input="inputData"
		  >
		  </v-rating>
		  <div class="flex"
	      	:class="(options.decoration && options.decoration.comment) ? getPropertyValue(options.decoration.comment.classes) : ''"
	      	:style="(options.decoration && options.decoration.comment) ? getPropertyValue(options.decoration.comment.style) : ''"
	      	v-if="response"	
	      >
	        {{ getRateDescription(response[feature]) }}
	      </div>
	    </div>

		
	</div>
</template>	

<script>

import { isUndefined, find } from "lodash"

export default {
	
	props:[ "options", "getPropertyValue" ],


	data: () => ({
		response: null,
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required."
		}
	}),
	
	methods:{
		
		inputData(data){
			this.$emit("change", this, this.response)
		},

		getRateDescription(rate) {
			let desc = ""
			if(!isUndefined(rate)){
				if(!isUndefined(this.scale[rate-1]))
					desc = `(${rate}) ${this.scale[rate-1]}`
			}	
			
			return desc
		}

	}, 

	created(){
		
		this.scale = this.getPropertyValue(this.options.data.scale)
		
		if(!this.getPropertyValue(this.options.data.value)){
			let res = {}
			this.getPropertyValue(this.options.data.features).forEach( f => {
				res[f] = null
			})
			this.response = res
		
		} else {
			this.response = this.getPropertyValue(this.options.data.value)
		
		}
	}
}
</script>

<style>
     div.v-rating button.v-icon{
	    padding: 1px !important;
	}
	.v-card__actions {
		padding: 0;	
	}
</style>