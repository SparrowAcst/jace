import snippets from "./snippets.js"

export default {
	name:"ds-ontology-widget",

    icon: "mdi-triforce",

    getInitialConfig( snippet ){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }

}
