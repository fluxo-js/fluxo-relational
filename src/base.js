import isObject from "./is_object.js";
import Fluxo from "fluxo-js";

export default class {
  constructor (options) {
    Fluxo.extend(this, options);
  }

  parse (newValue) {
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
  }

  cancelListening () {
    if (!this.changeEventCanceler) { return; }
    this.changeEventCanceler.call();
    delete this.changeEventCanceler;
  }

  setupListening () {
    this.cancelListening();

    var onStoreEvent = function(eventName) {
      var args = Array.prototype.slice.call(arguments, 1);

      args.unshift((this.key + ":" + eventName));

      this.store.triggerEvent.apply(this.store, args);
    };

    this.changeEventCanceler =
      this.currentValue.on(["*"], onStoreEvent.bind(this));
  }
}
