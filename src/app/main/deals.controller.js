export class DealsController {
  constructor ($log, $http, xConfig, xSites, xCurrency, xGetDeals) {
    'ngInject';
    
    this.log = $log ;
    this.http = $http ;
    this.xSites = xSites.filter(x=>x.deals) ;
    this.XCurrency = xCurrency ;
    this.xGetDeals = xGetDeals ;
    this.deals = {

      xcite:function(){ console.log('in xxcite');}

    } ;
    this.prds = [] ; // products
    this.prdsCount = {} ;
    this.slider = {
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
    };

    this.doSearch();

  }

  doSearch() {

    let {prds,prdsCount,xSites,slider,isNumeric,http,log,xCurrency,xGetDeals} = this ;

    log.debug(xGetDeals) ;

    xSites.forEach(s=>{

      xGetDeals[s.site](http,prds) ;

      log.debug(prds);
    	
    }) ; 

  }

  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  
}
