<template>
  <img v-if="imageRef" :src="imageRef"></img>
</template>

<script>

import domtoimage from 'dom-to-image-improved';

export default {

  name: "screenshot",

  // template: '<div></div>',

  props: {
    node:{}
  },

  data: () => {
    return {
      imageRef: null
    };
  },

  
  watch: {

    node: function(newContent) {
      console.log(newContent)
      if(newContent){
        domtoimage.toPng(newContent)
          .then(dataUrl => {
              this.imageRef = dataUrl
          })
          .catch(function (error) {
              console.error('Rendering Error ', error);
          });
      }
    }

  },

  mounted() {
    if(this.node){
      let n =this.node.cloneNode(true)
      console.log(n)
      document.body.appendChild(n)
      this.$nextTick(() => {
        domtoimage.toPng(n)
          .then(dataUrl => {
              this.imageRef = dataUrl
              document.body.removeChild(n)
          })
          .catch(function (error) {
              console.error('Rendering Error ', error);
              document.body.removeChild(n)
          });  
      })
      
    }
    
    
    this.$emit("mount", this)
  }


}

</script>
