"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var _default = {
  me: function me(_, args, _ref) {
    var session = _ref.session,
        userLoader = _ref.userLoader;
    return userLoader.load(session.userId);
  },
  message: function message(_, args, _ref2) {
    var messageLoader = _ref2.messageLoader;
    return messageLoader.load(args.messageId);
  },
  contact: function contact(_, _ref3, _ref4) {
    var contactId = _ref3.contactId;
    var session = _ref4.session,
        userLoader = _ref4.userLoader;
    return userLoader.load(contactId);
  },
  group: function group(_, _ref5, _ref6) {
    var groupId = _ref5.groupId;
    var session = _ref6.session,
        groupLoader = _ref6.groupLoader;
    return groupLoader.load(groupId);
  },
  contacts: function () {
    var _contacts = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_, _ref7, _ref8) {
      var all, session, userLoader, _users, user, myContacts, userIds, users;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              all = _ref7.all;
              session = _ref8.session, userLoader = _ref8.userLoader;

              if (!all) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return User.find({
                _id: {
                  $nin: ["".concat(session.userId)]
                }
              });

            case 5:
              _users = _context.sent;

              _users.forEach(function (u) {
                userLoader.prime("".concat(u.id), u);
              });

              return _context.abrupt("return", _users);

            case 8:
              _context.next = 10;
              return userLoader.load(session.userId.toString());

            case 10:
              user = _context.sent;
              _context.next = 13;
              return userLoader.loadMany(user.contacts.map(function (c) {
                return c._id.toString();
              }));

            case 13:
              myContacts = _context.sent;
              userIds = myContacts.map(function (u) {
                return "".concat(u.id);
              });
              userIds.push("".concat(session.userId));
              _context.next = 18;
              return User.find({
                _id: {
                  $nin: userIds
                }
              });

            case 18:
              users = _context.sent;
              users.forEach(function (u) {
                userLoader.prime("".concat(u.id), u);
              });
              return _context.abrupt("return", users);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function contacts(_x, _x2, _x3) {
      return _contacts.apply(this, arguments);
    }

    return contacts;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1F1ZXJ5LmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwibWUiLCJfIiwiYXJncyIsInNlc3Npb24iLCJ1c2VyTG9hZGVyIiwibG9hZCIsInVzZXJJZCIsIm1lc3NhZ2UiLCJtZXNzYWdlTG9hZGVyIiwibWVzc2FnZUlkIiwiY29udGFjdCIsImNvbnRhY3RJZCIsImdyb3VwIiwiZ3JvdXBJZCIsImdyb3VwTG9hZGVyIiwiY29udGFjdHMiLCJhbGwiLCJmaW5kIiwiX2lkIiwiJG5pbiIsInVzZXJzIiwiZm9yRWFjaCIsInUiLCJwcmltZSIsImlkIiwidG9TdHJpbmciLCJ1c2VyIiwibG9hZE1hbnkiLCJtYXAiLCJjIiwibXlDb250YWN0cyIsInVzZXJJZHMiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBR0EsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUNBLElBQU1DLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO2VBRWU7QUFDWEMsRUFBQUEsRUFBRSxFQUFFLFlBQUNDLENBQUQsRUFBR0MsSUFBSCxRQUFtQztBQUFBLFFBQXpCQyxPQUF5QixRQUF6QkEsT0FBeUI7QUFBQSxRQUFoQkMsVUFBZ0IsUUFBaEJBLFVBQWdCO0FBQ3JDLFdBQU9BLFVBQVUsQ0FBQ0MsSUFBWCxDQUFnQkYsT0FBTyxDQUFDRyxNQUF4QixDQUFQO0FBQ0QsR0FIVTtBQUlYQyxFQUFBQSxPQUFPLEVBQUUsaUJBQUNOLENBQUQsRUFBR0MsSUFBSCxTQUE2QjtBQUFBLFFBQW5CTSxhQUFtQixTQUFuQkEsYUFBbUI7QUFDcEMsV0FBT0EsYUFBYSxDQUFDSCxJQUFkLENBQW1CSCxJQUFJLENBQUNPLFNBQXhCLENBQVA7QUFDRCxHQU5VO0FBT1hDLEVBQUFBLE9BQU8sRUFBRSxpQkFBQ1QsQ0FBRCxnQkFBMEM7QUFBQSxRQUF0Q1UsU0FBc0MsU0FBdENBLFNBQXNDO0FBQUEsUUFBekJSLE9BQXlCLFNBQXpCQSxPQUF5QjtBQUFBLFFBQWhCQyxVQUFnQixTQUFoQkEsVUFBZ0I7QUFDakQsV0FBT0EsVUFBVSxDQUFDQyxJQUFYLENBQWdCTSxTQUFoQixDQUFQO0FBQ0QsR0FUVTtBQVVYQyxFQUFBQSxLQUFLLEVBQUUsZUFBQ1gsQ0FBRCxnQkFBeUM7QUFBQSxRQUFyQ1ksT0FBcUMsU0FBckNBLE9BQXFDO0FBQUEsUUFBMUJWLE9BQTBCLFNBQTFCQSxPQUEwQjtBQUFBLFFBQWpCVyxXQUFpQixTQUFqQkEsV0FBaUI7QUFDOUMsV0FBT0EsV0FBVyxDQUFDVCxJQUFaLENBQWlCUSxPQUFqQixDQUFQO0FBQ0QsR0FaVTtBQWFYRSxFQUFBQSxRQUFRO0FBQUE7QUFBQTtBQUFBLGlDQUFFLGlCQUFPZCxDQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBVWUsY0FBQUEsR0FBVixTQUFVQSxHQUFWO0FBQWlCYixjQUFBQSxPQUFqQixTQUFpQkEsT0FBakIsRUFBMEJDLFVBQTFCLFNBQTBCQSxVQUExQjs7QUFBQSxtQkFDSlksR0FESTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUVZbEIsSUFBSSxDQUFDbUIsSUFBTCxDQUFVO0FBQUVDLGdCQUFBQSxHQUFHLEVBQUU7QUFBRUMsa0JBQUFBLElBQUksRUFBRSxXQUFJaEIsT0FBTyxDQUFDRyxNQUFaO0FBQVI7QUFBUCxlQUFWLENBRlo7O0FBQUE7QUFFRmMsY0FBQUEsTUFGRTs7QUFHTkEsY0FBQUEsTUFBSyxDQUFDQyxPQUFOLENBQWMsVUFBQUMsQ0FBQyxFQUFJO0FBQ2pCbEIsZ0JBQUFBLFVBQVUsQ0FBQ21CLEtBQVgsV0FBb0JELENBQUMsQ0FBQ0UsRUFBdEIsR0FBNEJGLENBQTVCO0FBQ0QsZUFGRDs7QUFITSwrQ0FNQ0YsTUFORDs7QUFBQTtBQUFBO0FBQUEscUJBUVNoQixVQUFVLENBQUNDLElBQVgsQ0FBZ0JGLE9BQU8sQ0FBQ0csTUFBUixDQUFlbUIsUUFBZixFQUFoQixDQVJUOztBQUFBO0FBUUpDLGNBQUFBLElBUkk7QUFBQTtBQUFBLHFCQVNldEIsVUFBVSxDQUFDdUIsUUFBWCxDQUFxQkQsSUFBSSxDQUFDWCxRQUFMLENBQWNhLEdBQWQsQ0FBbUIsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNYLEdBQUYsQ0FBTU8sUUFBTixFQUFKO0FBQUEsZUFBcEIsQ0FBckIsQ0FUZjs7QUFBQTtBQVNKSyxjQUFBQSxVQVRJO0FBVUpDLGNBQUFBLE9BVkksR0FVTUQsVUFBVSxDQUFDRixHQUFYLENBQWUsVUFBQU4sQ0FBQztBQUFBLGlDQUFPQSxDQUFDLENBQUNFLEVBQVQ7QUFBQSxlQUFoQixDQVZOO0FBV1JPLGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixXQUFnQjdCLE9BQU8sQ0FBQ0csTUFBeEI7QUFYUTtBQUFBLHFCQVlVUixJQUFJLENBQUNtQixJQUFMLENBQVU7QUFBRUMsZ0JBQUFBLEdBQUcsRUFBRTtBQUFFQyxrQkFBQUEsSUFBSSxFQUFFWTtBQUFSO0FBQVAsZUFBVixDQVpWOztBQUFBO0FBWUpYLGNBQUFBLEtBWkk7QUFhUkEsY0FBQUEsS0FBSyxDQUFDQyxPQUFOLENBQWMsVUFBQUMsQ0FBQyxFQUFJO0FBQ2pCbEIsZ0JBQUFBLFVBQVUsQ0FBQ21CLEtBQVgsV0FBb0JELENBQUMsQ0FBQ0UsRUFBdEIsR0FBNEJGLENBQTVCO0FBQ0QsZUFGRDtBQWJRLCtDQWdCREYsS0FoQkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWJHLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1lOiAoXyxhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICAgICAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogKF8sYXJncywge21lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlTG9hZGVyLmxvYWQoYXJncy5tZXNzYWdlSWQpO1xyXG4gICAgfSxcclxuICAgIGNvbnRhY3Q6IChfLHtjb250YWN0SWR9LCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICAgICAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChjb250YWN0SWQpO1xyXG4gICAgfSxcclxuICAgIGdyb3VwOiAoXyx7Z3JvdXBJZH0sIHtzZXNzaW9uLCBncm91cExvYWRlcn0pID0+IHtcclxuICAgICAgcmV0dXJuIGdyb3VwTG9hZGVyLmxvYWQoZ3JvdXBJZCk7XHJcbiAgICB9LFxyXG4gICAgY29udGFjdHM6IGFzeW5jIChfLHthbGx9LCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICAgICAgaWYgKGFsbCkge1xyXG4gICAgICAgIGxldCB1c2VycyA9IGF3YWl0IFVzZXIuZmluZCh7IF9pZDogeyAkbmluOiBbYCR7c2Vzc2lvbi51c2VySWR9YF0gfSB9KVxyXG4gICAgICAgIHVzZXJzLmZvckVhY2godSA9PiB7XHJcbiAgICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke3UuaWR9YCwgdSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHVzZXJzO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkLnRvU3RyaW5nKCkpO1xyXG4gICAgICBsZXQgbXlDb250YWN0cyA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZE1hbnkoIHVzZXIuY29udGFjdHMubWFwKCBjID0+IGMuX2lkLnRvU3RyaW5nKCkgKSlcclxuICAgICAgbGV0IHVzZXJJZHMgPSBteUNvbnRhY3RzLm1hcCh1ID0+IGAke3UuaWR9YClcclxuICAgICAgdXNlcklkcy5wdXNoKGAke3Nlc3Npb24udXNlcklkfWApXHJcbiAgICAgIGxldCB1c2VycyA9IGF3YWl0IFVzZXIuZmluZCh7IF9pZDogeyAkbmluOiB1c2VySWRzIH0gfSlcclxuICAgICAgdXNlcnMuZm9yRWFjaCh1ID0+IHtcclxuICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke3UuaWR9YCwgdSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdXNlcnM7XHJcbiAgICB9IFxyXG4gIH0iXX0=