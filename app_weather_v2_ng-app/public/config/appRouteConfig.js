var app = angular.module('weatherApp');

    app.config(function($stateProvider, $locationProvider) {

        $stateProvider
            .state({
                name: 'city_list',
                url: '/', 
                templateUrl: 'city_list/cityList.html',
                controller: 'cityListController'
            })
            .state({
                name: 'aditional_data_form',
                url: '/api/weather',
                templateUrl: 'aditional_data_form/form.html',
                controller: 'formController'
            })
            .state('/city', {
                templateUrl: 'cities/cities.html',
                controller: 'citiesController'
            })
            .state('/city/add/', {
                templateUrl: 'addCity/addCity.html',
                controller: 'addCityController'
            })
            .state('/city/edit/:id', {
                templateUrl: 'editCity/editCity.html',
                controller: 'editCityController'
            })
            .state('/country', {
                templateUrl: 'countries/countries.html',
                controller: 'countriesController'
            })
            .state('/country/edit/:id', {
                templateUrl: 'editCountry/editCountry.html',
                controller: 'editCountryController'
            })

        $locationProvider.html5Mode(true);
});