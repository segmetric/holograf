defmodule HologramE2E.Operators.LessThanPage do
  use Hologram.Page

  route "/e2e/operators/less-than"

  def init(_params, _conn) do
    %{
      left: 1,
      right: 2.0,
      result: 0
    }
  end

  def template do
    ~H"""
    <button id="button" on:click="calculate">Calculate</button>
    <div id="text">Result = {@result}</div>
    """
  end

  def action(:calculate, _params, state) do
    Map.put(state, :result, state.left < state.right)
  end
end
