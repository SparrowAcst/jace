<template>
	<v-flex  xs1 v-resize="update" style="border-bottom:1px solid #999; border-left:1px solid #999; border-right:1px solid #999;">
	</v-flex>
</template>	

<script>
export default {
	props:["index","content"],

	methods:{
		update(){
			if(this.$el)
			this.$emit('update', {index:this.index, x:this.$el.offsetLeft, width:this.$el.offsetWidth})
		}
	},


	mounted(){
		this.$emit("mount", {index:this.index, x:this.$el.offsetLeft, width:this.$el.offsetWidth})
	}
	
	
}
</script>