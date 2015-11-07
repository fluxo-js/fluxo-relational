export default class extends Fluxo.ObjectStore {
  constructor (attributes) {
    super(attributes);
    this.relations = Fluxo.extend({}, this.relations);
    this.parseRelations();
  }

  parseRelations () {
    for (var relationKey in this.relations) {
      var relation = this.relations[relationKey];

      this.relations[relationKey] =
        relation.type.create({
          key: relationKey,
          store: this
        }, relation);
    }
  }

  setAttribute (attribute, value) {
    var relation = this.relations[attribute];

    if (relation) {
      value = relation.parse(value);
    }

    return super.setAttribute(...arguments);
  }

  toJSON () {
    var json = Fluxo.ObjectStore.toJSON.call(this);

    for (var attributeName in json) {
      var value = json[attributeName];

      if (typeof value.toJSON === "function") {
        json[attributeName] = value.toJSON();
      }
    }

    return json;
  }
}
