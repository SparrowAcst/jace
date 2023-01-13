<template>
<v-dialog
        v-model="isActive"
        width="30%"
        height="500px"
        persistent
      >
      <slot></slot>
</v-dialog>      
</template>
<script> 
// import djvueMixin from "@/mixins/core/djvue.mixin.js"

 export default {
 	// mixins:["djvueMixin"]
 }
</script>