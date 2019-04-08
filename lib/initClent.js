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
  _fs["default"].readFile(BUNDLE_DIR + "/bundle.js", "utf8", function (err, data) {
    _fs["default"].writeFile(BUNDLE_DIR + "/bundle.js", data.replace('http://localhost:4000/chat/graphql', graphqlUrl).replace("ws://localhost:4000/graphql", websocketURL), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0Q2xlbnQuanMiXSwibmFtZXMiOlsiQlVORExFX0RJUiIsInBhdGgiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiZ3JhcGhxbFVybCIsIndlYnNvY2tldFVSTCIsImZzIiwicmVhZEZpbGUiLCJlcnIiLCJkYXRhIiwid3JpdGVGaWxlIiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQUlBLFVBQVUsR0FBR0MsaUJBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixpQkFBeEIsQ0FBakI7O2VBQ2Usa0JBQUNDLFVBQUQsRUFBYUMsWUFBYixFQUE4QjtBQUN6Q0MsaUJBQUdDLFFBQUgsQ0FBWVAsVUFBVSxHQUFHLFlBQXpCLEVBQXVDLE1BQXZDLEVBQStDLFVBQUNRLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQzFESCxtQkFBR0ksU0FBSCxDQUFhVixVQUFVLEdBQUcsWUFBMUIsRUFDSVMsSUFBSSxDQUFDRSxPQUFMLENBQWEsb0NBQWIsRUFBbURQLFVBQW5ELEVBQ2NPLE9BRGQsQ0FDc0IsNkJBRHRCLEVBQ3FETixZQURyRCxDQURKLEVBR0ksVUFBQ0csR0FBRCxFQUFTO0FBQ1QsVUFBR0EsR0FBSCxFQUFRO0FBQ0osZUFBT0ksT0FBTyxDQUFDQyxHQUFSLENBQVlMLEdBQVosQ0FBUDtBQUNIO0FBQ0osS0FQRDtBQVFILEdBVEQ7QUFVSCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxudmFyIEJVTkRMRV9ESVIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50L2Rpc3QvJyk7XHJcbmV4cG9ydCBkZWZhdWx0IChncmFwaHFsVXJsLCB3ZWJzb2NrZXRVUkwpID0+IHtcclxuICAgIGZzLnJlYWRGaWxlKEJVTkRMRV9ESVIgKyBcIi9idW5kbGUuanNcIiwgXCJ1dGY4XCIsIChlcnIsIGRhdGEpID0+IHtcclxuICAgICAgICBmcy53cml0ZUZpbGUoQlVORExFX0RJUiArIFwiL2J1bmRsZS5qc1wiLFxyXG4gICAgICAgICAgICBkYXRhLnJlcGxhY2UoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9jaGF0L2dyYXBocWwnLCBncmFwaHFsVXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ3czovL2xvY2FsaG9zdDo0MDAwL2dyYXBocWxcIiwgd2Vic29ja2V0VVJMKSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfSk7XHJcbn0iXX0=