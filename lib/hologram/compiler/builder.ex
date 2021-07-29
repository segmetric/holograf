defmodule Hologram.Compiler.Builder do
  alias Hologram.Compiler.{Context, Generator, Processor, Pruner}

  def build(module) do
    Processor.compile(module)
    |> Pruner.prune()
    |> Enum.reduce("", fn {_, ir}, acc ->
      # TODO: pass actual %Context{} struct received from compiler
      acc <> "\n" <> Generator.generate(ir, %Context{})
    end)
  end
end
