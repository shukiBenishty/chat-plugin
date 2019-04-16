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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJVc2VyIiwiZGVidWciLCJjaGVja3Nlc3Npb24iLCJyb3V0ZXIiLCJ1c2UiLCJzZWNyZXQiLCJjcmVkZW50aWFscyIsIm9yaWdpbiIsImV4cHJlc3MiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInNlcnZlciIsIkFwb2xsb1NlcnZlciIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiaW50cm9zcGVjdGlvbiIsInRyYWNpbmciLCJjYWNoZUNvbnRyb2wiLCJzdWJzY3JpcHRpb25zIiwib25Db25uZWN0IiwiY29ubmVjdGlvblBhcmFtcyIsIndlYlNvY2tldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidXBncmFkZVJlcSIsInNlc3Npb24iLCJ3c1Nlc3Npb24iLCJ1c2VySWQiLCJzdWJzY3JpYmVycyIsInNldEl0ZW0iLCJfdXNlckxvYWRlciIsIkRhdGFMb2FkZXIiLCJ1c2VyTG9hZGVyIiwiZmluZEJ5SWQiLCJ1c2VyIiwib25saW5lIiwic2F2ZSIsInB1YnN1YiIsInB1Ymxpc2giLCJnZW5lcmFsSW5mbyIsIkVycm9yIiwib25EaXNjb25uZWN0IiwiY29udGV4dCIsImRlbGV0ZUl0ZW0iLCJyZXEiLCJjb25uZWN0aW9uIiwiY2FjaGUiLCJncm91cExvYWRlciIsIm1lc3NhZ2VMb2FkZXIiLCJwbGF5Z3JvdW5kIiwic2V0dGluZ3MiLCJhcHBseU1pZGRsZXdhcmUiLCJhcHAiLCJncmFwaHFsVXJsIiwid2Vic29ja2V0VVJMIiwiZGJDb25uU3RyIiwic2Vzc2lvbkNvbm5TdHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQU9BOztBQUpBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFFQSxJQUFNQyxLQUFLLEdB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RUcsVUFBVSxDQUFDSCxPQUxiOztBQUFBO0FBT1A7QUFDTWpCLGNBQUFBLFFBUkMsR0FRU21CLEdBQUcsQ0FBQ25CLE9BQUosSUFBZSxFQVJ4QjtBQUFBLGdEQVVBO0FBQ0xBLGdCQUFBQSxPQUFPLEVBQVBBLFFBREs7QUFFTE8sZ0JBQUFBLFVBQVUsRUFBRSxJQUFJRCxzQkFBSixDQUFlQyxzQkFBZixFQUEyQjtBQUFDYyxrQkFBQUEsS0FBSyxFQUFFO0FBQVIsaUJBQTNCLENBRlA7QUFHTEMsZ0JBQUFBLFdBQVcsRUFBRSxJQUFJaEIsc0JBQUosQ0FBZWdCLHVCQUFmLEVBQTRCO0FBQUNELGtCQUFBQSxLQUFLLEVBQUU7QUFBUixpQkFBNUIsQ0FIUjtBQUlMRSxnQkFBQUEsYUFBYSxFQUFFLElBQUlqQixzQkFBSixDQUFlaUIseUJBQWYsRUFBOEI7QUFBQ0Ysa0JBQUFBLEtBQUssRUFBRTtBQUFSLGlCQUE5QjtBQUpWLGVBVkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQWxEOEI7QUFvRXJDRyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ1IsNkJBQXVCO0FBRGY7QUFERjtBQXBFeUIsQ0FBakIsQ0FBZjs7QUEyRVB2QyxNQUFNLENBQUN3QyxlQUFQLENBQXVCO0FBQUVDLEVBQUFBLEdBQUcsRUFBRWxEO0FBQVAsQ0FBdkI7O2VBSWUsa0JBQUVtRCxVQUFGLEVBQWNDLFlBQWQsRUFBNEJDLFNBQTVCLEVBQXVDQyxjQUF2QyxFQUEyRDtBQUN4RSw2QkFBV0gsVUFBWCxFQUF1QkMsWUFBdkI7QUFDQSw4QkFBT0MsU0FBUDtBQUNBLDZCQUFZQyxjQUFaO0FBQ0EsU0FBT3RELE1BQVA7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiZGVidWdcIjtcclxuaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tICdtb3JnYW4nO1xyXG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xyXG5pbXBvcnQgY29ycyBmcm9tICBcImNvcnNcIiA7XHJcbmltcG9ydCBEYXRhTG9hZGVyIGZyb20gJ2RhdGFsb2FkZXInO1xyXG5cclxuaW1wb3J0IHsgdHlwZURlZnMgfSBmcm9tICcuL2dyYXBocWwvc2NoZW1hLmpzJztcclxuaW1wb3J0IHJlc29sdmVycyBmcm9tICcuL2dyYXBocWwvcmVzb2x2ZXJzLmpzJztcclxuaW1wb3J0IHN1YnNjcmliZXJzIGZyb20gXCIuL2dyYXBocWwvc3Vic2NyaWJlcnNcIjtcclxuaW1wb3J0IHsgcHVic3ViIH0gZnJvbSAnLi9ncmFwaHFsL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyLCBtZXNzYWdlTG9hZGVyIH0gZnJvbSBcIi4vZ3JhcGhxbC9kYXRhTG9hZGVyXCI7XHJcbmltcG9ydCBpbml0Q2xpZW50IGZyb20gJy4vaW5pdENsZW50JztcclxuaW1wb3J0IHtkYkluaXR9IGZyb20gJy4vbW9uZ29vc2VNb2RlbHMnO1xyXG5pbXBvcnQgc2Vzc2lvbiwge3Nlc3Npb25Jbml0fSBmcm9tICcuL3Nlc3Npb25zJztcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5jb25zdCBVc2VyID0gTW9uZ29vc2VNb2RlbHMoJ1VzZXInKTtcclxuXHJcbmNvbnN0IGRlYnVnID0gRGVidWcoXCJjaGF0LXBsdWdpblwiKTtcclxuXHJcbmltcG9ydCBfY2hlY2tzZXNzaW9uIGZyb20gJy4vY2hlY2tzZXNzaW9uJztcclxuY29uc3QgY2hlY2tzZXNzaW9uID0gX2NoZWNrc2Vzc2lvbihcIi9ncmFwaHFsXCIpO1xyXG5cclxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIudXNlKGxvZ2dlcignZGV2JykpO1xyXG5cclxubGV0IHNlY3JldCA9ICdjaGF0LXBsdWdpbiBzZWNyZXQnOyAvLyBtdXN0IGJlIHRoZSBzYW1lIG9uZSBmb3IgY29va2llIHBhcnNlciBhbmQgZm9yIHNlc3Npb25cclxucm91dGVyLnVzZShjb29raWVQYXJzZXIoc2VjcmV0KSk7XHJcblxyXG5cclxucm91dGVyLnVzZShcclxuICBjb3JzKHtcclxuICAgIGNyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIG9yaWdpbjogXCIqXCJcclxuICB9KVxyXG4pO1xyXG5cclxucm91dGVyLnVzZSgnL3B1YmxpYycsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9jbGllbnQvZGlzdCcpKSk7XHJcblxyXG4vLyByb3V0ZXIudXNlKCcqJywgY2hlY2tzZXNzaW9uKTtcclxuXHJcblxyXG5leHBvcnQgY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XHJcbiAgdHlwZURlZnMsXHJcbiAgcmVzb2x2ZXJzLFxyXG4gIGludHJvc3BlY3Rpb246IHRydWUsXHJcbiAgdHJhY2luZzogZmFsc2UsXHJcbiAgY2FjaGVDb250cm9sOiBmYWxzZSxcclxuICBzdWJzY3JpcHRpb25zOiB7XHJcbiAgICBvbkNvbm5lY3Q6IGFzeW5jIChjb25uZWN0aW9uUGFyYW1zLCB3ZWJTb2NrZXQpID0+IHtcclxuICAgICAgY29uc3Qgd3NTZXNzaW9uID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvbih3ZWJTb2NrZXQudXBncmFkZVJlcSwge30sICgpID0+IHtcclxuICAgICAgICAgIGlmICh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGRlYnVnKFwic2Vzc2lvblwiLCB3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uICk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHdzU2Vzc2lvbi51c2VySWQpIHtcclxuICAgICAgICBcclxuICAgICAgICBzdWJzY3JpYmVycy5zZXRJdGVtKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIGxldCBfdXNlckxvYWRlciA9ICBuZXcgRGF0YUxvYWRlcih1c2VyTG9hZGVyKTtcclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQod3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgdXNlci5vbmxpbmUgPSB0cnVlO1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKGAke3dzU2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyBvbmxpbmU6IHVzZXIgfSB9KTtcclxuICAgICAgICByZXR1cm4geyBcclxuICAgICAgICAgIHNlc3Npb246IHdzU2Vzc2lvblxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhyb3dpbmcgZXJyb3IgcmVqZWN0cyB0aGUgY29ubmVjdGlvblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXV0aCB0b2tlbiEnKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2Nvbm5lY3Q6IGFzeW5jICh3ZWJTb2NrZXQsIGNvbnRleHQpID0+IHtcclxuICAgICAgY29uc3Qgd3NTZXNzaW9uID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvbih3ZWJTb2NrZXQudXBncmFkZVJlcSwge30sICgpID0+IHtcclxuICAgICAgICAgIGlmICh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3NTZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgICAgIHN1YnNjcmliZXJzLmRlbGV0ZUl0ZW0od3NTZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIHVzZXIub25saW5lID0gZmFsc2U7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IG9ubGluZTogdXNlciB9IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb250ZXh0OiBhc3luYyAoeyByZXEsIGNvbm5lY3Rpb24gfSkgPT4ge1xyXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcclxuICAgICAgLy8gY2hlY2sgY29ubmVjdGlvbiBmb3IgbWV0YWRhdGFcclxuICAgICAgZGVidWcoXCJjb25uZWN0aW9uIGNvbnRleHRcIiwgY29ubmVjdGlvbi5jb250ZXh0KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBjb25uZWN0aW9uLmNvbnRleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgLy8gZ2V0IHRoZSB1c2VyIHRva2VuIGZyb20gdGhlIGhlYWRlcnNcclxuICAgIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbiB8fCAnJztcclxuICAgIFxyXG4gICAgcmV0dXJuIHsgXHJcbiAgICAgIHNlc3Npb24sXHJcbiAgICAgIHVzZXJMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKHVzZXJMb2FkZXIsIHtjYWNoZTogZmFsc2V9KSxcclxuICAgICAgZ3JvdXBMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKGdyb3VwTG9hZGVyLCB7Y2FjaGU6IGZhbHNlfSksXHJcbiAgICAgIG1lc3NhZ2VMb2FkZXI6IG5ldyBEYXRhTG9hZGVyKG1lc3NhZ2VMb2FkZXIsIHtjYWNoZTogZmFsc2V9KVxyXG4gICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICBwbGF5Z3JvdW5kOiB7XHJcbiAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgXCJyZXF1ZXN0LmNyZWRlbnRpYWxzXCI6IFwiaW5jbHVkZVwiXHJcbiAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5zZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHsgYXBwOiByb3V0ZXIgfSk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICggZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMLCBkYkNvbm5TdHIsIHNlc3Npb25Db25uU3RyICkgPT4ge1xyXG4gIGluaXRDbGllbnQoZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMKTtcclxuICBkYkluaXQoZGJDb25uU3RyKTtcclxuICBzZXNzaW9uSW5pdChzZXNzaW9uQ29ublN0cik7XHJcbiAgcmV0dXJuIHJvdXRlcjtcclxufTtcclxuICAiXX0=