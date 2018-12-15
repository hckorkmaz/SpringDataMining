'use strict';

app.controller('sidebarCtrl', function (httpService, $http, $location, $rootScope, $scope) {
    $scope.sessionUser = $rootScope.sessionUser;
});