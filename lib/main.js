const DOMNodeCollection = require('./dom_node_collection');

Window.prototype.$l  = function (arg) {

  if (arg instanceof(HTMLElement)) {
    var arr = [arg];
    return new DOMNodeCollection(arr);
  } else {
    var elementList = document.querySelectorAll(arg);
    arr = Array.from(elementList);
  }

  return new DOMNodeCollection(arr);
};
