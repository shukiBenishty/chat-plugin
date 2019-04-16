"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pubsub = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _debug = _interopRequireDefault(require("debug"));

var _apolloServerExpress = require("apollo-server-express");

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var debug = (0, _debug["default"])("chat-plugin:Subscription");
var pubsub = new _apolloServerExpress.PubSub();
exports.pubsub = pubsub;
var User = (0, _mongooseModels["default"])('User');

var withCancel = function withCancel(asyncIterator, onCancel) {
  return (0, _objectSpread2["default"])({}, asyncIterator, {
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
      var _subscribe = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(obj, _ref3, _ref4, info) {
        var contactId, session, userLoader, groupLoader, messageLoader, user, queues;
        return _regenerator["default"].wrap(function _callee$(_context) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsInVzZXJMb2FkZXIiLCJncm91cExvYWRlciIsIm1lc3NhZ2VMb2FkZXIiLCJmaW5kQnlJZCIsInBvcHVsYXRlIiwidXNlciIsInF1ZXVlcyIsInB1c2giLCJjb250YWN0cyIsIm1hcCIsImMiLCJwcmltZSIsImlkIiwiZ3JvdXBzIiwiZyIsInBheWxvYWQiLCJ0eXBpbmciLCJkZXN0aW5hdGlvbiIsInR5cGluZ0Zvck1lIiwicmVhZGVkIiwibmV3Q29udGFjdCIsIm5ld0dyb3VwIiwiZGVsZXRlR3JvdXAiLCJuZXdNZXNzYWdlIiwiZmluZCIsInUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQUVBOztBQUVBLElBQU1BLEtBQUssR0FBRyx1QkFBTSwwQkFBTixDQUFkO0FBRU8sSUFBSUMsTUFBTSxHQUFHLElBQUlDLDJCQUFKLEVBQWI7O0FBQ1AsSUFBTUMsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjs7QUFHQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxhQUFELEVBQWdCQyxRQUFoQixFQUErQjtBQUNoRCw0Q0FDS0QsYUFETDtBQUFBLGlDQUVXO0FBQ1BDLE1BQUFBLFFBQVE7QUFDUixhQUFPRCxhQUFhLFVBQWIsR0FBdUJBLGFBQWEsVUFBYixFQUF2QixH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RUFBVkEsVUFBVjtBQUFzQkMsa0JBQUFBLFdBQVcsRUFBWEEsV0FBdEI7QUFBbUNDLGtCQUFBQSxhQUFhLEVBQWJBO0FBQW5DLGlCQVhqQixFQVdvRVgsSUFYcEUsQ0FwQkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQURFO0FBZkYsQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgRGVidWcgZnJvbSBcImRlYnVnXCI7XHJcbmltcG9ydCB7IHdpdGhGaWx0ZXIsIFB1YlN1YiB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XHJcblxyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5jb25zdCBkZWJ1ZyA9IERlYnVnKFwiY2hhdC1wbHVnaW46U3Vic2NyaXB0aW9uXCIpO1xyXG5cclxuZXhwb3J0IGxldCBwdWJzdWIgPSBuZXcgUHViU3ViKCk7XHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuXHJcbmNvbnN0IHdpdGhDYW5jZWwgPSAoYXN5bmNJdGVyYXRvciwgb25DYW5jZWwsICkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5hc3luY0l0ZXJhdG9yLFxyXG4gICAgcmV0dXJuKCkge1xyXG4gICAgICBvbkNhbmNlbCgpXHJcbiAgICAgIHJldHVybiBhc3luY0l0ZXJhdG9yLnJldHVybiA/IGFzeW5jSXRlcmF0b3IucmV0dXJuKCkgOiBQcm9taXNlLnJlc29sdmUoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGVyc29uYWxNZXNzYWdlU2VudDogIHtcclxuICAgICAgc3Vic2NyaWJlOiAob2JqLCBhcmdzLCB7c2Vzc2lvbn0sIGluZm8pID0+IHtcclxuICAgICAgICByZXR1cm4gd2l0aENhbmNlbChwdWJzdWIuYXN5bmNJdGVyYXRvcihzZXNzaW9uLnVzZXJJZCksICgpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwdWJsaWNNZXNzYWdlU2VudDogIHtcclxuICAgICAgc3Vic2NyaWJlOiBcclxuICAgICAgICAob2JqLCBhcmdzLCB7c2Vzc2lvbn0sIGluZm8pID0+IHtcclxuICAgICAgICAgIHJldHVybiBwdWJzdWIuYXN5bmNJdGVyYXRvcihhcmdzLmdyb3VwKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZW5lcmFsSW5mbzoge1xyXG4gICAgICBzdWJzY3JpYmU6IGFzeW5jIChvYmosIHtjb250YWN0SWR9LCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9LCBpbmZvKSA9PiB7IFxyXG5cclxuICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChzZXNzaW9uLnVzZXJJZCkucG9wdWxhdGUoXCJjb250YWN0c1wiKS5wb3B1bGF0ZSgnZ3JvdXBzJylcclxuICAgICAgICAgIGxldCBxdWV1ZXMgPSBbXTtcclxuICAgICAgICAgIGlmIChjb250YWN0SWQpIHtcclxuICAgICAgICAgICAgcXVldWVzLnB1c2goY29udGFjdElkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHF1ZXVlcyA9IHVzZXIuY29udGFjdHMubWFwKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgdXNlckxvYWRlci5wcmltZShgJHtjLmlkfWAsIGMpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBgJHtjLmlkfWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB1c2VyLmdyb3Vwcy5tYXAoKGcpID0+IHtcclxuICAgICAgICAgICAgICBncm91cExvYWRlci5wcmltZShgJHtnLmlkfWAsIGcpO1xyXG4gICAgICAgICAgICAgIHF1ZXVlcy5wdXNoKGAke2cuaWR9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcXVldWVzLnB1c2goc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB3aXRoRmlsdGVyKCAoKSA9PiAgcHVic3ViLmFzeW5jSXRlcmF0b3IocXVldWVzKSxcclxuICAgICAgICAgICAgKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgICAvL2ZpbHRlciBpZiB0eXBpbmcgZm9yIG1lXHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8udHlwaW5nICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uID09PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby50eXBpbmdGb3JNZSAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8ucmVhZGVkICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5uZXdDb250YWN0ICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5uZXdHcm91cCAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVsZXRlR3JvdXAgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld01lc3NhZ2UgJiYgIShwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uLmZpbmQoIHUgPT4gdSA9PT0gc2Vzc2lvbi51c2VySWQpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ICkob2JqLCB7Y29udGFjdElkfSwge3Nlc3Npb24sIHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyLCBtZXNzYWdlTG9hZGVyfSwgaW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxufSJdfQ==