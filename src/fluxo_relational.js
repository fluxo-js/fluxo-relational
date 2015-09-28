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

  var isObject = function(obj) {
    var type = typeof obj;
    return type === "function" || type === "object" && !!obj;
  };

  Relational.Base = {
    create: function () {
      var extensions = Array.prototype.slice.call(arguments);

      extensions.unshift({}, this);

      var extension = Fluxo.extend.apply(null, extensions);

      return extension;
    },

    parse: function (newValue) {
      if (!isObject(newValue) && newValue !== []) {
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
    },

    cancelListening: function () {
      if (!this.changeEventCanceler) { return; }
      this.changeEventCanceler.call();
      delete this.changeEventCanceler;
    },

    setupListening: function() {
      this.cancelListening();

      var onStoreEvent = function(eventName) {
        var args = Array.prototype.slice.call(arguments, 1);

        args.unshift((this.key + ":" + eventName));

        this.store.triggerEvent.apply(this.store, args);
      };

      this.changeEventCanceler = this.currentValue.on(["*"], onStoreEvent.bind(this));
    }
  };

  Relational.HasMany = Relational.Base.create({
    relationName: "HasMany",

    createStore: function (value) {
      var storeObject;

      if (this.collectionObject) {
        storeObject = this.collectionObject;
      } else {
        storeObject = { store: (this.storeObject || {}) };
      }

      return Fluxo.CollectionStore.create(storeObject, { stores: value });
    },

    update: function (value) {
      this.currentValue.setStores(value);
    }
  });

  Relational.HasOne = Relational.Base.create({
    relationName: "HasOne",

    createStore: function (value) {
      return Fluxo.ObjectStore.create((this.storeObject || {}), { data: value });
    },

    update: function (value) {
      this.currentValue.set(value);
    }
  });

  Relational.ObjectStore = Fluxo.ObjectStore.create({
    setup: function () {
      this.relations = Fluxo.extend({}, this.relations);
      this.parseRelations();
      Fluxo.ObjectStore.setup.apply(this, arguments);
    },

    parseRelations: function() {
      for (var relationKey in this.relations) {
        var relation = this.relations[relationKey];

        this.relations[relationKey] =
          relation.type.create({
            key: relationKey,
            store: this
          }, relation);
      }
    },

    setAttribute: function(attribute, value, options) {
      var relation = this.relations[attribute];

      if (relation) {
        value = relation.parse(value);
      }

      return Fluxo.ObjectStore.setAttribute.call(this, attribute, value, options);
    },

    toJSON: function() {
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

  return Relational;
});
