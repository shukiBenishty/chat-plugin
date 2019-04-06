"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Message = (0, _mongooseModels["default"])('Message');
var ChatRoom = (0, _mongooseModels["default"])('ChatRoom');
var _default = {// author: async(paerent ,args, {session}) => {
  //   try {
  //     let message = await Message.findById(paerent.id).populate("author"); 
  //     return message.author;
  //   } catch (error) {
  //     return new Error(error)
  //   }
  // },
  // destination: async(paerent ,args, {session}) => {
  //     try {
  //         let message = await Message.findById(paerent.id).populate("destination"); 
  //         return message.destination;
  //       } catch (error) {
  //         return new Error(error)
  //       }
  // }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL01lc3NhZ2UuanMiXSwibmFtZXMiOlsiTWVzc2FnZSIsIkNoYXRSb29tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFHQSxJQUFNQSxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtBQUNBLElBQU1DLFFBQVEsR0FBRyxnQ0FBZSxVQUFmLENBQWpCO2VBR2UsQ0FDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhCVyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbmdvb3NlTW9kZWxzIGZyb20gXCIuLi8uLi9tb25nb29zZU1vZGVsc1wiO1xyXG5cclxuXHJcbmNvbnN0IE1lc3NhZ2UgPSBNb25nb29zZU1vZGVscygnTWVzc2FnZScpO1xyXG5jb25zdCBDaGF0Um9vbSA9IE1vbmdvb3NlTW9kZWxzKCdDaGF0Um9vbScpXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBcclxuICAgIC8vIGF1dGhvcjogYXN5bmMocGFlcmVudCAsYXJncywge3Nlc3Npb259KSA9PiB7XHJcbiAgICAvLyAgIHRyeSB7XHJcbiAgICAvLyAgICAgbGV0IG1lc3NhZ2UgPSBhd2FpdCBNZXNzYWdlLmZpbmRCeUlkKHBhZXJlbnQuaWQpLnBvcHVsYXRlKFwiYXV0aG9yXCIpOyBcclxuICAgIC8vICAgICByZXR1cm4gbWVzc2FnZS5hdXRob3I7XHJcbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIC8vIGRlc3RpbmF0aW9uOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgIC8vICAgICB0cnkge1xyXG4gICAgLy8gICAgICAgICBsZXQgbWVzc2FnZSA9IGF3YWl0IE1lc3NhZ2UuZmluZEJ5SWQocGFlcmVudC5pZCkucG9wdWxhdGUoXCJkZXN0aW5hdGlvblwiKTsgXHJcbiAgICAvLyAgICAgICAgIHJldHVybiBtZXNzYWdlLmRlc3RpbmF0aW9uO1xyXG4gICAgLy8gICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vIH1cclxuICB9Il19