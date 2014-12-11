/**
 * created by Harbon
 * date:2014-10-26
 */

AdministratorPlatform.factory('requestService', ['$http', '$rootScope', '$location', function ($http, $rootScope, $location) {
    var domain = "http://www.flappyant.com/book/API.php/"
    var book_name = '';
    var book_id = '';
    var book_info = '';

    var currentTab = null;
    $rootScope.administrator = {
        userId:null,
        password:null
    }
//    登陆
    var login = function ($scope) {

        console.log('求不黑，谢谢合作！！：）')
        var userName = $scope.userName;
        var password = $scope.password;
        var loginMessage = {
            userId:userName,
            password:password
        }

        $http({
            method:'POST',
            url:domain+'admin/login',
            data:loginMessage,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (successInfo) {
            if (successInfo.status == 1) {
            $rootScope.navShouldShow = true;
            $rootScope.administrator = loginMessage;
            $location.path('/booksList');
        }else{
                $.UIkit.notify('用户名密码错误', 'info')
            }
        }).error(function (errorInfo) {
            console.log('error');
            console.log(errorInfo);
        });
    }
//    身份验证
    var validate = function () {
        if (!$rootScope.administrator.userId) {
            $location.path('/login')
        }
    }
//分页初始化
    var paginationInit = function (tab, $scope) {
        currentTab = $scope;
        var url = '';
        if (tab == 0) {
            url = '/public/bookSum/1/0/'+$rootScope.administrator.userId;
        }else{
            url = '/public/bookSum/1/1/'+$rootScope.administrator.userId;
        }
        $http({
            method:'GET',
            url:domain+url
        }).success(function (result) {
            $scope.paginationShouldShow = true
            $scope.book_number = result.sum;
            var totalPages = parseInt(result.sum) / 15 + 1;
            var pages = [];
            for (var i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            $scope.pages = pages;
            if (tab == 0) {
                booksListRequest(1, $scope);
            }else{
                bookInLendingRequest(1, $scope);
            }

        }).error(function (result) {
            console.log(result);
        })
    }
//    全部图书列表请求
    var booksListRequest = function (page, $scope) {

        $http({
            url:domain+'/admin/search/12108238/5/page='+page+'/all',
            method:'GET'
        }).success(function (books) {
//            获取数据操作
            $scope.book_kinds = books;
//            页面状态更新
            $scope.currentPage = page;

            if ($scope.currentPage == 1) {
                $scope.notFirstPage = false;
            }else {
                $scope.notFirstPage = true;
            }

            if (parseInt($scope.currentPage) == $scope.pages.length){
                $scope.notLastPage = false;
            }else {
                $scope.notLastPage = true;
            }

        }).error(function (err) {
            $.UIkit.notify(err+'', 'error')
        })

    }
//    modal request
    var modalRequest = function (book_kind, $scope) {
        $http({
            url:domain+'/public/detail/'+book_kind,
            method:'GET'
        }).success(function (result) {
            $scope.book_kind_modal = result;
        }).error(function (error) {
            console.log('request error');
        })
    }
//    解析书本生成二维码内容
    var barCodeInfoAnalyse = function (book) {
        var content = '{book_name:'+book.book_name+',book_Info:'+book.book_Info+',book_id:'+book.book_id+'}';
        return content;
    }
//    图书添加
    var bookAdd = function ($scope) {
        var newBook = {
            bookIsbn:$scope.book_isbn,
            bookType:$scope.book_type.type
        }
        console.log(newBook);
        $http({
            method:'GET',
            url:domain+'admin/add/'+newBook.bookIsbn+'/'+newBook.bookType+'/'+$rootScope.administrator.userId+'/'+$rootScope.administrator.password
        }).success(function (result) {
            $.UIkit.notify('添加成功', 'success')
        }).error(function (result) {

        })
    }
//    图书更新API.php/admin/renew/:bookId/:bookIsbn/:userId/:password

    var bookUpdate = function (index, $scope) {
        $http({
            url:domain+'admin/renew/'+$scope.books[index].book_id+'/'+$scope.book+$rootScope.administrator.userId+'/'+$rootScope.administrator.password,
            method:'POST',
            data:updateInfo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (result) {
            $.UIkit.notify('更新成功', 'success')
            console.log('update successfully')
        }).error(function (result) {
            console.log('update failure');
        })
    }
//    图书删除
    var bookDelete = function (index, $scope) {
        $http({
            method:'GET',
            url:domain+'admin/delete/'+$scope.book_kind_modal.book_list[index].book_id+'/'+$rootScope.administrator.userId+'/'+$rootScope.administrator.password
        }).success(function (result) {
            $scope.book_kind_modal.book_list.splice(index, 1)
            $.UIkit.notify('删除成功', 'success')
            console.log('delete successfully');
        }).error(function (result) {
            console.log('delete failure');
        })
    }
//    已借出图书列表请求
    var bookInLendingRequest = function (page, $scope) {
       $http({
           url:domain+'admin/showRe/'+$rootScope.administrator.userId+'/'+$rootScope.administrator.password+'/page='+page,
           method:'GET'
       }).success(function (books) {
           console.log(books);
           $scope.books = books;
           $scope.currentPage = page;

           if ($scope.currentPage == 1) {
               $scope.notFirstPage = false;
           }else {
               $scope.notFirstPage = true;
           }

           if (parseInt($scope.currentPage) == $scope.pages.length){
               $scope.notLastPage = false;
           }else {
               $scope.notLastPage = true;
           }
       }).error(function (result) {
           $.UIkit.notify(result+'', 'error')
       })
    }
//    设置二维码信息
    var setBarCodeInfo = function (book, $scope) {
        console.log(book);
        book_info = book.book_info;
        book_id = book.book_id;
        book_name = book.book_name;
    }
//    获取二维码信息
    var getBarCodeInfo = function ($scope) {
        console.log(book_name);
        $scope.book_name = book_name;
        $scope.book_id = book_id;
        $scope.book_info = book_info;
        $scope.DIYBarCodeUrl = 'http://qr.liantu.com/api.php?text='+'{book_name:"'+book_name+'",book_info:"'+book_info+'",book_id:'+book_id+'}';
    }
//   二维码批量生成请求
    var mutipleBarCodePageRequest = function (batch, $scope) {
        console.log(batch);
        $http({
            url:domain+'admin/getId/'+batch+'/'+$rootScope.administrator.userId+'/'+$rootScope.administrator.password,
            method:'GET'
        }).success(function (books) {
             var bookBarCodeRow= {}
            var bookBarCodeRows= [];
            var mod;
            for (var i = 0;i<books.length;i++) {
                books[i].barCodeUrl ='http://qr.liantu.com/api.php?text='+barCodeInfoAnalyse(books[i]);
            }
            for (var i = 0;i<books.length;i++) {
                mod = (i+1)%5
                switch (mod) {
                    case 0:bookBarCodeRow.firstBarCode = books[i];break;
                    case 1:bookBarCodeRow.secondBarCode = books[i];break;
                    case 2:bookBarCodeRow.thirdBarCode = books[i];break;
                    case 3:bookBarCodeRow.fourthBarCode = books[i];break;
                    case 4:bookBarCodeRow.fifthBarCode = books[i];break;
                }
                if ((i+1)%5 == 0 ) {
                    bookBarCodeRows.push(bookBarCodeRow);
                    bookBarCodeRow = {};
                }
            }


            $scope.bookBarCodeRows = bookBarCodeRows;
        }).error(function (error) {
            console.log('mutipleBarCodeError');
        })
    }
//    批次请求
    var batchesRequest  = function ($scope) {
        $http({
            url:domain+'/public/batch',
            method:'GET'
        }).success(function (result) {
            console.log(result)
            $scope.batches = result.batches;
            mutipleBarCodePageRequest(result.batches[0], $scope);
        }).error(function (error) {
            console.log('batches error');
        })
    }
//    查询
    var search = function ($scope) {
       var category = $scope.category;
        var keyword = $scope.keyword;

        $http({
            method:'GET',
            url:domain+'admin/search/'+$rootScope.administrator.userId+'/'+category+'/page=0/'+keyword
        }).success(function (books) {
            currentTab.book_kinds = books;
            currentTab.paginationShouldShow = false
        }).error(function (error) {
            console.log('error search');
        })
    }

//  登出
    var logout = function ($scope) {
        $rootScope.administrator = null;
        $location.path('/login')
    }
    return {
        paginationInit:paginationInit,
        booksListRequest:booksListRequest,
        modalRequest:modalRequest,
        bookUpdate:bookUpdate,
        mutipleBarCodePageRequest:mutipleBarCodePageRequest,
        batchesRequest:batchesRequest,
        setBarCodeInfo:setBarCodeInfo,
        getBarCodeInfo:getBarCodeInfo,
        bookAdd:bookAdd,
        bookDelete:bookDelete,
        login:login,
        booksInLendingRequest:bookInLendingRequest,
        search:search,
        validate:validate,
        logout:logout
    }
}])