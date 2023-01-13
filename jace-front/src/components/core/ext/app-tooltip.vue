<template>
	  <v-menu
		absolute
	    :position-x="options.position.x"
        :position-y="options.position.y"
        v-model="options.show"
        :open-delay="options.openDelay"
        :transition="options.transition"
      >
      	<div v-if="options.wait" style="width:64px; height:64px;" class="d-flex align-center justify-center">
      		<v-icon mdi class="secondary--text mdi-spin">mdi-loading</v-icon>
      	</div>	

        <div v-else
          v-html="options.content"
        ></div>

      </v-menu>
</template>

<script>
import Vue from "vue"
import { extend } from "lodash"
import { v4 } from "uuid/dist"

let defaultOptions = {
		show: false,
		
		wait: true,
		
		openDelay: 700,
		
		transition: "fade-transition",
		
		position:{
			x:0,
			y:0,
			top: true
		},
		
		content:"The appTooltip content"

}

export default {

	data:() => ({
		options: extend({}, defaultOptions),
		showTimeout: null,
		currentId:null
	}),

	methods: {
		show(options){
			
			this.options.show = false
			this.$nextTick(()=>{
				if( this.showTimeout ){
					clearTimeout(this.showTimeout)
					this.showTimeout = null
				}

				this.options = extend( defaultOptions, options)
				this.options.wait = true
				this.currentContent = this.options.content			
				this.currentId = v4()
				let waitedId = JSON.parse(JSON.stringify(this.currentId))

				if(this.options.content instanceof Promise){
					this.options.content.then( content => {
						if(waitedId == this.currentId){
							this.options.wait = false
							this.options.content = content	

						}
					})
				} else {
					this.options.wait = false
				}

			
				setTimeout(() => {
					if( waitedId == this.currentId ){
						this.options.show = true
						this.showTimeout = null
					}	
				}, this.options.openDelay)
					
			})
			
		},

		hide(){
			this.options.show = false
			clearTimeout(this.showTimeout)
			this.showTimeout = null
			this.currentId = null
		}
	},
	
	mounted() {
    	Vue.prototype.$appTooltip = this
  	}

}

</script>
