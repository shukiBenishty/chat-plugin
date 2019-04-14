"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');
var _default = {// author: async(paerent ,args, {session, userLoader, groupLoader, messageLoader}) => {
  //   try {
  //     let message = await Message.findById(paerent.id).populate("author"); 
  //     return message.author;
  //   } catch (error) {
  //     return new Error(error)
  //   }
  // },
  // destination: async(paerent ,args, {session, userLoader, groupLoader, messageLoader}) => {
  //     try {
  //         let message = await Message.findById(paerent.id).populate("destination"); 
  //         return message.destination;
  //       } catch (error) {
  //         return new Error(error)
  //       }
  // }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL01lc3NhZ2UuanMiXSwibmFtZXMiOlsiTWVzc2FnZSIsIkdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFHQSxJQUFNQSxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtBQUNBLElBQU1DLEtBQUssR0FBRyxnQ0FBZSxPQUFmLENBQWQ7ZUFHZSxDQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJXLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5cclxuY29uc3QgTWVzc2FnZSA9IE1vbmdvb3NlTW9kZWxzKCdNZXNzYWdlJyk7XHJcbmNvbnN0IEdyb3VwID0gTW9uZ29vc2VNb2RlbHMoJ0dyb3VwJylcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IFxyXG4gICAgLy8gYXV0aG9yOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcbiAgICAvLyAgIHRyeSB7XHJcbiAgICAvLyAgICAgbGV0IG1lc3NhZ2UgPSBhd2FpdCBNZXNzYWdlLmZpbmRCeUlkKHBhZXJlbnQuaWQpLnBvcHVsYXRlKFwiYXV0aG9yXCIpOyBcclxuICAgIC8vICAgICByZXR1cm4gbWVzc2FnZS5hdXRob3I7XHJcbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcilcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSxcclxuICAgIC8vIGRlc3RpbmF0aW9uOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbiwgdXNlckxvYWRlciwgZ3JvdXBMb2FkZXIsIG1lc3NhZ2VMb2FkZXJ9KSA9PiB7XHJcbiAgICAvLyAgICAgdHJ5IHtcclxuICAgIC8vICAgICAgICAgbGV0IG1lc3NhZ2UgPSBhd2FpdCBNZXNzYWdlLmZpbmRCeUlkKHBhZXJlbnQuaWQpLnBvcHVsYXRlKFwiZGVzdGluYXRpb25cIik7IFxyXG4gICAgLy8gICAgICAgICByZXR1cm4gbWVzc2FnZS5kZXN0aW5hdGlvbjtcclxuICAgIC8vICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3IpXHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyB9XHJcbiAgfSJdfQ==