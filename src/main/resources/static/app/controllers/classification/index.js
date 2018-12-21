'use strict';
app.controller('indexClassificationCtrl', function (httpService, $scope, $rootScope, toaster, config) {

    $scope.isWaiting = false;
    $scope.buttonClass = 'fa fa-cubes';

    $scope.classifiers = [
        {code: 'J48', name: 'Decision Tree'},
        {code: 'RF', name: 'Random Forest'},
        {code: 'NB', name: 'Naive Bayes'},
        {code: 'KNN', name: 'K-Nearest Neighbour'}
    ];

    $scope.testMethods = [
        {code: 'PERCENT_SPLIT', name: 'Percentage Split'},
        {code: 'CROSS_VALIDATION', name: 'Cross Validation'}
    ];

    $scope.classificationParameters = {
        classifier: $scope.classifiers[0],
        testMethod: $scope.testMethods[0],
        percentSplit: 66,
        folds: 10
    };

    $scope.onSelectClassifier = function (item) {
        if (item !== undefined) {
            $scope.classificationParameters.classifier = item;
        } else {
            delete $scope.classificationParameters.classifier;
        }
    };

    $scope.onRemoveClassifier = function () {
        delete $scope.classificationParameters.classifier;
    };

    $scope.classify = function () {
        $scope.isWaiting = true;
        httpService.postRequest(
            config.classificationClassify,
            $scope.classificationParameters,
            function (response) {
                if (response.data.statusCode === 40) {
                    $scope.classificationResult = response.data.data.classificationResult;
                    toaster.pop('success', 'Success', response.data.message);
                } else if (response.data.statusCode === 60) {
                    toaster.pop('error', 'Error', response.data.message);
                } else if (response.data.statusCode === 100) {
                    var validationList = response.data.errorMessages;
                    for (var i = 0; i < validationList.length; i++) {
                        toaster.pop('error', 'Error', validationList[i].field + ' ' + validationList[i].defaultMessage);
                    }
                }

                $scope.isWaiting = false;
            }
        )
    };

    $scope.clearResult = function (){
        $scope.classificationResult = null;
    };

    $scope.$watch('isWaiting', function (newValue, oldValue) {
        if (newValue === true) {
            $scope.buttonClass = 'fa fa-spinner fa-spin';
        } else {
            $scope.buttonClass = 'fa fa-cubes';
        }
    });

});