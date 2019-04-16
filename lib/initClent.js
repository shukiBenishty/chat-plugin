"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var gqlRegx = /\/\*__GRAPHQL_URL__\*\/[^]*\/\*__GRAPHQL_URL__\*\//gm;
var wsRegx = /\/\*__WS_URL__\*\/[^]*\/\*__WS_URL__\*\//mg;

var BUNDLE_DIR = _path["default"].resolve(__dirname, '../client/dist/');

var _default = function _default(graphqlUrl, websocketURL) {// let newGqlUrl = `/*__GRAPHQL_URL__*/ '${graphqlUrl}' /*__GRAPHQL_URL__*/`;
  // let newWsUrl = `/*__WS_URL__*/ '${websocketURL}' /*__WS_URL__*/`;
  // fs.readFile(BUNDLE_DIR + "/bundle.js", "utf8", (err, data) => {
  //     fs.writeFile(BUNDLE_DIR + "/bundle.js",
  //         data.replace(gqlRegx, newGqlUrl)
  //                      .replace(wsRegx, newWsUrl),
  //         (err) => {
  //         if(err) {
  //             return console.log(err);
  //         }
  //     }); 
  // });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0Q2xlbnQuanMiXSwibmFtZXMiOlsiZ3FsUmVneCIsIndzUmVneCIsIkJVTkRMRV9ESVIiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImdyYXBocWxVcmwiLCJ3ZWJzb2NrZXRVUkwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQU1BLE9BQU8sR0FBRyxzREFBaEI7QUFDQSxJQUFNQyxNQUFNLEdBQUcsNENBQWY7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHQyxpQkFBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLGlCQUF4QixDQUFqQjs7ZUFDZSxrQkFBQ0MsVUFBRCxFQUFhQyxZQUFiLEVBQThCLENBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAgJ2ZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCBncWxSZWd4ID0gL1xcL1xcKl9fR1JBUEhRTF9VUkxfX1xcKlxcL1teXSpcXC9cXCpfX0dSQVBIUUxfVVJMX19cXCpcXC8vZ207XHJcbmNvbnN0IHdzUmVneCA9IC9cXC9cXCpfX1dTX1VSTF9fXFwqXFwvW15dKlxcL1xcKl9fV1NfVVJMX19cXCpcXC8vbWc7XHJcbnZhciBCVU5ETEVfRElSID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL2NsaWVudC9kaXN0LycpO1xyXG5leHBvcnQgZGVmYXVsdCAoZ3JhcGhxbFVybCwgd2Vic29ja2V0VVJMKSA9PiB7XHJcblxyXG4gICAgLy8gbGV0IG5ld0dxbFVybCA9IGAvKl9fR1JBUEhRTF9VUkxfXyovICcke2dyYXBocWxVcmx9JyAvKl9fR1JBUEhRTF9VUkxfXyovYDtcclxuICAgIC8vIGxldCBuZXdXc1VybCA9IGAvKl9fV1NfVVJMX18qLyAnJHt3ZWJzb2NrZXRVUkx9JyAvKl9fV1NfVVJMX18qL2A7XHJcbiAgICAvLyBmcy5yZWFkRmlsZShCVU5ETEVfRElSICsgXCIvYnVuZGxlLmpzXCIsIFwidXRmOFwiLCAoZXJyLCBkYXRhKSA9PiB7XHJcbiAgICAvLyAgICAgZnMud3JpdGVGaWxlKEJVTkRMRV9ESVIgKyBcIi9idW5kbGUuanNcIixcclxuICAgIC8vICAgICAgICAgZGF0YS5yZXBsYWNlKGdxbFJlZ3gsIG5ld0dxbFVybClcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHdzUmVneCwgbmV3V3NVcmwpLFxyXG4gICAgLy8gICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmKGVycikge1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTsgXHJcbiAgICAvLyB9KTtcclxufSJdfQ==