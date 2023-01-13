<template>
	<div v-if="options && getPropertyValue">
		<v-menu offset-y close-on-click>
	        <template v-slot:activator="{ on, attrs }">
	          <v-btn    
	            v-bind="attrs"
	            v-on="on"
	            :disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
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
	            {{getPropertyValue(options.decoration.title)}}
	            <v-icon right>
	              {{getPropertyValue(options.decoration.iconRight)}}
	            </v-icon>
	          </v-btn>

	        </template>
	    	<v-list v-if="options.data && options.data.items" dense>
	          <v-list-item
	            v-for="(c, c_index) in getPropertyValue(options.data.items)"
	            :key="c_index"
	            :disabled = "(c.disabled) ? getPropertyValue(c.disabled) : false"
	            @click="resolve(c)"
	          >
	            <v-list-item-icon v-if="!!c.icon" class="mr-1">
	              <v-icon v-text="c.icon"></v-icon>
	            </v-list-item-icon>
	            <v-list-item-content>
	              <v-list-item-title v-text="c.title"></v-list-item-title>
	            </v-list-item-content>
	          </v-list-item>
	      	</v-list>
	      </v-menu>

	    </div>  


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
		resolve(item){
			// console.log("push-menu", item)
			this.$emit("push-menu", item)
		}
	}
}
</script>