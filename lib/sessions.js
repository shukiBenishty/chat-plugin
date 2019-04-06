"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var secret = 'chat-plugin secret';

var sessionConnect = _mongoose["default"].createConnection();

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return sessionConnect.openUri(_config.sessConnStr, {
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
}))();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9ucy5qcyJdLCJuYW1lcyI6WyJzZWNyZXQiLCJzZXNzaW9uQ29ubmVjdCIsIm1vbmdvb3NlIiwiY3JlYXRlQ29ubmVjdGlvbiIsIm9wZW5VcmkiLCJzZXNzQ29ublN0ciIsInVzZU5ld1VybFBhcnNlciIsImRlYnVnIiwicHJvY2VzcyIsImV4aXQiLCJNb25nb1N0b3JlIiwic2Vzc2lvbiIsIm5hbWUiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsInJvbGxpbmciLCJzdG9yZSIsIm1vbmdvb3NlQ29ubmVjdGlvbiIsImNvb2tpZSIsIm1heEFnZSIsImh0dHBPbmx5Iiwic2FtZVNpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJQSxNQUFNLEdBQUcsb0JBQWI7O0FBRUEsSUFBSUMsY0FBYyxHQUFHQyxxQkFBU0MsZ0JBQVQsRUFBckI7O0FBRUE7QUFBQTtBQUFBLHdCQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRVdGLGNBQWMsQ0FBQ0csT0FBZixDQUF1QkMsbUJBQXZCLEVBQW9DO0FBQUVDLFlBQUFBLGVBQWUsRUFBRTtBQUFuQixXQUFwQyxDQUZYOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFJS0MsVUFBQUEsS0FBSyxnRUFBTDtBQUNBQyxVQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiOztBQUxMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQ7O0FBUUEsSUFBSUMsVUFBVSxHQUFHLDhCQUFhQywwQkFBYixDQUFqQjs7ZUFFZSxnQ0FBUTtBQUNuQkMsRUFBQUEsSUFBSSxFQUFFLFdBRGE7QUFFbkJaLEVBQUFBLE1BQU0sRUFBRUEsTUFGVztBQUduQmEsRUFBQUEsTUFBTSxFQUFFLEtBSFc7QUFJbkJDLEVBQUFBLGlCQUFpQixFQUFFLEtBSkE7QUFLbkJDLEVBQUFBLE9BQU8sRUFBRSxJQUxVO0FBTW5CQyxFQUFBQSxLQUFLLEVBQUUsSUFBSU4sVUFBSixDQUFlO0FBQUVPLElBQUFBLGtCQUFrQixFQUFFaEI7QUFBdEIsR0FBZixDQU5ZO0FBT25CaUIsRUFBQUEsTUFBTSxFQUFFO0FBQUVDLElBQUFBLE1BQU0sRUFBRSxPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQTNCO0FBQStCQyxJQUFBQSxRQUFRLEVBQUUsSUFBekM7QUFBK0NDLElBQUFBLFFBQVEsRUFBRTtBQUF6RDtBQVBXLENBQVIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XHJcbmltcG9ydCBjb25uZWN0TW9uZ28gZnJvbSAnY29ubmVjdC1tb25nbyc7XHJcbmltcG9ydCB7IHNlc3NDb25uU3RyIH0gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmxldCBzZWNyZXQgPSAnY2hhdC1wbHVnaW4gc2VjcmV0JztcclxuXHJcbmxldCBzZXNzaW9uQ29ubmVjdCA9IG1vbmdvb3NlLmNyZWF0ZUNvbm5lY3Rpb24oKTtcclxuXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBzZXNzaW9uQ29ubmVjdC5vcGVuVXJpKHNlc3NDb25uU3RyLCB7IHVzZU5ld1VybFBhcnNlcjogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBkZWJ1ZyhgRXJyb3IgY29ubmVjdGluZyB0byBzZXNzaW9uIGJhY2tlbmQgREI6ICR7ZXJyfWApO1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XHJcbiAgICB9XHJcbiAgfSkoKTtcclxubGV0IE1vbmdvU3RvcmUgPSBjb25uZWN0TW9uZ28oc2Vzc2lvbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZXNzaW9uKHtcclxuICAgIG5hbWU6ICd1c2Vycy5zaWQnLFxyXG4gICAgc2VjcmV0OiBzZWNyZXQsXHJcbiAgICByZXNhdmU6IGZhbHNlLFxyXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG4gICAgcm9sbGluZzogdHJ1ZSxcclxuICAgIHN0b3JlOiBuZXcgTW9uZ29TdG9yZSh7IG1vbmdvb3NlQ29ubmVjdGlvbjogc2Vzc2lvbkNvbm5lY3QgfSksXHJcbiAgICBjb29raWU6IHsgbWF4QWdlOiAxMDAwICogNjAgKiA2MCAqIDI0LCBodHRwT25seTogdHJ1ZSwgc2FtZVNpdGU6IHRydWUgfSBcclxuICB9KSJdfQ==