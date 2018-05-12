// import diff from "virtual-dom/diff"
import { ChangeType } from "./types"
import {isVNode, isVText} from "../utils";
class PatchCommand {
  constructor (command) {
    this.type = command.type
    this.node = command.node || null
    this.children = command.children || []
    this.attributes = command.attributes || {}
  }
}

function createPC(command) {
  return new PatchCommand(command)
}

function isChanged(newNode, oldNode) {
  if (isVNode(newNode) && isVNode(oldNode)) return newNode.tagName !== oldNode.tagName
  if (isVText(newNode) && isVText(oldNode)) return newNode.text !== oldNode.text
  return false
}
function diffChildren(newNode, oldNode) {
  const newChild = newNode.children || []
  const oldChild = oldNode.children || []
  let commands = []
  for (let i = 0; i < Math.max(newChild.length, oldChild.length); i++) {
    let command = _diff(newChild[i], oldChild[i])
    commands.push(command)
  }

  let isUpdate = commands.some(command => command.type !== ChangeType.keep)

  return isUpdate ? createPC({
    type: ChangeType.update,
    children: commands
  }) : createPC({
    type: ChangeType.keep
  })
}

function _diff(newNode, oldNode) {
  if (!oldNode) return createPC({ tpye: ChangeType.create, node: newNode })
  else if (!newNode) return createPC({ type: ChangeType.remove })
  else if (isChanged(newNode, oldNode)) return createPC({type: ChangeType.replace, node: newNode })
  else if (isVNode(newNode) && isVNode(oldNode)) {
    return diffChildren(newNode, oldNode)
  } else {
    return  createPC({type: ChangeType.keep})
  }
}

export default _diff