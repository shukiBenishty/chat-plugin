"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var _Subscription = require("./Subscription");

var _subscribers = _interopRequireDefault(require("./subscribers"));

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
    var session, groupLoader, messageLoader, group, destModel, message, dest, _id, publish;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            session = _ref.session, groupLoader = _ref.groupLoader, messageLoader = _ref.messageLoader;
            _context.next = 3;
            return groupLoader.load(args.destination);

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
            return messageLoader.load(message.id.toString());

          case 12:
            message = _context.sent;
            dest = [];

            if (destModel === "User") {
              dest.push(args.destination);
            } else {
              _id = '';
              group.subscribers.forEach(function (s) {
                _id = "".concat(s.id);

                if (_id !== session.userId) {
                  dest.push(_id);
                }
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
    var session, userLoader, user, contact;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            session = _ref3.session, userLoader = _ref3.userLoader;
            _context2.next = 3;
            return User.findOne({
              _id: session.userId,
              contacts: args.contactId
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 23;
              break;
            }

            _context2.next = 7;
            return userLoader.load(session.userId);

          case 7:
            user = _context2.sent;
            user.contacts.push(args.contactId);
            _context2.next = 11;
            return user.save();

          case 11:
            user = _context2.sent;
            userLoader.prime("".concat(user.id), user);
            _context2.next = 15;
            return userLoader.load(args.contactId);

          case 15:
            contact = _context2.sent;
            contact.contacts.push(session.userId);
            _context2.next = 19;
            return contact.save();

          case 19:
            contact = _context2.sent;
            userLoader.prime("".concat(contact.id), contact);

            _Subscription.pubsub.publish(args.contactId, {
              generalInfo: {
                newContact: user,
                destination: args.contactId
              }
            });

            _Subscription.pubsub.publish(session.userId, {
              generalInfo: {
                newContact: contact,
                destination: session.userId
              }
            });

          case 23:
            return _context2.abrupt("return", userLoader.load(args.contactId));

          case 25:
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

var createGroup =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(parent, _ref5, _ref6) {
    var name, picture, subscribers, session, userLoader, groupLoader, user, group, users;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = _ref5.name, picture = _ref5.picture, subscribers = _ref5.subscribers;
            session = _ref6.session, userLoader = _ref6.userLoader, groupLoader = _ref6.groupLoader;
            _context3.next = 4;
            return userLoader.load(session.userId);

          case 4:
            user = _context3.sent;

            if (user.admin) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return");

          case 7:
            subscribers = subscribers && subscribers.push(session.userId) && subscribers || [session.userId];
            group = new Group({
              name: name,
              picture: picture,
              subscribers: subscribers
            });
            _context3.next = 11;
            return group.save();

          case 11:
            groupLoader.prime("".concat(group.id), group);
            _context3.next = 14;
            return User.updateMany({
              _id: {
                $in: subscribers
              }
            }, {
              $push: {
                groups: group.id
              }
            });

          case 14:
            subscribers.forEach(function (s) {
              _Subscription.pubsub.publish(s, {
                generalInfo: {
                  newGroup: group,
                  destination: s
                }
              });
            });
            _context3.next = 17;
            return User.find({
              _id: {
                $in: subscribers
              }
            });

          case 17:
            users = _context3.sent;
            users.forEach(function (user) {
              userLoader.prime("".concat(user.id), user);
            });
            return _context3.abrupt("return", group);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createGroup(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

var editGroup =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(parent, args, _ref8) {
    var session, userLoader, groupLoader, user, group, updatedUsers, users;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            session = _ref8.session, userLoader = _ref8.userLoader, groupLoader = _ref8.groupLoader;
            _context4.prev = 1;
            _context4.next = 4;
            return userLoader.load(session.userId);

          case 4:
            user = _context4.sent;

            if (user.admin) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return");

          case 7:
            _context4.next = 9;
            return groupLoader.load(args.groupId);

          case 9:
            group = _context4.sent;

            if (group) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return");

          case 12:
            updatedUsers = [];

            if (!(args.unsubscribers && args.unsubscribers.length)) {
              _context4.next = 25;
              break;
            }

            console.log("unsubscribers", args.unsubscribers);
            _context4.next = 17;
            return Group.updateOne({
              _id: group.id
            }, {
              $pull: {
                subscribers: {
                  $in: args.unsubscribers
                }
              }
            });

          case 17:
            _context4.next = 19;
            return User.updateMany({
              _id: {
                $in: args.unsubscribers
              }
            }, {
              $pull: {
                groups: group.id
              }
            });

          case 19:
            _context4.next = 21;
            return User.find({
              _id: {
                $in: args.unsubscribers
              }
            });

          case 21:
            users = _context4.sent;
            console.log("users", users);
            updatedUsers = updatedUsers.concat(users);
            console.log("updatedUsers", updatedUsers);

          case 25:
            if (!(args.subscribers && args.subscribers.length)) {
              _context4.next = 38;
              break;
            }

            console.log("subscribers", args.subscribers);
            _context4.next = 29;
            return Group.updateOne({
              _id: group.id
            }, {
              $push: {
                subscribers: {
                  $each: args.subscribers
                }
              }
            });

          case 29:
            _context4.next = 31;
            return User.updateMany({
              _id: {
                $in: args.subscribers
              }
            }, {
              $push: {
                groups: group.id
              }
            });

          case 31:
            args.subscribers.forEach(function (s) {
              _Subscription.pubsub.publish(s, {
                generalInfo: {
                  newGroup: group,
                  destination: s
                }
              });
            });
            _context4.next = 34;
            return User.find({
              _id: {
                $in: args.subscribers
              }
            });

          case 34:
            users = _context4.sent;
            console.log("users2", users);
            updatedUsers = updatedUsers.concat(users);
            console.log("updatedUsers", updatedUsers);

          case 38:
            updatedUsers.forEach(function (user) {
              userLoader.prime("".concat(user.id), user);
            });
            group = Group.findById(group.id).populate('subscribers');
            groupLoader.prime("".concat(group.id), group);
            return _context4.abrupt("return", groupLoader.load(args.groupId));

          case 44:
            _context4.prev = 44;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);

          case 47:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 44]]);
  }));

  return function editGroup(_x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

var readMassage =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(parent, args, _ref10) {
    var session, messageLoader, message;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            session = _ref10.session, messageLoader = _ref10.messageLoader;
            _context5.next = 3;
            return messageLoader.load(args.messageId);

          case 3:
            message = _context5.sent;

            if (!(message.destination.id !== session.userId)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", null);

          case 6:
            message.readed = true;
            _context5.next = 9;
            return message.save();

          case 9:
            message = _context5.sent;

            _Subscription.pubsub.publish("".concat(message.author.id), {
              generalInfo: {
                readed: message,
                destination: message.author.id
              }
            });

            return _context5.abrupt("return", message);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function readMassage(_x13, _x14, _x15) {
    return _ref11.apply(this, arguments);
  };
}();

var typing =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(parent, args, _ref12) {
    var session, userLoader, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            session = _ref12.session, userLoader = _ref12.userLoader;
            _context6.next = 3;
            return userLoader.load(session.userId);

          case 3:
            user = _context6.sent;

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

            return _context6.abrupt("return", true);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function typing(_x16, _x17, _x18) {
    return _ref13.apply(this, arguments);
  };
}();

var online =
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(parent, args, _ref14) {
    var session, userLoader, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            session = _ref14.session, userLoader = _ref14.userLoader;
            _context7.next = 3;
            return userLoader.load(session.userId);

          case 3:
            user = _context7.sent;

            _Subscription.pubsub.publish("".concat(session.userId), {
              generalInfo: {
                online: user
              }
            });

            return _context7.abrupt("return", true);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function online(_x19, _x20, _x21) {
    return _ref15.apply(this, arguments);
  };
}();

var _default = {
  sendMessageText: sendMessage,
  sendMessageEmoji: sendMessage,
  sendMessageFile: sendMessage,
  createGroup: createGroup,
  addContact: addContact,
  editGroup: editGroup,
  readMassage: readMassage,
  typing: typing,
  online: online
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL011dGF0aW9uLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwiR3JvdXAiLCJzZW5kTWVzc2FnZSIsInBhcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwiZ3JvdXBMb2FkZXIiLCJtZXNzYWdlTG9hZGVyIiwibG9hZCIsImRlc3RpbmF0aW9uIiwiZ3JvdXAiLCJkZXN0TW9kZWwiLCJtZXNzYWdlIiwiYXV0aG9yIiwidXNlcklkIiwiZGF0YSIsImRlc3RpbmF0aW9uTW9kZWwiLCJzdWJzY3JpYmVycyIsImdldEl0ZW0iLCJyZWNlaXZlZCIsInNhdmUiLCJpZCIsInRvU3RyaW5nIiwiZGVzdCIsInB1c2giLCJfaWQiLCJmb3JFYWNoIiwicyIsInB1Ymxpc2giLCJnZW5lcmFsSW5mbyIsIm5ld01lc3NhZ2UiLCJwdWJzdWIiLCJhZGRDb250YWN0IiwidXNlckxvYWRlciIsImZpbmRPbmUiLCJjb250YWN0cyIsImNvbnRhY3RJZCIsInVzZXIiLCJwcmltZSIsImNvbnRhY3QiLCJuZXdDb250YWN0IiwiY3JlYXRlR3JvdXAiLCJuYW1lIiwicGljdHVyZSIsImFkbWluIiwidXBkYXRlTWFueSIsIiRpbiIsIiRwdXNoIiwiZ3JvdXBzIiwibmV3R3JvdXAiLCJmaW5kIiwidXNlcnMiLCJlZGl0R3JvdXAiLCJncm91cElkIiwidXBkYXRlZFVzZXJzIiwidW5zdWJzY3JpYmVycyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGVPbmUiLCIkcHVsbCIsImNvbmNhdCIsIiRlYWNoIiwiZmluZEJ5SWQiLCJwb3B1bGF0ZSIsImVycm9yIiwicmVhZE1hc3NhZ2UiLCJtZXNzYWdlSWQiLCJyZWFkZWQiLCJ0eXBpbmciLCJ0eXBpbmdGb3JNZSIsIm9ubGluZSIsInNlbmRNZXNzYWdlVGV4dCIsInNlbmRNZXNzYWdlRW1vamkiLCJzZW5kTWVzc2FnZUZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7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L0I7QUFBQTtBQUFBLG1CQUNJQSxVQUFVLENBQUN6QixJQUFYLENBQWdCSCxPQUFPLENBQUNTLE1BQXhCLENBREo7O0FBQUE7QUFDVHVCLFlBQUFBLElBRFM7O0FBRWJOLGlDQUFPSCxPQUFQLFdBQWtCdkIsT0FBTyxDQUFDUyxNQUExQixHQUFvQztBQUFFZSxjQUFBQSxXQUFXLEVBQUU7QUFBRTBDLGdCQUFBQSxNQUFNLEVBQUVsQztBQUFWO0FBQWYsYUFBcEM7O0FBRmEsOENBR04sSUFITTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFOa0MsTUFBTTtBQUFBO0FBQUE7QUFBQSxHQUFaOztlQU1lO0FBQ1hDLEVBQUFBLGVBQWUsRUFBRXRFLFdBRE47QUFFWHVFLEVBQUFBLGdCQUFnQixFQUFFdkUsV0FGUDtBQUdYd0UsRUFBQUEsZUFBZSxFQUFFeEUsV0FITjtBQUlYdUMsRUFBQUEsV0FBVyxFQUFFQSxXQUpGO0FBS1hULEVBQUFBLFVBQVUsRUFBRUEsVUFMRDtBQU1Yb0IsRUFBQUEsU0FBUyxFQUFFQSxTQU5BO0FBT1hjLEVBQUFBLFdBQVcsRUFBRUEsV0FQRjtBQVFYRyxFQUFBQSxNQUFNLEVBQUdBLE1BUkU7QUFTWEUsRUFBQUEsTUFBTSxFQUFFQTtBQVRHLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL1N1YnNjcmlwdGlvblwiO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vc3Vic2NyaWJlcnNcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuY29uc3QgR3JvdXAgPSBNb25nb29zZU1vZGVscygnR3JvdXAnKVxyXG5cclxuXHJcblxyXG5jb25zdCBzZW5kTWVzc2FnZSA9ICBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcblxyXG4gIGxldCBncm91cCA9IGF3YWl0IGdyb3VwTG9hZGVyLmxvYWQoYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgbGV0IGRlc3RNb2RlbCA9IGdyb3VwID8gXCJHcm91cFwiIDogXCJVc2VyXCI7XHJcbiAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7XHJcbiAgICBhdXRob3I6IHNlc3Npb24udXNlcklkLFxyXG4gICAgZGF0YTogYXJncy5tZXNzYWdlLFxyXG4gICAgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb24sXHJcbiAgICBkZXN0aW5hdGlvbk1vZGVsOiBkZXN0TW9kZWxcclxuICB9KTtcclxuXHJcbiAgaWYoc3Vic2NyaWJlcnMuZ2V0SXRlbShhcmdzLmRlc3RpbmF0aW9uKSl7XHJcbiAgICBtZXNzYWdlLnJlY2VpdmVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuICBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKCBtZXNzYWdlLmlkLnRvU3RyaW5nKCkgKTtcclxuICBcclxuICBsZXQgZGVzdCA9IFtdO1xyXG4gIGlmIChkZXN0TW9kZWwgPT09IFwiVXNlclwiKSB7XHJcbiAgICBkZXN0LnB1c2goYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBfaWQgPSAnJztcclxuICAgIGdyb3VwLnN1YnNjcmliZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIF9pZCA9IGAke3MuaWR9YDtcclxuICAgICAgaWYgKF9pZCAgIT09IHNlc3Npb24udXNlcklkKSB7XHJcbiAgICAgICAgZGVzdC5wdXNoKF9pZCkgICAgXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBsZXQgcHVibGlzaCA9IHsgZ2VuZXJhbEluZm86IHsgbmV3TWVzc2FnZTogbWVzc2FnZSwgZGVzdGluYXRpb246IGRlc3QgfX07XHJcbiAgcHVic3ViLnB1Ymxpc2goYXJncy5kZXN0aW5hdGlvbiwgcHVibGlzaCk7XHJcblxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5cclxuY29uc3QgYWRkQ29udGFjdCA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyfSkgPT4ge1xyXG4gIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgX2lkOiBzZXNzaW9uLnVzZXJJZCwgY29udGFjdHM6IGFyZ3MuY29udGFjdElkIH0pO1xyXG5cclxuICBpZiAoIXVzZXIpIHtcclxuICAgIHVzZXIgPSAgYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkKTtcclxuICAgIHVzZXIuY29udGFjdHMucHVzaChhcmdzLmNvbnRhY3RJZCk7XHJcbiAgICB1c2VyID0gYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICB1c2VyTG9hZGVyLnByaW1lKGAke3VzZXIuaWR9YCwgdXNlcik7XHJcbiAgICBsZXQgY29udGFjdCA9ICBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoYXJncy5jb250YWN0SWQpO1xyXG4gICAgY29udGFjdC5jb250YWN0cy5wdXNoKHNlc3Npb24udXNlcklkKTtcclxuICAgIGNvbnRhY3QgPSBhd2FpdCBjb250YWN0LnNhdmUoKTtcclxuICAgIHVzZXJMb2FkZXIucHJpbWUoYCR7Y29udGFjdC5pZH1gLCBjb250YWN0KTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKGFyZ3MuY29udGFjdElkLCB7IGdlbmVyYWxJbmZvOiB7IG5ld0NvbnRhY3Q6IHVzZXIsIGRlc3RpbmF0aW9uOiBhcmdzLmNvbnRhY3RJZCB9fSk7XHJcbiAgICBwdWJzdWIucHVibGlzaChzZXNzaW9uLnVzZXJJZCwgeyBnZW5lcmFsSW5mbzogeyBuZXdDb250YWN0OiBjb250YWN0LCBkZXN0aW5hdGlvbjogc2Vzc2lvbi51c2VySWQgfX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChhcmdzLmNvbnRhY3RJZCk7O1xyXG59IFxyXG5cclxuY29uc3QgY3JlYXRlR3JvdXAgPSBhc3luYyAocGFyZW50LCB7bmFtZSwgcGljdHVyZSwgc3Vic2NyaWJlcnN9LCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXJ9KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gIGlmICghdXNlci5hZG1pbikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBzdWJzY3JpYmVycyA9IChzdWJzY3JpYmVycyAmJiBzdWJzY3JpYmVycy5wdXNoKHNlc3Npb24udXNlcklkKSAmJiBzdWJzY3JpYmVycykgfHwgW3Nlc3Npb24udXNlcklkXVxyXG4gIGxldCBncm91cCA9IG5ldyBHcm91cCh7bmFtZSwgcGljdHVyZSwgc3Vic2NyaWJlcnN9KTtcclxuICBhd2FpdCBncm91cC5zYXZlKCk7XHJcbiAgZ3JvdXBMb2FkZXIucHJpbWUoYCR7Z3JvdXAuaWR9YCwgZ3JvdXApO1xyXG5cclxuICBhd2FpdCBVc2VyLnVwZGF0ZU1hbnkoIHtfaWQ6IHsgJGluOiBzdWJzY3JpYmVycyB9fSwgeyBcclxuICAgICRwdXNoOiB7IGdyb3VwczogZ3JvdXAuaWQgfVxyXG4gIH0pO1xyXG4gXHJcbiAgc3Vic2NyaWJlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgcHVic3ViLnB1Ymxpc2gocywgeyBnZW5lcmFsSW5mbzogeyBuZXdHcm91cDogZ3JvdXAsIGRlc3RpbmF0aW9uOiBzIH19KTtcclxuICB9KVxyXG5cclxuICBsZXQgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoe19pZDogeyAkaW46IHN1YnNjcmliZXJzIH19KVxyXG4gIHVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcbiAgICB1c2VyTG9hZGVyLnByaW1lKGAke3VzZXIuaWR9YCwgdXNlcilcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGdyb3VwO1xyXG59IFxyXG5cclxuY29uc3QgZWRpdEdyb3VwID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb24sIHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyfSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICBpZiAoIXVzZXIuYWRtaW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGdyb3VwID0gYXdhaXQgZ3JvdXBMb2FkZXIubG9hZChhcmdzLmdyb3VwSWQpO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgdXBkYXRlZFVzZXJzID0gW107XHJcbiAgICBsZXQgdXNlcnM7XHJcbiAgICBpZiAoYXJncy51bnN1YnNjcmliZXJzICYmIGFyZ3MudW5zdWJzY3JpYmVycy5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ1bnN1YnNjcmliZXJzXCIsIGFyZ3MudW5zdWJzY3JpYmVycyk7XHJcbiAgICAgIGF3YWl0IEdyb3VwLnVwZGF0ZU9uZSgge19pZDogZ3JvdXAuaWR9LCB7IFxyXG4gICAgICAgICRwdWxsOiB7IHN1YnNjcmliZXJzOiB7ICRpbjogYXJncy51bnN1YnNjcmliZXJzIH0gfVxyXG4gICAgICB9KVxyXG4gICAgICBhd2FpdCBVc2VyLnVwZGF0ZU1hbnkoIHtfaWQ6IHsgJGluOiBhcmdzLnVuc3Vic2NyaWJlcnMgfX0sIHsgXHJcbiAgICAgICAgJHB1bGw6IHsgZ3JvdXBzOiBncm91cC5pZCB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHVzZXJzID0gYXdhaXQgVXNlci5maW5kKHtfaWQ6IHsgJGluOiBhcmdzLnVuc3Vic2NyaWJlcnMgfX0pXHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXNlcnNcIiwgdXNlcnMpO1xyXG4gICAgICB1cGRhdGVkVXNlcnMgPSB1cGRhdGVkVXNlcnMuY29uY2F0KHVzZXJzKTtcclxuICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVkVXNlcnNcIiwgdXBkYXRlZFVzZXJzKTtcclxuICAgIH1cclxuICAgIGlmIChhcmdzLnN1YnNjcmliZXJzICYmIGFyZ3Muc3Vic2NyaWJlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic3Vic2NyaWJlcnNcIiwgYXJncy5zdWJzY3JpYmVycyk7XHJcbiAgICAgIGF3YWl0IEdyb3VwLnVwZGF0ZU9uZSgge19pZDogZ3JvdXAuaWR9LCB7IFxyXG4gICAgICAgICRwdXNoOiB7IHN1YnNjcmliZXJzOiB7JGVhY2ggOiBhcmdzLnN1YnNjcmliZXJzfSB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IFVzZXIudXBkYXRlTWFueSgge19pZDogeyAkaW46IGFyZ3Muc3Vic2NyaWJlcnMgfX0sIHsgXHJcbiAgICAgICAgJHB1c2g6IHsgZ3JvdXBzOiBncm91cC5pZCB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGFyZ3Muc3Vic2NyaWJlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICBwdWJzdWIucHVibGlzaChzLCB7IGdlbmVyYWxJbmZvOiB7IG5ld0dyb3VwOiBncm91cCwgZGVzdGluYXRpb246IHMgfX0pO1xyXG4gICAgICB9KVxyXG4gIFxyXG4gICAgICB1c2VycyA9IGF3YWl0IFVzZXIuZmluZCh7X2lkOiB7ICRpbjogYXJncy5zdWJzY3JpYmVycyB9fSlcclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyczJcIiwgdXNlcnMpO1xyXG5cclxuICAgICAgdXBkYXRlZFVzZXJzID0gdXBkYXRlZFVzZXJzLmNvbmNhdCh1c2Vycyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlZFVzZXJzXCIsIHVwZGF0ZWRVc2Vycyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVkVXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgdXNlckxvYWRlci5wcmltZShgJHt1c2VyLmlkfWAsIHVzZXIpXHJcbiAgICB9KTtcclxuXHJcbiAgICBncm91cCA9ICBHcm91cC5maW5kQnlJZChncm91cC5pZCkucG9wdWxhdGUoJ3N1YnNjcmliZXJzJyk7XHJcbiAgICBncm91cExvYWRlci5wcmltZShgJHtncm91cC5pZH1gLCBncm91cCk7XHJcbiAgICByZXR1cm4gZ3JvdXBMb2FkZXIubG9hZChhcmdzLmdyb3VwSWQpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gIH1cclxufSBcclxuXHJcbmNvbnN0IHJlYWRNYXNzYWdlID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb24sIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcbiAgbGV0IG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlTG9hZGVyLmxvYWQoYXJncy5tZXNzYWdlSWQpO1xyXG4gIGlmIChtZXNzYWdlLmRlc3RpbmF0aW9uLmlkICE9PSBzZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgcmV0dXJuIG51bGw7ICBcclxuICB9XHJcbiAgbWVzc2FnZS5yZWFkZWQgPSB0cnVlO1xyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuXHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7bWVzc2FnZS5hdXRob3IuaWR9YCwge2dlbmVyYWxJbmZvOiB7IHJlYWRlZDogbWVzc2FnZSwgZGVzdGluYXRpb246IG1lc3NhZ2UuYXV0aG9yLmlkfX0pO1xyXG4gIFxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5jb25zdCB0eXBpbmcgPSBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICBsZXQgdXNlciA9ICBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpXHJcblxyXG4gIC8veW91IGNub3Qgam9pbiB0aGlzIHB1YnN1Yi5wdWJsaXNoIGJlY2F1c2UgdGhlIHN1YnNjcmlwdGlvbiBmaWx0ZXIgbm90IHNlbmQg155laXRoZXIgdG8gY2xpZW50XHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7c2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyB0eXBpbmc6IHVzZXIsIGRlc3RpbmF0aW9uOiBhcmdzLmRlc3RpbmF0aW9ufSB9KTtcclxuICBwdWJzdWIucHVibGlzaChgJHtzZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IHR5cGluZ0Zvck1lOiB1c2VyLCAgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb259IH0pO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5jb25zdCBvbmxpbmUgPSBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7c2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyBvbmxpbmU6IHVzZXIgfSB9KTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgc2VuZE1lc3NhZ2VUZXh0OiBzZW5kTWVzc2FnZSxcclxuICAgIHNlbmRNZXNzYWdlRW1vamk6IHNlbmRNZXNzYWdlLFxyXG4gICAgc2VuZE1lc3NhZ2VGaWxlOiBzZW5kTWVzc2FnZSxcclxuICAgIGNyZWF0ZUdyb3VwOiBjcmVhdGVHcm91cCxcclxuICAgIGFkZENvbnRhY3Q6IGFkZENvbnRhY3QsXHJcbiAgICBlZGl0R3JvdXA6IGVkaXRHcm91cCxcclxuICAgIHJlYWRNYXNzYWdlOiByZWFkTWFzc2FnZSxcclxuICAgIHR5cGluZzogIHR5cGluZyxcclxuICAgIG9ubGluZTogb25saW5lXHJcbiAgfSJdfQ==