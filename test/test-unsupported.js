var chai = require("chai");
var expect = chai.expect;
var spectronKeys = require("../");
var UNSUPPORTED_ACCELERATORS = require("../lib/unsupported-accelerators.json");

describe("unsupported electron accelerators", function () {

  UNSUPPORTED_ACCELERATORS.forEach(function (acc) {
    it("fails with unsupported accelerator: " + acc, function () {
      expect(function () {
        spectronKeys.mapAccelerator(acc + "+A");
      }).to.throw(Error);
    });
  });

});
