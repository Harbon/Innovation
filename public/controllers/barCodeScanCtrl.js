/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.controller('barCodeScanCtrl', ['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {
    $rootScope.booksList = "unActive";
    $rootScope.booksInLending = "unActive";
    $rootScope.barCodeScan = "uk-active";
    $rootScope.mutipleBarCode = "unActive"
    $rootScope.paginationShouldShow = true;
    $rootScope.searchShouldShow = false;

    //    身份验证
    requestService.validate();

    $scope.DIYBarCodeUrl = "http://qr.liantu.com/api.php?text=年轻的管理员啊，你是要金维码还是银维码呢？"
    $scope.barCodeImageLoadInit = function () {
        requestService.getBarCodeInfo($scope);
    }
    $scope.barCodeImageLoad = function () {
        $scope.DIYBarCodeUrl = 'http://qr.liantu.com/api.php?text='+'{book_name:"'+$scope.book_name+'",book_info:‘创新实验班’,book_id:'+$scope.book_id+'}';
    }
}])