import snippets from "./snippets.js"

export default {

	name:"mapbox-widget",

    icon: "mdi-map",

    getInitialConfig(snippet){
        // snippet = snippet || "Pie"
        let res = snippets//[snippet] || snippets["Graph"]
        return res
    }  
      

}