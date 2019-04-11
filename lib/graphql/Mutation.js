"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var _Subscription = require("./Subscription");

var _subscribers = _interopRequireDefault(require("./subscribers"));

var _dataLoader = require("./dataLoader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');

var sendMessage =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(parent, args, _ref) {
    var session, group, destModel, message, dest, publish;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            session = _ref.session;
            _context.next = 3;
            return _dataLoader.groupLoader.load(args.destination);

          case 3:
            group = _context.sent;
            destModel = group ? "Group" : "User";
            message = new Message({
              author: session.userId,
              data: args.message,
              destination: args.destination,
              destinationModel: destModel
            });

            if (_subscribers["default"].getItem(args.destination)) {
              message.received = true;
            }

            _context.next = 9;
            return message.save();

          case 9:
            message = _context.sent;
            _context.next = 12;
            return _dataLoader.messageLoader.load(message.id.toString());

          case 12:
            message = _context.sent;
            dest = [];

            if (destModel === "User") {
              dest.push(args.destination);
            } else {
              dest = group.subscribers.map(function (s) {
                return "".concat(s.id);
              });
            }

            publish = {
              generalInfo: {
                newMessage: message,
                destination: dest
              }
            };

            _Subscription.pubsub.publish(args.destination, publish);

            return _context.abrupt("return", message);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendMessage(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var addContact =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(parent, args, _ref3) {
    var session, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            session = _ref3.session;
            _context2.next = 3;
            return User.findOne({
              _id: session.userId,
              contacts: args.contactId
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 12;
              break;
            }

            _context2.next = 7;
            return _dataLoader.userLoader.load(session.userId);

          case 7:
            user = _context2.sent;
            user.contacts.push(args.contactId);
            _context2.next = 11;
            return user.save();

          case 11:
            user = _context2.sent;

          case 12:
            return _context2.abrupt("return", _dataLoader.userLoader.load(args.contactId));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addContact(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var addGroup =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(parent, args, _ref5) {
    var session, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            session = _ref5.session;
            _context3.next = 3;
            return User.findOne({
              _id: session.userId,
              groups: args.groupId
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 12;
              break;
            }

            _context3.next = 7;
            return _dataLoader.userLoader.load(session.userId);

          case 7:
            user = _context3.sent;
            user.groups.push(args.groupId);
            _context3.next = 11;
            return user.save();

          case 11:
            user = _context3.sent;

          case 12:
            return _context3.abrupt("return", _dataLoader.groupLoader.load(args.groupId));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addGroup(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var readMassage =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(parent, args, _ref7) {
    var session, message;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            session = _ref7.session;
            _context4.next = 3;
            return _dataLoader.messageLoader.load(args.messageId);

          case 3:
            message = _context4.sent;

            if (!(message.destination.id !== session.userId)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", null);

          case 6:
            message.readed = true;
            _context4.next = 9;
            return message.save();

          case 9:
            message = _context4.sent;

            _Subscription.pubsub.publish("".concat(message.author.id), {
              generalInfo: {
                readed: message,
                destination: message.author.id
              }
            });

            return _context4.abrupt("return", message);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function readMassage(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var typing =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(parent, args, _ref9) {
    var session, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            session = _ref9.session;
            _context5.next = 3;
            return _dataLoader.userLoader.load(session.userId);

          case 3:
            user = _context5.sent;

            //you cnot join this pubsub.publish because the subscription filter not send מeither to client
            _Subscription.pubsub.publish("".concat(session.userId), {
              generalInfo: {
                typing: user,
                destination: args.destination
              }
            });

            _Subscription.pubsub.publish("".concat(session.userId), {
              generalInfo: {
                typingForMe: user,
                destination: args.destination
              }
            });

            return _context5.abrupt("return", true);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function typing(_x13, _x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

var online =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(parent, args, _ref11) {
    var session, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            session = _ref11.session;
            _context6.next = 3;
            return _dataLoader.userLoader.load(session.userId);

          case 3:
            user = _context6.sent;

            _Subscription.pubsub.publish("".concat(session.userId), {
              generalInfo: {
                online: user
              }
            });

            return _context6.abrupt("return", true);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function online(_x16, _x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();

var _default = {
  sendMessageText: sendMessage,
  sendMessageEmoji: sendMessage,
  sendMessageFile: sendMessage,
  addContact: addContact,
  addGroup: addGroup,
  readMassage: readMassage,
  typing: typing,
  online: online
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL011dGF0aW9uLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwiR3JvdXAiLCJzZW5kTWVzc2FnZSIsInBhcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwiZ3JvdXBMb2FkZXIiLCJsb2FkIiwiZGVzdGluYXRpb24iLCJncm91cCIsImRlc3RNb2RlbCIsIm1lc3NhZ2UiLCJhdXRob3IiLCJ1c2VySWQiLCJkYXRhIiwiZGVzdGluYXRpb25Nb2RlbCIsInN1YnNjcmliZXJzIiwiZ2V0SXRlbSIsInJlY2VpdmVkIiwic2F2ZSIsIm1lc3NhZ2VMb2FkZXIiLCJpZCIsInRvU3RyaW5nIiwiZGVzdCIsInB1c2giLCJtYXAiLCJzIiwicHVibGlzaCIsImdlbmVyYWxJbmZvIiwibmV3TWVzc2FnZSIsInB1YnN1YiIsImFkZENvbnRhY3QiLCJmaW5kT25lIiwiX2lkIiwiY29udGFjdHMiLCJjb250YWN0SWQiLCJ1c2VyIiwidXNlckxvYWRlciIsImFkZEdyb3VwIiwiZ3JvdXBzIiwiZ3JvdXBJZCIsInJlYWRNYXNzYWdlIiwibWVzc2FnZUlkIiwicmVhZGVkIiwidHlwaW5nIiwidHlwaW5nRm9yTWUiLCJvbmxpbmUiLCJzZW5kTWVzc2FnZVRleHQiLCJzZW5kTWVzc2FnZUVtb2ppIiwic2VuZE1lc3NhZ2VGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUNBLElBQU1DLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO0FBQ0EsSUFBTUMsS0FBSyxHQUFHLGdDQUFlLE9BQWYsQ0FBZDs7QUFJQSxJQUFNQyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBSSxpQkFBT0MsTUFBUCxFQUFlQyxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQkMsWUFBQUEsT0FBdEIsUUFBc0JBLE9BQXRCO0FB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cnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL1N1YnNjcmlwdGlvblwiO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vc3Vic2NyaWJlcnNcIjtcclxuaW1wb3J0IHsgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXIgfSBmcm9tIFwiLi9kYXRhTG9hZGVyXCI7XHJcblxyXG5jb25zdCBVc2VyID0gTW9uZ29vc2VNb2RlbHMoJ1VzZXInKTtcclxuY29uc3QgTWVzc2FnZSA9IE1vbmdvb3NlTW9kZWxzKCdNZXNzYWdlJyk7XHJcbmNvbnN0IEdyb3VwID0gTW9uZ29vc2VNb2RlbHMoJ0dyb3VwJylcclxuXHJcblxyXG5cclxuY29uc3Qgc2VuZE1lc3NhZ2UgPSAgYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb259KSA9PiB7XHJcblxyXG4gIGxldCBncm91cCA9IGF3YWl0IGdyb3VwTG9hZGVyLmxvYWQoYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgbGV0IGRlc3RNb2RlbCA9IGdyb3VwID8gXCJHcm91cFwiIDogXCJVc2VyXCI7XHJcbiAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7XHJcbiAgICBhdXRob3I6IHNlc3Npb24udXNlcklkLFxyXG4gICAgZGF0YTogYXJncy5tZXNzYWdlLFxyXG4gICAgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb24sXHJcbiAgICBkZXN0aW5hdGlvbk1vZGVsOiBkZXN0TW9kZWxcclxuICB9KTtcclxuXHJcbiAgaWYoc3Vic2NyaWJlcnMuZ2V0SXRlbShhcmdzLmRlc3RpbmF0aW9uKSl7XHJcbiAgICBtZXNzYWdlLnJlY2VpdmVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuICBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKCBtZXNzYWdlLmlkLnRvU3RyaW5nKCkgKTtcclxuICBcclxuICBsZXQgZGVzdCA9IFtdO1xyXG4gIGlmIChkZXN0TW9kZWwgPT09IFwiVXNlclwiKSB7XHJcbiAgICBkZXN0LnB1c2goYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRlc3QgPSBncm91cC5zdWJzY3JpYmVycy5tYXAocyA9PiB7XHJcbiAgICAgIHJldHVybiBgJHtzLmlkfWA7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgbGV0IHB1Ymxpc2ggPSB7IGdlbmVyYWxJbmZvOiB7IG5ld01lc3NhZ2U6IG1lc3NhZ2UsIGRlc3RpbmF0aW9uOiBkZXN0IH19O1xyXG4gIHB1YnN1Yi5wdWJsaXNoKGFyZ3MuZGVzdGluYXRpb24sIHB1Ymxpc2gpOyAgXHJcblxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5cclxuY29uc3QgYWRkQ29udGFjdCA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgX2lkOiBzZXNzaW9uLnVzZXJJZCwgY29udGFjdHM6IGFyZ3MuY29udGFjdElkIH0pO1xyXG5cclxuICBpZiAoIXVzZXIpIHtcclxuICAgIHVzZXIgPSAgYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkKTtcclxuICAgIHVzZXIuY29udGFjdHMucHVzaChhcmdzLmNvbnRhY3RJZCk7XHJcbiAgICB1c2VyID0gYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXNlckxvYWRlci5sb2FkKGFyZ3MuY29udGFjdElkKTs7XHJcbn0gXHJcblxyXG5jb25zdCBhZGRHcm91cCA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgX2lkOiBzZXNzaW9uLnVzZXJJZCAsIGdyb3VwczogYXJncy5ncm91cElkIH0pO1xyXG5cclxuICBpZiAoIXVzZXIpIHtcclxuICAgIHVzZXIgPSAgYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkKTtcclxuICAgIHVzZXIuZ3JvdXBzLnB1c2goYXJncy5ncm91cElkKTtcclxuICAgIHVzZXIgPSBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBncm91cExvYWRlci5sb2FkKGFyZ3MuZ3JvdXBJZCk7XHJcbn0gXHJcblxyXG5jb25zdCByZWFkTWFzc2FnZSA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gIGxldCBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKGFyZ3MubWVzc2FnZUlkKTtcclxuICBpZiAobWVzc2FnZS5kZXN0aW5hdGlvbi5pZCAhPT0gc2Vzc2lvbi51c2VySWQpIHtcclxuICAgIHJldHVybiBudWxsOyAgXHJcbiAgfVxyXG4gIG1lc3NhZ2UucmVhZGVkID0gdHJ1ZTtcclxuICBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZS5zYXZlKCk7XHJcblxyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke21lc3NhZ2UuYXV0aG9yLmlkfWAsIHtnZW5lcmFsSW5mbzogeyByZWFkZWQ6IG1lc3NhZ2UsIGRlc3RpbmF0aW9uOiBtZXNzYWdlLmF1dGhvci5pZH19KTtcclxuICBcclxuICByZXR1cm4gbWVzc2FnZTtcclxufVxyXG5cclxuY29uc3QgdHlwaW5nID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSAgYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkKVxyXG5cclxuICAvL3lvdSBjbm90IGpvaW4gdGhpcyBwdWJzdWIucHVibGlzaCBiZWNhdXNlIHRoZSBzdWJzY3JpcHRpb24gZmlsdGVyIG5vdCBzZW5kINeeZWl0aGVyIHRvIGNsaWVudFxyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke3Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgdHlwaW5nOiB1c2VyLCBkZXN0aW5hdGlvbjogYXJncy5kZXN0aW5hdGlvbn0gfSk7XHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7c2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyB0eXBpbmdGb3JNZTogdXNlciwgIGRlc3RpbmF0aW9uOiBhcmdzLmRlc3RpbmF0aW9ufSB9KTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuY29uc3Qgb25saW5lID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke3Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgb25saW5lOiB1c2VyIH0gfSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHNlbmRNZXNzYWdlVGV4dDogc2VuZE1lc3NhZ2UsXHJcbiAgICBzZW5kTWVzc2FnZUVtb2ppOiBzZW5kTWVzc2FnZSxcclxuICAgIHNlbmRNZXNzYWdlRmlsZTogc2VuZE1lc3NhZ2UsXHJcbiAgICBhZGRDb250YWN0OiBhZGRDb250YWN0LFxyXG4gICAgYWRkR3JvdXA6IGFkZEdyb3VwLFxyXG4gICAgcmVhZE1hc3NhZ2U6IHJlYWRNYXNzYWdlLFxyXG4gICAgdHlwaW5nOiAgdHlwaW5nLFxyXG4gICAgb25saW5lOiBvbmxpbmVcclxuICB9Il19