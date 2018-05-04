import Observer from './Observer'
import h from "./vdom/h"
import diff from "./vdom/diff"
import patch from "./vdom/patch"
import createElement from "./vdom/createElement"

class SV {
  constructor (options) {
    this.$options = options
    this.init()
    this.mount()
  }

  init () {
    this.initData()
    this.initVDom()
  }
  initEvent () {

  }
  initData () {
    let data = this.$data = this.$options.data
    this.proxyData()
    this.observer = new Observer(data, this)
  }
  initVDom () {
    this._tree = this.$options.render.call(this)
    console.log(this._tree);
    this._rootNode = createElement(this._tree)
    console.log(this._rootNode)
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

  reRender () {
    var newTree = this.$options.render.call(this)
    var patches = diff(this._tree, newTree)
    this._rootNode = patch(this._rootNode, patches)
    this._tree = newTree
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
    b: "world",
    obj: {
      hahah: "6666"
    }
  },
  render () {
    return (
      <div ev-d="444">
        <i onClick={() => {console.log(1)}}>{this.a}</i>
        <div>{this.b}</div>
        <div>{this.obj.hahah}</div>
      </div>
    )
  }
})


