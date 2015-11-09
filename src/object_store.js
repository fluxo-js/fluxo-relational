import Fluxo from "fluxo-js";

export default class extends Fluxo.ObjectStore {
  initialize () {
    this.relations = { ...this.constructor.relations };
    this.parseRelations();
    super.initialize(...arguments);
  }

  parseRelations () {
    for (var relationKey in this.relations) {
      var relation = this.relations[relationKey];

      this.relations[relationKey] =
        new relation.type({
          ...relation,
          key: relationKey,
          store: this
        });
    }
  }

  setAttribute (attribute, value, ...args) {
    var relation = this.relations[attribute];

    if (relation) {
      value = relation.parse(value);
    }

    return super.setAttribute(attribute, value, ...args);
  }

  toJSON () {
    var json = super.toJSON(...arguments);

    for (var attributeName in json) {
      var value = json[attributeName];

      if (typeof value.toJSON === "function") {
        json[attributeName] = value.toJSON();
      }
    }

    return json;
  }
}
