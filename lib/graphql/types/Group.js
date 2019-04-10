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
var Group = (0, _mongooseModels["default"])('Group');
var _default = {
  __isTypeOf: function __isTypeOf(obj) {
    if (obj.subscribers) return "Group";
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
      var session, group;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref2.session;
              _context.prev = 1;
              _context.next = 4;
              return _dataLoader.groupLoader.load(paerent.id.toString());

            case 4:
              group = _context.sent;
              return _context.abrupt("return", _dataLoader.userLoader.loadMany(group.subscribers.map(function (s) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL0dyb3VwLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJHcm91cCIsIl9faXNUeXBlT2YiLCJvYmoiLCJzdWJzY3JpYmVycyIsIm1lc3NhZ2VzIiwicGFlcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwiZmluZCIsImRlc3RpbmF0aW9uIiwiaWQiLCJncm91cExvYWRlciIsImxvYWQiLCJ0b1N0cmluZyIsImdyb3VwIiwidXNlckxvYWRlciIsImxvYWRNYW55IiwibWFwIiwicyIsIl9pZCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHLGdDQUFlLFNBQWYsQ0FBaEI7QUFDQSxJQUFNQyxLQUFLLEdBQUcsZ0NBQWUsT0FBZixDQUFkO2VBRWU7QUFDWEMsRUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQVM7QUFDbkIsUUFBSUEsR0FBRyxDQUFDQyxXQUFSLEVBQ0UsT0FBTyxPQUFQO0FBQ0YsV0FBTyxJQUFQO0FBQ0QsR0FMVTtBQU1YQyxFQUFBQSxRQUFRLEVBQUUsa0JBQUNDLE9BQUQsRUFBVUMsSUFBVixRQUE4QjtBQUFBLFFBQWJDLE9BQWEsUUFBYkEsT0FBYTtBQUNwQyxXQUFPUixPQUFPLENBQUNTLElBQVIsQ0FBYTtBQUNsQkMsTUFBQUEsV0FBVyxFQUFFSixPQUFPLENBQUNLO0FBREgsS0FBYixDQUFQO0FBR0gsR0FWVTtBQVdYUCxFQUFBQSxXQUFXO0FBQUE7QUFBQTtBQUFBLDRCQUFFLGlCQUFNRSxPQUFOLEVBQWVDLElBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNCQyxjQUFBQSxPQUF0QixTQUFzQkEsT0FBdEI7QUFBQTtBQUFBO0FBQUEscUJBRVNJLHdCQUFZQyxJQUFaLENBQWlCUCxPQUFPLENBQUNLLEVBQVIsQ0FBV0csUUFBWCxFQUFqQixDQUZUOztBQUFBO0FBRUxDLGNBQUFBLEtBRks7QUFBQSwrQ0FHRkMsdUJBQVdDLFFBQVgsQ0FBcUJGLEtBQUssQ0FBQ1gsV0FBTixDQUFrQmMsR0FBbEIsQ0FBdUIsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNDLEdBQUYsQ0FBTU4sUUFBTixFQUFKO0FBQUEsZUFBeEIsQ0FBckIsQ0FIRTs7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQ0FLRixJQUFJTyxLQUFKLGFBTEU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQVhBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyIH0gZnJvbSBcIi4uL2RhdGFMb2FkZXJcIjtcclxuXHJcbmNvbnN0IE1lc3NhZ2UgPSBNb25nb29zZU1vZGVscygnTWVzc2FnZScpO1xyXG5jb25zdCBHcm91cCA9IE1vbmdvb3NlTW9kZWxzKCdHcm91cCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19pc1R5cGVPZjogKG9iaikgPT4ge1xyXG4gICAgICBpZiggb2JqLnN1YnNjcmliZXJzIClcclxuICAgICAgICByZXR1cm4gXCJHcm91cFwiO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczogKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBNZXNzYWdlLmZpbmQoe1xyXG4gICAgICAgICAgZGVzdGluYXRpb246IHBhZXJlbnQuaWRcclxuICAgICAgICB9KSBcclxuICAgIH0sXHJcbiAgICBzdWJzY3JpYmVyczogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGdyb3VwID0gYXdhaXQgZ3JvdXBMb2FkZXIubG9hZChwYWVyZW50LmlkLnRvU3RyaW5nKCkgKVxyXG4gICAgICAgIHJldHVybiB1c2VyTG9hZGVyLmxvYWRNYW55KCBncm91cC5zdWJzY3JpYmVycy5tYXAoIHMgPT4gcy5faWQudG9TdHJpbmcoKSApKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9Il19