"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BUNDLE_DIR = _path["default"].resolve(__dirname, '../client/dist/');

var _default = function _default(graphqlUrl, websocketURL) {
  _fs["default"].readFile(BUNDLE_DIR + "/bundle_src.js", "utf8", function (err, data) {
    _fs["default"].writeFile(BUNDLE_DIR + "/bundle.js", data.replace(/__GRAPHQL_URL__/g, graphqlUrl).replace(/__WS_URL__/g, websocketURL), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0Q2xlbnQuanMiXSwibmFtZXMiOlsiQlVORExFX0RJUiIsInBhdGgiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiZ3JhcGhxbFVybCIsIndlYnNvY2tldFVSTCIsImZzIiwicmVhZEZpbGUiLCJlcnIiLCJkYXRhIiwid3JpdGVGaWxlIiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQUlBLFVBQVUsR0FBR0MsaUJBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixpQkFBeEIsQ0FBakI7O2VBQ2Usa0JBQUNDLFVBQUQsRUFBYUMsWUFBYixFQUE4QjtBQUN6Q0MsaUJBQUdDLFFBQUgsQ0FBWVAsVUFBVSxHQUFHLGdCQUF6QixFQUEyQyxNQUEzQyxFQUFtRCxVQUFDUSxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUM5REgsbUJBQUdJLFNBQUgsQ0FBYVYsVUFBVSxHQUFHLFlBQTFCLEVBQ0lTLElBQUksQ0FBQ0UsT0FBTCxDQUFhLGtCQUFiLEVBQWlDUCxVQUFqQyxFQUNjTyxPQURkLENBQ3NCLGFBRHRCLEVBQ3FDTixZQURyQyxDQURKLEVBR0ksVUFBQ0csR0FBRCxFQUFTO0FBQ1QsVUFBR0EsR0FBSCxFQUFRO0FBQ0osZUFBT0ksT0FBTyxDQUFDQyxHQUFSLENBQVlMLEdBQVosQ0FBUDtBQUNIO0FBQ0osS0FQRDtBQVFILEdBVEQ7QUFVSCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxudmFyIEJVTkRMRV9ESVIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50L2Rpc3QvJyk7XHJcbmV4cG9ydCBkZWZhdWx0IChncmFwaHFsVXJsLCB3ZWJzb2NrZXRVUkwpID0+IHtcclxuICAgIGZzLnJlYWRGaWxlKEJVTkRMRV9ESVIgKyBcIi9idW5kbGVfc3JjLmpzXCIsIFwidXRmOFwiLCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlKEJVTkRMRV9ESVIgKyBcIi9idW5kbGUuanNcIixcclxuICAgICAgICAgICAgZGF0YS5yZXBsYWNlKC9fX0dSQVBIUUxfVVJMX18vZywgZ3JhcGhxbFVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fX1dTX1VSTF9fL2csIHdlYnNvY2tldFVSTCksXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgaWYoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyBcclxuICAgIH0pO1xyXG59Il19