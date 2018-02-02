var weatherApp = angular.module('weatherApp', ['ngRoute']);
    
    weatherApp.run(($rootScope, $http) => {
        $http({
            method: 'GET',
            url: '/api/get-browser-refresh-url',
        }).then((res) => {

            let clientReload = document.createElement('script');
                clientReload.setAttribute('src', `${res.data}`);
            document.body.insertBefore(clientReload, document.querySelector('.entry-point'));
        });
    });


    

   