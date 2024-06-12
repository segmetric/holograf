"use strict";

import Interpreter from "../../../../../assets/js/interpreter.mjs";
import Type from "../../../../../assets/js/type.mjs";

export function defineModule34Fixture() {
  Interpreter.defineElixirFunction(
    "Hologram.Test.Fixtures.Template.Renderer.Module34",
    "__props__",
    0,
    "public",
    [
      {
        params: (_context) => [],
        guards: [],
        body: (_context) => {
          return Type.list([
            Type.tuple([Type.atom("a"), Type.atom("string"), Type.list()]),
          ]);
        },
      },
    ],
  );

  Interpreter.defineElixirFunction(
    "Hologram.Test.Fixtures.Template.Renderer.Module34",
    "template",
    0,
    "public",
    [
      {
        params: (_context) => [],
        guards: [],
        body: (context) => {
          window.__hologramReturn__ = Type.anonymousFunction(
            1,
            [
              {
                params: (_context) => [Type.variablePattern("vars")],
                guards: [],
                body: (context) => {
                  Interpreter.matchOperator(
                    context.vars.vars,
                    Type.matchPlaceholder(),
                    context,
                  );
                  Interpreter.updateVarsToMatchedValues(context);
                  return Type.list([
                    Type.tuple([
                      Type.atom("expression"),
                      Type.tuple([
                        Interpreter.dotOperator(
                          context.vars.vars,
                          Type.atom("a"),
                        ),
                      ]),
                    ]),
                    Type.tuple([Type.atom("text"), Type.bitstring(",")]),
                    Type.tuple([
                      Type.atom("component"),
                      Type.atom(
                        "Elixir.Hologram.Test.Fixtures.Template.Renderer.Module35",
                      ),
                      Type.list([
                        Type.tuple([
                          Type.bitstring("cid"),
                          Type.list([
                            Type.tuple([
                              Type.atom("text"),
                              Type.bitstring("component_35"),
                            ]),
                          ]),
                        ]),
                        Type.tuple([
                          Type.bitstring("a"),
                          Type.list([
                            Type.tuple([
                              Type.atom("text"),
                              Type.bitstring("35a_prop"),
                            ]),
                          ]),
                        ]),
                      ]),
                      Type.list([
                        Type.tuple([
                          Type.atom("expression"),
                          Type.tuple([
                            Interpreter.dotOperator(
                              context.vars.vars,
                              Type.atom("b"),
                            ),
                          ]),
                        ]),
                        Type.tuple([Type.atom("text"), Type.bitstring(",")]),
                        Type.tuple([
                          Type.atom("component"),
                          Type.atom(
                            "Elixir.Hologram.Test.Fixtures.Template.Renderer.Module36",
                          ),
                          Type.list([
                            Type.tuple([
                              Type.bitstring("cid"),
                              Type.list([
                                Type.tuple([
                                  Type.atom("text"),
                                  Type.bitstring("component_36"),
                                ]),
                              ]),
                            ]),
                            Type.tuple([
                              Type.bitstring("a"),
                              Type.list([
                                Type.tuple([
                                  Type.atom("text"),
                                  Type.bitstring("36a_prop"),
                                ]),
                              ]),
                            ]),
                          ]),
                          Type.list([
                            Type.tuple([
                              Type.atom("expression"),
                              Type.tuple([
                                Interpreter.dotOperator(
                                  context.vars.vars,
                                  Type.atom("c"),
                                ),
                              ]),
                            ]),
                            Type.tuple([
                              Type.atom("text"),
                              Type.bitstring(","),
                            ]),
                            Type.tuple([
                              Type.atom("element"),
                              Type.bitstring("slot"),
                              Type.list(),
                              Type.list(),
                            ]),
                            Type.tuple([
                              Type.atom("text"),
                              Type.bitstring(","),
                            ]),
                            Type.tuple([
                              Type.atom("expression"),
                              Type.tuple([
                                Interpreter.dotOperator(
                                  context.vars.vars,
                                  Type.atom("x"),
                                ),
                              ]),
                            ]),
                            Type.tuple([
                              Type.atom("text"),
                              Type.bitstring(","),
                            ]),
                          ]),
                        ]),
                        Type.tuple([
                          Type.atom("expression"),
                          Type.tuple([
                            Interpreter.dotOperator(
                              context.vars.vars,
                              Type.atom("y"),
                            ),
                          ]),
                        ]),
                        Type.tuple([Type.atom("text"), Type.bitstring(",")]),
                      ]),
                    ]),
                    Type.tuple([
                      Type.atom("expression"),
                      Type.tuple([
                        Interpreter.dotOperator(
                          context.vars.vars,
                          Type.atom("z"),
                        ),
                      ]),
                    ]),
                  ]);
                },
              },
            ],
            context,
          );
          Interpreter.updateVarsToMatchedValues(context);
          return window.__hologramReturn__;
        },
      },
    ],
  );
}
