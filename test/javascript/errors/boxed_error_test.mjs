"use strict";

import {assert} from "../support/helpers.mjs";
import HologramBoxedError from "../../../assets/js/errors/boxed_error.mjs";
import Type from "../../../assets/js/type.mjs";

it("HologramBoxedError", () => {
  const struct = Type.errorStruct("MyType", "my message");

  try {
    throw new HologramBoxedError(struct);
  } catch (error) {
    assert.instanceOf(error, HologramBoxedError);
    assert.deepStrictEqual(error.struct, struct);
  }
});
