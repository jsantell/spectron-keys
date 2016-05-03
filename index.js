var os = require("os");

var utils = require("./lib/utils");
var WEBDRIVER_KEYS = require("./lib/webdriver-keys.json");

function mapAccelerator (keys, platform) {
  platform = platform || os.platform();
  return utils.normalizeCommands(keys, platform).map(function (command) {
    // Ensure we have a valid command; throws otherwise.
    utils.validateCommand(command);

    // Use the Web Driver command map, or just the command itself if it's
    // just a single character, like "a".
    return WEBDRIVER_KEYS[command] || command.toLowerCase();
  });
}

exports.mapAccelerator = mapAccelerator;
exports.keys = WEBDRIVER_KEYS;
