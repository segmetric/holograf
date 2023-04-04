defmodule Hologram.Compiler.ReflectionTest do
  use Hologram.Test.BasicCase, async: true
  import Hologram.Compiler.Reflection
  alias Hologram.Test.Fixtures.Compiler.Reflection.Module1

  describe "is_alias?/1" do
    test "atom which is an alias" do
      assert is_alias?(Calendar.ISO)
    end

    test "atom which is not an alias" do
      refute is_alias?(:abc)
    end

    test "non-atom" do
      refute is_alias?(123)
    end
  end

  test "list_elixir_modules/1" do
    result = list_elixir_modules([:hologram, :dialyzer, :sobelow])

    assert Mix.Tasks.Sobelow in result
    assert Sobelow.CI in result
    assert Mix.Tasks.Holo.Test.CheckFileNames in result
    assert Hologram.Commons.Parser in result

    refute :dialyzer in result
    refute :typer_core in result
  end

  test "module_beam_defs/1" do
    assert module_beam_defs(Module1) == [
             {{:fun_2, 2}, :def, [line: 6],
              [
                {[line: 6], [{:a, [version: 0, line: 6], nil}, {:b, [version: 1, line: 6], nil}],
                 [],
                 {{:., [line: 7], [:erlang, :+]}, [line: 7],
                  [{:a, [version: 0, line: 7], nil}, {:b, [version: 1, line: 7], nil}]}}
              ]},
             {{:fun_1, 0}, :def, [line: 2], [{[line: 2], [], [], :value_1}]}
           ]
  end
end
