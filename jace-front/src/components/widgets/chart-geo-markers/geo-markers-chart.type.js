import snippets from "./snippets.js"

export default {

	name:"geo-markers-chart-widget",

    icon: "mdi-map-marker",

    getInitialConfig(snippet){
        snippet = snippet || "World Markers"
        let res = snippets[snippet] || snippets["World Markers"]
        return res
    }    

}