import Base from "./base.js";
import Fluxo from "fluxo-js";

class HasMany extends Base {
  update (value) {
    this.currentValue.setStores(value);
  }
}

HasMany.defaultStoreObject = Fluxo.CollectionStore;

export default HasMany;
