"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pubsub = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _apolloServerExpress = require("apollo-server-express");

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var debug = (0, _debug["default"])("chat-plugin:Subscription");
var pubsub = new _apolloServerExpress.PubSub();
exports.pubsub = pubsub;
var User = (0, _mongooseModels["default"])('User');

var withCancel = function withCancel(asyncIterator, onCancel) {
  return _objectSpread({}, asyncIterator, {
    "return": function _return() {
      onCancel();
      return asyncIterator["return"] ? asyncIterator["return"]() : Promise.resolve({
        value: undefined,
        done: true
      });
    }
  });
};

var _default = {
  personalMessageSent: {
    subscribe: function subscribe(obj, args, _ref, info) {
      var session = _ref.session;
      return withCancel(pubsub.asyncIterator(session.userId), function () {
        console.log(session.userId);
      });
    }
  },
  publicMessageSent: {
    subscribe: function subscribe(obj, args, _ref2, info) {
      var session = _ref2.session;
      return pubsub.asyncIterator(args.group);
    }
  },
  generalInfo: {
    subscribe: function () {
      var _subscribe = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(obj, _ref3, _ref4, info) {
        var contactId, session, userLoader, groupLoader, messageLoader, user, queues;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contactId = _ref3.contactId;
                session = _ref4.session, userLoader = _ref4.userLoader, groupLoader = _ref4.groupLoader, messageLoader = _ref4.messageLoader;
                _context.next = 4;
                return User.findById(session.userId).populate("contacts").populate('groups');

              case 4:
                user = _context.sent;
                queues = [];

                if (contactId) {
                  queues.push(contactId);
                } else {
                  queues = user.contacts.map(function (c) {
                    userLoader.prime("".concat(c.id), c);
                    return "".concat(c.id);
                  });
                  user.groups.map(function (g) {
                    groupLoader.prime("".concat(g.id), g);
                    queues.push("".concat(g.id));
                  });
                  queues.push(session.userId);
                }

                return _context.abrupt("return", (0, _apolloServerExpress.withFilter)(function () {
                  return pubsub.asyncIterator(queues);
                }, function (payload) {
                  //filter if typing for me
                  if (payload.generalInfo.typing && payload.generalInfo.destination === session.userId) return false;
                  if (payload.generalInfo.typingForMe && payload.generalInfo.destination !== session.userId) return false;
                  if (payload.generalInfo.readed && payload.generalInfo.destination !== session.userId) return false;
                  if (payload.generalInfo.newContact && payload.generalInfo.destination !== session.userId) return false;
                  if (payload.generalInfo.newGroup && payload.generalInfo.destination !== session.userId) return false;
                  if (payload.generalInfo.newMessage && !payload.generalInfo.destination.find(function (u) {
                    return u === session.userId;
                  })) return false;
                  return true;
                })(obj, {
                  contactId: contactId
                }, {
                  session: session,
                  userLoader: userLoader,
                  groupLoader: groupLoader,
                  messageLoader: messageLoader
                }, info));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function subscribe(_x, _x2, _x3, _x4) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsInVzZXJMb2FkZXIiLCJncm91cExvYWRlciIsIm1lc3NhZ2VMb2FkZXIiLCJmaW5kQnlJZCIsInBvcHVsYXRlIiwidXNlciIsInF1ZXVlcyIsInB1c2giLCJjb250YWN0cyIsIm1hcCIsImMiLCJwcmltZSIsImlkIiwiZ3JvdXBzIiwiZyIsInBheWxvYWQiLCJ0eXBpbmciLCJkZXN0aW5hdGlvbiIsInR5cGluZ0Zvck1lIiwicmVhZGVkIiwibmV3Q29udGFjdCIsIm5ld0dyb3VwIiwibmV3TWVzc2FnZSIsImZpbmQiLCJ1Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBRyx1QkFBTSwwQkFBTixDQUFkO0FBRU8sSUFBSUMsTUFBTSxHQUFHLElBQUlDLDJCQUFKLEVBQWI7O0FBQ1AsSUFBTUMsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjs7QUFHQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxhQUFELEVBQWdCQyxRQUFoQixFQUErQjtBQUNoRCwyQkFDS0QsYUFETDtBQUFBLGlDQUVXO0FBQ1BDLE1BQUFBLFFBQVE7QUFDUixhQUFPRCxhQUFhLFVBQWIsR0FBdUJBLGFBQWEsVUFBYixFQUF2QixHQUFnREUsT0FBTyxD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QUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBREU7QUFmRixDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiZGVidWdcIjtcclxuaW1wb3J0IHsgd2l0aEZpbHRlciwgUHViU3ViIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcclxuXHJcbmltcG9ydCBNb25nb29zZU1vZGVscyBmcm9tIFwiLi4vbW9uZ29vc2VNb2RlbHNcIjtcclxuXHJcbmNvbnN0IGRlYnVnID0gRGVidWcoXCJjaGF0LXBsdWdpbjpTdWJzY3JpcHRpb25cIik7XHJcblxyXG5leHBvcnQgbGV0IHB1YnN1YiA9IG5ldyBQdWJTdWIoKTtcclxuY29uc3QgVXNlciA9IE1vbmdvb3NlTW9kZWxzKCdVc2VyJyk7XHJcblxyXG5cclxuY29uc3Qgd2l0aENhbmNlbCA9IChhc3luY0l0ZXJhdG9yLCBvbkNhbmNlbCwgKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLmFzeW5jSXRlcmF0b3IsXHJcbiAgICByZXR1cm4oKSB7XHJcbiAgICAgIG9uQ2FuY2VsKClcclxuICAgICAgcmV0dXJuIGFzeW5jSXRlcmF0b3IucmV0dXJuID8gYXN5bmNJdGVyYXRvci5yZXR1cm4oKSA6IFByb21pc2UucmVzb2x2ZSh7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwZXJzb25hbE1lc3NhZ2VTZW50OiAge1xyXG4gICAgICBzdWJzY3JpYmU6IChvYmosIGFyZ3MsIHtzZXNzaW9ufSwgaW5mbykgPT4ge1xyXG4gICAgICAgIHJldHVybiB3aXRoQ2FuY2VsKHB1YnN1Yi5hc3luY0l0ZXJhdG9yKHNlc3Npb24udXNlcklkKSwgKCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHB1YmxpY01lc3NhZ2VTZW50OiAge1xyXG4gICAgICBzdWJzY3JpYmU6IFxyXG4gICAgICAgIChvYmosIGFyZ3MsIHtzZXNzaW9ufSwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHB1YnN1Yi5hc3luY0l0ZXJhdG9yKGFyZ3MuZ3JvdXApXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdlbmVyYWxJbmZvOiB7XHJcbiAgICAgIHN1YnNjcmliZTogYXN5bmMgKG9iaiwge2NvbnRhY3RJZH0sIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlciwgbWVzc2FnZUxvYWRlcn0sIGluZm8pID0+IHsgXHJcblxyXG4gICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHNlc3Npb24udXNlcklkKS5wb3B1bGF0ZShcImNvbnRhY3RzXCIpLnBvcHVsYXRlKCdncm91cHMnKVxyXG4gICAgICAgICAgbGV0IHF1ZXVlcyA9IFtdO1xyXG4gICAgICAgICAgaWYgKGNvbnRhY3RJZCkge1xyXG4gICAgICAgICAgICBxdWV1ZXMucHVzaChjb250YWN0SWQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVldWVzID0gdXNlci5jb250YWN0cy5tYXAoKGMpID0+IHtcclxuICAgICAgICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke2MuaWR9YCwgYyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGAke2MuaWR9YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHVzZXIuZ3JvdXBzLm1hcCgoZykgPT4ge1xyXG4gICAgICAgICAgICAgIGdyb3VwTG9hZGVyLnByaW1lKGAke2cuaWR9YCwgZyk7XHJcbiAgICAgICAgICAgICAgcXVldWVzLnB1c2goYCR7Zy5pZH1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBxdWV1ZXMucHVzaChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHdpdGhGaWx0ZXIoICgpID0+ICBwdWJzdWIuYXN5bmNJdGVyYXRvcihxdWV1ZXMpLFxyXG4gICAgICAgICAgICAocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vZmlsdGVyIGlmIHR5cGluZyBmb3IgbWVcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby50eXBpbmcgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gPT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnR5cGluZ0Zvck1lICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5yZWFkZWQgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld0NvbnRhY3QgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld0dyb3VwICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5uZXdNZXNzYWdlICYmICEocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbi5maW5kKCB1ID0+IHUgPT09IHNlc3Npb24udXNlcklkKSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSApKG9iaiwge2NvbnRhY3RJZH0sIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlciwgbWVzc2FnZUxvYWRlcn0sIGluZm8pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn0iXX0=