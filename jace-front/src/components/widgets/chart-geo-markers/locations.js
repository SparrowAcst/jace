import geodata from "./geopoints.js"

export default (scope, locale) => {
	scope = scope || "World"
	locale = locale || "en"
	
	return geodata.filter( d => d.scope = scope)
}