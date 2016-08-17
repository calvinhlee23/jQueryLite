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

	window.$l  = function (arg) {
	  if (arg instanceof(HTMLElement) || typeof(arg) === 'function') {
	    var arr = [arg];
	    return new DOMNodeCollection(arr);
	  } else {
	    var elementList = document.querySelectorAll(arg);
	    arr = Array.from(elementList);
	  }

	  return new DOMNodeCollection(arr);
	};

	$l.extend = function (base, ...otherObjects) {
	  Object.keys(base).forEach( (key) => {
	    for (var i = 0; i < otherObjects.length; i++) {
	      if (otherObjects[i][key] !== undefined) {
	        base[key] = otherObjects[i][key];
	      }
	    }
	  });
	  return base;
	};

	$l.ajax = function (option) {
	  console.log('beginning');
	  const xhr = new XMLHttpRequest();
	  const default1 = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    url: '',
	    dataType: '',
	    data: null,
	    method: 'GET',
	    success: () => {},
	    error: () => {},

	  };

	  if (typeof(option) === 'object') {

	    option = this.extend(default1, option);

	    xhr.open(option.method, option.url, true);

	    xhr.onload = function () {
	      if (xhr.status === 200) {
	        option.success(xhr.response);
	      } else {
	        option.error(xhr.response);
	      }
	    };
	      xhr.send(JSON.stringify(option.data));
	    } else {

	    return;
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection (nodes) {
	  this.functions = [];

	  if (typeof(nodes[0]) === 'function') {
	    this.functions = this.functions.concat(nodes);
	  } else {
	    this.htmlElements = nodes;
	  }

	  this.ready(this.functions);
	}

	DOMNodeCollection.prototype.ready = function (fns) {
	  var interval = window.setInterval( function () {
	    if (document.readyState === "complete") {
	      fns.forEach( fn => { fn(); } );
	      window.clearInterval(interval);
	    }
	  },
	    500
	  );
	};

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