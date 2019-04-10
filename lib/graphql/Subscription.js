"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pubsub = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _apolloServerExpress = require("apollo-server-express");

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var _dataLoader = require("./dataLoader");

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
        var contactId, session, user, users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contactId = _ref3.contactId;
                session = _ref4.session;
                _context.next = 4;
                return User.findById(session.userId).populate("contacts");

              case 4:
                user = _context.sent;
                users = [];

                if (contactId) {
                  users.push(contactId);
                } else {
                  users = user.contacts.map(function (c) {
                    _dataLoader.userLoader.prime("".concat(c.id), c);

                    return "".concat(c.id);
                  });
                  users.push(session.userId);
                }

                return _context.abrupt("return", (0, _apolloServerExpress.withFilter)(function () {
                  return pubsub.asyncIterator(users);
                }, function (payload) {
                  //filter if typing for me
                  if (payload.generalInfo.typing && payload.generalInfo.destination === session.userId) return false;
                  if (payload.generalInfo.typingForMe && payload.generalInfo.destination !== session.userId) return false;
                  if (payload.generalInfo.readed && payload.generalInfo.destination !== session.userId) return false;
                  if (payload.generalInfo.newMessage && payload.generalInfo.destination !== session.userId) return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsImZpbmRCeUlkIiwicG9wdWxhdGUiLCJ1c2VyIiwidXNlcnMiLCJwdXNoIiwiY29udGFjdHMiLCJtYXAiLCJjIiwidXNlckxvYWRlciIsInByaW1lIiwiaWQiLCJwYXlsb2FkIiwidHlwaW5nIiwiZGVzdGluYXRpb24iLCJ0eXBpbmdGb3JNZSIsInJlYWRlZCIsIm5ld01lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHVCQUFNLDBCQUFOLENBQWQ7QUFFTyxJQUFJQyxNQUFNLEdBQUcsSUFBSUMsMkJBQUosRUFBYjs7QUFDUCxJQUFNQyxJQUFJLEdBQUcsZ0NBQWUsTUFBZixDQUFiOztBQUdBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLGFBQUQsRUFBZ0JDLFFBQWhCLEVBQStCO0FBQ2hELDJCQUNLRCxhQURMO0FBQUEsaUNBRVc7QUFDUEMsTUFBQUEsUUFBUTtBQUNSLGFBQU9ELGFBQWEsVUFBYixHQUF1QkEsYUFBYSxVQUFiLEVBQXZCLEdBQWdERSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0I7QUFBRUMsUUFBQUEsS0FBSyxFQUFFQyxTQUFUO0FBQW9CQyxRQUFBQSxJQUFJLEVBQUU7QUFBMUIs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RUFRaUI7QUFBQ1Asa0JBQUFBLE9BQU8sRUFBUEE7QUFBRCxpQkFSakIsRUFRNEJELElBUjVCLENBZEE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQURFO0FBZkYsQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgRGVidWcgZnJvbSBcImRlYnVnXCI7XHJcbmltcG9ydCB7IHdpdGhGaWx0ZXIsIFB1YlN1YiB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XHJcblxyXG5pbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHVzZXJMb2FkZXIgfSBmcm9tICcuL2RhdGFMb2FkZXInO1xyXG5cclxuY29uc3QgZGVidWcgPSBEZWJ1ZyhcImNoYXQtcGx1Z2luOlN1YnNjcmlwdGlvblwiKTtcclxuXHJcbmV4cG9ydCBsZXQgcHVic3ViID0gbmV3IFB1YlN1YigpO1xyXG5jb25zdCBVc2VyID0gTW9uZ29vc2VNb2RlbHMoJ1VzZXInKTtcclxuXHJcblxyXG5jb25zdCB3aXRoQ2FuY2VsID0gKGFzeW5jSXRlcmF0b3IsIG9uQ2FuY2VsLCApID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4uYXN5bmNJdGVyYXRvcixcclxuICAgIHJldHVybigpIHtcclxuICAgICAgb25DYW5jZWwoKVxyXG4gICAgICByZXR1cm4gYXN5bmNJdGVyYXRvci5yZXR1cm4gPyBhc3luY0l0ZXJhdG9yLnJldHVybigpIDogUHJvbWlzZS5yZXNvbHZlKHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBlcnNvbmFsTWVzc2FnZVNlbnQ6ICB7XHJcbiAgICAgIHN1YnNjcmliZTogKG9iaiwgYXJncywge3Nlc3Npb259LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdpdGhDYW5jZWwocHVic3ViLmFzeW5jSXRlcmF0b3Ioc2Vzc2lvbi51c2VySWQpLCAoKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb24udXNlcklkKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcHVibGljTWVzc2FnZVNlbnQ6ICB7XHJcbiAgICAgIHN1YnNjcmliZTogXHJcbiAgICAgICAgKG9iaiwgYXJncywge3Nlc3Npb259LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHVic3ViLmFzeW5jSXRlcmF0b3IoYXJncy5ncm91cClcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2VuZXJhbEluZm86IHtcclxuICAgICAgc3Vic2NyaWJlOiBhc3luYyAob2JqLCB7Y29udGFjdElkfSwge3Nlc3Npb259LCBpbmZvKSA9PiB7IFxyXG5cclxuICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChzZXNzaW9uLnVzZXJJZCkucG9wdWxhdGUoXCJjb250YWN0c1wiKVxyXG4gICAgICAgICAgbGV0IHVzZXJzID0gW107XHJcbiAgICAgICAgICBpZiAoY29udGFjdElkKSB7XHJcbiAgICAgICAgICAgIHVzZXJzLnB1c2goY29udGFjdElkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVzZXJzID0gdXNlci5jb250YWN0cy5tYXAoKGMpID0+IHtcclxuICAgICAgICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke2MuaWR9YCwgYyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGAke2MuaWR9YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdXNlcnMucHVzaChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHdpdGhGaWx0ZXIoICgpID0+ICBwdWJzdWIuYXN5bmNJdGVyYXRvcih1c2VycyksXHJcbiAgICAgICAgICAgIChwYXlsb2FkKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy9maWx0ZXIgaWYgdHlwaW5nIGZvciBtZVxyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnR5cGluZyAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiA9PT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8udHlwaW5nRm9yTWUgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnJlYWRlZCAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgaWYgKHBheWxvYWQuZ2VuZXJhbEluZm8ubmV3TWVzc2FnZSAmJiAocGF5bG9hZC5nZW5lcmFsSW5mby5kZXN0aW5hdGlvbiAhPT0gc2Vzc2lvbi51c2VySWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gKShvYmosIHtjb250YWN0SWR9LCB7c2Vzc2lvbn0sIGluZm8pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn0iXX0=