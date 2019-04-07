"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.server = void 0;

var _path = _interopRequireDefault(require("path"));

var _debug = _interopRequireDefault(require("debug"));

var _express = _interopRequireWildcard(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _schema = require("./graphql/schema.js");

var _resolvers = _interopRequireDefault(require("./graphql/resolvers.js"));

var _subscribers = _interopRequireDefault(require("./graphql/subscribers"));

var _Subscription = require("./graphql/Subscription");

var _dataLoader = require("./graphql/dataLoader");

var _initClent = _interopRequireDefault(require("./initClent"));

var _mongooseModels = require("./mongooseModels");

var _sessions = _interopRequireWildcard(require("./sessions"));

var _checksession2 = _interopRequireDefault(require("./checksession"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      var _onConnect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(connectionParams, webSocket) {
        var wsSession, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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

                _context.next = 7;
                return _dataLoader.userLoader.load(wsSession.userId);

              case 7:
                user = _context.sent;
                user.online = true;
                _context.next = 11;
                return user.save();

              case 11:
                _Subscription.pubsub.publish("".concat(wsSession.userId), {
                  generalInfo: {
                    online: user
                  }
                });

                _dataLoader.userLoader.prime("".concat(wsSession.userId), user);

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
      var _onDisconnect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(webSocket, context) {
        var wsSession, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                  _context2.next = 13;
                  break;
                }

                _subscribers["default"].deleteItem(wsSession.userId);

                _context2.next = 7;
                return _dataLoader.userLoader.load(wsSession.userId);

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

                _dataLoader.userLoader.prime("".concat(wsSession.userId), user);

              case 13:
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
    var _context3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref) {
      var req, connection, _session;

      return regeneratorRuntime.wrap(function _callee3$(_context4) {
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
              return _context4.abrupt("return", {
                session: _session
              });

            case 8:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsImNoZWNrc2Vzc2lvbiIsInJvdXRlciIsInVzZSIsInNlY3JldCIsImNyZWRlbnRpYWxzIiwib3JpZ2luIiwiZXhwcmVzcyIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwic2VydmVyIiwiQXBvbGxvU2VydmVyIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJpbnRyb3NwZWN0aW9uIiwidHJhY2luZyIsImNhY2hlQ29udHJvbCIsInN1YnNjcmlwdGlvbnMiLCJvbkNvbm5lY3QiLCJjb25uZWN0aW9uUGFyYW1zIiwid2ViU29ja2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1cGdyYWRlUmVxIiwic2Vzc2lvbiIsIndzU2Vzc2lvbiIsInVzZXJJZCIsInN1YnNjcmliZXJzIiwic2V0SXRlbSIsInVzZXJMb2FkZXIiLCJsb2FkIiwidXNlciIsIm9ubGluZSIsInNhdmUiLCJwdWJzdWIiLCJwdWJsaXNoIiwiZ2VuZXJhbEluZm8iLCJwcmltZSIsIkVycm9yIiwib25EaXNjb25uZWN0IiwiY29udGV4dCIsImRlbGV0ZUl0ZW0iLCJyZXEiLCJjb25uZWN0aW9uIiwicGxheWdyb3VuZCIsInNldHRpbmdzIiwiYXBwbHlNaWRkbGV3YXJlIiwiYXBwIiwiZ3JhcGhxbFVybCIsIndlYnNvY2tldFVSTCIsImRiQ29ublN0ciIsInNlc3Npb25Db25uU3RyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7QUFGQSxJQUFNQSxLQUFLLEdBQUcsdUJBQU0sYUFBTixDQUFkO0FBR0EsSUFBTUMsWUFBWSxHQUFHLCtCQUFjLFVBQWQsQ0FBckI7QUFFQSxJQUFNQyxNQUFNLEdBQUcsc0JBQWY7QUFFQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcs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QixPQUFKLElBQWUsRUFSeEI7QUFBQSxnREFVQTtBQUFFQSxnQkFBQUEsT0FBTyxFQUFQQTtBQUFGLGVBVkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQWhEOEI7QUE2RHJDb0IsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNSLDZCQUF1QjtBQURmO0FBREY7QUE3RHlCLENBQWpCLENBQWY7O0FBb0VQbkMsTUFBTSxDQUFDb0MsZUFBUCxDQUF1QjtBQUFFQyxFQUFBQSxHQUFHLEVBQUU5QztBQUFQLENBQXZCOztlQUllLGtCQUFFK0MsVUFBRixFQUFjQyxZQUFkLEVBQTRCQyxTQUE1QixFQUF1Q0MsY0FBdkMsRUFBMkQ7QUFDeEUsNkJBQVdILFVBQVgsRUFBdUJDLFlBQXZCO0FBQ0EsOEJBQU9DLFNBQVA7QUFDQSw2QkFBWUMsY0FBWjtBQUNBLFNBQU9sRCxNQUFQO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgRGVidWcgZnJvbSBcImRlYnVnXCI7XHJcbmltcG9ydCBleHByZXNzLCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBBcG9sbG9TZXJ2ZXIgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSAnbW9yZ2FuJztcclxuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcclxuaW1wb3J0IGNvcnMgZnJvbSAgXCJjb3JzXCIgO1xyXG5cclxuaW1wb3J0IHsgdHlwZURlZnMgfSBmcm9tICcuL2dyYXBocWwvc2NoZW1hLmpzJztcclxuaW1wb3J0IHJlc29sdmVycyBmcm9tICcuL2dyYXBocWwvcmVzb2x2ZXJzLmpzJztcclxuaW1wb3J0IHN1YnNjcmliZXJzIGZyb20gXCIuL2dyYXBocWwvc3Vic2NyaWJlcnNcIjtcclxuaW1wb3J0IHsgcHVic3ViIH0gZnJvbSAnLi9ncmFwaHFsL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IHVzZXJMb2FkZXIgfSBmcm9tIFwiLi9ncmFwaHFsL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IGluaXRDbGllbnQgZnJvbSAnLi9pbml0Q2xlbnQnO1xyXG5pbXBvcnQge2RiSW5pdH0gZnJvbSAnLi9tb25nb29zZU1vZGVscyc7XHJcbmltcG9ydCBzZXNzaW9uLCB7c2Vzc2lvbkluaXR9IGZyb20gJy4vc2Vzc2lvbnMnO1xyXG5cclxuY29uc3QgZGVidWcgPSBEZWJ1ZyhcImNoYXQtcGx1Z2luXCIpO1xyXG5cclxuaW1wb3J0IF9jaGVja3Nlc3Npb24gZnJvbSAnLi9jaGVja3Nlc3Npb24nO1xyXG5jb25zdCBjaGVja3Nlc3Npb24gPSBfY2hlY2tzZXNzaW9uKFwiL2dyYXBocWxcIik7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UobG9nZ2VyKCdkZXYnKSk7XHJcblxyXG5sZXQgc2VjcmV0ID0gJ2NoYXQtcGx1Z2luIHNlY3JldCc7IC8vIG11c3QgYmUgdGhlIHNhbWUgb25lIGZvciBjb29raWUgcGFyc2VyIGFuZCBmb3Igc2Vzc2lvblxyXG5yb3V0ZXIudXNlKGNvb2tpZVBhcnNlcihzZWNyZXQpKTtcclxuXHJcblxyXG5yb3V0ZXIudXNlKFxyXG4gIGNvcnMoe1xyXG4gICAgY3JlZGVudGlhbHM6IGZhbHNlLFxyXG4gICAgb3JpZ2luOiBcIipcIlxyXG4gIH0pXHJcbik7XHJcblxyXG5yb3V0ZXIudXNlKCcvcHVibGljJywgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9kaXN0JykpKTtcclxuXHJcbi8vIHJvdXRlci51c2UoJyonLCBjaGVja3Nlc3Npb24pO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICB0eXBlRGVmcyxcclxuICByZXNvbHZlcnMsXHJcbiAgaW50cm9zcGVjdGlvbjogdHJ1ZSxcclxuICB0cmFjaW5nOiBmYWxzZSxcclxuICBjYWNoZUNvbnRyb2w6IGZhbHNlLFxyXG4gIHN1YnNjcmlwdGlvbnM6IHtcclxuICAgIG9uQ29ubmVjdDogYXN5bmMgKGNvbm5lY3Rpb25QYXJhbXMsIHdlYlNvY2tldCkgPT4ge1xyXG4gICAgICBjb25zdCB3c1Nlc3Npb24gPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZXNzaW9uKHdlYlNvY2tldC51cGdyYWRlUmVxLCB7fSwgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pIHtcclxuICAgICAgICAgICAgZGVidWcoXCJzZXNzaW9uXCIsIHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3NTZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgICAgIHN1YnNjcmliZXJzLnNldEl0ZW0od3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQod3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgdXNlci5vbmxpbmUgPSB0cnVlO1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKGAke3dzU2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyBvbmxpbmU6IHVzZXIgfSB9KTtcclxuICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke3dzU2Vzc2lvbi51c2VySWR9YCwgdXNlcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc2Vzc2lvbjogd3NTZXNzaW9uIH07XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhyb3dpbmcgZXJyb3IgcmVqZWN0cyB0aGUgY29ubmVjdGlvblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXV0aCB0b2tlbiEnKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2Nvbm5lY3Q6IGFzeW5jICh3ZWJTb2NrZXQsIGNvbnRleHQpID0+IHtcclxuICAgICAgY29uc3Qgd3NTZXNzaW9uID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvbih3ZWJTb2NrZXQudXBncmFkZVJlcSwge30sICgpID0+IHtcclxuICAgICAgICAgIGlmICh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3NTZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgICAgIHN1YnNjcmliZXJzLmRlbGV0ZUl0ZW0od3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQod3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgdXNlci5vbmxpbmUgPSBmYWxzZTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgICAgICBwdWJzdWIucHVibGlzaChgJHt3c1Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgb25saW5lOiB1c2VyIH0gfSk7XHJcbiAgICAgICAgdXNlckxvYWRlci5wcmltZShgJHt3c1Nlc3Npb24udXNlcklkfWAsIHVzZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb250ZXh0OiBhc3luYyAoeyByZXEsIGNvbm5lY3Rpb24gfSkgPT4ge1xyXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcclxuICAgICAgLy8gY2hlY2sgY29ubmVjdGlvbiBmb3IgbWV0YWRhdGFcclxuICAgICAgZGVidWcoXCJjb25uZWN0aW9uIGNvbnRleHRcIiwgY29ubmVjdGlvbi5jb250ZXh0KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBjb25uZWN0aW9uLmNvbnRleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgLy8gZ2V0IHRoZSB1c2VyIHRva2VuIGZyb20gdGhlIGhlYWRlcnNcclxuICAgIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbiB8fCAnJztcclxuICAgIFxyXG4gICAgcmV0dXJuIHsgc2Vzc2lvbiB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGxheWdyb3VuZDoge1xyXG4gICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIFwicmVxdWVzdC5jcmVkZW50aWFsc1wiOiBcImluY2x1ZGVcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcDogcm91dGVyIH0pO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoIGdyYXBocWxVcmwsIHdlYnNvY2tldFVSTCwgZGJDb25uU3RyLCBzZXNzaW9uQ29ublN0ciApID0+IHtcclxuICBpbml0Q2xpZW50KGdyYXBocWxVcmwsIHdlYnNvY2tldFVSTCk7XHJcbiAgZGJJbml0KGRiQ29ublN0cik7XHJcbiAgc2Vzc2lvbkluaXQoc2Vzc2lvbkNvbm5TdHIpO1xyXG4gIHJldHVybiByb3V0ZXI7XHJcbn07XHJcbiAgIl19