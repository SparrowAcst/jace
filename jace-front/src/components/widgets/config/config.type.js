export default {
	name:"config-widget",

    icon: "mdi-language-javascript",

    getInitialConfig(){

        let res = {
            type:"config-widget", 
            name:"noname",
            icon:"mdi-language-javascript",
            options: { widget:{
                visible:true
              }
            },
            data:{
              script:`// type script here
                alert("Djvue app run in "+this.app.mode+" mode")
              `
            }
        }
        return res
    }	
}