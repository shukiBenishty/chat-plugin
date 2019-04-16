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
              console.log(users);
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
              console.log(edges);
              return _context2.abrupt("return", {
                edges: edges,
                totalCount: edges.length,
                pageInfo: {
                  startCursor: startCursor,
                  endCursor: endCursor,
                  hasNextPage: false
                }
              });

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", new Error(_context2.t0));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 16]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL0dyb3VwLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJHcm91cCIsIl9faXNUeXBlT2YiLCJvYmoiLCJzdWJzY3JpYmVycyIsIm1lc3NhZ2VzIiwiaWQiLCJsYXN0IiwiYmVmb3JlIiwic2Vzc2lvbiIsIm1lc3NhZ2VMb2FkZXIiLCJlbmRDdXJzb3IiLCJzdGFydEN1cnNvciIsImVkZ2VzIiwiaGFzUHJldmlvdXNQYWdlIiwicXVlcnkiLCJkZXN0aW5hdGlvbiIsImNvdW50RG9jdW1lbnRzIiwidG90YWxDb3VudCIsImZpbmQiLCIkYW5kIiwiX2lkIiwiJGx0Iiwic29ydCIsImxpbWl0IiwicG9wdWxhdGUiLCJsZW5ndGgiLCJtYXAiLCJtZXNzYWdlIiwicHJpbWUiLCJjdXJzb3IiLCJub2RlIiwicmV2ZXJzZSIsInJlc3RPZk1lc3NhZ2VzIiwicGFnZUluZm8iLCJjb25zb2xlIiwiZXJyb3IiLCJwYWVyZW50IiwiYXJncyIsInVzZXJMb2FkZXIiLCJncm91cExvYWRlciIsImxvYWQiLCJ0b1N0cmluZyIsImdyb3VwIiwibG9hZE1hbnkiLCJzIiwidXNlcnMiLCJsb2ciLCJzdWJzY3JpYmVyIiwiaGFzTmV4dFBhZ2UiLCJFcnJvciIsIm5ld01lc3NhZ2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsT0FBTyxHQUFHLGdDQUFlLFNBQWYsQ0FBaEI7QUFDQSxJQUFNQyxLQUFLLEdBQUcsZ0NBQWUsT0FBZixDQUFkO2VBRWU7QUFDWEMsRUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQVM7QUFDbkIsUUFBSUEsR0FBRyxDQUFDQyxXQUFSLEVBQ0UsT0FBTyxPQUFQO0FBQ0YsV0FBTyxJQUFQO0FBQ0QsR0FMVTtBQU1YQyxFQUFBQSxRQUFRO0FBQUE7QUFBQTtBQUFBLGlDQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFRQyxjQUFBQSxFQUFSLFFBQVFBLEVBQVI7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QSx1QkFBTztBQUNMd0Isa0JBQUFBLE1BQU0sWUFBS2tCLFVBQVUsQ0FBQzFDLEVBQWhCLENBREQ7QUFFTHlCLGtCQUFBQSxJQUFJLEVBQUVpQjtBQUZELGlCQUFQO0FBSUQsZUFQVyxDQVJIO0FBZ0JUYixjQUFBQSxPQUFPLENBQUNZLEdBQVIsQ0FBWWxDLEtBQVo7QUFoQlMsZ0RBa0JGO0FBQ0xBLGdCQUFBQSxLQUFLLEVBQUVBLEtBREY7QUFFTEssZ0JBQUFBLFVBQVUsRUFBRUwsS0FBSyxDQUFDYSxNQUZiO0FBR0xRLGdCQUFBQSxRQUFRLEVBQUU7QUFDUnRCLGtCQUFBQSxXQUFXLEVBQUVBLFdBREw7QUFFUkQsa0JBQUFBLFNBQVMsRUFBRUEsU0FGSDtBQUdSc0Msa0JBQUFBLFdBQVcsRUFBRTtBQUhMO0FBSEwsZUFsQkU7O0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0RBNEJGLElBQUlDLEtBQUosY0E1QkU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQXBEQTtBQW1GWEMsRUFBQUEsV0FBVyxFQUFFLHFCQUFDZCxPQUFELEVBQVVDLElBQVYsU0FBNkI7QUFBQSxRQUFaN0IsT0FBWSxTQUFaQSxPQUFZO0FBQ3hDLFdBQU8sQ0FBUCxDQUR3QyxDQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQTNGVSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuY29uc3QgTWVzc2FnZSA9IE1vbmdvb3NlTW9kZWxzKCdNZXNzYWdlJyk7XHJcbmNvbnN0IEdyb3VwID0gTW9uZ29vc2VNb2RlbHMoJ0dyb3VwJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2lzVHlwZU9mOiAob2JqKSA9PiB7XHJcbiAgICAgIGlmKCBvYmouc3Vic2NyaWJlcnMgKVxyXG4gICAgICAgIHJldHVybiBcIkdyb3VwXCI7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBhc3luYyAoe2lkfSAsIHtsYXN0LCBiZWZvcmV9LCB7c2Vzc2lvbiwgbWVzc2FnZUxvYWRlcn0pID0+IHtcclxuXHJcbiAgICAgIGxldCBtZXNzYWdlcyA9IFtdO1xyXG4gICAgICBsZXQgZW5kQ3Vyc29yID0gJyc7XHJcbiAgICAgIGxldCBzdGFydEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgZWRnZXMgPSBbXTtcclxuICAgICAgbGV0IGhhc1ByZXZpb3VzUGFnZSA9IGZhbHNlO1xyXG5cclxuICAgICAgbGV0IHF1ZXJ5ID0geyBkZXN0aW5hdGlvbjogaWQgfTtcclxuICAgICAgXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHRvdGFsQ291bnQgPSBhd2FpdCBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHF1ZXJ5KTtcclxuICAgICAgICBtZXNzYWdlcyA9ICggYmVmb3JlICkgP1xyXG4gICAgICAgICAgYXdhaXQgTWVzc2FnZS5maW5kKHskYW5kOlsge19pZDogeyRsdDogYmVmb3JlfX0sIHF1ZXJ5IF0gfSkuc29ydCh7X2lkOiAnZGVzYyd9KS5saW1pdChsYXN0KS5wb3B1bGF0ZShcImF1dGhvclwiKS5wb3B1bGF0ZShcImRlc3RpbmF0aW9uXCIpIDpcclxuICAgICAgICAgIGF3YWl0IE1lc3NhZ2UuZmluZChxdWVyeSkuc29ydCh7X2lkOiAnZGVzYyd9KS5saW1pdChsYXN0KS5wb3B1bGF0ZShcImF1dGhvclwiKS5wb3B1bGF0ZShcImRlc3RpbmF0aW9uXCIpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIGVkZ2VzID0gbWVzc2FnZXMubWFwKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlTG9hZGVyLnByaW1lKGAke21lc3NhZ2UuaWR9YCwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGVuZEN1cnNvciA9IGVuZEN1cnNvciB8fCBgJHttZXNzYWdlLmlkfWA7XHJcbiAgICAgICAgICAgIHN0YXJ0Q3Vyc29yID0gYCR7bWVzc2FnZS5pZH1gO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIGN1cnNvcjogYCR7bWVzc2FnZS5pZH1gLFxyXG4gICAgICAgICAgICAgIG5vZGU6IG1lc3NhZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBlZGdlcy5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgICAgbGV0IHJlc3RPZk1lc3NhZ2VzID0gYXdhaXQgTWVzc2FnZS5jb3VudERvY3VtZW50cyh7JGFuZDpbIHtfaWQ6IHskbHQ6IHN0YXJ0Q3Vyc29yfX0sIHF1ZXJ5IF0gfSk7XHJcbiAgICAgICAgICBoYXNQcmV2aW91c1BhZ2UgPSByZXN0T2ZNZXNzYWdlcyA+IDAgPyB0cnVlIDogZmFsc2VcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGVkZ2VzOiBlZGdlcyxcclxuICAgICAgICAgIHRvdGFsQ291bnQ6IHRvdGFsQ291bnQsXHJcbiAgICAgICAgICBwYWdlSW5mbzoge1xyXG4gICAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICAgIGVuZEN1cnNvcjogZW5kQ3Vyc29yLFxyXG4gICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGhhc1ByZXZpb3VzUGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgICAgICBcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN1YnNjcmliZXJzOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXJ9KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGdyb3VwID0gYXdhaXQgZ3JvdXBMb2FkZXIubG9hZChwYWVyZW50LmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGxldCB1c2VycyA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZE1hbnkoIGdyb3VwLnN1YnNjcmliZXJzLm1hcCggcyA9PiBzLl9pZC50b1N0cmluZygpICkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2codXNlcnMpO1xyXG4gICAgICAgIGxldCBzdGFydEN1cnNvciA9ICcnO1xyXG4gICAgICAgIGxldCBlbmRDdXJzb3IgPSAnJztcclxuICAgICAgICBsZXQgZWRnZXMgPSB1c2Vycy5tYXAoc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgICAgICBzdGFydEN1cnNvciA9IHN0YXJ0Q3Vyc29yIHx8IGAke3N1YnNjcmliZXIuaWR9YDtcclxuICAgICAgICAgIGVuZEN1cnNvciA9IGAke3N1YnNjcmliZXIuaWR9YDtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGN1cnNvcjogYCR7c3Vic2NyaWJlci5pZH1gLFxyXG4gICAgICAgICAgICBub2RlOiBzdWJzY3JpYmVyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZWRnZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlZGdlczogZWRnZXMsXHJcbiAgICAgICAgICB0b3RhbENvdW50OiBlZGdlcy5sZW5ndGgsXHJcbiAgICAgICAgICBwYWdlSW5mbzoge1xyXG4gICAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICAgIGVuZEN1cnNvcjogZW5kQ3Vyc29yLFxyXG4gICAgICAgICAgICBoYXNOZXh0UGFnZTogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG5ld01lc3NhZ2VzOiAocGFlcmVudCAsYXJncywge3Nlc3Npb259KT0+IHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIC8vIHJldHVybiBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHtcclxuICAgICAgLy8gICAkYW5kOlsgXHJcbiAgICAgIC8vICAgICB7ZGVzdGluYXRpb246IHBhZXJlbnQuaWR9LCBcclxuICAgICAgLy8gICAgIHtyZWFkZWQ6IGZhbHNlfVxyXG4gICAgICAvLyAgIF1cclxuICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbiAgfSJdfQ==