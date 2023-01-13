<template>
	<div :class="{'v-responsive v-image':!error,'v-responsive':error}">
		<v-img v-if="!error" :src="src" v-bind="$attrs"></v-img>
		<v-icon v-if="error" v-bind="$attrs" style="margin:auto;">{{icon}}</v-icon>
	</div>	
</template>	

<script>
	export default {
		inheritAttrs: false,
		props:["src","icon"],
		data: ()=>({
			error: true
		}),
		methods:{
			onError(){
				// console.log("ERROR", this.src)
				this.error = true
			},
			onLoad(){
				// console.log("SUCCESS", this.src)
				this.error = false	
			}
		},
		watch:{
			src(newValue){
				this.error = true
				let img = new Image()
				
				img.onerror = this.onError
				img.onload = this.onLoad
				img.src = newValue
			}
		},

		created(){
			let img = new Image()
			
			img.onerror = this.onError
			img.onload = this.onLoad
			img.src = this.src
		}

	}
</script>