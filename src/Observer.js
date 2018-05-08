import Dep from "./Dep"

function defineReactive(obj, key) {
  var dep = new Dep()
  var val = obj[key]
  obj[key + "_dep_"] = dep
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get () {
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set (newVal) {
      val = newVal
      dep.notify()
    }
  })
}

class Observer {
  constructor (value) {
    this.walk(value)
  }
  walk (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          this.walk(obj[key])
        } else {
          defineReactive(obj, key)
        }
      }
    }
  }
}


export function observe(value) {
  return new Observer(value);
}
export default Observer
