import VNode from "./vnode/vnode"
import VText from "./vnode/vtext"
import { isChild } from "./vnode/until"

function h(tagName, propertis, ...childrens) {
  let childNodes = []
  childrens.forEach(children => {
    if (typeof children === "string" || typeof children === "number") {
      childNodes.push(new VText(children))
    } else if (isChild(children)){
      childNodes.push(children)
    }
  })
  return new VNode(tagName, propertis, childNodes)
}

export default h