import geodata from "./geopoints.js"
export default scope => geodata.filter( d => d.scope == (scope || "World"))
