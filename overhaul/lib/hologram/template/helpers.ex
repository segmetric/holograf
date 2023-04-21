defmodule Hologram.Template.Helpers do
  # see: https://html.spec.whatwg.org/multipage/syntax.html#void-elements
  @void_html_elements [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]

  # TODO: specify void SVG elements
  # see: https://github.com/segmetric/hologram/issues/21
  # see: https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  @void_svg_elements ["path", "rect"]

  def void_element?(tag_name) do
    void_html_element?(tag_name) || void_svg_element?(tag_name) || tag_name == "slot"
  end

  defp void_html_element?(tag_name) do
    tag_name in @void_html_elements
  end

  defp void_svg_element?(tag_name) do
    tag_name in @void_svg_elements
  end
end
