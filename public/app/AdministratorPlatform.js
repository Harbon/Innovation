/**
 * created by Harbon
 * date: 2014-10-26
 */
//二维码接口：http://qr.liantu.com/api.php?text=
var AdministratorPlatform = angular.module('AdministratorPlatform', ['ngRoute']);

AdministratorPlatform.run(['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.navShouldShow = true;
//    $http({
//        url:'/validate',
//        method:'GET'
//    }).success(function (successInfo) {
//    })
}]);