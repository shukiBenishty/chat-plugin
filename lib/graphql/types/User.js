"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataLoader = require("../dataLoader");

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var _default = {
  contacts: function () {
    var _contacts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(paerent, args, _ref) {
      var session, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref.session;
              _context.prev = 1;
              _context.next = 4;
              return _dataLoader.userLoader.load(paerent.id.toString());

            case 4:
              user = _context.sent;
              return _context.abrupt("return", _dataLoader.userLoader.loadMany(user.contacts.map(function (c) {
                return c._id.toString();
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

    function contacts(_x, _x2, _x3) {
      return _contacts.apply(this, arguments);
    }

    return contacts;
  }(),
  chatRooms: function () {
    var _chatRooms = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(paerent, args, _ref2) {
      var session, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              session = _ref2.session;
              _context2.prev = 1;
              _context2.next = 4;
              return _dataLoader.userLoader.load(paerent.id.toString());

            case 4:
              user = _context2.sent;
              return _context2.abrupt("return", _dataLoader.chatRoomLoader.loadMany(user.chatRooms.map(function (c) {
                return c._id.toString();
              })));

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", new Error(_context2.t0));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    function chatRooms(_x4, _x5, _x6) {
      return _chatRooms.apply(this, arguments);
    }

    return chatRooms;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL1VzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbnRhY3RzIiwicGFlcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwidXNlckxvYWRlciIsImxvYWQiLCJpZCIsInRvU3RyaW5nIiwidXNlciIsImxvYWRNYW55IiwibWFwIiwiYyIsIl9pZCIsIkVycm9yIiwiY2hhdFJvb21zIiwiY2hhdFJvb21Mb2FkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFHQSxJQUFNQSxJQUFJLEdBQUcsZ0NBQWUsTUFBZixDQUFiO2VBRWU7QUFDYkMsRUFBQUEsUUFBUTtBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBTUMsT0FBTixFQUFlQyxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQkMsY0FBQUEsT0FBdEIsUUFBc0JBLE9BQXRCO0FBQUE7QUFBQTtBQUFBLHFCQUVhQyx1QkFBV0MsSUFBWCxDQUFnQkosT0FBTyxDQUFDSyxFQUFSLENBQVdDLFFBQVgsRUFBaEIsQ0FGYjs7QUFBQTtBQUVBQyxjQUFBQSxJQUZBO0FBQUEsK0NBR0dKLHVCQUFXSyxRQUFYLENBQXFCRCxJQUFJLENBQUNSLFFBQUwsQ0FBY1UsR0FBZCxDQUFtQixVQUFBQyxDQUFDO0FBQUEsdUJBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNTCxRQUFOLEVBQUo7QUFBQSxlQUFwQixDQUFyQixDQUhIOztBQUFBO0FBQUE7QUFBQTtBQUFBLCtDQUtHLElBQUlNLEtBQUosYUFMSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLEtBREs7QUFTWEMsRUFBQUEsU0FBUztBQUFBO0FBQUE7QUFBQSw0QkFBRSxrQkFBTWIsT0FBTixFQUFlQyxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQkMsY0FBQUEsT0FBdEIsU0FBc0JBLE9BQXRCO0FBQUE7QUFBQTtBQUFBLHFCQUVVQyx1QkFBV0MsSUFBWCxDQUFnQkosT0FBTyxDQUFDSyxFQUFSLENBQVdDLFFBQVgsRUFBaEIsQ0FGVjs7QUFBQTtBQUVIQyxjQUFBQSxJQUZHO0FBQUEsZ0RBR0FPLDJCQUFlTixRQUFmLENBQXlCRCxJQUFJLENBQUNNLFNBQUwsQ0FBZUosR0FBZixDQUFvQixVQUFBQyxDQUFDO0FBQUEsdUJBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNTCxRQUFOLEVBQUo7QUFBQSxlQUFyQixDQUF6QixDQUhBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQUtBLElBQUlNLEtBQUosY0FMQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBVEUsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZXJMb2FkZXIsIGNoYXRSb29tTG9hZGVyIH0gZnJvbSBcIi4uL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbnRhY3RzOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChwYWVyZW50LmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiB1c2VyTG9hZGVyLmxvYWRNYW55KCB1c2VyLmNvbnRhY3RzLm1hcCggYyA9PiBjLl9pZC50b1N0cmluZygpICkpXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoYXRSb29tczogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQocGFlcmVudC5pZC50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gY2hhdFJvb21Mb2FkZXIubG9hZE1hbnkoIHVzZXIuY2hhdFJvb21zLm1hcCggYyA9PiBjLl9pZC50b1N0cmluZygpICkpICAgICAgICBcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSJdfQ==