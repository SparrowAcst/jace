export default {
    "default":
    {
            type:"scatter1d-chart-widget", 
            name:"noname",
            icon:"mdi-chart-timeline",
            
            options: { 

                widget:{
                  visible:true
                },

                tooltip: {
                    position: 'top'
                },

                title:[],
                singleAxis:[],
                series:[]
               
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    symbolSize:4,

                    xAxis:{
                        data: [0,1,2,3,4,5]
                    },

                    series :  [
                        {   
                            "name":"Serie1",
                            "data":[5,3,1,2,4]
                        },
                        {   
                            "name":"Serie2",
                            "data":[1,2,1,4,2]
                        },
                        {   
                            "name":"Serie3",
                            "data":[2,3,2,1,1]
                        },
                        {   
                            "name":"Serie4",
                            "data":[5,3,1,2,4]
                        },
                        {   
                            "name":"Serie5",
                            "data":[1,2,1,4,2]
                        },
                        {   
                            "name":"Serie6",
                            "data":[2,3,2,1,1]
                        }
                    ]    
                }
            }
    }
}    




// let f = (x,y) => Math.sqrt(Math.pow(x,2)+Math.pow(y,2))/Math.sqrt(2) 

// let data = []

// for(let i=0; i<=1; i+=0.1){
//     let row = []
//     for(let j=0; j<=1; j+=0.1){
//         row.push(f(i,j))
//     }
//     data = data.concat(row)    
// }  

// console.log(data)

// let c = d3.contours()
//         .size([11,11])
//         .thresholds([0,0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9])
//         (data)
// console.log(c)

// let series = []

// c.forEach( c => {
//     series.push({
//         symbolSize: 0,
//         data: c.coordinates[0][0],
//         type: 'line',
//         areaStyle:{
            
//         }
//     })
// })

// console.log(series)
// option = {
//     xAxis: {
//         min:0,
//         max:10
//     },
//     yAxis: {
//         min:0,
//         max:10
//     },
//     series: series
// };
//     