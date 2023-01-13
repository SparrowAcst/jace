import snippets from "./snippets.js"

export default {

	name:"input-group-widget",

    icon: "mdi-card-bulleted-outline",

    getInitialConfig(snippet){
        snippet = snippet || "Input Group"
        let res = snippets[snippet] || snippets["Input Group"]
        return res
    }    

}