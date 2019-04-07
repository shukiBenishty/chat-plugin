"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BUNDLE = _path["default"].resolve(__dirname, '../client/dist/bundle.js');

var _default = function _default(graphqlUrl, websocketURL) {
  _fs["default"].readFile(BUNDLE, "utf8", function (err, data) {
    _fs["default"].writeFile(BUNDLE, data.replace(/__GRAPHQL_URL__/g, graphqlUrl).replace(/__WS_URL__/g, websocketURL), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0Q2xlbnQuanMiXSwibmFtZXMiOlsiQlVORExFIiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJncmFwaHFsVXJsIiwid2Vic29ja2V0VVJMIiwiZnMiLCJyZWFkRmlsZSIsImVyciIsImRhdGEiLCJ3cml0ZUZpbGUiLCJyZXBsYWNlIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBSUEsTUFBTSxHQUFHQyxpQkFBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLDBCQUF4QixDQUFiOztlQUNlLGtCQUFDQyxVQUFELEVBQWFDLFlBQWIsRUFBOEI7QUFDekNDLGlCQUFHQyxRQUFILENBQVlQLE1BQVosRUFBb0IsTUFBcEIsRUFBNEIsVUFBQ1EsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDdkNILG1CQUFHSSxTQUFILENBQWFWLE1BQWIsRUFDSVMsSUFBSSxDQUFDRSxPQUFMLENBQWEsa0JBQWIsRUFBaUNQLFVBQWpDLEVBQ2NPLE9BRGQsQ0FDc0IsYUFEdEIsRUFDcUNOLFlBRHJDLENBREosRUFHSSxVQUFDRyxHQUFELEVBQVM7QUFDVCxVQUFHQSxHQUFILEVBQVE7QUFDSixlQUFPSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUwsR0FBWixDQUFQO0FBQ0g7QUFDSixLQVBEO0FBUUgsR0FURDtBQVVILEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAgJ2ZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG52YXIgQlVORExFID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2NsaWVudC9kaXN0L2J1bmRsZS5qcycpO1xyXG5leHBvcnQgZGVmYXVsdCAoZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMKSA9PiB7XHJcbiAgICBmcy5yZWFkRmlsZShCVU5ETEUsIFwidXRmOFwiLCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlKEJVTkRMRSxcclxuICAgICAgICAgICAgZGF0YS5yZXBsYWNlKC9fX0dSQVBIUUxfVVJMX18vZywgZ3JhcGhxbFVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fX1dTX1VSTF9fL2csIHdlYnNvY2tldFVSTCksXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgaWYoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyBcclxuICAgIH0pO1xyXG59Il19