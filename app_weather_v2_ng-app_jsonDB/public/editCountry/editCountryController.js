var app = angular.module('weatherApp');

app.controller('editCountryController', function($scope, $http, $location) {
    console.dir($location);

    $scope.currentLocation = $location.path().split('/');
    $scope.id = $scope.currentLocation[$scope.currentLocation.length - 1];
    console.log($scope.id);
    $scope.fetchCountry = function(){
        // $scope.cityId = $location.city;
        $http.get(`/api/country/${$scope.id}`)
            .then((res) => {
                console.log(res);
                $scope.editCountry = JSON.parse(res.data);
                console.log($scope.editCountry)
            });
    }
    $scope.fetchCountry();

    $scope.changeData = function() {
        $http.put(`/api/country/${$scope.id}`, $scope.editCountry)
            .then(function(res) {
                console.log(res);
            })
    }
})