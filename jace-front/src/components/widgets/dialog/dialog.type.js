import snippets from "./snippets.js"

export default {

	name:"dialog-widget",

    icon: "mdi-form-select",

    getInitialConfig(snippet){
        snippet = snippet || "Input Group"
        let res = snippets[snippet] || snippets["Dialog"]
        return res
    }    

}