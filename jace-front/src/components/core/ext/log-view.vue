<template>
	<pre 
		class="ma-0 pa-2 secondary--text justify-center" 
		:style="`
			font-size: 11px; 
			line-height: 1.2; 
			width: ${width_}; 
			height: ${height_}; 
			overflow: auto; 
			border: 1px solid #dedede;
			background: #fafafa;
	`">{{log}}</pre>
</template>

<script>


export default {
	name: "log-vue",
	props:["messages","width", "height", "autoscroll"],
	data: () => ({
		log: "",
		autoscroll_: false,
		width_: "65em",
		height_: "15em"
	}),
	watch:{
		messages:{
			
			handler(value){
				this.log = value.join("\n")
				if(this.autoscroll_) this.$nextTick( () => { this.$el.scrollTop = this.$el.scrollHeight } )
			},

			deep:true
		}
	},

	created(){
		this.autoscroll_ = (this.autoscroll || this.autoscroll == "") ? true : false 
		this.height_ = this.height || "15em"
		this.width_ = this.width || "65em"
	}
}

</script>	