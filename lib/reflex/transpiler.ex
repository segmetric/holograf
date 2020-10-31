defmodule Reflex.Transpiler do
  def meta(var) when is_binary(var) do
    {:string, var}
  end

  def meta(var) when is_integer(var) do
    {:integer, var}
  end

  def parse!(str) do
    case Code.string_to_quoted(str) do
      {:ok, ast} ->
        ast

      _ ->
        raise "Invalid code"
    end
  end

  def parse_file(path) do
    path
    |> File.read!()
    |> Code.string_to_quoted()
  end

  def transpile(ast)

  def transpile(ast) when is_binary(ast) do
    {:string, ast}
  end

  def transpile(ast) when is_integer(ast) do
    {:integer, ast}
  end

  def transpile(ast) when is_boolean(ast) do
    {:boolean, ast}
  end

  def transpile(ast) when is_atom(ast) do
    {:atom, ast}
  end

  def transpile({:%{}, _, map}) do
    {:map, Enum.map(map, fn {k, v} -> {k, transpile(v)} end)}
  end

  def transpile({:if, _, [condition, [do: do_block, else: else_block]]}) do
    {:if, {transpile(condition), transpile(do_block), transpile(else_block)}}
  end
end
