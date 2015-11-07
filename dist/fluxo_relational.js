/*! fluxo_relational v0.0.1 | (c) 2015 Samuel Simões | https://github.com/fluxo-js/fluxo-relational */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined));
	else if(typeof define === 'function' && define.amd)
		define(["fluxo"], factory);
	else if(typeof exports === 'object')
		exports["Fluxo"] = factory(require("fluxo-js"));
	else
		root["Fluxo"] = factory(root["Fluxo"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Fluxo = __webpack_require__(1),
    Relational = {
  HasOne: __webpack_require__(2),
  HasMany: __webpack_require__(5)
};

Relational.ObjectStore = Fluxo.ObjectStore.create({
  setup: function setup() {
    this.relations = Fluxo.extend({}, this.relations);
    this.parseRelations();
    Fluxo.ObjectStore.setup.apply(this, arguments);
  },

  parseRelations: function parseRelations() {
    for (var relationKey in this.relations) {
      var relation = this.relations[relationKey];

      this.relations[relationKey] = new relation.type(_extends({ key: relationKey, store: this }, relation));
    }
  },

  setAttribute: function setAttribute(attribute, value, options) {
    var relation = this.relations[attribute];

    if (relation) {
      value = relation.parse(value);
    }

    return Fluxo.ObjectStore.setAttribute.call(this, attribute, value, options);
  },

  toJSON: function toJSON() {
    var json = Fluxo.ObjectStore.toJSON.call(this);

    for (var attributeName in json) {
      var value = json[attributeName];

      if (typeof value.toJSON === "function") {
        json[attributeName] = value.toJSON();
      }
    }

    return json;
  }
});

module.exports = _extends({}, Fluxo, { Relational: Relational });

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _baseJs = __webpack_require__(3);

var _baseJs2 = _interopRequireDefault(_baseJs);

var _fluxoJs = __webpack_require__(1);

var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

var HasOne = (function (_Base) {
  _inherits(HasOne, _Base);

  function HasOne() {
    _classCallCheck(this, HasOne);

    _get(Object.getPrototypeOf(HasOne.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(HasOne, [{
    key: "createStore",
    value: function createStore(value) {
      return _fluxoJs2["default"].ObjectStore.create(this.storeObject || {}, { data: value });
    }
  }, {
    key: "update",
    value: function update(value) {
      this.currentValue.set(value);
    }
  }]);

  return HasOne;
})(_baseJs2["default"]);

exports["default"] = HasOne;
module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _is_objectJs = __webpack_require__(4);

var _is_objectJs2 = _interopRequireDefault(_is_objectJs);

var _fluxoJs = __webpack_require__(1);

var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

var _default = (function () {
  function _default(options) {
    _classCallCheck(this, _default);

    _fluxoJs2["default"].extend(this, options);
  }

  _createClass(_default, [{
    key: "parse",
    value: function parse(newValue) {
      if (!(0, _is_objectJs2["default"])(newValue) && newValue !== []) {
        this.cancelListening();
        this.currentValue = newValue;
      } else if (this.currentValue && !newValue._fluxo) {
        this.update(newValue);
      } else if (newValue._fluxo) {
        this.currentValue = newValue;
        this.setupListening();
      } else {
        this.currentValue = this.createStore(newValue);
        this.setupListening();
      }

      return this.currentValue;
    }
  }, {
    key: "cancelListening",
    value: function cancelListening() {
      if (!this.changeEventCanceler) {
        return;
      }
      this.changeEventCanceler.call();
      delete this.changeEventCanceler;
    }
  }, {
    key: "setupListening",
    value: function setupListening() {
      this.cancelListening();

      var onStoreEvent = function onStoreEvent(eventName) {
        var args = Array.prototype.slice.call(arguments, 1);

        args.unshift(this.key + ":" + eventName);

        this.store.triggerEvent.apply(this.store, args);
      };

      this.changeEventCanceler = this.currentValue.on(["*"], onStoreEvent.bind(this));
    }
  }]);

  return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (obj) {
  var type = typeof obj;
  return type === "function" || type === "object" && !!obj;
};

;
module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _baseJs = __webpack_require__(3);

var _baseJs2 = _interopRequireDefault(_baseJs);

var _fluxoJs = __webpack_require__(1);

var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

var HasMany = (function (_Base) {
  _inherits(HasMany, _Base);

  function HasMany() {
    _classCallCheck(this, HasMany);

    _get(Object.getPrototypeOf(HasMany.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(HasMany, [{
    key: "createStore",
    value: function createStore(value) {
      var storeObject;

      if (this.collectionObject) {
        storeObject = this.collectionObject;
      } else {
        storeObject = { store: this.storeObject || {} };
      }

      return _fluxoJs2["default"].CollectionStore.create(storeObject, { stores: value });
    }
  }, {
    key: "update",
    value: function update(value) {
      this.currentValue.setStores(value);
    }
  }]);

  return HasMany;
})(_baseJs2["default"]);

exports["default"] = HasMany;
module.exports = exports["default"];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fluxo_relational.map