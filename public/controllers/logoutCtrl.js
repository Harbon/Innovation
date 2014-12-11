/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.controller('logoutCtrl', ['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {
    $scope.logout = function () {
        requestService.logout($scope)
    }

}])