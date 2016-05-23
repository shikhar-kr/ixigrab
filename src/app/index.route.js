export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .when('/deals', {
      templateUrl: 'app/main/deals.html',
      controller: 'DealsController',
      controllerAs: 'search'
    })
    .otherwise({
      redirectTo: '/'
    });
}
