"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

var _dataLoader = require("../dataLoader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');
var _default = {
  __isTypeOf: function __isTypeOf(obj) {
    if (obj.subscribers) return "Group";
    return null;
  },
  messages: function () {
    var _messages = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref, _ref2, _ref3) {
      var id, last, before, session, messages, endCursor, startCursor, edges, hasPreviousPage, query, totalCount, restOfMessages;
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
                _dataLoader.messageLoader.prime("".concat(message.id), message);

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
              console.log(edges);
              return _context.abrupt("return", {
                edges: edges,
                totalCount: totalCount,
                pageInfo: {
                  startCursor: startCursor,
                  endCursor: endCursor,
                  hasPreviousPage: hasPreviousPage
                }
              });

            case 34:
              _context.prev = 34;
              _context.t1 = _context["catch"](9);
              console.error(_context.t1);

            case 37:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 34]]);
    }));

    function messages(_x, _x2, _x3) {
      return _messages.apply(this, arguments);
    }

    return messages;
  }(),
  subscribers: function () {
    var _subscribers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(paerent, args, _ref4) {
      var session, group;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              session = _ref4.session;
              _context2.prev = 1;
              _context2.next = 4;
              return _dataLoader.groupLoader.load(paerent.id.toString());

            case 4:
              group = _context2.sent;
              return _context2.abrupt("return", _dataLoader.userLoader.loadMany(group.subscribers.map(function (s) {
                return s._id.toString();
              })));

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", new Error(_context2.t0));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    function subscribers(_x4, _x5, _x6) {
      return _subscribers.apply(this, arguments);
    }

    return subscribers;
  }(),
  newMessages: function newMessages(paerent, args, _ref5) {
    var session = _ref5.session;
    return Message.countDocuments({
      $and: [{
        destination: paerent.id
      }, {
        readed: false
      }]
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL0dyb3VwLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJHcm91cCIsIl9faXNUeXBlT2YiLCJvYmoiLCJzdWJzY3JpYmVycyIsIm1lc3NhZ2VzIiwiaWQiLCJsYXN0IiwiYmVmb3JlIiwic2Vzc2lvbiIsImVuZEN1cnNvciIsInN0YXJ0Q3Vyc29yIiwiZWRnZXMiLCJoYXNQcmV2aW91c1BhZ2UiLCJxdWVyeSIsImRlc3RpbmF0aW9uIiwiY291bnREb2N1bWVudHMiLCJ0b3RhbENvdW50IiwiZmluZCIsIiRhbmQiLCJfaWQiLCIkbHQiLCJzb3J0IiwibGltaXQiLCJwb3B1bGF0ZSIsImxlbmd0aCIsIm1hcCIsIm1lc3NhZ2UiLCJtZXNzYWdlTG9hZGVyIiwicHJpbWUiLCJjdXJzb3IiLCJub2RlIiwicmV2ZXJzZSIsInJlc3RPZk1lc3NhZ2VzIiwiY29uc29sZSIsImxvZyIsInBhZ2VJbmZvIiwiZXJyb3IiLCJwYWVyZW50IiwiYXJncyIsImdyb3VwTG9hZGVyIiwibG9hZCIsInRvU3RyaW5nIiwiZ3JvdXAiLCJ1c2VyTG9hZGVyIiwibG9hZE1hbnkiLCJzIiwiRXJyb3IiLCJuZXdNZXNzYWdlcyIsInJlYWRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO0FBQ0EsSUFBTUMsS0FBSyxHQUFHLGdDQUFlLE9BQWYsQ0FBZDtlQUVlO0FBQ1hDLEVBQUFBLFVBQVUsRUFBRSxvQkFBQ0MsR0FBRCxFQUFTO0FBQ25CLFFBQUlBLEdBQUcsQ0FBQ0MsV0FBUixFQUNFLE9BQU8sT0FBUDtBQUNGLFdBQU8sSUFBUDtBQUNELEdBTFU7QUFNWEMsRUFBQUEsUUFBUTtBQUFBO0FBQUE7QUFBQSw0QkFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBUUMsY0FBQUEsRUFBUixRQUFRQSxFQUFSO0FBQWVDLGNBQUFBLElBQWYsU0FB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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyLCBtZXNzYWdlTG9hZGVyIH0gZnJvbSBcIi4uL2RhdGFMb2FkZXJcIjtcclxuXHJcbmNvbnN0IE1lc3NhZ2UgPSBNb25nb29zZU1vZGVscygnTWVzc2FnZScpO1xyXG5jb25zdCBHcm91cCA9IE1vbmdvb3NlTW9kZWxzKCdHcm91cCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19pc1R5cGVPZjogKG9iaikgPT4ge1xyXG4gICAgICBpZiggb2JqLnN1YnNjcmliZXJzIClcclxuICAgICAgICByZXR1cm4gXCJHcm91cFwiO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczogYXN5bmMgKHtpZH0gLCB7bGFzdCwgYmVmb3JlfSwge3Nlc3Npb259KSA9PiB7XHJcblxyXG4gICAgICBsZXQgbWVzc2FnZXMgPSBbXTtcclxuICAgICAgbGV0IGVuZEN1cnNvciA9ICcnO1xyXG4gICAgICBsZXQgc3RhcnRDdXJzb3IgPSAnJztcclxuICAgICAgbGV0IGVkZ2VzID0gW107XHJcbiAgICAgIGxldCBoYXNQcmV2aW91c1BhZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgIGxldCBxdWVyeSA9IHsgZGVzdGluYXRpb246IGlkIH07XHJcbiAgICAgIFxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGxldCB0b3RhbENvdW50ID0gYXdhaXQgTWVzc2FnZS5jb3VudERvY3VtZW50cyhxdWVyeSk7XHJcbiAgICAgICAgbWVzc2FnZXMgPSAoIGJlZm9yZSApID9cclxuICAgICAgICAgIGF3YWl0IE1lc3NhZ2UuZmluZCh7JGFuZDpbIHtfaWQ6IHskbHQ6IGJlZm9yZX19LCBxdWVyeSBdIH0pLnNvcnQoe19pZDogJ2Rlc2MnfSkubGltaXQobGFzdCkucG9wdWxhdGUoXCJhdXRob3JcIikucG9wdWxhdGUoXCJkZXN0aW5hdGlvblwiKSA6XHJcbiAgICAgICAgICBhd2FpdCBNZXNzYWdlLmZpbmQocXVlcnkpLnNvcnQoe19pZDogJ2Rlc2MnfSkubGltaXQobGFzdCkucG9wdWxhdGUoXCJhdXRob3JcIikucG9wdWxhdGUoXCJkZXN0aW5hdGlvblwiKTtcclxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBlZGdlcyA9IG1lc3NhZ2VzLm1hcChtZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZUxvYWRlci5wcmltZShgJHttZXNzYWdlLmlkfWAsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBlbmRDdXJzb3IgPSBlbmRDdXJzb3IgfHwgYCR7bWVzc2FnZS5pZH1gO1xyXG4gICAgICAgICAgICBzdGFydEN1cnNvciA9IGAke21lc3NhZ2UuaWR9YDtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBjdXJzb3I6IGAke21lc3NhZ2UuaWR9YCxcclxuICAgICAgICAgICAgICBub2RlOiBtZXNzYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZWRnZXMucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICAgIGxldCByZXN0T2ZNZXNzYWdlcyA9IGF3YWl0IE1lc3NhZ2UuY291bnREb2N1bWVudHMoeyRhbmQ6WyB7X2lkOiB7JGx0OiBzdGFydEN1cnNvcn19LCBxdWVyeSBdIH0pO1xyXG4gICAgICAgICAgaGFzUHJldmlvdXNQYWdlID0gcmVzdE9mTWVzc2FnZXMgPiAwID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZWRnZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlZGdlczogZWRnZXMsXHJcbiAgICAgICAgICB0b3RhbENvdW50OiB0b3RhbENvdW50LFxyXG4gICAgICAgICAgcGFnZUluZm86IHtcclxuICAgICAgICAgICAgc3RhcnRDdXJzb3I6IHN0YXJ0Q3Vyc29yLFxyXG4gICAgICAgICAgICBlbmRDdXJzb3I6IGVuZEN1cnNvcixcclxuICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlOiBoYXNQcmV2aW91c1BhZ2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7ICAgICAgXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdWJzY3JpYmVyczogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGdyb3VwID0gYXdhaXQgZ3JvdXBMb2FkZXIubG9hZChwYWVyZW50LmlkLnRvU3RyaW5nKCkgKVxyXG4gICAgICAgIHJldHVybiB1c2VyTG9hZGVyLmxvYWRNYW55KCBncm91cC5zdWJzY3JpYmVycy5tYXAoIHMgPT4gcy5faWQudG9TdHJpbmcoKSApKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBuZXdNZXNzYWdlczogKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9ufSk9PiB7XHJcbiAgICAgIHJldHVybiBNZXNzYWdlLmNvdW50RG9jdW1lbnRzKHtcclxuICAgICAgICAkYW5kOlsgXHJcbiAgICAgICAgICB7ZGVzdGluYXRpb246IHBhZXJlbnQuaWR9LCBcclxuICAgICAgICAgIHtyZWFkZWQ6IGZhbHNlfVxyXG4gICAgICAgIF1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSJdfQ==