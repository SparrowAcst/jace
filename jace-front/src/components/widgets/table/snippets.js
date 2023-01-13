export default {
    "Data Table":{
      
        type:"data-table-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-grid",
        options: { 
          
          widget:{
            visible: true
          }

  

        },


        data:{
          source:"embedded",
          embedded:{

                    // dataset: {
                    //     // Here the declared `dimensions` is mainly for providing the order of
                    //     // the dimensions, which enables ECharts to apply the default mapping
                    //     // from dimensions to axes.
                    //     // Alternatively, we can declare `series.encode` to specify the mapping,
                    //     // which will be introduced later.
                    //     dimensions: ['product', '2015', '2016', '2017'],
                    //     source: [
                    //         {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                    //         {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                    //         {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                    //         {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                    //     ]
                    // }
                    "dataset": {
                        "dimensions": [
                            "source",
                            "cpi",
                            "gini",
                            "cpi_norm",
                            "cpi_log",
                            "cpi_std"
                        ],
                        "source": [
                            {
                                "source": "cpi",
                                "cpi": 1,
                                "gini": -0.3435071321658265,
                                "cpi_norm": 1.0000000000000007,
                                "cpi_log": 0.9949197677212461,
                                "cpi_std": 1
                            },
                            {
                                "source": "gini",
                                "cpi": -0.3435071321658265,
                                "gini": 1,
                                "cpi_norm": -0.34350713216582623,
                                "cpi_log": -0.3298921861024606,
                                "cpi_std": -0.3435071321658264
                            },
                            {
                                "source": "cpi_norm",
                                "cpi": 1.0000000000000007,
                                "gini": -0.34350713216582623,
                                "cpi_norm": 1,
                                "cpi_log": 0.994919767721246,
                                "cpi_std": 1
                            },
                            {
                                "source": "cpi_log",
                                "cpi": 0.9949197677212461,
                                "gini": -0.3298921861024606,
                                "cpi_norm": 0.994919767721246,
                                "cpi_log": 1,
                                "cpi_std": 0.9949197677212455
                            },
                            {
                                "source": "cpi_std",
                                "cpi": 1,
                                "gini": -0.3435071321658264,
                                "cpi_norm": 1,
                                "cpi_log": 0.9949197677212455,
                                "cpi_std": 1
                            }
                        ]
                    }

          }
          // embedded:{
          //   headers: [
          //     {
          //       text: 'Dessert (100g serving)',
          //       align: 'center',
          //       class:"tableHeader",
          //       sortable: false,
          //       value: 'name'
          //     },
          //     { text: 'Calories', value: 'calories' },
          //     { text: 'Fat (g)', value: 'fat' },
          //     { text: 'Carbs (g)', value: 'carbs' },
          //     { text: 'Protein (g)', value: 'protein' },
          //     { text: 'Iron (%)', value: 'iron' }
          //   ],
          //   desserts: [
          //     {
          //       value: false,
          //       name: 'Frozen Yogurt',
          //       calories: 159,
          //       fat: 6.0,
          //       carbs: 24,
          //       protein: 4.0,
          //       iron: '1%'
          //     },
          //     {
          //       value: false,
          //       name: 'Ice cream sandwich',
          //       calories: 237,
          //       fat: 9.0,
          //       carbs: 37,
          //       protein: 4.3,
          //       iron: '1%'
          //     },
          //     {
          //       value: false,
          //       name: 'Eclair',
          //       calories: 262,
          //       fat: 16.0,
          //       carbs: 23,
          //       protein: 6.0,
          //       iron: '7%'
          //     },
          //     {
          //       value: false,
          //       name: 'Cupcake',
          //       calories: 305,
          //       fat: 3.7,
          //       carbs: 67,
          //       protein: 4.3,
          //       iron: '8%'
          //     },
          //     {
          //       value: false,
          //       name: 'Gingerbread',
          //       calories: 356,
          //       fat: 16.0,
          //       carbs: 49,
          //       protein: 3.9,
          //       iron: '16%'
          //     },
          //     {
          //       value: false,
          //       name: 'Jelly bean',
          //       calories: 375,
          //       fat: 0.0,
          //       carbs: 94,
          //       protein: 0.0,
          //       iron: '0%'
          //     },
          //     {
          //       value: false,
          //       name: 'Lollipop',
          //       calories: 392,
          //       fat: 0.2,
          //       carbs: 98,
          //       protein: 0,
          //       iron: '2%'
          //     },
          //     {
          //       value: false,
          //       name: 'Honeycomb',
          //       calories: 408,
          //       fat: 3.2,
          //       carbs: 87,
          //       protein: 6.5,
          //       iron: '45%'
          //     },
          //     {
          //       value: false,
          //       name: 'Donut',
          //       calories: 452,
          //       fat: 25.0,
          //       carbs: 51,
          //       protein: 4.9,
          //       iron: '22%'
          //     },
          //     {
          //       value: false,
          //       name: 'KitKat',
          //       calories: 518,
          //       fat: 26.0,
          //       carbs: 65,
          //       protein: 7,
          //       iron: '6%'
          //     }
          //   ]
          // }
        }
       
    }
    
}    
    