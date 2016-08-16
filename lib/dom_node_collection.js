function DOMNodeCollection (htmlElements) {
  this.htmlElements = htmlElements;
}

DOMNodeCollection.prototype.on = function (option, callback) {
  this.each(element => {
    console.log('on');
    element.addEventListener(option, callback, false);
  });
};

DOMNodeCollection.prototype.off = function (option, callback) {
  this.each(element => {
    console.log('off');
    element.removeEventListener(option, callback, false);
  });
};
DOMNodeCollection.prototype.html = function (arg) {
  if (typeof arg === 'string') {
    this.each( element => {element.innerHTML = arg;});
  } else {
    return this.htmlElements[0].innerHTML;
  }
};

DOMNodeCollection.prototype.each = function (arg) {
  this.htmlElements.forEach(arg);
};

DOMNodeCollection.prototype.empty = function () {
  this.html('');
};

DOMNodeCollection.prototype.append = function (children) {
  if (typeof children === 'string') {
    this.each( element => {element.innerHTML += children;} );
  } else if (children[0] instanceof HTMLElement) {
    const node = this.htmlElements[0];
    node.appendChild(children[0]);
  }
};

DOMNodeCollection.prototype.children = function () {
  var arr = [];
  this.each( element => { arr.push(element.children); } );
  return new DOMNodeCollection(arr);
};

DOMNodeCollection.prototype.parent = function () {
  var arr = [];
  this.each( element => { arr.push(element.parent); });
  return new DOMNodeCollection(arr);
};

DOMNodeCollection.prototype.find = function (arg) {
  var arr = [];
  this.each( element => {
    arr = arr.concat(Array.from(element.querySelectorAll(arg)));
  });
  return new DOMNodeCollection(arr);
};

DOMNodeCollection.prototype.remove = function () {
  this.each( element => {
    this.html('');
    this.HTMLElements = [];
    console.log('this got called');
  });
};

module.exports = DOMNodeCollection;
