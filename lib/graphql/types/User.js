"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

var User = (0, _mongooseModels["default"])('User');
var _default = {
  contacts: function () {
    var _contacts = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(paerent, args, _ref) {
      var session, userLoader, user, users, startCursor, endCursor, edges;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref.session, userLoader = _ref.userLoader;
              _context.prev = 1;
              _context.next = 4;
              return userLoader.load(paerent.id.toString());

            case 4:
              user = _context.sent;
              _context.next = 7;
              return userLoader.loadMany(user.contacts.map(function (c) {
                return c._id.toString();
              }));

            case 7:
              users = _context.sent;
              startCursor = '';
              endCursor = '';
              edges = users.map(function (contact) {
                startCursor = startCursor || "".concat(contact.id);
                endCursor = "".concat(contact.id);
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
    var _groups = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(paerent, args, _ref2) {
      var session, userLoader, groupLoader, user, _groups2, startCursor, endCursor, edges;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              session = _ref2.session, userLoader = _ref2.userLoader, groupLoader = _ref2.groupLoader;
              _context2.prev = 1;
              _context2.next = 4;
              return userLoader.load(paerent.id.toString());

            case 4:
              user = _context2.sent;
              _context2.next = 7;
              return groupLoader.loadMany(user.groups.map(function (g) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL1VzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbnRhY3RzIiwicGFlcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwidXNlckxvYWRlciIsImxvYWQiLCJpZCIsInRvU3RyaW5nIiwidXNlciIsImxvYWRNYW55IiwibWFwIiwiYyIsIl9pZCIsInVzZXJzIiwic3RhcnRDdXJzb3IiLCJlbmRDdXJzb3IiLCJlZGdlcyIsImNvbnRhY3QiLCJjdXJzb3IiLCJub2RlIiwidG90YWxDb3VudCIsImxlbmd0aCIsInBhZ2VJbmZvIiwiaGFzTmV4dFBhZ2UiLCJFcnJvciIsImdyb3VwcyIsImdyb3VwTG9hZGVyIiwiZyIsImdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0EsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtlQUVlO0FBQ2JDLEVBQUFBLFFBQVE7QUFBQTtBQUFBO0FBQUEsaUNBQUUsaUJBQU1DLE9BQU4sRUFBZUMsSUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0JDLGNBQUFBLE9BQXRCLFFBQXNCQSxPQUF0QixFQUErQkMsVUFBL0IsUUFBK0JBLFVBQS9CO0FBQUE7QUFBQTtBQUFBLHFCQUVXQSxVQUFVLENBQUNDLElBQVgsQ0FBZ0JKLE9BQU8sQ0FBQ0ssRUFBUixDQUFXQyxRQUFYLEVBQWhCLENBRlg7O0FBQUE7QUFFRkMsY0FBQUEsSUFGRTtBQUFBO0FBQUEscUJBR1lKLFVBQVUsQ0FBQ0ssUUFBWCxDQUFxQkQsSUFBSSxDQUFDUixRQUFMLENBQWNVLEdBQWQsQ0FBbUIsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNDLEdBQUYsQ0FBTUwsUUFBTixFQUFKO0FBQUEsZUFBcEIsQ0FBckIsQ0FIWjs7QUFBQTtBQUdGTSxjQUFBQSxLQUhFO0FBS0ZDLGNBQUFBLFdBTEUsR0FLWSxFQUxaO0FBTUZDLGNBQUFBLFNBTkUsR0FNVSxFQU5WO0FBT0ZDLGNBQUFBLEtBUEUsR0FPTUgsS0FBSyxDQUFDSCxHQUFOLENBQVUsVUFBQU8sT0FBTyxFQUFJO0FBQy9CSCxnQkFBQUEsV0FBVyxHQUFHQSxXQUFXLGNBQU9HLE9BQU8sQ0FBQ1gsRUFBZixDQUF6QjtBQUNBUyxnQkFBQUEsU0FBUyxhQUFNRSxPQUFPLENBQUNYLEVBQWQsQ0FBVDtBQUNBLHVCQUFPO0FBQ0xZLGtCQUFBQSxNQUFNLFlBQUtELE9BQU8sQ0FBQ1gsRUFBYixDQUREO0FBRUxhLGtCQUFBQSxJQUFJLEVBQUVGO0FBRkQsaUJBQVA7QUFJRCxlQVBXLENBUE47QUFBQSwrQ0FlQztBQUNMRCxnQkFBQUEsS0FBSyxFQUFFQSxLQURGO0FBRUxJLGdCQUFBQSxVQUFVLEVBQUVKLEtBQUssQ0FBQ0ssTUFGYjtBQUdMQyxnQkFBQUEsUUFBUSxFQUFFO0FBQ1JSLGtCQUFBQSxXQUFXLEVBQUVBLFdBREw7QUFFUkMsa0JBQUFBLFNBQVMsRUFBRUEsU0FGSDtBQUdSUSxrQkFBQUEsV0FBVyxFQUFFO0FBSEw7QUFITCxlQWZEOztBQUFBO0FBQUE7QUFBQTtBQUFBLCtDQXlCQyxJQUFJQyxLQUFKLGFBekJEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsS0FESztBQTZCYkMsRUFBQUEsTUFBTTtBQUFBO0FBQUE7QUFBQSxpQ0FBRSxrQkFBTXhCLE9BQU4sRUFBZUMsSUFBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNCQyxjQUFBQSxPQUF0QixTQUFzQkEsT0FBdEIsRUFBK0JDLFVBQS9CLFNBQStCQSxVQUEvQixFQUEyQ3NCLFdBQTNDLFNBQTJDQSxXQUEzQztBQUFBO0FBQUE7QUFBQSxxQkFFYXRCLFVBQVUsQ0FBQ0MsSUFBWCxDQUFnQkosT0FBTyxDQUFDSyxFQUFSLENBQVdDLFFBQVgsRUFBaEIsQ0FGYjs7QUFBQTtBQUVBQyxjQUFBQSxJQUZBO0FBQUE7QUFBQSxxQkFHZWtCLFdBQVcsQ0FBQ2pCLFFBQVosQ0FBc0JELElBQUksQ0FBQ2lCLE1BQUwsQ0FBWWYsR0FBWixDQUFpQixVQUFBaUIsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNmLEdBQUYsQ0FBTUwsUUFBTixFQUFKO0FBQUEsZUFBbEIsQ0FBdEIsQ0FIZjs7QUFBQTtBQUdBa0IsY0FBQUEsUUFIQTtBQUtBWCxjQUFBQSxXQUxBLEdBS2MsRUFMZDtBQU1BQyxjQUFBQSxTQU5BLEdBTVksRUFOWjtBQU9BQyxjQUFBQSxLQVBBLEdBT1FTLFFBQU0sQ0FBQ2YsR0FBUCxDQUFXLFVBQUFrQixLQUFLLEVBQUk7QUFDOUJkLGdCQUFBQSxXQUFXLEdBQUdBLFdBQVcsY0FBT2MsS0FBSyxDQUFDdEIsRUFBYixDQUF6QjtBQUNBUyxnQkFBQUEsU0FBUyxhQUFNQSxTQUFTLENBQUNULEVBQWhCLENBQVQ7QUFDQSx1QkFBTztBQUNMWSxrQkFBQUEsTUFBTSxZQUFLVSxLQUFLLENBQUN0QixFQUFYLENBREQ7QUFFTGEsa0JBQUFBLElBQUksRUFBRVM7QUFGRCxpQkFBUDtBQUlELGVBUFcsQ0FQUjtBQUFBLGdEQWVHO0FBQ0xaLGdCQUFBQSxLQUFLLEVBQUVBLEtBREY7QUFFTEksZ0JBQUFBLFVBQVUsRUFBRUosS0FBSyxDQUFDSyxNQUZiO0FBR0xDLGdCQUFBQSxRQUFRLEVBQUU7QUFDUlIsa0JBQUFBLFdBQVcsRUFBRUEsV0FETDtBQUVSQyxrQkFBQUEsU0FBUyxFQUFFQSxTQUZIO0FBR1JRLGtCQUFBQSxXQUFXLEVBQUU7QUFITDtBQUhMLGVBZkg7O0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0RBeUJHLElBQUlDLEtBQUosY0F6Qkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTdCTyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbnRhY3RzOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHBhZXJlbnQuaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgIGxldCB1c2VycyA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZE1hbnkoIHVzZXIuY29udGFjdHMubWFwKCBjID0+IGMuX2lkLnRvU3RyaW5nKCkgKSlcclxuXHJcbiAgICAgIGxldCBzdGFydEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgZW5kQ3Vyc29yID0gJyc7XHJcbiAgICAgIGxldCBlZGdlcyA9IHVzZXJzLm1hcChjb250YWN0ID0+IHtcclxuICAgICAgICBzdGFydEN1cnNvciA9IHN0YXJ0Q3Vyc29yIHx8IGAke2NvbnRhY3QuaWR9YDtcclxuICAgICAgICBlbmRDdXJzb3IgPSBgJHtjb250YWN0LmlkfWA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGN1cnNvcjogYCR7Y29udGFjdC5pZH1gLFxyXG4gICAgICAgICAgbm9kZTogY29udGFjdFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZWRnZXM6IGVkZ2VzLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IGVkZ2VzLmxlbmd0aCxcclxuICAgICAgICBwYWdlSW5mbzoge1xyXG4gICAgICAgICAgc3RhcnRDdXJzb3I6IHN0YXJ0Q3Vyc29yLFxyXG4gICAgICAgICAgZW5kQ3Vyc29yOiBlbmRDdXJzb3IsXHJcbiAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3IpXHJcbiAgICB9XHJcbiAgfSxcclxuICBncm91cHM6IGFzeW5jKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlcn0pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHBhZXJlbnQuaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgIGxldCBncm91cHMgPSBhd2FpdCBncm91cExvYWRlci5sb2FkTWFueSggdXNlci5ncm91cHMubWFwKCBnID0+IGcuX2lkLnRvU3RyaW5nKCkgKSlcclxuXHJcbiAgICAgIGxldCBzdGFydEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgZW5kQ3Vyc29yID0gJyc7XHJcbiAgICAgIGxldCBlZGdlcyA9IGdyb3Vwcy5tYXAoZ3JvdXAgPT4ge1xyXG4gICAgICAgIHN0YXJ0Q3Vyc29yID0gc3RhcnRDdXJzb3IgfHwgYCR7Z3JvdXAuaWR9YDtcclxuICAgICAgICBlbmRDdXJzb3IgPSBgJHtlbmRDdXJzb3IuaWR9YDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY3Vyc29yOiBgJHtncm91cC5pZH1gLFxyXG4gICAgICAgICAgbm9kZTogZ3JvdXBcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGVkZ2VzOiBlZGdlcyxcclxuICAgICAgICB0b3RhbENvdW50OiBlZGdlcy5sZW5ndGgsXHJcbiAgICAgICAgcGFnZUluZm86IHtcclxuICAgICAgICAgIHN0YXJ0Q3Vyc29yOiBzdGFydEN1cnNvcixcclxuICAgICAgICAgIGVuZEN1cnNvcjogZW5kQ3Vyc29yLFxyXG4gICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==