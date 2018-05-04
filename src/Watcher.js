import Dep from "./Dep"

class Watcher {
  constructor (fn) {
    this.fn = fn
  }
  notify () {
    setTimeout(this.fn, 0)
  }
}

export default Watcher