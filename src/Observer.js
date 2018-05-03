import Dep from "./Dep"
import Watcher from "./Watcher";

class Observer {
  constructor (value) {
    this.walk(value)
    this.dep = new Dep()

  }
  walk (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let ob = this
        let val = obj[key]
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: false,
          get () {
            if (Dep.target) ob.dep.addSub(Dep.target)
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