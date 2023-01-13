<template>
  
  <v-layout column :style="(dragging)?'cursor:e-resize':''"  @mouseup="stopDrag" @mousemove="doDrag">
  	<v-layout row style="height:0.5em; color:#dedede; ">
      <tick v-for="(tick, index) in ticks" :index="index" @mount="updateTick" @update="updateTick"></tick>
    </v-layout>
    <v-layout row style="height:1.5em;">
      <dj-marker 
      	v-for="(m, index) in markers" 
      	@change="changeMarker" 
      	@mount="initMarker" 
      	
      	:index="index"
      	:disabled="dragging"
      >
     </dj-marker>
    </v-layout>
  </v-layout>

</template>

<script>
import mixin from "@/mixins/core/layout.mixin.js"

export default {
  components: {
    "tick": () => import("./tick.vue"),
    "dj-marker": () => import("./marker.vue")
  },

  mixins: [mixin],

  methods: {

    updateTick(tick) {
      this.ticks[tick.index] = tick
      this.updateMarkers()
    },

    changeMarker(marker){
    	if(marker.selected){
    		this.markerSelection = this.markers[marker.index]
    		this.startDrag()	
    	} else {
    		this.stopDrag()
    	}
    	
    },


    startDrag() {
    	if(this.markerSelection){
    		this.dragging = true;
      		this.x = this.y = 0;
      		this.markerSelection.instance.dragged = true		
    	}	
      
    },

    stopDrag() {
      if(this.markerSelection){
    		this.dragging = false;
		    this.x = this.y = 'no';
		    this.markerSelection.instance.dragged = false
		    this.markerSelection.instance.selected = false
		    this.markerSelection = null		
    	}

    },

   validateRight(array){
   	let l = [];
   	for(let i=0; i<array.length-1; i++){
   		l.push(array[i+1].relativePosition - array[i].relativePosition)
   	}
   	return !( (_.max(l) == 1) && (_.last(array).relativePosition == 12) )
   },

   validateLeft(array){
   	let l = [];
   	for(let i=0; i<array.length-1; i++){
   		l.push(array[i+1].relativePosition - array[i].relativePosition)
   	}
   	return !( (_.max(l) == 1) && (_.first(array).relativePosition == 0) )
   },


   leftMovement(x){
   		let index = this.markerSelection.instance.index
   		if(index == 0){
   			if(x >= 0){
   				this.markerSelection.relativePosition = x
   				this.markerSelection.instance.position = this.rel2abs(x)
   			}
   		} else {
   			if(!this.validateLeft(_.take(this.markers, index+1))) return
   			let markers = _.take(this.markers, index+1)
   			let p = x
   			for(let i = markers.length-1; i > 0; i--){
   				if(!this.validateLeft(_.take(markers, i+1))) return
   				if( markers[i-1].relativePosition >= p){
   					markers[i-1].relativePosition--
    				markers[i-1].instance.position = this.rel2abs(markers[i-1].relativePosition)
    				markers[i].relativePosition = p;
    				markers[i].instance.position = this.rel2abs(p)	
   				} else {
   					markers[i].relativePosition = p
   					markers[i].instance.position = this.rel2abs(p)		
   				}
   				p = markers[i-1].relativePosition	
   			}	
   		}
   },

   rightMovement(x){
   		let index = this.markerSelection.instance.index
   		if(index == this.markers.length-1){
   			if(x <= 13){
   				this.markerSelection.relativePosition = x
   				this.markerSelection.instance.position = this.rel2abs(x)
   			}
   		} else {
   			if(!this.validateRight(_.takeRight(this.markers, this.markers.length-index))) return
   			let markers = _.takeRight(this.markers, this.markers.length-index)
   			let p = x
   			for(let i = 0; i < markers.length-1; i++){
   				if(!this.validateRight(_.takeRight(markers, markers.length-i))) return
   				if( markers[i+1].relativePosition <= p){
   					markers[i+1].relativePosition++
    				markers[i+1].instance.position = this.rel2abs(markers[i+1].relativePosition)
    				markers[i].relativePosition = p;
    				markers[i].instance.position = this.rel2abs(p)	
   				} else {
   					markers[i].relativePosition = p
   					markers[i].instance.position = this.rel2abs(p)		
   				}
   				p = markers[i+1].relativePosition	
   			}	
   		}
   },

    mediateMarkers(x){
    	let pos = this.abs2rel(x)
    	let index = this.markerSelection.instance.index
    	this.delta = pos - this.markerSelection.relativePosition
    	if((pos - this.markerSelection.relativePosition)>=0){
    		this.rightMovement(pos)
    	} else {
    		this.leftMovement(pos)
    	}
    },

    doDrag(event) {

    	if(this.markerSelection){
    		  if (this.dragging) {
		        this.x = event.clientX;
		        this.y = event.clientY;
		        this.mediateMarkers(this.x)
		      }		
    	}		
    },

    abs2rel(x){
    	let t = this.ticks.map(d => d.x)
    	t.push(this.ticks[11].x+this.ticks[11].width)
    	let dif = t.map(d => Math.abs(d - x))
    	let min = _.min(dif)
    	return _.findIndex(dif,d => d== min)
    },

    rel2abs(x){
    	if(x==12) return (this.ticks[11].x+this.ticks[11].width)
    	return this.ticks[x].x
    },

    initMarker(marker){
    	this.$nextTick(() => {
    		let m = this.markers[marker.index]
	    	m.instance = marker
	    	// m.absolutePosition = this.rel2abs(m.relativePosition)
	    	m.instance.position = this.rel2abs(m.relativePosition)
    	})
    },

    updateMarkers(){
    	this.markers.forEach( m => {
    		if(m.instance) m.instance.position = this.rel2abs(m.relativePosition)	
    	})
    }


  },


  data: () => ({

  	  ticks:[0,1,2,3,4,5,6,7,8,9,10,11],
      dragging: false,
      x: 'no',
      y: 'no',
      markerX:100,
      markerSelection:null,
      delta:0,

      markers:[
      	{
      		relativePosition:0
      	},
      	{
      		relativePosition:6	
      	},
      	{
      		relativePosition:8	
      	},
      	{
      		relativePosition:12	
      	}
      ]

  })


}

</script>
