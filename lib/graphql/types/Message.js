"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');
var _default = {
  comments: function () {
    var _comments = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(paerent, args, _ref) {
      var session, userLoader, groupLoader, messageLoader, myVote;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = _ref.session, userLoader = _ref.userLoader, groupLoader = _ref.groupLoader, messageLoader = _ref.messageLoader;
              _context.prev = 1;
              myVote = paerent.likes.indexOf(session.userId) !== -1 ? 'LIKE' : paerent.unlikes.indexOf(session.userId) !== -1 ? 'UNLIKE' : null;
              return _context.abrupt("return", {
                myVote: myVote,
                likes: paerent.likes.length,
                unlikes: paerent.unlikes.length
              });

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", new Error(_context.t0));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 6]]);
    }));

    function comments(_x, _x2, _x3) {
      return _comments.apply(this, arguments);
    }

    return comments;
  }()
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL01lc3NhZ2UuanMiXSwibmFtZXMiOlsiTWVzc2FnZSIsIkdyb3VwIiwiY29tbWVudHMiLCJwYWVyZW50IiwiYXJncyIsInNlc3Npb24iLCJ1c2VyTG9hZGVyIiwiZ3JvdXBMb2FkZXIiLCJtZXNzYWdlTG9hZGVyIiwibXlWb3RlIiwibGlrZXMiLCJpbmRleE9mIiwidXNlcklkIiwidW5saWtlcyIsImxlbmd0aCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0EsSUFBTUEsT0FBTyxHQUFHLGdDQUFlLFNBQWYsQ0FBaEI7QUFDQSxJQUFNQyxLQUFLLEdBQUcsZ0NBQWUsT0FBZixDQUFkO2VBR2U7QUFFWEMsRUFBQUEsUUFBUTtBQUFBO0FBQUE7QUFBQSxpQ0FBRSxpQkFBTUMsT0FBTixFQUFlQyxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQkMsY0FBQUEsT0FBdEIsUUFBc0JBLE9BQXRCLEVBQStCQyxVQUEvQixRQUErQkEsVUFBL0IsRUFBMkNDLFdBQTNDLFFBQTJDQSxXQUEzQyxFQUF3REMsYUFBeEQsUUFBd0RBLGFBQXhEO0FBQUE7QUFFRkMsY0FBQUEsTUFGRSxHQUVRTixPQUFPLENBQUNPLEtBQVIsQ0FBY0MsT0FBZCxDQUFzQk4sT0FBTyxDQUFDTyxNQUE5QixNQUEwQyxDQUFDLENBQTNDLEdBQStDLE1BQS9DLEdBQTBEVCxPQUFPLENBQUNVLE9BQVIsQ0FBZ0JGLE9BQWhCLENBQXdCTixPQUFPLENBQUNPLE1BQWhDLE1BQTRDLENBQUMsQ0FBL0MsR0FBb0QsUUFBcEQsR0FBK0QsSUFGL0g7QUFBQSwrQ0FHQztBQUNMSCxnQkFBQUEsTUFBTSxFQUFFQSxNQURIO0FBRUxDLGdCQUFBQSxLQUFLLEVBQUVQLE9BQU8sQ0FBQ08sS0FBUixDQUFjSSxNQUZoQjtBQUdMRCxnQkFBQUEsT0FBTyxFQUFHVixPQUFPLENBQUNVLE9BQVIsQ0FBZ0JDO0FBSHJCLGVBSEQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsK0NBU0MsSUFBSUMsS0FBSixhQVREOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFGRyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IE1lc3NhZ2UgPSBNb25nb29zZU1vZGVscygnTWVzc2FnZScpO1xyXG5jb25zdCBHcm91cCA9IE1vbmdvb3NlTW9kZWxzKCdHcm91cCcpXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBcclxuXHJcbiAgICBjb21tZW50czogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb24sIHVzZXJMb2FkZXIsIGdyb3VwTG9hZGVyLCBtZXNzYWdlTG9hZGVyfSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGxldCBteVZvdGUgPSAgcGFlcmVudC5saWtlcy5pbmRleE9mKHNlc3Npb24udXNlcklkKSAhPT0gLTEgPyAnTElLRScgOiAoIHBhZXJlbnQudW5saWtlcy5pbmRleE9mKHNlc3Npb24udXNlcklkKSAhPT0gLTEpID8gJ1VOTElLRScgOiBudWxsXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG15Vm90ZTogbXlWb3RlLFxyXG4gICAgICAgICAgbGlrZXM6IHBhZXJlbnQubGlrZXMubGVuZ3RoLFxyXG4gICAgICAgICAgdW5saWtlcyA6IHBhZXJlbnQudW5saWtlcy5sZW5ndGhcclxuICAgICAgICB9O1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9Il19