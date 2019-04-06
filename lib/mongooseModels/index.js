"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _debug = _interopRequireDefault(require("debug"));

var _user = _interopRequireDefault(require("./user"));

var _message = _interopRequireDefault(require("./message"));

var _chatRoom = _interopRequireDefault(require("./chatRoom"));

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = (0, _debug["default"])("chat-plugin:model"); // let dbConnStr = "mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin";
// let dbConnStr = "mongodb://localhost/chat-plugin";

_mongoose["default"].set('useCreateIndex', true);

var db = _mongoose["default"].createConnection();

(0, _message["default"])(db);
(0, _chatRoom["default"])(db);
(0, _user["default"])(db);

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.openUri(_config.dbConnStr, {
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
}))();

debug('Pending DB connection');

var _default = function _default(model) {
  return db.model(model);
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb25nb29zZU1vZGVscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsIm1vbmdvb3NlIiwic2V0IiwiZGIiLCJjcmVhdGVDb25uZWN0aW9uIiwib3BlblVyaSIsImRiQ29ublN0ciIsInVzZU5ld1VybFBhcnNlciIsIm1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHVCQUFNLG1CQUFOLENBQWQsQyxDQUVBO0FBQ0E7O0FBRUFDLHFCQUFTQyxHQUFULENBQWEsZ0JBQWIsRUFBK0IsSUFBL0I7O0FBRUEsSUFBSUMsRUFBRSxHQUFHRixxQkFBU0csZ0JBQVQsRUFBVDs7QUFFQSx5QkFBUUQsRUFBUjtBQUNBLDBCQUFTQSxFQUFUO0FBQ0Esc0JBQUtBLEVBQUw7O0FBRUE7QUFBQTtBQUFBLHdCQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRWFBLEVBQUUsQ0FBQ0UsT0FBSCxDQUFXQyxpQkFBWCxFQUFzQjtBQUFFQyxZQUFBQSxlQUFlLEVBQUU7QUFBbkIsV0FBdEIsQ0FGYjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBSU9QLFVBQUFBLEtBQUssQ0FBQyx3Q0FBRCxDQUFMOztBQUpQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQ7O0FBUUFBLEtBQUssQ0FBQyx1QkFBRCxDQUFMOztlQUVlLGtCQUFBUSxLQUFLO0FBQUEsU0FBSUwsRUFBRSxDQUFDSyxLQUFILENBQVNBLEtBQVQsQ0FBSjtBQUFBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnXHJcblxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCJcclxuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4vbWVzc2FnZVwiXHJcbmltcG9ydCBDaGF0Um9vbSBmcm9tIFwiLi9jaGF0Um9vbVwiXHJcbmltcG9ydCB7IGRiQ29ublN0ciB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XHJcblxyXG5jb25zdCBkZWJ1ZyA9IERlYnVnKFwiY2hhdC1wbHVnaW46bW9kZWxcIik7XHJcblxyXG4vLyBsZXQgZGJDb25uU3RyID0gXCJtb25nb2RiOi8vc2h1a2k6c2h1a2kxQGRzMjMxOTU2Lm1sYWIuY29tOjMxOTU2L2NoYXQtcGx1Z2luXCI7XHJcbi8vIGxldCBkYkNvbm5TdHIgPSBcIm1vbmdvZGI6Ly9sb2NhbGhvc3QvY2hhdC1wbHVnaW5cIjtcclxuXHJcbm1vbmdvb3NlLnNldCgndXNlQ3JlYXRlSW5kZXgnLCB0cnVlKTtcclxuXHJcbmxldCBkYiA9IG1vbmdvb3NlLmNyZWF0ZUNvbm5lY3Rpb24oKTtcclxuXHJcbk1lc3NhZ2UoZGIpO1xyXG5DaGF0Um9vbShkYik7XHJcblVzZXIoZGIpO1xyXG5cclxuKGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZGIub3BlblVyaShkYkNvbm5TdHIsIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZGVidWcoXCJFcnJvciBjb25uZWN0aW5nIHRvIERCOiBcIiArIGVycik7XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5kZWJ1ZygnUGVuZGluZyBEQiBjb25uZWN0aW9uJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb2RlbCA9PiBkYi5tb2RlbChtb2RlbCk7XHJcbiJdfQ==