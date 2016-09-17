export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
/*    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })*/
    .when('/', {
      templateUrl: 'app/main/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })     
    .when('/deals', {
      templateUrl: 'app/main/deals.html',
      controller: 'DealsController',
      controllerAs: 'search'
    })    
    .when('/search/:q', {
      templateUrl: 'app/main/search.html',
      controller: 'SearchController',
      controllerAs: 'search'
    })
    .otherwise({
      redirectTo: '/'
    });
}
