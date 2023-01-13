import snippets from "./snippets.js"

export default {

	name:"sunburst-chart-widget",

    icon: "mdi-chart-arc",

    getInitialConfig(snippet){
        snippet = snippet || "Sunburst"
        let res = snippets[snippet] || snippets["Sunburst"]
        return res
    }    

}