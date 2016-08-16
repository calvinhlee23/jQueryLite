/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);