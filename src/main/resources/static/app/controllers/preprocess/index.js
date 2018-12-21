'use strict';
app.controller('indexPreProcessCtrl', function (httpService, $scope, $rootScope, $cookies, $timeout, toaster, config) {

    $scope.data = [];
    $scope.gridOptions = {
        enableGridMenu: false,
        data: 'data',
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        importerDataAddCallback: function (grid, newObjects) {
            $scope.data = $scope.data.concat(newObjects);
        },
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.fileName = null;
    $scope.dropzoneConfig = {
        'options': {
            'url': config.dataUpload,
            maxFiles: 1,
            paramName: "file",
            maxThumbnailFilesize: 1,
            acceptedFiles: '.csv,.arff'
        },
        'eventHandlers': {
            'sending': function (file, xhr, formData) {
            },
            'success': function (file, response) {
                if (response.statusCode === 40) {
                    $scope.fileName = response.data.fileName;
                    $cookies.put('f-name', response.data.fileName);
                    $scope.gridApi.importer.importFile(file);
                    toaster.pop('success', "Success", response.message);
                } else if (response.statusCode === 60) {
                    toaster.pop('error', "Error", response.message);
                }
            }
        }
    };

    $scope.saveData = function(){

    };

    $scope.downloadFile = function (fileName) {
        window.location = '/api/data/download/' + fileName;
    };

});