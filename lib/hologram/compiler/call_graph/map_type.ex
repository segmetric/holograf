# TODO: test

alias Hologram.Compiler.CallGraph
alias Hologram.Compiler.IR.MapType

defimpl CallGraph, for: MapType do
  def build(%{data: data}, call_graph, module_defs, from_vertex) do
    CallGraph.build(data, call_graph, module_defs, from_vertex)
  end
end
