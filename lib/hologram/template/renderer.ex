defmodule Hologram.Template.Renderer do
  alias Hologram.Template.{ExpressionRenderer, TagNodeRenderer}
  alias Hologram.Template.VirtualDOM.{Expression, TagNode, TextNode}

  def render(virtual_dom, state \\ %{})

  def render(nodes, state) when is_list(nodes) do
    Enum.map(nodes, &render(&1, state))
    |> Enum.join("")
  end

  def render(%Expression{ir: ir}, state) do
    ExpressionRenderer.render(ir, state)
  end

  def render(%TagNode{attrs: attrs, children: children, tag: tag}, state) do
    TagNodeRenderer.render(tag, attrs, children, state)
  end

  def render(%TextNode{text: text}, _state) do
    text
  end
end
