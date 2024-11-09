const config = require("./config")

const { terminate } = require("./config/server-terminator")

console.log("** Initialize service")


require("./config/bootstrap")()
.then( app => {
	const server = app.listen(config.portal.port,console.log(`** JACE Portal starts at port ${config.portal.port}`))
	
	process.on('SIGINT', async () => {
	  console.info('SIGINT signal received.')
	  await terminate(server)
	  setTimeout(() => {
	      console.log('Finished closing connections')
	      process.exit(0)
	    }, 1500)
	})

	process.on('message', async msg => {
  
	  if (msg == 'shutdown') {
		console.info('shutdown message received.')
	    await terminate(server)
	    setTimeout(() => {
	      console.log('Finished closing connections')
	      process.exit(0)
	    }, 1500)
	  }
	
	})
})	