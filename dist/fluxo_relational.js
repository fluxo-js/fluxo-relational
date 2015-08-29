/*! fluxo_relational v0.0.1 | (c) 2015 Samuel Simões |  */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["fluxo"], factory);
  } else if (typeof exports !== "undefined") {
    var Fluxo = require("fluxo");
    module.exports = factory(Fluxo);
  } else {
    root.Fluxo.Relational = factory(root.Fluxo);
  }
})(this, function(Fluxo) {
  var Relational = {};

  Relational.Base = {
    currentStoreValue: function() {
      return this.store.data[this.key];
    },

    parse: function(value) {
      var parsedValue = value;

      if (!value && value !== []) {
        this.cancelChildListening();
      } else if (value instanceof this.storeClass) {
        this.listenChildChanges(value);
      } else {
        if (this.currentStoreValue() instanceof this.storeClass) {
          this.updateCurrentChild(value);
          parsedValue = this.currentStoreValue();
        } else {
          parsedValue = this.instantiateStore(value);
        }
      }

      return parsedValue;
    },

    cancelChildListening: function () {
      if (!this.changeEventCanceler) { return; }
      this.changeEventCanceler.call();
      delete this.changeEventCanceler;
    },

    listenChildChanges: function(store) {
      this.cancelChildListening();

      var onStoreEvent = function(eventName) {
        var args = Array.prototype.slice.call(arguments, 1);

        args.unshift((this.key + ":" + eventName));

        this.store.triggerEvent.apply(this.store, args);
      };

      this.changeEventCanceler = store.on(["*"], onStoreEvent.bind(this));
    },

    instantiateStore: function (data) {
      var store = new this.storeClass(data);
      this.listenChildChanges(store);
      return store;
    }
  };

  Relational.HasOne = function(options) {
    this.store = options.store;
    this.storeClass = options.storeClass || Fluxo.Store;
    this.key = options.key;
  };

  Relational.HasMany = function(options) {
    this.store = options.store;
    this.storeClass = options.storeClass || Fluxo.CollectionStore;
    this.key = options.key;
  };

  Relational.HasOne.prototype = Fluxo.extend({
    updateCurrentChild: function(value) {
      this.currentStoreValue().set(value);
    }
  }, Relational.Base);

  Relational.HasMany.prototype = Fluxo.extend({
    updateCurrentChild: function(value) {
      this.currentStoreValue().resetFromData(value);
    }
  }, Relational.Base);

  Relational.Store = Fluxo.Store.extend({
    parsedRelations: {},

    _constructor: function () {
      this.parseRelations();
      Fluxo.Store.prototype._constructor.apply(this, arguments);
    },

    parseRelations: function() {
      for (var relationKey in this.relations) {
        var relation = this.relations[relationKey];

        this.parsedRelations[relationKey] = new relation.type({
          store: this,
          key: relationKey,
          storeClass: relation.storeClass
        });
      }
    },

    setAttribute: function(attribute, value, options) {
      var relation = this.parsedRelations[attribute];

      if (relation) {
        value = relation.parse(value);
      }

      return Fluxo.Store.prototype.setAttribute.call(this, attribute, value, options);
    },

    toJSON: function() {
      var json = {};

      for (var attributeName in this.data) {
        var value = this.data[attributeName];

        if (typeof value.toJSON === "function") {
          json[attributeName] = value.toJSON();
        } else {
          json[attributeName] = value;
        }
      }

      return json;
    }
  });

  return Relational;
});
