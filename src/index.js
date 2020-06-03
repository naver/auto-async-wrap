import wrap from 'express-async-wrap'

export default function autoAsyncWrap(route) {
  const stack = route.stack
  for (const layer of stack) {
    if (layer.route) {
      autoAsyncWrap(layer.route)
    } else {
      if (layer.handle.stack) {
        autoAsyncWrap(layer.handle)
      } else {
        if (layer.handle[Symbol.toStringTag] === 'AsyncFunction') {
          layer.handle = wrap(layer.handle)
        }
      }
    }
  }
}
