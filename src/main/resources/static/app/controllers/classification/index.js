'use strict';
app.controller('indexClassificationCtrl', function (httpService, $scope, $rootScope, toaster, config) {

    $scope.classifiers = [
        {code: "J48", name: "Decision Tree"},
        {code: "RF", name: "Random Forest"},
        {code: "NB", name: "Naive Bayes"},
        {code: "KNN", name: "K-Nearest Neighbour"}
    ];

    $scope.classificationParameters = {
        classifier: $scope.classifiers[0],
        percentSplit: 66
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
        httpService.postRequest(
            config.classificationClassify,
            {
                classifier: $scope.classificationParameters.classifier.code,
                percentSplit: $scope.classificationParameters.percentSplit
            },
            function (response) {
                if (response.data.statusCode === 40) {
                    debugger;
                    $scope.classificationResult = response.data.data.classificationResult;
                    toaster.pop('success', "Success", response.data.message);
                } else if (response.data.statusCode === 60) {
                    toaster.pop('error', "Error", response.data.message);
                } else if (response.data.statusCode === 100) {
                    var validationList = response.data.errorMessages;
                    for (var i = 0; i < validationList.length; i++) {
                        toaster.pop('error', "Error", validationList[i].field + " " + validationList[i].defaultMessage);
                    }
                }
            }
        )
    };

});