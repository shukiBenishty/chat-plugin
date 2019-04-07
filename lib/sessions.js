"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sessionInit = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var secret = 'chat-plugin secret';

var sessionConnect = _mongoose["default"].createConnection();

var sessionInit =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(sessConnStr) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sessionConnect.openUri(sessConnStr, {
              useNewUrlParser: true
            });

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            debug("Error connecting to session backend DB: ".concat(_context.t0));
            process.exit(0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function sessionInit(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.sessionInit = sessionInit;
var MongoStore = (0, _connectMongo["default"])(_expressSession["default"]);

var _default = (0, _expressSession["default"])({
  name: 'users.sid',
  secret: secret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new MongoStore({
    mongooseConnection: sessionConnect
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: true
  }
});

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9ucy5qcyJdLCJuYW1lcyI6WyJzZWNyZXQiLCJzZXNzaW9uQ29ubmVjdCIsIm1vbmdvb3NlIiwiY3JlYXRlQ29ubmVjdGlvbiIsInNlc3Npb25Jbml0Iiwic2Vzc0Nvbm5TdHIiLCJvcGVuVXJpIiwidXNlTmV3VXJsUGFyc2VyIiwiZGVidWciLCJwcm9jZXNzIiwiZXhpdCIsIk1vbmdvU3RvcmUiLCJzZXNzaW9uIiwibmFtZSIsInJlc2F2ZSIsInNhdmVVbmluaXRpYWxpemVkIiwicm9sbGluZyIsInN0b3JlIiwibW9uZ29vc2VDb25uZWN0aW9uIiwiY29va2llIiwibWF4QWdlIiwiaHR0cE9ubHkiLCJzYW1lU2l0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQUlBLE1BQU0sR0FBRyxvQkFBYjs7QUFFQSxJQUFJQyxjQUFjLEdBQUdDLHFCQUFTQyxnQkFBVCxFQUFyQjs7QUFFTyxJQUFJQyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFBT0MsV0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUViSixjQUFjLENBQUNLLE9BQWYsQ0FBdUJELFdBQXZCLEVBQW9DO0FBQUVFLGNBQUFBLGVBQWUsRUFBRTtBQUFuQixhQUFwQyxDQUZhOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFJbkJDLFlBQUFBLEtBQUssZ0VBQUw7QUFDQUMsWUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjs7QUFMbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBWE4sV0FBVztBQUFBO0FBQUE7QUFBQSxHQUFmOzs7QUFTUCxJQUFJTyxVQUFVLEdBQUcsOEJBQWFDLDBCQUFiLENBQWpCOztlQUVlLGdDQUFRO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUUsV0FEYTtBQUVuQmIsRUFBQUEsTUFBTSxFQUFFQSxNQUZXO0FBR25CYyxFQUFBQSxNQUFNLEVBQUUsS0FIVztBQUluQkMsRUFBQUEsaUJBQWlCLEVBQUUsS0FKQTtBQUtuQkMsRUFBQUEsT0FBTyxFQUFFLElBTFU7QUFNbkJDLEVBQUFBLEtBQUssRUFBRSxJQUFJTixVQUFKLENBQWU7QUFBRU8sSUFBQUEsa0JBQWtCLEVBQUVqQjtBQUF0QixHQUFmLENBTlk7QUFPbkJrQixFQUFBQSxNQUFNLEVBQUU7QUFBRUMsSUFBQUEsTUFBTSxFQUFFLE9BQU8sRUFBUCxHQUFZLEVBQVosR0FBaUIsRUFBM0I7QUFBK0JDLElBQUFBLFFBQVEsRUFBRSxJQUF6QztBQUErQ0MsSUFBQUEsUUFBUSxFQUFFO0FBQXpEO0FBUFcsQ0FBUixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHNlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcclxuaW1wb3J0IGNvbm5lY3RNb25nbyBmcm9tICdjb25uZWN0LW1vbmdvJztcclxuaW1wb3J0IHsgc2Vzc0Nvbm5TdHIgfSBmcm9tICcuLi9jb25maWcnO1xyXG5cclxubGV0IHNlY3JldCA9ICdjaGF0LXBsdWdpbiBzZWNyZXQnO1xyXG5cclxubGV0IHNlc3Npb25Db25uZWN0ID0gbW9uZ29vc2UuY3JlYXRlQ29ubmVjdGlvbigpO1xyXG5cclxuZXhwb3J0IGxldCBzZXNzaW9uSW5pdCA9IGFzeW5jIChzZXNzQ29ublN0cikgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgc2Vzc2lvbkNvbm5lY3Qub3BlblVyaShzZXNzQ29ublN0ciwgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgZGVidWcoYEVycm9yIGNvbm5lY3RpbmcgdG8gc2Vzc2lvbiBiYWNrZW5kIERCOiAke2Vycn1gKTtcclxuICAgICAgcHJvY2Vzcy5leGl0KDApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5sZXQgTW9uZ29TdG9yZSA9IGNvbm5lY3RNb25nbyhzZXNzaW9uKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNlc3Npb24oe1xyXG4gICAgbmFtZTogJ3VzZXJzLnNpZCcsXHJcbiAgICBzZWNyZXQ6IHNlY3JldCxcclxuICAgIHJlc2F2ZTogZmFsc2UsXHJcbiAgICBzYXZlVW5pbml0aWFsaXplZDogZmFsc2UsXHJcbiAgICByb2xsaW5nOiB0cnVlLFxyXG4gICAgc3RvcmU6IG5ldyBNb25nb1N0b3JlKHsgbW9uZ29vc2VDb25uZWN0aW9uOiBzZXNzaW9uQ29ubmVjdCB9KSxcclxuICAgIGNvb2tpZTogeyBtYXhBZ2U6IDEwMDAgKiA2MCAqIDYwICogMjQsIGh0dHBPbmx5OiB0cnVlLCBzYW1lU2l0ZTogdHJ1ZSB9IFxyXG4gIH0pIl19