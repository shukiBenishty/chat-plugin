"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageLoader = exports.groupLoader = exports.userLoader = void 0;

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');

var userLoader =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(userIds) {
    var users, results;
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
            results = [];
            userIds.forEach(function (userId, index) {
              var i = users.findIndex(function (c) {
                return c.id === userId;
              });

              if (i === -1) {
                results[index] = {};
              }

              results[index] = users[i];
            });
            return _context.abrupt("return", Promise.resolve(results));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userLoader(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.userLoader = userLoader;

var groupLoader =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(groupIds) {
    var groups, results;
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
            results = [];
            groupIds.forEach(function (groupId, index) {
              var i = groups.findIndex(function (c) {
                return c.id === groupId;
              });

              if (i === -1) {
                results[index] = {};
              }

              results[index] = groups[i];
            });
            return _context2.abrupt("return", Promise.resolve(results));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function groupLoader(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.groupLoader = groupLoader;

var messageLoader =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(messageIds) {
    var messages, results;
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
            results = [];
            messageIds.forEach(function (messageId, index) {
              var i = messages.findIndex(function (c) {
                return c.id === messageId;
              });

              if (i === -1) {
                results[index] = {};
              }

              results[index] = messages[i];
            });
            return _context3.abrupt("return", Promise.resolve(results));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function messageLoader(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.messageLoader = messageLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL2RhdGFMb2FkZXIvaW5kZXguanMiXSwibmFtZXMiOlsiVXNlciIsIk1lc3NhZ2UiLCJHcm91cCIsInVzZXJMb2FkZXIiLCJ1c2VySWRzIiwiZmluZCIsIl9pZCIsIiRpbiIsInVzZXJzIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXN1bHRzIiwiZm9yRWFjaCIsInVzZXJJZCIsImluZGV4IiwiaSIsImZpbmRJbmRleCIsImMiLCJpZCIsImdyb3VwTG9hZGVyIiwiZ3JvdXBJZHMiLCJwb3B1bGF0ZSIsImdyb3VwcyIsImdyb3VwSWQiLCJtZXNzYWdlTG9hZGVyIiwibWVzc2FnZUlkcyIsIm1lc3NhZ2VzIiwibWVzc2FnZUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUNBLElBQU1DLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO0FBQ0EsSUFBTUMsS0FBSyxHQUFHLGdDQUFlLE9BQWYsQ0FBZDs7QUFHTyxJQUFNQyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBSSxpQkFBTUMsT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNMSixJQUFJLENBQUNLLElBQUwsQ0FBVTtBQUFFQyxjQUFBQSxHQUFHLEVBQUU7QUFBRUMsZ0JBQUFBLEdBQUcsRUFBRUg7QUFBUDtBQUFQLGFBQVYsQ0FESzs7QUFBQTtBQUNuQkksWUFBQUEsS0FEbUI7O0FBQUEsa0JBRW5CQSxLQUFLLENBQUNDLE1BQU4sS0FBaUJMLE9BQU8sQ0FBQ0ssTUFGTjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw2Q0FHWkMsT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxLQUFoQixDQUhZOztBQUFBO0FBS25CSSxZQUFBQSxPQUxtQixHQUtULEVBTFM7QUFNdkJSLFlBQUFBLE9BQU8sQ0FBQ1MsT0FBUixDQUFpQixVQUFDQyxN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LENBQUNWLFNBQVQsQ0FBb0IsVUFBQUMsQ0FBQztBQUFBLHVCQUFJQSxDQUFDLENBQUNDLEVBQUYsS0FBU1MsU0FBYjtBQUFBLGVBQXJCLENBQVI7O0FBQ0Esa0JBQUtaLENBQUMsS0FBSyxDQUFDLENBQVosRUFBZ0I7QUFDWkosZ0JBQUFBLE9BQU8sQ0FBQ0csS0FBRCxDQUFQLEdBQWlCLEVBQWpCO0FBQ0g7O0FBQ0RILGNBQUFBLE9BQU8sQ0FBQ0csS0FBRCxDQUFQLEdBQWlCWSxRQUFRLENBQUNYLENBQUQsQ0FBekI7QUFDSCxhQU5EO0FBTnlCLDhDQWFsQk4sT0FBTyxDQUFDQyxPQUFSLENBQWdCQyxPQUFoQixDQWJrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFiYSxhQUFhO0FBQUE7QUFBQTtBQUFBLEdBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5jb25zdCBVc2VyID0gTW9uZ29vc2VNb2RlbHMoJ1VzZXInKTtcclxuY29uc3QgTWVzc2FnZSA9IE1vbmdvb3NlTW9kZWxzKCdNZXNzYWdlJyk7XHJcbmNvbnN0IEdyb3VwID0gTW9uZ29vc2VNb2RlbHMoJ0dyb3VwJyk7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJMb2FkZXIgPSAgYXN5bmMgdXNlcklkcyA9PiB7XHJcbiAgICBsZXQgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoeyBfaWQ6IHsgJGluOiB1c2VySWRzIH0gfSk7XHJcbiAgICBpZiAodXNlcnMubGVuZ3RoID09PSB1c2VySWRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXNlcnMpXHJcbiAgICB9XHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xyXG4gICAgdXNlcklkcy5mb3JFYWNoKCAodXNlcklkLCBpbmRleCApID0+IHtcclxuICAgICAgICBsZXQgaSA9IHVzZXJzLmZpbmRJbmRleCggYyA9PiBjLmlkID09PSB1c2VySWQgKVxyXG4gICAgICAgIGlmICggaSA9PT0gLTEgKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0ge307ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRzW2luZGV4XSA9IHVzZXJzW2ldO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0cylcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBncm91cExvYWRlciA9IGFzeW5jIGdyb3VwSWRzID0+IHtcclxuICAgIGxldCBncm91cHMgPSBhd2FpdCBHcm91cC5maW5kKHsgX2lkOiB7ICRpbjogZ3JvdXBJZHMgfSB9KS5wb3B1bGF0ZSgnc3Vic2NyaWJlcnMnKTtcclxuICAgIGlmIChncm91cHMubGVuZ3RoID09PSBncm91cElkcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdyb3VwcylcclxuICAgIH1cclxuICAgIGxldCByZXN1bHRzID0gW107XHJcblxyXG4gICAgZ3JvdXBJZHMuZm9yRWFjaCggKGdyb3VwSWQsIGluZGV4ICkgPT4ge1xyXG4gICAgICAgIGxldCBpID0gZ3JvdXBzLmZpbmRJbmRleCggYyA9PiBjLmlkID09PSBncm91cElkIClcclxuICAgICAgICBpZiAoIGkgPT09IC0xICkge1xyXG4gICAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHt9OyAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0c1tpbmRleF0gPSBncm91cHNbaV07XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHRzIClcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtZXNzYWdlTG9hZGVyID0gYXN5bmMgKG1lc3NhZ2VJZHMpID0+IHtcclxuICAgIGxldCBtZXNzYWdlcyA9IGF3YWl0IE1lc3NhZ2UuZmluZCh7IF9pZDogeyAkaW46IG1lc3NhZ2VJZHMgfSB9KS5wb3B1bGF0ZShcImF1dGhvclwiKS5wb3B1bGF0ZShcImRlc3RpbmF0aW9uXCIpO1xyXG4gICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gbWVzc2FnZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1lc3NhZ2VzKVxyXG4gICAgfVxyXG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcclxuICAgIG1lc3NhZ2VJZHMuZm9yRWFjaCggKG1lc3NhZ2VJZCwgaW5kZXggKSA9PiB7XHJcbiAgICAgICAgbGV0IGkgPSBtZXNzYWdlcy5maW5kSW5kZXgoIGMgPT4gYy5pZCA9PT0gbWVzc2FnZUlkIClcclxuICAgICAgICBpZiAoIGkgPT09IC0xICkge1xyXG4gICAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHt9OyAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0c1tpbmRleF0gPSBtZXNzYWdlc1tpXTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdHMgKVxyXG4gIH07XHJcbiJdfQ==