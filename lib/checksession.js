"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(redirectPath) {
  return function (req, res, next) {
    if (req.session === undefined || req.session.userId === undefined) {
      req.session.referer = redirectPath;
      res.redirect('/login');
    } else next();
  };
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGVja3Nlc3Npb24uanMiXSwibmFtZXMiOlsicmVkaXJlY3RQYXRoIiwicmVxIiwicmVzIiwibmV4dCIsInNlc3Npb24iLCJ1bmRlZmluZWQiLCJ1c2VySWQiLCJyZWZlcmVyIiwicmVkaXJlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7ZUFBZ0Isa0JBQUNBLFlBQUQsRUFBa0I7QUFDOUIsU0FBTyxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUN2QixRQUFJRixHQUFHLENBQUNHLE9BQUosS0FBZ0JDLFNBQWhCLElBQTZCSixHQUFHLENBQUNHLE9BQUosQ0FBWUUsTUFBWixLQUF1QkQsU0FBeEQsRUFBa0U7QUFDOURKLE1BQUFBLEdBQUcsQ0FBQ0csT0FBSixDQUFZRyxPQUFaLEdBQXNCUCxZQUF0QjtBQUNBRSxNQUFBQSxHQUFHLENBQUNNLFFBQUosQ0FBYSxRQUFiO0FBQ0gsS0FIRCxNQUtJTCxJQUFJO0FBQ1gsR0FQRDtBQVFILEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAgKHJlZGlyZWN0UGF0aCkgPT4ge1xyXG4gICAgcmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXEuc2Vzc2lvbiA9PT0gdW5kZWZpbmVkIHx8IHJlcS5zZXNzaW9uLnVzZXJJZCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmVxLnNlc3Npb24ucmVmZXJlciA9IHJlZGlyZWN0UGF0aDtcclxuICAgICAgICAgICAgcmVzLnJlZGlyZWN0KCcvbG9naW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICB9XHJcbn0iXX0=