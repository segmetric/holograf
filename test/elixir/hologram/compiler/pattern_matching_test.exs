defmodule Hologram.Compiler.PatternMatchingTest do
  use Hologram.Test.UnitCase, async: true
  import Hologram.Compiler.PatternMatching
  alias Hologram.Compiler.IR

  describe "literal value" do
    test "left side" do
      # 1
      ir = %IR.IntegerType{value: 1}

      assert deconstruct(ir, :left) == [[left_value: %IR.IntegerType{value: 1}]]
    end

    test "right side" do
      # 1
      ir = %IR.IntegerType{value: 1}

      assert deconstruct(ir, :right) == [[:right_value]]
    end
  end

  describe "symbol" do
    test "left side" do
      # a
      ir = %IR.Symbol{name: :a}

      assert deconstruct(ir, :left) == [[binding: :a]]
    end

    test "right side" do
      # a
      ir = %IR.Symbol{name: :a}

      assert deconstruct(ir, :right) == [[:right_value]]
    end
  end

  describe "cons operator" do
    # [a | [1, 2]]
    @ir_1 %IR.ConsOperator{
      head: %IR.Symbol{name: :a},
      tail: %IR.ListType{
        data: [
          %IR.IntegerType{value: 1},
          %IR.IntegerType{value: 2}
        ]
      }
    }

    # [1 | [2, a]]
    @ir_2 %IR.ConsOperator{
      head: %IR.IntegerType{value: 1},
      tail: %IR.ListType{
        data: [
          %IR.IntegerType{value: 2},
          %IR.Symbol{name: :a}
        ]
      }
    }

    # [1 | [2 | [3, a]]]
    @ir_3 %IR.ConsOperator{
      head: %IR.IntegerType{value: 1},
      tail: %IR.ConsOperator{
        head: %IR.IntegerType{value: 2},
        tail: %IR.ListType{
          data: [
            %IR.IntegerType{value: 3},
            %IR.Symbol{name: :a}
          ]
        }
      }
    }

    test "non-nested cons operator with symbol in head, left side" do
      assert deconstruct(@ir_1, :left) == [
               [binding: :a, list_index: 0],
               [
                 {:left_value, %IR.IntegerType{value: 1}},
                 {:list_index, 0},
                 :list_tail
               ],
               [
                 {:left_value, %IR.IntegerType{value: 2}},
                 {:list_index, 1},
                 :list_tail
               ]
             ]
    end

    test "non-nested cons operator with symbol in head, right side" do
      assert deconstruct(@ir_1, :right) == [
               [:right_value, {:list_index, 0}],
               [:right_value, {:list_index, 0}, :list_tail],
               [:right_value, {:list_index, 1}, :list_tail]
             ]
    end

    test "non-nested cons operator with symbol in tail, left side" do
      assert deconstruct(@ir_2, :left) == [
               [left_value: %IR.IntegerType{value: 1}, list_index: 0],
               [
                 {:left_value, %IR.IntegerType{value: 2}},
                 {:list_index, 0},
                 :list_tail
               ],
               [{:binding, :a}, {:list_index, 1}, :list_tail]
             ]
    end

    test "non-nested cons operator with symbol in tail, right side" do
      assert deconstruct(@ir_2, :right) == [
               [:right_value, {:list_index, 0}],
               [:right_value, {:list_index, 0}, :list_tail],
               [:right_value, {:list_index, 1}, :list_tail]
             ]
    end

    test "nested cons operator, left side" do
      assert deconstruct(@ir_3, :left) == [
               [left_value: %IR.IntegerType{value: 1}, list_index: 0],
               [
                 {:left_value, %IR.IntegerType{value: 2}},
                 {:list_index, 0},
                 :list_tail
               ],
               [
                 {:left_value, %IR.IntegerType{value: 3}},
                 {:list_index, 0},
                 :list_tail,
                 :list_tail
               ],
               [{:binding, :a}, {:list_index, 1}, :list_tail, :list_tail]
             ]
    end

    test "nested cons operator, right side" do
      assert deconstruct(@ir_3, :right) == [
               [:right_value, {:list_index, 0}],
               [:right_value, {:list_index, 0}, :list_tail],
               [:right_value, {:list_index, 0}, :list_tail, :list_tail],
               [:right_value, {:list_index, 1}, :list_tail, :list_tail]
             ]
    end
  end

  describe "list type" do
    # [1, a]
    @non_nested_list %IR.ListType{
      data: [
        %IR.IntegerType{value: 1},
        %IR.Symbol{name: :a}
      ]
    }

    # [a, [1, b]]
    @nested_list %IR.ListType{
      data: [
        %IR.Symbol{name: :a},
        %IR.ListType{
          data: [
            %IR.IntegerType{value: 1},
            %IR.Symbol{name: :b}
          ]
        }
      ]
    }

    test "non-nested list, left side" do
      assert deconstruct(@non_nested_list, :left) == [
               [left_value: %IR.IntegerType{value: 1}, list_index: 0],
               [binding: :a, list_index: 1]
             ]
    end

    test "non-nested list, right side" do
      assert deconstruct(@non_nested_list, :right) == [
               [:right_value, {:list_index, 0}],
               [:right_value, {:list_index, 1}]
             ]
    end

    test "nested list, left side" do
      assert deconstruct(@nested_list, :left) == [
               [binding: :a, list_index: 0],
               [
                 left_value: %IR.IntegerType{value: 1},
                 list_index: 0,
                 list_index: 1
               ],
               [binding: :b, list_index: 1, list_index: 1]
             ]
    end

    test "nested list, right side" do
      assert deconstruct(@nested_list, :right) == [
               [:right_value, {:list_index, 0}],
               [:right_value, {:list_index, 0}, {:list_index, 1}],
               [:right_value, {:list_index, 1}, {:list_index, 1}]
             ]
    end
  end

  describe "map type" do
    # %{:a => 1, "b" => c}
    @non_nested_map %IR.MapType{
      data: [
        {%IR.AtomType{value: :a}, %IR.IntegerType{value: 1}},
        {%IR.StringType{value: "b"}, %IR.Symbol{name: :c}}
      ]
    }

    # %{:a => 1, "b" => %{:c => 2, "d" => e}}
    @nested_map %IR.MapType{
      data: [
        {%IR.AtomType{value: :a}, %IR.IntegerType{value: 1}},
        {%IR.StringType{value: "b"},
         %IR.MapType{
           data: [
             {%IR.AtomType{value: :c}, %IR.IntegerType{value: 2}},
             {%IR.StringType{value: "d"}, %IR.Symbol{name: :e}}
           ]
         }}
      ]
    }

    test "non-nested map, left side" do
      assert deconstruct(@non_nested_map, :left) == [
               [
                 left_value: %IR.IntegerType{value: 1},
                 map_key: %IR.AtomType{value: :a}
               ],
               [binding: :c, map_key: %IR.StringType{value: "b"}]
             ]
    end

    test "non-nested map, right side" do
      assert deconstruct(@non_nested_map, :right) == [
               [:right_value, {:map_key, %IR.AtomType{value: :a}}],
               [:right_value, {:map_key, %IR.StringType{value: "b"}}]
             ]
    end

    test "nested map, left side" do
      assert deconstruct(@nested_map, :left) == [
               [
                 left_value: %IR.IntegerType{value: 1},
                 map_key: %IR.AtomType{value: :a}
               ],
               [
                 left_value: %IR.IntegerType{value: 2},
                 map_key: %IR.AtomType{value: :c},
                 map_key: %IR.StringType{value: "b"}
               ],
               [
                 binding: :e,
                 map_key: %IR.StringType{value: "d"},
                 map_key: %IR.StringType{value: "b"}
               ]
             ]
    end

    test "nested map, right side" do
      assert deconstruct(@nested_map, :right) == [
               [:right_value, {:map_key, %IR.AtomType{value: :a}}],
               [
                 :right_value,
                 {:map_key, %IR.AtomType{value: :c}},
                 {:map_key, %IR.StringType{value: "b"}}
               ],
               [
                 :right_value,
                 {:map_key, %IR.StringType{value: "d"}},
                 {:map_key, %IR.StringType{value: "b"}}
               ]
             ]
    end
  end

  describe "tuple type" do
    # {1, a}
    @non_nested_tuple %IR.TupleType{
      data: [
        %IR.IntegerType{value: 1},
        %IR.Symbol{name: :a}
      ]
    }

    # {a, {1, b}}
    @nested_tuple %IR.TupleType{
      data: [
        %IR.Symbol{name: :a},
        %IR.TupleType{
          data: [
            %IR.IntegerType{value: 1},
            %IR.Symbol{name: :b}
          ]
        }
      ]
    }

    test "non-nested tuple, left side" do
      assert deconstruct(@non_nested_tuple, :left) == [
               [left_value: %IR.IntegerType{value: 1}, tuple_index: 0],
               [binding: :a, tuple_index: 1]
             ]
    end

    test "non-nested tuple, right side" do
      assert deconstruct(@non_nested_tuple, :right) == [
               [:right_value, {:tuple_index, 0}],
               [:right_value, {:tuple_index, 1}]
             ]
    end

    test "nested tuple, left side" do
      assert deconstruct(@nested_tuple, :left) == [
               [binding: :a, tuple_index: 0],
               [
                 left_value: %IR.IntegerType{value: 1},
                 tuple_index: 0,
                 tuple_index: 1
               ],
               [binding: :b, tuple_index: 1, tuple_index: 1]
             ]
    end

    test "nested tuple, right side" do
      assert deconstruct(@nested_tuple, :right) == [
               [:right_value, {:tuple_index, 0}],
               [:right_value, {:tuple_index, 0}, {:tuple_index, 1}],
               [:right_value, {:tuple_index, 1}, {:tuple_index, 1}]
             ]
    end
  end
end
