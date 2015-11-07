var Fluxo = require("fluxo-js"),
    Relational = {
      HasOne: require("./has_one.js"),
      HasMany: require("./has_many.js")
    };

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
        new relation.type({ key: relationKey, store: this, ...relation });
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

module.exports = { ...Fluxo, Relational: Relational };
