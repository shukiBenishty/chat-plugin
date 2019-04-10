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
      var session, user, users, startCursor, endCursor, edges;
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
              _context.next = 7;
              return _dataLoader.userLoader.loadMany(user.contacts.map(function (c) {
                return c._id.toString();
              }));

            case 7:
              users = _context.sent;
              startCursor = '';
              endCursor = '';
              edges = users.map(function (contact) {
                startCursor = startCursor || "".concat(contact.id);
                endCursor = "".concat(endCursor.id);
                return {
                  cursor: "".concat(contact.id),
                  node: contact
                };
              });
              return _context.abrupt("return", {
                edges: edges,
                totalCount: edges.length,
                pageInfo: {
                  startCursor: startCursor,
                  endCursor: endCursor,
                  hasNextPage: false
                }
              });

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", new Error(_context.t0));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    }));

    function contacts(_x, _x2, _x3) {
      return _contacts.apply(this, arguments);
    }

    return contacts;
  }(),
  groups: function () {
    var _groups = _asyncToGenerator(
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
              return _context2.abrupt("return", _dataLoader.groupLoader.loadMany(user.groups.map(function (c) {
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

    function groups(_x4, _x5, _x6) {
      return _groups.apply(this, arguments);
    }

    return groups;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL1VzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbnRhY3RzIiwicGFlcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwidXNlckxvYWRlciIsImxvYWQiLCJpZCIsInRvU3RyaW5nIiwidXNlciIsImxvYWRNYW55IiwibWFwIiwiYyIsIl9pZCIsInVzZXJzIiwic3RhcnRDdXJzb3IiLCJlbmRDdXJzb3IiLCJlZGdlcyIsImNvbnRhY3QiLCJjdXJzb3IiLCJub2RlIiwidG90YWxDb3VudCIsImxlbmd0aCIsInBhZ2VJbmZvIiwiaGFzTmV4dFBhZ2UiLCJFcnJvciIsImdyb3VwcyIsImdyb3VwTG9hZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBR0EsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtlQUVlO0FBQ2JDLEVBQUFBLFFBQVE7QUFBQTtBQUFBO0FBQUEsNEJBQUUsaUJBQU1DLE9BQU4sRUFBZUMsSUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0JDLGNBQUFBLE9BQXRCLFFBQXNCQSxPQUF0QjtBQUFBO0FBQUE7QUFBQSxxQkFFYUMsdUJBQVdDLElBQVgsQ0FBZ0JKLE9BQU8sQ0FBQ0ssRUFBUixDQUFXQyxRQUFYLEVBQWhCLENBRmI7O0FBQUE7QUFFQUMsY0FBQUEsSUFGQTtBQUFBO0FBQUEscUJBR2NKLHVCQUFXSyxRQUFYLENBQXFCRCxJQUFJLENBQUNSLFFBQUwsQ0FBY1UsR0FBZCxDQUFtQixVQUFBQyxDQUFDO0FBQUEsdUJBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNTCxRQUFOLEVBQUo7QUFBQSxlQUFwQixDQUFyQixDQUhkOztBQUFBO0FBR0FNLGNBQUFBLEtBSEE7QUFLQUMsY0FBQUEsV0FMQSxHQUtjLEVBTGQ7QUFNQUMsY0FBQUEsU0FOQSxHQU1ZLEVBTlo7QUFPQUMsY0FBQUEsS0FQQSxHQU9RSCxLQUFLLENBQUNILEdBQU4sQ0FBVSxVQUFBTyxPQUFPLEVBQUk7QUFDL0JILGdCQUFBQSxXQUFXLEdBQUdBLFdBQVcsY0FBT0csT0FBTyxDQUFDWCxFQUFmLENBQXpCO0FBQ0FTLGdCQUFBQSxTQUFTLGFBQU1BLFNBQVMsQ0FBQ1QsRUFBaEIsQ0FBVDtBQUNBLHVCQUFPO0FBQ0xZLGtCQUFBQSxNQUFNLFlBQUtELE9BQU8sQ0FBQ1gsRUFBYixDQUREO0FBRUxhLGtCQUFBQSxJQUFJLEVBQUVGO0FBRkQsaUJBQVA7QUFJRCxlQVBXLENBUFI7QUFBQSwrQ0FlRztBQUNMRCxnQkFBQUEsS0FBSyxFQUFFQSxLQURGO0FBRUxJLGdCQUFBQSxVQUFVLEVBQUVKLEtBQUssQ0FBQ0ssTUFGYjtBQUdMQyxnQkFBQUEsUUFBUSxFQUFFO0FBQ1JSLGtCQUFBQSxXQUFXLEVBQUVBLFdBREw7QUFFUkMsa0JBQUFBLFNBQVMsRUFBRUEsU0FGSDtBQUdSUSxrQkFBQUEsV0FBVyxFQUFFO0FBSEw7QUFITCxlQWZIOztBQUFBO0FBQUE7QUFBQTtBQUFBLCtDQXlCRyxJQUFJQyxLQUFKLGFBekJIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsS0FESztBQTZCWEMsRUFBQUEsTUFBTTtBQUFBO0FBQUE7QUFBQSw0QkFBRSxrQkFBTXhCLE9BQU4sRUFBZUMsSUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0JDLGNBQUFBLE9BQXRCLFNBQXNCQSxPQUF0QjtBQUFBO0FBQUE7QUFBQSxxQkFFYUMsdUJBQVdDLElBQVgsQ0FBZ0JKLE9BQU8sQ0FBQ0ssRUFBUixDQUFXQyxRQUFYLEVBQWhCLENBRmI7O0FBQUE7QUFFQUMsY0FBQUEsSUFGQTtBQUFBLGdEQUdHa0Isd0JBQVlqQixRQUFaLENBQXNCRCxJQUFJLENBQUNpQixNQUFMLENBQVlmLEdBQVosQ0FBaUIsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNDLEdBQUYsQ0FBTUwsUUFBTixFQUFKO0FBQUEsZUFBbEIsQ0FBdEIsQ0FISDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREFLRyxJQUFJaUIsS0FBSixjQUxIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUE3QkssQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyIH0gZnJvbSBcIi4uL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbnRhY3RzOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChwYWVyZW50LmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGxldCB1c2VycyA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZE1hbnkoIHVzZXIuY29udGFjdHMubWFwKCBjID0+IGMuX2lkLnRvU3RyaW5nKCkgKSlcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0Q3Vyc29yID0gJyc7XHJcbiAgICAgICAgbGV0IGVuZEN1cnNvciA9ICcnO1xyXG4gICAgICAgIGxldCBlZGdlcyA9IHVzZXJzLm1hcChjb250YWN0ID0+IHtcclxuICAgICAgICAgIHN0YXJ0Q3Vyc29yID0gc3RhcnRDdXJzb3IgfHwgYCR7Y29udGFjdC5pZH1gO1xyXG4gICAgICAgICAgZW5kQ3Vyc29yID0gYCR7ZW5kQ3Vyc29yLmlkfWA7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjdXJzb3I6IGAke2NvbnRhY3QuaWR9YCxcclxuICAgICAgICAgICAgbm9kZTogY29udGFjdFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlZGdlczogZWRnZXMsXHJcbiAgICAgICAgICB0b3RhbENvdW50OiBlZGdlcy5sZW5ndGgsXHJcbiAgICAgICAgICBwYWdlSW5mbzoge1xyXG4gICAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICAgIGVuZEN1cnNvcjogZW5kQ3Vyc29yLFxyXG4gICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyb3VwczogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQocGFlcmVudC5pZC50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXBMb2FkZXIubG9hZE1hbnkoIHVzZXIuZ3JvdXBzLm1hcCggYyA9PiBjLl9pZC50b1N0cmluZygpICkpICAgICAgICBcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSJdfQ==