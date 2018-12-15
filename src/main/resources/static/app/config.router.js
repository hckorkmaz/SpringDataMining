'use strict';
angular.module('app')
    .run(
        [
            '$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        [
            '$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {
                $urlRouterProvider.otherwise('/app/');


                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'views/login.html',
                        ncyBreadcrumb: {
                            label: 'Login'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                serie: true,
                                                files: [
                                                    'app/controllers/toaster.js',
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('dashboard', {
                        url: '/',
                        templateUrl: 'views/dashboard.html',
                        ncyBreadcrumb: {
                            label: 'Dashboard',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select', 'toaster', 'angularBootstrapNavTree']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                serie: true,
                                                files: [
                                                    'lib/jquery/charts/sparkline/jquery.sparkline.js',
                                                    'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
                                                    'lib/jquery/charts/flot/jquery.flot.js',
                                                    'lib/jquery/charts/flot/jquery.flot.resize.js',
                                                    'lib/jquery/charts/flot/jquery.flot.pie.js',
                                                    'lib/jquery/charts/flot/jquery.flot.tooltip.js',
                                                    'lib/jquery/charts/flot/jquery.flot.orderBars.js',
                                                    'lib/jquery/fuelux/wizard/wizard-custom.js',
                                                    'app/controllers/dashboard.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.dashboard', {
                        url: '/',
                        ncyBreadcrumb: {
                            label: 'Dashboard',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select', 'toaster', 'angularBootstrapNavTree']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                serie: true,
                                                files: [
                                                    'lib/jquery/charts/sparkline/jquery.sparkline.js',
                                                    'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
                                                    'lib/jquery/charts/flot/jquery.flot.js',
                                                    'lib/jquery/charts/flot/jquery.flot.resize.js',
                                                    'lib/jquery/charts/flot/jquery.flot.pie.js',
                                                    'lib/jquery/charts/flot/jquery.flot.tooltip.js',
                                                    'lib/jquery/charts/flot/jquery.flot.orderBars.js',
                                                    'lib/jquery/fuelux/wizard/wizard-custom.js',
                                                    'app/controllers/navbar.js',
                                                    'app/controllers/sidebar.js',
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('tabs', {
                        abstract: true,
                        url: '/tabs',
                        templateUrl: 'views/layout-iframe.html'
                    })
                    .state('tabs.preprocess', {
                        url: '/preprocess',
                        templateUrl: 'views/preprocess/index.html',
                        ncyBreadcrumb: {
                            label: 'Import Data',
                            description: ''
                        },
                        resolve: {
                            $uibModalInstance: function () {
                                return null;
                            },
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select', 'toaster', 'angularBootstrapNavTree', 'dropzone']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                serie: true,
                                                files: [
                                                    'lib/jquery/fuelux/wizard/wizard-custom.js',
                                                    'app/controllers/toaster.js',
                                                    'app/controllers/preprocess/index.js',
                                                    'app/controllers/dashboard.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('tabs.classification', {
                        url: '/classification',
                        templateUrl: 'views/classification/index.html',
                        ncyBreadcrumb: {
                            label: 'Classification',
                            description: ''
                        },
                        resolve: {
                            $uibModalInstance: function () {
                                return null;
                            },
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select', 'toaster', 'angularBootstrapNavTree', 'dropzone']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                serie: true,
                                                files: [
                                                    'lib/jquery/fuelux/wizard/wizard-custom.js',
                                                    'app/controllers/toaster.js',
                                                    'app/controllers/classification/index.js',
                                                    'app/controllers/dashboard.js'
                                                ]
                                            });
                                        }
                                    );
                                }
                            ]
                        }
                    })
            }
        ]
    );