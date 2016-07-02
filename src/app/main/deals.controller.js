export class DealsController {
  constructor ($log, $http, xConfig, xSites, xCurrency, xGetDeals) {
    'ngInject';
    
    this.log = $log ;
    this.http = $http ;
    this.xSites = xSites.filter(x=>x.deals) ;
    this.xCurrency = xCurrency ;
    this.xGetDeals = xGetDeals ;
    this.prds = [] ; // products
    this.prdsCount = {} ;
    this.bgColor = {};
/*    this.slider = {
      min: null,
      max: null,
      options: {
        floor: 0,
        ceil: null,
        translate: v => xCurrency + v,        
        onChange: (sliderId, modelValue, highValue) => {
          this.prds.map( c => {
            
            if(c.price < modelValue || c.price > highValue)
              c.show = false ;
            else
              c.show = true ;
          });
        }
      }
    };*/

    this.xSites.forEach(x=>{
      this.bgColor[x.site] = x.color ;
    });
    
    this.doSearch();

  }

  doSearch() {

    let {prds,prdsCount,xSites,slider,isNumeric,http,log,xCurrency,xGetDeals} = this ;

    //log.debug(xGetDeals) ;

    xSites.forEach(s=>{

      xGetDeals[s.site](http,prds) ;

      //log.debug(prds);
    	
    }) ; 

  }

  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  chkShow (s, e){
    if(e.target.checked){
      this.prds.forEach( c => {
        if (c.site == s && c.show === false)
          c.show = true ;
      });
    } else {
      this.prds.forEach( c => {
        if (c.site == s && c.show === true)
          c.show = false ;
      });
    }

  }  


  
}
