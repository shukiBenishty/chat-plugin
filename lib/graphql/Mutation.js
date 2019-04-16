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
    var session, userLoader, messageLoader, groupLoader, message, indexLike, indexUnlike, group, publish;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            session = _ref16.session, userLoader = _ref16.userLoader, messageLoader = _ref16.messageLoader, groupLoader = _ref16.groupLoader;
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
            _context8.next = 13;
            return groupLoader.load("".concat(message.destination.id));

          case 13:
            group = _context8.sent;
            publish = {
              generalInfo: {
                editComment: message,
                destination: group.subscribers
              }
            };

            _Subscription.pubsub.publish("".concat(group.id), publish);

            return _context8.abrupt("return", message);

          case 19:
            _context8.prev = 19;
            _context8.t0 = _context8["catch"](1);
            console.error(_context8.t0);

          case 22:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 19]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL011dGF0aW9uLmpzIl0sIm5hbWVzIjpbIlVzZXIiLCJNZXNzYWdlIiwiR3JvdXAiLCJzZW5kTWVzc2FnZSIsInBhcmVudCIsImFyZ3MiLCJzZXNzaW9uIiwiZ3JvdXBMb2FkZXIiLCJtZXNzYWdlTG9hZGVyIiwibG9hZCIsImRlc3RpbmF0aW9uIiwiZ3JvdXAiLCJkZXN0TW9kZWwiLCJtZXNzYWdlIiwiYXV0aG9yIiwidXNlcklkIiwiZGF0YSIsImRlc3RpbmF0aW9uTW9kZWwiLCJzdWJzY3JpYmVycyIsImdldEl0ZW0iLCJyZWNlaXZlZCIsInNhdmUiLCJpZCIsInRvU3RyaW5nIiwiZGVzdCIsInB1c2giLCJfaWQiLCJmb3JFYWNoIiwicyIsInB1Ymxpc2giLCJnZW5lcmFsSW5mbyIsIm5ld01lc3NhZ2UiLCJwdWJzdWIiLCJhZGRDb250YWN0IiwidXNlckxvYWRlciIsImZpbmRPbmUiLCJjb250YWN0cyIsImNvbnRhY3RJZCIsInVzZXIiLCJwcmltZSIsImNvbnRhY3QiLCJuZXdDb250YWN0IiwiY3JlYXRlR3JvdXAiLCJuYW1lIiwicGljdHVyZSIsImFkbWluIiwidXBkYXRlTWFueSIsIiRpbiIsIiRhZGRUb1NldCIsImdyb3VwcyIsIm5ld0dyb3VwIiwiZmluZCIsInVzZXJzIiwiZWRpdEdyb3VwIiwiZ3JvdXBJZCIsInVwZGF0ZWRVc2VycyIsInVuc3Vic2NyaWJlcnMiLCJsZW5ndGgiLCJ1cGRhdGVPbmUiLCIkcHVsbEFsbCIsImRlbGV0ZUdyb3VwIiwiY29uY2F0IiwiJGVhY2giLCJmaW5kQnlJZCIsInBvcHVsYXRlIiwiY29uc29sZSIsImVycm9yIiwicmVhZE1hc3NhZ2UiLCJtZXNzYWdlSWQiLCJyZWFkZWQiLCJ0eXBpbmciLCJ0eXBpbmdGb3JNZSIsIm9ubGluZSIsInNlbmRDb21tZW50IiwiaW5kZXhMaWtlIiwibGlrZXMiLCJpbmRleE9mIiwiaW5kZXhVbmxpa2UiLCJ1bmxpa2VzIiwibXlWb3RlIiwic3BsaWNlIiwiZWRpdENvbW1lbnQiLCJzZW5kTWVzc2FnZVRleHQiLCJzZW5kTWVzc2FnZUVtb2ppIiwic2VuZE1lc3NhZ2VGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLGdDQUFlLE1BQWYsQ0FBYjtBQUNBLElBQU1DLE9BQU8sR0FBRyxnQ0FBZSxTQUFmLENBQWhCO0FBQ0EsSUFBTUMsS0FBSyxHQUFHLGdDQUFlLE9BQWYsQ0FBZDs7QUFJQSxJQUFNQyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBSSxpQkFBT0MsTUFBUCxFQUFlQyxJQUFmO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0JDLFlBQUFBLE9BQXRCLFFBQXNCQSxPQUF0QixFQUErQkMsV0FBL0IsUUFBK0JBLFdBQS9CLEVBQTRDQyxhQUE1QyxRQUE0Q0EsYUFBNUM7QUFBQTtBQUFBLG1CQUVERCxXQUFXLENBQUNFLElBQVosQ0FBaUJKLElBQUksQ0FBQ0ssV0FBdEIsQ0FGQzs7QUFBQTtBQUVmQyxZQUFBQSxLQUZlO0FBR2ZDLFlBQUFBLFNBSGUsR0FHSEQsS0FBSyxHQUFHLE9BQUgsR0FBYSxNQUhmO0FBSWZFLFlBQUFBLE9BSmUsR0FJTCxJQUFJWixPQUFKLENBQVk7QUFDeEJhLGNBQUFBLE1BQU0sRUFBRVIsT0FBTyxDQUFDUyxNQURRO0FBRXhCQyxjQUFBQSxJQUFJLEVBQUVYLElBQUksQ0FBQ1EsT0FGYTtBQUd4QkgsY0FBQUEsV0FBVyxFQUFFTCxJQUFJLENBQUNLLFdBSE07QUFJeEJPLGNBQUFBLGdCQUFnQixFQUFFTDtBQUpNLGFBQVosQ0FKSzs7QUFXbkIsZ0JBQUdNLHdCQUFZQyxPQUFaLENBQW9CZCxJQUFJLENBQUNLLFdBQXpCLENBQUgsRUFBeUM7QUFDdkNHLGNBQUFBLE9BQU8sQ0FBQ08sUUFBUixHQUFtQixJQUFuQjtBQUNEOztBQWJrQjtBQUFBLG1CQWVIUCxPQUFPLENBQUNRLElBQVIsRUFmRzs7QUFBQTtBQWVu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QUFBLFdBQVcsRUFBRUMsS0FBSyxDQUFDTztBQUEzQztBQUFmLGFBeEJFOztBQXlCaEJjLGlDQUFPSCxPQUFQLFdBQWtCbEIsS0FBSyxDQUFDVyxFQUF4QixHQUE4Qk8sT0FBOUI7O0FBekJnQiw4Q0EyQlRoQixPQTNCUzs7QUFBQTtBQUFBO0FBQUE7QUE2QmhCb0QsWUFBQUEsT0FBTyxDQUFDQyxLQUFSOztBQTdCZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBWE8sV0FBVztBQUFBO0FBQUE7QUFBQSxHQUFqQjs7ZUFpQ2U7QUFDWFMsRUFBQUEsZUFBZSxFQUFFL0UsV0FETjtBQUVYZ0YsRUFBQUEsZ0JBQWdCLEVBQUVoRixXQUZQO0FBR1hpRixFQUFBQSxlQUFlLEVBQUVqRixXQUhOO0FBSVh1QyxFQUFBQSxXQUFXLEVBQUVBLFdBSkY7QUFLWFQsRUFBQUEsVUFBVSxFQUFFQSxVQUxEO0FBTVhvQixFQUFBQSxTQUFTLEVBQUVBLFNBTkE7QUFPWGMsRUFBQUEsV0FBVyxFQUFFQSxXQVBGO0FBUVhHLEVBQUFBLE1BQU0sRUFBR0EsTUFSRTtBQVNYRSxFQUFBQSxNQUFNLEVBQUVBLE1BVEc7QUFVWEMsRUFBQUEsV0FBVyxFQUFFQTtBQVZGLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uL21vbmdvb3NlTW9kZWxzXCI7XHJcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL1N1YnNjcmlwdGlvblwiO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSBcIi4vc3Vic2NyaWJlcnNcIjtcclxuXHJcbmNvbnN0IFVzZXIgPSBNb25nb29zZU1vZGVscygnVXNlcicpO1xyXG5jb25zdCBNZXNzYWdlID0gTW9uZ29vc2VNb2RlbHMoJ01lc3NhZ2UnKTtcclxuY29uc3QgR3JvdXAgPSBNb25nb29zZU1vZGVscygnR3JvdXAnKVxyXG5cclxuXHJcblxyXG5jb25zdCBzZW5kTWVzc2FnZSA9ICBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcblxyXG4gIGxldCBncm91cCA9IGF3YWl0IGdyb3VwTG9hZGVyLmxvYWQoYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgbGV0IGRlc3RNb2RlbCA9IGdyb3VwID8gXCJHcm91cFwiIDogXCJVc2VyXCI7XHJcbiAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7XHJcbiAgICBhdXRob3I6IHNlc3Npb24udXNlcklkLFxyXG4gICAgZGF0YTogYXJncy5tZXNzYWdlLFxyXG4gICAgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb24sXHJcbiAgICBkZXN0aW5hdGlvbk1vZGVsOiBkZXN0TW9kZWxcclxuICB9KTtcclxuXHJcbiAgaWYoc3Vic2NyaWJlcnMuZ2V0SXRlbShhcmdzLmRlc3RpbmF0aW9uKSl7XHJcbiAgICBtZXNzYWdlLnJlY2VpdmVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuICBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKCBtZXNzYWdlLmlkLnRvU3RyaW5nKCkgKTtcclxuICBcclxuICBsZXQgZGVzdCA9IFtdO1xyXG4gIGlmIChkZXN0TW9kZWwgPT09IFwiVXNlclwiKSB7XHJcbiAgICBkZXN0LnB1c2goYXJncy5kZXN0aW5hdGlvbik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBfaWQgPSAnJztcclxuICAgIGdyb3VwLnN1YnNjcmliZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIF9pZCA9IGAke3MuaWR9YDtcclxuICAgICAgaWYgKF9pZCAgIT09IHNlc3Npb24udXNlcklkKSB7XHJcbiAgICAgICAgZGVzdC5wdXNoKF9pZCkgICAgXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBsZXQgcHVibGlzaCA9IHsgZ2VuZXJhbEluZm86IHsgbmV3TWVzc2FnZTogbWVzc2FnZSwgZGVzdGluYXRpb246IGRlc3QgfX07XHJcbiAgcHVic3ViLnB1Ymxpc2goYXJncy5kZXN0aW5hdGlvbiwgcHVibGlzaCk7XHJcblxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5jb25zdCBhZGRDb250YWN0ID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb24sIHVzZXJMb2FkZXJ9KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBfaWQ6IHNlc3Npb24udXNlcklkLCBjb250YWN0czogYXJncy5jb250YWN0SWQgfSk7XHJcblxyXG4gIGlmICghdXNlcikge1xyXG4gICAgdXNlciA9ICBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgdXNlci5jb250YWN0cy5wdXNoKGFyZ3MuY29udGFjdElkKTtcclxuICAgIHVzZXIgPSBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgIHVzZXJMb2FkZXIucHJpbWUoYCR7dXNlci5pZH1gLCB1c2VyKTtcclxuXHJcbiAgICBsZXQgY29udGFjdCA9ICBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoYXJncy5jb250YWN0SWQpO1xyXG4gICAgY29udGFjdC5jb250YWN0cy5wdXNoKHNlc3Npb24udXNlcklkKTtcclxuICAgIGNvbnRhY3QgPSBhd2FpdCBjb250YWN0LnNhdmUoKTtcclxuICAgIHVzZXJMb2FkZXIucHJpbWUoYCR7Y29udGFjdC5pZH1gLCBjb250YWN0KTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKGFyZ3MuY29udGFjdElkLCB7IGdlbmVyYWxJbmZvOiB7IG5ld0NvbnRhY3Q6IHVzZXIsIGRlc3RpbmF0aW9uOiBhcmdzLmNvbnRhY3RJZCB9fSk7XHJcbiAgICBwdWJzdWIucHVibGlzaChzZXNzaW9uLnVzZXJJZCwgeyBnZW5lcmFsSW5mbzogeyBuZXdDb250YWN0OiBjb250YWN0LCBkZXN0aW5hdGlvbjogc2Vzc2lvbi51c2VySWQgfX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHVzZXJMb2FkZXIubG9hZChhcmdzLmNvbnRhY3RJZCk7O1xyXG59IFxyXG5cclxuY29uc3QgY3JlYXRlR3JvdXAgPSBhc3luYyAocGFyZW50LCB7bmFtZSwgcGljdHVyZSwgc3Vic2NyaWJlcnN9LCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXJ9KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gIGlmICghdXNlci5hZG1pbikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBzdWJzY3JpYmVycyA9IChzdWJzY3JpYmVycyAmJiBzdWJzY3JpYmVycy5wdXNoKHNlc3Npb24udXNlcklkKSAmJiBzdWJzY3JpYmVycykgfHwgW3Nlc3Npb24udXNlcklkXVxyXG4gIGxldCBncm91cCA9IG5ldyBHcm91cCh7bmFtZSwgcGljdHVyZSwgc3Vic2NyaWJlcnN9KTtcclxuICBhd2FpdCBncm91cC5zYXZlKCk7XHJcbiAgZ3JvdXBMb2FkZXIucHJpbWUoYCR7Z3JvdXAuaWR9YCwgZ3JvdXApO1xyXG5cclxuICBhd2FpdCBVc2VyLnVwZGF0ZU1hbnkoIHtfaWQ6IHsgJGluOiBzdWJzY3JpYmVycyB9fSwgeyBcclxuICAgICRhZGRUb1NldDogeyBncm91cHM6IGdyb3VwLmlkIH1cclxuICB9KTtcclxuIFxyXG4gIHN1YnNjcmliZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKHMsIHsgZ2VuZXJhbEluZm86IHsgbmV3R3JvdXA6IGdyb3VwLCBkZXN0aW5hdGlvbjogcyB9fSk7XHJcbiAgfSlcclxuXHJcbiAgbGV0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kKHtfaWQ6IHsgJGluOiBzdWJzY3JpYmVycyB9fSlcclxuICB1c2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgdXNlckxvYWRlci5wcmltZShgJHt1c2VyLmlkfWAsIHVzZXIpXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBncm91cDtcclxufSBcclxuXHJcbmNvbnN0IGVkaXRHcm91cCA9IGFzeW5jIChwYXJlbnQsIGFyZ3MsIHtzZXNzaW9uLCB1c2VyTG9hZGVyLCBncm91cExvYWRlcn0pID0+IHtcclxuICB0cnkge1xyXG4gICAgbGV0IHVzZXIgPSBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgaWYgKCF1c2VyLmFkbWluKSB7XHJcbiAgICAgIC8vZXhpdCBpZiBub3QgYWRtaW5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGdyb3VwID0gYXdhaXQgZ3JvdXBMb2FkZXIubG9hZChhcmdzLmdyb3VwSWQpO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICAvL2V4aXQgaWYgZ3JvdXAgbm90IGV4aXRcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHVwZGF0ZWRVc2VycyA9IFtdO1xyXG4gICAgbGV0IHVzZXJzO1xyXG5cclxuICAgIC8vSGFuZGVsIHVuc3Vic2NyaWJlcnNcclxuICAgIGlmIChhcmdzLnVuc3Vic2NyaWJlcnMgJiYgYXJncy51bnN1YnNjcmliZXJzLmxlbmd0aCkge1xyXG4gICAgICBhd2FpdCBHcm91cC51cGRhdGVPbmUoIHtfaWQ6IGdyb3VwLmlkfSwgeyBcclxuICAgICAgICAkcHVsbEFsbDogeyBzdWJzY3JpYmVyczogYXJncy51bnN1YnNjcmliZXJzICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGF3YWl0IFVzZXIudXBkYXRlTWFueSgge19pZDogeyAkaW46IGFyZ3MudW5zdWJzY3JpYmVycyB9fSwgeyBcclxuICAgICAgICAkcHVsbEFsbDogeyBncm91cHM6IFtncm91cC5pZF0gfVxyXG4gICAgICB9KVxyXG4gICAgICB1c2VycyA9IGF3YWl0IFVzZXIuZmluZCh7X2lkOiB7ICRpbjogYXJncy51bnN1YnNjcmliZXJzIH19KVxyXG5cclxuICAgICAgYXJncy51bnN1YnNjcmliZXJzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgcHVic3ViLnB1Ymxpc2gocywgeyBnZW5lcmFsSW5mbzogeyBkZWxldGVHcm91cDogZ3JvdXAsIGRlc3RpbmF0aW9uOiBzIH19KTtcclxuICAgICAgfSlcclxuICAgICAgdXBkYXRlZFVzZXJzID0gdXBkYXRlZFVzZXJzLmNvbmNhdCh1c2Vycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9IYW5kZWwgc3Vic2NyaWJlcnNcclxuICAgIGlmIChhcmdzLnN1YnNjcmliZXJzICYmIGFyZ3Muc3Vic2NyaWJlcnMubGVuZ3RoKSB7XHJcbiAgICAgIGF3YWl0IEdyb3VwLnVwZGF0ZU9uZSgge19pZDogZ3JvdXAuaWR9LCB7IFxyXG4gICAgICAgICRhZGRUb1NldDogeyBzdWJzY3JpYmVyczogeyRlYWNoIDogYXJncy5zdWJzY3JpYmVyc30gfVxyXG4gICAgICB9KVxyXG4gICAgICBhd2FpdCBVc2VyLnVwZGF0ZU1hbnkoIHtfaWQ6IHsgJGluOiBhcmdzLnN1YnNjcmliZXJzIH19LCB7IFxyXG4gICAgICAgICRhZGRUb1NldDogeyBncm91cHM6IGdyb3VwLmlkIH1cclxuICAgICAgfSlcclxuICAgICAgYXJncy5zdWJzY3JpYmVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKHMsIHsgZ2VuZXJhbEluZm86IHsgbmV3R3JvdXA6IGdyb3VwLCBkZXN0aW5hdGlvbjogcyB9fSk7XHJcbiAgICAgIH0pXHJcbiAgXHJcbiAgICAgIHVzZXJzID0gYXdhaXQgVXNlci5maW5kKHtfaWQ6IHsgJGluOiBhcmdzLnN1YnNjcmliZXJzIH19KVxyXG5cclxuICAgICAgdXBkYXRlZFVzZXJzID0gdXBkYXRlZFVzZXJzLmNvbmNhdCh1c2Vycyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVkVXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgdXNlckxvYWRlci5wcmltZShgJHt1c2VyLmlkfWAsIHVzZXIpXHJcbiAgICB9KTtcclxuXHJcbiAgICBncm91cCA9ICBHcm91cC5maW5kQnlJZChncm91cC5pZCkucG9wdWxhdGUoJ3N1YnNjcmliZXJzJyk7XHJcbiAgICBncm91cExvYWRlci5wcmltZShgJHtncm91cC5pZH1gLCBncm91cCk7XHJcbiAgICByZXR1cm4gZ3JvdXBMb2FkZXIubG9hZChhcmdzLmdyb3VwSWQpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gIH1cclxufSBcclxuXHJcbmNvbnN0IHJlYWRNYXNzYWdlID0gYXN5bmMgKHBhcmVudCwgYXJncywge3Nlc3Npb24sIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcbiAgbGV0IG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlTG9hZGVyLmxvYWQoYXJncy5tZXNzYWdlSWQpO1xyXG4gIGlmIChtZXNzYWdlLmRlc3RpbmF0aW9uLmlkICE9PSBzZXNzaW9uLnVzZXJJZCkge1xyXG4gICAgcmV0dXJuIG51bGw7ICBcclxuICB9XHJcbiAgbWVzc2FnZS5yZWFkZWQgPSB0cnVlO1xyXG4gIG1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuXHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7bWVzc2FnZS5hdXRob3IuaWR9YCwge2dlbmVyYWxJbmZvOiB7IHJlYWRlZDogbWVzc2FnZSwgZGVzdGluYXRpb246IG1lc3NhZ2UuYXV0aG9yLmlkfX0pO1xyXG4gIFxyXG4gIHJldHVybiBtZXNzYWdlO1xyXG59XHJcblxyXG5jb25zdCB0eXBpbmcgPSBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICBsZXQgdXNlciA9ICBhd2FpdCB1c2VyTG9hZGVyLmxvYWQoc2Vzc2lvbi51c2VySWQpXHJcblxyXG4gIC8veW91IGNub3Qgam9pbiB0aGlzIHB1YnN1Yi5wdWJsaXNoIGJlY2F1c2UgdGhlIHN1YnNjcmlwdGlvbiBmaWx0ZXIgbm90IHNlbmQg155laXRoZXIgdG8gY2xpZW50XHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7c2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyB0eXBpbmc6IHVzZXIsIGRlc3RpbmF0aW9uOiBhcmdzLmRlc3RpbmF0aW9ufSB9KTtcclxuICBwdWJzdWIucHVibGlzaChgJHtzZXNzaW9uLnVzZXJJZH1gLCB7IGdlbmVyYWxJbmZvOiB7IHR5cGluZ0Zvck1lOiB1c2VyLCAgZGVzdGluYXRpb246IGFyZ3MuZGVzdGluYXRpb259IH0pO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5jb25zdCBvbmxpbmUgPSBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlcn0pID0+IHtcclxuICBsZXQgdXNlciA9IGF3YWl0IHVzZXJMb2FkZXIubG9hZChzZXNzaW9uLnVzZXJJZCk7XHJcbiAgcHVic3ViLnB1Ymxpc2goYCR7c2Vzc2lvbi51c2VySWR9YCwgeyBnZW5lcmFsSW5mbzogeyBvbmxpbmU6IHVzZXIgfSB9KTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuY29uc3Qgc2VuZENvbW1lbnQgPSBhc3luYyAocGFyZW50LCBhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgbWVzc2FnZUxvYWRlciwgZ3JvdXBMb2FkZXJ9KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBtZXNzYWdlID0gYXdhaXQgbWVzc2FnZUxvYWRlci5sb2FkKGFyZ3MubWVzc2FnZUlkKTtcclxuICAgIGxldCBpbmRleExpa2UgPSBtZXNzYWdlLmxpa2VzLmluZGV4T2Yoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgbGV0IGluZGV4VW5saWtlID0gbWVzc2FnZS51bmxpa2VzLmluZGV4T2Yoc2Vzc2lvbi51c2VySWQpO1xyXG4gICAgaWYgKGFyZ3MubXlWb3RlKSB7XHJcbiAgICAgIGlmIChhcmdzLm15Vm90ZSA9PT0gJ0xJS0UnKSB7XHJcbiAgICAgICAgaWYgKCBpbmRleFVubGlrZSAhPT0gLTEpIG1lc3NhZ2UudW5saWtlcy5zcGxpY2UoaW5kZXhVbmxpa2UsIDEpO1xyXG4gICAgICAgIGlmICggaW5kZXhMaWtlID09PSAtMSkgbWVzc2FnZS5saWtlcy5wdXNoKHNlc3Npb24udXNlcklkKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYXJncy5teVZvdGUgPT09ICdVTkxJS0UnKSB7XHJcbiAgICAgICAgaWYgKCBpbmRleFVubGlrZSA9PT0gLTEpIG1lc3NhZ2UudW5saWtlcy5wdXNoKHNlc3Npb24udXNlcklkKTtcclxuICAgICAgICBpZiAoIGluZGV4TGlrZSAhPT0gLTEpIG1lc3NhZ2UubGlrZXMuc3BsaWNlKGluZGV4TGlrZSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpbmRleExpa2UgIT09IC0xKSBtZXNzYWdlLmxpa2VzLnNwbGljZShpbmRleExpa2UsIDEpO1xyXG4gICAgICBpZiAoaW5kZXhVbmxpa2UgIT09IC0xKSBtZXNzYWdlLnVubGlrZXMuc3BsaWNlKGluZGV4VW5saWtlLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBtZXNzYWdlLnNhdmUoKTtcclxuXHJcbiAgICBtZXNzYWdlTG9hZGVyLnByaW1lKGAke21lc3NhZ2UuaWR9YCwgbWVzc2FnZSlcclxuXHJcbiAgICBsZXQgZ3JvdXAgPSBhd2FpdCBncm91cExvYWRlci5sb2FkKGAke21lc3NhZ2UuZGVzdGluYXRpb24uaWR9YClcclxuICAgIGxldCBwdWJsaXNoID0geyBnZW5lcmFsSW5mbzogeyBlZGl0Q29tbWVudDogbWVzc2FnZSwgZGVzdGluYXRpb246IGdyb3VwLnN1YnNjcmliZXJzIH19O1xyXG4gICAgcHVic3ViLnB1Ymxpc2goYCR7Z3JvdXAuaWR9YCwgcHVibGlzaCk7XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzZW5kTWVzc2FnZVRleHQ6IHNlbmRNZXNzYWdlLFxyXG4gICAgc2VuZE1lc3NhZ2VFbW9qaTogc2VuZE1lc3NhZ2UsXHJcbiAgICBzZW5kTWVzc2FnZUZpbGU6IHNlbmRNZXNzYWdlLFxyXG4gICAgY3JlYXRlR3JvdXA6IGNyZWF0ZUdyb3VwLFxyXG4gICAgYWRkQ29udGFjdDogYWRkQ29udGFjdCxcclxuICAgIGVkaXRHcm91cDogZWRpdEdyb3VwLFxyXG4gICAgcmVhZE1hc3NhZ2U6IHJlYWRNYXNzYWdlLFxyXG4gICAgdHlwaW5nOiAgdHlwaW5nLFxyXG4gICAgb25saW5lOiBvbmxpbmUsXHJcbiAgICBzZW5kQ29tbWVudDogc2VuZENvbW1lbnRcclxuICB9Il19