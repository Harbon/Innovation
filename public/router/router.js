/**
 * created by Harbon
 * date :2014-10-26
 */

AdministratorPlatform.config(['$routeProvider', '$locationProvider','$provide', function ($routeProvider, $locationProvider, $provide) {
//    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $provide.decorator('$templateRequest', function($delegate) {
        var mySilentProvider = function(tpl, ignoreRequestError) {
            return $delegate(tpl, true);
        }
        return mySilentProvider;
    });
    $routeProvider.when('/', {
        templateUrl:'/pages/login.html',
        controller:'loginCtrl'
    }).when('/login', {
        templateUrl:'/pages/login.html',
        controller:'loginCtrl'
    }).when('/booksList', {
        templateUrl:'/pages/booksList.html',
        controller:'booksListCtrl'
    }).when('/booksInLending', {
        templateUrl:'/pages/booksInLending.html',
        controller:'booksInLendingCtrl'
    }).when('/barCodeScan', {
        templateUrl:'/pages/barCodeScan.html',
        controller:'barCodeScanCtrl'
    }).when('/mutipleBarCode',{
        templateUrl:'/pages/mutipleBarCodeGenerator.html',
        controller:'mutipleBarCodeCtrl'
    }).otherwise({
        redirectTo:'/booksList'
    })
}])