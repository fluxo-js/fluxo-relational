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
	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var Post = {
	  relations: {
	    author: {
	      type: Fluxo.Relational.HasOne
	    }
	  }
	};

	describe("Fluxo.Relation.HasOne", function () {
	  it("instantiate store on construction", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        author: { name: "Foo" }
	      }
	    });

	    expect(post.data.author.data.name).to.be.eql("Foo");

	    expect(post.data.content).to.be.eql("The post");

	    expect(post.data.author._fluxo).to.be["true"];
	  });

	  it("bubble the change events", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        author: { name: "Foo" }
	      }
	    });

	    var onChangeCallback = chai.spy();

	    post.on(["author:change:name"], onChangeCallback);

	    post.setAttribute("author", { name: "Bar" });

	    expect(post.data.author.data.name).to.be.eql("Bar");

	    expect(onChangeCallback).to.have.been.called.once();
	  });

	  it("nullify the attribute with falsy values", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        author: { name: "Samuel" }
	      }
	    });

	    expect(post.data.author._fluxo).to.be["true"];

	    post.setAttribute("author", null);

	    expect(post.data.author).to.be.eql(null);
	  });

	  it("accepts a store instance", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post"
	      }
	    });

	    var author = Fluxo.ObjectStore.create({ data: { name: "Foo" } });

	    post.setAttribute("author", author);

	    var onChangeCallback = chai.spy();

	    post.on(["author:change:name"], onChangeCallback);

	    post.setAttribute("author", { name: "Bar" });

	    post.setAttribute("author", null);

	    author.setAttribute("name", "Baz");

	    expect(onChangeCallback).to.have.been.called.once();
	  });

	  it("generates the correct JSON", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        author: { name: "Foo" }
	      }
	    });

	    expect(post.toJSON().content).to.be.eql("The post");
	    expect(post.toJSON().author.name).to.be.eql("Foo");
	  });

	  it("works with other store class", function () {
	    var Category = {
	      customMethod: {}
	    };

	    var post = Fluxo.Relational.ObjectStore.create({
	      data: {
	        content: "The post",
	        category: { name: "Foo" }
	      },

	      relations: {
	        category: {
	          type: Fluxo.Relational.HasOne,
	          storeObject: Category
	        }
	      }
	    });

	    expect(post.data.category.data.name).to.be.eql("Foo");
	    expect(post.data.category.setAttribute).to.exist;
	    expect(post.data.category.customMethod).to.exist;
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var Post = {
	  relations: {
	    comments: {
	      type: Fluxo.Relational.HasMany
	    }
	  }
	};

	describe("Fluxo.Relation.HasMany", function () {
	  it("instantiate collection store on construction", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        comments: [{ name: "Foo" }]
	      }
	    });

	    expect(post.toJSON().comments.stores[0].name).to.be.eql("Foo");

	    expect(post.data.content).to.be.eql("The post");
	  });

	  it("bubble events", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        comments: []
	      }
	    });

	    var onChangeCallback = chai.spy();

	    post.on(["comments:add"], onChangeCallback);

	    post.data.comments.addStore({ content: "The post" });

	    expect(onChangeCallback).to.have.been.called.once();
	  });

	  it("generates the correct JSON", function () {
	    var post = Fluxo.Relational.ObjectStore.create(Post, {
	      data: {
	        content: "The post",
	        comments: [{ name: "Foo" }]
	      }
	    });

	    expect(post.toJSON().content).to.be.eql("The post");
	    expect(post.toJSON().comments.stores[0].name).to.be.eql("Foo");
	  });
	});

/***/ }
/******/ ]);