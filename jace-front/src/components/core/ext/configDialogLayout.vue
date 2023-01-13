<template>
<v-dialog
        v-model="isActive"
        width="80%"
        height="500px"
        persistent
      >
      <slot></slot>
</v-dialog>      
</template>
<script>

 export default {
 	mounted(){
 		window.console.log("mount layout")
 	}
  }
</script>