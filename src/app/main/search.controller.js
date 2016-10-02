export class SearchController {
  constructor ($log, $http, xConfig, xSites, xCurrency, xDecimals, xSearch, $location, $routeParams) {
    'ngInject';
    
    this.log = $log ;
    this.http = $http ;
    this.xSites = xSites.filter(x=>x.search) ;
    this.xCurrency = xCurrency ;
    this.xSearch = xSearch ;
    this.location = $location ;
    this.routeParams = $routeParams ;
    this.q = $routeParams.q;
    //this.sq = null ;
    this.cors = null ;
    
    $http.get( 'http://example.com/').
    then( r => {
      console.log(r.status);
      if(r.status == 200){
        this.cors = true ;
      } else {
        this.cors = false ;
      }
  
    }); 
    
    this.prds = [] ; // products
    this.bgColor = {};
/*    this.slider = {
      min: null,
      max: null,
      options: {
        floor: null,
        ceil: null ,
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

    let {prds,prdsCount,xSites,slider,http,log,xCurrency,xSearch,q,location,routeParams} = this ;
        
    prds.splice(0) ; // reset
    this.sq = '' ;
    xSites.forEach(s=>{
      //log.debug(s.site);
      xSearch[s.site](http,prds,slider,q) ;
    	
    }) ; 

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

  getCount(s){
    return this.prds.filter(x=>x.site==s).length ;
  }  
  getMax(){
    return this.prds.reduce((p,c)=>(p.price>=c.price?p.price:c.price)) ;
  }  
  getMin(){    
    return this.prds.reduce((p,c)=>(p.price<=c.price?p.price:c.price)) ;
  }  

/*  match(q){
    return function( item ) {
      console.log(item);
      return (String(item).indexOf(q) > -1);
    };
  }*/



  
}
