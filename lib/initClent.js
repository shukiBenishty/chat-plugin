"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gqlRegx = /\/\*__GRAPHQL_URL__\*\/[^]*\/\*__GRAPHQL_URL__\*\//gm;
var wsRegx = /\/\*__WS_URL__\*\/[^]*\/\*__WS_URL__\*\//mg;

var BUNDLE_DIR = _path["default"].resolve(__dirname, '../client/dist/');

var _default = function _default(graphqlUrl, websocketURL) {
  var newGqlUrl = "/*__GRAPHQL_URL__*/ '".concat(graphqlUrl, "' /*__GRAPHQL_URL__*/");
  var newWsUrl = "/*__WS_URL__*/ '".concat(websocketURL, "' /*__WS_URL__*/");

  _fs["default"].readFile(BUNDLE_DIR + "/bundle.js", "utf8", function (err, data) {
    _fs["default"].writeFile(BUNDLE_DIR + "/bundle.js", data.replace(gqlRegx, newGqlUrl).replace(wsRegx, newWsUrl), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0Q2xlbnQuanMiXSwibmFtZXMiOlsiZ3FsUmVneCIsIndzUmVneCIsIkJVTkRMRV9ESVIiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImdyYXBocWxVcmwiLCJ3ZWJzb2NrZXRVUkwiLCJuZXdHcWxVcmwiLCJuZXdXc1VybCIsImZzIiwicmVhZEZpbGUiLCJlcnIiLCJkYXRhIiwid3JpdGVGaWxlIiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sR0FBRyxzREFBaEI7QUFDQSxJQUFNQyxNQUFNLEdBQUcsNENBQWY7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHQyxpQkFBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLGlCQUF4QixDQUFqQjs7ZUFDZSxrQkFBQ0MsVUFBRCxFQUFhQyxZQUFiLEVBQThCO0FBRXpDLE1BQUlDLFNBQVMsa0NBQTJCRixVQUEzQiwwQkFBYjtBQUNBLE1BQUlHLFFBQVEsNkJBQXNCRixZQUF0QixxQkFBWjs7QUFDQUcsaUJBQUdDLFFBQUgsQ0FBWVQsVUFBVSxHQUFHLFlBQXpCLEVBQXVDLE1BQXZDLEVBQStDLFVBQUNVLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQzFESCxtQkFBR0ksU0FBSCxDQUFhWixVQUFVLEdBQUcsWUFBMUIsRUFDSVcsSUFBSSxDQUFDRSxPQUFMLENBQWFmLE9BQWIsRUFBc0JRLFNBQXRCLEVBQ2NPLE9BRGQsQ0FDc0JkLE1BRHRCLEVBQzhCUSxRQUQ5QixDQURKLEVBR0ksVUFBQ0csR0FBRCxFQUFTO0FBQ1QsVUFBR0EsR0FBSCxFQUFRO0FBQ0osZUFBT0ksT0FBTyxDQUFDQyxHQUFSLENBQVlMLEdBQVosQ0FBUDtBQUNIO0FBQ0osS0FQRDtBQVFILEdBVEQ7QUFVSCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgZ3FsUmVneCA9IC9cXC9cXCpfX0dSQVBIUUxfVVJMX19cXCpcXC9bXl0qXFwvXFwqX19HUkFQSFFMX1VSTF9fXFwqXFwvL2dtO1xyXG5jb25zdCB3c1JlZ3ggPSAvXFwvXFwqX19XU19VUkxfX1xcKlxcL1teXSpcXC9cXCpfX1dTX1VSTF9fXFwqXFwvL21nO1xyXG52YXIgQlVORExFX0RJUiA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9jbGllbnQvZGlzdC8nKTtcclxuZXhwb3J0IGRlZmF1bHQgKGdyYXBocWxVcmwsIHdlYnNvY2tldFVSTCkgPT4ge1xyXG5cclxuICAgIGxldCBuZXdHcWxVcmwgPSBgLypfX0dSQVBIUUxfVVJMX18qLyAnJHtncmFwaHFsVXJsfScgLypfX0dSQVBIUUxfVVJMX18qL2A7XHJcbiAgICBsZXQgbmV3V3NVcmwgPSBgLypfX1dTX1VSTF9fKi8gJyR7d2Vic29ja2V0VVJMfScgLypfX1dTX1VSTF9fKi9gO1xyXG4gICAgZnMucmVhZEZpbGUoQlVORExFX0RJUiArIFwiL2J1bmRsZS5qc1wiLCBcInV0ZjhcIiwgKGVyciwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGZzLndyaXRlRmlsZShCVU5ETEVfRElSICsgXCIvYnVuZGxlLmpzXCIsXHJcbiAgICAgICAgICAgIGRhdGEucmVwbGFjZShncWxSZWd4LCBuZXdHcWxVcmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh3c1JlZ3gsIG5ld1dzVXJsKSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfSk7XHJcbn0iXX0=