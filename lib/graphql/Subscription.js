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
                  if (payload.generalInfo.deleteGroup && payload.generalInfo.destination !== session.userId) return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsInVzZXJMb2FkZXIiLCJncm91cExvYWRlciIsIm1lc3NhZ2VMb2FkZXIiLCJmaW5kQnlJZCIsInBvcHVsYXRlIiwidXNlciIsInF1ZXVlcyIsInB1c2giLCJjb250YWN0cyIsIm1hcCIsImMiLCJwcmltZSIsImlkIiwiZ3JvdXBzIiwiZyIsInBheWxvYWQiLCJ0eXBpbmciLCJkZXN0aW5hdGlvbiIsInR5cGluZ0Zvck1lIiwicmVhZGVkIiwibmV3Q29udGFjdCIsIm5ld0dyb3VwIiwiZGVsZXRlR3JvdXAiLCJuZXdNZXNzYWdlIiwiZmluZCIsInUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHVCQUFNLDBCQUFOLENBQWQ7QUFFTyxJQUFJQyxNQUFNLEdBQUcsSUFBSUMsMkJBQUosRUFBYjs7QUFDUCxJQUFNQyxJQUFJLEdBQUcsZ0NBQWUsTUFBZixDQUFiOztBQUdBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLGFBQUQsRUFBZ0JDLFFBQWhCLEVBQStCO0FBQ2hELDJCQUNLRCxhQURMO0FBQUEsaUNBRVc7QUFDUEMsTUFBQUEsUUFBUTtBQUNSLGFBQU9ELGFBQWEsVUFBYixHQUF1QkEsYUFBYSxVQUFiLEVBQXZC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VSxFQUFWQSxVQUFWO0FBQXNCQyxrQkFBQUEsV0FBVyxFQUFYQSxXQUF0QjtBQUFtQ0Msa0JBQUFBLGFBQWEsRUFBYkE7QUFBbkMsaUJBWGpCLEVBV29FWCxJQVhwRSxDQXBCQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBREU7QUFmRixDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiZGVidWdcIjtcclxuaW1wb3J0IHsgd2l0aEZpbHRlciwgUHViU3ViIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcclxuXHJcbmltcG9ydCBNb25nb29zZU1vZGVscyBmcm9tIFwiLi4vbW9uZ29vc2VNb2RlbHNcIjtcclxuXHJcbmNvbnN0IGRlYnVnID0gRGVidWcoXCJjaGF0LXBsdWdpbjpTdWJzY3JpcHRpb25cIik7XHJcblxyXG5leHBvcnQgbGV0IHB1YnN1YiA9IG5ldyBQdWJTdWIoKTtcclxuY29uc3QgVXNlciA9IE1vbmdvb3NlTW9kZWxzKCdVc2VyJyk7XHJcblxyXG5cclxuY29uc3Qgd2l0aENhbmNlbCA9IChhc3luY0l0ZXJhdG9yLCBvbkNhbmNlbCwgKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLmFzeW5jSXRlcmF0b3IsXHJcbiAgICByZXR1cm4oKSB7XHJcbiAgICAgIG9uQ2FuY2VsKClcclxuICAgICAgcmV0dXJuIGFzeW5jSXRlcmF0b3IucmV0dXJuID8gYXN5bmNJdGVyYXRvci5yZXR1cm4oKSA6IFByb21pc2UucmVzb2x2ZSh7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwZXJzb25hbE1lc3NhZ2VTZW50OiAge1xyXG4gICAgICBzdWJzY3JpYmU6IChvYmosIGFyZ3MsIHtzZXNzaW9ufSwgaW5mbykgPT4ge1xyXG4gICAgICAgIHJldHVybiB3aXRoQ2FuY2VsKHB1YnN1Yi5hc3luY0l0ZXJhdG9yKHNlc3Npb24udXNlcklkKSwgKCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHB1YmxpY01lc3NhZ2VTZW50OiAge1xyXG4gICAgICBzdWJzY3JpYmU6IFxyXG4gICAgICAgIChvYmosIGFyZ3MsIHtzZXNzaW9ufSwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHB1YnN1Yi5hc3luY0l0ZXJhdG9yKGFyZ3MuZ3JvdXApXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdlbmVyYWxJbmZvOiB7XHJcbiAgICAgIHN1YnNjcmliZTogYXN5bmMgKG9iaiwge2NvbnRhY3RJZH0sIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlciwgbWVzc2FnZUxvYWRlcn0sIGluZm8pID0+IHsgXHJcblxyXG4gICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHNlc3Npb24udXNlcklkKS5wb3B1bGF0ZShcImNvbnRhY3RzXCIpLnBvcHVsYXRlKCdncm91cHMnKVxyXG4gICAgICAgICAgbGV0IHF1ZXVlcyA9IFtdO1xyXG4gICAgICAgICAgaWYgKGNvbnRhY3RJZCkge1xyXG4gICAgICAgICAgICBxdWV1ZXMucHVzaChjb250YWN0SWQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVldWVzID0gdXNlci5jb250YWN0cy5tYXAoKGMpID0+IHtcclxuICAgICAgICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke2MuaWR9YCwgYyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGAke2MuaWR9YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHVzZXIuZ3JvdXBzLm1hcCgoZykgPT4ge1xyXG4gICAgICAgICAgICAgIGdyb3VwTG9hZGVyLnByaW1lKGAke2cuaWR9YCwgZyk7XHJcbiAgICAgICAgICAgICAgcXVldWVzLnB1c2goYCR7Zy5pZH1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBxdWV1ZXMucHVzaChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHdpdGhGaWx0ZXIoICgpID0+ICBwdWJzdWIuYXN5bmNJdGVyYXRvcihxdWV1ZXMpLFxyXG4gICAgICAgICAgICAocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vZmlsdGVyIGlmIHR5cGluZyBmb3IgbWVcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby50eXBpbmcgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gPT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnR5cGluZ0Zvck1lICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5yZWFkZWQgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld0NvbnRhY3QgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld0dyb3VwICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZWxldGVHcm91cCAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8ubmV3TWVzc2FnZSAmJiAhKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24uZmluZCggdSA9PiB1ID09PSBzZXNzaW9uLnVzZXJJZCkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gKShvYmosIHtjb250YWN0SWR9LCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9LCBpbmZvKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59Il19