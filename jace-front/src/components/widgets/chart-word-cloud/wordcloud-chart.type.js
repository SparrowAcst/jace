import snippets from "./snippets.js"

export default {

	name:"wordcloud-chart-widget",

    icon: "mdi-format-letter-case",

    getInitialConfig(snippet){
        snippet = snippet || "Wordcloud"
        let res = snippets[snippet] || snippets["Wordcloud"]
        return res
    }    

}