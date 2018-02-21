'use strict';

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HTTP REQUEST LOGGER
var keys = require('../config/keys.js'); // PARSE HTML BODY

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;
var devPort = 4000;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());

/* mongodb connection */
var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongodb server');
});
_mongoose2.default.connect(keys.mongooseURI);

/* use session */
app.use((0, _expressSession2.default)({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

app.use('/', _express2.default.static(_path3.default.join(__dirname, './../public')));

/* setup routers & static directory */
app.use('/api', _routes2.default);

app.get('*', function (req, res) {
    res.sendFile(_path3.default.resolve(__dirname, './../public/index.html'));
});

/* handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function () {
    console.log('Express is listening on port', port);
});

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    var config = require('../webpack.dev.config');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);
    devServer.listen(devPort, function () {
        console.log('webpack-dev-server is listening on port', devPort);
    });
} else if (process.env.NODE_ENV === 'production') {
    // Express will serve up production asssets
    // like our main.js file, or main.css file!!
    app.use(_express2.default.static('client/build'));

    // Express will serve up the index.html file
    // if it doesnt' recognize the routes
    var _path = require('path');
    app.get('*', function (req, res) {
        res.sendFile(_path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}