<template>
	<div class="d-flex align-center">
	    <v-avatar v-if="options && getPropertyValue"
	    	:color="getPropertyValue(decoration.color)"
	    	:size = "getPropertyValue(decoration.size)"
	    >
	          	<dj-img 
		          	:src="getPropertyValue(decoration.src)" 
		          	:icon="getPropertyValue(decoration.icon)">
	    		</dj-img>
	    </v-avatar>
	    <div class="justify-center px-2">
	    	<div class="caption font-weight-bold" style="line-height:1">
	    		{{getPropertyValue(decoration.title)}}
	    	</div>	
	    	<div class="caption">
	    		{{getPropertyValue(decoration.subTitle)}}
	    	</div>
	    </div>	
    </div>  
</template>	

<script>
export default {
	props:["options","getPropertyValue"],
	computed:{
		decoration(){
			return ( this.options && this.options.decoration ) ? this.options.decoration : {}
		}
	}
}
</script>