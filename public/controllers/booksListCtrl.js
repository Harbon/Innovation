/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.controller('booksListCtrl', ['$rootScope', '$scope', 'requestService', function ($rootScope, $scope, requestService) {


    $rootScope.booksList = "uk-active";
    $rootScope.booksInLending = "unActive";
    $rootScope.barCodeScan = "unActive";
    $rootScope.mutipleBarCode = "unActive"
    $rootScope.paginationShouldShow = true;
    $rootScope.searchShouldShow = true;
    $scope.types = [{type:'移动端'},{type:'JAVA'},{type:'Web小技术'},{type:'UML'},{type:'JS'},{type:'小众后端'},{type:'操作系统'},{type:'PHP'},
        {type:'数据挖掘'},{type:'前端'},{type:'C++'},{type:'思维锻炼'},{type:'数据库'},{type:'杂项'},{type:'交互'}]
//    身份验证
    requestService.validate();
//    分页初始化
    $scope.pageInit = function () {

        requestService.paginationInit(0,$scope);
    }
//    页面请求
    $scope.pageRequest = function (page) {

        requestService.booksListRequest(page, $scope);

    }
//二维码跳转
    $scope.jumpToBarCode = function (book) {
        requestService.setBarCodeInfo(book,$scope);
    }
//删除图书
    $scope.deleteBook = function (index) {
        requestService.bookDelete(index, $scope);
    }
//  拉取更新豆瓣最新信息
   $scope.updateBookKind = function (index) {

   }
//    modal request
    $scope.modalRequest = function (book_kind) {
            requestService.modalRequest(book_kind, $scope)
    }

//    添加书籍
    $scope.addSubmit = function () {
        var modal = $.UIkit.modal("#add");
        if ( modal.isActive() ) {
            modal.hide();
        }
        requestService.bookAdd ($scope);
    }
//        请求前一页
    $scope.thePreviousPage = function (currentPage) {
        currentPage = currentPage -1;
        $scope.currentPage = currentPage;
        requestService.booksListRequest(currentPage, $scope);

    }
//    请求下一页
    $scope.theNextPage = function (currentPage) {
        currentPage = currentPage +1;
        $scope.currentPage = currentPage;
        requestService.booksListRequest(currentPage, $scope);
    }

}])