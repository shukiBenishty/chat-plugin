"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnStr = exports.sessConnStr = exports.websocketURL = exports.graphqlUrl = void 0;
var sessConnStr = '';
if (process.env.PORT) {
  sessConnStr = "mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin";
} else {
  sessConnStr = "mongodb://localhost/chat-plugin";
}
exports.sessConnStr = sessConnStr;

var dbConnStr = '';
if (process.env.PORT) {
  dbConnStr = "mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin";
} else {
  dbConnStr = "mongodb://localhost/chat-plugin";
}
exports.dbConnStr = dbConnStr;