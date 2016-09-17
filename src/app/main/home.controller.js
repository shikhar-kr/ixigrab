export class HomeController {
  constructor ($http) {
    'ngInject';

    this.http = $http ;
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

  }


}
