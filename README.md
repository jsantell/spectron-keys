spectron-keys
=======

[![Build Status](http://img.shields.io/travis/jsantell/spectron-keys.svg?style=flat-square)](https://travis-ci.org/jsantell/spectron-keys)
[![Build Status](http://img.shields.io/npm/v/spectron-keys.svg?style=flat-square)](https://www.npmjs.org/package/spectron-keys)

Accelerator mappings for Electron commands to Spectron/WebDriver key codes. Maps [Electron Accelerators](electron.atom.io/docs/latest/api/accelerator/) like `"CommandOrControl+A"` to `["\uE03D", "a"]` (on OS X).

## Install

```
npm install spectron-keys
```

## API

### spectronKeys.mapAccelerator(accelerator, platform)

Takes a string `accelerator`, like `"CommandOrControl+A"` and an optional `platform` string, and returns an array of WebDriver-ready unicode and keys to consume. `platform` defaults to `require("os").platform()` if not specified.

### spectronKeys.keys

An object of constants mapping key names and modifiers to their unicode values used by WebDriver. Essentially, just exposes [./lib/webdriver-keys.json](https://github.com/jsantell/spectron-keys/blob/master/lib/webdriver-keys.json).

## Usage

```js
const spectronKeys = require("spectron-keys");
const { Application } = require("spectron");
const config = require("./config");

async function run () {
  const app = new Application(config);
  await app.start();
  await app.client.keys(spectronKeys.mapAccelerator("CommandOrControl+A"));
}
```

## Testing

```
npm test
```

## License

MIT License, Copyright (c) 2016 Jordan Santell
