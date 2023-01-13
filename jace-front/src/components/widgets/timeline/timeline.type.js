import snippets from "./snippets.js"

export default {

	name:"timeline-widget",

    icon: "mdi-timeline-check-outline",

    getInitialConfig(snippet){
        snippet = snippet || "Timeline"
        let res = snippets[snippet] || snippets["Timeline"]
        return res
    }    

}