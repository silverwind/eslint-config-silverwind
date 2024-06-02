const browserGlobals = ["addEventListener", "blur", "close", "closed", "confirm", "defaultStatus", "defaultstatus", "error", "event", "external", "find", "focus", "frameElement", "frames", "history", "innerHeight", "innerWidth", "isFinite", "isNaN", "length", "locationbar", "menubar", "moveBy", "moveTo", "name", "onblur", "onerror", "onfocus", "onload", "onresize", "onunload", "open", "opener", "opera", "outerHeight", "outerWidth", "pageXOffset", "pageYOffset", "parent", "print", "removeEventListener", "resizeBy", "resizeTo", "screen", "screenLeft", "screenTop", "screenX", "screenY", "scroll", "scrollbars", "scrollBy", "scrollTo", "scrollX", "scrollY", "status", "statusbar", "stop", "toolbar", "top"];
const nodeGlobals = ["__dirname", "__filename"];

export const restrictedWorkerGlobals = [...browserGlobals, ...nodeGlobals, "window"];
export const restrictedGlobals = [...browserGlobals, ...nodeGlobals, "self"];
