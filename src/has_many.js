import Base from "./base.js";
import Fluxo from "fluxo-js";

export default class HasMany extends Base {
  createStore (value) {
    var storeObject;

    if (this.collectionObject) {
      storeObject = this.collectionObject;
    } else {
      storeObject = { store: (this.storeObject || {}) };
    }

    return Fluxo.CollectionStore.create(storeObject, { stores: value });
  }

  update (value) {
    this.currentValue.setStores(value);
  }
}
