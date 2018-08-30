/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(elementsArr) {\n    this.elementsArr = elementsArr;\n  }\n\n  html(arg) {\n    if(typeof arg === 'string') {\n      for (var i = 0; i < this.elementsArr.length; i++) {\n        // debugger\n        this.elementsArr[i].innerHTML = arg;\n      }\n    } else {\n      return this.elementsArr[0].innerHTML;\n    }\n  }\n\n  empty(){\n    // for (var i = 0; i < this.elementsArr.length; i++) {\n    //   this.elementsArr[i].html = \"\";\n    // }\n    this.html(\"\");\n  }\n\n  append(children){\n    if (this.elementsArr.length == 0) return;\n    // debugger\n\n    if(typeof children == 'object' && !(children instanceof DOMNodeCollection)){\n      children = $l(children);\n    }\n\n    if (typeof children === \"string\") {\n      this.elementsArr.forEach((el) => {\n        el.innerHTML += children;\n      });\n    } else if (children instanceof DOMNodeCollection) {\n      this.elementsArr.forEach( (el) => {\n        children.forEach( (childNode) => {\n          el.appendChild(childNode.cloneNode(true));\n        });\n      });\n    }\n  }\n\n  removeClass(classToRemove){\n    this.elementsArr.forEach( el => el.classList.remove(classToRemove));\n  }\n\n  attr(key, val) {\n    if(typeof val === 'string'){\n      this.elementsArr.forEach( el => el.setAttribute(key, val));\n    } else {\n      return this.elementsArr[0].getAttribute(key);\n    }\n  }\n\n  addClass(newClass) {\n    if(typeof newClass === 'function'){\n      this.elementsArr.forEach(el => el.classList.add(newClass()));\n    } else {\n      this.elementsArr.forEach(el => el.classList.add(newClass));\n    }\n  }\n\n  children() {\n    let arr = [];\n    this.elementsArr.forEach( (el) => {\n      const childrenList = el.children;\n      arr = arr.concat(Array.from(childrenList));\n    });\n    return new DOMNodeCollection(arr);\n  }\n\n  parent(){\n    let parentArr = [];\n    this.elementsArr.forEach( (el) => {\n      if(!el.visited) {\n        parentArr.push(el);\n        el.visted = true;\n      }\n    });\n\n    parentArr.forEach( (el) => {\n      el.visited = false;\n    });\n    return new DOMNodeCollection(parentArr);\n  }\n\n  find(selector){\n    let arr = [];\n    this.elementsArr.forEach((el) => {\n      const list = el.querySelectorAll(selector);\n      arr = arr.concat(Array.from(list));\n    });\n    return new DOMNodeCollection(arr);\n  }\n\n  remove() {\n    this.elementsArr.forEach( el => el.parentNode.removeChild(el));\n  }\n\n  on(eventName, cb){\n    this.elementsArr.forEach( (el) => {\n      el.addEventListener(eventName, cb);\n      const key = `jqliteEvents-${eventName}`;\n\n      if(typeof el[key] === \"undefined\"){\n        el[key] = [];\n      }\n      el[key].push(cb);\n    });\n  }\n\n  off(eventName){\n    this.elementsArr.forEach( (el) => {\n      const key = `jqliteEvents-${eventName}`;\n      if(el[key]){\n        el[key].forEach( (cb) => {\n          el.removeEventListener(eventName, cb);\n        });\n      }\n      el[key] = [];\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nwindow.$l = function(arg){\n  // debugger\n  if(typeof arg === 'string') {\n    return new DomNodeCollection(getNodesFromDom(arg));\n  } else if (arg instanceof HTMLElement) {\n    return new DomNodeCollection([arg]);\n  } else if (arg instanceof Function) {\n    document.addEventListener(\"DOMContentLoaded\", function() {\n      alert(\"DOM fully loaded and parsed\");\n      arg();\n    });\n  }\n};\n\nfunction getNodesFromDom(arg){\n  const nodes = document.querySelectorAll(arg);\n  const nodesArr = Array.from(nodes);\n  return nodesArr;\n}\n\n$l.extend = (base, ...objs) => {\n  objs.forEach( (obj) => {\n    for (const prop in obj){\n      base[prop] = obj[prop];\n    }\n  });\n  return base;\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });