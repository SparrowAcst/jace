import snippets from "./snippets.js"

export default {

	name:"gauge-chart-widget",

    icon: "mdi-gauge",

    getInitialConfig(snippet){
        snippet = snippet || "Gauge"
        let res = snippets[snippet] || snippets["Gauge"]
        return res
    }    

}