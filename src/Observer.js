import Dep from "./Dep"
import Watcher from "./Watcher";

class Observer {
  constructor (value, vm) {
    this.walk(value)
    this.vm = vm
    this.dep = new Dep()
    this.watcher = new Watcher(() => vm.reRender())
  }
  walk (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') return this.walk(obj[key])
        let ob = this
        let val = obj[key]
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: false,
          get () {
            ob.dep.addSub(ob.watcher)
            return val
          },
          set (newVal) {
            ob.dep.notify()
            val = newVal
          }
        })
      }
    }
  }
}

export default Observer