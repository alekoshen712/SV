import { ChangeType} from "./types"
import createElement from "./createElement"
import { isVText, isVNode } from "../utils";

function patch(parent, command, idx = 0, vm) {
  if (!command) return;
  const el = parent.childNodes[idx];
  switch (command.type) {
    case ChangeType.create: {
      const { node } = command;
      const newEl = createElement(node, vm);
      if (idx === parent.childNodes.length)
        parent.appendChild(newEl);
      else parent.insertBefore(newEl, el);
      break;
    }
    case ChangeType.remove: {
      if (!el) return;
      parent.removeChild(el);
      break;
    }
    case ChangeType.replace: {
      const { node } = command;
      if (isVText(node)) {
        parent.parentNode.innerText = node.text;
      }
      if (isVNode(node)) {
        const newEl = createElement(node);
        parent.replaceChild(newEl, el);
      }
      break;
    }
    case ChangeType.update: {
      const { children } = command
      children.forEach((child, index) => {
        // console.log(index)
        let el =  parent.childNodes[index]
        patch(el, child, index, vm)
      })
      break;
    }
  }
  return parent
}

export default patch