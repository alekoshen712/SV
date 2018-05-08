import {isVText, isVNode, setAttributes} from "./vnode/until";

function createElement(vnode, vm) {

  if (isVText(vnode)) return document.createTextNode(vnode.text)
  if (!isVNode(vnode)) throw new Error("Not a valid virtual dom node")

  let node = document.createElement(vnode.tagName)
  let children = vnode.children

  for (var i = 0; i < children.length; i++) {
    var childNode = createElement(children[i])
    if (childNode) {
      node.appendChild(childNode)
    }
  }
  setAttributes(node, vnode.properties, vm)
  return node
}

export default createElement