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
        var contactId, session, user, queues;
        return _regenerator["default"].wrap(function _callee$(_context) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsImZpbmRCeUlkIiwicG9wdWxhdGUiLCJ1c2VyIiwicXVldWVzIiwicHVzaCIsImNvbnRhY3RzIiwibWFwIiwiYyIsImlkIiwiZ3JvdXBzIiwiZyIsInBheWxvYWQiLCJ0eXBpbmciLCJkZXN0aW5hdGlvbiIsInR5cGluZ0Zvck1lIiwicmVhZGVkIiwibmV3Q29udGFjdCIsIm5ld0dyb3VwIiwiZGVsZXRlR3JvdXAiLCJlZGl0Q29tbWVudCIsImZpbmQiLCJ1IiwibmV3TWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHVCQUFNLDBCQUFOLENBQWQ7QUFFTyxJQUFJQyxNQUFNLEdBQUcsSUFBSUMsMkJBQUosRUFBYjs7QUFDUCxJQUFNQyxJQUFJLEdBQUcsZ0NBQWUsTUFBZixDQUFiOztBQUdBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLGFBQUQsRUFBZ0JDLFFBQWhCLEVBQStCO0FBQ2hELDRDQUNLRCxhQURMO0FBQUEsaUNBRVc7QUFDUEMsTUFBQUEsUUFBUTtBQUNSLGFBQU9ELGFBQWEsVUFBYixHQUF1QkEsYUFBYSxVQUFiLEVBQXZCLEdBQWdERSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0I7QUFBRUMsUUFB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OztBQUFBO0FBQUE7QUFERTtBQWZGLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IERlYnVnIGZyb20gXCJkZWJ1Z1wiO1xyXG5pbXBvcnQgeyB3aXRoRmlsdGVyLCBQdWJTdWIgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xyXG5cclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuY29uc3QgZGVidWcgPSBEZWJ1ZyhcImNoYXQtcGx1Z2luOlN1YnNjcmlwdGlvblwiKTtcclxuXHJcbmV4cG9ydCBsZXQgcHVic3ViID0gbmV3IFB1YlN1YigpO1xyXG5jb25zdCBVc2VyID0gTW9uZ29vc2VNb2RlbHMoJ1VzZXInKTtcclxuXHJcblxyXG5jb25zdCB3aXRoQ2FuY2VsID0gKGFzeW5jSXRlcmF0b3IsIG9uQ2FuY2VsLCApID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4uYXN5bmNJdGVyYXRvcixcclxuICAgIHJldHVybigpIHtcclxuICAgICAgb25DYW5jZWwoKVxyXG4gICAgICByZXR1cm4gYXN5bmNJdGVyYXRvci5yZXR1cm4gPyBhc3luY0l0ZXJhdG9yLnJldHVybigpIDogUHJvbWlzZS5yZXNvbHZlKHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBlcnNvbmFsTWVzc2FnZVNlbnQ6ICB7XHJcbiAgICAgIHN1YnNjcmliZTogKG9iaiwgYXJncywge3Nlc3Npb259LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdpdGhDYW5jZWwocHVic3ViLmFzeW5jSXRlcmF0b3Ioc2Vzc2lvbi51c2VySWQpLCAoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb24udXNlcklkKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcHVibGljTWVzc2FnZVNlbnQ6ICB7XHJcbiAgICAgIHN1YnNjcmliZTogXHJcbiAgICAgICAgKG9iaiwgYXJncywge3Nlc3Npb259LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHVic3ViLmFzeW5jSXRlcmF0b3IoYXJncy5ncm91cClcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2VuZXJhbEluZm86IHtcclxuICAgICAgc3Vic2NyaWJlOiBhc3luYyAob2JqLCB7Y29udGFjdElkfSwge3Nlc3Npb259ICwgaW5mbykgPT4geyBcclxuXHJcbiAgICAgICAgICBsZXQgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQoc2Vzc2lvbi51c2VySWQpLnBvcHVsYXRlKFwiY29udGFjdHNcIikucG9wdWxhdGUoJ2dyb3VwcycpXHJcbiAgICAgICAgICBsZXQgcXVldWVzID0gW107XHJcbiAgICAgICAgICBpZiAoY29udGFjdElkKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlcy5wdXNoKGNvbnRhY3RJZCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBxdWV1ZXMgPSB1c2VyLmNvbnRhY3RzLm1hcCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBgJHtjLmlkfWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB1c2VyLmdyb3Vwcy5tYXAoKGcpID0+IHtcclxuICAgICAgICAgICAgICBxdWV1ZXMucHVzaChgJHtnLmlkfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHF1ZXVlcy5wdXNoKHNlc3Npb24udXNlcklkKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gd2l0aEZpbHRlciggKCkgPT4gIHB1YnN1Yi5hc3luY0l0ZXJhdG9yKHF1ZXVlcyksXHJcbiAgICAgICAgICAgIChwYXlsb2FkKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy9maWx0ZXIgaWYgdHlwaW5nIGZvciBtZVxyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnR5cGluZyAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiA9PT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8udHlwaW5nRm9yTWUgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnJlYWRlZCAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8ubmV3Q29udGFjdCAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8ubmV3R3JvdXAgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlbGV0ZUdyb3VwICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5lZGl0Q29tbWVudCAmJiAhKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24uZmluZCggdSA9PiBgJHt1LmlkfWAgPT09IHNlc3Npb24udXNlcklkKSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5uZXdNZXNzYWdlICYmICEocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbi5maW5kKCB1ID0+IHUgPT09IHNlc3Npb24udXNlcklkKSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSApKG9iaiwge2NvbnRhY3RJZH0sIHtzZXNzaW9ufSwgaW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxufSJdfQ==