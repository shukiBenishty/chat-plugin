"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.server = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _debug = _interopRequireDefault(require("debug"));

var _express = _interopRequireWildcard(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dataloader = _interopRequireDefault(require("dataloader"));

var _schema = require("./graphql/schema.js");

var _resolvers = _interopRequireDefault(require("./graphql/resolvers.js"));

var _subscribers = _interopRequireDefault(require("./graphql/subscribers"));

var _Subscription = require("./graphql/Subscription");

var _dataLoader = require("./graphql/dataLoader");

var _initClent = _interopRequireDefault(require("./initClent"));

var _mongooseModels = _interopRequireWildcard(require("./mongooseModels"));

var _sessions = _interopRequireWildcard(require("./sessions"));

var _checksession2 = _interopRequireDefault(require("./checksession"));

var User = (0, _mongooseModels["default"])('User');
var debug = (0, _debug["default"])("chat-plugin");
var checksession = (0, _checksession2["default"])("/graphql");
var router = (0, _express.Router)();
router.use((0, _morgan["default"])('dev'));
var secret = 'chat-plugin secret'; // must be the same one for cookie parser and for session

router.use((0, _cookieParser["default"])(secret));
router.use((0, _cors["default"])({
  credentials: false,
  origin: "*"
}));
router.use('/public', _express["default"]["static"](_path["default"].join(__dirname, '../client/dist'))); // router.use('*', checksession);

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.typeDefs,
  resolvers: _resolvers["default"],
  introspection: true,
  tracing: false,
  cacheControl: false,
  subscriptions: {
    onConnect: function () {
      var _onConnect = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(connectionParams, webSocket) {
        var wsSession, _userLoader, user;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function (resolve) {
                  (0, _sessions["default"])(webSocket.upgradeReq, {}, function () {
                    if (webSocket.upgradeReq.session) {
                      debug("session", webSocket.upgradeReq.session);
                      return resolve(webSocket.upgradeReq.session);
                    }

                    return false;
                  });
                });

              case 2:
                wsSession = _context.sent;

                if (!wsSession.userId) {
                  _context.next = 15;
                  break;
                }

                _subscribers["default"].setItem(wsSession.userId);

                _userLoader = new _dataloader["default"](_dataLoader.userLoader);
                _context.next = 8;
                return _userLoader.load(wsSession.userId);

              case 8:
                user = _context.sent;
                user.online = true;
                _context.next = 12;
                return user.save();

              case 12:
                _Subscription.pubsub.publish("".concat(wsSession.userId), {
                  generalInfo: {
                    online: user
                  }
                });

                _userLoader.prime("".concat(wsSession.userId), user);

                return _context.abrupt("return", {
                  session: wsSession,
                  userLoader: _userLoader,
                  groupLoader: new _dataloader["default"](_dataLoader.groupLoader),
                  messageLoader: new _dataloader["default"](_dataLoader.messageLoader)
                });

              case 15:
                throw new Error('Missing auth token!');

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onConnect(_x, _x2) {
        return _onConnect.apply(this, arguments);
      }

      return onConnect;
    }(),
    onDisconnect: function () {
      var _onDisconnect = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(webSocket, context) {
        var wsSession, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new Promise(function (resolve) {
                  (0, _sessions["default"])(webSocket.upgradeReq, {}, function () {
                    if (webSocket.upgradeReq.session) {
                      resolve(webSocket.upgradeReq.session);
                    }

                    return false;
                  });
                });

              case 2:
                wsSession = _context2.sent;

                if (!wsSession.userId) {
                  _context2.next = 12;
                  break;
                }

                _subscribers["default"].deleteItem(wsSession.userId);

                _context2.next = 7;
                return User.findById(wsSession.userId);

              case 7:
                user = _context2.sent;
                user.online = false;
                _context2.next = 11;
                return user.save();

              case 11:
                _Subscription.pubsub.publish("".concat(wsSession.userId), {
                  generalInfo: {
                    online: user
                  }
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onDisconnect(_x3, _x4) {
        return _onDisconnect.apply(this, arguments);
      }

      return onDisconnect;
    }()
  },
  context: function () {
    var _context3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref) {
      var req, connection, _session;

      return _regenerator["default"].wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = _ref.req, connection = _ref.connection;

              if (!connection) {
                _context4.next = 6;
                break;
              }

              // check connection for metadata
              debug("connection context", connection.context);
              return _context4.abrupt("return", connection.context);

            case 6:
              // get the user token from the headers
              _session = req.session || '';
              (0, _objectDestructuringEmpty2["default"])(_dataloader["default"]);
              return _context4.abrupt("return", {
                session: _session,
                userLoader: new _dataloader["default"](_dataLoader.userLoader),
                groupLoader: new _dataloader["default"](_dataLoader.groupLoader),
                messageLoader: new _dataloader["default"](_dataLoader.messageLoader)
              });

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3);
    }));

    function context(_x5) {
      return _context3.apply(this, arguments);
    }

    return context;
  }(),
  playground: {
    settings: {
      "request.credentials": "include"
    }
  }
});
exports.server = server;
server.applyMiddleware({
  app: router
});

var _default = function _default(graphqlUrl, websocketURL, dbConnStr, sessionConnStr) {
  (0, _initClent["default"])(graphqlUrl, websocketURL);
  (0, _mongooseModels.dbInit)(dbConnStr);
  (0, _sessions.sessionInit)(sessionConnStr);
  return router;
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJVc2VyIiwiZGVidWciLCJjaGVja3Nlc3Npb24iLCJyb3V0ZXIiLCJ1c2UiLCJzZWNyZXQiLCJjcmVkZW50aWFscyIsIm9yaWdpbiIsImV4cHJlc3MiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInNlcnZlciIsIkFwb2xsb1NlcnZlciIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiaW50cm9zcGVjdGlvbiIsInRyYWNpbmciLCJjYWNoZUNvbnRyb2wiLCJzdWJzY3JpcHRpb25zIiwib25Db25uZWN0IiwiY29ubmVjdGlvblBhcmFtcyIsIndlYlNvY2tldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidXBncmFkZVJlcSIsInNlc3Npb24iLCJ3c1Nlc3Npb24iLCJ1c2VySWQiLCJzdWJzY3JpYmVycyIsInNldEl0ZW0iLCJfdXNlckxvYWRlciIsIkRhdGFMb2FkZXIiLCJ1c2VyTG9hZGVyIiwibG9hZCIsInVzZXIiLCJvbmxpbmUiLCJzYXZlIiwicHVic3ViIiwicHVibGlzaCIsImdlbmVyYWxJbmZvIiwicHJpbWUiLCJncm91cExvYWRlciIsIm1lc3NhZ2VMb2FkZXIiLCJFcnJvciIsIm9uRGlzY29ubmVjdCIsImNvbnRleHQiLCJkZWxldGVJdGVtIiwiZmluZEJ5SWQiLCJyZXEiLCJjb25uZWN0aW9uIiwicGxheWdyb3VuZCIsInNldHRpbmdzIiwiYXBwbHlNaWRkbGV3YXJlIiwiYXBwIiwiZ3JhcGhxbFVybCIsIndlYnNvY2tldFVSTCIsImRiQ29ublN0ciIsInNlc3Npb25Db25uU3RyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQU9BOztBQUpBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFFQSxJQUFN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Q29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IERlYnVnIGZyb20gXCJkZWJ1Z1wiO1xyXG5pbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gJ21vcmdhbic7XHJcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XHJcbmltcG9ydCBjb3JzIGZyb20gIFwiY29yc1wiIDtcclxuaW1wb3J0IERhdGFMb2FkZXIgZnJvbSAnZGF0YWxvYWRlcic7XHJcblxyXG5pbXBvcnQgeyB0eXBlRGVmcyB9IGZyb20gJy4vZ3JhcGhxbC9zY2hlbWEuanMnO1xyXG5pbXBvcnQgcmVzb2x2ZXJzIGZyb20gJy4vZ3JhcGhxbC9yZXNvbHZlcnMuanMnO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vZ3JhcGhxbC9zdWJzY3JpYmVyc1wiO1xyXG5pbXBvcnQgeyBwdWJzdWIgfSBmcm9tICcuL2dyYXBocWwvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXIgfSBmcm9tIFwiLi9ncmFwaHFsL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IGluaXRDbGllbnQgZnJvbSAnLi9pbml0Q2xlbnQnO1xyXG5pbXBvcnQge2RiSW5pdH0gZnJvbSAnLi9tb25nb29zZU1vZGVscyc7XHJcbmltcG9ydCBzZXNzaW9uLCB7c2Vzc2lvbkluaXR9IGZyb20gJy4vc2Vzc2lvbnMnO1xyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4vbW9uZ29vc2VNb2RlbHNcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuY29uc3QgZGVidWcgPSBEZWJ1ZyhcImNoYXQtcGx1Z2luXCIpO1xyXG5cclxuaW1wb3J0IF9jaGVja3Nlc3Npb24gZnJvbSAnLi9jaGVja3Nlc3Npb24nO1xyXG5jb25zdCBjaGVja3Nlc3Npb24gPSBfY2hlY2tzZXNzaW9uKFwiL2dyYXBocWxcIik7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UobG9nZ2VyKCdkZXYnKSk7XHJcblxyXG5sZXQgc2VjcmV0ID0gJ2NoYXQtcGx1Z2luIHNlY3JldCc7IC8vIG11c3QgYmUgdGhlIHNhbWUgb25lIGZvciBjb29raWUgcGFyc2VyIGFuZCBmb3Igc2Vzc2lvblxyXG5yb3V0ZXIudXNlKGNvb2tpZVBhcnNlcihzZWNyZXQpKTtcclxuXHJcblxyXG5yb3V0ZXIudXNlKFxyXG4gIGNvcnMoe1xyXG4gICAgY3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgb3JpZ2luOiBcIipcIlxyXG4gIH0pXHJcbik7XHJcblxyXG5yb3V0ZXIudXNlKCcvcHVibGljJywgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9kaXN0JykpKTtcclxuXHJcbi8vIHJvdXRlci51c2UoJyonLCBjaGVja3Nlc3Npb24pO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICB0eXBlRGVmcyxcclxuICByZXNvbHZlcnMsXHJcbiAgaW50cm9zcGVjdGlvbjogdHJ1ZSxcclxuICB0cmFjaW5nOiBmYWxzZSxcclxuICBjYWNoZUNvbnRyb2w6IGZhbHNlLFxyXG4gIHN1YnNjcmlwdGlvbnM6IHtcclxuICAgIG9uQ29ubmVjdDogYXN5bmMgKGNvbm5lY3Rpb25QYXJhbXMsIHdlYlNvY2tldCkgPT4ge1xyXG4gICAgICBjb25zdCB3c1Nlc3Npb24gPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZXNzaW9uKHdlYlNvY2tldC51cGdyYWRlUmVxLCB7fSwgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pIHtcclxuICAgICAgICAgICAgZGVidWcoXCJzZXNzaW9uXCIsIHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3NTZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1YnNjcmliZXJzLnNldEl0ZW0od3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgbGV0IF91c2VyTG9hZGVyID0gIG5ldyBEYXRhTG9hZGVyKHVzZXJMb2FkZXIpO1xyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgX3VzZXJMb2FkZXIubG9hZCh3c1Nlc3Npb24udXNlcklkKTtcclxuICAgICAgICB1c2VyLm9ubGluZSA9IHRydWU7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IG9ubGluZTogdXNlciB9IH0pO1xyXG4gICAgICAgIF91c2VyTG9hZGVyLnByaW1lKGAke3dzU2Vzc2lvbi51c2VySWR9YCwgdXNlcik7XHJcbiAgICAgICAgcmV0dXJuIHsgXHJcbiAgICAgICAgICBzZXNzaW9uOiB3c1Nlc3Npb24sXHJcbiAgICAgICAgICB1c2VyTG9hZGVyOiBfdXNlckxvYWRlcixcclxuICAgICAgICAgIGdyb3VwTG9hZGVyOiBuZXcgRGF0YUxvYWRlcihncm91cExvYWRlciksXHJcbiAgICAgICAgICBtZXNzYWdlTG9hZGVyOiBuZXcgRGF0YUxvYWRlcihtZXNzYWdlTG9hZGVyKSBcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRocm93aW5nIGVycm9yIHJlamVjdHMgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGF1dGggdG9rZW4hJyk7XHJcbiAgICB9LFxyXG4gICAgb25EaXNjb25uZWN0OiBhc3luYyAod2ViU29ja2V0LCBjb250ZXh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzU2Vzc2lvbiA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIHNlc3Npb24od2ViU29ja2V0LnVwZ3JhZGVSZXEsIHt9LCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbikge1xyXG4gICAgICAgICAgICByZXNvbHZlKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHdzU2Vzc2lvbi51c2VySWQpIHtcclxuICAgICAgICBzdWJzY3JpYmVycy5kZWxldGVJdGVtKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZCh3c1Nlc3Npb24udXNlcklkKTtcclxuICAgICAgICB1c2VyLm9ubGluZSA9IGZhbHNlO1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKGAke3dzU2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyBvbmxpbmU6IHVzZXIgfSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29udGV4dDogYXN5bmMgKHsgcmVxLCBjb25uZWN0aW9uIH0pID0+IHtcclxuICAgIGlmIChjb25uZWN0aW9uKSB7XHJcbiAgICAgIC8vIGNoZWNrIGNvbm5lY3Rpb24gZm9yIG1ldGFkYXRhXHJcbiAgICAgIGRlYnVnKFwiY29ubmVjdGlvbiBjb250ZXh0XCIsIGNvbm5lY3Rpb24uY29udGV4dCk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gY29ubmVjdGlvbi5jb250ZXh0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgIC8vIGdldCB0aGUgdXNlciB0b2tlbiBmcm9tIHRoZSBoZWFkZXJzXHJcbiAgICBjb25zdCBzZXNzaW9uID0gcmVxLnNlc3Npb24gfHwgJyc7XHJcbiAgICBcclxuICAgIGNvbnN0IHt9ID0gRGF0YUxvYWRlclxyXG4gICAgcmV0dXJuIHsgXHJcbiAgICAgIHNlc3Npb24sXHJcbiAgICAgIHVzZXJMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKHVzZXJMb2FkZXIpLFxyXG4gICAgICBncm91cExvYWRlcjogbmV3IERhdGFMb2FkZXIoZ3JvdXBMb2FkZXIpLFxyXG4gICAgICBtZXNzYWdlTG9hZGVyOiBuZXcgRGF0YUxvYWRlcihtZXNzYWdlTG9hZGVyKSBcclxuICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGxheWdyb3VuZDoge1xyXG4gICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIFwicmVxdWVzdC5jcmVkZW50aWFsc1wiOiBcImluY2x1ZGVcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcDogcm91dGVyIH0pO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoIGdyYXBocWxVcmwsIHdlYnNvY2tldFVSTCwgZGJDb25uU3RyLCBzZXNzaW9uQ29ublN0ciApID0+IHtcclxuICBpbml0Q2xpZW50KGdyYXBocWxVcmwsIHdlYnNvY2tldFVSTCk7XHJcbiAgZGJJbml0KGRiQ29ublN0cik7XHJcbiAgc2Vzc2lvbkluaXQoc2Vzc2lvbkNvbm5TdHIpO1xyXG4gIHJldHVybiByb3V0ZXI7XHJcbn07XHJcbiAgIl19