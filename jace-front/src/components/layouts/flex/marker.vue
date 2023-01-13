<template>
	<div 
		:style="markerStyle" 
		@mousedown="select(true)" 
		@mouseup="select(false)"

	>
          <v-icon small :class="markerClass">{{(dragged) ? "mdi-triangle" :"mdi-triangle-outline"}}</v-icon>
    </div> 
</template>

<script>
	export default {

		props:["index","disabled"],
		
		computed:{
			markerStyle(){
				if(this.position)
					return `position:fixed; left:${this.position-8}px; margin-top:-4px;${(this.dragged)?'cursor:e-resize;':''}`
				return ''
			},
			markerClass(){
				return (this.selected) ? "mdi-rotate-180 primary--text" : "mdi-rotate-180"
			}
		},
		
		methods:{
			select(value){
				// if(!this.dragged && !this.disabled){
					this.selected = value;
					this.$emit("change", this)
				// }
			}

		},

		watch:{
			position(newValue){
				// console.log("WATH ", this.index, newValue)
			}
		},

		mounted(){
			this.$emit("mount",this)
		},

		data:() => ({
			selected:false,
			dragged:false,
			position:0
		})
	}
</script>	