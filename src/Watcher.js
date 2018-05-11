import Dep, {pushTarget, popTarget} from "./Dep"

let uid = 0

class Watcher {
  constructor (vm, getter) {
    this.id = ++uid
    this.vm = vm
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.getter = getter
    this.value = this.get()
  }
  get () {
    pushTarget(this)
    let value
    let vm = this.vm
    value = this.getter.call(vm, vm)
    popTarget()
    this.cleanupDeps()
    return value
  }
  addDep (dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  update () {
    setTimeout(this.getter, 0)
  }
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
}

export default Watcher