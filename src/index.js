import Observer from './Observer'
import Watcher from "./Watcher";
class SV {
  constructor (options) {
    this.$options = options
    this.init()
    // this.render()
  }

  init () {
    this.initData()
    this.render()
  }

  initData () {
    let data = this.$data = this.$options.data
    this.proxyData()
    this.observer = new Observer(data)
  }

  proxyData () {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get () {
          return this.$data[key]
        },
        set (val) {
          this.$data[key] = val
        }
      })
    })
  }

  render () {
    new Watcher(() => {
      // (this.a);
      document.querySelector("#app").innerHTML = this.a
    })
  }
}



let vm = new SV({
  data: {
    a: 123
  }
})
window.vm = vm




