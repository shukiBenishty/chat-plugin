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
        var contactId, session, user, queues;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contactId = _ref3.contactId;
                session = _ref4.session;
                _context.next = 4;
                return User.findById(session.userId).populate("contacts").populate('groups');

              case 4:
                user = _context.sent;
                queues = [];

                if (contactId) {
                  queues.push(contactId);
                } else {
                  queues = user.contacts.map(function (c) {
                    return "".concat(c.id);
                  });
                  user.groups.map(function (g) {
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
                  if (payload.generalInfo.editComment && !payload.generalInfo.destination.find(function (u) {
                    return "".concat(u.id) === session.userId;
                  })) return false;
                  if (payload.generalInfo.newMessage && !payload.generalInfo.destination.find(function (u) {
                    return u === session.userId;
                  })) return false;
                  return true;
                })(obj, {
                  contactId: contactId
                }, {
                  session: session
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsImZpbmRCeUlkIiwicG9wdWxhdGUiLCJ1c2VyIiwicXVldWVzIiwicHVzaCIsImNvbnRhY3RzIiwibWFwIiwiYyIsImlkIiwiZ3JvdXBzIiwiZyIsInBheWxvYWQiLCJ0eXBpbmciLCJkZXN0aW5hdGlvbiIsInR5cGluZ0Zvck1lIiwicmVhZGVkIiwibmV3Q29udGFjdCIsIm5ld0dyb3VwIiwiZGVsZXRlR3JvdXAiLCJlZGl0Q29tbWVudCIsImZpbmQiLCJ1IiwibmV3TWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUcsdUJBQU0sMEJBQU4sQ0FBZDtBQUVPLElBQUlDLE1BQU0sR0FBRyxJQUFJQywyQkFBSixFQUFiOztBQUNQLElBQU1DLElBQUksR0FBRyxnQ0FBZSxNQUFmLENBQWI7O0FBR0EsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsYUFBRCxFQUFnQkMsUUFBaEIsRUFBK0I7QUFDaEQsMkJBQ0tELGFBREw7QUFBQSxpQ0FFVztBQUNQQyxNQUFBQSxRQUFRO0FBQ1IsYUFBT0QsYUFBYSxVQUFiLEdBQXVCQSxhQUFhLFVBQWIsRUFBdkIsR0FBZ0RFLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQjtBQUFFQyxR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QUE7O0FBQUE7QUFBQTtBQURFO0FBZkYsQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgRGVidWcgZnJvbSBcImRlYnVnXCI7XHJcbmltcG9ydCB7IHdpdGhGaWx0ZXIsIFB1YlN1YiB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XHJcblxyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5jb25zdCBkZWJ1ZyA9IERlYnVnKFwiY2hhdC1wbHVnaW46U3Vic2NyaXB0aW9uXCIpO1xyXG5cclxuZXhwb3J0IGxldCBwdWJzdWIgPSBuZXcgUHViU3ViKCk7XHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuXHJcbmNvbnN0IHdpdGhDYW5jZWwgPSAoYXN5bmNJdGVyYXRvciwgb25DYW5jZWwsICkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5hc3luY0l0ZXJhdG9yLFxyXG4gICAgcmV0dXJuKCkge1xyXG4gICAgICBvbkNhbmNlbCgpXHJcbiAgICAgIHJldHVybiBhc3luY0l0ZXJhdG9yLnJldHVybiA/IGFzeW5jSXRlcmF0b3IucmV0dXJuKCkgOiBQcm9taXNlLnJlc29sdmUoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGVyc29uYWxNZXNzYWdlU2VudDogIHtcclxuICAgICAgc3Vic2NyaWJlOiAob2JqLCBhcmdzLCB7c2Vzc2lvbn0sIGluZm8pID0+IHtcclxuICAgICAgICByZXR1cm4gd2l0aENhbmNlbChwdWJzdWIuYXN5bmNJdGVyYXRvcihzZXNzaW9uLnVzZXJJZCksICgpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwdWJsaWNNZXNzYWdlU2VudDogIHtcclxuICAgICAgc3Vic2NyaWJlOiBcclxuICAgICAgICAob2JqLCBhcmdzLCB7c2Vzc2lvbn0sIGluZm8pID0+IHtcclxuICAgICAgICAgIHJldHVybiBwdWJzdWIuYXN5bmNJdGVyYXRvcihhcmdzLmdyb3VwKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZW5lcmFsSW5mbzoge1xyXG4gICAgICBzdWJzY3JpYmU6IGFzeW5jIChvYmosIHtjb250YWN0SWR9LCB7c2Vzc2lvbn0gLCBpbmZvKSA9PiB7IFxyXG5cclxuICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChzZXNzaW9uLnVzZXJJZCkucG9wdWxhdGUoXCJjb250YWN0c1wiKS5wb3B1bGF0ZSgnZ3JvdXBzJylcclxuICAgICAgICAgIGxldCBxdWV1ZXMgPSBbXTtcclxuICAgICAgICAgIGlmIChjb250YWN0SWQpIHtcclxuICAgICAgICAgICAgcXVldWVzLnB1c2goY29udGFjdElkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHF1ZXVlcyA9IHVzZXIuY29udGFjdHMubWFwKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGAke2MuaWR9YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHVzZXIuZ3JvdXBzLm1hcCgoZykgPT4ge1xyXG4gICAgICAgICAgICAgIHF1ZXVlcy5wdXNoKGAke2cuaWR9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcXVldWVzLnB1c2goc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB3aXRoRmlsdGVyKCAoKSA9PiAgcHVic3ViLmFzeW5jSXRlcmF0b3IocXVldWVzKSxcclxuICAgICAgICAgICAgKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgICAvL2ZpbHRlciBpZiB0eXBpbmcgZm9yIG1lXHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8udHlwaW5nICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uID09PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby50eXBpbmdGb3JNZSAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8ucmVhZGVkICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5uZXdDb250YWN0ICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5uZXdHcm91cCAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVsZXRlR3JvdXAgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmVkaXRDb21tZW50ICYmICEocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbi5maW5kKCB1ID0+IGAke3UuaWR9YCA9PT0gc2Vzc2lvbi51c2VySWQpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld01lc3NhZ2UgJiYgIShwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uLmZpbmQoIHUgPT4gdSA9PT0gc2Vzc2lvbi51c2VySWQpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ICkob2JqLCB7Y29udGFjdElkfSwge3Nlc3Npb259LCBpbmZvKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59Il19