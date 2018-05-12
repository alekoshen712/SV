import VText from "./dom/vnode/vtext"
import VNode from "./dom/vnode/vnode"
import { EventType, EventMap } from "./dom/types"

export function isFunction(obj) {
  return typeof obj === 'function'
}

export function warn(msg, vm) {
  console.error(`[Vueact warn]: ${msg}`)
}

export function noop() {}

export function isChild(x) {
  return isVNode(x) || isVText(x)
}

export function isVNode(x) {
  return x instanceof VNode
}

export function isVText(x) {
  return x instanceof VText
}

function setAttribute(node, attrName, attrValue, vm) {
  if (attrName === "className") attrName = "class"
  if (EventType.includes(attrName))
    return node.addEventListener(
      EventMap[attrName],
      attrValue.bind(vm)
    )
  node.setAttribute(attrName, attrValue)
}

export function setAttributes(node, attributes, vm) {
  if (attributes === null) attributes = {}
  Object.keys(attributes)
    .forEach(attrName => setAttribute(node, attrName, attributes[attrName], vm))
}
