"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dbConnStr = exports.sessConnStr = exports.websocketURL = exports.graphqlUrl = void 0;
var graphqlUrl = 'https://chat-plugin.herokuapp.com/chat/graphql';
exports.graphqlUrl = graphqlUrl;
var websocketURL = 'wss://chat-plugin.herokuapp.com/graphql';
exports.websocketURL = websocketURL;
var sessConnStr = "mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin";
exports.sessConnStr = sessConnStr;
var dbConnStr = "mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin";
exports.dbConnStr = dbConnStr;
var _default = {
  setGraphqlUrl: function setGraphqlUrl(url) {
    exports.graphqlUrl = graphqlUrl = url;
  },
  setWebsocketURL: function setWebsocketURL(url) {
    exports.websocketURL = websocketURL = url;
  },
  setSessConnStr: function setSessConnStr(url) {
    exports.sessConnStr = sessConnStr = url;
  },
  setDbConnStr: function setDbConnStr() {
    exports.dbConnStr = dbConnStr = url;
  }
};
exports["default"] = _default;