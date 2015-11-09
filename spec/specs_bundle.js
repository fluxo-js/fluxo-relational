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

	"use strict";

	__webpack_require__(1);
	__webpack_require__(9);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Fluxo = __webpack_require__(2);

	var Post = (function (_Fluxo$Relational$ObjectStore) {
	  _inherits(Post, _Fluxo$Relational$ObjectStore);

	  function Post() {
	    _classCallCheck(this, Post);

	    _get(Object.getPrototypeOf(Post.prototype), "constructor", this).apply(this, arguments);
	  }

	  return Post;
	})(Fluxo.Relational.ObjectStore);

	Post.relations = {
	  comments: {
	    type: Fluxo.Relational.HasMany
	  }
	};

	describe("Fluxo.Relation.HasMany", function () {
	  it("instantiate collection store on construction", function () {
	    var post = new Post({ content: "The post", comments: [{ name: "Foo" }] });

	    expect(post.toJSON().comments.stores[0].name).to.be.eql("Foo");

	    expect(post.data.content).to.be.eql("The post");
	  });

	  it("bubble events", function () {
	    var post = new Post({ content: "The post", comments: [] });

	    var onChangeCallback = chai.spy();

	    post.on(["comments:add"], onChangeCallback);

	    post.data.comments.addStore({ content: "The post" });

	    expect(onChangeCallback).to.have.been.called.once();
	  });

	  it("generates the correct JSON", function () {
	    var post = new Post({ content: "The post", comments: [{ name: "Foo" }] });

	    expect(post.toJSON().content).to.be.eql("The post");
	    expect(post.toJSON().comments.stores[0].name).to.be.eql("Foo");
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _fluxoJs = __webpack_require__(3);

	var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

	var _has_oneJs = __webpack_require__(4);

	var _has_oneJs2 = _interopRequireDefault(_has_oneJs);

	var _has_manyJs = __webpack_require__(7);

	var _has_manyJs2 = _interopRequireDefault(_has_manyJs);

	var _object_storeJs = __webpack_require__(8);

	var _object_storeJs2 = _interopRequireDefault(_object_storeJs);

	exports["default"] = _extends({}, _fluxoJs2["default"], {
	  Relational: {
	    HasOne: _has_oneJs2["default"],
	    HasMany: _has_manyJs2["default"],
	    ObjectStore: _object_storeJs2["default"]
	  }
	});
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*! fluxo-js v0.0.21 | (c) 2014, 2015 Samuel Simões | https://github.com/fluxo-js/fluxo */
	"use strict";

	(function (f) {
	  if (true) {
	    module.exports = f();
	  } else if (typeof define === "function" && define.amd) {
	    define([], f);
	  } else {
	    var g;if (typeof window !== "undefined") {
	      g = window;
	    } else if (typeof global !== "undefined") {
	      g = global;
	    } else if (typeof self !== "undefined") {
	      g = self;
	    } else {
	      g = this;
	    }g.Fluxo = f();
	  }
	})(function () {
	  var define, module, exports;return (function e(t, n, r) {
	    function s(o, u) {
	      if (!n[o]) {
	        if (!t[o]) {
	          var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
	        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
	          var n = t[o][1][e];return s(n ? n : e);
	        }, l, l.exports, e, t, n, r);
	      }return n[o].exports;
	    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
	  })({ 1: [function (_dereq_, module, exports) {
	      "use strict";

	      Object.defineProperty(exports, "__esModule", {
	        value: true
	      });

	      var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	          var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	              target[key] = source[key];
	            }
	          }
	        }return target;
	      };

	      var _createClass = (function () {
	        function defineProperties(target, props) {
	          for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	          }
	        }return function (Constructor, protoProps, staticProps) {
	          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	        };
	      })();

	      var _get = function get(_x3, _x4, _x5) {
	        var _again = true;_function: while (_again) {
	          var object = _x3,
	              property = _x4,
	              receiver = _x5;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	            var parent = Object.getPrototypeOf(object);if (parent === null) {
	              return undefined;
	            } else {
	              _x3 = parent;_x4 = property;_x5 = receiver;_again = true;desc = parent = undefined;continue _function;
	            }
	          } else if ("value" in desc) {
	            return desc.value;
	          } else {
	            var getter = desc.get;if (getter === undefined) {
	              return undefined;
	            }return getter.call(receiver);
	          }
	        }
	      };

	      function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : { "default": obj };
	      }

	      function _toConsumableArray(arr) {
	        if (Array.isArray(arr)) {
	          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
	        } else {
	          return Array.from(arr);
	        }
	      }

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	      }

	      var _fluxoObject_storeJs = _dereq_("./fluxo.object_store.js");

	      var _fluxoObject_storeJs2 = _interopRequireDefault(_fluxoObject_storeJs);

	      /** @namespace Fluxo */
	      /**
	       * Fluxo.CollectionStore is a convenient wrapper to your literal objects arrays.
	       */

	      var CollectionStore = (function (_ObjectStore) {
	        _inherits(CollectionStore, _ObjectStore);

	        function CollectionStore() {
	          _classCallCheck(this, CollectionStore);

	          _get(Object.getPrototypeOf(CollectionStore.prototype), "constructor", this).apply(this, arguments);
	        }

	        _createClass(CollectionStore, [{
	          key: "initialize",

	          /** @lends Fluxo.CollectionStore */
	          value: function initialize() {
	            var stores = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            this.store = this.constructor.store || _fluxoObject_storeJs2["default"];

	            this.stores = [];

	            this.storesOnChangeCancelers = {};

	            this.subsets = {};

	            this.subset = this.constructor.subset || {};

	            this.childrenDelegate = this.constructor.childrenDelegate || [];

	            _get(Object.getPrototypeOf(CollectionStore.prototype), "initialize", this).call(this, data);

	            this.setStores(stores);

	            this.registerSubsets();

	            this.createDelegateMethods();
	          }
	        }, {
	          key: "getSubset",
	          value: function getSubset(subsetName) {
	            if (!this[subsetName]) {
	              throw new Error("Subset compute function to \"" + subsetName + "\" subset is not defined.");
	            }

	            var subsetStores = this[subsetName].call(this);

	            return new CollectionStore(subsetStores);
	          }
	        }, {
	          key: "updateSubset",
	          value: function updateSubset(subsetName) {
	            var currentValue = this.subset[subsetName];

	            if (currentValue instanceof CollectionStore) {
	              currentValue.removeAll();
	            }

	            this.subsets[subsetName] = this.getSubset(subsetName);

	            this.triggerEvents(["change", "change:" + subsetName]);
	          }
	        }, {
	          key: "registerSubsets",
	          value: function registerSubsets() {
	            for (var subsetName in this.subset) {
	              var toComputeEvents = ["add", "remove"].concat(_toConsumableArray(this.subset[subsetName]));

	              this.on(toComputeEvents, this.updateSubset.bind(this, subsetName));

	              this.updateSubset(subsetName);
	            }
	          }
	        }, {
	          key: "setAttribute",
	          value: function setAttribute(attributeName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	              args[_key - 1] = arguments[_key];
	            }

	            if (this.subset && this.subset[attributeName]) {
	              throw new Error("The attribute name \"" + attributeName + "\" is reserved to a subset.");
	            }

	            if (attributeName === "stores") {
	              throw new Error("You can't set a attribute with \"stores\" name on a collection.");
	            }

	            return _get(Object.getPrototypeOf(CollectionStore.prototype), "setAttribute", this).apply(this, arguments);
	          }

	          /**
	           * @returns {null}
	           */
	        }, {
	          key: "createDelegateMethods",
	          value: function createDelegateMethods() {
	            for (var i = 0, l = this.childrenDelegate.length; i < l; i++) {
	              var methodName = this.childrenDelegate[i];
	              this.createDelegateMethod(methodName);
	            }
	          }

	          /**
	           * @param {string} method to delegate to children
	           * @returns {null}
	           */
	        }, {
	          key: "createDelegateMethod",
	          value: function createDelegateMethod(methodName) {
	            this[methodName] = (function (method, id) {
	              var child = this.find(id);

	              for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                args[_key2 - 2] = arguments[_key2];
	              }

	              child[method].apply(child, args);
	            }).bind(this, methodName);
	          }

	          /**
	           * @param {Object[]} stores data
	           * @returns {null}
	           */
	        }, {
	          key: "addStores",
	          value: function addStores(stores) {
	            for (var i = 0, l = stores.length; i < l; i++) {
	              var store = stores[i];
	              this.addStore(store);
	            }
	          }

	          /**
	           * @param {Object[]} stores data
	           * @returns {null}
	           */
	        }, {
	          key: "resetStores",
	          value: function resetStores(stores) {
	            this.removeAll();
	            this.addStores(stores);
	          }

	          /**
	           * @returns {null}
	           * @instance
	           */
	        }, {
	          key: "removeAll",
	          value: function removeAll() {
	            for (var i = this.stores.length - 1, l = 0; i >= l; i--) {
	              var store = this.stores[i];
	              this.removeListenersOn(store);
	            }

	            this.stores = [];

	            this.triggerEvents(["remove", "change"]);
	          }

	          /**
	           * This methods add the missing objects and updates the existing stores.
	           *
	           * @param {Object[]} stores data
	           * @returns undefined
	           * @instance
	           */
	        }, {
	          key: "setStores",
	          value: function setStores(data) {
	            for (var i = 0, l = data.length; i < l; i++) {
	              var storeData = data[i],
	                  alreadyAddedStore = this.find(storeData.id || storeData.cid);

	              if (alreadyAddedStore) {
	                alreadyAddedStore.set(storeData);
	              } else {
	                this.addStore(storeData);
	              }
	            }
	          }

	          /**
	           * @param {Object} store data
	           * @returns {Object}
	           * @instance
	           */
	        }, {
	          key: "addStore",
	          value: function addStore(store) {
	            if (!(store instanceof this.store)) {
	              store = new this.store(store);
	            }

	            var alreadyAddedStore = this.find(store.data.id);

	            if (alreadyAddedStore) {
	              return alreadyAddedStore;
	            }

	            this.stores.push(store);

	            var onStoreEvent = function onStoreEvent(eventName) {
	              for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                args[_key3 - 1] = arguments[_key3];
	              }

	              this.triggerEvent.apply(this, ["stores:" + eventName].concat(args));
	            };

	            this.storesOnChangeCancelers[store.cid] = store.on(["*"], onStoreEvent.bind(this));

	            if (this.sort) {
	              this.stores.sort(this.sort);
	            }

	            this.triggerEvents(["add", "change"]);

	            return store;
	          }

	          /**
	           * @param {number} storeID
	           * @returns {Object|undefined} - the found flux store or undefined
	           * @instance
	           */
	        }, {
	          key: "find",
	          value: function find(storeID) {
	            var foundStore;

	            if (storeID) {
	              foundStore = this.findWhere({ id: storeID });

	              if (!foundStore) {
	                this.stores.some(function (store) {
	                  if (store.cid === storeID) {
	                    foundStore = store;

	                    return true;
	                  }
	                });
	              }
	            }

	            return foundStore;
	          }

	          /**
	           * @param {Object} criteria
	           * @returns {Object|undefined} - the found flux store or undefined
	           * @instance
	           */
	        }, {
	          key: "findWhere",
	          value: function findWhere(criteria) {
	            return this.where(criteria, true)[0];
	          }

	          /**
	           * @param {Object} criteria
	           * @returns {Fluxo.ObjectStore[]} - the found flux stores or empty array
	           * @instance
	           */
	        }, {
	          key: "where",
	          value: function where(criteria, stopOnFirstMatch) {
	            var foundStores = [];

	            if (!criteria) {
	              return [];
	            }

	            for (var i = 0, l = this.stores.length; i < l; i++) {
	              var comparedStore = this.stores[i],
	                  matchAllCriteria = true;

	              for (var key in criteria) {
	                if (comparedStore.data[key] !== criteria[key]) {
	                  matchAllCriteria = false;
	                  break;
	                }
	              }

	              if (matchAllCriteria) {
	                foundStores.push(comparedStore);

	                if (stopOnFirstMatch) {
	                  break;
	                }
	              }
	            }

	            return foundStores;
	          }

	          /**
	           * @returns {null}
	           * @instance
	           */
	        }, {
	          key: "removeListenersOn",
	          value: function removeListenersOn(store) {
	            this.storesOnChangeCancelers[store.cid].call();
	            delete this.storesOnChangeCancelers[store.cid];
	          }

	          /**
	           * @param {Fluxo.ObjectStore} store - the store to remove
	           * @returns {null}
	           * @instance
	           */
	        }, {
	          key: "remove",
	          value: function remove(store) {
	            this.removeListenersOn(store);

	            this.stores.splice(this.stores.indexOf(store), 1);

	            this.triggerEvents(["remove", "change"]);
	          }

	          /**
	           * It returns an array with the result of toJSON method invoked
	           * on each stores.
	           *
	           * @returns {Object}
	           *
	           * @instance
	           */
	        }, {
	          key: "storesToJSON",
	          value: function storesToJSON() {
	            var collectionData = [];

	            for (var i = 0, l = this.stores.length; i < l; i++) {
	              var store = this.stores[i];
	              collectionData.push(store.toJSON());
	            }

	            return collectionData;
	          }
	        }, {
	          key: "subsetsToJSON",
	          value: function subsetsToJSON() {
	            var subsetsData = {};

	            for (var subsetName in this.subsets) {
	              subsetsData[subsetName] = this.subsets[subsetName].toJSON().stores;
	            }

	            return subsetsData;
	          }

	          /**
	           * It returns a JSON with the store's attributes, the children stores data
	           * on "stores" key and the subsets store's data.
	           *
	           * e.g {
	           *   usersCount: 1,
	           *   onlineUsers: [{ name: "Fluxo" }],
	           *   stores: [{ name: "Fluxo" }]
	           * }
	           *
	           * @returns {Object}
	           *
	           * @instance
	           */
	        }, {
	          key: "toJSON",
	          value: function toJSON() {
	            return _extends({}, _get(Object.getPrototypeOf(CollectionStore.prototype), "toJSON", this).call(this), this.subsetsToJSON(), {
	              stores: this.storesToJSON()
	            });
	          }
	        }]);

	        return CollectionStore;
	      })(_fluxoObject_storeJs2["default"]);

	      exports["default"] = CollectionStore;
	      module.exports = exports["default"];
	    }, { "./fluxo.object_store.js": 4 }], 2: [function (_dereq_, module, exports) {
	      "use strict";

	      Object.defineProperty(exports, "__esModule", {
	        value: true
	      });

	      exports["default"] = function () {
	        var toExtend = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          extensions[_key - 1] = arguments[_key];
	        }

	        for (var i = 0, l = extensions.length; i < l; i++) {
	          var extension = extensions[i];

	          for (var extensionProperty in extension) {
	            toExtend[extensionProperty] = extension[extensionProperty];
	          }
	        }

	        return toExtend;
	      };

	      ;
	      module.exports = exports["default"];
	    }, {}], 3: [function (_dereq_, module, exports) {
	      "use strict";

	      Object.defineProperty(exports, "__esModule", {
	        value: true
	      });

	      function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : { "default": obj };
	      }

	      var _fluxoObject_storeJs = _dereq_("./fluxo.object_store.js");

	      var _fluxoObject_storeJs2 = _interopRequireDefault(_fluxoObject_storeJs);

	      var _fluxoCollection_storeJs = _dereq_("./fluxo.collection_store.js");

	      var _fluxoCollection_storeJs2 = _interopRequireDefault(_fluxoCollection_storeJs);

	      var _fluxoExtendJs = _dereq_("./fluxo.extend.js");

	      var _fluxoExtendJs2 = _interopRequireDefault(_fluxoExtendJs);

	      var _fluxoRadioJs = _dereq_("./fluxo.radio.js");

	      var _fluxoRadioJs2 = _interopRequireDefault(_fluxoRadioJs);

	      exports["default"] = {
	        ObjectStore: _fluxoObject_storeJs2["default"],
	        CollectionStore: _fluxoCollection_storeJs2["default"],
	        Radio: _fluxoRadioJs2["default"],
	        extend: _fluxoExtendJs2["default"]
	      };
	      module.exports = exports["default"];
	    }, { "./fluxo.collection_store.js": 1, "./fluxo.extend.js": 2, "./fluxo.object_store.js": 4, "./fluxo.radio.js": 5 }], 4: [function (_dereq_, module, exports) {
	      "use strict";

	      Object.defineProperty(exports, "__esModule", {
	        value: true
	      });

	      var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	          var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	              target[key] = source[key];
	            }
	          }
	        }return target;
	      };

	      var _createClass = (function () {
	        function defineProperties(target, props) {
	          for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	          }
	        }return function (Constructor, protoProps, staticProps) {
	          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	        };
	      })();

	      function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : { "default": obj };
	      }

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var _fluxoRadioJs = _dereq_("./fluxo.radio.js");

	      var _fluxoRadioJs2 = _interopRequireDefault(_fluxoRadioJs);

	      var _fluxoExtendJs = _dereq_("./fluxo.extend.js");

	      var _fluxoExtendJs2 = _interopRequireDefault(_fluxoExtendJs);

	      var storesUUID = 1;

	      var _default = (function () {
	        function _default() {
	          _classCallCheck(this, _default);

	          return this.initialize.apply(this, arguments);
	        }

	        _createClass(_default, [{
	          key: "initialize",
	          value: function initialize() {
	            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.cid = "FS:" + storesUUID++;

	            this.data = {};

	            this.computed = this.constructor.computed || {};

	            this.attributeParsers = this.constructor.attributeParsers || {};

	            this.set(_extends({}, this.constructor.defaults, data));

	            this.registerComputed();
	          }
	        }, {
	          key: "on",
	          value: function on(events, callback) {
	            var cancelers = [];

	            for (var i = 0, l = events.length; i < l; i++) {
	              var eventName = events[i],
	                  changeEventToken = this.cid + ":" + eventName,
	                  canceler = _fluxoRadioJs2["default"].subscribe(changeEventToken, callback.bind(this));

	              cancelers.push(canceler);
	            }

	            var aggregatedCanceler = function aggregatedCanceler() {
	              for (var i = 0, l = cancelers.length; i < l; i++) {
	                var canceler = cancelers[i];
	                canceler.call();
	              }
	            };

	            return aggregatedCanceler;
	          }
	        }, {
	          key: "triggerEvents",
	          value: function triggerEvents(eventsNames) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	              args[_key - 1] = arguments[_key];
	            }

	            for (var i = 0, l = eventsNames.length; i < l; i++) {
	              var eventName = eventsNames[i];
	              this.triggerEvent.apply(this, [eventName].concat(args));
	            }
	          }
	        }, {
	          key: "triggerEvent",
	          value: function triggerEvent(eventName) {
	            var changeChannel = this.cid + ":" + eventName;

	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	              args[_key2 - 1] = arguments[_key2];
	            }

	            _fluxoRadioJs2["default"].publish.apply(_fluxoRadioJs2["default"], [changeChannel, this].concat(args));

	            _fluxoRadioJs2["default"].publish.apply(_fluxoRadioJs2["default"], [this.cid + ":*", eventName, this].concat(args));
	          }
	        }, {
	          key: "getComputed",
	          value: function getComputed(attributeName) {
	            if (!this[attributeName]) {
	              throw new Error("Compute function to \"" + attributeName + "\" value is not defined.");
	            }

	            return this[attributeName].call(this);
	          }
	        }, {
	          key: "computeValue",
	          value: function computeValue(attributeName) {
	            this.setAttribute(attributeName, this.getComputed(attributeName));
	          }
	        }, {
	          key: "registerComputed",
	          value: function registerComputed() {
	            for (var attributeName in this.computed) {
	              var toComputeEvents = this.computed[attributeName];

	              this.on(toComputeEvents, this.computeValue.bind(this, attributeName));

	              this.setAttribute(attributeName, this.getComputed(attributeName));
	            }
	          }
	        }, {
	          key: "setAttribute",
	          value: function setAttribute(attribute, value, options) {
	            options = options || {};

	            if (this.data[attribute] === value) {
	              return;
	            }

	            if (this.attributeParsers[attribute]) {
	              value = this.attributeParsers[attribute](value);
	            }

	            this.data[attribute] = value;

	            this.triggerEvent("change:" + attribute);

	            if (options.silentGlobalChange) {
	              return;
	            }

	            this.triggerEvent("change");
	          }
	        }, {
	          key: "unsetAttribute",
	          value: function unsetAttribute(attribute, options) {
	            options = options || {};

	            delete this.data[attribute];

	            this.triggerEvent("change:" + attribute);

	            if (options.silentGlobalChange) {
	              return;
	            }

	            this.triggerEvent("change");
	          }
	        }, {
	          key: "set",
	          value: function set(data) {
	            for (var key in data) {
	              this.setAttribute(key, data[key], { silentGlobalChange: true });
	            }

	            this.triggerEvent("change");
	          }
	        }, {
	          key: "reset",
	          value: function reset(data) {
	            data = data || {};

	            for (var key in this.data) {
	              if (data[key] === undefined) {
	                this.unsetAttribute(key, { silentGlobalChange: true });
	              }
	            }

	            for (var key in data) {
	              this.setAttribute(key, data[key], { silentGlobalChange: true });
	            }

	            this.triggerEvent("change");
	          }
	        }, {
	          key: "toJSON",
	          value: function toJSON() {
	            var data = JSON.parse(JSON.stringify(this.data));
	            data.cid = this.cid;

	            return data;
	          }
	        }]);

	        return _default;
	      })();

	      exports["default"] = _default;
	      ;
	      module.exports = exports["default"];
	    }, { "./fluxo.extend.js": 2, "./fluxo.radio.js": 5 }], 5: [function (_dereq_, module, exports) {
	      "use strict";

	      Object.defineProperty(exports, "__esModule", {
	        value: true
	      });
	      exports["default"] = {
	        callbackIds: 1,

	        events: {},

	        subscribe: function subscribe(eventName, callback) {
	          var subscriptionId = this.callbackIds++;

	          this.events[eventName] = this.events[eventName] || {};
	          this.events[eventName][subscriptionId] = callback;

	          return this.removeSubscription.bind(this, eventName, subscriptionId);
	        },

	        removeSubscription: function removeSubscription(eventName, subscriptionId) {
	          this.events[eventName] = this.events[eventName] || {};
	          delete this.events[eventName][subscriptionId];
	        },

	        publish: function publish(eventName) {
	          var callbacks = this.events[eventName] || {};

	          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }

	          for (var subscriptionId in callbacks) {
	            callbacks[subscriptionId].apply(null, args);
	          }
	        }
	      };
	      module.exports = exports["default"];
	    }, {}] }, {}, [3])(3);
	});

/***/ },
/* 4 */
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

	var _baseJs = __webpack_require__(5);

	var _baseJs2 = _interopRequireDefault(_baseJs);

	var _fluxoJs = __webpack_require__(3);

	var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

	var HasOne = (function (_Base) {
	  _inherits(HasOne, _Base);

	  function HasOne() {
	    _classCallCheck(this, HasOne);

	    _get(Object.getPrototypeOf(HasOne.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(HasOne, [{
	    key: "update",
	    value: function update(value) {
	      this.currentValue.set(value);
	    }
	  }]);

	  return HasOne;
	})(_baseJs2["default"]);

	HasOne.defaultStoreObject = _fluxoJs2["default"].ObjectStore;

	exports["default"] = HasOne;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _is_objectJs = __webpack_require__(6);

	var _is_objectJs2 = _interopRequireDefault(_is_objectJs);

	var _fluxoJs = __webpack_require__(3);

	var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

	var _default = (function () {
	  function _default(options) {
	    _classCallCheck(this, _default);

	    _fluxoJs2["default"].extend(this, { storeObject: this.constructor.defaultStoreObject }, options);
	  }

	  _createClass(_default, [{
	    key: "parse",
	    value: function parse(newValue) {
	      if (!(0, _is_objectJs2["default"])(newValue) && newValue !== []) {
	        // cleaning value
	        this.cancelListening();
	        this.currentValue = newValue;
	      } else if (this.currentValue && !(newValue instanceof _fluxoJs2["default"].ObjectStore)) {
	        // updating the already parsed store
	        this.update(newValue);
	      } else if (newValue instanceof _fluxoJs2["default"].ObjectStore) {
	        // attaching an already parsed store
	        this.currentValue = newValue;
	        this.setupListening();
	      } else {
	        // creating store and attaching
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
	    key: "createStore",
	    value: function createStore(value) {
	      return new this.storeObject(value);
	    }
	  }, {
	    key: "setupListening",
	    value: function setupListening() {
	      this.cancelListening();

	      var onStoreEvent = function onStoreEvent(eventName) {
	        var _store;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        (_store = this.store).triggerEvent.apply(_store, [this.key + ":" + eventName].concat(args));
	      };

	      this.changeEventCanceler = this.currentValue.on(["*"], onStoreEvent.bind(this));
	    }
	  }]);

	  return _default;
	})();

	exports["default"] = _default;
	module.exports = exports["default"];

/***/ },
/* 6 */
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
/* 7 */
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

	var _baseJs = __webpack_require__(5);

	var _baseJs2 = _interopRequireDefault(_baseJs);

	var _fluxoJs = __webpack_require__(3);

	var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

	var HasMany = (function (_Base) {
	  _inherits(HasMany, _Base);

	  function HasMany() {
	    _classCallCheck(this, HasMany);

	    _get(Object.getPrototypeOf(HasMany.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(HasMany, [{
	    key: "update",
	    value: function update(value) {
	      this.currentValue.setStores(value);
	    }
	  }]);

	  return HasMany;
	})(_baseJs2["default"]);

	HasMany.defaultStoreObject = _fluxoJs2["default"].CollectionStore;

	exports["default"] = HasMany;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _fluxoJs = __webpack_require__(3);

	var _fluxoJs2 = _interopRequireDefault(_fluxoJs);

	var _default = (function (_Fluxo$ObjectStore) {
	  _inherits(_default, _Fluxo$ObjectStore);

	  function _default() {
	    _classCallCheck(this, _default);

	    _get(Object.getPrototypeOf(_default.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(_default, [{
	    key: "initialize",
	    value: function initialize() {
	      this.relations = _extends({}, this.constructor.relations);
	      this.parseRelations();
	      _get(Object.getPrototypeOf(_default.prototype), "initialize", this).apply(this, arguments);
	    }
	  }, {
	    key: "parseRelations",
	    value: function parseRelations() {
	      for (var relationKey in this.relations) {
	        var relation = this.relations[relationKey];

	        this.relations[relationKey] = new relation.type(_extends({}, relation, {
	          key: relationKey,
	          store: this
	        }));
	      }
	    }
	  }, {
	    key: "setAttribute",
	    value: function setAttribute(attribute, value) {
	      var _get2;

	      var relation = this.relations[attribute];

	      if (relation) {
	        value = relation.parse(value);
	      }

	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      return (_get2 = _get(Object.getPrototypeOf(_default.prototype), "setAttribute", this)).call.apply(_get2, [this, attribute, value].concat(args));
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      var json = _get(Object.getPrototypeOf(_default.prototype), "toJSON", this).apply(this, arguments);

	      for (var attributeName in json) {
	        var value = json[attributeName];

	        if (typeof value.toJSON === "function") {
	          json[attributeName] = value.toJSON();
	        }
	      }

	      return json;
	    }
	  }]);

	  return _default;
	})(_fluxoJs2["default"].ObjectStore);

	exports["default"] = _default;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Fluxo = __webpack_require__(2);

	var Post = (function (_Fluxo$Relational$ObjectStore) {
	  _inherits(Post, _Fluxo$Relational$ObjectStore);

	  function Post() {
	    _classCallCheck(this, Post);

	    _get(Object.getPrototypeOf(Post.prototype), "constructor", this).apply(this, arguments);
	  }

	  return Post;
	})(Fluxo.Relational.ObjectStore);

	Post.relations = {
	  author: {
	    type: Fluxo.Relational.HasOne
	  }
	};

	describe("Fluxo.Relation.HasOne", function () {
	  it("instantiate store on construction", function () {
	    var post = new Post({ content: "The post", author: { name: "Foo" } });

	    expect(post.data.author.data.name).to.be.eql("Foo");

	    expect(post.data.content).to.be.eql("The post");

	    expect(post.data.author).to.be.an.instanceOf(Fluxo.ObjectStore);
	  });

	  it("bubble the change events", function () {
	    var post = new Post({ content: "The post", author: { name: "Foo" } });

	    var onChangeCallback = chai.spy();

	    post.on(["author:change:name"], onChangeCallback);

	    post.setAttribute("author", { name: "Bar" });

	    expect(post.data.author.data.name).to.be.eql("Bar");

	    expect(onChangeCallback).to.have.been.called.once();
	  });

	  it("nullify the attribute with falsy values", function () {
	    var post = new Post({ content: "The post", author: { name: "Foo" } });

	    expect(post.data.author).to.be.an.instanceOf(Fluxo.ObjectStore);

	    post.setAttribute("author", null);

	    expect(post.data.author).to.be.eql(null);
	  });

	  it("accepts a store instance", function () {
	    var post = new Post({ content: "The post" });

	    var author = new Fluxo.ObjectStore({ name: "Foo" });

	    post.setAttribute("author", author);

	    var onChangeCallback = chai.spy();

	    post.on(["author:change:name"], onChangeCallback);

	    post.setAttribute("author", { name: "Bar" });

	    post.setAttribute("author", null);

	    author.setAttribute("name", "Baz");

	    expect(onChangeCallback).to.have.been.called.once();
	  });

	  it("generates the correct JSON", function () {
	    var post = new Post({ content: "The post", author: { name: "Foo" } });

	    expect(post.toJSON().content).to.be.eql("The post");
	    expect(post.toJSON().author.name).to.be.eql("Foo");
	  });

	  it("works with other store class", function () {
	    var Category = (function (_Fluxo$ObjectStore) {
	      _inherits(Category, _Fluxo$ObjectStore);

	      function Category() {
	        _classCallCheck(this, Category);

	        _get(Object.getPrototypeOf(Category.prototype), "constructor", this).apply(this, arguments);
	      }

	      _createClass(Category, [{
	        key: "customMethod",
	        value: function customMethod() {}
	      }]);

	      return Category;
	    })(Fluxo.ObjectStore);

	    var CustomPost = (function (_Fluxo$Relational$ObjectStore2) {
	      _inherits(CustomPost, _Fluxo$Relational$ObjectStore2);

	      function CustomPost() {
	        _classCallCheck(this, CustomPost);

	        _get(Object.getPrototypeOf(CustomPost.prototype), "constructor", this).apply(this, arguments);
	      }

	      return CustomPost;
	    })(Fluxo.Relational.ObjectStore);

	    CustomPost.relations = {
	      category: {
	        type: Fluxo.Relational.HasOne,
	        storeObject: Category
	      }
	    };

	    var post = new CustomPost({ content: "The post", category: { name: "Foo" } });

	    expect(post.data.category.data.name).to.be.eql("Foo");
	    expect(post.data.category.setAttribute).to.exist;
	    expect(post.data.category.customMethod).to.exist;
	  });
	});

/***/ }
/******/ ]);