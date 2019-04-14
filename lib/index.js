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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      var _onConnect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(connectionParams, webSocket) {
        var wsSession, _userLoader, user;

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

              _objectDestructuringEmpty(_dataloader["default"]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJVc2VyIiwiZGVidWciLCJjaGVja3Nlc3Npb24iLCJyb3V0ZXIiLCJ1c2UiLCJzZWNyZXQiLCJjcmVkZW50aWFscyIsIm9yaWdpbiIsImV4cHJlc3MiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInNlcnZlciIsIkFwb2xsb1NlcnZlciIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiaW50cm9zcGVjdGlvbiIsInRyYWNpbmciLCJjYWNoZUNvbnRyb2wiLCJzdWJzY3JpcHRpb25zIiwib25Db25uZWN0IiwiY29ubmVjdGlvblBhcmFtcyIsIndlYlNvY2tldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidXBncmFkZVJlcSIsInNlc3Npb24iLCJ3c1Nlc3Npb24iLCJ1c2VySWQiLCJzdWJzY3JpYmVycyIsInNldEl0ZW0iLCJfdXNlckxvYWRlciIsIkRhdGFMb2FkZXIiLCJ1c2VyTG9hZGVyIiwibG9hZCIsInVzZXIiLCJvbmxpbmUiLCJzYXZlIiwicHVic3ViIiwicHVibGlzaCIsImdlbmVyYWxJbmZvIiwicHJpbWUiLCJncm91cExvYWRlciIsIm1lc3NhZ2VMb2FkZXIiLCJFcnJvciIsIm9uRGlzY29ubmVjdCIsImNvbnRleHQiLCJkZWxldGVJdGVtIiwiZmluZEJ5SWQiLCJyZXEiLCJjb25uZWN0aW9uIiwicGxheWdyb3VuZCIsInNldHRpbmdzIiwiYXBwbHlNaWRkbGV3YXJlIiwiYXBwIiwiZ3JhcGhxbFVybCIsIndlYnNvY2tldFVSTCIsImRiQ29ublN0ciIsInNlc3Npb25Db25uU3RyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBT0E7Ozs7Ozs7Ozs7OztBQUpBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFFQSxJQUFN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ZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgRGVidWcgZnJvbSBcImRlYnVnXCI7XHJcbmltcG9ydCBleHByZXNzLCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBBcG9sbG9TZXJ2ZXIgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSAnbW9yZ2FuJztcclxuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcclxuaW1wb3J0IGNvcnMgZnJvbSAgXCJjb3JzXCIgO1xyXG5pbXBvcnQgRGF0YUxvYWRlciBmcm9tICdkYXRhbG9hZGVyJztcclxuXHJcbmltcG9ydCB7IHR5cGVEZWZzIH0gZnJvbSAnLi9ncmFwaHFsL3NjaGVtYS5qcyc7XHJcbmltcG9ydCByZXNvbHZlcnMgZnJvbSAnLi9ncmFwaHFsL3Jlc29sdmVycy5qcyc7XHJcbmltcG9ydCBzdWJzY3JpYmVycyBmcm9tIFwiLi9ncmFwaHFsL3N1YnNjcmliZXJzXCI7XHJcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gJy4vZ3JhcGhxbC9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyB1c2VyTG9hZGVyLCBncm91cExvYWRlciwgbWVzc2FnZUxvYWRlciB9IGZyb20gXCIuL2dyYXBocWwvZGF0YUxvYWRlclwiO1xyXG5pbXBvcnQgaW5pdENsaWVudCBmcm9tICcuL2luaXRDbGVudCc7XHJcbmltcG9ydCB7ZGJJbml0fSBmcm9tICcuL21vbmdvb3NlTW9kZWxzJztcclxuaW1wb3J0IHNlc3Npb24sIHtzZXNzaW9uSW5pdH0gZnJvbSAnLi9zZXNzaW9ucyc7XHJcbmltcG9ydCBNb25nb29zZU1vZGVscyBmcm9tIFwiLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuY29uc3QgVXNlciA9IE1vbmdvb3NlTW9kZWxzKCdVc2VyJyk7XHJcblxyXG5jb25zdCBkZWJ1ZyA9IERlYnVnKFwiY2hhdC1wbHVnaW5cIik7XHJcblxyXG5pbXBvcnQgX2NoZWNrc2Vzc2lvbiBmcm9tICcuL2NoZWNrc2Vzc2lvbic7XHJcbmNvbnN0IGNoZWNrc2Vzc2lvbiA9IF9jaGVja3Nlc3Npb24oXCIvZ3JhcGhxbFwiKTtcclxuXHJcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxucm91dGVyLnVzZShsb2dnZXIoJ2RldicpKTtcclxuXHJcbmxldCBzZWNyZXQgPSAnY2hhdC1wbHVnaW4gc2VjcmV0JzsgLy8gbXVzdCBiZSB0aGUgc2FtZSBvbmUgZm9yIGNvb2tpZSBwYXJzZXIgYW5kIGZvciBzZXNzaW9uXHJcbnJvdXRlci51c2UoY29va2llUGFyc2VyKHNlY3JldCkpO1xyXG5cclxuXHJcbnJvdXRlci51c2UoXHJcbiAgY29ycyh7XHJcbiAgICBjcmVkZW50aWFsczogZmFsc2UsXHJcbiAgICBvcmlnaW46IFwiKlwiXHJcbiAgfSlcclxuKTtcclxuXHJcbnJvdXRlci51c2UoJy9wdWJsaWMnLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vY2xpZW50L2Rpc3QnKSkpO1xyXG5cclxuLy8gcm91dGVyLnVzZSgnKicsIGNoZWNrc2Vzc2lvbik7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xyXG4gIHR5cGVEZWZzLFxyXG4gIHJlc29sdmVycyxcclxuICBpbnRyb3NwZWN0aW9uOiB0cnVlLFxyXG4gIHRyYWNpbmc6IGZhbHNlLFxyXG4gIGNhY2hlQ29udHJvbDogZmFsc2UsXHJcbiAgc3Vic2NyaXB0aW9uczoge1xyXG4gICAgb25Db25uZWN0OiBhc3luYyAoY29ubmVjdGlvblBhcmFtcywgd2ViU29ja2V0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzU2Vzc2lvbiA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIHNlc3Npb24od2ViU29ja2V0LnVwZ3JhZGVSZXEsIHt9LCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbikge1xyXG4gICAgICAgICAgICBkZWJ1ZyhcInNlc3Npb25cIiwgd2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbiApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh3c1Nlc3Npb24udXNlcklkKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3Vic2NyaWJlcnMuc2V0SXRlbSh3c1Nlc3Npb24udXNlcklkKTtcclxuICAgICAgICBsZXQgX3VzZXJMb2FkZXIgPSAgbmV3IERhdGFMb2FkZXIodXNlckxvYWRlcik7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBfdXNlckxvYWRlci5sb2FkKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIHVzZXIub25saW5lID0gdHJ1ZTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgICAgICBwdWJzdWIucHVibGlzaChgJHt3c1Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgb25saW5lOiB1c2VyIH0gfSk7XHJcbiAgICAgICAgX3VzZXJMb2FkZXIucHJpbWUoYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB1c2VyKTtcclxuICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgIHNlc3Npb246IHdzU2Vzc2lvbixcclxuICAgICAgICAgIHVzZXJMb2FkZXI6IF91c2VyTG9hZGVyLFxyXG4gICAgICAgICAgZ3JvdXBMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKGdyb3VwTG9hZGVyKSxcclxuICAgICAgICAgIG1lc3NhZ2VMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKG1lc3NhZ2VMb2FkZXIpIFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhyb3dpbmcgZXJyb3IgcmVqZWN0cyB0aGUgY29ubmVjdGlvblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXV0aCB0b2tlbiEnKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2Nvbm5lY3Q6IGFzeW5jICh3ZWJTb2NrZXQsIGNvbnRleHQpID0+IHtcclxuICAgICAgY29uc3Qgd3NTZXNzaW9uID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvbih3ZWJTb2NrZXQudXBncmFkZVJlcSwge30sICgpID0+IHtcclxuICAgICAgICAgIGlmICh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3NTZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgICAgIHN1YnNjcmliZXJzLmRlbGV0ZUl0ZW0od3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIHVzZXIub25saW5lID0gZmFsc2U7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IG9ubGluZTogdXNlciB9IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb250ZXh0OiBhc3luYyAoeyByZXEsIGNvbm5lY3Rpb24gfSkgPT4ge1xyXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcclxuICAgICAgLy8gY2hlY2sgY29ubmVjdGlvbiBmb3IgbWV0YWRhdGFcclxuICAgICAgZGVidWcoXCJjb25uZWN0aW9uIGNvbnRleHRcIiwgY29ubmVjdGlvbi5jb250ZXh0KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBjb25uZWN0aW9uLmNvbnRleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgLy8gZ2V0IHRoZSB1c2VyIHRva2VuIGZyb20gdGhlIGhlYWRlcnNcclxuICAgIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbiB8fCAnJztcclxuICAgIFxyXG4gICAgY29uc3Qge30gPSBEYXRhTG9hZGVyXHJcbiAgICByZXR1cm4geyBcclxuICAgICAgc2Vzc2lvbixcclxuICAgICAgdXNlckxvYWRlcjogbmV3IERhdGFMb2FkZXIodXNlckxvYWRlciksXHJcbiAgICAgIGdyb3VwTG9hZGVyOiBuZXcgRGF0YUxvYWRlcihncm91cExvYWRlciksXHJcbiAgICAgIG1lc3NhZ2VMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKG1lc3NhZ2VMb2FkZXIpIFxyXG4gICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICBwbGF5Z3JvdW5kOiB7XHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgXCJyZXF1ZXN0LmNyZWRlbnRpYWxzXCI6IFwiaW5jbHVkZVwiXHJcbiAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5zZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwOiByb3V0ZXIgfSk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICggZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMLCBkYkNvbm5TdHIsIHNlc3Npb25Db25uU3RyICkgPT4ge1xyXG4gIGluaXRDbGllbnQoZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMKTtcclxuICBkYkluaXQoZGJDb25uU3RyKTtcclxuICBzZXNzaW9uSW5pdChzZXNzaW9uQ29ublN0cik7XHJcbiAgcmV0dXJuIHJvdXRlcjtcclxufTtcclxuICAiXX0=