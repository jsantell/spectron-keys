var os = require("os");
var chai = require("chai");
var expect = chai.expect;
var mapAccelerator = require("../").mapAccelerator;
var SHIFT_MODIFIED_ALIASES = require("../lib/shift-modified-aliases.json");
var WEBDRIVER_KEYS = require("../lib/webdriver-keys.json");

describe("keys", function () {
  describe("shift modified keys", function () {
    var SHIFT = "\uE008";
    Object.keys(SHIFT_MODIFIED_ALIASES).forEach(function (key) {
      it(key, function () {
        expect(mapAccelerator("Alt+" + key).toString())
          .to.be.equal(["\uE00A", SHIFT, SHIFT_MODIFIED_ALIASES[key][1]].toString());
      });
    });
  });

  describe("F1-F12", function () {
    var keys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
    keys.forEach(function (key) {
      it(key, function () {
        expect(mapAccelerator("Alt+" + key).toString())
          .to.be.equal(["\uE00A", WEBDRIVER_KEYS[key]].toString());
      });
    });
  });
});
