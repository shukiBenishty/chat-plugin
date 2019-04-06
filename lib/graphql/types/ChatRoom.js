"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

var _dataLoader = require("../dataLoader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Message = (0, _mongooseModels["default"])('Message');
var ChatRoom = (0, _mongooseModels["default"])('ChatRoom');
var _default = {
  __isTypeOf: function __isTypeOf(obj) {
    if (obj.subscribers) return "ChatRoom";
    return null;
  },
  messages: function messages(paerent, args, _ref) {
    var session = _ref.session;
    return Message.find({
      destination: paerent.id
    });
  },
  subscribers: function () {
    var _subscribers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(paerent, args, _ref2) {
      var session, chatRoom;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref2.session;
              _context.prev = 1;
              _context.next = 4;
              return _dataLoader.chatRoomLoader.load(paerent.id.toString());

            case 4:
              chatRoom = _context.sent;
              return _context.abrupt("return", _dataLoader.userLoader.loadMany(chatRoom.subscribers.map(function (s) {
                return s._id.toString();
              })));

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", new Error(_context.t0));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));

    function subscribers(_x, _x2, _x3) {
      return _subscribers.apply(this, arguments);
    }

    return subscribers;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL0NoYXRSb29tLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJDaGF0Um9vbSIsIl9faXNUeXBlT2YiLCJvYmoiLCJzdWJzY3JpYmVycyIsIm1lc3NhZ2VzIiwicGFlcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwiZmluZCIsImRlc3RpbmF0aW9uIiwiaWQiLCJjaGF0Um9vbUxvYWRlciIsImxvYWQiLCJ0b1N0cmluZyIsImNoYXRSb29tIiwidXNlckxvYWRlciIsImxvYWRNYW55IiwibWFwIiwicyIsIl9pZCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHLGdDQUFlLFNBQWYsQ0FBaEI7QUFDQSxJQUFNQyxRQUFRLEdBQUcsZ0NBQWUsVUFBZixDQUFqQjtlQUVlO0FBQ1hDLEVBQUFBLFVBQVUsRUFBRSxvQkFBQ0MsR0FBRCxFQUFTO0FBQ25CLFFBQUlBLEdBQUcsQ0FBQ0MsV0FBUixFQUNFLE9BQU8sVUFBUDtBQUNGLFdBQU8sSUFBUDtBQUNELEdBTFU7QUFNWEMsRUFBQUEsUUFBUSxFQUFFLGtCQUFDQyxPQUFELEVBQVVDLElBQVYsUUFBOEI7QUFBQSxRQUFiQyxPQUFhLFFBQWJBLE9BQWE7QUFDcEMsV0FBT1IsT0FBTyxDQUFDUyxJQUFSLENBQWE7QUFDbEJDLE1BQUFBLFdBQVcsRUFBRUosT0FBTyxDQUFDSztBQURILEtBQWIsQ0FBUDtBQUdILEdBVlU7QUFXWFAsRUFBQUEsV0FBVztBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBTUUsT0FBTixFQUFlQyxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQkMsY0FBQUEsT0FBdEIsU0FBc0JBLE9BQXRCO0FBQUE7QUFBQTtBQUFBLHFCQUVZSSwyQkFBZUMsSUFBZixDQUFvQlAsT0FBTyxDQUFDSyxFQUFSLENBQVdHLFFBQVgsRUFBcEIsQ0FGWjs7QUFBQTtBQUVMQyxjQUFBQSxRQUZLO0FBQUEsK0NBR0ZDLHVCQUFXQyxRQUFYLENBQXFCRixRQUFRLENBQUNYLFdBQVQsQ0FBcUJjLEdBQXJCLENBQTBCLFVBQUFDLENBQUM7QUFBQSx1QkFBSUEsQ0FBQyxDQUFDQyxHQUFGLENBQU1OLFFBQU4sRUFBSjtBQUFBLGVBQTNCLENBQXJCLENBSEU7O0FBQUE7QUFBQTtBQUFBO0FBQUEsK0NBS0YsSUFBSU8sS0FBSixhQUxFOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFYQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5pbXBvcnQgeyB1c2VyTG9hZGVyLCBjaGF0Um9vbUxvYWRlciB9IGZyb20gXCIuLi9kYXRhTG9hZGVyXCI7XHJcblxyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuY29uc3QgQ2hhdFJvb20gPSBNb25nb29zZU1vZGVscygnQ2hhdFJvb20nKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9faXNUeXBlT2Y6IChvYmopID0+IHtcclxuICAgICAgaWYoIG9iai5zdWJzY3JpYmVycyApXHJcbiAgICAgICAgcmV0dXJuIFwiQ2hhdFJvb21cIjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZXM6IChwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgICByZXR1cm4gTWVzc2FnZS5maW5kKHtcclxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBwYWVyZW50LmlkXHJcbiAgICAgICAgfSkgXHJcbiAgICB9LFxyXG4gICAgc3Vic2NyaWJlcnM6IGFzeW5jKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGxldCBjaGF0Um9vbSA9IGF3YWl0IGNoYXRSb29tTG9hZGVyLmxvYWQocGFlcmVudC5pZC50b1N0cmluZygpIClcclxuICAgICAgICByZXR1cm4gdXNlckxvYWRlci5sb2FkTWFueSggY2hhdFJvb20uc3Vic2NyaWJlcnMubWFwKCBzID0+IHMuX2lkLnRvU3RyaW5nKCkgKSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSJdfQ==