<template>
	<div v-if="options && getPropertyValue"
		:class="(options.decoration) ? getPropertyValue(options.decoration.classes) : ''"      
	    :style="(options.decoration) ? getPropertyValue(options.decoration.style) : ''"      
	>
		<v-progress-linear
	      v-model="model"
	      :color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
	      :background-color="(options.decoration) ? getPropertyValue(options.decoration.backgroundColor) : ''"
	      :indeterminate="(options.decoration) ? getPropertyValue(options.decoration.indeterminate) : ''"
		  :stream="(options.decoration) ? getPropertyValue(options.decoration.stream) : ''"
	      :reverse="(options.decoration) ? getPropertyValue(options.decoration.reverse) : ''"
	      :rounded="(options.decoration) ? getPropertyValue(options.decoration.rounded) : ''"
	      :height="(options.decoration) ? getPropertyValue(options.decoration.height) : ''"
	    >
	      <template v-if="(options.decoration) ? getPropertyValue(options.decoration.showValue) : false" v-slot:default="{ value }">
	        <span>
	        	{{ Math.ceil(value) }}%
	        </span>
	      </template>
	    </v-progress-linear>
	</div>

</template>	

<script>
export default {
	props:["options","getPropertyValue"],
	
	data: () => ({
		model: null
	}),

	created(){
		this.model = (this.options.data) ? this.getPropertyValue(this.options.data.value) : 0
	}
	// computed:{
	// 	decoration(){
	// 		return ( this.options && this.options.decoration ) ? this.options.decoration : {}
	// 	}
	// }
}
</script>