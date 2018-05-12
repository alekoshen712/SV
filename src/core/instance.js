import { noop, isFunction } from "../utils"
import {observe} from "./Observer"
import Watcher from "./Watcher"
import Dep from "./Dep";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}
const computedWatcherOptions = { lazy: true }
// Data
function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function proxyData (vm, data) {
  const keys = Object.keys(data)
  keys.forEach(key => {
    proxy(vm, "$data", key)
  })
}

export function initData(vm, data) {
  if (isFunction(data)) data = data()
  vm.$data = data
  observe(data)
  proxyData(vm, data)
}

// Computed
function proxyComputed(vm, key) {
  sharedPropertyDefinition.get = function () {
    const watcher = this._computedWatchers[key]
    if (Dep.target) {
      watcher.depend()
    }
    return watcher.get()
  }
  Object.defineProperty(vm, key, sharedPropertyDefinition)
}

export function initComputed(vm, computed) {
  const watchers = vm._computedWatchers = Object.create(null)
  for (let key in computed) {
    let getter = computed[key]
    watchers[key] = new Watcher(vm, getter, noop)
    proxyComputed(vm, key)
  }
}

// Methods
export function initMethods (vm, methods) {
  for (let key in methods) {
    vm[key] = methods[key].bind(vm)
  }
}