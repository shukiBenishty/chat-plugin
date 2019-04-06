"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

var _subscribers = _interopRequireDefault(require("../subscribers"));

var _dataLoader = require("../dataLoader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = (0, _debug["default"])("chat-plugin:Query:Contact");
var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var _default = {
  __isTypeOf: function __isTypeOf(obj) {
    if (obj.username) return "Contact";
    return null;
  },
  messages: function () {
    var _messages = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref, _ref2, _ref3, info) {
      var id, last, before, session, messages, endCursor, startCursor, edges, hasPreviousPage, or, totalCount, restOfMessages;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              last = _ref2.last, before = _ref2.before;
              session = _ref3.session;
              messages = [];
              endCursor = '';
              startCursor = '';
              edges = [];
              hasPreviousPage = false;
              or = [{
                $and: [{
                  author: session.userId
                }, {
                  destination: id
                }]
              }, {
                $and: [{
                  destination: session.userId
                }, {
                  author: id
                }]
              }];
              _context.prev = 9;
              _context.next = 12;
              return Message.countDocuments({
                $or: or
              });

            case 12:
              totalCount = _context.sent;
              debug("totalCount", totalCount);

              if (!before) {
                _context.next = 20;
                break;
              }

              _context.next = 17;
              return Message.find({
                $and: [{
                  _id: {
                    $lt: before
                  }
                }, {
                  $or: or
                }]
              }).sort({
                _id: 'desc'
              }).limit(last).populate("author").populate("destination");

            case 17:
              _context.t0 = _context.sent;
              _context.next = 23;
              break;

            case 20:
              _context.next = 22;
              return Message.find({
                $or: or
              }).sort({
                _id: 'desc'
              }).limit(last).populate("author").populate("destination");

            case 22:
              _context.t0 = _context.sent;

            case 23:
              messages = _context.t0;
              debug("messages: ", messages);

              if (!(messages.length !== 0)) {
                _context.next = 35;
                break;
              }

              edges = messages.map(function (message) {
                _dataLoader.messageLoader.prime("".concat(message.id), message);

                endCursor = endCursor || "".concat(message.id);
                startCursor = "".concat(message.id);
                return {
                  cursor: "".concat(message.id),
                  node: message
                };
              });
              edges.reverse();
              debug("edges: ", edges);
              _context.next = 31;
              return Message.countDocuments({
                $and: [{
                  _id: {
                    $lt: startCursor
                  }
                }, {
                  $or: or
                }]
              });

            case 31:
              restOfMessages = _context.sent;
              hasPreviousPage = restOfMessages < 0 ? true : false;
              debug("hasPreviousPage: ", hasPreviousPage);
              debug("restOfMessages: ", restOfMessages);

            case 35:
              return _context.abrupt("return", {
                edges: edges,
                totalCount: totalCount,
                pageInfo: {
                  startCursor: startCursor,
                  endCursor: endCursor,
                  hasPreviousPage: hasPreviousPage
                }
              });

            case 38:
              _context.prev = 38;
              _context.t1 = _context["catch"](9);
              console.error(_context.t1);

            case 41:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 38]]);
    }));

    function messages(_x, _x2, _x3, _x4) {
      return _messages.apply(this, arguments);
    }

    return messages;
  }(),
  online: function online(paerent, args, _ref4) {
    var session = _ref4.session;
    return _subscribers["default"].getItem(paerent.id) ? true : false;
  },
  newMessages: function newMessages(paerent, args, _ref5) {
    var session = _ref5.session;
    return Message.countDocuments({
      $and: [{
        author: paerent.id
      }, {
        destination: session.userId
      }, {
        readed: false
      }]
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL0NvbnRhY3QuanMiXSwibmFtZXMiOlsiZGVidWciLCJVc2VyIiwiTWVzc2FnZSIsIl9faXNUeXBlT2YiLCJvYmoiLCJ1c2VybmFtZSIsIm1lc3NhZ2VzIiwiaW5mbyIsImlkIiwibGFzdCIsImJlZm9yZSIsInNlc3Npb24iLCJlbmRDdXJzb3IiLCJzdGFydEN1cnNvciIsImVkZ2VzIiwiaGFzUHJldmlvdXNQYWdlIiwib3IiLCIkYW5kIiwiYXV0aG9yIiwidXNlcklkIiwiZGVzdGluYXRpb24iLCJjb3VudERvY3VtZW50cyIsIiRvciIsInRvdGFsQ291bnQiLCJmaW5kIiwiX2lkIiwiJGx0Iiwic29ydCIsImxpbWl0IiwicG9wdWxhdGUiLCJsZW5ndGgiLCJtYXAiLCJtZXNzYWdlIiwibWVzc2FnZUxvYWRlciIsInByaW1lIiwiY3Vyc29yIiwibm9kZSIsInJldmVyc2UiLCJyZXN0T2ZNZXNzYWdlcyIsInBhZ2VJbmZvIiwiY29uc29sZSIsImVycm9yIiwib25saW5lIiwicGFlcmVudCIsImFyZ3MiLCJzdWJzY3JpYmVycyIsImdldEl0ZW0iLCJuZXdNZXNzYWdlcyIsInJlYWRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBRyx1QkFBTSwyQkFBTixDQUFkO0FBRUEsSUFBTUMsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUNBLElBQU1DLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO2VBRWU7QUFDWEMsRUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQVM7QUFDbkIsUUFBSUEsR0FBRyxDQUFDQyxRQUFSLEVBQ0UsT0FBTyxTQUFQO0FBQ0YsV0FBTyxJQUFQO0FBQ0QsR0FMVTtBQU1YQyxFQUFBQSxRQUFRO0FBQUE7QUFBQTtBQUFBLDRCQUFFLHFDQUF1Q0MsSUFBdkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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RDtBQUNELEdBM0RVO0FBNERYdUMsRUFBQUEsV0FBVyxFQUFFLHFCQUFDSixPQUFELEVBQVVDLElBQVYsU0FBNkI7QUFBQSxRQUFaakMsT0FBWSxTQUFaQSxPQUFZO0FBQ3hDLFdBQU9ULE9BQU8sQ0FBQ21CLGNBQVIsQ0FBdUI7QUFDNUJKLE1BQUFBLElBQUksRUFBQyxDQUNIO0FBQUNDLFFBQUFBLE1BQU0sRUFBRXlCLE9BQU8sQ0FBQ25DO0FBQWpCLE9BREcsRUFFSDtBQUFDWSxRQUFBQSxXQUFXLEVBQUVULE9BQU8sQ0FBQ1E7QUFBdEIsT0FGRyxFQUdIO0FBQUM2QixRQUFBQSxNQUFNLEVBQUU7QUFBVCxPQUhHO0FBRHVCLEtBQXZCLENBQVA7QUFPRDtBQXBFVSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlYnVnIGZyb20gXCJkZWJ1Z1wiO1xyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCBzdWJzY3JpYmVycyBmcm9tIFwiLi4vc3Vic2NyaWJlcnNcIjtcclxuaW1wb3J0IHttZXNzYWdlTG9hZGVyIH0gZnJvbSBcIi4uL2RhdGFMb2FkZXJcIjtcclxuXHJcbmNvbnN0IGRlYnVnID0gRGVidWcoXCJjaGF0LXBsdWdpbjpRdWVyeTpDb250YWN0XCIpO1xyXG5cclxuY29uc3QgVXNlciA9IE1vbmdvb3NlTW9kZWxzKCdVc2VyJyk7XHJcbmNvbnN0IE1lc3NhZ2UgPSBNb25nb29zZU1vZGVscygnTWVzc2FnZScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19pc1R5cGVPZjogKG9iaikgPT4ge1xyXG4gICAgICBpZiggb2JqLnVzZXJuYW1lIClcclxuICAgICAgICByZXR1cm4gXCJDb250YWN0XCI7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiBhc3luYyh7aWR9LCB7bGFzdCwgYmVmb3JlfSwge3Nlc3Npb259LCBpbmZvKSA9PiB7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgbWVzc2FnZXMgPSBbXTtcclxuICAgICAgbGV0IGVuZEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgc3RhcnRDdXJzb3IgPSAnJztcclxuICAgICAgbGV0IGVkZ2VzID0gW107XHJcbiAgICAgIGxldCBoYXNQcmV2aW91c1BhZ2UgPSBmYWxzZTtcclxuICAgICAgbGV0IG9yID0gW1xyXG4gICAgICAgIHsgJGFuZDogW3sgYXV0aG9yOiBzZXNzaW9uLnVzZXJJZCB9LCB7IGRlc3RpbmF0aW9uOiBpZCB9XSB9LFxyXG4gICAgICAgIHsgJGFuZDogW3sgZGVzdGluYXRpb246IHNlc3Npb24udXNlcklkIH0sIHsgYXV0aG9yOiBpZCB9XSB9XHJcbiAgICAgIF07XHJcbiAgICAgIFxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGxldCB0b3RhbENvdW50ID0gYXdhaXQgTWVzc2FnZS5jb3VudERvY3VtZW50cyh7ICRvcjogb3J9KTtcclxuICAgICAgICBkZWJ1ZyhcInRvdGFsQ291bnRcIiwgdG90YWxDb3VudCk7XHJcbiAgICAgICAgbWVzc2FnZXMgPSAoIGJlZm9yZSApID9cclxuICAgICAgICAgIGF3YWl0IE1lc3NhZ2UuZmluZCh7JGFuZDpbIHtfaWQ6IHskbHQ6IGJlZm9yZX19LCB7JG9yOiBvcn0gXSB9KS5zb3J0KHtfaWQ6ICdkZXNjJ30pLmxpbWl0KGxhc3QpLnBvcHVsYXRlKFwiYXV0aG9yXCIpLnBvcHVsYXRlKFwiZGVzdGluYXRpb25cIikgOlxyXG4gICAgICAgICAgYXdhaXQgTWVzc2FnZS5maW5kKHskb3I6IG9yfSkuc29ydCh7X2lkOiAnZGVzYyd9KS5saW1pdChsYXN0KS5wb3B1bGF0ZShcImF1dGhvclwiKS5wb3B1bGF0ZShcImRlc3RpbmF0aW9uXCIpO1xyXG4gICAgICAgIGRlYnVnKFwibWVzc2FnZXM6IFwiLCBtZXNzYWdlcyk7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgZWRnZXMgPSBtZXNzYWdlcy5tYXAobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VMb2FkZXIucHJpbWUoYCR7bWVzc2FnZS5pZH1gLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgZW5kQ3Vyc29yID0gZW5kQ3Vyc29yIHx8IGAke21lc3NhZ2UuaWR9YDtcclxuICAgICAgICAgICAgc3RhcnRDdXJzb3IgPSBgJHttZXNzYWdlLmlkfWA7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgY3Vyc29yOiBgJHttZXNzYWdlLmlkfWAsXHJcbiAgICAgICAgICAgICAgbm9kZTogbWVzc2FnZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGVkZ2VzLnJldmVyc2UoKTtcclxuICAgICAgICAgIGRlYnVnKFwiZWRnZXM6IFwiLCBlZGdlcyk7XHJcbiAgICAgICAgICBsZXQgcmVzdE9mTWVzc2FnZXMgPSBhd2FpdCBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHskYW5kOlsge19pZDogeyRsdDogc3RhcnRDdXJzb3J9fSwgeyRvcjogb3J9IF0gfSk7XHJcbiAgICAgICAgICBoYXNQcmV2aW91c1BhZ2UgPSByZXN0T2ZNZXNzYWdlcyA8IDAgPyB0cnVlIDogZmFsc2VcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZGVidWcoXCJoYXNQcmV2aW91c1BhZ2U6IFwiLCBoYXNQcmV2aW91c1BhZ2UpO1xyXG4gICAgICAgICAgZGVidWcoXCJyZXN0T2ZNZXNzYWdlczogXCIsIHJlc3RPZk1lc3NhZ2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGVkZ2VzOiBlZGdlcyxcclxuICAgICAgICAgIHRvdGFsQ291bnQ6IHRvdGFsQ291bnQsXHJcbiAgICAgICAgICBwYWdlSW5mbzoge1xyXG4gICAgICAgICAgICBzdGFydEN1cnNvcjogc3RhcnRDdXJzb3IsXHJcbiAgICAgICAgICAgIGVuZEN1cnNvcjogZW5kQ3Vyc29yLFxyXG4gICAgICAgICAgICBoYXNQcmV2aW91c1BhZ2U6IGhhc1ByZXZpb3VzUGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgICAgICBcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9ubGluZTogKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9ufSk9PiB7XHJcbiAgICAgIHJldHVybiAoc3Vic2NyaWJlcnMuZ2V0SXRlbShwYWVyZW50LmlkKSkgPyB0cnVlIDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBuZXdNZXNzYWdlczogKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9ufSk9PiB7XHJcbiAgICAgIHJldHVybiBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHtcclxuICAgICAgICAkYW5kOlsgXHJcbiAgICAgICAgICB7YXV0aG9yOiBwYWVyZW50LmlkfSwgXHJcbiAgICAgICAgICB7ZGVzdGluYXRpb246IHNlc3Npb24udXNlcklkfSwgXHJcbiAgICAgICAgICB7cmVhZGVkOiBmYWxzZX1cclxuICAgICAgICBdXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0iXX0=