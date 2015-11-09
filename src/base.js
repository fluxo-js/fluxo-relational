import isObject from "./is_object.js";
import Fluxo from "fluxo-js";

export default class {
  constructor (options) {
    Fluxo.extend(this, { storeObject: this.constructor.defaultStoreObject }, options);
  }

  parse (newValue) {
    if (!isObject(newValue) && newValue !== []) {
      // cleaning value
      this.cancelListening();
      this.currentValue = newValue;
    } else if (this.currentValue && !(newValue instanceof Fluxo.ObjectStore)) {
      // updating the already parsed store
      this.update(newValue);
    } else if ((newValue instanceof Fluxo.ObjectStore)) {
      // attaching an already parsed store
      this.currentValue = newValue;
      this.setupListening();
    } else {
      // creating store and attaching
      this.currentValue = this.createStore(newValue);
      this.setupListening();
    }

    return this.currentValue;
  }

  cancelListening () {
    if (!this.changeEventCanceler) { return; }
    this.changeEventCanceler.call();
    delete this.changeEventCanceler;
  }

  createStore (value) {
    return new this.storeObject(value);
  }

  setupListening () {
    this.cancelListening();

    var onStoreEvent = function (eventName, ...args) {
      this.store.triggerEvent(`${this.key}:${eventName}`, ...args);
    };

    this.changeEventCanceler =
      this.currentValue.on(["*"], onStoreEvent.bind(this));
  }
}
