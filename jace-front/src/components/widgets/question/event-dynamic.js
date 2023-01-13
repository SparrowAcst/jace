import moment from "moment"

 let round = ( date, start, level, value) => {
      let defFormat = "YYYY-MM-DD HH:mm";
    
      let lo = moment(start).startOf(level).format(defFormat)
      let hi = moment(lo).add(value,level).format(defFormat)
      while(!(moment(date).isSameOrAfter(lo) && moment(date).isSameOrBefore(hi))){
        lo = hi;
        hi = moment(lo).add(value,level).format(defFormat);
      }

      let dLo = moment(date).diff(lo)
      let dHi = -moment(date).diff(hi)
      return (dLo < dHi) ? lo: hi
  }

  

export default (timeline) => {

    let defFormat = "YYYY-MM-DD HH:mm";
    

    let RStat = timeline
        .map(item => moment(new Date(item)))
        .sort((a,b) => a.diff(b))
        .map(item => item.format(defFormat))

    
    let p = [
      ['m',1],
      ['m',5],
      ['m',10],
      ['m',15],
      ['m',20],
      ['m',30],
      ['h',1],
      ['h',2],
      ['h',4],
      ['h',12],
      ['d',1],
      ['d',3],
      ['d',7],
      ['M',1],
      ['M',3],
      ['M',6],
      ['y',1],
      ['y',2],
      ['y',5],
      ['y',10]
    ]
    
    
    let getPoints = (start, stop, level, value) => {
      let res =[];
      start = moment(start).add(-value,level).format(defFormat)
      stop =  moment(stop).add(value,level).format(defFormat)
      
      let lo = moment(start).startOf(level).format(defFormat)
      let hi = moment(lo).add(value,level).format(defFormat)
      
      res.push(lo)
      while(!(moment(stop).isSameOrAfter(lo) && moment(stop).isSameOrBefore(hi))){
        lo = hi;
        hi = moment(lo).add(value,level).format(defFormat);
        res.push(lo)
      }
      res.push(hi)
      return res;      
    }

    

    let titleFormat = {
      'm' :['HH:mm',''],
      'h' :['DD.MM HH:','00'],
      'd' :['DD.MM.YY',''],
      'M' :['MM.YYYY',''],
      'y' :['YYYY','']
    } 
    
    let u;
    
    for(u of p){
      if( (moment(RStat[RStat.length-1]).diff(RStat[0],u[0]) / u[1]) <= 24) break;
    }
    
    
    if(moment(RStat[RStat.length-1]).diff(RStat[0],u[0])<1) return;

    RStat = RStat.map(
      item => round(item,RStat[0],u[0],u[1])
    );


    let points = getPoints(RStat[0], RStat[RStat.length-1], u[0], u[1]);

    let stats = points.map(item => RStat.filter(t => moment(t).isSame(item,u[0])).length)
    
    // let sum = stats.reduce((item,sum) => {return sum+item})
    
    
    // if(sum==0){
    //       stats = stats.map(item => 0)
    //     }else{
    //       stats = stats.map(item => item/sum )
    //     }
    
    // let max = stats.reduce((item,max) => {return (max>item) ? max : item})
        
    RStat = points.map((item,index) => {
      return {
        title: moment(item).format(titleFormat[u[0]][0])+titleFormat[u[0]][1],
        value: stats[index],
      }
    })

    return RStat;
  }

