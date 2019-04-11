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
                    _dataLoader.userLoader.prime("".concat(c.id), c);

                    return "".concat(c.id);
                  });
                  user.groups.map(function (g) {
                    _dataLoader.groupLoader.prime("".concat(g.id), g);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL1N1YnNjcmlwdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWJ1ZyIsInB1YnN1YiIsIlB1YlN1YiIsIlVzZXIiLCJ3aXRoQ2FuY2VsIiwiYXN5bmNJdGVyYXRvciIsIm9uQ2FuY2VsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImRvbmUiLCJwZXJzb25hbE1lc3NhZ2VTZW50Iiwic3Vic2NyaWJlIiwib2JqIiwiYXJncyIsImluZm8iLCJzZXNzaW9uIiwidXNlcklkIiwiY29uc29sZSIsImxvZyIsInB1YmxpY01lc3NhZ2VTZW50IiwiZ3JvdXAiLCJnZW5lcmFsSW5mbyIsImNvbnRhY3RJZCIsImZpbmRCeUlkIiwicG9wdWxhdGUiLCJ1c2VyIiwicXVldWVzIiwicHVzaCIsImNvbnRhY3RzIiwibWFwIiwiYyIsInVzZXJMb2FkZXIiLCJwcmltZSIsImlkIiwiZ3JvdXBzIiwiZyIsImdyb3VwTG9hZGVyIiwicGF5bG9hZCIsInR5cGluZyIsImRlc3RpbmF0aW9uIiwidHlwaW5nRm9yTWUiLCJyZWFkZWQiLCJuZXdNZXNzYWdlIiwiZmluZCIsInUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHVCQUFNLDBCQUFOLENBQWQ7QUFFTyxJQUFJQyxNQUFNLEdBQUcsSUFBSUMsMkJBQUosRUFBYjs7QUFDUCxJQUFNQyxJQUFJLEdBQUcsZ0NBQWUsTUFBZixDQUFiOztBQUdBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLGFBQUQsRUFBZ0JDLFFBQWhCLEVBQStCO0FBQ2hELDJCQUNLRCxhQURMO0FBQUEsaUNBRVc7QUFDUEMsTUFBQUEsUUFBUTtBQUNSLGFBQU9ELGFBQWEsVUFBYixHQUF1QkEsYUFBYSxVQUFiLEVBQXZCLEdBQWdERSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0I7QUFBRUMsUUFBQUEsS0FBSyxF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QVIsQ0FBb0JrQixXQUFwQixLQUFvQ3hCLE9BQU8sQ0FBQ0MsTUFBL0UsRUFBd0YsT0FBTyxLQUFQO0FBQ3hGLHNCQUFJcUIsT0FBTyxDQUFDaEIsV0FBUixDQUFvQnFCLFVBQXBCLElBQWtDLENBQUVMLE9BQU8sQ0FBQ2hCLFdBQVIsQ0FBb0JrQixXQUFwQixDQUFnQ0ksSUFBaEMsQ0FBc0MsVUFBQUMsQ0FBQztBQUFBLDJCQUFJQSxDQUFDLEtBQUs3QixPQUFPLENBQUNDLE1BQWxCO0FBQUEsbUJBQXZDLENBQXhDLEVBQTJHLE9BQU8sS0FBUDtBQUMzRyx5QkFBTyxJQUFQO0FBQ0QsaUJBUkksRUFRREosR0FSQyxFQVFJO0FBQUNVLGtCQUFBQSxTQUFTLEVBQVRBO0FBQUQsaUJBUkosRUFRaUI7QUFBQ1Asa0JBQUFBLE9BQU8sRUFBUEE7QUFBRCxpQkFSakIsRUFRNEJELElBUjVCLENBcEJBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFERTtBQWZGLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IERlYnVnIGZyb20gXCJkZWJ1Z1wiO1xyXG5pbXBvcnQgeyB3aXRoRmlsdGVyLCBQdWJTdWIgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xyXG5cclxuaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi9tb25nb29zZU1vZGVsc1wiO1xyXG5pbXBvcnQgeyB1c2VyTG9hZGVyLCBncm91cExvYWRlciB9IGZyb20gJy4vZGF0YUxvYWRlcic7XHJcblxyXG5jb25zdCBkZWJ1ZyA9IERlYnVnKFwiY2hhdC1wbHVnaW46U3Vic2NyaXB0aW9uXCIpO1xyXG5cclxuZXhwb3J0IGxldCBwdWJzdWIgPSBuZXcgUHViU3ViKCk7XHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5cclxuXHJcbmNvbnN0IHdpdGhDYW5jZWwgPSAoYXN5bmNJdGVyYXRvciwgb25DYW5jZWwsICkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5hc3luY0l0ZXJhdG9yLFxyXG4gICAgcmV0dXJuKCkge1xyXG4gICAgICBvbkNhbmNlbCgpXHJcbiAgICAgIHJldHVybiBhc3luY0l0ZXJhdG9yLnJldHVybiA/IGFzeW5jSXRlcmF0b3IucmV0dXJuKCkgOiBQcm9taXNlLnJlc29sdmUoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcGVyc29uYWxNZXNzYWdlU2VudDogIHtcclxuICAgICAgc3Vic2NyaWJlOiAob2JqLCBhcmdzLCB7c2Vzc2lvbn0sIGluZm8pID0+IHtcclxuICAgICAgICByZXR1cm4gd2l0aENhbmNlbChwdWJzdWIuYXN5bmNJdGVyYXRvcihzZXNzaW9uLnVzZXJJZCksICgpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwdWJsaWNNZXNzYWdlU2VudDogIHtcclxuICAgICAgc3Vic2NyaWJlOiBcclxuICAgICAgICAob2JqLCBhcmdzLCB7c2Vzc2lvbn0sIGluZm8pID0+IHtcclxuICAgICAgICAgIHJldHVybiBwdWJzdWIuYXN5bmNJdGVyYXRvcihhcmdzLmdyb3VwKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZW5lcmFsSW5mbzoge1xyXG4gICAgICBzdWJzY3JpYmU6IGFzeW5jIChvYmosIHtjb250YWN0SWR9LCB7c2Vzc2lvbn0sIGluZm8pID0+IHsgXHJcblxyXG4gICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHNlc3Npb24udXNlcklkKS5wb3B1bGF0ZShcImNvbnRhY3RzXCIpLnBvcHVsYXRlKCdncm91cHMnKVxyXG4gICAgICAgICAgbGV0IHF1ZXVlcyA9IFtdO1xyXG4gICAgICAgICAgaWYgKGNvbnRhY3RJZCkge1xyXG4gICAgICAgICAgICBxdWV1ZXMucHVzaChjb250YWN0SWQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVldWVzID0gdXNlci5jb250YWN0cy5tYXAoKGMpID0+IHtcclxuICAgICAgICAgICAgICB1c2VyTG9hZGVyLnByaW1lKGAke2MuaWR9YCwgYyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGAke2MuaWR9YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHVzZXIuZ3JvdXBzLm1hcCgoZykgPT4ge1xyXG4gICAgICAgICAgICAgIGdyb3VwTG9hZGVyLnByaW1lKGAke2cuaWR9YCwgZyk7XHJcbiAgICAgICAgICAgICAgcXVldWVzLnB1c2goYCR7Zy5pZH1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBxdWV1ZXMucHVzaChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHdpdGhGaWx0ZXIoICgpID0+ICBwdWJzdWIuYXN5bmNJdGVyYXRvcihxdWV1ZXMpLFxyXG4gICAgICAgICAgICAocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vZmlsdGVyIGlmIHR5cGluZyBmb3IgbWVcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby50eXBpbmcgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gPT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLnR5cGluZ0Zvck1lICYmIChwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uICE9PSBzZXNzaW9uLnVzZXJJZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICBpZiAocGF5bG9hZC5nZW5lcmFsSW5mby5yZWFkZWQgJiYgKHBheWxvYWQuZ2VuZXJhbEluZm8uZGVzdGluYXRpb24gIT09IHNlc3Npb24udXNlcklkKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkLmdlbmVyYWxJbmZvLm5ld01lc3NhZ2UgJiYgIShwYXlsb2FkLmdlbmVyYWxJbmZvLmRlc3RpbmF0aW9uLmZpbmQoIHUgPT4gdSA9PT0gc2Vzc2lvbi51c2VySWQpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ICkob2JqLCB7Y29udGFjdElkfSwge3Nlc3Npb259LCBpbmZvKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59Il19