var app = angular.module('weatherApp');

app.controller('cityListController', function($scope, $location) {

    $scope.$location = $location;

    if(localStorage.weatherCollection && localStorage.weatherCollection !== undefined ) {
        console.log("now", localStorage.weatherCollection);
        $scope.weatherCollection = JSON.parse(localStorage.weatherCollection);
    }
    
    console.log($scope.weatherCollection);
    

    $scope.toFormDataCollection = () => {
        $scope.$location.path('/api/weather');
    };

    $scope.removeCity = (e, item, index) => {
        console.dir(e.currentTarget);
        var corpse = e.currentTarget;
        angular.element(corpse.closest('tr')).remove();

        $scope.weatherCollection.map(function(elem) {
            if(angular.equals(elem, item)) {
                $scope.weatherCollection.splice(index, 1);
                console.log($scope.weatherCollection);
                localStorage.weatherCollection = JSON.stringify($scope.weatherCollection);
                console.log($scope.weatherCollection.splice(index, 1), index, item);
            } else {
                return
            } 

        })
    }
});