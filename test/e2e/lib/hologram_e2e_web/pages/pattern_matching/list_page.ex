defmodule HologramE2E.PatternMatching.ListPage do
  use Hologram.Page

  route "/e2e/pattern-matching/list"

  def init(_params, _conn) do
    %{
      case_condition_value: [3, 4],
      function_call_value: [2, 3],
      match_expression_value: [1, 2],
      result: 0
    }
  end

  def template do
    ~H"""
    <button id="button_match_expression" on:click="test_match_expression">Test match expression</button>
    <button id="button_function_call" on:click="test_function_call">Test function call</button>
    <button id="button_case_condition" on:click="test_case_condition">Test case condition</button>
    <div id="text">Result = {@result}</div>
    """
  end

  def action(:test_match_expression, _params, state) do
    [a, b] = state.match_expression_value
    Map.put(state, :result, a + b)
  end

  def action(:test_function_call, _params, state) do
    result = dummy_function(state.function_call_value)
    Map.put(state, :result, result)
  end

  def action(:test_case_condition, _params, state) do
    result =
      case state.case_condition_value do
        123 ->
          :not_matched

        [a, b] ->
          a + b

        _ ->
          :default_match
      end

    Map.put(state, :result, result)
  end

  defp dummy_function([a, b]) do
    a + b
  end
end
