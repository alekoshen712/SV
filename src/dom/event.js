const EventType = [
  // mouse events
  "onClick", "onMouseLeave", "onMouseMove", "onMouseOut","onMouseOver",
  // force events
  "onFocus", "onBlur",
  // keyboard events
  "onKeyDown", "onKeyPress", "onKeyUp",
  // form events
  "onChange", "onInput", "onSubmit",
];

const EventMap = EventType.reduce((eventsMap, event) => {
  eventsMap[event] = event.replace('on', '').replace(/[A-Z]/g, e => e.toLowerCase());
  return eventsMap;
}, {});

export {
  EventType,
  EventMap
}