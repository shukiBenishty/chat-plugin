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

var _sessions = _interopRequireDefault(require("./sessions"));

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
    } // tabs: [
    //   {
    //     endpoint: "http://localhost:4000/graphql"
    //   },
    // ],

  }
});
exports.server = server;
server.applyMiddleware({
  app: router
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsImNoZWNrc2Vzc2lvbiIsInJvdXRlciIsInVzZSIsInNlY3JldCIsImNyZWRlbnRpYWxzIiwib3JpZ2luIiwiZXhwcmVzcyIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwic2VydmVyIiwiQXBvbGxvU2VydmVyIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJpbnRyb3NwZWN0aW9uIiwidHJhY2luZyIsImNhY2hlQ29udHJvbCIsInN1YnNjcmlwdGlvbnMiLCJvbkNvbm5lY3QiLCJjb25uZWN0aW9uUGFyYW1zIiwid2ViU29ja2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1cGdyYWRlUmVxIiwic2Vzc2lvbiIsIndzU2Vzc2lvbiIsInVzZXJJZCIsInN1YnNjcmliZXJzIiwic2V0SXRlbSIsInVzZXJMb2FkZXIiLCJsb2FkIiwidXNlciIsIm9ubGluZSIsInNhdmUiLCJwdWJzdWIiLCJwdWJsaXNoIiwiZ2VuZXJhbEluZm8iLCJwcmltZSIsIkVycm9yIiwib25EaXNjb25uZWN0IiwiY29udGV4dCIsImRlbGV0ZUl0ZW0iLCJyZXEiLCJjb25uZWN0aW9uIiwicGxheWdyb3VuZCIsInNldHRpbmdzIiwiYXBwbHlNaWRkbGV3YXJlIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7Ozs7Ozs7QUFGQSxJQUFNQSxLQUFLLEdBQUcsdUJBQU0sYUFBTixDQUFkO0FBR0EsSUFBTUMsWUFBWSxHQUFHLCtCQUFjLFVBQWQsQ0FBckI7QUFFQSxJQUFNQyxNQUFNLEdBQUcsc0JBQWY7QUFFQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcsd0JBQU8sS0FBUCxDQUFYO0FBRUEsSUFBSUMsTUFBTSxHQUFHLG9CQUFiLEMsQ0FBbUM7O0FBQ25DRixNQUFNLENBQUNDLEdBQVAsQ0FBVyw4QkFBYUMsTUFBYixDQUFYO0FBR0FGLE1BQU0sQ0FBQ0MsR0FBUCxDQUNFLHNCQUFLO0FBQ0hFLEVBQUFBLFdBQVcsRUFBRSxLQURWO0FBRUhDLEVBQUFBLE1BQU0sRUFBRTtBQUZMLENBQUwsQ0FERjtBQU9BSixNQUFNLENBQUNDLEdBQVAsQ0FBVyxTQUFYLEVBQXNCSSw4QkFBZUMsaUJBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixnQkFBckIsQ0FBZixDQUF0QixFLENBRUE7O0FBR08sSUFBTUMsTUFBTSxHQUFHLElBQUlDLGlDQUFKLENBQWlCO0FBQ3JDQyxFQUFBQSxRQUFRLEVBQVJBLGdCQURxQztBQUVyQ0MsRUFBQUEsU0FBUyxFQUFUQSxxQkFGcUM7QUFHckNDLEVBQUFBLGFBQWEsRUFBRSxJQUhzQjtBQUlyQ0MsRUFBQUEsT0FBTyxFQUFFLEtBSjRCO0FBS3JDQyxFQUFBQSxZQUFZLEVBQUUsS0FMdUI7QUFNckNDLEVBQUFBLGFBQWEsRUFBRTtBQUNiQyxJQUFBQSxTQUFTO0FBQUE7QUFBQTtBQUFBLDhCQUFFLGlCQUFPQyxnQkFBUCxFQUF5QkMsU0FBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDZSxJQUFJQyxPQUFKLENBQVksVUFBQUMsT0FBTyxFQUFJO0FBQzdDLDRDQUFRRixTQUFTLENBQUNHLFVBQWxCLEVBQThCLEVBQTlCLEVBQWtDLFlBQU07QUFDdEMsd0JBQUlILFNBQVMsQ0FBQ0csVUFBVixDQUFxQkMsT0FBekIsRUFBa0M7QUFDaEN6QixzQkFBQUEsS0FBSyxDQUFDLFNBQUQsRUFBWXFCLFNBQVMsQ0FBQ0csVUFBVixDQUFxQkMsT0FBakMsQ0FBTDtBQUNBLDZCQUFPRixPQUFPLENBQUNGLFNBQVMsQ0FBQ0csVUFBVixDQUFxQkMsT0FBdEIsQ0FBZDtBQUNEOztBQUNELDJCQUFPLEtBQVA7QUFDRCxtQkFORDtBQU9ELGlCQVJ1QixDQURmOztBQUFBO0FBQ0hDLGdCQUFBQSxTQURHOztBQUFBLHFCQVVMQSxTQUFTLENBQUNDLE1BVkw7QUFBQTtBQUFBO0FBQUE7O0FBV1BDLHdDQUFZQyxPQUFaLENBQW9CSCxTQUFTLENBQUNDLE1BQTlCOztBQVhPO0FBQUEsdUJBWVVHLHVCQUFXQyxJQUFYLENBQWdCTCxTQUFTLENBQUNDLE1BQTFCLENBWlY7O0FBQUE7QUFZSEssZ0JBQUFBLElBWkc7QUFhUEEsZ0JBQUFBLElBQUksQ0FBQ0MsTUFBTCxHQUFjLElBQWQ7QUFiTztBQUFBLHVCQWNERCxJQUFJLENBQUNFLElBQUwsRUFkQzs7QUFBQTtBQWVQQyxxQ0FBT0MsT0FBUCxXQUFrQlYsU0FBUyxDQUFDQyxNQUE1QixHQUFzQztBQUFFVSxrQkFBQUEsV0FBVyxFQUFFO0FBQUVKLG9CQUFBQSxNQUFNLEVBQUVEO0FBQVY7QUFBZixpQkFBdEM7O0FBQ0FGLHVDQUFXUSxLQUFYLFdBQW9CWixTQUFTLENBQUNDLE1BQTlCLEdBQXdDSyxJQUF4Qzs7QUFoQk8saURBaUJBO0FBQUVQLGtCQUFBQSxPQUFPLEVBQUVDO0FBQVgsaUJBakJBOztBQUFBO0FBQUEsc0JBb0JILElBQUlhLEtBQUosQ0FBVSxxQkFBVixDQXBCRzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLE9BREk7QUF1QmJDLElBQUFBLFlBQVk7QUFBQTtBQUFBO0FBQUEsOEJBQUUsa0JBQU9uQixTQUFQLEVBQWtCb0IsT0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDWSxJQUFJbkIsT0FBSixDQUFZLFVBQUFDLE9BQU8sRUFBSTtBQUM3Qyw0Q0FBUUYsU0FBUyxDQUFDRyxVQUFsQixFQUE4QixFQUE5QixFQUFrQyxZQUFNO0FBQ3RDLHdCQUFJSCxTQUFTLENBQUNHLFVBQVYsQ0FBcUJDLE9BQXpCLEVBQWtDO0FBQ2hDRixzQkFBQUEsT0FBTyxDQUFDRixTQUFTLENBQUNHLFVBQVYsQ0FBcUJDLE9BQXRCLENBQVA7QUFDRDs7QUFDRCwyQkFBTyxLQUFQO0FBQ0QsbUJBTEQ7QUFNRCxpQkFQdUIsQ0FEWjs7QUFBQTtBQUNOQyxnQkFBQUEsU0FETTs7QUFBQSxxQkFTUkEsU0FBUyxDQUFDQyxNQVRGO0FBQUE7QUFBQTtBQUFBOztBQVVWQyx3Q0FBWWMsVUFBWixDQUF1QmhCLFNBQVMsQ0FBQ0MsTUFBakM7O0FBVlU7QUFBQSx1QkFXT0csdUJBQVdDLElBQVgsQ0FBZ0JMLFNBQVMsQ0FBQ0MsTUFBMUIsQ0FYUDs7QUFBQTtBQVdOSyxnQkFBQUEsSUFYTTtBQVlWQSxnQkFBQUEsSUFBSSxDQUFDQyxNQUFMLEdBQWMsS0FBZDtBQVpVO0FBQUEsdUJBYUpELElBQUksQ0FBQ0UsSUFBTCxFQWJJOztBQUFBO0FBY1ZDLHFDQUFPQyxPQUFQLFdBQWtCVixTQUFTLENBQUNDLE1BQTVCLEdBQXNDO0FBQUVVLGtCQUFBQSxXQUFXLEVBQUU7QUFBRUosb0JBQUFBLE1BQU0sRUFBRUQ7QUFBVjtBQUFmLGlCQUF0Qzs7QUFDQUYsdUNBQVdRLEtBQVgsV0FBb0JaLFNBQVMsQ0FBQ0MsTUFBOUIsR0FBd0NLLElBQXhDOztBQWZVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUF2QkMsR0FOc0I7QUFnRHJDUyxFQUFBQSxPQUFPO0FBQUE7QUFBQTtBQUFBLDRCQUFFO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBU0UsY0FBQUEsR0FBVCxRQUFTQSxHQUFULEVBQWNDLFVBQWQsUUFBY0EsVUFBZDs7QUFBQSxtQkFDSEEsVUFERztBQUFBO0FBQUE7QUFBQTs7QUFFTDtBQUNBNUMsY0FBQUEsS0FBSyxDQUFDLG9CQUFELEVBQXVCNEMsVUFBVSxDQUFDSCxPQUFsQyxDQUFMO0FBSEssZ0RBS0VHLFVBQVUsQ0FBQ0gsT0FMYjs7QUFBQTtBQU9QO0FBQ01oQixjQUFBQSxRQVJDLEdBUVNrQixHQUFHLENBQUNsQixPQUFKLElBQWUsRUFSeEI7QUFBQSxnREFVQTtBQUFFQSxnQkFBQUEsT0FBTyxFQUFQQTtBQUFGLGVBVkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQWhEOEI7QUE2RHJDb0IsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRTtBQUNSLDZCQUF1QjtBQURmLEtBREYsQ0FJUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVJRO0FBN0R5QixDQUFqQixDQUFmOztBQXlFUG5DLE1BQU0sQ0FBQ29DLGVBQVAsQ0FBdUI7QUFBRUMsRUFBQUEsR0FBRyxFQUFFOUM7QUFBUCxDQUF2QjtlQUllQSxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiZGVidWdcIjtcclxuaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIjtcclxuaW1wb3J0IGxvZ2dlciBmcm9tICdtb3JnYW4nO1xyXG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xyXG5pbXBvcnQgY29ycyBmcm9tICBcImNvcnNcIiA7XHJcblxyXG5pbXBvcnQgeyB0eXBlRGVmcyB9IGZyb20gJy4vZ3JhcGhxbC9zY2hlbWEuanMnO1xyXG5pbXBvcnQgcmVzb2x2ZXJzIGZyb20gJy4vZ3JhcGhxbC9yZXNvbHZlcnMuanMnO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vZ3JhcGhxbC9zdWJzY3JpYmVyc1wiO1xyXG5pbXBvcnQgeyBwdWJzdWIgfSBmcm9tICcuL2dyYXBocWwvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgdXNlckxvYWRlciB9IGZyb20gXCIuL2dyYXBocWwvZGF0YUxvYWRlclwiO1xyXG5pbXBvcnQgc2Vzc2lvbiBmcm9tICcuL3Nlc3Npb25zJztcclxuXHJcbmNvbnN0IGRlYnVnID0gRGVidWcoXCJjaGF0LXBsdWdpblwiKTtcclxuXHJcbmltcG9ydCBfY2hlY2tzZXNzaW9uIGZyb20gJy4vY2hlY2tzZXNzaW9uJztcclxuY29uc3QgY2hlY2tzZXNzaW9uID0gX2NoZWNrc2Vzc2lvbihcIi9ncmFwaHFsXCIpO1xyXG5cclxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIudXNlKGxvZ2dlcignZGV2JykpO1xyXG5cclxubGV0IHNlY3JldCA9ICdjaGF0LXBsdWdpbiBzZWNyZXQnOyAvLyBtdXN0IGJlIHRoZSBzYW1lIG9uZSBmb3IgY29va2llIHBhcnNlciBhbmQgZm9yIHNlc3Npb25cclxucm91dGVyLnVzZShjb29raWVQYXJzZXIoc2VjcmV0KSk7XHJcblxyXG5cclxucm91dGVyLnVzZShcclxuICBjb3JzKHtcclxuICAgIGNyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIG9yaWdpbjogXCIqXCJcclxuICB9KVxyXG4pO1xyXG5cclxucm91dGVyLnVzZSgnL3B1YmxpYycsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9jbGllbnQvZGlzdCcpKSk7XHJcblxyXG4vLyByb3V0ZXIudXNlKCcqJywgY2hlY2tzZXNzaW9uKTtcclxuXHJcblxyXG5leHBvcnQgY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XHJcbiAgdHlwZURlZnMsXHJcbiAgcmVzb2x2ZXJzLFxyXG4gIGludHJvc3BlY3Rpb246IHRydWUsXHJcbiAgdHJhY2luZzogZmFsc2UsXHJcbiAgY2FjaGVDb250cm9sOiBmYWxzZSxcclxuICBzdWJzY3JpcHRpb25zOiB7XHJcbiAgICBvbkNvbm5lY3Q6IGFzeW5jIChjb25uZWN0aW9uUGFyYW1zLCB3ZWJTb2NrZXQpID0+IHtcclxuICAgICAgY29uc3Qgd3NTZXNzaW9uID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvbih3ZWJTb2NrZXQudXBncmFkZVJlcSwge30sICgpID0+IHtcclxuICAgICAgICAgIGlmICh3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGRlYnVnKFwic2Vzc2lvblwiLCB3ZWJTb2NrZXQudXBncmFkZVJlcS5zZXNzaW9uICk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHdzU2Vzc2lvbi51c2VySWQpIHtcclxuICAgICAgICBzdWJzY3JpYmVycy5zZXRJdGVtKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIHVzZXIub25saW5lID0gdHJ1ZTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgICAgICBwdWJzdWIucHVibGlzaChgJHt3c1Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgb25saW5lOiB1c2VyIH0gfSk7XHJcbiAgICAgICAgdXNlckxvYWRlci5wcmltZShgJHt3c1Nlc3Npb24udXNlcklkfWAsIHVzZXIpO1xyXG4gICAgICAgIHJldHVybiB7IHNlc3Npb246IHdzU2Vzc2lvbiB9O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRocm93aW5nIGVycm9yIHJlamVjdHMgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGF1dGggdG9rZW4hJyk7XHJcbiAgICB9LFxyXG4gICAgb25EaXNjb25uZWN0OiBhc3luYyAod2ViU29ja2V0LCBjb250ZXh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHdzU2Vzc2lvbiA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIHNlc3Npb24od2ViU29ja2V0LnVwZ3JhZGVSZXEsIHt9LCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAod2ViU29ja2V0LnVwZ3JhZGVSZXEuc2Vzc2lvbikge1xyXG4gICAgICAgICAgICByZXNvbHZlKHdlYlNvY2tldC51cGdyYWRlUmVxLnNlc3Npb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHdzU2Vzc2lvbi51c2VySWQpIHtcclxuICAgICAgICBzdWJzY3JpYmVycy5kZWxldGVJdGVtKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHdzU2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIHVzZXIub25saW5lID0gZmFsc2U7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IG9ubGluZTogdXNlciB9IH0pO1xyXG4gICAgICAgIHVzZXJMb2FkZXIucHJpbWUoYCR7d3NTZXNzaW9uLnVzZXJJZH1gLCB1c2VyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29udGV4dDogYXN5bmMgKHsgcmVxLCBjb25uZWN0aW9uIH0pID0+IHtcclxuICAgIGlmIChjb25uZWN0aW9uKSB7XHJcbiAgICAgIC8vIGNoZWNrIGNvbm5lY3Rpb24gZm9yIG1ldGFkYXRhXHJcbiAgICAgIGRlYnVnKFwiY29ubmVjdGlvbiBjb250ZXh0XCIsIGNvbm5lY3Rpb24uY29udGV4dCk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gY29ubmVjdGlvbi5jb250ZXh0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgIC8vIGdldCB0aGUgdXNlciB0b2tlbiBmcm9tIHRoZSBoZWFkZXJzXHJcbiAgICBjb25zdCBzZXNzaW9uID0gcmVxLnNlc3Npb24gfHwgJyc7XHJcbiAgICBcclxuICAgIHJldHVybiB7IHNlc3Npb24gfTtcclxuICAgIH1cclxuICB9LFxyXG4gIHBsYXlncm91bmQ6IHtcclxuICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICBcInJlcXVlc3QuY3JlZGVudGlhbHNcIjogXCJpbmNsdWRlXCJcclxuICAgICAgfSxcclxuICAgICAgLy8gdGFiczogW1xyXG4gICAgICAvLyAgIHtcclxuICAgICAgLy8gICAgIGVuZHBvaW50OiBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9ncmFwaHFsXCJcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyBdLFxyXG4gICAgfVxyXG59KTtcclxuXHJcbnNlcnZlci5hcHBseU1pZGRsZXdhcmUoeyBhcHA6IHJvdXRlciB9KTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4gICJdfQ==