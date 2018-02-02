var app = angular.module('weatherApp');

app.controller('citiesController', function($scope, $http, $location) {
    $http.get('/api/city')
        .then((res) => {
            $scope.cities = JSON.parse(res.data).cities;
            console.log($scope.cities)
        });
    $http.get('/api/country')
        .then((res) => {
            $scope.countries = JSON.parse(res.data).countries;
            console.log($scope.countries)
        })
    
})