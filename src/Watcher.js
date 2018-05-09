import Dep, {pushTarget, popTarget} from "./Dep"

class Watcher {
  constructor (vm, fn, immediate = true) {
    this.value = null
    this.vm = vm
    this.getter = fn
    this.value = this.get()
  }
  notify () {
    setTimeout(this.fn, 0)
  }
  addDep (dep) {
    dep.addSub(this)
  }
  get () {
    let value
    let vm = this.vm
    pushTarget(this)
    value = this.getter.call(vm, vm)
    popTarget()
    return value
  }
  update () {
    setTimeout(this.getter, 0)
  }
}

export default Watcher