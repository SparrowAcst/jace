import { isArray, flattenDeep, min, max, reduce } from "lodash"


let unionRect = (b1,b2) => {
	if(!b1){
		if(!b2){
			return null
		} else {
			return b2
		}
	} else {
		if(!b2){
			return b1
		} else {
			return {
				left: Math.min(b1.left,b2.left),
				right:Math.max(b1.right, b2.right),
				top:Math.min(b1.top,b2.top),
				bottom:Math.max(b1.bottom, b2.bottom)
			}
		}
	}
}

let getBounds = geodata => {
	if(!isArray(geodata)) geodata = [geodata]
	let b =   reduce(geodata, ( total, d ) => {
				return {
						properties:{
							bounds: unionRect( total.properties.bounds, d.properties.bounds )
						}	
					}	
				})
	return b.properties.bounds				
}

let getBoundary = d => {
	let coordinates = flattenDeep(d.geometry.coordinates)
	let coordinatesX = coordinates.filter( (d,index) => index % 2 == 0)
	let coordinatesY = coordinates.filter( (d,index) => index % 2 == 1)
	return {
		left: min(coordinatesX),
		right: max(coordinatesX),
		top: min(coordinatesY),
		bottom: max(coordinatesY)
	}
}


let getCenter = geodata => {
	let b = getBounds(geodata)
	return [ (b.right+b.left)/2, (b.bottom+b.top)/2]
}

let getZoom = (g, b) => {
	let s = getBounds(g)
	console.log(s)
	console.log(b)
	console.log("-------------")
	return Math.min ( (b.right-b.left)/(s.right-s.left+7), (b.bottom-b.top)/(s.bottom-s.top+7) )
}


export default { 
	unionRect,
	getBounds,
	getCenter,
	getZoom,
	getBoundary
}