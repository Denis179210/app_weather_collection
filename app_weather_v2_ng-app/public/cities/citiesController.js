var app = angular.module('weatherApp');

app.controller('citiesController', function($scope, $http, $location, $q) {
    function getCityInfo() {
        $q.all([
            $http.get('/api/city'),
            $http.get('/api/country')
        ])
        .then((values) => {
            let[cities, countries] = values;
            cities = JSON.parse(cities.data).cities;
            countries = JSON.parse(countries.data).countries;
         
            for(let i = 0; i < cities.length; i++) {
                for(let j = 0; j < countries.length; j++) {
                    if(cities[i].countryCode == countries[j]._id) {
                        cities[i].countryCode = countries[j].countryCode
                    }
                }
            }
    
            console.log(cities);
            $scope.cities = cities;
            console.log($scope.cities)
        })
        .catch(console.error)
    }
    getCityInfo();    

    $scope.removeCity = function(id) {
        $http.delete(`/api/city/${id}`)
            .then((res) => {
                console.log(res);
                getCityInfo();
            })
    }
    // $scope.removeCity = (e, item, index) => {
    //     console.dir(e.currentTarget);
    //     var corpse = e.currentTarget;
    //     angular.element(corpse.closest('tr')).remove();
})