var ELECTRON_ALIASES = require("./electron-aliases.json");
var SHIFT_MODIFIED_ALIASES = require("./shift-modified-aliases.json");
var UNSUPPORTED_ACCELERATORS = require("./unsupported-accelerators.json");
var WEBDRIVER_KEYS = require("./webdriver-keys.json");

/**
 * Takes a string and validates whether or not there's a valid
 * mapping to a WebDriver key, and a more helpful message for
 * supported Electron commands that are not (yet?) mappable to WebDriver.
 *
 * Throws on an invalid key.
 *
 * @param {String} command
 */
function validateCommand (command) {
  // If only one character, this is (probably?) a key stroke.
  if (command.length === 1) {
    return;
  }

  if (UNSUPPORTED_ACCELERATORS.indexOf(command) >= 0) {
    throw new Error("The '" + command + "', while supported by Electron, is not mappable to WebDriver.");
  }

  if (!WEBDRIVER_KEYS[command]) {
    throw new Error("No valid mapping found for '" + command + "'.");
  }
}
exports.validateCommand = validateCommand;

/**
 * Take a string `commands` and split them up into command strings. Also
 * takes a platform string to produce the correct command for the platform.
 * For example, converts "CmdOrCtrl+!" to
 * `["Command", "Shift", "1"]` on OS X.
 *
 * @param {String} commands
 * @param {String} platform
 * @return {Array<String>}
 */
function normalizeCommands (commands, platform) {
  return commands.split("+").reduce(function (sequence, command) {
    command = ELECTRON_ALIASES[command] || command;

    if (command === "CommandOrControl") {
      command = platform === "darwin" ? "Command" : "Control";
    }

    if (command === "Super") {
      command = platform === "darwin" ? "Command" : "Windows";
    }

    // Convert command to an array if it's a shift modified character,
    // like "!" mapping to `["Shift", "1"]`.
    command = SHIFT_MODIFIED_ALIASES[command] || command;

    return sequence.concat(command);
  }, []);
}
exports.normalizeCommands = normalizeCommands;
