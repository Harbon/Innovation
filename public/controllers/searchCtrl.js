/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.controller('searchCtrl', ['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {
    $scope.category = "1"
//    查询
    $scope.search = function () {
        requestService.search($scope)
    }
}])