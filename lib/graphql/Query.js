"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dataLoader = require("./dataLoader");

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var _default = {
  me: function () {
    var _me = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_, args, _ref) {
      var session;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref.session;
              return _context.abrupt("return", _dataLoader.userLoader.load(session.userId));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function me(_x, _x2, _x3) {
      return _me.apply(this, arguments);
    }

    return me;
  }(),
  message: function message(_, args) {
    return _dataLoader.messageLoader.load(args.messageId);
  },
  contact: function contact(_, _ref2, _ref3) {
    var contactId = _ref2.contactId;
    var session = _ref3.session;
    return _dataLoader.userLoader.load(contactId);
  } // messages: async (_,args) => {
  //   try {
  //     let messages = await Message.find({}).populate("author").populate("destination");
  //     messages.forEach(messages => {
  //       messageLoader.prime(`${messages.id}`, messages)
  //     })
  //     return messages;
  //   } catch (error) {
  //     return new Error(error)
  //   }
  // },

};
exports["default"] = _default;

var getEdges = function getEdges(messages, startCursor, endCursor) {
  return; // return [];
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1F1ZXJ5LmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwibWUiLCJfIiwiYXJncyIsInNlc3Npb24iLCJ1c2VyTG9hZGVyIiwibG9hZCIsInVzZXJJZCIsIm1lc3NhZ2UiLCJtZXNzYWdlTG9hZGVyIiwibWVzc2FnZUlkIiwiY29udGFjdCIsImNvbnRhY3RJZCIsImdldEVkZ2VzIiwibWVzc2FnZXMiLCJzdGFydEN1cnNvciIsImVuZEN1cnNvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFDQSxJQUFNQyxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtlQUVlO0FBQ1hDLEVBQUFBLEVBQUU7QUFBQTtBQUFBO0FBQUEsNEJBQUUsaUJBQU9DLENBQVAsRUFBU0MsSUFBVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0JDLGNBQUFBLE9BQWhCLFFBQWdCQSxPQUFoQjtBQUFBLCtDQUNLQyx1QkFBV0MsSUFBWCxDQUFnQkYsT0FBTyxDQUFDRyxNQUF4QixDQURMOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsS0FEUztBQUlYQyxFQUFBQSxPQUFPLEVBQUUsaUJBQUNOLENBQUQsRUFBR0MsSUFBSCxFQUFZO0FBQ25CLFdBQU9NLDBCQUFjSCxJQUFkLENBQW1CSCxJQUFJLENBQUNPLFNBQXhCLENBQVA7QUFDRCxHQU5VO0FBT1hDLEVBQUFBLE9BQU8sRUFBRSxpQkFBQ1QsQ0FBRCxnQkFBOEI7QUFBQSxRQUExQlUsU0FBMEIsU0FBMUJBLFNBQTBCO0FBQUEsUUFBYlIsT0FBYSxTQUFiQSxPQUFhO0FBQ3JDLFdBQU9DLHVCQUFXQyxJQUFYLENBQWdCTSxTQUFoQixDQUFQO0FBQ0QsR0FUVSxDQVVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBcEJXLEM7OztBQXlCYixJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxRQUFELEVBQVdDLFdBQVgsRUFBd0JDLFNBQXhCLEVBQXNDO0FBQ3JELFNBRHFELENBRXJEO0FBQ0QsQ0FIRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZXJMb2FkZXIsIG1lc3NhZ2VMb2FkZXIgfSBmcm9tIFwiLi9kYXRhTG9hZGVyXCI7XHJcbmltcG9ydCBNb25nb29zZU1vZGVscyBmcm9tIFwiLi4vbW9uZ29vc2VNb2RlbHNcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1lOiBhc3luYyAoXyxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgICAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogKF8sYXJncykgPT4ge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZUxvYWRlci5sb2FkKGFyZ3MubWVzc2FnZUlkKTtcclxuICAgIH0sXHJcbiAgICBjb250YWN0OiAoXyx7Y29udGFjdElkfSwge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHJldHVybiB1c2VyTG9hZGVyLmxvYWQoY29udGFjdElkKTtcclxuICAgIH0sXHJcbiAgICAvLyBtZXNzYWdlczogYXN5bmMgKF8sYXJncykgPT4ge1xyXG4gICAgLy8gICB0cnkge1xyXG4gICAgLy8gICAgIGxldCBtZXNzYWdlcyA9IGF3YWl0IE1lc3NhZ2UuZmluZCh7fSkucG9wdWxhdGUoXCJhdXRob3JcIikucG9wdWxhdGUoXCJkZXN0aW5hdGlvblwiKTtcclxuICAgIC8vICAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2VzID0+IHtcclxuICAgIC8vICAgICAgIG1lc3NhZ2VMb2FkZXIucHJpbWUoYCR7bWVzc2FnZXMuaWR9YCwgbWVzc2FnZXMpXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICByZXR1cm4gbWVzc2FnZXM7XHJcbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIFxyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0IGdldEVkZ2VzID0gKG1lc3NhZ2VzLCBzdGFydEN1cnNvciwgZW5kQ3Vyc29yKSA9PiB7XHJcbiAgICByZXR1cm4gXHJcbiAgICAvLyByZXR1cm4gW107XHJcbiAgfSJdfQ==