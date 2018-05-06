import Observer, {observe} from './Observer'
import Watcher from './Watcher'
import h from "./vdom/h"
import diff from "./vdom/diff"
import patch from "./vdom/patch"
import createElement from "./vdom/createElement"
import Dep from "./Dep";

class SV {
  constructor (options) {
    this.$options = options
    this._watchers = []
    this.init()
    this.mount()
  }

  init () {
    this.initData()
    this.initComputed()
    new Watcher(this, this.update.bind(this))
  }
  initData () {
    let data = this.$data = this.$options.data
    this.proxyData()
    observe(data)
  }
  initComputed () {
    let computed = this.$options.computed
    for (let k in computed) {
      let watch = new Watcher(this, computed[k])
      Object.defineProperty(this, k, {
        configurable: true,
        enumerable: true,
        get () {
          return watch.get()
        }
      })
    }
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

  update () {
    if (this._tree) {
      let newTree = this.$options.render.call(this)
      var patches = diff(this._tree, newTree)
      this._tree = newTree
      this._rootNode = patch(this._rootNode, patches)
    } else {
      this._tree = this.$options.render.call(this)
      this._rootNode = createElement(this._tree)
    }
  }
  mount () {
    let el = document.querySelector(this.$options.el)
    el.appendChild(this._rootNode)
  }
}

// throw new Error()
window.vm1 = new SV({
  el: "#app1",
  data: {
    a: "hello",
    b: "world"
  },
  computed: {
    c () {
      return this.a + this.b
    }
  },
  render () {
    return (
      <div>
        <i>{this.a}</i>
        <div>{this.b}</div>
        <div>{this.c}</div>
      </div>
    )
  }
})