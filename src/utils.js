export function isFunction(obj) {
  return typeof obj === 'function'
}

export function warn(msg, vm) {
  console.error(`[Vueact warn]: ${msg}`)
}

export function noop() {}

