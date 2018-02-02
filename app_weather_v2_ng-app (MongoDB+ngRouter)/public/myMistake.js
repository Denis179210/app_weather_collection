let weatherApp = angular.module('weatherApp', [])
    .run(($rootScope, $http) => {
        $http({
            method: 'GET',
            url: '/get-browser-refresh-url',
        }).then((res) => {

            let clientReload = document.createElement('script');
            clientReload.setAttribute('src', `${res.data}`);
            document.body.insertBefore(clientReload, document.querySelector('.entry-point'));
        });
    });

   

    
    weatherApp.controller('weatherController', ($scope, $http) => {

        $scope.requestBody = { places: []};

        $scope.place = {
            city: undefined,
            country: undefined
        };
        $scope.counter = 0;


        $scope.addPlace = (place) => {

            $scope.requestBody.places.push($scope.place);

            let item = document.createElement('div');
                item.setAttribute('city-list', 'place');
                angular.element(document.querySelector('.city-list')).appendd(item);
                // item.innerHTML = `<td></td>
                //                   <td></td>
                //                   <td></td>`
            console.log($scope.requestBody);
            console.log($scope.place,);
        };
    }).directive('cityList', ['weatherController', (weatherController) => {
        
        return {
                link: (scope, element, attrs) => {
                    scope.data = scope[attrs['cityList']];
                },
                restrict: 'A',
                template: `<tr> 
                                <td>${$scope.counter}</td>
                                <td>${$scope.place.city}</td>
                                <td>${$scope.place.country}</td>
                           </tr>`
        }
    }]);;

    

