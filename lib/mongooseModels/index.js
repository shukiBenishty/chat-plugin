"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dbInit = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _debug = _interopRequireDefault(require("debug"));

var _user = _interopRequireDefault(require("./user"));

var _message = _interopRequireDefault(require("./message"));

var _group = _interopRequireDefault(require("./group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = (0, _debug["default"])("chat-plugin:model");

_mongoose["default"].set('useCreateIndex', true);

var db = _mongoose["default"].createConnection();

(0, _message["default"])(db);
(0, _group["default"])(db);
(0, _user["default"])(db);

var dbInit =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(dbConnStr) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.openUri(dbConnStr, {
              useNewUrlParser: true
            });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            debug("Error connecting to DB: " + _context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function dbInit(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.dbInit = dbInit;
debug('Pending DB connection');

var _default = function _default(model) {
  return db.model(model);
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb25nb29zZU1vZGVscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsIm1vbmdvb3NlIiwic2V0IiwiZGIiLCJjcmVhdGVDb25uZWN0aW9uIiwiZGJJbml0IiwiZGJDb25uU3RyIiwib3BlblVyaSIsInVzZU5ld1VybFBhcnNlciIsIm1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHVCQUFNLG1CQUFOLENBQWQ7O0FBRUFDLHFCQUFTQyxHQUFULENBQWEsZ0JBQWIsRUFBK0IsSUFBL0I7O0FBRUEsSUFBSUMsRUFBRSxHQUFHRixxQkFBU0csZ0JBQVQsRUFBVDs7QUFFQSx5QkFBUUQsRUFBUjtBQUNBLHVCQUFNQSxFQUFOO0FBQ0Esc0JBQUtBLEVBQUw7O0FBRU8sSUFBSUUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsaUJBQU9DLFNBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFTkgsRUFBRSxDQUFDSSxPQUFILENBQVdELFNBQVgsRUFBc0I7QUFBRUUsY0FBQUEsZUFBZSxFQUFFO0FBQW5CLGFBQXRCLENBRk07O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUlaUixZQUFBQSxLQUFLLENBQUMsd0NBQUQsQ0FBTDs7QUFKWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFOSyxNQUFNO0FBQUE7QUFBQTtBQUFBLEdBQVY7OztBQVFQTCxLQUFLLENBQUMsdUJBQUQsQ0FBTDs7ZUFFZSxrQkFBQVMsS0FBSztBQUFBLFNBQUlOLEVBQUUsQ0FBQ00sS0FBSCxDQUFTQSxLQUFULENBQUo7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IERlYnVnIGZyb20gJ2RlYnVnJ1xyXG5cclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4vdXNlclwiXHJcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuL21lc3NhZ2VcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxyXG5cclxuY29uc3QgZGVidWcgPSBEZWJ1ZyhcImNoYXQtcGx1Z2luOm1vZGVsXCIpO1xyXG5cclxubW9uZ29vc2Uuc2V0KCd1c2VDcmVhdGVJbmRleCcsIHRydWUpO1xyXG5cclxubGV0IGRiID0gbW9uZ29vc2UuY3JlYXRlQ29ubmVjdGlvbigpO1xyXG5cclxuTWVzc2FnZShkYik7XHJcbkdyb3VwKGRiKTtcclxuVXNlcihkYik7XHJcblxyXG5leHBvcnQgbGV0IGRiSW5pdCA9IGFzeW5jIChkYkNvbm5TdHIpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZGIub3BlblVyaShkYkNvbm5TdHIsIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZGVidWcoXCJFcnJvciBjb25uZWN0aW5nIHRvIERCOiBcIiArIGVycik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5kZWJ1ZygnUGVuZGluZyBEQiBjb25uZWN0aW9uJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb2RlbCA9PiBkYi5tb2RlbChtb2RlbCk7XHJcbiJdfQ==