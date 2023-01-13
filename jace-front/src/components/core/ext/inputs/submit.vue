<template>
	<div v-if="options && getPropertyValue">
		<v-btn    
	    	:disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
		    @click.stop="resolve()"
	    	:color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
			:outlined="(options.decoration) ? getPropertyValue(options.decoration.outlined) : false"
			:dense="(options.decoration) ? getPropertyValue(options.decoration.dense) : false"
		    :rounded="(options.decoration) ? getPropertyValue(options.decoration.rounded) : false"
	        :text="(options.decoration) ? getPropertyValue(options.decoration.text) : false"
	        style="
	          text-transform:none !important;
	          font-weight: inherit !important;
	          letter-spacing: inherit !important;
	          font-size: inherit !important;
	        "
      	>
        <v-icon v-if="options.decoration && options.decoration.icon" left>
          {{getPropertyValue(options.decoration.icon)}}
        </v-icon>
        {{ (options.decoration) ? getPropertyValue(options.decoration.title) : ""}}
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
			// this.$emit("push-button", this)
			// this.$emit("select")
			this.$emit("submit", (this.options.data) ? this.options.data.action || "reject" : "reject")
		}
	}
}
</script>