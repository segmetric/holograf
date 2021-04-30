defmodule Hologram.TemplateEngine.IRGenerator do
  alias Hologram.TemplateEngine.AST.{Expression, TagNode, TextNode}
  alias Hologram.TemplateEngine.Renderer
  alias Hologram.Transpiler
  alias Hologram.Transpiler.AST.ModuleAttribute

  def generate(ast, context \\ [module_attributes: []])

  def generate(%Expression{ast: ast}, context) do
    "{ type: 'expression', ast: #{Transpiler.Generator.generate(ast)} }"
  end

  def generate(%TagNode{attrs: attrs, children: children, tag: tag}, context) do
    attrs_js =
      if Enum.any?(attrs) do
        js =
          Enum.map(attrs, fn {key, value} ->
            "'#{Renderer.render_attr_name(key)}': '#{value}'"
          end)
          |> Enum.join(", ")

        "{ #{js} }"
      else
        "{}"
      end

      children_str =
        Enum.map(children, &generate(&1, context))
        |> Enum.join(", ")

      children_js = "[#{children_str}]"

    "{ type: 'tag_node', tag: '#{tag}', attrs: #{attrs_js}, children: #{children_js} }"
  end

  def generate(%TextNode{text: text}, _) do
    "{ type: 'text_node', text: '#{text}' }"
  end

  def generate(nodes, state) when is_list(nodes) do
    module_attributes =
      Enum.map(state, fn {key, value} ->
        %ModuleAttribute{name: key, value: value}
      end)

    context = [module_attributes: module_attributes]

    nodes_js =
      Enum.map(nodes, &generate(&1, context))
      |> Enum.join(", ")

    "[#{nodes_js}]"
  end
end
