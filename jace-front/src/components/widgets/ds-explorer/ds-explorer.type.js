import snippets from "./snippets.js"

export default {
	name:"ds-explorer-widget",

    icon: "mdi-database",

    getInitialConfig( snippet ){
        snippet = snippet || "Dataset Explorer"
        let res = snippets[snippet] || snippets["Dataset Explorer"]
        return res
    }

}
