export class DealsController {
  constructor ($log, $http, xConfig, xSites, xCurrency) {
    'ngInject';
    
    this.log = $log ;
    this.http = $http ;
    this.xSites = xSites.filter(x=>x.deals) ;
    this.XCurrency = xCurrency ;
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

    let {prds,prdsCount,xSites,slider,isNumeric,http,log,xCurrency} = this ;

    log.debug(xSites) ;

    xSites.forEach(s=>{
		log.debug(s) ;    	
    }) ; 

  }

  chkShow (s, e){
    //console.log(s);
    //console.log(e.target.checked) ;
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

  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  
}
