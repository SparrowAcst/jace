<template>
	<div v-if="options && getPropertyValue">
	  	<v-tabs
	      v-model="tab"
	      :disabled="(options.data) ? getPropertyValue(options.data.disabled) : false" 
	      background-color="(options.decoration) ? getPropertyValue(options.decoration.backgroundColor) : ''"
	      :color="(options.decoration) ? getPropertyValue(options.decoration.color) : ''"
	      :active-class="(options.decoration) ? getPropertyValue(options.decoration.activeClass) : ''"
	      :slider-size="(options.decoration) ? getPropertyValue(options.decoration.sliderSize) : ''"
	      :slider-color="(options.decoration) ? getPropertyValue(options.decoration.sliderColor) : ''"
	      show-arrows
	      :vertical = "(options.decoration) ? getPropertyValue(options.decoration.vertical) : false"
	      :right = "(options.decoration) ? getPropertyValue(options.decoration.right) : true"
	      :left = "(options.decoration) ? getPropertyValue(options.decoration.left) : false"
	    >
		     <v-tab
		        v-for="(item, index) in options.data.tabs"
		        :key="index"
		        :class="(options.decoration) ? getPropertyValue(options.decoration.classes) : ''"
		        :style="`
		          text-transform:none !important;
		          padding: 0 10px;
		          justify-content: flex-start;
		          ${(options.decoration.vertical) ? 'border-bottom: 1px solid #cfd7e6' : 'none'};
		        `"
		        @click.stop="resolve(index)"
		     >
		     	<div class="d-flex align-center" style="width:100%">
		          <v-icon v-if="item.icon" class="pr-1">
		            {{item.icon}}
		          </v-icon>
		          <div>{{ item.title }}</div>
		          <div class="spacer"></div>
		          <div v-if="item.badge" :class="item.badge.decoration.class" :style="item.badge.decoration.style">
		            {{item.badge.content}}
		          </div>  
		        </div>
	    	</v-tab>
	    </v-tabs>
	</div>    
</template>


<script>

import { extend } from "lodash"
import djvueMixin from "@/mixins/core/djvue.mixin.js";
import listenerMixin from "@/mixins/core/listener.mixin.js";


export default {
	
	mixins: [djvueMixin, listenerMixin],
	
	props:["options","getPropertyValue"],
	
	data: () => ({
		tab: null
	}),

	methods:{
		resolve(tab){
			this.tab = tab
			this.options.data.active = extend({}, this.options.data.tabs[this.tab], {index: tab})
			this.$emit("push-button", this)
			// this.$emit("select")
		}
	},

	created(){
		if(this.options.data.active) {
			this.tab = this.options.data.active.index || 0	
		} else {
			this.tab = 0
		}
		
	}
}

</script>
