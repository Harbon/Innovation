/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.controller('booksInLendingCtrl', ['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {
    $rootScope.booksList = "unActive";
    $rootScope.booksInLending = "uk-active";
    $rootScope.barCodeScan = "unActive";
    $rootScope.mutipleBarCode = "unActive"
    $rootScope.paginationShouldShow = true;
    $rootScope.searchShouldShow = false
    //    身份验证
    requestService.validate();
    //    分页初始化
    $scope.pageInit = function () {
        requestService.paginationInit(1,$scope);
    }
//    页面请求
    $scope.pageRequest = function (page) {

        requestService.booksInLendingRequest(page, $scope);

    }

    //        请求前一页
    $scope.thePreviousPage = function (currentPage) {
        currentPage = currentPage -1;
        $scope.currentPage = currentPage;
        requestService.booksInLendingRequest(currentPage, $scope);

    }
//    请求下一页
    $scope.theNextPage = function (currentPage) {
        currentPage = currentPage +1;
        $scope.currentPage = currentPage;
        requestService.booksInLendingRequest(currentPage, $scope);
    }

}])