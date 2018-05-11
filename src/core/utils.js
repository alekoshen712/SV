export function createElement(tagName) {
  return document.createElement(tagName)
}

export function isFunction(obj) {
  return typeof obj === 'function'
}

export function warn(msg, vm) {
  console.error(`[SV warn]: ${msg}`)
}

export function noop() {}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

