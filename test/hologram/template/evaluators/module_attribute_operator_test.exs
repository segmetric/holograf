defmodule Hologram.Template.Evaluator.ModuleAttributeOperatorTest do
  use Hologram.Test.UnitCase, async: true

  alias Hologram.Compiler.IR.ModuleAttributeOperator
  alias Hologram.Template.Evaluator

  test "evaluate/2" do
    ir = %ModuleAttributeOperator{name: :a}
    bindings = %{a: 123}

    result = Evaluator.evaluate(ir, bindings)
    expected = 123

    assert result == expected
  end
end
