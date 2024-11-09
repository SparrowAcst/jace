const uuid = require("uuid").v4
const { remove, isFunction } = require("lodash")

const onTerminateHandlers = [
	{
	    id: uuid(),
	    handler: async () => {
	        console.log("Start graiceful shutdown")
	    }
	}
]


module.exports = {
    
    addListener: handler => {
    	let id = uuid()
    	onTerminateHandlers.push({
    		id,
    		handler
    	})
    	return id
    },

    removeListener: id => {
    	remove(onTerminateHandlers, h => h.id == id)
    },

    terminate: async server => {
    	console.log("Server close")
    	
    	server.close( async err => {
		    
		    console.log("CLOSED", err)
		    
		    if (err) {
		      console.error(err)
		      process.exit(1)
		    }
	    	
	    	for( const listener of onTerminateHandlers){
	    		if(isFunction(listener.handler)){
	    			console.log("run ", listener.id)
	    			await listener.handler()
	    		} else {
	    			console.log("ignore ", listener.id)
	    		}
	    	}

	    })	
    
    }

}