"use strict";

import Interpreter from "../interpreter.mjs";
import Type from "../type.mjs";

export default class Erlang {
  // start: +/2
  static $243(left, right) {
    const type =
      Type.isFloat(left) || Type.isFloat(right) ? "float" : "integer";

    let leftValue = left.value;
    let rightValue = right.value;

    if (type === "float" && Type.isInteger(left)) {
      leftValue = Number(leftValue);
    }

    if (type === "float" && Type.isInteger(right)) {
      rightValue = Number(rightValue);
    }

    const result = leftValue + rightValue;
    return type === "float" ? Type.float(result) : Type.integer(result);
  }

  // start: /=/2
  static $247$261(left, right) {
    const isEqual = Erlang.$261$261(left, right);
    return Type.boolean(Type.isFalse(isEqual));
  }
  // end: /=/2

  // start: =:=/2
  static $261$258$261(left, right) {
    return Type.boolean(Interpreter.isStrictlyEqual(left, right));
  }
  // end: =:=/2

  // start: ==/2
  static $261$261(left, right) {
    let value;

    switch (left.type) {
      case "float":
      case "integer":
        if (Type.isNumber(left) && Type.isNumber(right)) {
          value = left.value == right.value;
        } else {
          value = false;
        }
        break;

      default:
        value = left.type === right.type && left.value === right.value;
        break;
    }

    return Type.boolean(value);
  }
  // end: ==/2

  // start: hd/1
  static hd(list) {
    return Interpreter.head(list);
  }
  // end: hd/1

  // start: is_atom/1
  static is_atom(term) {
    return Type.boolean(Type.isAtom(term));
  }
  // end: is_atom/1

  // start: is_float/1
  static is_float(term) {
    return Type.boolean(Type.isFloat(term));
  }
  // end: is_float/1

  // start: is_integer/1
  static is_integer(term) {
    return Type.boolean(Type.isInteger(term));
  }
  // end: is_integer/1

  // start: is_number/1
  static is_number(term) {
    return Type.boolean(Type.isNumber(term));
  }
  // end: is_number/1

  // start: length/1
  static length(list) {
    return Type.integer(Interpreter.count(list));
  }
  // end: length/1

  // start: tl/1
  static tl(list) {
    return Interpreter.tail(list);
  }
  // end: tl/1
}
