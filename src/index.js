import Watcher from './core/Watcher'
import diff from "./dom/diff"
import patch from "./dom/patch"
import createElement from "./dom/createElement"
import h from "./dom/h"
import {noop} from "./utils"
import {initData, initComputed, initMethods} from "./core/instance"

class Vueact {
  static _h (...args) {
    return h(...args)
  }
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

export default Vueact

