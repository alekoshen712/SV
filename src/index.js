import Observer, {observe} from './Observer'
import Watcher from './Watcher'
import h from "./dom/h"
import diff from "./dom/diff"
import patch from "./dom/patch"
import createElement from "./dom/createElement"
import Dep from "./Dep";

class SV {
  constructor (options) {
    this.$options = options
    this.$methods = options.methods
    this.init()
    this.mount()
  }

  init () {
    this.initData()
    this.initComputed()
    this.initMethods()
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
      let watch = new Watcher(this, computed[k], false)
      Object.defineProperty(this, k, {
        configurable: true,
        enumerable: true,
        get () {
          return watch.get()
        }
      })
    }
  }
  initMethods () {
    for (let k in this.$methods) {
      this[k] = this.$methods[k].bind(this)
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
      // var patches = diff(this._tree, newTree)
      // this._tree = newTree
      // this._rootNode = patch(this._rootNode, patches)
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
  methods: {
    handleClick (e) {
      console.log("handleClick")
    },
    consoleC (e) {
      e.stopPropagation()
      console.log(this.c)
    }
  },
  render () {
    return (
      <div onClick={this.handleClick}>
        <i>{this.a}</i>
        <div>{this.b}</div>
        <div onClick={this.consoleC}>{this.c}</div>
      </div>
    )
  }
})