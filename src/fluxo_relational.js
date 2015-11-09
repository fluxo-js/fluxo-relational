import Fluxo from "fluxo-js";
import HasOne from "./has_one.js";
import HasMany from "./has_many.js";
import ObjectStore from "./object_store.js";

export default {
  ...Fluxo,
  Relational: {
    HasOne: HasOne,
    HasMany: HasMany,
    ObjectStore: ObjectStore
  }
};
