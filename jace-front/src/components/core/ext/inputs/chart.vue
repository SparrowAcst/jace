<template>
	<div v-if="options && getPropertyValue">
		<echart v-if="options && getPropertyValue" 
			:class = "(options && options.decoration) ? getPropertyValue(options.decoration.class) : ''"
			:style = "(options && options.decoration) ? getPropertyValue(options.decoration.style) : ''"
			:options="(options) ? getPropertyValue(options.chart) : {}" 
			:height="(options && options.decoration) ? getPropertyValue(options.decoration.height) : 150" 
			@chart-event="chartEventHandler"
		></echart>
	</div>
</template>	

<script>

import echart from "@/components/core/ext/echart.vue"

export default {
	
	props:["options","getPropertyValue"],
	
	components: { echart },
	
	data: () => ({}), 

	methods:{
		
		chartEventHandler(params){
	      this.emit("chart-event", this, params)
	    }
	
	}

}

</script>