"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataLoader = require("./dataLoader");

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var _iterall = require("iterall");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var _default = {
  me: function me(_, args, _ref) {
    var session = _ref.session;
    return _dataLoader.userLoader.load(session.userId);
  },
  message: function message(_, args) {
    return _dataLoader.messageLoader.load(args.messageId);
  },
  contact: function contact(_, _ref2, _ref3) {
    var contactId = _ref2.contactId;
    var session = _ref3.session;
    return _dataLoader.userLoader.load(contactId);
  },
  contacts: function () {
    var _contacts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_, args, _ref4) {
      var session, user, myContacts, userIds, users;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref4.session;
              _context.next = 3;
              return _dataLoader.userLoader.load(session.userId.toString());

            case 3:
              user = _context.sent;
              _context.next = 6;
              return _dataLoader.userLoader.loadMany(user.contacts.map(function (c) {
                return c._id.toString();
              }));

            case 6:
              myContacts = _context.sent;
              userIds = myContacts.map(function (u) {
                return "".concat(u.id);
              });
              userIds.push("".concat(session.userId));
              _context.next = 11;
              return User.find({
                _id: {
                  $nin: userIds
                }
              });

            case 11:
              users = _context.sent;
              users.forEach(function (u) {
                _dataLoader.userLoader.prime("".concat(u.id), u);
              });
              return _context.abrupt("return", users);

            case 14:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1F1ZXJ5LmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwibWUiLCJfIiwiYXJncyIsInNlc3Npb24iLCJ1c2VyTG9hZGVyIiwibG9hZCIsInVzZXJJZCIsIm1lc3NhZ2UiLCJtZXNzYWdlTG9hZGVyIiwibWVzc2FnZUlkIiwiY29udGFjdCIsImNvbnRhY3RJZCIsImNvbnRhY3RzIiwidG9TdHJpbmciLCJ1c2VyIiwibG9hZE1hbnkiLCJtYXAiLCJjIiwiX2lkIiwibXlDb250YWN0cyIsInVzZXJJZHMiLCJ1IiwiaWQiLCJwdXNoIiwiZmluZCIsIiRuaW4iLCJ1c2VycyIsImZvckVhY2giLCJwcmltZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFDQSxJQUFNQyxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtlQUVlO0FBQ1hDLEVBQUFBLEVBQUUsRUFBRSxZQUFDQyxDQUFELEVBQUdDLElBQUgsUUFBdUI7QUFBQSxRQUFiQyxPQUFhLFFBQWJBLE9BQWE7QUFDekIsV0FBT0MsdUJBQVdDLElBQVgsQ0FBZ0JGLE9BQU8sQ0FBQ0csTUFBeEIsQ0FBUDtBQUNELEdBSFU7QUFJWEMsRUFBQUEsT0FBTyxFQUFFLGlCQUFDTixDQUFELEVBQUdDLElBQUgsRUFBWTtBQUNuQixXQUFPTSwwQkFBY0gsSUFBZCxDQUFtQkgsSUFBSSxDQUFDTyxTQUF4QixDQUFQO0FBQ0QsR0FOVTtBQU9YQyxFQUFBQSxPQUFPLEVBQUUsaUJBQUNULENBQUQsZ0JBQThCO0FBQUEsUUFBMUJVLFNBQTBCLFNBQTFCQSxTQUEwQjtBQUFBLFFBQWJSLE9BQWEsU0FBYkEsT0FBYTtBQUNyQyxXQUFPQyx1QkFBV0MsSUFBWCxDQUFnQk0sU0FBaEIsQ0FBUDtBQUNELEdBVFU7QUFVWEMsRUFBQUEsUUFBUTtBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBT1gsQ0FBUCxFQUFTQyxJQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFnQkMsY0FBQUEsT0FBaEIsU0FBZ0JBLE9BQWhCO0FBQUE7QUFBQSxxQkFDU0MsdUJBQVdDLElBQVgsQ0FBZ0JGLE9BQU8sQ0FBQ0csTUFBUixDQUFlTyxRQUFmLEVBQWhCLENBRFQ7O0FBQUE7QUFDSkMsY0FBQUEsSUFESTtBQUFBO0FBQUEscUJBRWVWLHVCQUFXVyxRQUFYLENBQXFCRCxJQUFJLENBQUNGLFFBQUwsQ0FBY0ksR0FBZCxDQUFtQixVQUFBQyxDQUFDO0FBQUEsdUJBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNTCxRQUFOLEVBQUo7QUFBQSxlQUFwQixDQUFyQixDQUZmOztBQUFBO0FBRUpNLGNBQUFBLFVBRkk7QUFHSkMsY0FBQUEsT0FISSxHQUdNRCxVQUFVLENBQUNILEdBQVgsQ0FBZSxVQUFBSyxDQUFDO0FBQUEsaUNBQU9BLENBQUMsQ0FBQ0MsRUFBVDtBQUFBLGVBQWhCLENBSE47QUFJUkYsY0FBQUEsT0FBTyxDQUFDRyxJQUFSLFdBQWdCcEIsT0FBTyxDQUFDRyxNQUF4QjtBQUpRO0FBQUEscUJBS1VSLElBQUksQ0FBQzBCLElBQUwsQ0FBVTtBQUFFTixnQkFBQUEsR0FBRyxFQUFFO0FBQUVPLGtCQUFBQSxJQUFJLEVBQUVMO0FBQVI7QUFBUCxlQUFWLENBTFY7O0FBQUE7QUFLSk0sY0FBQUEsS0FMSTtBQU1SQSxjQUFBQSxLQUFLLENBQUNDLE9BQU4sQ0FBYyxVQUFBTixDQUFDLEVBQUk7QUFDakJqQix1Q0FBV3dCLEtBQVgsV0FBb0JQLENBQUMsQ0FBQ0MsRUFBdEIsR0FBNEJELENBQTVCO0FBQ0QsZUFGRDtBQU5RLCtDQVNESyxLQVRDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFWRyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlckxvYWRlciwgbWVzc2FnZUxvYWRlciB9IGZyb20gXCIuL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi9tb25nb29zZU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcIml0ZXJhbGxcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1lOiAoXyxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogKF8sYXJncykgPT4ge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZUxvYWRlci5sb2FkKGFyZ3MubWVzc2FnZUlkKTtcclxuICAgIH0sXHJcbiAgICBjb250YWN0OiAoXyx7Y29udGFjdElkfSwge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHJldHVybiB1c2VyTG9hZGVyLmxvYWQoY29udGFjdElkKTtcclxuICAgIH0sXHJcbiAgICBjb250YWN0czogYXN5bmMgKF8sYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkLnRvU3RyaW5nKCkpO1xyXG4gICAgICBsZXQgbXlDb250YWN0cyA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZE1hbnkoIHVzZXIuY29udGFjdHMubWFwKCBjID0+IGMuX2lkLnRvU3RyaW5nKCkgKSlcclxuICAgICAgbGV0IHVzZXJJZHMgPSBteUNvbnRhY3RzLm1hcCh1ID0+IGAke3UuaWR9YClcclxuICAgICAgdXNlcklkcy5wdXNoKGAke3Nlc3Npb24udXNlcklkfWApXHJcbiAgICAgIGxldCB1c2VycyA9IGF3YWl0IFVzZXIuZmluZCh7IF9pZDogeyAkbmluOiB1c2VySWRzIH0gfSlcclxuICAgICAgdXNlcnMuZm9yRWFjaCh1ID0+IHtcclxuICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke3UuaWR9YCwgdSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdXNlcnM7XHJcbiAgICB9IFxyXG4gIH0iXX0=