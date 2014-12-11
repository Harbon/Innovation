var express = require ('express');
var http = require ('http');
var path = require ('path');
//var MongoStore = require ('connect-mongo')(express);
//var settings = require ('./settings.js');
//var router = require ('./routes/index.js');
//var flash = require('connect-flash');
//var session = require('express-session');

var app = express();

// 环境配置
app.set('port', process.env.PORT || 2222);
//app.use(flash());
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(session({
//
//    secret: settings.reviewDb.cookieSecret,
//    key: settings.reviewDb.db,//cookie name
//    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
//    store: new MongoStore({
//        db: settings.reviewDb.db,
//        username: settings.reviewDb.user,
//        password: settings.reviewDb.pass
//    })
//
//}));
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//路由转移到index.js
//router (app);

// development only
//if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
//}
//app.use(express.static(__dirname + '/static'))

app.use(function (req, res) {
    res.sendfile('./public/index.html')
})
//创建http服务
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
