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
            });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL2RhdGFMb2FkZXIvaW5kZXguanMiXSwibmFtZXMiOlsiVXNlciIsIk1lc3NhZ2UiLCJHcm91cCIsInVzZXJMb2FkZXIiLCJEYXRhTG9hZGVyIiwidXNlcklkcyIsImZpbmQiLCJfaWQiLCIkaW4iLCJ1c2VycyIsImxlbmd0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzb2x0ZSIsImZvckVhY2giLCJ1c2VySWQiLCJpbmRleCIsImkiLCJmaW5kSW5kZXgiLCJjIiwiaWQiLCJncm91cExvYWRlciIsImdyb3VwSWRzIiwiZ3JvdXBzIiwiZ3JvdXBJZCIsIm1lc3NhZ2VMb2FkZXIiLCJtZXNzYWdlSWRzIiwicG9wdWxhdGUiLCJtZXNzYWdlcyIsIm1lc3NhZ2VJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7QUFDQSxJQUFNQyxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtBQUNBLElBQU1DLEtBQUssR0FBRyxnQ0FBZSxPQUFmLENBQWQ7QUFHTyxJQUFNQyxVQUFVLEdBQUcsSUFBSUMsc0JBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFnQixpQkFBTUMsT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNwQkwsSUFBSSxDQUFDTSxJQUFMLENBQVU7QUFBRUMsY0FBQUEsR0FBRyxFQUFFO0FBQUVDLGdCQUFBQSxHQUFHLEVBQUVIO0FBQVA7QUFBUCxhQUFWLENBRG9COztBQUFBO0FBQ2xDSSxZQUFBQSxLQURrQzs7QUFBQSxrQkFFbENBLEtBQUssQ0FBQ0MsTUFBTixLQUFpQkwsT0FBTyxDQUFDSyxNQUZTO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUczQkMsT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxLQUFoQixDQUgyQjs7QUFBQTtBQUtsQ0ksWUFBQUEsT0FMa0MsR0FLeEIsRUFMd0I7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S0FBWixFQUF1QjtBQUN2QyxrQkFBSUMsQ0FBQyxHQUFHVyxRQUFRLENBQUNWLFNBQVQsQ0FBb0IsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNDLEVBQUYsS0FBU1MsU0FBYjtBQUFBLGVBQXJCLENBQVI7O0FBQ0Esa0JBQUtaLENBQUMsS0FBSyxDQUFDLENBQVosRUFBZ0I7QUFDWkosZ0JBQUFBLE9BQU8sQ0FBQ0csS0FBRCxDQUFQLEdBQWlCLEVBQWpCO0FBQ0g7O0FBQ0RILGNBQUFBLE9BQU8sQ0FBQ0csS0FBRCxDQUFQLEdBQWlCWSxRQUFRLENBQUNYLENBQUQsQ0FBekI7QUFDSCxhQU5EO0FBTndDLDhDQWFqQ04sT0FBTyxDQUFDQyxPQUFSLENBQWdCQyxPQUFoQixDQWJpQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFmOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFMb2FkZXIgZnJvbSAnZGF0YWxvYWRlcic7XHJcblxyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5jb25zdCBVc2VyID0gTW9uZ29vc2VNb2RlbHMoJ1VzZXInKTtcclxuY29uc3QgTWVzc2FnZSA9IE1vbmdvb3NlTW9kZWxzKCdNZXNzYWdlJyk7XHJcbmNvbnN0IEdyb3VwID0gTW9uZ29vc2VNb2RlbHMoJ0dyb3VwJyk7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJMb2FkZXIgPSBuZXcgRGF0YUxvYWRlciggYXN5bmMgdXNlcklkcyA9PiB7XHJcbiAgICBsZXQgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoeyBfaWQ6IHsgJGluOiB1c2VySWRzIH0gfSk7XHJcbiAgICBpZiAodXNlcnMubGVuZ3RoID09PSB1c2VySWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXNlcnMpXHJcbiAgICB9XHJcbiAgICBsZXQgcmVzb2x0ZSA9IFtdO1xyXG4gICAgdXNlcklkcy5mb3JFYWNoKCAodXNlcklkLCBpbmRleCApID0+IHtcclxuICAgICAgICBsZXQgaSA9IHVzZXJzLmZpbmRJbmRleCggYyA9PiBjLmlkID09PSB1c2VySWQgKVxyXG4gICAgICAgIGlmICggaSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJlc29sdGVbaW5kZXhdID0ge307ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHRlW2luZGV4XSA9IHVzZXJzW2ldO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzb2x0ZSlcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgZ3JvdXBMb2FkZXIgPSBuZXcgRGF0YUxvYWRlcihhc3luYyBncm91cElkcyA9PiB7XHJcbiAgICBsZXQgZ3JvdXBzID0gYXdhaXQgR3JvdXAuZmluZCh7IF9pZDogeyAkaW46IGdyb3VwSWRzIH0gfSk7XHJcbiAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gZ3JvdXBJZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShncm91cHMpXHJcbiAgICB9XHJcbiAgICBsZXQgcmVzb2x0ZSA9IFtdO1xyXG5cclxuICAgIGdyb3VwSWRzLmZvckVhY2goIChncm91cElkLCBpbmRleCApID0+IHtcclxuICAgICAgICBsZXQgaSA9IGdyb3Vwcy5maW5kSW5kZXgoIGMgPT4gYy5pZCA9PT0gZ3JvdXBJZCApXHJcbiAgICAgICAgaWYgKCBpID09PSAtMSApIHtcclxuICAgICAgICAgICAgcmVzb2x0ZVtpbmRleF0gPSB7fTsgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc29sdGVbaW5kZXhdID0gZ3JvdXBzW2ldO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzb2x0ZSApXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lc3NhZ2VMb2FkZXIgPSBuZXcgRGF0YUxvYWRlcihhc3luYyAobWVzc2FnZUlkcykgPT4ge1xyXG4gICAgbGV0IG1lc3NhZ2VzID0gYXdhaXQgTWVzc2FnZS5maW5kKHsgX2lkOiB7ICRpbjogbWVzc2FnZUlkcyB9IH0pLnBvcHVsYXRlKFwiYXV0aG9yXCIpLnBvcHVsYXRlKFwiZGVzdGluYXRpb25cIik7XHJcbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSBtZXNzYWdlSWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWVzc2FnZXMpXHJcbiAgICB9XHJcbiAgICBsZXQgcmVzb2x0ZSA9IFtdO1xyXG4gICAgbWVzc2FnZUlkcy5mb3JFYWNoKCAobWVzc2FnZUlkLCBpbmRleCApID0+IHtcclxuICAgICAgICBsZXQgaSA9IG1lc3NhZ2VzLmZpbmRJbmRleCggYyA9PiBjLmlkID09PSBtZXNzYWdlSWQgKVxyXG4gICAgICAgIGlmICggaSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJlc29sdGVbaW5kZXhdID0ge307ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHRlW2luZGV4XSA9IG1lc3NhZ2VzW2ldO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzb2x0ZSApXHJcbiAgfSk7XHJcbiJdfQ==