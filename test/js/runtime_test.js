"use strict";

import { assert } from "./support/commons";
import Runtime from "../../assets/js/hologram/runtime";

describe("getClassByClassName()", () => {
  it("returns class object given a class name", () => {
    const TestClass_Abc_Xyz = class {}
    globalThis.TestClass_Abc_Xyz = TestClass_Abc_Xyz
    
    const result = Runtime.getClassByClassName("TestClass_Abc_Xyz")

    assert.equal(result, TestClass_Abc_Xyz)
  })
})

describe("getComponentClass()", () => {
  it("returns component class given component ID", () => {
    const TestClass1 = class{}
    const TestClass2 = class{}
    const TestClass3 = class{}

    Runtime.componentClassRegistry = {
      component_1: TestClass1,
      component_2: TestClass2,
      component_3: TestClass3
    }

    const result = Runtime.getComponentClass("component_2")
    
    assert.equal(result, TestClass2)
  })
})

describe("getLayoutTemplate()", () => {
  it("returns the template of the current page's layout", () => {
    Runtime.layoutClass = class {
      static template() {
        return "test_template"
      }
    }

    const result = Runtime.getLayoutTemplate()

    assert.equal(result, "test_template")
  })
})

describe("getPageTemplate()", () => {
  it("returns the template of the current page", () => {
    Runtime.pageClass = class {
      static template() {
        return "test_template"
      }
    }

    const result = Runtime.getPageTemplate()

    assert.equal(result, "test_template")
  })
})