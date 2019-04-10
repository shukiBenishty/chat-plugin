"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var groupSchema = new Schema({
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  createdAt: Date,
  updatedAt: Date
});
groupSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) this.createdAt = currentDate;
  next();
});

var _default = function _default(db) {
  db.model('Group', groupSchema);
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb25nb29zZU1vZGVscy9ncm91cC5qcyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb25nb29zZSIsImdyb3VwU2NoZW1hIiwic3Vic2NyaWJlcnMiLCJ0eXBlIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsIm1lc3NhZ2VzIiwiY3JlYXRlZEF0IiwiRGF0ZSIsInVwZGF0ZWRBdCIsInByZSIsIm5leHQiLCJjdXJyZW50RGF0ZSIsImRiIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBLElBQU1BLE1BQU0sR0FBR0MscUJBQVNELE1BQXhCO0FBRUEsSUFBTUUsV0FBVyxHQUFHLElBQUlGLE1BQUosQ0FBVztBQUMzQkcsRUFBQUEsV0FBVyxFQUFFLENBQUM7QUFBQ0MsSUFBQUEsSUFBSSxFQUFFSixNQUFNLENBQUNLLEtBQVAsQ0FBYUMsUUFBcEI7QUFBOEJDLElBQUFBLEdBQUcsRUFBRTtBQUFuQyxHQUFELENBRGM7QUFFM0JDLEVBQUFBLFFBQVEsRUFBRSxDQUFDO0FBQUNKLElBQUFBLElBQUksRUFBRUosTUFBTSxDQUFDSyxLQUFQLENBQWFDLFFBQXBCO0FBQThCQyxJQUFBQSxHQUFHLEVBQUU7QUFBbkMsR0FBRCxDQUZpQjtBQUczQkUsRUFBQUEsU0FBUyxFQUFFQyxJQUhnQjtBQUkzQkMsRUFBQUEsU0FBUyxFQUFFRDtBQUpnQixDQUFYLENBQXBCO0FBUUFSLFdBQVcsQ0FBQ1UsR0FBWixDQUFnQixNQUFoQixFQUF3QixVQUFTQyxJQUFULEVBQWU7QUFDbkMsTUFBSUMsV0FBVyxHQUFHLElBQUlKLElBQUosRUFBbEI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCRyxXQUFqQjtBQUNBLE1BQUksQ0FBQyxLQUFLTCxTQUFWLEVBQ0ksS0FBS0EsU0FBTCxHQUFpQkssV0FBakI7QUFDSkQsRUFBQUEsSUFBSTtBQUNQLENBTkQ7O2VBUWdCLGtCQUFBRSxFQUFFLEVBQUk7QUFBRUEsRUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVMsT0FBVCxFQUFrQmQsV0FBbEI7QUFBK0IsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcclxuXHJcbmNvbnN0IGdyb3VwU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgICBzdWJzY3JpYmVyczogW3t0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1VzZXInfV0sXHJcbiAgICBtZXNzYWdlczogW3t0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ01lc3NhZ2UnfV0sXHJcbiAgICBjcmVhdGVkQXQ6IERhdGUsXHJcbiAgICB1cGRhdGVkQXQ6IERhdGVcclxuXHJcbn0pO1xyXG5cclxuZ3JvdXBTY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24obmV4dCkge1xyXG4gICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudXBkYXRlZEF0ID0gY3VycmVudERhdGU7XHJcbiAgICBpZiAoIXRoaXMuY3JlYXRlZEF0KVxyXG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gY3VycmVudERhdGU7XHJcbiAgICBuZXh0KCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgIGRiID0+IHsgZGIubW9kZWwoJ0dyb3VwJywgZ3JvdXBTY2hlbWEpfSJdfQ==