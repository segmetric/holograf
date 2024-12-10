defmodule HologramFeatureTests.TemplateMarkup.ForBlockPage do
  use Hologram.Page

  route "/template-markup/for-block"

  layout HologramFeatureTests.Components.DefaultLayout

  def template do
    ~H"""
    <div id="block_1">
      {%for n <- [1, 2, 3]}
        <div id="item_{n}" class="item">text_{n}</div>
      {/for}
    </div>

    <div id="block_2">
      abc{%for n <- []}{n}{/for}xyz
    </div>
    """
  end
end
