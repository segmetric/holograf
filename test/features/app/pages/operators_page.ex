defmodule HologramFeatureTests.OperatorsPage do
  use Hologram.Page
  
  route "/operators"
  
  layout HologramFeatureTests.Components.DefaultLayout
  
  def init(_params, component, _server) do
    put_state(component, integer_a: 123, integer_b: 234, result: nil)
  end
  
  def template do
    ~H"""
    <p>
      <button id="+" $click={:+, left: @integer_a, right: @integer_b}> + </button>
      <button id="*" $click={:*, left: @integer_a, right: @integer_b}> * </button>
    </p>
    <p>
      Result: <strong id="result">{inspect(@result)}</strong>
    </p>
    """
  end
  
  def action(:+, %{left: left, right: right}, component) do
    put_state(component, :result, left + right)
  end
  
  def action(:*, %{left: left, right: right}, component) do
    put_state(component, :result, left * right)
  end
end
