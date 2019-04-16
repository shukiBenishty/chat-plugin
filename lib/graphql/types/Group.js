"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');
var _default = {
  __isTypeOf: function __isTypeOf(obj) {
    if (obj.subscribers) return "Group";
    return null;
  },
  messages: function () {
    var _messages = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref, _ref2, _ref3) {
      var id, last, before, session, messageLoader, messages, endCursor, startCursor, edges, hasPreviousPage, query, totalCount, restOfMessages;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              last = _ref2.last, before = _ref2.before;
              session = _ref3.session, messageLoader = _ref3.messageLoader;
              messages = [];
              endCursor = '';
              startCursor = '';
              edges = [];
              hasPreviousPage = false;
              query = {
                destination: id
              };
              _context.prev = 9;
              _context.next = 12;
              return Message.countDocuments(query);

            case 12:
              totalCount = _context.sent;

              if (!before) {
                _context.next = 19;
                break;
              }

              _context.next = 16;
              return Message.find({
                $and: [{
                  _id: {
                    $lt: before
                  }
                }, query]
              }).sort({
                _id: 'desc'
              }).limit(last).populate("author").populate("destination");

            case 16:
              _context.t0 = _context.sent;
              _context.next = 22;
              break;

            case 19:
              _context.next = 21;
              return Message.find(query).sort({
                _id: 'desc'
              }).limit(last).populate("author").populate("destination");

            case 21:
              _context.t0 = _context.sent;

            case 22:
              messages = _context.t0;

              if (!(messages.length !== 0)) {
                _context.next = 30;
                break;
              }

              edges = messages.map(function (message) {
                messageLoader.prime("".concat(message.id), message);
                endCursor = endCursor || "".concat(message.id);
                startCursor = "".concat(message.id);
                return {
                  cursor: "".concat(message.id),
                  node: message
                };
              });
              edges.reverse();
              _context.next = 28;
              return Message.countDocuments({
                $and: [{
                  _id: {
                    $lt: startCursor
                  }
                }, query]
              });

            case 28:
              restOfMessages = _context.sent;
              hasPreviousPage = restOfMessages > 0 ? true : false;

            case 30:
              return _context.abrupt("return", {
                edges: edges,
                totalCount: totalCount,
                pageInfo: {
                  startCursor: startCursor,
                  endCursor: endCursor,
                  hasPreviousPage: hasPreviousPage
                }
              });

            case 33:
              _context.prev = 33;
              _context.t1 = _context["catch"](9);
              console.error(_context.t1);

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 33]]);
    }));

    function messages(_x, _x2, _x3) {
      return _messages.apply(this, arguments);
    }

    return messages;
  }(),
  subscribers: function () {
    var _subscribers = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(paerent, args, _ref4) {
      var session, userLoader, groupLoader, group, users, startCursor, endCursor, edges;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              session = _ref4.session, userLoader = _ref4.userLoader, groupLoader = _ref4.groupLoader;
              _context2.prev = 1;
              _context2.next = 4;
              return groupLoader.load(paerent.id.toString());

            case 4:
              group = _context2.sent;
              _context2.next = 7;
              return userLoader.loadMany(group.subscribers.map(function (s) {
                return s._id.toString();
              }));

            case 7:
              users = _context2.sent;
              startCursor = '';
              endCursor = '';
              edges = users.map(function (subscriber) {
                startCursor = startCursor || "".concat(subscriber.id);
                endCursor = "".concat(subscriber.id);
                return {
                  cursor: "".concat(subscriber.id),
                  node: subscriber
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

    function subscribers(_x4, _x5, _x6) {
      return _subscribers.apply(this, arguments);
    }

    return subscribers;
  }(),
  newMessages: function newMessages(paerent, args, _ref5) {
    var session = _ref5.session;
    return 0; // return Message.countDocuments({
    //   $and:[ 
    //     {destination: paerent.id}, 
    //     {readed: false}
    //   ]
    // });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL0dyb3VwLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJHcm91cCIsIl9faXNUeXBlT2YiLCJvYmoiLCJzdWJzY3JpYmVycyIsIm1lc3NhZ2VzIiwiaWQiLCJsYXN0IiwiYmVmb3JlIiwic2Vzc2lvbiIsIm1lc3NhZ2VMb2FkZXIiLCJlbmRDdXJzb3IiLCJzdGFydEN1cnNvciIsImVkZ2VzIiwiaGFzUHJldmlvdXNQYWdlIiwicXVlcnkiLCJkZXN0aW5hdGlvbiIsImNvdW50RG9jdW1lbnRzIiwidG90YWxDb3VudCIsImZpbmQiLCIkYW5kIiwiX2lkIiwiJGx0Iiwic29ydCIsImxpbWl0IiwicG9wdWxhdGUiLCJsZW5ndGgiLCJtYXAiLCJtZXNzYWdlIiwicHJpbWUiLCJjdXJzb3IiLCJub2RlIiwicmV2ZXJzZSIsInJlc3RPZk1lc3NhZ2VzIiwicGFnZUluZm8iLCJjb25zb2xlIiwiZXJyb3IiLCJwYWVyZW50IiwiYXJncyIsInVzZXJMb2FkZXIiLCJncm91cExvYWRlciIsImxvYWQiLCJ0b1N0cmluZyIsImdyb3VwIiwibG9hZE1hbnkiLCJzIiwidXNlcnMiLCJzdWJzY3JpYmVyIiwiaGFzTmV4dFBhZ2UiLCJFcnJvciIsIm5ld01lc3NhZ2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsT0FBTyxHQUFHLGdDQUFlLFNBQWYsQ0FBaEI7QUFDQSxJQUFNQyxLQUFLLEdBQUcsZ0NBQWUsT0FBZixDQUFkO2VBRWU7QUFDWEMsRUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQVM7QUFDbkIsUUFBSUEsR0FBRyxDQUFDQyxXQUFSLEVBQ0UsT0FBTyxPQUFQO0FBQ0YsV0FBTyxJQUFQO0FBQ0QsR0FMVTtBQU1YQyxFQUFBQSxRQUFRO0FBQUE7QUFBQTtBQUFBLGlDQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFRQyxjQUFBQSxFQUFSLFFBQVFBLEVBQVI7QUFBZUMs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LEVBQWhCLENBREQ7QUFFTHlCLGtCQUFBQSxJQUFJLEVBQUVnQjtBQUZELGlCQUFQO0FBSUQsZUFQVyxDQVBIO0FBQUEsZ0RBZUY7QUFDTGxDLGdCQUFBQSxLQUFLLEVBQUVBLEtBREY7QUFFTEssZ0JBQUFBLFVBQVUsRUFBRUwsS0FBSyxDQUFDYSxNQUZiO0FBR0xRLGdCQUFBQSxRQUFRLEVBQUU7QUFDUnRCLGtCQUFBQSxXQUFXLEVBQUVBLFdBREw7QUFFUkQsa0JBQUFBLFNBQVMsRUFBRUEsU0FGSDtBQUdScUMsa0JBQUFBLFdBQVcsRUFBRTtBQUhMO0FBSEwsZUFmRTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnREF5QkYsSUFBSUMsS0FBSixjQXpCRTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLEtBcERBO0FBZ0ZYQyxFQUFBQSxXQUFXLEVBQUUscUJBQUNiLE9BQUQsRUFBVUMsSUFBVixTQUE2QjtBQUFBLFFBQVo3QixPQUFZLFNBQVpBLE9BQVk7QUFDeEMsV0FBTyxDQUFQLENBRHdDLENBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBeEZVLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuY29uc3QgR3JvdXAgPSBNb25nb29zZU1vZGVscygnR3JvdXAnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9faXNUeXBlT2Y6IChvYmopID0+IHtcclxuICAgICAgaWYoIG9iai5zdWJzY3JpYmVycyApXHJcbiAgICAgICAgcmV0dXJuIFwiR3JvdXBcIjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZXM6IGFzeW5jICh7aWR9ICwge2xhc3QsIGJlZm9yZX0sIHtzZXNzaW9uLCBtZXNzYWdlTG9hZGVyfSkgPT4ge1xyXG5cclxuICAgICAgbGV0IG1lc3NhZ2VzID0gW107XHJcbiAgICAgIGxldCBlbmRDdXJzb3IgPSAnJztcclxuICAgICAgbGV0IHN0YXJ0Q3Vyc29yID0gJyc7XHJcbiAgICAgIGxldCBlZGdlcyA9IFtdO1xyXG4gICAgICBsZXQgaGFzUHJldmlvdXNQYWdlID0gZmFsc2U7XHJcblxyXG4gICAgICBsZXQgcXVlcnkgPSB7IGRlc3RpbmF0aW9uOiBpZCB9O1xyXG4gICAgICBcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsZXQgdG90YWxDb3VudCA9IGF3YWl0IE1lc3NhZ2UuY291bnREb2N1bWVudHMocXVlcnkpO1xyXG4gICAgICAgIG1lc3NhZ2VzID0gKCBiZWZvcmUgKSA/XHJcbiAgICAgICAgICBhd2FpdCBNZXNzYWdlLmZpbmQoeyRhbmQ6WyB7X2lkOiB7JGx0OiBiZWZvcmV9fSwgcXVlcnkgXSB9KS5zb3J0KHtfaWQ6ICdkZXNjJ30pLmxpbWl0KGxhc3QpLnBvcHVsYXRlKFwiYXV0aG9yXCIpLnBvcHVsYXRlKFwiZGVzdGluYXRpb25cIikgOlxyXG4gICAgICAgICAgYXdhaXQgTWVzc2FnZS5maW5kKHF1ZXJ5KS5zb3J0KHtfaWQ6ICdkZXNjJ30pLmxpbWl0KGxhc3QpLnBvcHVsYXRlKFwiYXV0aG9yXCIpLnBvcHVsYXRlKFwiZGVzdGluYXRpb25cIik7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgZWRnZXMgPSBtZXNzYWdlcy5tYXAobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VMb2FkZXIucHJpbWUoYCR7bWVzc2FnZS5pZH1gLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgZW5kQ3Vyc29yID0gZW5kQ3Vyc29yIHx8IGAke21lc3NhZ2UuaWR9YDtcclxuICAgICAgICAgICAgc3RhcnRDdXJzb3IgPSBgJHttZXNzYWdlLmlkfWA7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yOiBgJHttZXNzYWdlLmlkfWAsXHJcbiAgICAgICAgICAgICAgbm9kZTogbWVzc2FnZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGVkZ2VzLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgICBsZXQgcmVzdE9mTWVzc2FnZXMgPSBhd2FpdCBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHskYW5kOlsge19pZDogeyRsdDogc3RhcnRDdXJzb3J9fSwgcXVlcnkgXSB9KTtcclxuICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZSA9IHJlc3RPZk1lc3NhZ2VzID4gMCA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZWRnZXM6IGVkZ2VzLFxyXG4gICAgICAgICAgdG90YWxDb3VudDogdG90YWxDb3VudCxcclxuICAgICAgICAgIHBhZ2VJbmZvOiB7XHJcbiAgICAgICAgICAgIHN0YXJ0Q3Vyc29yOiBzdGFydEN1cnNvcixcclxuICAgICAgICAgICAgZW5kQ3Vyc29yOiBlbmRDdXJzb3IsXHJcbiAgICAgICAgICAgIGhhc1ByZXZpb3VzUGFnZTogaGFzUHJldmlvdXNQYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Vic2NyaWJlcnM6IGFzeW5jKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlcn0pID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBsZXQgZ3JvdXAgPSBhd2FpdCBncm91cExvYWRlci5sb2FkKHBhZXJlbnQuaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgbGV0IHVzZXJzID0gYXdhaXQgdXNlckxvYWRlci5sb2FkTWFueSggZ3JvdXAuc3Vic2NyaWJlcnMubWFwKCBzID0+IHMuX2lkLnRvU3RyaW5nKCkgKSlcclxuICBcclxuICAgICAgICBsZXQgc3RhcnRDdXJzb3IgPSAnJztcclxuICAgICAgICBsZXQgZW5kQ3Vyc29yID0gJyc7XHJcbiAgICAgICAgbGV0IGVkZ2VzID0gdXNlcnMubWFwKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgICAgICAgc3RhcnRDdXJzb3IgPSBzdGFydEN1cnNvciB8fCBgJHtzdWJzY3JpYmVyLmlkfWA7XHJcbiAgICAgICAgICBlbmRDdXJzb3IgPSBgJHtzdWJzY3JpYmVyLmlkfWA7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjdXJzb3I6IGAke3N1YnNjcmliZXIuaWR9YCxcclxuICAgICAgICAgICAgbm9kZTogc3Vic2NyaWJlclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlZGdlczogZWRnZXMsXHJcbiAgICAgICAgICB0b3RhbENvdW50OiBlZGdlcy5sZW5ndGgsXHJcbiAgICAgICAgICBwYWdlSW5mbzoge1xyXG4gICAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICAgIGVuZEN1cnNvcjogZW5kQ3Vyc29yLFxyXG4gICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG5ld01lc3NhZ2VzOiAocGFlcmVudCAsYXJncywge3Nlc3Npb259KT0+IHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIC8vIHJldHVybiBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHtcclxuICAgICAgLy8gICAkYW5kOlsgXHJcbiAgICAgIC8vICAgICB7ZGVzdGluYXRpb246IHBhZXJlbnQuaWR9LCBcclxuICAgICAgLy8gICAgIHtyZWFkZWQ6IGZhbHNlfVxyXG4gICAgICAvLyAgIF1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbiAgfSJdfQ==