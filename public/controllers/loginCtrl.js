/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.controller('loginCtrl', ['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {
    $rootScope.navShouldShow = false;

//    管理员登陆
    $scope.login = function () {
        requestService.login($scope);
    }


}])