/**
 * Created by harbon on 14-12-11.
 */
AdministratorPlatform.controller('mutipleBarCodeCtrl',['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {
    $rootScope.booksList = "unActive";
    $rootScope.booksInLending = "unActive";
    $rootScope.barCodeScan = "unActive";
    $rootScope.mutipleBarCode = "uk-active"
    $rootScope.searchShouldShow = false
//   页面初始化
    $scope.pageInit= function () {

        requestService.batchesRequest($scope)
    }
//    页面请求
    $scope.pageRequest = function () {
        requestService.mutipleBarCodePageRequest($scope.batch, $scope)
    }


}]);
