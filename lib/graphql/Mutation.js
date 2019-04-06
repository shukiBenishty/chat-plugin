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
var ChatRoom = (0, _mongooseModels["default"])('ChatRoom');

var sendMessage =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(parent, args, _ref) {
    var session, publish, chatRoom, destModel, message, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            session = _ref.session;
            publish = {};
            _context.next = 4;
            return _dataLoader.chatRoomLoader.load(args.destination);

          case 4:
            chatRoom = _context.sent;
            destModel = chatRoom ? "ChatRoom" : "User";
            message = new Message({
              author: session.userId,
              data: args.message,
              destination: args.destination,
              destinationModel: destModel
            });

            if (_subscribers["default"].getItem(args.destination)) {
              message.received = true;
            }

            _context.next = 10;
            return message.save();

          case 10:
            message = _context.sent;
            _context.next = 13;
            return _dataLoader.messageLoader.load(message.id.toString());

          case 13:
            message = _context.sent;

            if (!(destModel === "User")) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return _dataLoader.userLoader.load(session.userId);

          case 17:
            user = _context.sent;
            publish.generalInfo = {
              newMessage: message,
              destination: args.destination
            };

          case 19:
            publish.personalMessageSent = message;

            _Subscription.pubsub.publish(args.destination, publish);

            return _context.abrupt("return", message);

          case 22:
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
            return User.findById(session.userId).findOne({
              contact: args.contactId
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
            return _context2.abrupt("return", user);

          case 13:
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

var readMassage =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(parent, args, _ref5) {
    var session, message;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            session = _ref5.session;
            _context3.next = 3;
            return _dataLoader.messageLoader.load(args.messageId);

          case 3:
            message = _context3.sent;

            if (!(message.destination.id !== session.userId)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", null);

          case 6:
            message.readed = true;
            _context3.next = 9;
            return message.save();

          case 9:
            message = _context3.sent;

            _Subscription.pubsub.publish("".concat(message.author.id), {
              generalInfo: {
                readed: message,
                destination: message.author.id
              }
            });

            return _context3.abrupt("return", message);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function readMassage(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var typing =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(parent, args, _ref7) {
    var session, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            session = _ref7.session;
            _context4.next = 3;
            return _dataLoader.userLoader.load(session.userId);

          case 3:
            user = _context4.sent;

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

            return _context4.abrupt("return", true);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function typing(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var online =
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

            _Subscription.pubsub.publish("".concat(session.userId), {
              generalInfo: {
                online: user
              }
            });

            return _context5.abrupt("return", true);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function online(_x13, _x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}();

var _default = {
  sendMessageText: sendMessage,
  sendMessageEmoji: sendMessage,
  sendMessageFile: sendMessage,
  addContact: addContact,
  readMassage: readMassage,
  typing: typing,
  online: online
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL011dGF0aW9uLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwiQ2hhdFJvb20iLCJzZW5kTWVzc2FnZSIsInBhcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwicHVibGlzaCIsImNoYXRSb29tTG9hZGVyIiwibG9hZCIsImRlc3RpbmF0aW9uIiwiY2hhdFJvb20iLCJkZXN0TW9kZWwiLCJtZXNzYWdlIiwiYXV0aG9yIiwidXNlcklkIiwiZGF0YSIsImRlc3RpbmF0aW9uTW9kZWwiLCJzdWJzY3JpYmVycyIsImdldEl0ZW0iLCJyZWNlaXZlZCIsInNhdmUiLCJtZXNzYWdlTG9hZGVyIiwiaWQiLCJ0b1N0cmluZyIsInVzZXJMb2FkZXIiLCJ1c2VyIiwiZ2VuZXJhbEluZm8iLCJuZXdNZXNzYWdlIiwicGVyc29uYWxNZXNzYWdlU2VudCIsInB1YnN1YiIsImFkZENvbnRhY3QiLCJmaW5kQnlJZCIsImZpbmRPbmUiLCJjb250YWN0IiwiY29udGFjdElkIiwiY29udGFjdHMiLCJwdXNoIiwicmVhZE1hc3NhZ2UiLCJtZXNzYWdlSWQiLCJyZWFkZWQiLCJ0eXBpbmciLCJ0eXBpbmdGb3JNZSIsIm9ubGluZSIsInNlbmRNZXNzYWdlVGV4dCIsInNlbmRNZXNzYWdlRW1vamkiLCJzZW5kTWVzc2FnZUZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsZ0NBQWUsTUFBZixDQUFiO0FBQ0EsSUFBTUMsT0FBTyxHQUFHLGdDQUFlLFNBQWYsQ0FBaEI7QUFDQSxJQUFNQyxRQUFRLEdBQUcsZ0NBQWUsVUFBZixDQUFqQjs7QUFJQSxJQUFNQyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBSSxpQkFBT0MsTUFBUCxFQUFlQyxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQkMsWUFBQUEsT0FBdEIsUUFBc0JBLE9BQXRCO0FB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QUFLWE8sRUFBQUEsV0FBVyxFQUFFQSxXQUxGO0FBTVhHLEVBQUFBLE1BQU0sRUFBR0EsTUFORTtBQU9YRSxFQUFBQSxNQUFNLEVBQUVBO0FBUEcsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb25nb29zZU1vZGVscyBmcm9tIFwiLi4vbW9uZ29vc2VNb2RlbHNcIjtcclxuaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vU3Vic2NyaXB0aW9uXCI7XHJcbmltcG9ydCBzdWJzY3JpYmVycyBmcm9tIFwiLi9zdWJzY3JpYmVyc1wiO1xyXG5pbXBvcnQgeyB1c2VyTG9hZGVyLCBjaGF0Um9vbUxvYWRlciwgbWVzc2FnZUxvYWRlciB9IGZyb20gXCIuL2RhdGFMb2FkZXJcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuY29uc3QgQ2hhdFJvb20gPSBNb25nb29zZU1vZGVscygnQ2hhdFJvb20nKVxyXG5cclxuXHJcblxyXG5jb25zdCBzZW5kTWVzc2FnZSA9ICBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuXHJcbiAgbGV0IHB1Ymxpc2ggPSB7fTtcclxuXHJcbiAgbGV0IGNoYXRSb29tID0gYXdhaXQgY2hhdFJvb21Mb2FkZXIubG9hZChhcmdzLmRlc3RpbmF0aW9uKTtcclxuICBsZXQgZGVzdE1vZGVsID0gY2hhdFJvb20gPyBcIkNoYXRSb29tXCIgOiBcIlVzZXJcIjtcclxuICBsZXQgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKHtcclxuICAgIGF1dGhvcjogc2Vzc2lvbi51c2VySWQsXHJcbiAgICBkYXRhOiBhcmdzLm1lc3NhZ2UsXHJcbiAgICBkZXN0aW5hdGlvbjogYXJncy5kZXN0aW5hdGlvbixcclxuICAgIGRlc3RpbmF0aW9uTW9kZWw6IGRlc3RNb2RlbFxyXG4gIH0pO1xyXG5cclxuICBpZihzdWJzY3JpYmVycy5nZXRJdGVtKGFyZ3MuZGVzdGluYXRpb24pKXtcclxuICAgIG1lc3NhZ2UucmVjZWl2ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbWVzc2FnZSA9IGF3YWl0IG1lc3NhZ2Uuc2F2ZSgpO1xyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlTG9hZGVyLmxvYWQoIG1lc3NhZ2UuaWQudG9TdHJpbmcoKSApO1xyXG4gIFxyXG4gIGlmIChkZXN0TW9kZWwgPT09IFwiVXNlclwiKSB7XHJcbiAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICBwdWJsaXNoLmdlbmVyYWxJbmZvID0geyBuZXdNZXNzYWdlOiBtZXNzYWdlLCBkZXN0aW5hdGlvbjogYXJncy5kZXN0aW5hdGlvbn1cclxuICB9XHJcbiAgcHVibGlzaC5wZXJzb25hbE1lc3NhZ2VTZW50ID0gbWVzc2FnZTtcclxuXHJcbiAgcHVic3ViLnB1Ymxpc2goYXJncy5kZXN0aW5hdGlvbiwgcHVibGlzaCk7XHJcbiAgXHJcblxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5cclxuY29uc3QgYWRkQ29udGFjdCA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChzZXNzaW9uLnVzZXJJZCkuZmluZE9uZSh7Y29udGFjdDogYXJncy5jb250YWN0SWR9KTtcclxuXHJcbiAgaWYgKCF1c2VyKSB7XHJcbiAgICB1c2VyID0gIGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICB1c2VyLmNvbnRhY3RzLnB1c2goYXJncy5jb250YWN0SWQpO1xyXG4gICAgdXNlciA9IGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHVzZXI7XHJcbn0gXHJcblxyXG5jb25zdCByZWFkTWFzc2FnZSA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gIGxldCBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKGFyZ3MubWVzc2FnZUlkKTtcclxuICBpZiAobWVzc2FnZS5kZXN0aW5hdGlvbi5pZCAhPT0gc2Vzc2lvbi51c2VySWQpIHtcclxuICAgIHJldHVybiBudWxsOyAgXHJcbiAgfVxyXG4gIG1lc3NhZ2UucmVhZGVkID0gdHJ1ZTtcclxuICBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZS5zYXZlKCk7XHJcblxyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke21lc3NhZ2UuYXV0aG9yLmlkfWAsIHtnZW5lcmFsSW5mbzogeyByZWFkZWQ6IG1lc3NhZ2UsIGRlc3RpbmF0aW9uOiBtZXNzYWdlLmF1dGhvci5pZH19KTtcclxuICBcclxuICByZXR1cm4gbWVzc2FnZTtcclxufVxyXG5cclxuY29uc3QgdHlwaW5nID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSAgYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkKVxyXG5cclxuICAvL3lvdSBjbm90IGpvaW4gdGhpcyBwdWJzdWIucHVibGlzaCBiZWNhdXNlIHRoZSBzdWJzY3JpcHRpb24gZmlsdGVyIG5vdCBzZW5kINeeZWl0aGVyIHRvIGNsaWVudFxyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke3Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgdHlwaW5nOiB1c2VyLCBkZXN0aW5hdGlvbjogYXJncy5kZXN0aW5hdGlvbn0gfSk7XHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7c2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyB0eXBpbmdGb3JNZTogdXNlciwgIGRlc3RpbmF0aW9uOiBhcmdzLmRlc3RpbmF0aW9ufSB9KTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuY29uc3Qgb25saW5lID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke3Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgb25saW5lOiB1c2VyIH0gfSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHNlbmRNZXNzYWdlVGV4dDogc2VuZE1lc3NhZ2UsXHJcbiAgICBzZW5kTWVzc2FnZUVtb2ppOiBzZW5kTWVzc2FnZSxcclxuICAgIHNlbmRNZXNzYWdlRmlsZTogc2VuZE1lc3NhZ2UsXHJcbiAgICBhZGRDb250YWN0OiBhZGRDb250YWN0LFxyXG4gICAgcmVhZE1hc3NhZ2U6IHJlYWRNYXNzYWdlLFxyXG4gICAgdHlwaW5nOiAgdHlwaW5nLFxyXG4gICAgb25saW5lOiBvbmxpbmVcclxuICB9Il19