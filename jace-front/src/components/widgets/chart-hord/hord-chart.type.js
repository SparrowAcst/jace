import snippets from "./snippets.js"

export default {

	name:"bar-chart-widget",

    icon: "mdi-chart-donut",

    getInitialConfig(snippet){
        snippet = snippet || "Horizontal Bars"
        let res = snippets[snippet] || snippets["Hords"]
        return res
    }    

}