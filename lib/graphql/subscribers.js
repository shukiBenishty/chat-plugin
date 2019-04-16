"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var subscribers = {};
var _default = {
  getItem: function getItem(key) {
    return subscribers[key];
  },
  setItem: function setItem(key) {
    subscribers[key] = true;
  },
  deleteItem: function deleteItem(key) {
    delete subscribers[key];
  },
  getSubscribers: function getSubscribers() {
    return subscribers;
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL3N1YnNjcmliZXJzLmpzIl0sIm5hbWVzIjpbInN1YnNjcmliZXJzIiwiZ2V0SXRlbSIsImtleSIsInNldEl0ZW0iLCJkZWxldGVJdGVtIiwiZ2V0U3Vic2NyaWJlcnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxFQUFsQjtlQUNlO0FBQ2JDLEVBQUFBLE9BQU8sRUFBRSxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2YsV0FBT0YsV0FBVyxDQUFDRSxHQUFELENBQWxCO0FBQ0QsR0FIVztBQUliQyxFQUFBQSxPQUFPLEVBQUUsaUJBQUNELEdBQUQsRUFBUztBQUNoQkYsSUFBQUEsV0FBVyxDQUFDRSxHQUFELENBQVgsR0FBbUIsSUFBbkI7QUFDQyxHQU5VO0FBT2JFLEVBQUFBLFVBQVUsRUFBRSxvQkFBQ0YsR0FBRCxFQUFTO0FBQ25CLFdBQU9GLFdBQVcsQ0FBQ0UsR0FBRCxDQUFsQjtBQUNELEdBVFk7QUFVYkcsRUFBQUEsY0FBYyxFQUFFLDBCQUFNO0FBQ3BCLFdBQU9MLFdBQVA7QUFDRDtBQVpZLEMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc3Vic2NyaWJlcnMgPSB7fTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldEl0ZW06IChrZXkpID0+IHtcclxuICAgICByZXR1cm4gc3Vic2NyaWJlcnNba2V5XTtcclxuICAgfSxcclxuICBzZXRJdGVtOiAoa2V5KSA9PiB7XHJcbiAgICBzdWJzY3JpYmVyc1trZXldID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgZGVsZXRlSXRlbTogKGtleSkgPT4ge1xyXG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW2tleV07XHJcbiAgfSxcclxuICBnZXRTdWJzY3JpYmVyczogKCkgPT4ge1xyXG4gICAgcmV0dXJuIHN1YnNjcmliZXJzO1xyXG4gIH1cclxufSJdfQ==