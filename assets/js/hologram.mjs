"use strict";

import Interpreter from "./interpreter.mjs";
import Type from "./type.mjs";

export default class Hologram {
  static isInitiated = false;

  // TODO: implement
  static init() {}

  // TODO: implement
  static mountPage() {
    window.__hologramPageReachableFunctionDefs__(Interpreter, Type);
  }

  static onReady(callback) {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", function listener() {
        document.removeEventListener("DOMContentLoaded", listener);
        callback();
      });
    }
  }

  static run() {
    Hologram.onReady(() => {
      if (!Hologram.isInitiated) {
        Hologram.init();
      }

      Hologram.mountPage();
    });
  }
}
