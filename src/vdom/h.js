import h from "virtual-dom/h"
export default (selector, properties, ...children) => {
  console.log(selector, properties)
  return h(selector, properties, children)
}