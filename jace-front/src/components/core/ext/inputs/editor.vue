<template>
		
		<editor
			v-if="options && getPropertyValue"
          :content="value"
          ref="editor" 
          :lang="(options.data) ? getPropertyValue(options.data.lang) : 'js'"
          :theme="(options.data) ? getPropertyValue(options.data.theme) : ''" 
          :sync="true"
          @change="onUpdateSource"
          :style = "(options.decoration) ? getPropertyValue(options.decoration.style) : ''">
        </editor>


</template>	

<script>

import { isUndefined } from "lodash"

export default {
	props:["options","getPropertyValue"],
	
	components:{
		editor: () => import("@/components/core/ext/ace-editor.vue")
	},

	data: () => ({
		value: ""
	}),

	methods:{
		onUpdateSource (value) {
          this.value = value
          this.$emit("change", this, this.value)
      	}
	},

	watch:{
		options:{
			handler(val){
				if (!val) return
				if (!this.getPropertyValue) return
			},
			deep:true
		},
		getPropertyValue:{
			handler(val){
				if (!this.options) return
				if (!val) return
			},
			deep:true
		}

	},

	created(){
		this.value = (this.options.data) ? this.getPropertyValue(this.options.data.value) : ''
	}
}
</script>