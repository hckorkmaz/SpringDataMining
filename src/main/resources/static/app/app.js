'use strict';
angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ncy-angular-breadcrumb',
        'ui.bootstrap',
        'ui.utils',
        'oc.lazyLoad',
        'ui.grid',
        'ui.grid.importer',
        'ui.grid.rowEdit',
        'ui.grid.edit'
    ]
).constant('config', {
        dataUpload: "api/data/upload",
        dataDownload: "api/data/download",
        classificationClassify: "api/classification/classify",
    }
).service('httpService', function ($http, $rootScope, $q, $cookies) {

        this.postRequest = function (service, data, callback) {
            $http({
                headers: {
                    'Content-Type': 'application/json',
                    'f-name': $cookies.get('f-name')
                },
                url: service,
                method: "POST",
                data: data
            }).then(function (response) {
                    callback(response);
                },
                function (response) {
                    callback(response);
                }
            );
        };

        this.getRequest = function (service, data, pagination, callback) {
            $http({
                headers: {
                    'f-name': $cookies.get('f-name')
                },
                url: service + "/" + ((data === null) ? "" : data),
                method: "GET",
            }).then(
                function (response) {
                    callback(response);
                },
                function (response) {
                    callback(response);
                }
            );
        };
    }
).service('treeService', function () {

        this.nested = function nested(f) {
            return f.sort((a, b) => a.id.length < b.id.length ? 1 : a.id.length === b.id.length ? a.id < b.id ? -1 : 1 : -1)
                .reduce((p, c, i, a) => {
                    var parent;
                    if (c.parent)
                        parent = !!c.parent.id && a.find(e => e.id === c.parent.id);

                    !!parent ? !!parent.children && parent.children.push(c) || (parent.children = [c]) : p.push(c);
                    return p;
                }, []);
        };

        this.labelGenerator = function labelGenerator(array, fields, seperator) {
            for (var i = 0; i < array.length; i++) {
                var labelValue = "";
                for (var k = 0; k < fields.length; k++) {
                    if (k != 0)
                        labelValue += seperator;

                    var fieldName = fields[k];
                    labelValue += array[i][fieldName]
                }
                array[i].label = labelValue;
            }
            return array;
        }
    }
).run(function ($rootScope, httpService, config, $window, $cookies) {

});