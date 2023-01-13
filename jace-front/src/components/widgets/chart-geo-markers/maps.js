
import geodata from "./geodata.js"
import { findIndex } from "lodash"

export default (scope, locale) => {
	scope = scope || "World"
	locale = locale || "en"
	
	return {
		"type":"FeatureCollection",
		"features": JSON.parse(JSON.stringify(geodata))
			.filter(item => findIndex(item.properties.scope, t => t == scope) >=0 )
			
			.map(item => {
				item.properties.name = item.properties.name[locale]
				return item
			})
	} 
}