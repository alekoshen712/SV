let uid = 0

class Dep {
  constructor () {
    this.id = ++uid
    this.subs = []
  }
  notify () {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
  addSub (watcher) {
    this.subs.push(watcher)
  }
  removeSub (watcher) {
    let idx = this.subs.indexOf(watcher)
    this.subs.splice(idx, 1)
  }
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}
Dep.target = null
var targetStack = [];
export function pushTarget(target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = target
}
export function popTarget () {
  Dep.target = targetStack.pop()
}

export default Dep