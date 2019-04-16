"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.server = void 0;

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
                  _context.next = 14;
                  break;
                }

                _subscribers["default"].setItem(wsSession.userId);

                _userLoader = new _dataloader["default"](_dataLoader.userLoader);
                _context.next = 8;
                return User.findById(wsSession.userId);

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

                return _context.abrupt("return", {
                  session: wsSession
                });

              case 14:
                throw new Error('Missing auth token!');

              case 15:
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
              _session.userId = _session && _session.passport && _session.passport.user;
              return _context4.abrupt("return", {
                session: _session,
                userLoader: new _dataloader["default"](_dataLoader.userLoader, {
                  cache: false
                }),
                groupLoader: new _dataloader["default"](_dataLoader.groupLoader, {
                  cache: false
                }),
                messageLoader: new _dataloader["default"](_dataLoader.messageLoader, {
                  cache: false
                })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJVc2VyIiwiZGVidWciLCJjaGVja3Nlc3Npb24iLCJyb3V0ZXIiLCJ1c2UiLCJzZWNyZXQiLCJjcmVkZW50aWFscyIsIm9yaWdpbiIsImV4cHJlc3MiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInNlcnZlciIsIkFwb2xsb1NlcnZlciIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiaW50cm9zcGVjdGlvbiIsInRyYWNpbmciLCJjYWNoZUNvbnRyb2wiLCJzdWJzY3JpcHRpb25zIiwib25Db25uZWN0IiwiY29ubmVjdGlvblBhcmFtcyIsIndlYlNvY2tldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidXBncmFkZVJlcSIsInNlc3Npb24iLCJ3c1Nlc3Npb24iLCJ1c2VySWQiLCJzdWJzY3JpYmVycyIsInNldEl0ZW0iLCJfdXNlckxvYWRlciIsIkRhdGFMb2FkZXIiLCJ1c2VyTG9hZGVyIiwiZmluZEJ5SWQiLCJ1c2VyIiwib25saW5lIiwic2F2ZSIsInB1YnN1YiIsInB1Ymxpc2giLCJnZW5lcmFsSW5mbyIsIkVycm9yIiwib25EaXNjb25uZWN0IiwiY29udGV4dCIsImRlbGV0ZUl0ZW0iLCJyZXEiLCJjb25uZWN0aW9uIiwicGFzc3BvcnQiLCJjYWNoZSIsImdyb3VwTG9hZGVyIiwibWVzc2FnZUxvYWRlciIsInBsYXlncm91bmQiLCJzZXR0aW5ncyIsImFwcGx5TWlkZGxld2FyZSIsImFwcCIsImdyYXBocWxVcmwiLCJ3ZWJzb2NrZXRVUkwiLCJkYkNvbm5TdHIiLCJzZXNzaW9uQ29ublN0ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBT0E7O0FBSkEsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUVBLElB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LEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IERlYnVnIGZyb20gXCJkZWJ1Z1wiO1xyXG5pbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItZXhwcmVzc1wiO1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gJ21vcmdhbic7XHJcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XHJcbmltcG9ydCBjb3JzIGZyb20gIFwiY29yc1wiIDtcclxuaW1wb3J0IERhdGFMb2FkZXIgZnJvbSAnZGF0YWxvYWRlcic7XHJcblxyXG5pbXBvcnQgeyB0eXBlRGVmcyB9IGZyb20gJy4vZ3JhcGhxbC9zY2hlbWEuanMnO1xyXG5pbXBvcnQgcmVzb2x2ZXJzIGZyb20gJy4vZ3JhcGhxbC9yZXNvbHZlcnMuanMnO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vZ3JhcGhxbC9zdWJzY3JpYmVyc1wiO1xyXG5pbXBvcnQgeyBwdWJzdWIgfSBmcm9tICcuL2dyYXBocWwvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXIgfSBmcm9tIFwiLi9ncmFwaHFsL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IGluaXRDbGllbnQgZnJvbSAnLi9pbml0Q2xlbnQnO1xyXG5pbXBvcnQge2RiSW5pdH0gZnJvbSAnLi9tb25nb29zZU1vZGVscyc7XHJcbmltcG9ydCBzZXNzaW9uLCB7c2Vzc2lvbkluaXR9IGZyb20gJy4vc2Vzc2lvbnMnO1xyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4vbW9uZ29vc2VNb2RlbHNcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuY29uc3QgZGVidWcgPSBEZWJ1ZyhcImNoYXQtcGx1Z2luXCIpO1xyXG5cclxuaW1wb3J0IF9jaGVja3Nlc3Npb24gZnJvbSAnLi9jaGVja3Nlc3Npb24nO1xyXG5jb25zdCBjaGVja3Nlc3Npb24gPSBfY2hlY2tzZXNzaW9uKFwiL2dyYXBocWxcIik7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UobG9nZ2VyKCdkZXYnKSk7XHJcblxyXG5sZXQgc2VjcmV0ID0gJ2NoYXQtcGx1Z2luIHNlY3JldCc7IC8vIG11c3QgYmUgdGhlIHNhbWUgb25lIGZvciBjb29raWUgcGFyc2VyIGFuZCBmb3Igc2Vzc2lvblxyXG5yb3V0ZXIudXNlKGNvb2tpZVBhcnNlcihzZWNyZXQpKTtcclxuXHJcblxyXG5yb3V0ZXIudXNlKFxyXG4gIGNvcnMoe1xyXG4gICAgY3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgb3JpZ2luOiBcIipcIlxyXG4gIH0pXHJcbik7XHJcblxyXG5yb3V0ZXIudXNlKCcvcHVibGljJywgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9kaXN0JykpKTtcclxuXHJcbi8vIHJvdXRlci51c2UoJyonLCBjaGVja3Nlc3Npb24pO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICB0eXBlRGVmcyxcclxuICByZXNvbHZlcnMsXHJcbiAgaW50cm9zcGVjdGlvbjogdHJ1ZSxcclxuICB0cmFjaW5nOiBmYWxzZSxcclxuICBjYWNoZUNvbnRyb2w6IGZhbHNlLFxyXG4gIHN1YnNjcmlwdGlvbnM6IHtcclxuICAgIG9uQ29ubmVjdDogYXN5bmMgKGNvbm5lY3Rpb25QYXJhbXMsIHdlYlNvY2tldCkgPT4ge1xyXG4gICAgICBjb25zdCB3c1Nlc3Npb24gPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZXNzaW9uKHdlYlNvY2tldC51cGdyYWRlUmVxLCB7fSwgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pIHtcclxuICAgICAgICAgICAgZGVidWcoXCJzZXNzaW9uXCIsIHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3NTZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1YnNjcmliZXJzLnNldEl0ZW0od3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgbGV0IF91c2VyTG9hZGVyID0gIG5ldyBEYXRhTG9hZGVyKHVzZXJMb2FkZXIpO1xyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZCh3c1Nlc3Npb24udXNlcklkKTtcclxuICAgICAgICB1c2VyLm9ubGluZSA9IHRydWU7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IG9ubGluZTogdXNlciB9IH0pO1xyXG4gICAgICAgIHJldHVybiB7IFxyXG4gICAgICAgICAgc2Vzc2lvbjogd3NTZXNzaW9uXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICAvLyB0aHJvd2luZyBlcnJvciByZWplY3RzIHRoZSBjb25uZWN0aW9uXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBhdXRoIHRva2VuIScpO1xyXG4gICAgfSxcclxuICAgIG9uRGlzY29ubmVjdDogYXN5bmMgKHdlYlNvY2tldCwgY29udGV4dCkgPT4ge1xyXG4gICAgICBjb25zdCB3c1Nlc3Npb24gPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZXNzaW9uKHdlYlNvY2tldC51cGdyYWRlUmVxLCB7fSwgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh3c1Nlc3Npb24udXNlcklkKSB7XHJcbiAgICAgICAgc3Vic2NyaWJlcnMuZGVsZXRlSXRlbSh3c1Nlc3Npb24udXNlcklkKTtcclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQod3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgdXNlci5vbmxpbmUgPSBmYWxzZTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgICAgICBwdWJzdWIucHVibGlzaChgJHt3c1Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgb25saW5lOiB1c2VyIH0gfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbnRleHQ6IGFzeW5jICh7IHJlcSwgY29ubmVjdGlvbiB9KSA9PiB7XHJcbiAgICBpZiAoY29ubmVjdGlvbikge1xyXG4gICAgICAvLyBjaGVjayBjb25uZWN0aW9uIGZvciBtZXRhZGF0YVxyXG4gICAgICBkZWJ1ZyhcImNvbm5lY3Rpb24gY29udGV4dFwiLCBjb25uZWN0aW9uLmNvbnRleHQpO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uY29udGV4dDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAvLyBnZXQgdGhlIHVzZXIgdG9rZW4gZnJvbSB0aGUgaGVhZGVyc1xyXG4gICAgbGV0IHNlc3Npb24gPSByZXEuc2Vzc2lvbiB8fCAnJztcclxuICAgIHNlc3Npb24udXNlcklkID0gc2Vzc2lvbiAmJiBzZXNzaW9uLnBhc3Nwb3J0ICYmIHNlc3Npb24ucGFzc3BvcnQudXNlclxyXG4gICAgcmV0dXJuIHsgXHJcbiAgICAgIHNlc3Npb24sXHJcbiAgICAgIHVzZXJMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKHVzZXJMb2FkZXIsIHtjYWNoZTogZmFsc2V9KSxcclxuICAgICAgZ3JvdXBMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKGdyb3VwTG9hZGVyLCB7Y2FjaGU6IGZhbHNlfSksXHJcbiAgICAgIG1lc3NhZ2VMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKG1lc3NhZ2VMb2FkZXIsIHtjYWNoZTogZmFsc2V9KVxyXG4gICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICBwbGF5Z3JvdW5kOiB7XHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgXCJyZXF1ZXN0LmNyZWRlbnRpYWxzXCI6IFwiaW5jbHVkZVwiXHJcbiAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5zZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwOiByb3V0ZXIgfSk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICggZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMLCBkYkNvbm5TdHIsIHNlc3Npb25Db25uU3RyICkgPT4ge1xyXG4gIGluaXRDbGllbnQoZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMKTtcclxuICBkYkluaXQoZGJDb25uU3RyKTtcclxuICBzZXNzaW9uSW5pdChzZXNzaW9uQ29ublN0cik7XHJcbiAgcmV0dXJuIHJvdXRlcjtcclxufTtcclxuICAiXX0=