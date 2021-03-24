defmodule Holograf.Transpiler.Transformer do
  alias Holograf.Transpiler.AST.{AtomType, BooleanType, IntegerType, StringType}
  alias Holograf.Transpiler.AST.{ListType, MapType, StructType}
  alias Holograf.Transpiler.AST.MatchOperator
  alias Holograf.Transpiler.AST.MapAccess
  alias Holograf.Transpiler.AST.{Alias, Call, Function, Module, Variable}

  def transform(ast, aliases \\ %{})

  # PRIMITIVE TYPES

  # boolean must be before atom
  def transform(ast, _aliases) when is_boolean(ast) do
    %BooleanType{value: ast}
  end

  def transform(ast, _aliases) when is_atom(ast) do
    %AtomType{value: ast}
  end

  def transform(ast, _aliases) when is_integer(ast) do
    %IntegerType{value: ast}
  end

  def transform(ast, _aliases) when is_binary(ast) do
    %StringType{value: ast}
  end

  # DATA STRUCTURES

  def transform(ast, aliases) when is_list(ast) do
    data = Enum.map(ast, fn v -> transform(v, aliases) end)
    %ListType{data: data}
  end

  def transform({:%{}, _, ast}, aliases) do
    data = Enum.map(ast, fn {k, v} ->
      {transform(k, aliases), transform(v, aliases)}
    end)

    %MapType{data: data}
  end

  def transform({:%, _, [{_, _, module}, ast]}, aliases) do
    data = transform(ast, aliases).data

    key = List.last(module)

    module =
      if Map.has_key?(aliases, key) do
        aliases[key]
      else
        module
      end

    %StructType{module: module, data: data}
  end

  # OPERATORS

  def transform({:=, _, [left, right]}, aliases) do
    left = transform(left, aliases)

    %MatchOperator{
      bindings: aggregate_bindings(left),
      left: left,
      right: transform(right, aliases)
    }
  end

  defp aggregate_bindings(_, path \\ [])

  defp aggregate_bindings(%Variable{name: name} = var, path) do
    [[var] ++ path]
  end

  defp aggregate_bindings(%MapType{data: data}, path) do
    Enum.reduce(data, [], fn {k, v}, acc ->
      acc ++ aggregate_bindings(v, path ++ [%MapAccess{key: k}])
    end)
  end

  defp aggregate_bindings(_, path) do
    []
  end

  # OTHER

  def transform({:alias, _, [{:__aliases__, _, module}]}, _aliases) do
    %Alias{module: module}
  end

  def transform({:def, _, [{name, _, params}, [do: body]]}, aliases) do
    params = Enum.map(params, fn param -> transform(param, aliases) end)

    bindings =
      Enum.map(params, fn param ->
        aggregate_bindings(param)
        |> hd()
      end)

    body =
      case body do
        {:__block__, _, block} ->
          block
        expr ->
          [expr]
      end
      |> Enum.map(fn expr -> transform(expr, aliases) end)

    %Function{name: name, params: params, bindings: bindings, body: body}
  end

  def transform({:defmodule, _, [{_, _, name}, [do: {_, _, ast}]]}, _aliases) do
    aliases = aggregate_aliases(ast)
    functions = aggregate_functions(ast, aliases.map)

    %Module{name: name, aliases: aliases, functions: functions}
  end

  defp aggregate_aliases(ast) do
    list =
      Enum.reduce(ast, [], fn expr, acc ->
        case expr do
          {:alias, _, _} ->
            acc ++ [transform(expr)]
          _ ->
            acc
        end
      end)

    map =
      Enum.reduce(list, %{}, fn elem, acc ->
        Map.put(acc, List.last(elem.module), elem.module)
      end)

    %{list: list, map: map}
  end

  defp aggregate_functions(ast, aliases) do
    Enum.reduce(ast, [], fn expr, acc ->
      case expr do
        {:def, _, _} ->
          acc ++ [transform(expr, aliases)]
        _ ->
          acc
      end
    end)
  end

  def transform({name, _, nil}, _aliases) when is_atom(name) do
    %Variable{name: name}
  end

  def transform({function, _, params}, aliases) when is_atom(function) do
    params = transform_call_params(params, aliases)
    %Call{function: function, params: params}
  end

  def transform({{:., _, [{:__aliases__, _, module}, function]}, _, params}, aliases) do
    params = transform_call_params(params, aliases)
    %Call{module: module, function: function, params: params}
  end

  defp transform_call_params(params, aliases) do
    Enum.map(params, fn param -> transform(param, aliases) end)
  end
end
