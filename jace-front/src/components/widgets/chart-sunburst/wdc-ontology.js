
// Economic Dimension index,33.3
// ,Global competitiveness,50
// ,,Stimulants efficiency,50 
// ,,,Market size,20 
// ,,,,Domestic credit to private sector,30 
// ,,,,Import volume index,30 
// ,,,,Household final consumption expenditure,40 
// ,,,The level of financial market development,20 
// ,,,,External debt stocks,50 
// ,,,,Deposit interest rate,50 
// ,,,Technological readiness,20 
// ,,,,Technical cooperation grants,50 
// ,,,,High-technology exports,50 
// ,,,Labor market efficiency,20 
// ,,,,GDP per person employed,50 
// ,,,,Employment to population ratio,50 
// ,,,Effectiveness of goods and services,20 
// ,,,,Exports of goods and services,40 
// ,,,,Imports of goods and services,40 
// ,,,,Market capitalization of listed companies,20 
// ,,Basic requirements,40 
// ,,,Macroeconomic Environment,50 
// ,,,,Foreign direct investment,20 
// ,,,,Portfolio Investment,40 
// ,,,,Total reserves,40 
// ,,,Infrastructure,50 
// ,,,,Agriculture,20 
// ,,,,Industry,30 
// ,,,,GDP per capita,50 
// ,,,Innovations,10 
// ,,,,Patent apps,30 
// ,,,,Technicians in R&D,40 
// ,,,,Charges for the use of intellectual property payments,30 
// ,Economic freedom,50 
// ,,Rule of Law,25 
// ,,,Property rights,8 
// ,,,Government integrity,8 
// ,,,Judicial effectiveness,8 
// ,,Government Size,25 
// ,,,Government spending,8 
// ,,,Tax burden,8 
// ,,,Fiscal heath,8 
// ,,Regulatory Efficiency,25 
// ,,,Business freedom,8 
// ,,,Labor freedom,8 
// ,,,Monetary freedom,8 
// ,,Open markets,25 
// ,,,Trade freedom,8 
// ,,,Investment freedom,8 
// ,,,Financial freedom,8 

// Social Dimension index,33.3
// ,Health wellness and basics needs,20 
// ,,The number of people per doctor,11.1 
// ,,Hospital beds,11.1 
// ,,The infant mortality rate,11.1 
// ,,Life expectancy,11.1 
// ,,Health expenditure,11.1 
// ,,Prevalence of undernourishment,11.1 
// ,,Depth of the food deficit,11.1 
// ,,Maternal mortality ratio,11.1 
// ,,Mortality rate,11.1 
// ,Education,20 
// ,,Literacy rate,20 
// ,,School enrollment,20 
// ,,School enrollment secondary,20 
// ,,School enrollment tertiary,20 
// ,,Public spending on education,20
// ,Personal rights and freedom,15  
// ,,Freedom of speech,100
// ,Personal safety,15 
// ,,Intentional homicides,50 
// ,,Political terror,50 ,
// ,Corruption perception,20 
// ,Social Infrastructure,10 
// ,,Mobile cellular subscriptions,12.5 
// ,,Internet users,12.5 
// ,,Telephones,12.5 
// ,,Vehicles,12.5 
// ,,Number of airports,12.5 
// ,,Navigable waterways,12.5 
// ,,Paved highways,12.5 
// ,,Rail lines,12.5 

// Ecological Dimension Index,33.3
// ,Environmental Heath,50 
// ,,Health Impacts,33  
// ,,,Environmental risk exposure Air Quality,33  
// ,,Air Quality,33
// ,,,Household air quality,30 
// ,,,Air pollution,70 
// ,,Water & Sanitation,33  
// ,,,Unsafe drinking water,50 
// ,,,Unsafe sanitation,50 
// ,Ecosystem Vitality,50 
// ,,Climate & Energy,25  
// ,,,Trend in carbon intensity,100
// ,,Biodiversity & Habitat,25 
// ,,,Species protection,40 
// ,,,Terrestrial biome protection,40 
// ,,,Marine protected areas,20 
// ,,Fisheries,5  
// ,,,Fish stocks,100
// ,,Forests,10  
// ,,,Tree cover loss,100
// ,,Agriculture,10 
// ,,,Nitrogen balance,50 
// ,,,Nitrogen use efficiency,50 
// ,,Water resources,25  
// ,,,Water threatment,100


let tree = [ 
	{
		name: "Economic Dimension index",
		value:	1,
		children:[				
			{
				name: "Global competitiveness",
				value:	1,
				children: [
					{
						name: "Stimulants efficiency",
						value:	5,
						children:[		
							{
								name: "Market size",
								value:	1,
								children: [	
									{
										name: "Domestic credit to private sector",
										value:	3
									},
									{	
										name:"Import volume index",
										value:	3
									},
									{
										name:"Household final consumption expenditure",
										value:	4
									}	
								]
							},
							{		
								name: "The level of financial market development",
								value:	1,
								children: [	
									{
										name: "External debt stocks",
										value:	1
									},	
									{
										name: "Deposit interest rate",
										value:	1
									}	
								]		
							},
							{		
								name: "Technological readiness",
								value:	1,
								children: [	
									{
										name: "Technical cooperation grants",
										value:	1
									},
									{	
										name: "High-technology exports",
										value:	1
									}	
								]	
							},
							{		
								name: "Labor market efficiency",
								value:	1,
								children: [	
									{
										name: "GDP per person employed",
										value:	1
									},	
									{
										name: "Employment to population ratio",
										value:	1
									}	
								]	
							},
							{		
								name: "Effectiveness of goods and services",
								value:	1,
								children: [	
									{
										name: "Exports of goods and services",
										value:	4
									},	
									{
										name: "Imports of goods and services",
										value:	4
									},
									{		
										name: "Market capitalization of listed companies",
										value:	2
									}		
								]	
							},
						]
					},			
					{
						name: "Basic requirements",
						value:	4,
						children:[		
							{
								name: "Macroeconomic Environment",
								value:	1,
								children: [	
									{
										name: "Foreign direct investment",
										value:	2
									},	
									{
										name: "Portfolio Investment",
										value:	4
									},	
									{
										name: "Total reserves",
										value:	4
									}	
								]
							},
							{		
								name: "Infrastructure",
								value:	1,
								children: [		
									{
										name: "Agriculture",
										value:	2
									},	
									{
										name: "Industry",
										value:	3
									},	
									{
										name: "GDP per capita",
										value:	5
									}	
								]
							}	
						]
					},
					{			
						name: "Innovations",
						value:	1,
						children:[		
							{		
								name: "Patent apps",
								value:	3
							},		
							{		
								name: "Technicians in R&D",
								value:	4,
							},		
							{		
								name: "Charges for the use of intellectual property payments",
								value:	3
							}	
						]
					}		
				]
			},
			{				
				name: "Economic freedom",
				value:	1,
				children:[
					{			
						name: "Rule of Law",
						value:	1,		
						children:[
							{			
								name: "Property rights",
								value:	1
							},		
							{			
								name: "Government integrity",
								value:	1
							},		
							{			
								name: "Judicial effectiveness",
								value:	1
							}	
						]
					},			
					{			
						name: "Government Size",
						value:	1,		
						children:[
							{			
								name: "Government spending",
								value:	1
							},		
							{			
								name: "Tax burden",
								value:	1
							},		
							{			
								name: "Fiscal heath",
								value:	1
							}	
						]
					},			
					{			
						name: "Regulatory Efficiency",
						value:	1,		
						children:[
							{			
								name: "Business freedom",
								value:	1
							},		
							{			
								name: "Labor freedom",
								value:	1
							},		
							{			
								name: "Monetary freedom",
								value:	1
							}	
						]
					},			
					{			
						name: "Open markets",
						value:	1,		
						children:[
							{			
								name: "Trade freedom",
								value:	1
							},		
							{			
								name: "Investment freedom",
								value:	1
							},		
							{			
								name: "Financial freedom",
								value:	1
							}	
						]
					}		
				]
			}				
		]
	},
	{
		name: "Social Dimension index",
		value:	1,
		children:[				
			{
				name:"Health wellness and basics needs",
				value:	20,
				children:[			
					{
						name: "The number of people per doctor",
						value:	1
					},			
					{
						name: "Hospital beds",
						value:	1
					},					
					{
						name: "The infant mortality rate",
						value:	1
					},					
					{
						name: "Life expectancy",
						value:	1
					},					
					{
						name: "Health expenditure",
						value:	1
					},					
					{
						name: "Prevalence of undernourishment",
						value:	1
					},					
					{
						name: "Depth of the food deficit",
						value:	1
					},					
					{
						name: "Maternal mortality ratio",
						value:	1
					},					
					{
						name: "Mortality rate",
						value:	1
					}			
				]
			},				
			{
				name:"Education",
				value:	20,
				children:[						
					{
						name: "Literacy rate",
						value:	1
					},					
					{
						name: "School enrollment",
						value:	1
					},					
					{
						name: "School enrollment secondary",
						value:	1
					},					
					{
						name: "School enrollment tertiary",
						value:	1
					},					
					{
						name: "Public spending on education",
						value:	1
					}
				]
			},				
			{
				name:"Personal rights and freedom",
				value:	15,
				children:[						
					{
						name: "Freedom of speech",
						value:	1
					}			
				]
			},				
			{
				name:"Personal safety",
				value:	15,
				children:[						
					{
						name: "Intentional homicides",
						value:	1
					},					
					{
						name: "Political terror",
						value:	1
					}			
				]
			},				
			{
				name:"Corruption perception",
				value:	20
			},				
			{
				name:"Social Infrastructure",
				value:	10,
				children:[						
					{
						name: "Mobile cellular subscriptions",
						value:	1
					},					
					{
						name: "Internet users",
						value:	1
					},					
					{
						name: "Telephones",
						value:	1
					},					
					{
						name: "Vehicles",
						value:	1
					},					
					{
						name: "Number of airports",
						value:	1
					},					
					{
						name: "Navigable waterways",
						value:	1
					},					
					{
						name: "Paved highways",
						value:	1
					},					
					{
						name: "Rail lines",
						value:	1
					}			
				]
			}					
		]
	},
	{				
		name: "Ecological Dimension Index",
		value:	1,
		children: [				
			{
				name: "Environmental Heath",
				value:	1,
				children: [
					{			
						name: "Health Impacts",
						value:	1,		
						children:[
							{
								name: "Environmental risk exposure Air Quality",
								value:	1
							}	
						]
					},				
					{			
						name: "Air Quality",
						value:	1,		
						children:[
							{
								name: "Household air quality",
								value:	3
							},
							{
								name: "Air pollution",
								value:	7
							}	
						]
					},			
					{			
						name: "Water & Sanitation",
						value:	1,		
						children:[
							{
								name: "Unsafe drinking water",
								value:	1	
							},
							{
								name: "Unsafe sanitation",
								value:	1
							}	
						]
					},		
				]
			},			
			{
				name: "Ecosystem Vitality",
				value:	1,
				children: [					
					{
						name: "Climate & Energy",
						value:	25,
						children: [		
							{
								name: "Trend in carbon intensity",
								value:	1
							}	
						]
					},			
					{
						name: "Biodiversity & Habitat",
						value:	25,
						children: [				
							{
								name: "Species protection",
								value:	4
							},		
							{
								name: "Terrestrial biome protection",
								value:	4
							},		
							{
								name: "Marine protected areas",
								value:	2
							}	
						]
					},			
					{
						name: "Fisheries",
						value:	5,
						children: [				
							{
								name: "Fish stocks",
								value:	1
							}	
						]
					},			
					{
						name: "Forests",
						value:	10,
						children: [				
							{
								name: "Tree cover loss",
								value:	1
							}	
						]
					},			
					{
						name: "Agriculture",
						value:	10,
						children: [				
							{
								name: "Nitrogen balance",
								value:	1
							},		
							{
								name: "Nitrogen use efficiency",
								value:	1
							}	
						]
					},			
					{
						name: "Water resources",
						value:	25,
						children: [				
							{
								name: "Water threatment",
								value:	1
							}	
						]
					}		
				]
			}					
		]		
	}				
]

let _ = require("lodash-node")
let setGlobWeight = (node) => {
	if(node.children && node.children.length>0){
		let sum = _.sum(node.children.map(d => d.value))
		node.children.forEach( c => {
			c.weight = Math.round(100 * c.value/sum)+"%"
			c.value = node.value * c.value/sum
			setGlobWeight(c)
		})

	}
}

tree.forEach( n => {
	setGlobWeight(n)
})

console.log(JSON.stringify(tree, null, "\t"))