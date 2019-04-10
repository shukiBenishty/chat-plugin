"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongooseModels = _interopRequireDefault(require("../../mongooseModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Message = (0, _mongooseModels["default"])('Message');
var Group = (0, _mongooseModels["default"])('Group');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3R5cGVzL01lc3NhZ2UuanMiXSwibmFtZXMiOlsiTWVzc2FnZSIsIkdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFHQSxJQUFNQSxPQUFPLEdBQUcsZ0NBQWUsU0FBZixDQUFoQjtBQUNBLElBQU1DLEtBQUssR0FBRyxnQ0FBZSxPQUFmLENBQWQ7ZUFHZSxDQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJXLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uZ29vc2VNb2RlbHMgZnJvbSBcIi4uLy4uL21vbmdvb3NlTW9kZWxzXCI7XHJcblxyXG5cclxuY29uc3QgTWVzc2FnZSA9IE1vbmdvb3NlTW9kZWxzKCdNZXNzYWdlJyk7XHJcbmNvbnN0IEdyb3VwID0gTW9uZ29vc2VNb2RlbHMoJ0dyb3VwJylcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IFxyXG4gICAgLy8gYXV0aG9yOiBhc3luYyhwYWVyZW50ICxhcmdzLCB7c2Vzc2lvbn0pID0+IHtcclxuICAgIC8vICAgdHJ5IHtcclxuICAgIC8vICAgICBsZXQgbWVzc2FnZSA9IGF3YWl0IE1lc3NhZ2UuZmluZEJ5SWQocGFlcmVudC5pZCkucG9wdWxhdGUoXCJhdXRob3JcIik7IFxyXG4gICAgLy8gICAgIHJldHVybiBtZXNzYWdlLmF1dGhvcjtcclxuICAgIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9LFxyXG4gICAgLy8gZGVzdGluYXRpb246IGFzeW5jKHBhZXJlbnQgLGFyZ3MsIHtzZXNzaW9ufSkgPT4ge1xyXG4gICAgLy8gICAgIHRyeSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBtZXNzYWdlID0gYXdhaXQgTWVzc2FnZS5maW5kQnlJZChwYWVyZW50LmlkKS5wb3B1bGF0ZShcImRlc3RpbmF0aW9uXCIpOyBcclxuICAgIC8vICAgICAgICAgcmV0dXJuIG1lc3NhZ2UuZGVzdGluYXRpb247XHJcbiAgICAvLyAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKVxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gfVxyXG4gIH0iXX0=