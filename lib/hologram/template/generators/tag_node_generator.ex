defmodule Hologram.Template.TagNodeGenerator do
  alias Hologram.Template.{Generator, TagNodeRenderer}

  def generate(tag, attrs, children, context) do
    attrs_js =
      if Enum.any?(attrs) do
        js =
          Enum.map(attrs, fn {key, value} ->
            "'#{TagNodeRenderer.render_attr_name(key)}': '#{value}'"
          end)
          |> Enum.join(", ")

        "{ #{js} }"
      else
        "{}"
      end

      children_str =
        Enum.map(children, &Generator.generate(&1, context))
        |> Enum.join(", ")

      children_js = "[#{children_str}]"

    "{ type: 'tag_node', tag: '#{tag}', attrs: #{attrs_js}, children: #{children_js} }"
  end
end
