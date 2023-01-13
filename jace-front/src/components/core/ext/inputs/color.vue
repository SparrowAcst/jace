<template>

	<div class="v-input__control" v-if="options && getPropertyValue">
		<div class="v-input__slot">
			<div 
				class="v-text-field__slot" 
				:style="(getPropertyValue(decoration.outlined)) ? `border: 1px solid;border-color: #9e9e9e;border-radius: 4px;padding: 0.5em; width:100%` : 'padding: 0.5em; width:100%'"
			>
				<label v-if="getPropertyValue(settings.label)"
					for="`i-${_uid}`" 
					class="v-label v-label--active theme--light" 
					style="left: 10px;
					    position: absolute;
					    top: -0.5em;
					    font-size: 12px;
					    background: white;
					    padding: 0px 4px;"
				>
					{{getPropertyValue(settings.label)}}
				</label>
				<v-color-picker
					:v-model="getPropertyValue(settings.value)"
					:value="getPropertyValue(settings.value)"
					:mode="getPropertyValue(settings.mode)"
					:show-swatches = "getPropertyValue(decoration.showSwatches)"
			        :swatches = "getPropertyValue(decoration.swatches)"
			        @input = "inputData"
		    	></v-color-picker>
			</div>
		</div>
	</div>

</template>	

<script>
export default {
	props:["options","getPropertyValue"],
	computed:{
		decoration(){
			return ( this.options && this.options.decoration ) ? this.options.decoration : {}
		},
		settings(){
			return ( this.options && this.options.data ) ? this.options.data : {}
		},
	},
	methods:{
		inputData(data){
			this.$emit("change", this, data)
		}
	}
}
</script>