import snippets from "./snippets.js"

export default {

	name:"inputs-widget",

    icon: "mdi-card-bulleted-outline",

    getInitialConfig(snippet){
        snippet = snippet || "Line"
        let res = snippets[snippet] || snippets["Line"]
        return res
    }    

}