import Dep from "./Dep"
class Watcher {
  constructor (fn) {
    Dep.target = this;

    this.fn = fn
    fn()
    // this.notify()
    Dep.target = null
  }
  notify () {
    console.log("render")
    setTimeout(this.fn, 0)
  }
}

export default Watcher