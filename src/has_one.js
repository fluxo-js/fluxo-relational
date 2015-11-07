import Base from "./base.js";
import Fluxo from "fluxo-js";

export default class HasOne extends Base {
  createStore (value) {
    return Fluxo.ObjectStore.create((this.storeObject || {}), { data: value });
  }

  update (value) {
    this.currentValue.set(value);
  }
}
