var os = require("os");
var chai = require("chai");
var expect = chai.expect;
var mapAccelerator = require("../").mapAccelerator;
var UNSUPPORTED_ACCELERATORS = require("../lib/unsupported-accelerators.json");

describe("modifiers", function () {
  describe("aliases", function () {
    it("Cmd -> Command", function () {
      expect(mapAccelerator("Cmd+X").toString())
        .to.be.equal(["\uE03D", "x"].toString());
    });
    it("Ctrl -> Control", function () {
      expect(mapAccelerator("Ctrl+X").toString())
        .to.be.equal(["\uE009", "x"].toString());
    });
    it("CmdOrCtrl -> CommandOrControl", function () {
      expect(mapAccelerator("CmdOrCtrl+X", "darwin").toString())
        .to.be.equal(["\uE03D", "x"].toString());
      expect(mapAccelerator("CmdOrCtrl+X", "win32").toString())
        .to.be.equal(["\uE009", "x"].toString());
    });
    it("Enter -> Return", function () {
      expect(mapAccelerator("Enter+X").toString())
        .to.be.equal(["\uE006", "x"].toString());
    });
    it("Esc -> Escape", function () {
      expect(mapAccelerator("Esc+X").toString())
        .to.be.equal(["\uE00C", "x"].toString());
    });
    it("Meta -> Command", function () {
      expect(mapAccelerator("Meta+X").toString())
        .to.be.equal(["\uE03D", "x"].toString());
    });
    it("Super -> Command", function () {
      expect(mapAccelerator("Super+X").toString())
        .to.be.equal(["\uE03D", "x"].toString());
    });
  });

  describe("CommandOrControl", function () {
    it("defaults to os.platform() for platform", function () {
      if (os.platform() === "darwin") {
        expect(mapAccelerator("CommandOrControl+X").toString())
          .to.be.equal(["\uE03D", "x"].toString());
      } else {
        expect(mapAccelerator("CommandOrControl+X").toString())
          .to.be.equal(["\uE009", "x"].toString());
      }
    });

    it("Uses Command when on OS X", function () {
      expect(mapAccelerator("CommandOrControl+X", "darwin").toString())
        .to.be.equal(["\uE03D", "x"].toString());
    });

    ["freebsd", "linux", "sunos", "win32"].forEach(function (platform) {
      it("Uses Control when on " + platform, function () {
        expect(mapAccelerator("CommandOrControl+X", platform).toString())
          .to.be.equal(["\uE009", "x"].toString());
      });
    });
  });
});
