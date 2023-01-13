import snippets from "./snippets.js"

export default {

	name:"scatter1d-chart-widget",

    icon: "mdi-chart-timeline",

    getInitialConfig(snippet){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }    

}