"use strict";

import Type from "./type"

export default class Operation {
  constructor(targetModule, targetId, name, params) {
    this.targetModule = targetModule
    this.targetId = targetId
    this.name = name
    this.params = params
  }

  static buildFromExpressionNodeSpecWithTarget(specElems, context, componentRegistry) {
    const target = specElems[0].value
    let targetModule, targetId;

    switch (target) {
      case "layout":
        targetModule = context.layoutModule
        targetId = null
        break;

      case "page":
        targetModule = context.pageModule
        targetId = null
        break;

      default:
        targetModule = componentRegistry[target];
        targetId = target
        break;
    }

    const params = Type.keywordToMap(specElems[2])
    return new Operation(targetModule, targetId, specElems[1], params)
  }

  static buildFromExpressionNodeSpecWithoutTarget(specElems, context) {
    const params = Type.keywordToMap(specElems[1])
    return new Operation(context.targetModule, context.targetId, specElems[0], params)
  }

  static buildFromTextNodeSpec(textNode, context) {
    const targetModule = context.targetModule
    const targetId = null
    const name = Type.atom(textNode.content)
    const params = Type.map({})
    
    return new Operation(targetModule, targetId, name, params)
  }

  static hasSpecTarget(specElems) {
    return specElems.length >= 2 && Type.isAtom(specElems[0]) && Type.isAtom(specElems[1])
  }
}
