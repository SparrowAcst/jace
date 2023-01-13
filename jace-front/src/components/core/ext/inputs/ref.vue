<template>
	<a  v-if="options && getPropertyValue"
		@click.stop="resolve"
		:style="getPropertyValue(decoration.style)"
		:class="getPropertyValue(decoration.classes)"
	>
		{{getPropertyValue(settings.value) || ''}}
	</a>	
</template>	

<script>

import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";

export default {
	props:["options","getPropertyValue"],

	mixins: [djvueMixin, listenerMixin],
	
	computed:{
		decoration(){
			return ( this.options && this.options.decoration ) ? this.options.decoration : {}
		},
		settings(){
			return ( this.options && this.options.data ) ? this.options.data : {}
		}

	},
	
	methods:{
		resolve(){
			this.$emit("push-ref", this)
			this.$emit("select")
	
		}
	}
}
</script>