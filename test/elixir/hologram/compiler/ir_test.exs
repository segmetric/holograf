defmodule Hologram.Compiler.IRTest do
  use Hologram.Test.BasicCase, async: true
  import Hologram.Compiler.IR

  alias Hologram.Compiler.Context
  alias Hologram.Compiler.IR
  alias Hologram.Test.Fixtures.Compiler.IR.Module1

  test "for_code/1" do
    assert for_code("[1, :b]", %Context{}) == %IR.ListType{
             data: [
               %IR.IntegerType{value: 1},
               %IR.AtomType{value: :b}
             ]
           }
  end

  describe "for_module/1" do
    @expected %IR.ModuleDefinition{
      module: %IR.AtomType{
        value: Hologram.Test.Fixtures.Compiler.IR.Module1
      },
      body: %IR.Block{
        expressions: [
          %IR.FunctionDefinition{
            name: :my_fun_1,
            arity: 2,
            visibility: :public,
            clause: %IR.FunctionClause{
              params: [
                %IR.Variable{name: :x},
                %IR.Variable{name: :y}
              ],
              guards: [],
              body: %IR.Block{
                expressions: [
                  %IR.RemoteFunctionCall{
                    module: %IR.AtomType{value: :erlang},
                    function: :+,
                    args: [
                      %IR.Variable{name: :x},
                      %IR.Variable{name: :y}
                    ]
                  }
                ]
              }
            }
          },
          %IR.FunctionDefinition{
            name: :my_fun_2,
            arity: 0,
            visibility: :public,
            clause: %IR.FunctionClause{
              params: [],
              guards: [],
              body: %IR.Block{
                expressions: [
                  %IR.AnonymousFunctionType{
                    arity: 2,
                    captured_function: :my_fun_1,
                    captured_module: Module1,
                    clauses: [
                      %IR.FunctionClause{
                        params: [
                          %IR.Variable{name: :"$1"},
                          %IR.Variable{name: :"$2"}
                        ],
                        guards: [],
                        body: %IR.Block{
                          expressions: [
                            %IR.LocalFunctionCall{
                              function: :my_fun_1,
                              args: [
                                %IR.Variable{name: :"$1"},
                                %IR.Variable{name: :"$2"}
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      }
    }

    test "with BEAM path not specified" do
      assert for_module(Module1) == @expected
    end

    test "with BEAM path specified" do
      beam_path = :code.which(Module1)
      assert for_module(Module1, beam_path) == @expected
    end
  end

  test "for_term/1" do
    my_var = 123
    assert for_term(my_var) == %IR.IntegerType{value: 123}
  end
end
