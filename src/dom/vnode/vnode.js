export default class Vnode {
  constructor (tagName, properties, children) {
    this.tagName = tagName
    this.properties = properties
    this.children = children
  }
}