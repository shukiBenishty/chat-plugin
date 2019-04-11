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
  group: function group(_, _ref4, _ref5) {
    var groupId = _ref4.groupId;
    var session = _ref5.session;
    return groupLoader.load(groupId);
  },
  contacts: function () {
    var _contacts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_, args, _ref6) {
      var session, user, myContacts, userIds, users;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref6.session;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1F1ZXJ5LmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwibWUiLCJfIiwiYXJncyIsInNlc3Npb24iLCJ1c2VyTG9hZGVyIiwibG9hZCIsInVzZXJJZCIsIm1lc3NhZ2UiLCJtZXNzYWdlTG9hZGVyIiwibWVzc2FnZUlkIiwiY29udGFjdCIsImNvbnRhY3RJZCIsImdyb3VwIiwiZ3JvdXBJZCIsImdyb3VwTG9hZGVyIiwiY29udGFjdHMiLCJ0b1N0cmluZyIsInVzZXIiLCJsb2FkTWFueSIsIm1hcCIsImMiLCJfaWQiLCJteUNvbnRhY3RzIiwidXNlcklkcyIsInUiLCJpZCIsInB1c2giLCJmaW5kIiwiJG5pbiIsInVzZXJzIiwiZm9yRWFjaCIsInByaW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUNBLElBQU1DLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO2VBRWU7QUFDWEMsRUFBQUEsRUFBRSxFQUFFLFlBQUNDLENBQUQsRUFBR0MsSUFBSCxRQUF1QjtBQUFBLFFBQWJDLE9BQWEsUUFBYkEsT0FBYTtBQUN6QixXQUFPQyx1QkFBV0MsSUFBWCxDQUFnQkYsT0FBTyxDQUFDRyxNQUF4QixDQUFQO0FBQ0QsR0FIVTtBQUlYQyxFQUFBQSxPQUFPLEVBQUUsaUJBQUNOLENBQUQsRUFBR0MsSUFBSCxFQUFZO0FBQ25CLFdBQU9NLDBCQUFjSCxJQUFkLENBQW1CSCxJQUFJLENBQUNPLFNBQXhCLENBQVA7QUFDRCxHQU5VO0FBT1hDLEVBQUFBLE9BQU8sRUFBRSxpQkFBQ1QsQ0FBRCxnQkFBOEI7QUFBQSxRQUExQlUsU0FBMEIsU0FBMUJBLFNBQTBCO0FBQUEsUUFBYlIsT0FBYSxTQUFiQSxPQUFhO0FBQ3JDLFdBQU9DLHVCQUFXQyxJQUFYLENBQWdCTSxTQUFoQixDQUFQO0FBQ0QsR0FUVTtBQVVYQyxFQUFBQSxLQUFLLEVBQUUsZUFBQ1gsQ0FBRCxnQkFBNEI7QUFBQSxRQUF4QlksT0FBd0IsU0FBeEJBLE9BQXdCO0FBQUEsUUFBYlYsT0FBYSxTQUFiQSxPQUFhO0FBQ2pDLFdBQU9XLFdBQVcsQ0FBQ1QsSUFBWixDQUFpQlEsT0FBakIsQ0FBUDtBQUNELEdBWlU7QUFhWEUsRUFBQUEsUUFBUTtBQUFBO0FBQUE7QUFBQSw0QkFBRSxpQkFBT2QsQ0FBUCxFQUFTQyxJQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFnQkMsY0FBQUEsT0FBaEIsU0FBZ0JBLE9BQWhCO0FBQUE7QUFBQSxxQkFDU0MsdUJBQVdDLElBQVgsQ0FBZ0JGLE9BQU8sQ0FBQ0csTUFBUixDQUFlVSxRQUFmLEVBQWhCLENBRFQ7O0FBQUE7QUFDSkMsY0FBQUEsSUFESTtBQUFBO0FBQUEscUJBRWViLHVCQUFXYyxRQUFYLENBQXFCRCxJQUFJLENBQUNGLFFBQUwsQ0FBY0ksR0FBZCxDQUFtQixVQUFBQyxDQUFDO0FBQUEsdUJBQUlBLENBQUMsQ0FBQ0MsR0FBRixDQUFNTCxRQUFOLEVBQUo7QUFBQSxlQUFwQixDQUFyQixDQUZmOztBQUFBO0FBRUpNLGNBQUFBLFVBRkk7QUFHSkMsY0FBQUEsT0FISSxHQUdNRCxVQUFVLENBQUNILEdBQVgsQ0FBZSxVQUFBSyxDQUFDO0FBQUEsaUNBQU9BLENBQUMsQ0FBQ0MsRUFBVDtBQUFBLGVBQWhCLENBSE47QUFJUkYsY0FBQUEsT0FBTyxDQUFDRyxJQUFSLFdBQWdCdkIsT0FBTyxDQUFDRyxNQUF4QjtBQUpRO0FBQUEscUJBS1VSLElBQUksQ0FBQzZCLElBQUwsQ0FBVTtBQUFFTixnQkFBQUEsR0FBRyxFQUFFO0FBQUVPLGtCQUFBQSxJQUFJLEVBQUVMO0FBQVI7QUFBUCxlQUFWLENBTFY7O0FBQUE7QUFLSk0sY0FBQUEsS0FMSTtBQU1SQSxjQUFBQSxLQUFLLENBQUNDLE9BQU4sQ0FBYyxVQUFBTixDQUFDLEVBQUk7QUFDakJwQix1Q0FBVzJCLEtBQVgsV0FBb0JQLENBQUMsQ0FBQ0MsRUFBdEIsR0FBNEJELENBQTVCO0FBQ0QsZUFGRDtBQU5RLCtDQVNESyxLQVRDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFiRyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlckxvYWRlciwgbWVzc2FnZUxvYWRlciB9IGZyb20gXCIuL2RhdGFMb2FkZXJcIjtcclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi9tb25nb29zZU1vZGVsc1wiO1xyXG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcIml0ZXJhbGxcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1lOiAoXyxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogKF8sYXJncykgPT4ge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZUxvYWRlci5sb2FkKGFyZ3MubWVzc2FnZUlkKTtcclxuICAgIH0sXHJcbiAgICBjb250YWN0OiAoXyx7Y29udGFjdElkfSwge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHJldHVybiB1c2VyTG9hZGVyLmxvYWQoY29udGFjdElkKTtcclxuICAgIH0sXHJcbiAgICBncm91cDogKF8se2dyb3VwSWR9LCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgcmV0dXJuIGdyb3VwTG9hZGVyLmxvYWQoZ3JvdXBJZCk7XHJcbiAgICB9LFxyXG4gICAgY29udGFjdHM6IGFzeW5jIChfLGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gICAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZC50b1N0cmluZygpKTtcclxuICAgICAgbGV0IG15Q29udGFjdHMgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWRNYW55KCB1c2VyLmNvbnRhY3RzLm1hcCggYyA9PiBjLl9pZC50b1N0cmluZygpICkpXHJcbiAgICAgIGxldCB1c2VySWRzID0gbXlDb250YWN0cy5tYXAodSA9PiBgJHt1LmlkfWApXHJcbiAgICAgIHVzZXJJZHMucHVzaChgJHtzZXNzaW9uLnVzZXJJZH1gKVxyXG4gICAgICBsZXQgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoeyBfaWQ6IHsgJG5pbjogdXNlcklkcyB9IH0pXHJcbiAgICAgIHVzZXJzLmZvckVhY2godSA9PiB7XHJcbiAgICAgICAgdXNlckxvYWRlci5wcmltZShgJHt1LmlkfWAsIHUpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHVzZXJzO1xyXG4gICAgfSBcclxuICB9Il19