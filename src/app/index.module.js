/* global malarkey:false, moment:false */

import { config } from './index.config';
import { xConfig } from './xconfig.config';  
import { xSites } from './sites.config';  
import { xCurrency } from './sites.config';  
import { xDecimals } from './sites.config';  
import { xGetDeals } from './sites.config';  
import { xSearch } from './sites.config';  
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HomeController } from './main/home.controller';
import { DealsController } from './main/deals.controller';
import { SearchController } from './main/search.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('ixigrab', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ui.bootstrap', 'toastr','rzModule'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('xConfig', xConfig)
  .constant('xSites', xSites)
  .constant('xCurrency', xCurrency)
  .constant('xDecimals', xDecimals)
  .constant('xGetDeals', xGetDeals)
  .constant('xSearch', xSearch)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .controller('HomeController', HomeController)
  .controller('DealsController', DealsController)
  .controller('SearchController', SearchController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
