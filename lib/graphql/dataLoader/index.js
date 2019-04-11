"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageLoader = exports.groupLoader = exports.userLoader = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');
var userLoader = new _dataloader["default"](
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(userIds) {
    var users, resolte;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.find({
              _id: {
                $in: userIds
              }
            });

          case 2:
            users = _context.sent;

            if (!(users.length === userIds.length)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", Promise.resolve(users));

          case 5:
            resolte = [];
            userIds.forEach(function (userId, index) {
              var i = users.findIndex(function (c) {
                return c.id === userId;
              });

              if (i === -1) {
                resolte[index] = {};
              }

              resolte[index] = users[i];
            });
            return _context.abrupt("return", Promise.resolve(resolte));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
exports.userLoader = userLoader;
var groupLoader = new _dataloader["default"](
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(groupIds) {
    var groups, resolte;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Group.find({
              _id: {
                $in: groupIds
              }
            }).populate('subscribers');

          case 2:
            groups = _context2.sent;

            if (!(groups.length === groupIds.length)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", Promise.resolve(groups));

          case 5:
            resolte = [];
            groupIds.forEach(function (groupId, index) {
              var i = groups.findIndex(function (c) {
                return c.id === groupId;
              });

              if (i === -1) {
                resolte[index] = {};
              }

              resolte[index] = groups[i];
            });
            return _context2.abrupt("return", Promise.resolve(resolte));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
exports.groupLoader = groupLoader;
var messageLoader = new _dataloader["default"](
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(messageIds) {
    var messages, resolte;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Message.find({
              _id: {
                $in: messageIds
              }
            }).populate("author").populate("destination");

          case 2:
            messages = _context3.sent;

            if (!(messages.length === messageIds.length)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", Promise.resolve(messages));

          case 5:
            resolte = [];
            messageIds.forEach(function (messageId, index) {
              var i = messages.findIndex(function (c) {
                return c.id === messageId;
              });

              if (i === -1) {
                resolte[index] = {};
              }

              resolte[index] = messages[i];
            });
            return _context3.abrupt("return", Promise.resolve(resolte));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
exports.messageLoader = messageLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL2RhdGFMb2FkZXIvaW5kZXguanMiXSwibmFtZXMiOlsiVXNlciIsIk1lc3NhZ2UiLCJHcm91cCIsInVzZXJMb2FkZXIiLCJEYXRhTG9hZGVyIiwidXNlcklkcyIsImZpbmQiLCJfaWQiLCIkaW4iLCJ1c2VycyIsImxlbmd0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzb2x0ZSIsImZvckVhY2giLCJ1c2VySWQiLCJpbmRleCIsImkiLCJmaW5kSW5kZXgiLCJjIiwiaWQiLCJncm91cExvYWRlciIsImdyb3VwSWRzIiwicG9wdWxhdGUiLCJncm91cHMiLCJncm91cElkIiwibWVzc2FnZUxvYWRlciIsIm1lc3NhZ2VJZHMiLCJtZXNzYWdlcyIsIm1lc3NhZ2VJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFDQSxJQUFNQyxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtBQUNBLElBQU1DLEtBQUssR0FBRyxnQ0FBZSxPQUFmLENBQWQ7QUFHTyxJQUFNQyxVQUFVLEdBQUcsSUFBSUMsc0JBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFnQixpQkFBTUMsT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNwQkwsSUFBSSxDQUFDTSxJQUFMLENBQVU7QUFBRUMsY0FBQUEsR0FBRyxFQUFFO0FBQUVDLGdCQUFBQSxHQUFHLEVBQUVIO0FBQVA7QUFBUCxhQUFWLENBRG9COztBQUFBO0FBQ2xDSSxZQUFBQSxLQURrQzs7QUFBQSxrQkFFbENBLEtBQUssQ0FBQ0MsTUFBTixLQUFpQkwsT0FBTyxDQUFDSyxNQUZTO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUczQkMsT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxLQUFoQixDQUgyQjs7QUFBQTtBQUtsQ0ksWUFBQUEsT0FMa0MsR0FLeEIsRUFMd0I7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WCxDQUFvQixVQUFDZSxTQUFELEVBQVliLEtBQVosRUFBdUI7QUFDdkMsa0JBQUlDLENBQUMsR0FBR1csUUFBUSxDQUFDVixTQUFULENBQW9CLFVBQUFDLENBQUM7QUFBQSx1QkFBSUEsQ0FBQyxDQUFDQyxFQUFGLEtBQVNTLFNBQWI7QUFBQSxlQUFyQixDQUFSOztBQUNBLGtCQUFLWixDQUFDLEtBQUssQ0FBQyxDQUFaLEVBQWdCO0FBQ1pKLGdCQUFBQSxPQUFPLENBQUNHLEtBQUQsQ0FBUCxHQUFpQixFQUFqQjtBQUNIOztBQUNESCxjQUFBQSxPQUFPLENBQUNHLEtBQUQsQ0FBUCxHQUFpQlksUUFBUSxDQUFDWCxDQUFELENBQXpCO0FBQ0gsYUFORDtBQU53Qyw4Q0FhakNOLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkMsT0FBaEIsQ0FiaUM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBZjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYXRhTG9hZGVyIGZyb20gJ2RhdGFsb2FkZXInO1xyXG5cclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuY29uc3QgVXNlciA9IE1vbmdvb3NlTW9kZWxzKCdVc2VyJyk7XHJcbmNvbnN0IE1lc3NhZ2UgPSBNb25nb29zZU1vZGVscygnTWVzc2FnZScpO1xyXG5jb25zdCBHcm91cCA9IE1vbmdvb3NlTW9kZWxzKCdHcm91cCcpO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyTG9hZGVyID0gbmV3IERhdGFMb2FkZXIoIGFzeW5jIHVzZXJJZHMgPT4ge1xyXG4gICAgbGV0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kKHsgX2lkOiB7ICRpbjogdXNlcklkcyB9IH0pO1xyXG4gICAgaWYgKHVzZXJzLmxlbmd0aCA9PT0gdXNlcklkcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVzZXJzKVxyXG4gICAgfVxyXG4gICAgbGV0IHJlc29sdGUgPSBbXTtcclxuICAgIHVzZXJJZHMuZm9yRWFjaCggKHVzZXJJZCwgaW5kZXggKSA9PiB7XHJcbiAgICAgICAgbGV0IGkgPSB1c2Vycy5maW5kSW5kZXgoIGMgPT4gYy5pZCA9PT0gdXNlcklkIClcclxuICAgICAgICBpZiAoIGkgPT09IC0xICkge1xyXG4gICAgICAgICAgICByZXNvbHRlW2luZGV4XSA9IHt9OyAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x0ZVtpbmRleF0gPSB1c2Vyc1tpXTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc29sdGUpXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdyb3VwTG9hZGVyID0gbmV3IERhdGFMb2FkZXIoYXN5bmMgZ3JvdXBJZHMgPT4ge1xyXG4gICAgbGV0IGdyb3VwcyA9IGF3YWl0IEdyb3VwLmZpbmQoeyBfaWQ6IHsgJGluOiBncm91cElkcyB9IH0pLnBvcHVsYXRlKCdzdWJzY3JpYmVycycpO1xyXG4gICAgaWYgKGdyb3Vwcy5sZW5ndGggPT09IGdyb3VwSWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZ3JvdXBzKVxyXG4gICAgfVxyXG4gICAgbGV0IHJlc29sdGUgPSBbXTtcclxuXHJcbiAgICBncm91cElkcy5mb3JFYWNoKCAoZ3JvdXBJZCwgaW5kZXggKSA9PiB7XHJcbiAgICAgICAgbGV0IGkgPSBncm91cHMuZmluZEluZGV4KCBjID0+IGMuaWQgPT09IGdyb3VwSWQgKVxyXG4gICAgICAgIGlmICggaSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJlc29sdGVbaW5kZXhdID0ge307ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHRlW2luZGV4XSA9IGdyb3Vwc1tpXTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc29sdGUgKVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBtZXNzYWdlTG9hZGVyID0gbmV3IERhdGFMb2FkZXIoYXN5bmMgKG1lc3NhZ2VJZHMpID0+IHtcclxuICAgIGxldCBtZXNzYWdlcyA9IGF3YWl0IE1lc3NhZ2UuZmluZCh7IF9pZDogeyAkaW46IG1lc3NhZ2VJZHMgfSB9KS5wb3B1bGF0ZShcImF1dGhvclwiKS5wb3B1bGF0ZShcImRlc3RpbmF0aW9uXCIpO1xyXG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gbWVzc2FnZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1lc3NhZ2VzKVxyXG4gICAgfVxyXG4gICAgbGV0IHJlc29sdGUgPSBbXTtcclxuICAgIG1lc3NhZ2VJZHMuZm9yRWFjaCggKG1lc3NhZ2VJZCwgaW5kZXggKSA9PiB7XHJcbiAgICAgICAgbGV0IGkgPSBtZXNzYWdlcy5maW5kSW5kZXgoIGMgPT4gYy5pZCA9PT0gbWVzc2FnZUlkIClcclxuICAgICAgICBpZiAoIGkgPT09IC0xICkge1xyXG4gICAgICAgICAgICByZXNvbHRlW2luZGV4XSA9IHt9OyAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x0ZVtpbmRleF0gPSBtZXNzYWdlc1tpXTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc29sdGUgKVxyXG4gIH0pO1xyXG4iXX0=