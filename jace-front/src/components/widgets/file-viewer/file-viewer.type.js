import snippets from "./snippets.js"

export default {

	name:"file-viewer-widget",

    icon: "mdi-card-bulleted-outline",

    getInitialConfig(snippet){
        return snippets
    }    

}