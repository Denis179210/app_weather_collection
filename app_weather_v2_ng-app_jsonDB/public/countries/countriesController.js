var app = angular.module('weatherApp');

app.controller('countriesController', function($scope, $http, $location) {

    $http.get('/api/country')
        .then((res) => {
            $scope.countries = JSON.parse(res.data).countries;
            console.log($scope.countries)
        });
})