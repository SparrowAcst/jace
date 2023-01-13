<template>
	<div v-if="options && getPropertyValue">
		<v-btn 
			icon 
			@click.stop="emit('layout.h-bar')" 
			transition="slide-x-transition"
			:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
		    :color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			>
              <v-icon
              	:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
              >{{(options.decoration) ? getPropertyValue(options.decoration.icon) : 'mdi-chevron-left-circle-outline'}}</v-icon>
        </v-btn>
	</div>

</template>	

<script>

import { isUndefined } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";


export default {
	mixins: [djvueMixin, listenerMixin],
	props:["options","getPropertyValue"],
	data: () => ({
		rules:{
			required: value => (!isUndefined(value) && (value !== null) && (value !== "")) || "Required."
		}
	}),
	methods:{
		resolve(){
			this.$emit("push-button", this)
			this.$emit("select")
		}
	}
}
</script>