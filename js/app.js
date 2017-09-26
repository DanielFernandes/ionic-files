var app = angular.module('pdfApp', ['ionic', 'ngResource']);

// trust as url - http://stackoverflow.com/questions/20049261/sce-trustasresourceurl-globally
app.filter('iframeUrl', ['$sce', function ($sce) {
    return function (itemUrl) {
        return $sce.trustAsResourceUrl(itemUrl);
    };
}]);

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.swipeBackEnabled(true);

    // config for back button - no text title, icon, no text
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.backButton.text('');

    $stateProvider
        .state('list', {
            url: '/',
            templateUrl: 'views/list.html',
            controller: 'MainCtrl'
        })
        .state('item', {
            url: '/item/:id',
            templateUrl: 'views/item.html',
            controller: 'MainCtrl'
        });
    $urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', ['$scope', '$http', '$state', '$window',
    function ($scope, $http, $state, $window) {
       
            $http.get('data.json').success(function (data) {
               
                $scope.documents_data = data.documents;
                $scope.document_detail = $state.params.id;                
                $scope.links_data = data.links;
                
            }); // end get
       
         // make iframe full screen height
        $scope.device_height = $window.innerHeight - 43;
    } // end function
]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
