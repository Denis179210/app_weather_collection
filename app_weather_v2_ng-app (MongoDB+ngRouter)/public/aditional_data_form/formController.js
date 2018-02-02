var app = angular.module('weatherApp');

app.controller('formController', function($scope, $http, $location) {

    $scope.requestBody = [];
    $scope.place = {};

    $scope.addPlace = function(city, countryCode) {
        $scope.requestBody.push({
            city: angular.copy(city),
            countryCode: angular.copy(countryCode)
        });
        console.log($scope.requestBody);
    };

    $scope.fetchCityDataList = function() {

        $scope.$location = $location;
        
        $http.post('/api/weather', { places: $scope.requestBody })

            .then(function(response){
                console.log("response", response);
                if(!localStorage.weatherCollection) {

                    localStorage.weatherCollection = JSON.stringify(response.data.weatherAt);
                    console.log(localStorage.weatherCollection);
                } else {

                    var existingData = JSON.parse(localStorage.weatherCollection);
                    var newData = response.data.weatherAt;
                    localStorage.weatherCollection = JSON.stringify(existingData.concat(newData));

                }

                console.log($scope.weatherCollection)

                $scope.$location.path('/');
            })
            .catch(function(e) {
                console.error(e)
            })
    };
});