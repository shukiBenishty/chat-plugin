"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Query = _interopRequireDefault(require("./Query"));

var _Mutation = _interopRequireDefault(require("./Mutation"));

var _Subscription = _interopRequireDefault(require("./Subscription"));

var _User = _interopRequireDefault(require("./types/User"));

var _Message = _interopRequireDefault(require("./types/Message"));

var _ChatRoom = _interopRequireDefault(require("./types/ChatRoom"));

var _Contact = _interopRequireDefault(require("./types/Contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Query: _Query["default"],
  Mutation: _Mutation["default"],
  Subscription: _Subscription["default"],
  User: _User["default"],
  Contact: _Contact["default"],
  ChatRoom: _ChatRoom["default"],
  Message: _Message["default"],
  Text: {
    __isTypeOf: function __isTypeOf(obj) {
      if (obj.text) return "Text";
      return null;
    }
  },
  Emoji: {
    __isTypeOf: function __isTypeOf(obj) {
      if (obj.emoji) return "Emoji";
      return null;
    }
  },
  File: {
    __isTypeOf: function __isTypeOf(obj) {
      if (obj.url) return "File";
      return null;
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy5qcyJdLCJuYW1lcyI6WyJRdWVyeSIsIk11dGF0aW9uIiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaXB0aW9uIiwiVXNlciIsIkNvbnRhY3QiLCJDaGF0Um9vbSIsIk1lc3NhZ2UiLCJUZXh0IiwiX19pc1R5cGVPZiIsIm9iaiIsInRleHQiLCJFbW9qaSIsImVtb2ppIiwiRmlsZSIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7O2VBSWU7QUFDYkEsRUFBQUEsS0FBSyxFQUFFQSxpQkFETTtBQUViQyxFQUFBQSxRQUFRLEVBQUVBLG9CQUZHO0FBR2JDLEVBQUFBLFlBQVksRUFBRUMsd0JBSEQ7QUFJYkMsRUFBQUEsSUFBSSxFQUFFQSxnQkFKTztBQUtiQyxFQUFBQSxPQUFPLEVBQUVBLG1CQUxJO0FBTWJDLEVBQUFBLFFBQVEsRUFBRUEsb0JBTkc7QUFPYkMsRUFBQUEsT0FBTyxFQUFFQSxtQkFQSTtBQVFiQyxFQUFBQSxJQUFJLEVBQUU7QUFDSkMsSUFBQUEsVUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQVM7QUFDbkIsVUFBSUEsR0FBRyxDQUFDQyxJQUFSLEVBQ0UsT0FBTyxNQUFQO0FBQ0YsYUFBTyxJQUFQO0FBQ0Q7QUFMRyxHQVJPO0FBZWJDLEVBQUFBLEtBQUssRUFBRTtBQUNMSCxJQUFBQSxVQUFVLEVBQUUsb0JBQUNDLEdBQUQsRUFBUztBQUNuQixVQUFJQSxHQUFHLENBQUNHLEtBQVIsRUFDRSxPQUFPLE9BQVA7QUFDRixhQUFPLElBQVA7QUFDRDtBQUxJLEdBZk07QUFzQmJDLEVBQUFBLElBQUksRUFBRTtBQUNKTCxJQUFBQSxVQUFVLEVBQUUsb0JBQUNDLEdBQUQsRUFBUztBQUNuQixVQUFJQSxHQUFHLENBQUNLLEdBQVIsRUFDRSxPQUFPLE1BQVA7QUFDRixhQUFPLElBQVA7QUFDRDtBQUxHO0FBdEJPLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUXVlcnkgZnJvbSBcIi4vUXVlcnlcIjtcclxuaW1wb3J0IE11dGF0aW9uIGZyb20gXCIuL011dGF0aW9uXCI7XHJcbmltcG9ydCBzdWJzY3JpcHRpb24gZnJvbSBcIi4vU3Vic2NyaXB0aW9uXCI7XHJcblxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi90eXBlcy9Vc2VyXCI7XHJcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuL3R5cGVzL01lc3NhZ2VcIjtcclxuaW1wb3J0IENoYXRSb29tIGZyb20gXCIuL3R5cGVzL0NoYXRSb29tXCI7XHJcbmltcG9ydCBDb250YWN0IGZyb20gXCIuL3R5cGVzL0NvbnRhY3RcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIFF1ZXJ5OiBRdWVyeSxcclxuICBNdXRhdGlvbjogTXV0YXRpb24sXHJcbiAgU3Vic2NyaXB0aW9uOiBzdWJzY3JpcHRpb24sXHJcbiAgVXNlcjogVXNlcixcclxuICBDb250YWN0OiBDb250YWN0LFxyXG4gIENoYXRSb29tOiBDaGF0Um9vbSxcclxuICBNZXNzYWdlOiBNZXNzYWdlLFxyXG4gIFRleHQ6IHtcclxuICAgIF9faXNUeXBlT2Y6IChvYmopID0+IHtcclxuICAgICAgaWYoIG9iai50ZXh0IClcclxuICAgICAgICByZXR1cm4gXCJUZXh0XCI7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgRW1vamk6IHtcclxuICAgIF9faXNUeXBlT2Y6IChvYmopID0+IHtcclxuICAgICAgaWYoIG9iai5lbW9qaSApXHJcbiAgICAgICAgcmV0dXJuIFwiRW1vamlcIjtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfSxcclxuICBGaWxlOiB7XHJcbiAgICBfX2lzVHlwZU9mOiAob2JqKSA9PiB7XHJcbiAgICAgIGlmKCBvYmoudXJsIClcclxuICAgICAgICByZXR1cm4gXCJGaWxlXCI7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH0sXHJcbn1cclxuIl19