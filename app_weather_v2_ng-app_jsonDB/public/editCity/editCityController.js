var app = angular.module('weatherApp');

app.controller('editCityController', function($scope, $http, $location) {
    console.dir($location);
    $scope.currentLocation = $location.path().split('/');
    $scope.id = $scope.currentLocation[$scope.currentLocation.length - 1];
    console.log($scope.id);
    $scope.fetchCity = function(){
        $http.get(`/api/city/${$scope.id}`)
            .then((res) => {
                console.log(res);
                $scope.editCity = JSON.parse(res.data);
                console.log($scope.editCity)
            });
         $http.get('/api/country')
        .then((res) => {
            $scope.countries = JSON.parse(res.data).countries;
            console.log($scope.countries)
        });
    }
    $scope.fetchCity();

    $scope.changeData = function() {
        $http.put(`/api/city/${$scope.id}`, $scope.editCity)
            .then(function(res) {
                console.log(res);
            })
    }

    $scope.show = function() {
        console.log('now', $scope.editCity)
    }
})