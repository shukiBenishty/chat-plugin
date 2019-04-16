"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongooseModels = _interopRequireDefault(require("../mongooseModels"));

var _Subscription = require("./Subscription");

var _subscribers = _interopRequireDefault(require("./subscribers"));

var User = (0, _mongooseModels["default"])('User');
var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');

var sendMessage =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(parent, args, _ref) {
    var session, groupLoader, messageLoader, group, destModel, message, dest, _id, publish;

    return _regenerator["default"].wrap(function _callee$(_context) {
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
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(parent, args, _ref3) {
    var session, userLoader, user, contact;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(parent, _ref5, _ref6) {
    var name, picture, subscribers, session, userLoader, groupLoader, user, group, users;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
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
              $addToSet: {
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
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(parent, args, _ref8) {
    var session, userLoader, groupLoader, user, group, updatedUsers, users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
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
              _context4.next = 23;
              break;
            }

            _context4.next = 16;
            return Group.updateOne({
              _id: group.id
            }, {
              $pullAll: {
                subscribers: args.unsubscribers
              }
            });

          case 16:
            _context4.next = 18;
            return User.updateMany({
              _id: {
                $in: args.unsubscribers
              }
            }, {
              $pullAll: {
                groups: [group.id]
              }
            });

          case 18:
            _context4.next = 20;
            return User.find({
              _id: {
                $in: args.unsubscribers
              }
            });

          case 20:
            users = _context4.sent;
            args.unsubscribers.forEach(function (s) {
              _Subscription.pubsub.publish(s, {
                generalInfo: {
                  deleteGroup: group,
                  destination: s
                }
              });
            });
            updatedUsers = updatedUsers.concat(users);

          case 23:
            if (!(args.subscribers && args.subscribers.length)) {
              _context4.next = 33;
              break;
            }

            _context4.next = 26;
            return Group.updateOne({
              _id: group.id
            }, {
              $addToSet: {
                subscribers: {
                  $each: args.subscribers
                }
              }
            });

          case 26:
            _context4.next = 28;
            return User.updateMany({
              _id: {
                $in: args.subscribers
              }
            }, {
              $addToSet: {
                groups: group.id
              }
            });

          case 28:
            args.subscribers.forEach(function (s) {
              _Subscription.pubsub.publish(s, {
                generalInfo: {
                  newGroup: group,
                  destination: s
                }
              });
            });
            _context4.next = 31;
            return User.find({
              _id: {
                $in: args.subscribers
              }
            });

          case 31:
            users = _context4.sent;
            updatedUsers = updatedUsers.concat(users);

          case 33:
            updatedUsers.forEach(function (user) {
              userLoader.prime("".concat(user.id), user);
            });
            group = Group.findById(group.id).populate('subscribers');
            groupLoader.prime("".concat(group.id), group);
            return _context4.abrupt("return", groupLoader.load(args.groupId));

          case 39:
            _context4.prev = 39;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);

          case 42:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 39]]);
  }));

  return function editGroup(_x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

var readMassage =
/*#__PURE__*/
function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(parent, args, _ref10) {
    var session, messageLoader, message;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
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
  var _ref13 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(parent, args, _ref12) {
    var session, userLoader, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
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
  var _ref15 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(parent, args, _ref14) {
    var session, userLoader, user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
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

var sendComment =
/*#__PURE__*/
function () {
  var _ref17 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(parent, args, _ref16) {
    var session, userLoader, messageLoader, message, indexLike, indexUnlike;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            session = _ref16.session, userLoader = _ref16.userLoader, messageLoader = _ref16.messageLoader;
            _context8.prev = 1;
            _context8.next = 4;
            return messageLoader.load(args.messageId);

          case 4:
            message = _context8.sent;
            indexLike = message.likes.indexOf(session.userId);
            indexUnlike = message.unlikes.indexOf(session.userId);

            if (args.myVote) {
              if (args.myVote === 'LIKE') {
                if (indexUnlike !== -1) message.unlikes.splice(indexUnlike, 1);
                if (indexLike === -1) message.likes.push(session.userId);
              }

              if (args.myVote === 'UNLIKE') {
                if (indexUnlike === -1) message.unlikes.push(session.userId);
                if (indexLike !== -1) message.likes.splice(indexLike, 1);
              }
            } else {
              if (indexLike !== -1) message.likes.splice(indexLike, 1);
              if (indexUnlike !== -1) message.unlikes.splice(indexUnlike, 1);
            }

            _context8.next = 10;
            return message.save();

          case 10:
            messageLoader.prime("".concat(message.id), message);
            return _context8.abrupt("return", message);

          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](1);
            console.error(_context8.t0);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 14]]);
  }));

  return function sendComment(_x22, _x23, _x24) {
    return _ref17.apply(this, arguments);
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
  online: online,
  sendComment: sendComment
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL011dGF0aW9uLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwiR3JvdXAiLCJzZW5kTWVzc2FnZSIsInBhcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwiZ3JvdXBMb2FkZXIiLCJtZXNzYWdlTG9hZGVyIiwibG9hZCIsImRlc3RpbmF0aW9uIiwiZ3JvdXAiLCJkZXN0TW9kZWwiLCJtZXNzYWdlIiwiYXV0aG9yIiwidXNlcklkIiwiZGF0YSIsImRlc3RpbmF0aW9uTW9kZWwiLCJzdWJzY3JpYmVycyIsImdldEl0ZW0iLCJyZWNlaXZlZCIsInNhdmUiLCJpZCIsInRvU3RyaW5nIiwiZGVzdCIsInB1c2giLCJfaWQiLCJmb3JFYWNoIiwicyIsInB1Ymxpc2giLCJnZW5lcmFsSW5mbyIsIm5ld01lc3NhZ2UiLCJwdWJzdWIiLCJhZGRDb250YWN0IiwidXNlckxvYWRlciIsImZpbmRPbmUiLCJjb250YWN0cyIsImNvbnRhY3RJZCIsInVzZXIiLCJwcmltZSIsImNvbnRhY3QiLCJuZXdDb250YWN0IiwiY3JlYXRlR3JvdXAiLCJuYW1lIiwicGljdHVyZSIsImFkbWluIiwidXBkYXRlTWFueSIsIiRpbiIsIiRhZGRUb1NldCIsImdyb3VwcyIsIm5ld0dyb3VwIiwiZmluZCIsInVzZXJzIiwiZWRpdEdyb3VwIiwiZ3JvdXBJZCIsInVwZGF0ZWRVc2VycyIsInVuc3Vic2NyaWJlcnMiLCJsZW5ndGgiLCJ1cGRhdGVPbmUiLCIkcHVsbEFsbCIsImRlbGV0ZUdyb3VwIiwiY29uY2F0IiwiJGVhY2giLCJmaW5kQnlJZCIsInBvcHVsYXRlIiwiY29uc29sZSIsImVycm9yIiwicmVhZE1hc3NhZ2UiLCJtZXNzYWdlSWQiLCJyZWFkZWQiLCJ0eXBpbmciLCJ0eXBpbmdGb3JNZSIsIm9ubGluZSIsInNlbmRDb21tZW50IiwiaW5kZXhMaWtlIiwibGlrZXMiLCJpbmRleE9mIiwiaW5kZXhVbmxpa2UiLCJ1bmxpa2VzIiwibXlWb3RlIiwic3Bs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QUFlLEVBQUVoRixXQUhOO0FBSVh1QyxFQUFBQSxXQUFXLEVBQUVBLFdBSkY7QUFLWFQsRUFBQUEsVUFBVSxFQUFFQSxVQUxEO0FBTVhvQixFQUFBQSxTQUFTLEVBQUVBLFNBTkE7QUFPWGMsRUFBQUEsV0FBVyxFQUFFQSxXQVBGO0FBUVhHLEVBQUFBLE1BQU0sRUFBR0EsTUFSRTtBQVNYRSxFQUFBQSxNQUFNLEVBQUVBLE1BVEc7QUFVWEMsRUFBQUEsV0FBVyxFQUFFQTtBQVZGLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL1N1YnNjcmlwdGlvblwiO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vc3Vic2NyaWJlcnNcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuY29uc3QgR3JvdXAgPSBNb25nb29zZU1vZGVscygnR3JvdXAnKVxyXG5cclxuXHJcblxyXG5jb25zdCBzZW5kTWVzc2FnZSA9ICBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcblxyXG4gIGxldCBncm91cCA9IGF3YWl0IGdyb3VwTG9hZGVyLmxvYWQoYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgbGV0IGRlc3RNb2RlbCA9IGdyb3VwID8gXCJHcm91cFwiIDogXCJVc2VyXCI7XHJcbiAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7XHJcbiAgICBhdXRob3I6IHNlc3Npb24udXNlcklkLFxyXG4gICAgZGF0YTogYXJncy5tZXNzYWdlLFxyXG4gICAgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb24sXHJcbiAgICBkZXN0aW5hdGlvbk1vZGVsOiBkZXN0TW9kZWxcclxuICB9KTtcclxuXHJcbiAgaWYoc3Vic2NyaWJlcnMuZ2V0SXRlbShhcmdzLmRlc3RpbmF0aW9uKSl7XHJcbiAgICBtZXNzYWdlLnJlY2VpdmVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuICBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKCBtZXNzYWdlLmlkLnRvU3RyaW5nKCkgKTtcclxuICBcclxuICBsZXQgZGVzdCA9IFtdO1xyXG4gIGlmIChkZXN0TW9kZWwgPT09IFwiVXNlclwiKSB7XHJcbiAgICBkZXN0LnB1c2goYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBfaWQgPSAnJztcclxuICAgIGdyb3VwLnN1YnNjcmliZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIF9pZCA9IGAke3MuaWR9YDtcclxuICAgICAgaWYgKF9pZCAgIT09IHNlc3Npb24udXNlcklkKSB7XHJcbiAgICAgICAgZGVzdC5wdXNoKF9pZCkgICAgXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBsZXQgcHVibGlzaCA9IHsgZ2VuZXJhbEluZm86IHsgbmV3TWVzc2FnZTogbWVzc2FnZSwgZGVzdGluYXRpb246IGRlc3QgfX07XHJcbiAgcHVic3ViLnB1Ymxpc2goYXJncy5kZXN0aW5hdGlvbiwgcHVibGlzaCk7XHJcblxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5jb25zdCBhZGRDb250YWN0ID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb24sIHVzZXJMb2FkZXJ9KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBfaWQ6IHNlc3Npb24udXNlcklkLCBjb250YWN0czogYXJncy5jb250YWN0SWQgfSk7XHJcblxyXG4gIGlmICghdXNlcikge1xyXG4gICAgdXNlciA9ICBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgdXNlci5jb250YWN0cy5wdXNoKGFyZ3MuY29udGFjdElkKTtcclxuICAgIHVzZXIgPSBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgIHVzZXJMb2FkZXIucHJpbWUoYCR7dXNlci5pZH1gLCB1c2VyKTtcclxuICAgIGxldCBjb250YWN0ID0gIGF3YWl0IHVzZXJMb2FkZXIubG9hZChhcmdzLmNvbnRhY3RJZCk7XHJcbiAgICBjb250YWN0LmNvbnRhY3RzLnB1c2goc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgY29udGFjdCA9IGF3YWl0IGNvbnRhY3Quc2F2ZSgpO1xyXG4gICAgdXNlckxvYWRlci5wcmltZShgJHtjb250YWN0LmlkfWAsIGNvbnRhY3QpO1xyXG4gICAgcHVic3ViLnB1Ymxpc2goYXJncy5jb250YWN0SWQsIHsgZ2VuZXJhbEluZm86IHsgbmV3Q29udGFjdDogdXNlciwgZGVzdGluYXRpb246IGFyZ3MuY29udGFjdElkIH19KTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKHNlc3Npb24udXNlcklkLCB7IGdlbmVyYWxJbmZvOiB7IG5ld0NvbnRhY3Q6IGNvbnRhY3QsIGRlc3RpbmF0aW9uOiBzZXNzaW9uLnVzZXJJZCB9fSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXNlckxvYWRlci5sb2FkKGFyZ3MuY29udGFjdElkKTs7XHJcbn0gXHJcblxyXG5jb25zdCBjcmVhdGVHcm91cCA9IGFzeW5jIChwYXJlbnQsIHtuYW1lLCBwaWN0dXJlLCBzdWJzY3JpYmVyc30sIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlcn0pID0+IHtcclxuICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgaWYgKCF1c2VyLmFkbWluKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHN1YnNjcmliZXJzID0gKHN1YnNjcmliZXJzICYmIHN1YnNjcmliZXJzLnB1c2goc2Vzc2lvbi51c2VySWQpICYmIHN1YnNjcmliZXJzKSB8fCBbc2Vzc2lvbi51c2VySWRdXHJcbiAgbGV0IGdyb3VwID0gbmV3IEdyb3VwKHtuYW1lLCBwaWN0dXJlLCBzdWJzY3JpYmVyc30pO1xyXG4gIGF3YWl0IGdyb3VwLnNhdmUoKTtcclxuICBncm91cExvYWRlci5wcmltZShgJHtncm91cC5pZH1gLCBncm91cCk7XHJcblxyXG4gIGF3YWl0IFVzZXIudXBkYXRlTWFueSgge19pZDogeyAkaW46IHN1YnNjcmliZXJzIH19LCB7IFxyXG4gICAgJGFkZFRvU2V0OiB7IGdyb3VwczogZ3JvdXAuaWQgfVxyXG4gIH0pO1xyXG4gXHJcbiAgc3Vic2NyaWJlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgcHVic3ViLnB1Ymxpc2gocywgeyBnZW5lcmFsSW5mbzogeyBuZXdHcm91cDogZ3JvdXAsIGRlc3RpbmF0aW9uOiBzIH19KTtcclxuICB9KVxyXG5cclxuICBsZXQgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoe19pZDogeyAkaW46IHN1YnNjcmliZXJzIH19KVxyXG4gIHVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcbiAgICB1c2VyTG9hZGVyLnByaW1lKGAke3VzZXIuaWR9YCwgdXNlcilcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGdyb3VwO1xyXG59IFxyXG5cclxuY29uc3QgZWRpdEdyb3VwID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb24sIHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyfSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICBpZiAoIXVzZXIuYWRtaW4pIHtcclxuICAgICAgLy9leGl0IGlmIG5vdCBhZG1pblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZ3JvdXAgPSBhd2FpdCBncm91cExvYWRlci5sb2FkKGFyZ3MuZ3JvdXBJZCk7XHJcbiAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgIC8vZXhpdCBpZiBncm91cCBub3QgZXhpdFxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgdXBkYXRlZFVzZXJzID0gW107XHJcbiAgICBsZXQgdXNlcnM7XHJcblxyXG4gICAgLy9IYW5kZWwgdW5zdWJzY3JpYmVyc1xyXG4gICAgaWYgKGFyZ3MudW5zdWJzY3JpYmVycyAmJiBhcmdzLnVuc3Vic2NyaWJlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGF3YWl0IEdyb3VwLnVwZGF0ZU9uZSgge19pZDogZ3JvdXAuaWR9LCB7IFxyXG4gICAgICAgICRwdWxsQWxsOiB7IHN1YnNjcmliZXJzOiBhcmdzLnVuc3Vic2NyaWJlcnMgIH1cclxuICAgICAgfSlcclxuICAgICAgYXdhaXQgVXNlci51cGRhdGVNYW55KCB7X2lkOiB7ICRpbjogYXJncy51bnN1YnNjcmliZXJzIH19LCB7IFxyXG4gICAgICAgICRwdWxsQWxsOiB7IGdyb3VwczogW2dyb3VwLmlkXSB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHVzZXJzID0gYXdhaXQgVXNlci5maW5kKHtfaWQ6IHsgJGluOiBhcmdzLnVuc3Vic2NyaWJlcnMgfX0pXHJcblxyXG4gICAgICBhcmdzLnVuc3Vic2NyaWJlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICBwdWJzdWIucHVibGlzaChzLCB7IGdlbmVyYWxJbmZvOiB7IGRlbGV0ZUdyb3VwOiBncm91cCwgZGVzdGluYXRpb246IHMgfX0pO1xyXG4gICAgICB9KVxyXG4gICAgICB1cGRhdGVkVXNlcnMgPSB1cGRhdGVkVXNlcnMuY29uY2F0KHVzZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0hhbmRlbCBzdWJzY3JpYmVyc1xyXG4gICAgaWYgKGFyZ3Muc3Vic2NyaWJlcnMgJiYgYXJncy5zdWJzY3JpYmVycy5sZW5ndGgpIHtcclxuICAgICAgYXdhaXQgR3JvdXAudXBkYXRlT25lKCB7X2lkOiBncm91cC5pZH0sIHsgXHJcbiAgICAgICAgJGFkZFRvU2V0OiB7IHN1YnNjcmliZXJzOiB7JGVhY2ggOiBhcmdzLnN1YnNjcmliZXJzfSB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IFVzZXIudXBkYXRlTWFueSgge19pZDogeyAkaW46IGFyZ3Muc3Vic2NyaWJlcnMgfX0sIHsgXHJcbiAgICAgICAgJGFkZFRvU2V0OiB7IGdyb3VwczogZ3JvdXAuaWQgfVxyXG4gICAgICB9KVxyXG4gICAgICBhcmdzLnN1YnNjcmliZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2gocywgeyBnZW5lcmFsSW5mbzogeyBuZXdHcm91cDogZ3JvdXAsIGRlc3RpbmF0aW9uOiBzIH19KTtcclxuICAgICAgfSlcclxuICBcclxuICAgICAgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoe19pZDogeyAkaW46IGFyZ3Muc3Vic2NyaWJlcnMgfX0pXHJcblxyXG4gICAgICB1cGRhdGVkVXNlcnMgPSB1cGRhdGVkVXNlcnMuY29uY2F0KHVzZXJzKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZWRVc2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICB1c2VyTG9hZGVyLnByaW1lKGAke3VzZXIuaWR9YCwgdXNlcilcclxuICAgIH0pO1xyXG5cclxuICAgIGdyb3VwID0gIEdyb3VwLmZpbmRCeUlkKGdyb3VwLmlkKS5wb3B1bGF0ZSgnc3Vic2NyaWJlcnMnKTtcclxuICAgIGdyb3VwTG9hZGVyLnByaW1lKGAke2dyb3VwLmlkfWAsIGdyb3VwKTtcclxuICAgIHJldHVybiBncm91cExvYWRlci5sb2FkKGFyZ3MuZ3JvdXBJZCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgfVxyXG59IFxyXG5cclxuY29uc3QgcmVhZE1hc3NhZ2UgPSBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgbWVzc2FnZUxvYWRlcn0pID0+IHtcclxuICBsZXQgbWVzc2FnZSA9IGF3YWl0IG1lc3NhZ2VMb2FkZXIubG9hZChhcmdzLm1lc3NhZ2VJZCk7XHJcbiAgaWYgKG1lc3NhZ2UuZGVzdGluYXRpb24uaWQgIT09IHNlc3Npb24udXNlcklkKSB7XHJcbiAgICByZXR1cm4gbnVsbDsgIFxyXG4gIH1cclxuICBtZXNzYWdlLnJlYWRlZCA9IHRydWU7XHJcbiAgbWVzc2FnZSA9IGF3YWl0IG1lc3NhZ2Uuc2F2ZSgpO1xyXG5cclxuICBwdWJzdWIucHVibGlzaChgJHttZXNzYWdlLmF1dGhvci5pZH1gLCB7Z2VuZXJhbEluZm86IHsgcmVhZGVkOiBtZXNzYWdlLCBkZXN0aW5hdGlvbjogbWVzc2FnZS5hdXRob3IuaWR9fSk7XHJcbiAgXHJcbiAgcmV0dXJuIG1lc3NhZ2U7XHJcbn1cclxuXHJcbmNvbnN0IHR5cGluZyA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyfSkgPT4ge1xyXG4gIGxldCB1c2VyID0gIGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZClcclxuXHJcbiAgLy95b3UgY25vdCBqb2luIHRoaXMgcHVic3ViLnB1Ymxpc2ggYmVjYXVzZSB0aGUgc3Vic2NyaXB0aW9uIGZpbHRlciBub3Qgc2VuZCDXnmVpdGhlciB0byBjbGllbnRcclxuICBwdWJzdWIucHVibGlzaChgJHtzZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IHR5cGluZzogdXNlciwgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb259IH0pO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKGAke3Nlc3Npb24udXNlcklkfWAsIHsgZ2VuZXJhbEluZm86IHsgdHlwaW5nRm9yTWU6IHVzZXIsICBkZXN0aW5hdGlvbjogYXJncy5kZXN0aW5hdGlvbn0gfSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmNvbnN0IG9ubGluZSA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyfSkgPT4ge1xyXG4gIGxldCB1c2VyID0gYXdhaXQgdXNlckxvYWRlci5sb2FkKHNlc3Npb24udXNlcklkKTtcclxuICBwdWJzdWIucHVibGlzaChgJHtzZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IG9ubGluZTogdXNlciB9IH0pO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5jb25zdCBzZW5kQ29tbWVudCA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBtZXNzYWdlTG9hZGVyfSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgbWVzc2FnZSA9IGF3YWl0IG1lc3NhZ2VMb2FkZXIubG9hZChhcmdzLm1lc3NhZ2VJZCk7XHJcbiAgICBsZXQgaW5kZXhMaWtlID0gbWVzc2FnZS5saWtlcy5pbmRleE9mKHNlc3Npb24udXNlcklkKTtcclxuICAgIGxldCBpbmRleFVubGlrZSA9IG1lc3NhZ2UudW5saWtlcy5pbmRleE9mKHNlc3Npb24udXNlcklkKTtcclxuICAgIGlmIChhcmdzLm15Vm90ZSkge1xyXG4gICAgICBpZiAoYXJncy5teVZvdGUgPT09ICdMSUtFJykge1xyXG4gICAgICAgIGlmICggaW5kZXhVbmxpa2UgIT09IC0xKSBtZXNzYWdlLnVubGlrZXMuc3BsaWNlKGluZGV4VW5saWtlLCAxKTtcclxuICAgICAgICBpZiAoIGluZGV4TGlrZSA9PT0gLTEpIG1lc3NhZ2UubGlrZXMucHVzaChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGFyZ3MubXlWb3RlID09PSAnVU5MSUtFJykge1xyXG4gICAgICAgIGlmICggaW5kZXhVbmxpa2UgPT09IC0xKSBtZXNzYWdlLnVubGlrZXMucHVzaChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgICAgICAgaWYgKCBpbmRleExpa2UgIT09IC0xKSBtZXNzYWdlLmxpa2VzLnNwbGljZShpbmRleExpa2UsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaW5kZXhMaWtlICE9PSAtMSkgbWVzc2FnZS5saWtlcy5zcGxpY2UoaW5kZXhMaWtlLCAxKTtcclxuICAgICAgaWYgKGluZGV4VW5saWtlICE9PSAtMSkgbWVzc2FnZS51bmxpa2VzLnNwbGljZShpbmRleFVubGlrZSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgbWVzc2FnZS5zYXZlKCk7XHJcblxyXG4gICAgbWVzc2FnZUxvYWRlci5wcmltZShgJHttZXNzYWdlLmlkfWAsIG1lc3NhZ2UpXHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHNlbmRNZXNzYWdlVGV4dDogc2VuZE1lc3NhZ2UsXHJcbiAgICBzZW5kTWVzc2FnZUVtb2ppOiBzZW5kTWVzc2FnZSxcclxuICAgIHNlbmRNZXNzYWdlRmlsZTogc2VuZE1lc3NhZ2UsXHJcbiAgICBjcmVhdGVHcm91cDogY3JlYXRlR3JvdXAsXHJcbiAgICBhZGRDb250YWN0OiBhZGRDb250YWN0LFxyXG4gICAgZWRpdEdyb3VwOiBlZGl0R3JvdXAsXHJcbiAgICByZWFkTWFzc2FnZTogcmVhZE1hc3NhZ2UsXHJcbiAgICB0eXBpbmc6ICB0eXBpbmcsXHJcbiAgICBvbmxpbmU6IG9ubGluZSxcclxuICAgIHNlbmRDb21tZW50OiBzZW5kQ29tbWVudFxyXG4gIH0iXX0=