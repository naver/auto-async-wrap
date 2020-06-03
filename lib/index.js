"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoAsyncWrap;

var _expressAsyncWrap = _interopRequireDefault(require("express-async-wrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoAsyncWrap(route) {
  const stack = route.stack;

  for (const layer of stack) {
    if (layer.route) {
      autoAsyncWrap(layer.route);
    } else {
      if (layer.handle.stack) {
        autoAsyncWrap(layer.handle);
      } else {
        if (layer.handle[Symbol.toStringTag] === 'AsyncFunction') {
          layer.handle = (0, _expressAsyncWrap.default)(layer.handle);
        }
      }
    }
  }
}