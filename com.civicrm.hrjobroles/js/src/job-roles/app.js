define([
    'job-roles/vendor/angular-editable',
    'job-roles/vendor/angular-filter',
    'job-roles/controllers/controllers',
    'job-roles/directives/directives',
    'job-roles/filters/filters',
    'job-roles/services/services',
    'job-roles/controllers/hr-job-roles-controller',
    'job-roles/services/hr-job-roles-service',
    'job-roles/directives/example'
], function () {
    'use strict';

    angular.module('hrjobroles', [
        'ngAnimate',
        'angular-date',
        'ngRoute',
        'xeditable',
        'angular.filter',
        'ngResource',
        'ui.bootstrap',
        'hrjobroles.controllers',
        'hrjobroles.directives',
        'hrjobroles.filters',
        'hrjobroles.services'
    ])
    .constant('settings', {
        classNamePrefix: 'hrjobroles-',
        contactId: decodeURIComponent((new RegExp('[?|&]cid=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null,
        debug: true,
        pathApp: '',
        pathRest: CRM.url('civicrm/ajax/rest'),
        pathBaseUrl: CRM.vars.hrjobroles.baseURL + '/',
        pathTpl: 'views/',
        pathIncludeTpl: 'views/include/'
    })
    .config(['settings','$routeProvider','$resourceProvider','$httpProvider','$logProvider',
        function(settings, $routeProvider, $resourceProvider, $httpProvider, $logProvider){
            $logProvider.debugEnabled(settings.debug);

            $routeProvider.
                when('/', {
                    templateUrl: settings.pathBaseUrl + settings.pathTpl + 'mainTemplate.html?v=1',
                    resolve: {}
                }).
                otherwise({redirectTo:'/'});

            $resourceProvider.defaults.stripTrailingSlashes = false;

            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        }
    ])
    .run(['settings','$rootScope','$q', '$log', 'editableOptions',
        function(settings, $rootScope, $q, $log, editableOptions){
            $log.debug('app.run');

            // Set bootstrap 3 as default theme
            editableOptions.theme = 'bs3';

            // Pass the values from our settings
            $rootScope.contactId = settings.contactId;
            $rootScope.pathBaseUrl = settings.pathBaseUrl;
            $rootScope.pathTpl = settings.pathTpl;
            $rootScope.pathIncludeTpl = settings.pathIncludeTpl;
            $rootScope.prefix = settings.classNamePrefix;

        }
    ]);
});