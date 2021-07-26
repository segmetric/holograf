import { assert } from "./support/commons";
import Utils from "../../assets/js/hologram/utils";

describe("keywordToMap()", () => {
  it("converts empty keyword list", () => {
    const keyword = {type: "list", data: []}

    const result = Utils.keywordToMap(keyword)
    const expected = {type: "map", data: {}}
    
    assert.deepStrictEqual(result, expected) 
  })

  it("converts non-empty keyword list", () => {
    const keyword = {
      type: "list",
      data: [
        {
          type: "tuple", 
          data: [
            {type: "atom", value: "a"},
            {type: "integer", value: 1}
          ]
        },
        {
          type: "tuple", 
          data: [
            {type: "atom", value: "b"},
            {type: "integer", value: 2}
          ]
        }
      ]
    }

    const result = Utils.keywordToMap(keyword)

    const expected = {
      type: "map", 
      data: {
        "~atom[a]": {type: "integer", value: 1},
        "~atom[b]": {type: "integer", value: 2}
      }
    }
    
    assert.deepStrictEqual(result, expected) 
  })

  it("overwrites same keys", () => {
    const keyword = {
      type: "list",
      data: [
        {
          type: "tuple", 
          data: [
            {type: "atom", value: "a"},
            {type: "integer", value: 1}
          ]
        },
        {
          type: "tuple", 
          data: [
            {type: "atom", value: "b"},
            {type: "integer", value: 2}
          ]
        },
        {
          type: "tuple", 
          data: [
            {type: "atom", value: "a"},
            {type: "integer", value: 9}
          ]
        },
      ]
    }

    const result = Utils.keywordToMap(keyword)

    const expected = {
      type: "map", 
      data: {
        "~atom[a]": {type: "integer", value: 9},
        "~atom[b]": {type: "integer", value: 2}
      }
    }
    
    assert.deepStrictEqual(result, expected) 
  })
})