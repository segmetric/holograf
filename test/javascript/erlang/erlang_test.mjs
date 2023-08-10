"use strict";

import {
  assert,
  assertBoxedFalse,
  assertBoxedTrue,
  assertError,
  linkModules,
  unlinkModules,
} from "../../../assets/js/test_support.mjs";

import Erlang from "../../../assets/js/erlang/erlang.mjs";
import Interpreter from "../../../assets/js/interpreter.mjs";
import Type from "../../../assets/js/type.mjs";

before(() => linkModules());
after(() => unlinkModules());

describe("+/2", () => {
  it("adds integer and integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);

    const result = Erlang["+/2"](left, right);
    const expected = Type.integer(3);

    assert.deepStrictEqual(result, expected);
  });

  it("adds integer and float", () => {
    const left = Type.integer(1);
    const right = Type.float(2.0);

    const result = Erlang["+/2"](left, right);
    const expected = Type.float(3.0);

    assert.deepStrictEqual(result, expected);
  });

  it("adds float and integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(2);

    const result = Erlang["+/2"](left, right);
    const expected = Type.float(3.0);

    assert.deepStrictEqual(result, expected);
  });

  it("adds float and float", () => {
    const left = Type.float(1.0);
    const right = Type.float(2.0);

    const result = Erlang["+/2"](left, right);
    const expected = Type.float(3.0);

    assert.deepStrictEqual(result, expected);
  });
});

describe("-/2", () => {
  it("subtracts integer and integer", () => {
    const left = Type.integer(3);
    const right = Type.integer(1);

    const result = Erlang["-/2"](left, right);
    const expected = Type.integer(2);

    assert.deepStrictEqual(result, expected);
  });

  it("subtracts integer and float", () => {
    const left = Type.integer(3);
    const right = Type.float(1.0);

    const result = Erlang["-/2"](left, right);
    const expected = Type.float(2.0);

    assert.deepStrictEqual(result, expected);
  });

  it("subtracts float and integer", () => {
    const left = Type.float(3.0);
    const right = Type.integer(1);

    const result = Erlang["-/2"](left, right);
    const expected = Type.float(2.0);

    assert.deepStrictEqual(result, expected);
  });

  it("subtracts float and float", () => {
    const left = Type.float(3.0);
    const right = Type.float(1.0);

    const result = Erlang["-/2"](left, right);
    const expected = Type.float(2.0);

    assert.deepStrictEqual(result, expected);
  });
});

describe("/=/2", () => {
  // non-number == non-number
  it("returns boxed false for a boxed non-number equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.boolean(true);
    const result = Erlang["/=/2"](left, right);

    assertBoxedFalse(result);
  });

  // non-number != non-number
  it("returns boxed true for a boxed non-number not equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.string("abc");
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });

  // integer == integer
  it("returns boxed false for a boxed integer equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(1);
    const result = Erlang["/=/2"](left, right);

    assertBoxedFalse(result);
  });

  // integer != integer
  it("returns boxed true for a boxed integer not equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });

  // integer == float
  it("returns boxed false for a boxed integer equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(1.0);
    const result = Erlang["/=/2"](left, right);

    assertBoxedFalse(result);
  });

  // integer != float
  it("returns boxed true for a boxed integer not equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(2.0);
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });

  // integer != non-number
  it("returns boxed true when a boxed integer is compared to a boxed value of non-number type", () => {
    const left = Type.integer(1);
    const right = Type.string("1");
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });

  // float == float
  it("returns boxed false for a boxed float equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(1.0);
    const result = Erlang["/=/2"](left, right);

    assertBoxedFalse(result);
  });

  // float != float
  it("returns boxed true for a boxed float not equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(2.0);
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });

  // float == integer
  it("returns boxed false for a boxed float equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(1);
    const result = Erlang["/=/2"](left, right);

    assertBoxedFalse(result);
  });

  // float != integer
  it("returns boxed true for a boxed float not equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(2);
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });

  // float != non-number
  it("returns boxed true when a boxed float is compared to a boxed value of non-number type", () => {
    const left = Type.float(1.0);
    const right = Type.string("1.0");
    const result = Erlang["/=/2"](left, right);

    assertBoxedTrue(result);
  });
});

describe("</2", () => {
  it("returns boxed true when left float argument is smaller than right float argument", () => {
    const left = Type.float(3.2);
    const right = Type.float(5.6);
    const result = Erlang["</2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed true when left float argument is smaller than right integer argument", () => {
    const left = Type.float(3.2);
    const right = Type.integer(5);
    const result = Erlang["</2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed true when left integer argument is smaller than right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(5.6);
    const result = Erlang["</2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed true when left integer argument is smaller than right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(5);
    const result = Erlang["</2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed false when left float argument is equal to right float argument", () => {
    const left = Type.float(3.0);
    const right = Type.float(3.0);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left float argument is equal to right integer argument", () => {
    const left = Type.float(3.0);
    const right = Type.integer(3);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is equal to right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(3.0);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is equal to right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(3);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left float argument is greater than right float argument", () => {
    const left = Type.float(5.6);
    const right = Type.float(3.2);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left float argument is greater than right integer argument", () => {
    const left = Type.float(5.6);
    const right = Type.integer(3);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is greater than right float argument", () => {
    const left = Type.integer(5);
    const right = Type.float(3.2);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is greater than right integer argument", () => {
    const left = Type.integer(5);
    const right = Type.integer(3);
    const result = Erlang["</2"](left, right);

    assertBoxedFalse(result);
  });

  it("throws a not yet implemented error for non-integer and non-float left argument", () => {
    const left = Type.string("abc");
    const right = Type.integer(2);

    const expectedMessage =
      ':erlang.</2 currently supports only floats and integers, left = "abc", right = 2';

    assertError(
      () => Erlang["</2"](left, right),
      "Hologram.InterpreterError",
      expectedMessage,
    );
  });

  it("throws a not yet implemented error for non-integer and non-float right argument", () => {
    const left = Type.integer(2);
    const right = Type.string("abc");

    const expectedMessage =
      ':erlang.</2 currently supports only floats and integers, left = 2, right = "abc"';

    assertError(
      () => Erlang["</2"](left, right),
      "Hologram.InterpreterError",
      expectedMessage,
    );
  });
});

describe("=:=/2", () => {
  it("proxies to Interpreter.isStrictlyEqual/2 and casts the result to boxed boolean", () => {
    const left = Type.integer(1);
    const right = Type.integer(1);
    const result = Erlang["=:=/2"](left, right);
    const expected = Type.boolean(Interpreter.isStrictlyEqual(left, right));

    assert.deepStrictEqual(result, expected);
  });
});

describe("==/2", () => {
  // non-number == non-number
  it("returns boxed true for a boxed non-number equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.boolean(true);
    const result = Erlang["==/2"](left, right);

    assertBoxedTrue(result);
  });

  // non-number != non-number
  it("returns boxed false for a boxed non-number not equal to another boxed non-number", () => {
    const left = Type.boolean(true);
    const right = Type.string("abc");
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });

  // integer == integer
  it("returns boxed true for a boxed integer equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(1);
    const result = Erlang["==/2"](left, right);

    assertBoxedTrue(result);
  });

  // integer != integer
  it("returns boxed false for a boxed integer not equal to another boxed integer", () => {
    const left = Type.integer(1);
    const right = Type.integer(2);
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });

  // integer == float
  it("returns boxed true for a boxed integer equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(1.0);
    const result = Erlang["==/2"](left, right);

    assertBoxedTrue(result);
  });

  // integer != float
  it("returns boxed false for a boxed integer not equal to a boxed float", () => {
    const left = Type.integer(1);
    const right = Type.float(2.0);
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });

  // integer != non-number
  it("returns boxed false when a boxed integer is compared to a boxed value of non-number type", () => {
    const left = Type.integer(1);
    const right = Type.string("1");
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });

  // float == float
  it("returns boxed true for a boxed float equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(1.0);
    const result = Erlang["==/2"](left, right);

    assertBoxedTrue(result);
  });

  // float != float
  it("returns boxed false for a boxed float not equal to another boxed float", () => {
    const left = Type.float(1.0);
    const right = Type.float(2.0);
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });

  // float == integer
  it("returns boxed true for a boxed float equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(1);
    const result = Erlang["==/2"](left, right);

    assertBoxedTrue(result);
  });

  // float != integer
  it("returns boxed false for a boxed float not equal to a boxed integer", () => {
    const left = Type.float(1.0);
    const right = Type.integer(2);
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });

  // float != non-number
  it("returns boxed false when a boxed float is compared to a boxed value of non-number type", () => {
    const left = Type.float(1.0);
    const right = Type.string("1.0");
    const result = Erlang["==/2"](left, right);

    assertBoxedFalse(result);
  });
});

describe(">/2", () => {
  it("returns boxed true when left float argument is greater than right float argument", () => {
    const left = Type.float(5.6);
    const right = Type.float(3.2);
    const result = Erlang[">/2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed true when left float argument is greater than right integer argument", () => {
    const left = Type.float(5.6);
    const right = Type.integer(3);
    const result = Erlang[">/2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed true when left integer argument is greater than right float argument", () => {
    const left = Type.integer(5);
    const right = Type.float(3.2);
    const result = Erlang[">/2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed true when left integer argument is greater than right integer argument", () => {
    const left = Type.integer(5);
    const right = Type.integer(3);
    const result = Erlang[">/2"](left, right);

    assertBoxedTrue(result);
  });

  it("returns boxed false when left float argument is equal to right float argument", () => {
    const left = Type.float(3.0);
    const right = Type.float(3.0);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left float argument is equal to right integer argument", () => {
    const left = Type.float(3.0);
    const right = Type.integer(3);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is equal to right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(3.0);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is equal to right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(3);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left float argument is smaller than right float argument", () => {
    const left = Type.float(3.2);
    const right = Type.float(5.6);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left float argument is smaller than right integer argument", () => {
    const left = Type.float(3.2);
    const right = Type.integer(5);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is smaller than right float argument", () => {
    const left = Type.integer(3);
    const right = Type.float(5.6);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("returns boxed false when left integer argument is smaller than right integer argument", () => {
    const left = Type.integer(3);
    const right = Type.integer(5);
    const result = Erlang[">/2"](left, right);

    assertBoxedFalse(result);
  });

  it("throws a not yet implemented error for non-integer and non-float left argument", () => {
    const left = Type.string("abc");
    const right = Type.integer(2);

    const expectedMessage =
      ':erlang.>/2 currently supports only floats and integers, left = "abc", right = 2';

    assertError(
      () => Erlang[">/2"](left, right),
      "Hologram.InterpreterError",
      expectedMessage,
    );
  });

  it("throws a not yet implemented error for non-integer and non-float right argument", () => {
    const left = Type.integer(2);
    const right = Type.string("abc");

    const expectedMessage =
      ':erlang.>/2 currently supports only floats and integers, left = 2, right = "abc"';

    assertError(
      () => Erlang[">/2"](left, right),
      "Hologram.InterpreterError",
      expectedMessage,
    );
  });
});

it("error/1", () => {
  const reason = {a: 1, b: 2};

  assert.throw(
    () => {
      Erlang["error/1"](reason);
    },
    Error,
    '__hologram__:{"a":1,"b":2}',
  );
});

it("error/2", () => {
  const reason = {a: 1, b: 2};
  const args = Type.list([Type.integer(1, Type.integer(2))]);

  assert.throw(
    () => {
      Erlang["error/2"](reason, args);
    },
    Error,
    '__hologram__:{"a":1,"b":2}',
  );
});

describe("hd/1", () => {
  it("returns the first item in a boxed list", () => {
    const list = Type.list([Type.integer(1), Type.integer(2), Type.integer(3)]);
    const result = Erlang["hd/1"](list);

    assert.deepStrictEqual(result, Type.integer(1));
  });

  it("raises ArgumentError if the argument is an empty boxed list", () => {
    assertError(
      () => Erlang["hd/1"](Type.list([])),
      "ArgumentError",
      "errors were found at the given arguments:\n\n* 1st argument: not a nonempty list",
    );
  });

  it("raises ArgumentError if the argument is not a boxed list", () => {
    assertError(
      () => Erlang["hd/1"](Type.integer(123)),
      "ArgumentError",
      "errors were found at the given arguments:\n\n* 1st argument: not a nonempty list",
    );
  });
});

describe("is_atom/1", () => {
  it("proxies to Type.isAtom/1 and casts the result to boxed boolean", () => {
    const term = Type.atom("abc");
    const result = Erlang["is_atom/1"](term);
    const expected = Type.boolean(Type.isAtom(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_float/1", () => {
  it("proxies to Type.isFloat/1 and casts the result to boxed boolean", () => {
    const term = Type.float(1.23);
    const result = Erlang["is_float/1"](term);
    const expected = Type.boolean(Type.isFloat(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_integer/1", () => {
  it("proxies to Type.isInteger/1 and casts the result to boxed boolean", () => {
    const term = Type.integer(123);
    const result = Erlang["is_integer/1"](term);
    const expected = Type.boolean(Type.isInteger(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("is_number/1", () => {
  it("proxies to Type.isNumber/1 and casts the result to boxed boolean", () => {
    const term = Type.integer(123);
    const result = Erlang["is_number/1"](term);
    const expected = Type.boolean(Type.isNumber(term));

    assert.deepStrictEqual(result, expected);
  });
});

describe("length/1", () => {
  it("returns the number of items in a boxed list", () => {
    const list = Type.list([Type.integer(1), Type.integer(2)]);
    const result = Erlang["length/1"](list);

    assert.deepStrictEqual(result, Type.integer(2));
  });

  it("raises ArgumentError if the argument is not a boxed list", () => {
    assertError(
      () => Erlang["length/1"](Type.integer(123)),
      "ArgumentError",
      "errors were found at the given arguments:\n\n* 1st argument: not a list",
    );
  });
});

describe("tl/1", () => {
  describe("proper list", () => {
    it("1 item", () => {
      const list = Type.list([Type.integer(1)]);
      const result = Erlang["tl/1"](list);
      const expected = Type.list([]);

      assert.deepStrictEqual(result, expected);
    });

    it("2 items", () => {
      const list = Type.list([Type.integer(1), Type.integer(2)]);
      const result = Erlang["tl/1"](list);
      const expected = Type.list([Type.integer(2)]);

      assert.deepStrictEqual(result, expected);
    });

    it("3 items", () => {
      const list = Type.list([
        Type.integer(1),
        Type.integer(2),
        Type.integer(3),
      ]);

      const result = Erlang["tl/1"](list);
      const expected = Type.list([Type.integer(2), Type.integer(3)]);

      assert.deepStrictEqual(result, expected);
    });
  });

  describe("improper list", () => {
    it("2 items", () => {
      const list = Type.improperList([Type.integer(1), Type.integer(2)]);
      const result = Erlang["tl/1"](list);
      const expected = Type.integer(2);

      assert.deepStrictEqual(result, expected);
    });

    it("3 items", () => {
      const list = Type.improperList([
        Type.integer(1),
        Type.integer(2),
        Type.integer(3),
      ]);

      const result = Erlang["tl/1"](list);
      const expected = Type.improperList([Type.integer(2), Type.integer(3)]);

      assert.deepStrictEqual(result, expected);
    });
  });

  describe("errors", () => {
    it("raises ArgumentError if the argument is an empty boxed list", () => {
      assertError(
        () => Erlang["tl/1"](Type.list([])),
        "ArgumentError",
        "errors were found at the given arguments:\n\n* 1st argument: not a nonempty list",
      );
    });

    it("raises ArgumentError if the argument is not a boxed list", () => {
      assertError(
        () => Erlang["tl/1"](Type.integer(123)),
        "ArgumentError",
        "errors were found at the given arguments:\n\n* 1st argument: not a nonempty list",
      );
    });
  });
});
