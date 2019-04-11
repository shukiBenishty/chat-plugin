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
      var session, user, _groups2, startCursor, endCursor, edges;

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
              _context2.next = 7;
              return _dataLoader.groupLoader.loadMany(user.groups.map(function (g) {
                return g._id.toString();
              }));

            case 7:
              _groups2 = _context2.sent;
              startCursor = '';
              endCursor = '';
              edges = _groups2.map(function (group) {
                startCursor = startCursor || "".concat(group.id);
                endCursor = "".concat(endCursor.id);
                return {
                  cursor: "".concat(group.id),
                  node: group
                };
              });
              return _context2.abrupt("return", {
                edges: edges,
                totalCount: edges.length,
                pageInfo: {
                  startCursor: startCursor,
                  endCursor: endCursor,
                  hasNextPage: false
                }
              });

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", new Error(_context2.t0));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 14]]);
    }));

    function groups(_x4, _x5, _x6) {
      return _groups.apply(this, arguments);
    }

    return groups;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL1VzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbnRhY3RzIiwicGFlcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwidXNlckxvYWRlciIsImxvYWQiLCJpZCIsInRvU3RyaW5nIiwidXNlciIsImxvYWRNYW55IiwibWFwIiwiYyIsIl9pZCIsInVzZXJzIiwic3RhcnRDdXJzb3IiLCJlbmRDdXJzb3IiLCJlZGdlcyIsImNvbnRhY3QiLCJjdXJzb3IiLCJub2RlIiwidG90YWxDb3VudCIsImxlbmd0aCIsInBhZ2VJbmZvIiwiaGFzTmV4dFBhZ2UiLCJFcnJvciIsImdyb3VwcyIsImdyb3VwTG9hZGVyIiwiZyIsImdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBR0EsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtlQUVlO0FBQ2JDLEVBQUFBLFFBQVE7QUFBQTtBQUFBO0FBQUEsNEJBQUUsaUJBQU1DLE9BQU4sRUFBZUMsSUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0JDLGNBQUFBLE9BQXRCLFFBQXNCQSxPQUF0QjtBQUFBO0FBQUE7QUFBQSxxQkFFV0MsdUJBQVdDLElBQVgsQ0FBZ0JKLE9BQU8sQ0FBQ0ssRUFBUixDQUFXQyxRQUFYLEVBQWhCLENBRlg7O0FBQUE7QUFFRkMsY0FBQUEsSUFGRTtBQUFBO0FBQUEscUJBR1lKLHVCQUFXSyxRQUFYLENBQXFCRCxJQUFJLENBQUNSLFFBQUwsQ0FBY1UsR0FBZCxDQUFtQixVQUFBQyxDQUFDO0FBQUEsdUJBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNTCxRQUFOLEVBQUo7QUFBQSxlQUFwQixDQUFyQixDQUhaOztBQUFBO0FBR0ZNLGNBQUFBLEtBSEU7QUFLRkMsY0FBQUEsV0FMRSxHQUtZLEVBTFo7QUFNRkMsY0FBQUEsU0FORSxHQU1VLEVBTlY7QUFPRkMsY0FBQUEsS0FQRSxHQU9NSCxLQUFLLENBQUNILEdBQU4sQ0FBVSxVQUFBTyxPQUFPLEVBQUk7QUFDL0JILGdCQUFBQSxXQUFXLEdBQUdBLFdBQVcsY0FBT0csT0FBTyxDQUFDWCxFQUFmLENBQXpCO0FBQ0FTLGdCQUFBQSxTQUFTLGFBQU1BLFNBQVMsQ0FBQ1QsRUFBaEIsQ0FBVDtBQUNBLHVCQUFPO0FBQ0xZLGtCQUFBQSxNQUFNLFlBQUtELE9BQU8sQ0FBQ1gsRUFBYixDQUREO0FBRUxhLGtCQUFBQSxJQUFJLEVBQUVGO0FBRkQsaUJBQVA7QUFJRCxlQVBXLENBUE47QUFBQSwrQ0FlQztBQUNMRCxnQkFBQUEsS0FBSyxFQUFFQSxLQURGO0FBRUxJLGdCQUFBQSxVQUFVLEVBQUVKLEtBQUssQ0FBQ0ssTUFGYjtBQUdMQyxnQkFBQUEsUUFBUSxFQUFFO0FBQ1JSLGtCQUFBQSxXQUFXLEVBQUVBLFdBREw7QUFFUkMsa0JBQUFBLFNBQVMsRUFBRUEsU0FGSDtBQUdSUSxrQkFBQUEsV0FBVyxFQUFFO0FBSEw7QUFITCxlQWZEOztBQUFBO0FBQUE7QUFBQTtBQUFBLCtDQXlCQyxJQUFJQyxLQUFKLGFBekJEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsS0FESztBQTZCYkMsRUFBQUEsTUFBTTtBQUFBO0FBQUE7QUFBQSw0QkFBRSxrQkFBTXhCLE9BQU4sRUFBZUMsSUFBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNCQyxjQUFBQSxPQUF0QixTQUFzQkEsT0FBdEI7QUFBQTtBQUFBO0FBQUEscUJBRWFDLHVCQUFXQyxJQUFYLENBQWdCSixPQUFPLENBQUNLLEVBQVIsQ0FBV0MsUUFBWCxFQUFoQixDQUZiOztBQUFBO0FBRUFDLGNBQUFBLElBRkE7QUFBQTtBQUFBLHFCQUdla0Isd0JBQVlqQixRQUFaLENBQXNCRCxJQUFJLENBQUNpQixNQUFMLENBQVlmLEdBQVosQ0FBaUIsVUFBQWlCLENBQUM7QUFBQSx1QkFBSUEsQ0FBQyxDQUFDZixHQUFGLENBQU1MLFFBQU4sRUFBSjtBQUFBLGVBQWxCLENBQXRCLENBSGY7O0FBQUE7QUFHQWtCLGNBQUFBLFFBSEE7QUFLQVgsY0FBQUEsV0FMQSxHQUtjLEVBTGQ7QUFNQUMsY0FBQUEsU0FOQSxHQU1ZLEVBTlo7QUFPQUMsY0FBQUEsS0FQQSxHQU9RUyxRQUFNLENBQUNmLEdBQVAsQ0FBVyxVQUFBa0IsS0FBSyxFQUFJO0FBQzlCZCxnQkFBQUEsV0FBVyxHQUFHQSxXQUFXLGNBQU9jLEtBQUssQ0FBQ3RCLEVBQWIsQ0FBekI7QUFDQVMsZ0JBQUFBLFNBQVMsYUFBTUEsU0FBUyxDQUFDVCxFQUFoQixDQUFUO0FBQ0EsdUJBQU87QUFDTFksa0JBQUFBLE1BQU0sWUFBS1UsS0FBSyxDQUFDdEIsRUFBWCxDQUREO0FBRUxhLGtCQUFBQSxJQUFJLEVBQUVTO0FBRkQsaUJBQVA7QUFJRCxlQVBXLENBUFI7QUFBQSxnREFlRztBQUNMWixnQkFBQUEsS0FBSyxFQUFFQSxLQURGO0FBRUxJLGdCQUFBQSxVQUFVLEVBQUVKLEtBQUssQ0FBQ0ssTUFGYjtBQUdMQyxnQkFBQUEsUUFBUSxFQUFFO0FBQ1JSLGtCQUFBQSxXQUFXLEVBQUVBLFdBREw7QUFFUkMsa0JBQUFBLFNBQVMsRUFBRUEsU0FGSDtBQUdSUSxrQkFBQUEsV0FBVyxFQUFFO0FBSEw7QUFITCxlQWZIOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdEQXlCRyxJQUFJQyxLQUFKLGNBekJIOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUE3Qk8sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyIH0gZnJvbSBcIi4uL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbnRhY3RzOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHBhZXJlbnQuaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgIGxldCB1c2VycyA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZE1hbnkoIHVzZXIuY29udGFjdHMubWFwKCBjID0+IGMuX2lkLnRvU3RyaW5nKCkgKSlcclxuXHJcbiAgICAgIGxldCBzdGFydEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgZW5kQ3Vyc29yID0gJyc7XHJcbiAgICAgIGxldCBlZGdlcyA9IHVzZXJzLm1hcChjb250YWN0ID0+IHtcclxuICAgICAgICBzdGFydEN1cnNvciA9IHN0YXJ0Q3Vyc29yIHx8IGAke2NvbnRhY3QuaWR9YDtcclxuICAgICAgICBlbmRDdXJzb3IgPSBgJHtlbmRDdXJzb3IuaWR9YDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY3Vyc29yOiBgJHtjb250YWN0LmlkfWAsXHJcbiAgICAgICAgICBub2RlOiBjb250YWN0XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBlZGdlczogZWRnZXMsXHJcbiAgICAgICAgdG90YWxDb3VudDogZWRnZXMubGVuZ3RoLFxyXG4gICAgICAgIHBhZ2VJbmZvOiB7XHJcbiAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICBlbmRDdXJzb3I6IGVuZEN1cnNvcixcclxuICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgIH1cclxuICB9LFxyXG4gIGdyb3VwczogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChwYWVyZW50LmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICBsZXQgZ3JvdXBzID0gYXdhaXQgZ3JvdXBMb2FkZXIubG9hZE1hbnkoIHVzZXIuZ3JvdXBzLm1hcCggZyA9PiBnLl9pZC50b1N0cmluZygpICkpXHJcblxyXG4gICAgICBsZXQgc3RhcnRDdXJzb3IgPSAnJztcclxuICAgICAgbGV0IGVuZEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgZWRnZXMgPSBncm91cHMubWFwKGdyb3VwID0+IHtcclxuICAgICAgICBzdGFydEN1cnNvciA9IHN0YXJ0Q3Vyc29yIHx8IGAke2dyb3VwLmlkfWA7XHJcbiAgICAgICAgZW5kQ3Vyc29yID0gYCR7ZW5kQ3Vyc29yLmlkfWA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGN1cnNvcjogYCR7Z3JvdXAuaWR9YCxcclxuICAgICAgICAgIG5vZGU6IGdyb3VwXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBlZGdlczogZWRnZXMsXHJcbiAgICAgICAgdG90YWxDb3VudDogZWRnZXMubGVuZ3RoLFxyXG4gICAgICAgIHBhZ2VJbmZvOiB7XHJcbiAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICBlbmRDdXJzb3I6IGVuZEN1cnNvcixcclxuICAgICAgICAgIGhhc05leHRQYWdlOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgIH1cclxuICB9XHJcbn0iXX0=