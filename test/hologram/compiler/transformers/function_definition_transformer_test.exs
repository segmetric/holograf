defmodule Hologram.Compiler.FunctionDefinitionTransformerTest do
  use Hologram.Test.UnitCase, async: true

  alias Hologram.Compiler.{Context, FunctionDefinitionTransformer}
  alias Hologram.Compiler.IR.{AtomType, FunctionDefinition, FunctionHead, IntegerType, MapAccess, Variable}

  @code """
  def test(1, 2) do
  end
  """

  @context %Context{module: Abc}

  test "module" do
    ast = ast(@code)

    assert %FunctionDefinition{module: Abc} =
              FunctionDefinitionTransformer.transform(ast, @context)
  end

  test "name" do
    ast = ast(@code)

    assert %FunctionDefinition{name: :test} =
              FunctionDefinitionTransformer.transform(ast, @context)
  end

  test "arity" do
    ast = ast(@code)

    assert %FunctionDefinition{arity: 2} =
              FunctionDefinitionTransformer.transform(ast, @context)
  end

  test "params" do
    code = """
    def test(a, b) do
    end
    """

    ast = ast(code)

    assert %FunctionDefinition{} =
              result = FunctionDefinitionTransformer.transform(ast, @context)

    expected = [
      %Variable{name: :a},
      %Variable{name: :b}
    ]

    assert result.params == expected
  end

  test "bindings" do
    code = """
    def test(1, %{a: x, b: y}) do
    end
    """

    ast = ast(code)

    assert %FunctionDefinition{} =
              result = FunctionDefinitionTransformer.transform(ast, @context)

    expected = [
      x:
        {1,
          [
            %MapAccess{
              key: %AtomType{value: :a}
            },
            %Variable{name: :x}
          ]},
      y:
        {1,
          [
            %MapAccess{
              key: %AtomType{value: :b}
            },
            %Variable{name: :y}
          ]}
    ]

    assert result.bindings == expected
  end

  test "body, single expression" do
    code = """
    def test do
      1
    end
    """

    ast = ast(code)

    assert %FunctionDefinition{} =
              result = FunctionDefinitionTransformer.transform(ast, @context)

    assert result.body == [%IntegerType{value: 1}]
  end

  test "body, multiple expressions" do
    code = """
    def test do
      1
      2
    end
    """

    ast = ast(code)

    assert %FunctionDefinition{} =
              result = FunctionDefinitionTransformer.transform(ast, @context)

    expected = [
      %IntegerType{value: 1},
      %IntegerType{value: 2}
    ]

    assert result.body == expected
  end

  test "visibility public" do
    ast = ast(@code)

    assert %FunctionDefinition{visibility: :public} =
              FunctionDefinitionTransformer.transform(ast, @context)
  end

  test "visibility private" do
    code = """
    defp test(1, 2) do
    end
    """

    ast = ast(code)

    assert %FunctionDefinition{visibility: :private} =
              FunctionDefinitionTransformer.transform(ast, @context)
  end

  test "handles function definitions generated by macros" do
    ast =
      {:def, [context: Abc.Bcd, import: Kernel],
        [
          {:route, [context: Abc.Bcd], Abc.Bcd},
          [do: {:__block__, [], ["test"]}]
        ]}

    assert %FunctionDefinition{} = FunctionDefinitionTransformer.transform(ast, @context)
  end

  test "function head" do
    code = "def test(a, b)"
    ast = ast(code)

    assert %FunctionHead{} = FunctionDefinitionTransformer.transform(ast, %Context{})
  end
end
