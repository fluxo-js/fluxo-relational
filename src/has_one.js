import Base from "./base.js";
import Fluxo from "fluxo-js";

class HasOne extends Base {
  update (value) {
    this.currentValue.set(value);
  }
}

HasOne.defaultStoreObject = Fluxo.ObjectStore;

export default HasOne;
