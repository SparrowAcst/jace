export default {
  methods: {

    // _run(script){
    // 	return new Promise( (resolve, reject) => {
    // 		this.$dps.run({script: script})
    // 		.then( res => {
    // 			if(res.type =="error"){
    // 				reject(res.data)
    // 			} else {
    // 				resolve(res.data)
    // 			}
    // 		})
    // 	})

    // },

    dpsLoadCollectionSample(concept) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
					
					dml.select(from:"${concept}", return:"value")
					set("data")

					<?javascript
					    $scope.attr = $scope.data.map( d => Object.keys(d));
					    $scope.field = [];
					    $scope.attr.forEach( a => {
					        $scope.field = _.union($scope.field,a)
					    });
					?>
					
					get("data")
					c.limit()
					c.map(<?
						d => {
					        let res ={}
					        $scope.field.forEach( f => {
					            res[f] = ( d[f] ) ? d[f] : null
					        })
					        return res
					    }
					?>)
					set("data")
					<?javascript
					    $scope.res = {
					        dataset:{
					            dimensions: Object.keys($scope.data[0]),
					            source: $scope.data
					        }
					    };
					?>
					return("res")
				`
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })
    },

    dpsLoadSchema() {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
					ddl.desc("dj-data", return:"identity")
				`
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })
    },

    dpsUploadCollections(file) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `

					<?javascript
					    $scope.file = $scope.$file.name;
					?>

					file.load({{file}})
					set("db")
					ddl.desc()
					set("collections")


					<?javascript
					    let m = {
					        "identity": "",
					        "schema": "dj-data",
					        "attributes": {
					            "value": {
					                "type": "json"
					            }
					        },
					        "permissions": {
					            "create": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "alter": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "drop": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "desc": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "select": {
					                "role": [
					                    "any",
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "insert": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "update": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            },
					            "delete": {
					                "role": [
					                    "owner",
					                    "administrator"
					                ]
					            }
					        },
					    };    
					    

					    
					    $scope.sheets = Object.keys($scope.db);
					    $scope.collections = $scope.collections.map(c => c.identity)

					    $scope.toBeDrop = $scope.sheets
					                        .filter( s => _.find($scope.collections, c => c == s))

					    $scope.toBeCreate = $scope.sheets
					                .map( s => {
						                 let res = Object.assign({},m);
						                 res.identity = s
						                 return res
					                });
					    $scope.values = $scope.sheets.map( s => $scope.db[s].map(v=> ({id:v.id, value:v})));
					    
					    $scope.ddlDropScript = $scope.toBeDrop
					        .map( c => 
					            'ddl.drop(model:"'+c+'");info("'+c+'")'
					        )
					        .join(";")
					    $scope.ddlDropScript = ($scope.ddlDropScript) ? $scope.ddlDropScript : "ctx('noop')"
					    
					    $scope.ddlCreateScript = $scope.toBeCreate
					        .map( ( c, index ) => 
					            'info({{toBeCreate['+index+'].identity}});ddl.create(model:{{toBeCreate['+index+']}})'
					        )
					        .join(";");
					    $scope.ddlCreateScript = ($scope.ddlCreateScript) ? $scope.ddlCreateScript : "ctx('noop')"
					    
					    $scope.dmlScript = $scope.sheets
					        .map( ( s, index ) => 
					            'info("'+s+'");dml.insertOrUpdate(into:"'+s+'", values:{{values['+index+']}});info()'
					        )
					        .join(";");
					    
					?>
					info("Drop collections")
					run({{ddlDropScript}})
					info("Create collections")
					run({{ddlCreateScript}})
					info("Insert or update values")
					run({{dmlScript}})
					log()
					`,
          state: {},
          file: file
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })
    },

    dpsDownloadCollection(c) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
					
					dml.select(from:"${c.concept}", return:"value")
					set("data")

					<?javascript
					    $scope.attr = $scope.data.map( d => Object.keys(d));
					    $scope.field = [];
					    $scope.attr.forEach( a => {
					        $scope.field = _.union($scope.field,a)
					    });
					    
					    $scope.publisher = d => {
					        let res ={}
					        $scope.field.forEach( f => {
					            res[f] = ( d[f] ) ? d[f] : null
					        })
					        return res
					    }    
					?>
					get("data")
					c.map({{publisher}})


					export("${c.concept}.xlsx")

			`
        }).then(res => {
          if (res.type == "error") {
            reject(res)
          } else {
            resolve(this.$dps.getBaseURL() + res.data.url)
          }
        })
      })

    },

    dpsLoadConcepts(metadata) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
					dml.select(from:"${metadata.concepts}", return:"value")
					c.uniqueBy("topic")
					c.order()
					set("topics")

					<?javascript
					    $scope.tree = {name:"topic",children:[]}
					    
					    $scope.topics.forEach (t => {
					        
					        let path = t.split(":")
					        let current = $scope.tree.children
					        
					        path.forEach(( part, index ) => {
					            let f = _.find(current, t => t.name == part)
					            if(!f) {
					                current.push({
					                    name:part, 
					                    children: [],
					                    type:"topic",
					                    path: (index == path.length-1) ? t : undefined
					                })
					                current = current[current.length-1].children
					            } else {
					                current = f.children
					            }
					        })
					        
					    })
					    
					    $scope.tree = $scope.tree.children
					?>

					return ("tree")
					`
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })

    },

    dpsLoadEntityInfo(metadata, e) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
		        	<?javascript
				    $scope.mapper = d => d.value; 
				?>
				dml.select(from:"${e.concept}", return:"value")
				set("data")

				dml.select(from:"${metadata.collections}", where:<? d => d.value.concept.startsWith("${e.concept}")  ?>, return:"value")
				set("collections")

				dml.select(from:"${metadata.concepts}", return:"value")
				set("indicators")

				<?javascript
				    let getCollectionDef = concept => {
				      let collection = _.find($scope.collections, c => c.concept == concept)
				      collection.attr = $scope.collections
				        .filter( c => c.concept.split(".").length > 1)
				        .map( a => {
				            if( a.ref ) {
				                let names = a.ref.split(".")
				                // a.names = names
				                a.ref = {}
				                a.ref.attr = names[1]
				                a.ref.collection = {
				                	concept:names[0]
				                }//getCollectionDef(names[0])
				            }
				            if( a.def ){
				                a.def = _.find($scope.indicators, i => i.concept == a.def.split(".")[1])
				            }
				            return a
				        })
				    // let collection = {
				    //     concept
				    // }
				      return collection
				    }
				    $scope.counts = {
				        total: $scope.data.length 
				    }
				    Object.keys( $scope.data[0]).forEach( key => {
				        $scope.counts[key] = _.unique($scope.data, key).length
				    });
				    $scope.res = getCollectionDef("${e.concept}")
				    $scope.res.count = $scope.counts.total
				    $scope.res.attr = $scope.res.attr.map( a => {
				        a.count = $scope.counts[a.concept.split(".")[1]]
				        return a
				    })
				?>
				return ("res")


		        `
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })

    },

    dpsLoadDatapointInfo(metadata, dp) {
      // console.log("dpsLoadDatapointInfo", metadata, dp)
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
				
				dml.select(from:"${dp.concept}", return:"value")
				set("data")

				dml.select(from:"${metadata.collections}",  where:<? d => d.value.concept.startsWith("${dp.concept}")  ?>, return:"value")
				set("collections")

				dml.select(from:"${metadata.concepts}", return:"value")
				set("indicators")

				<?javascript
				    let getCollectionDef = concept => {
				      let collection = $scope.collections.filter( c => c.concept == concept)[0]
				      collection.attr = $scope.collections
				        .filter( c => c.concept.split(".").length>1 && c.concept.split(".")[0] == concept)
				        .map( a => {
				            if( a.ref ) {
				                let names = a.ref.split(".")
				                a.ref = {}
				                a.ref.attr = names[1]
				                a.ref.collection = {
				                	concept:names[0]
				                }//getCollectionDef(names[0])
				            }
				            if( a.def ){
				                a.def = _.find($scope.indicators, i => i.concept == a.def.split(".")[1])
				            }
				            return a
				        })
				    
				      return collection
				    }
				    $scope.counts = {
				        total: $scope.data.length 
				    }
				    Object.keys( $scope.data[0]).forEach( key => {
				        $scope.counts[key] = _.unique($scope.data, key).length
				    });
				    $scope.res = getCollectionDef("${dp.concept}")
				    $scope.res.count = $scope.counts.total
				    $scope.res.attr = $scope.res.attr.map( a => {
				        a.count = $scope.counts[a.concept.split(".")[1]]
				        return a
				    })
				?>
				return ("res")
        `
        }).then(res => {

          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })

    },

    dpsLoadDatapoints(metadata) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
				dml.select(from:"${metadata.collections}", where:<? d => d.value.type == "datapoint" ?>, return:"value")
        `
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })
      })
    },

    dpsLoadEntities(metadata) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
				dml.select(
				    from:"${metadata.collections}", 
				    where: <? d => d.value.type == "entity" ?>, 
				    return: "value"
				)

        `
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })

      })
    },

    dpsLoadSample(metadata, dp) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
          		dml.select(
				    from:"${metadata.collections}", 
				    where:<? d => d.value.concept.startsWith("${dp.concept}.") && d.value.concept.split(".").length > 1 ?>, 
				    return:<? d => d.value.concept.split(".")[1]?>
				)
				set("header")

          		dml.select(from:"${dp.concept}", return:"value")
				c.limit()
				set("data")
				<?javascript
				    $scope.res = {
				        dataset:{
				            dimensions: $scope.header,
				            source: $scope.data
				        }
				    };
				?>
				return("res")
        `
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })

      })
    },

    dpsLoadEntitySample(metadata, e) {
      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
          	dml.select(
			    from:"${metadata.collections}", 
			    where:<? d => d.value.concept.startsWith("${e.concept}.") && d.value.concept.split(".").length > 1 ?>, 
			    return:<? d => d.value.concept.split(".")[1]?>
			)
			set("header")

			dml.select(from:"${e.concept}", return:"value")
			c.limit()
			set("data")
			<?javascript
			    $scope.res = {
			        dataset:{
			            dimensions: $scope.header,
			            source: $scope.data
			        }
			    };
			?>
			return("res")
          `
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })

      })
    },

    dpsLoadIndicators(metadata, p) {

      return new Promise((resolve, reject) => {
        this.$dps.run({
          script: `
				<?javascript
				    
				    $scope.mapper = d => {
				        let res = {}
				        res.id = d.id
				        res.concept = d.value.concept
				        res.name = d.value.name
				        res.topic = d.value.topic
				        res.definition = d.value.definition
				        res.units = d.value.units
				        res.args = (d.value.args) ? d.value.args.split(",").map(d => d.trim()) : []
				        res.source = d.value.source
				        res.href = d.value.href
				        res.type = d.value.type
				        return res
				    };
				   
				?>  

				dml.select(from:"${metadata.concepts}", where:<? d => d.value.topic == "${p.path}" ?>, map:{{mapper}})
				set("indicators")
				dml.select(from:"${metadata.concepts}", map:{{mapper}})
				set("allIndicators")
				
				dml.select(from:"${metadata.collections}", 
					map:
					<?
						item => {
					        let res = item.value
					        res.id = item.id
					        return res
					    }
					?>
				)
				
				set("cDef")

				<?javascript

				    let getCollectionDef = concept => {
				      let collection = _.find( $scope.cDef, c => c.concept == concept)
				      collection.attr = $scope.cDef
				        .filter( c => c.concept.split(".").length>1 && c.concept.split(".")[0] == concept)
				        .map( a => {
				            if( a.ref ) {
				                let names = a.ref.split(".")
				                a.reference = {}
				                a.reference.attr = names[1]
				                a.reference.collection = { concept:names[0] } //getCollectionDef(names[0])
				            }
				            return a
				        })
				    
				      return collection
				    }


				    $scope.res = $scope.indicators.map( ind => {
				        let res = JSON.parse(JSON.stringify(ind))
				        res.datapoints = $scope.cDef
				            .filter( c => c.def && c.def.split(".")[1] == ind.concept )
				            .map( c => getCollectionDef(c.concept.split(".")[0]))
				        let args = res.args || []
				        args = args.map( c => {
				           let f = _.find($scope.allIndicators, d => d.concept == c)
				           if(f) return {
				                name: f.name,
				                concept: f.concept,
				                topic: f.topic
				            }
				            return null
				       })    
				        
				        res.args = args.filter(d => d)
				            
				        return res    
				    })
				?>

				return("res")
			`
        }).then(res => {
          if (res.type == "error") {
            reject(res.data)
          } else {
            resolve(res.data)
          }
        })

      })
    }

  }
}
