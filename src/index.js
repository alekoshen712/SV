import Watcher from './Watcher'
import h from "./dom/h"
import diff from "./dom/diff"
import patch from "./dom/patch"
import createElement from "./dom/createElement"

import {noop} from "./core/utils";
import {initData, initComputed, initMethods} from "./core/init"

class SV {
  constructor (options) {
    this.$options = options
    initData(this, options.data)
    initComputed(this, options.computed)
    initMethods(this, options.methods)
    this.mount()
  }

  update () {
    if (this._tree) {
      let newTree = this.$options.render.call(this)
      let patches = diff(newTree, this._tree)
      this._tree = newTree
      this._rootNode = patch(this._rootNode, patches)
    } else {
      this._tree = this.$options.render.call(this)
      this._rootNode = createElement(this._tree)
    }
  }
  mount () {
    new Watcher(this, this.update.bind(this), noop, null, true)
    let el = document.querySelector(this.$options.el)
    el.appendChild(this._rootNode)
  }
}

// throw new Error()
window.vm1 = new SV({
  el: "#app1",
  data: {
    a: 10,
    b: 10
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
      this.a = Math.floor(Math.random() * 20)
    }
  },
  render () {
    return (
      <div onClick={this.handleClick}>
        {/*<i className="font-red">{this.a}</i>*/}
        {/*<div>{this.b}</div>*/}
        <div onClick={this.consoleC}>{this.c}</div>
      </div>
    )
  }
})

console.log(vm1)