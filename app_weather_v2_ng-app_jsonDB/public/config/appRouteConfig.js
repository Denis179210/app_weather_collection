var app = angular.module('weatherApp');

    app.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'city_list/cityList.html',
            controller: 'cityListController'
        })
        .when('/api/weather', {
            templateUrl: 'aditional_data_form/form.html',
            controller: 'formController'
        })
        .when('/city', {
            templateUrl: 'cities/cities.html',
            controller: 'citiesController'
        })
        .when('/country', {
            templateUrl: 'countries/countries.html',
            controller: 'countriesController'
        })
        .when('/city/edit/:id', {
            templateUrl: 'editCity/editCity.html',
            controller: 'editCityController'
        })
        .when('/country/edit/:id', {
            templateUrl: 'editCountry/editCountry.html',
            controller: 'editCountryController'
        })

        $locationProvider.html5Mode(true);
});