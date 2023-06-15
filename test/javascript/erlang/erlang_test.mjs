"use strict";

import {
  assert,
  assertBoxedFalse,
  assertBoxedTrue,
  assertFrozen,
} from "../../../assets/js/test_support.mjs";

import Erlang from "../../../assets/js/erlang/erlang.mjs";
import Interpreter from "../../../assets/js/interpreter.mjs";
import Type from "../../../assets/js/type.mjs";

describe("$243/2 (+)", () => {
  it("adds integer and integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);

    const result = Erlang.$243(left, right);
    const expected = Type.integer(3);

    assert.deepStrictEqual(result, expected);
  });

  it("adds integer and float", () => {
    const left = Type.integer(1);
    const right = Type.float(2.0);

    const result = Erlang.$243(left, right);
    const expected = Type.float(3.0);

    assert.deepStrictEqual(result, expected);
  });

  it("adds float and integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(2);

    const result = Erlang.$243(left, right);
    const expected = Type.float(3.0);

    assert.deepStrictEqual(result, expected);
  });

  it("adds float and float", () => {
    const left = Type.float(1.0);
    const right = Type.float(2.0);

    const result = Erlang.$243(left, right);
    const expected = Type.float(3.0);

    assert.deepStrictEqual(result, expected);
  });

  it("returns frozen object", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);
    const result = Erlang.$243(left, right);

    assertFrozen(result);
  });
});

describe("$245/2 (-)", () => {
  it("subtracts integer and integer", () => {
    const left = Type.integer(3);
    const right = Type.integer(1);

    const result = Erlang.$245(left, right);
    const expected = Type.integer(2);

    assert.deepStrictEqual(result, expected);
  });

  it("subtracts integer and float", () => {
    const left = Type.integer(3);
    const right = Type.float(1.0);

    const result = Erlang.$245(left, right);
    const expected = Type.float(2.0);

    assert.deepStrictEqual(result, expected);
  });

  it("subtracts float and integer", () => {
    const left = Type.float(3.0);
    const right = Type.integer(1);

    const result = Erlang.$245(left, right);
    const expected = Type.float(2.0);

    assert.deepStrictEqual(result, expected);
  });

  it("subtracts float and float", () => {
    const left = Type.float(3.0);
    const right = Type.float(1.0);

    const result = Erlang.$245(left, right);
    const expected = Type.float(2.0);

    assert.deepStrictEqual(result, expected);
  });

  it("returns frozen object", () => {
    const left = Type.integer(3);
    const right = Type.integer(1);
    const result = Erlang.$245(left, right);

    assertFrozen(result);
  });
});

describe("$247$261/2 (/=)", () => {
  // non-number == non-number
  it("returns boxed false for a boxed non-number equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.boolean(true);
    const result = Erlang.$247$261(left, right);

    assertBoxedFalse(result);
  });

  // non-number != non-number
  it("returns boxed true for a boxed non-number not equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.string("abc");
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  // integer == integer
  it("returns boxed false for a boxed integer equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(1);
    const result = Erlang.$247$261(left, right);

    assertBoxedFalse(result);
  });

  // integer != integer
  it("returns boxed true for a boxed integer not equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  // integer == float
  it("returns boxed false for a boxed integer equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(1.0);
    const result = Erlang.$247$261(left, right);

    assertBoxedFalse(result);
  });

  // integer != float
  it("returns boxed true for a boxed integer not equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(2.0);
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  // integer != non-number
  it("returns boxed true when a boxed integer is compared to a boxed value of non-number type", () => {
    const left = Type.integer(1);
    const right = Type.string("1");
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  // float == float
  it("returns boxed false for a boxed float equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(1.0);
    const result = Erlang.$247$261(left, right);

    assertBoxedFalse(result);
  });

  // float != float
  it("returns boxed true for a boxed float not equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(2.0);
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  // float == integer
  it("returns boxed false for a boxed float equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(1);
    const result = Erlang.$247$261(left, right);

    assertBoxedFalse(result);
  });

  // float != integer
  it("returns boxed true for a boxed float not equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(2);
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  // float != non-number
  it("returns boxed true when a boxed float is compared to a boxed value of non-number type", () => {
    const left = Type.float(1.0);
    const right = Type.string("1.0");
    const result = Erlang.$247$261(left, right);

    assertBoxedTrue(result);
  });

  it("returns frozen object", () => {
    const value = Type.integer(1);
    const result = Erlang.$247$261(value, value);

    assertFrozen(result);
  });
});

describe("$261$258$261/2 (=:=)", () => {
  it("proxies to Interpreter.isStrictlyEqual/2 and casts the result to boxed boolean", () => {
    const left = Type.integer(1);
    const right = Type.integer(1);
    const result = Erlang.$261$258$261(left, right);
    const expected = Type.boolean(Interpreter.isStrictlyEqual(left, right));

    assert.deepStrictEqual(result, expected);
  });
});

describe("$261$261/2 (==)", () => {
  // non-number == non-number
  it("returns boxed true for a boxed non-number equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.boolean(true);
    const result = Erlang.$261$261(left, right);

    assertBoxedTrue(result);
  });

  // non-number != non-number
  it("returns boxed false for a boxed non-number not equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.string("abc");
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  // integer == integer
  it("returns boxed true for a boxed integer equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(1);
    const result = Erlang.$261$261(left, right);

    assertBoxedTrue(result);
  });

  // integer != integer
  it("returns boxed false for a boxed integer not equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  // integer == float
  it("returns boxed true for a boxed integer equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(1.0);
    const result = Erlang.$261$261(left, right);

    assertBoxedTrue(result);
  });

  // integer != float
  it("returns boxed false for a boxed integer not equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(2.0);
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  // integer != non-number
  it("returns boxed false when a boxed integer is compared to a boxed value of non-number type", () => {
    const left = Type.integer(1);
    const right = Type.string("1");
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  // float == float
  it("returns boxed true for a boxed float equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(1.0);
    const result = Erlang.$261$261(left, right);

    assertBoxedTrue(result);
  });

  // float != float
  it("returns boxed false for a boxed float not equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(2.0);
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  // float == integer
  it("returns boxed true for a boxed float equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(1);
    const result = Erlang.$261$261(left, right);

    assertBoxedTrue(result);
  });

  // float != integer
  it("returns boxed false for a boxed float not equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(2);
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  // float != non-number
  it("returns boxed false when a boxed float is compared to a boxed value of non-number type", () => {
    const left = Type.float(1.0);
    const right = Type.string("1.0");
    const result = Erlang.$261$261(left, right);

    assertBoxedFalse(result);
  });

  it("returns frozen object", () => {
    const value = Type.integer(1);
    const result = Erlang.$261$261(value, value);

    assertFrozen(result);
  });
});

describe("$260", () => {
  it("should return boxed true when left float argument is smaller than right float argument", () => {
    const left = Type.float(3.2);
    const right = Type.float(5.6);
    const result = Erlang.$260(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed true when left float argument is smaller than right integer argument", () => {
    const left = Type.float(3.2);
    const right = Type.integer(5);
    const result = Erlang.$260(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed true when left integer argument is smaller than right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(5.6);
    const result = Erlang.$260(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed true when left integer argument is smaller than right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(5);
    const result = Erlang.$260(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed false when left float argument is equal to right float argument", () => {
    const left = Type.float(3.0);
    const right = Type.float(3.0);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left float argument is equal to right integer argument", () => {
    const left = Type.float(3.0);
    const right = Type.integer(3);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is equal to right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(3.0);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is equal to right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(3);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left float argument is greater than right float argument", () => {
    const left = Type.float(5.6);
    const right = Type.float(3.2);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left float argument is greater than right integer argument", () => {
    const left = Type.float(5.6);
    const right = Type.integer(3);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is greater than right float argument", () => {
    const left = Type.integer(5);
    const right = Type.float(3.2);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is greater than right integer argument", () => {
    const left = Type.integer(5);
    const right = Type.integer(3);
    const result = Erlang.$260(left, right);

    assertBoxedFalse(result);
  });

  it("should throw a not yet implemented error for non-integer and non-float left argument", () => {
    const left = Type.string("abc");
    const right = Type.integer(2);

    assert.throw(
      () => {
        Erlang.$260(left, right);
      },
      Error,
      '(Hologram.NotYetImplementedError) :erlang.</2 currently supports only floats and integers, left = "abc", right = 2'
    );
  });

  it("should throw a not yet implemented error for non-integer and non-float right argument", () => {
    const left = Type.integer(2);
    const right = Type.string("abc");

    assert.throw(
      () => {
        Erlang.$260(left, right);
      },
      Error,
      '(Hologram.NotYetImplementedError) :erlang.</2 currently supports only floats and integers, left = 2, right = "abc"'
    );
  });
});

describe("$262", () => {
  it("should return boxed true when left float argument is greater than right float argument", () => {
    const left = Type.float(5.6);
    const right = Type.float(3.2);
    const result = Erlang.$262(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed true when left float argument is greater than right integer argument", () => {
    const left = Type.float(5.6);
    const right = Type.integer(3);
    const result = Erlang.$262(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed true when left integer argument is greater than right float argument", () => {
    const left = Type.integer(5);
    const right = Type.float(3.2);
    const result = Erlang.$262(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed true when left integer argument is greater than right integer argument", () => {
    const left = Type.integer(5);
    const right = Type.integer(3);
    const result = Erlang.$262(left, right);

    assertBoxedTrue(result);
  });

  it("should return boxed false when left float argument is equal to right float argument", () => {
    const left = Type.float(3.0);
    const right = Type.float(3.0);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left float argument is equal to right integer argument", () => {
    const left = Type.float(3.0);
    const right = Type.integer(3);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is equal to right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(3.0);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is equal to right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(3);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left float argument is smaller than right float argument", () => {
    const left = Type.float(3.2);
    const right = Type.float(5.6);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left float argument is smaller than right integer argument", () => {
    const left = Type.float(3.2);
    const right = Type.integer(5);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is smaller than right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(5.6);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should return boxed false when left integer argument is smaller than right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(5);
    const result = Erlang.$262(left, right);

    assertBoxedFalse(result);
  });

  it("should throw a not yet implemented error for non-integer and non-float left argument", () => {
    const left = Type.string("abc");
    const right = Type.integer(2);

    assert.throw(
      () => {
        Erlang.$262(left, right);
      },
      Error,
      '(Hologram.NotYetImplementedError) :erlang.>/2 currently supports only floats and integers, left = "abc", right = 2'
    );
  });

  it("should throw a not yet implemented error for non-integer and non-float right argument", () => {
    const left = Type.integer(2);
    const right = Type.string("abc");

    assert.throw(
      () => {
        Erlang.$262(left, right);
      },
      Error,
      '(Hologram.NotYetImplementedError) :erlang.>/2 currently supports only floats and integers, left = 2, right = "abc"'
    );
  });
});

describe("hd/1", () => {
  it("proxies to Interpreter.head/1", () => {
    const list = Type.list([Type.integer(1), Type.integer(2), Type.integer(3)]);
    const result = Erlang.hd(list);
    const expected = Interpreter.head(list);

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_atom/1", () => {
  it("proxies to Type.isAtom/1 and casts the result to boxed boolean", () => {
    const term = Type.atom("abc");
    const result = Erlang.is_atom(term);
    const expected = Type.boolean(Type.isAtom(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_float/1", () => {
  it("proxies to Type.isFloat/1 and casts the result to boxed boolean", () => {
    const term = Type.float(1.23);
    const result = Erlang.is_float(term);
    const expected = Type.boolean(Type.isFloat(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_integer/1", () => {
  it("proxies to Type.isInteger/1 and casts the result to boxed boolean", () => {
    const term = Type.integer(123);
    const result = Erlang.is_integer(term);
    const expected = Type.boolean(Type.isInteger(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_number/1", () => {
  it("proxies to Type.isNumber/1 and casts the result to boxed boolean", () => {
    const term = Type.integer(123);
    const result = Erlang.is_number(term);
    const expected = Type.boolean(Type.isNumber(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("length/1", () => {
  it("proxies to Interpreter.count/1 and casts the result to boxed integer", () => {
    const list = Type.list([Type.integer(1), Type.integer(2)]);
    const result = Erlang.length(list);
    const expected = Type.integer(Interpreter.count(list));

    assert.deepStrictEqual(result, expected);
  });
});

describe("tl/1", () => {
  it("proxies to Interpreter.tail/1", () => {
    const list = Type.list([Type.integer(1), Type.integer(2), Type.integer(3)]);
    const result = Erlang.tl(list);
    const expected = Interpreter.tail(list);

    assert.deepStrictEqual(result, expected);
  });
});
