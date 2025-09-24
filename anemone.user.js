// ==UserScript==
// @name         Anemone
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  N-Day userscript for JEFF
// @author       Merethin
// @match        https://www.nationstates.net/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_deleteValues
// ==/UserScript==
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
    mod
  ));

  // node_modules/mousetrap/mousetrap.js
  var require_mousetrap = __commonJS({
    "node_modules/mousetrap/mousetrap.js"(exports, module) {
      (function(window2, document2, undefined2) {
        if (!window2) {
          return;
        }
        var _MAP = {
          8: "backspace",
          9: "tab",
          13: "enter",
          16: "shift",
          17: "ctrl",
          18: "alt",
          20: "capslock",
          27: "esc",
          32: "space",
          33: "pageup",
          34: "pagedown",
          35: "end",
          36: "home",
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          45: "ins",
          46: "del",
          91: "meta",
          93: "meta",
          224: "meta"
        };
        var _KEYCODE_MAP = {
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        };
        var _SHIFT_MAP = {
          "~": "`",
          "!": "1",
          "@": "2",
          "#": "3",
          "$": "4",
          "%": "5",
          "^": "6",
          "&": "7",
          "*": "8",
          "(": "9",
          ")": "0",
          "_": "-",
          "+": "=",
          ":": ";",
          '"': "'",
          "<": ",",
          ">": ".",
          "?": "/",
          "|": "\\"
        };
        var _SPECIAL_ALIASES = {
          "option": "alt",
          "command": "meta",
          "return": "enter",
          "escape": "esc",
          "plus": "+",
          "mod": /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
        };
        var _REVERSE_MAP;
        for (var i = 1; i < 20; ++i) {
          _MAP[111 + i] = "f" + i;
        }
        for (i = 0; i <= 9; ++i) {
          _MAP[i + 96] = i.toString();
        }
        function _addEvent(object, type, callback) {
          if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
          }
          object.attachEvent("on" + type, callback);
        }
        function _characterFromEvent(e) {
          if (e.type == "keypress") {
            var character = String.fromCharCode(e.which);
            if (!e.shiftKey) {
              character = character.toLowerCase();
            }
            return character;
          }
          if (_MAP[e.which]) {
            return _MAP[e.which];
          }
          if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
          }
          return String.fromCharCode(e.which).toLowerCase();
        }
        function _modifiersMatch(modifiers1, modifiers2) {
          return modifiers1.sort().join(",") === modifiers2.sort().join(",");
        }
        function _eventModifiers(e) {
          var modifiers = [];
          if (e.shiftKey) {
            modifiers.push("shift");
          }
          if (e.altKey) {
            modifiers.push("alt");
          }
          if (e.ctrlKey) {
            modifiers.push("ctrl");
          }
          if (e.metaKey) {
            modifiers.push("meta");
          }
          return modifiers;
        }
        function _preventDefault(e) {
          if (e.preventDefault) {
            e.preventDefault();
            return;
          }
          e.returnValue = false;
        }
        function _stopPropagation(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
            return;
          }
          e.cancelBubble = true;
        }
        function _isModifier(key) {
          return key == "shift" || key == "ctrl" || key == "alt" || key == "meta";
        }
        function _getReverseMap() {
          if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {
              if (key > 95 && key < 112) {
                continue;
              }
              if (_MAP.hasOwnProperty(key)) {
                _REVERSE_MAP[_MAP[key]] = key;
              }
            }
          }
          return _REVERSE_MAP;
        }
        function _pickBestAction(key, modifiers, action) {
          if (!action) {
            action = _getReverseMap()[key] ? "keydown" : "keypress";
          }
          if (action == "keypress" && modifiers.length) {
            action = "keydown";
          }
          return action;
        }
        function _keysFromString(combination) {
          if (combination === "+") {
            return ["+"];
          }
          combination = combination.replace(/\+{2}/g, "+plus");
          return combination.split("+");
        }
        function _getKeyInfo(combination, action) {
          var keys;
          var key;
          var i2;
          var modifiers = [];
          keys = _keysFromString(combination);
          for (i2 = 0; i2 < keys.length; ++i2) {
            key = keys[i2];
            if (_SPECIAL_ALIASES[key]) {
              key = _SPECIAL_ALIASES[key];
            }
            if (action && action != "keypress" && _SHIFT_MAP[key]) {
              key = _SHIFT_MAP[key];
              modifiers.push("shift");
            }
            if (_isModifier(key)) {
              modifiers.push(key);
            }
          }
          action = _pickBestAction(key, modifiers, action);
          return {
            key,
            modifiers,
            action
          };
        }
        function _belongsTo(element, ancestor) {
          if (element === null || element === document2) {
            return false;
          }
          if (element === ancestor) {
            return true;
          }
          return _belongsTo(element.parentNode, ancestor);
        }
        function Mousetrap8(targetElement) {
          var self = this;
          targetElement = targetElement || document2;
          if (!(self instanceof Mousetrap8)) {
            return new Mousetrap8(targetElement);
          }
          self.target = targetElement;
          self._callbacks = {};
          self._directMap = {};
          var _sequenceLevels = {};
          var _resetTimer;
          var _ignoreNextKeyup = false;
          var _ignoreNextKeypress = false;
          var _nextExpectedAction = false;
          function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};
            var activeSequences = false, key;
            for (key in _sequenceLevels) {
              if (doNotReset[key]) {
                activeSequences = true;
                continue;
              }
              _sequenceLevels[key] = 0;
            }
            if (!activeSequences) {
              _nextExpectedAction = false;
            }
          }
          function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i2;
            var callback;
            var matches = [];
            var action = e.type;
            if (!self._callbacks[character]) {
              return [];
            }
            if (action == "keyup" && _isModifier(character)) {
              modifiers = [character];
            }
            for (i2 = 0; i2 < self._callbacks[character].length; ++i2) {
              callback = self._callbacks[character][i2];
              if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                continue;
              }
              if (action != callback.action) {
                continue;
              }
              if (action == "keypress" && !e.metaKey && !e.ctrlKey || _modifiersMatch(modifiers, callback.modifiers)) {
                var deleteCombo = !sequenceName && callback.combo == combination;
                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                if (deleteCombo || deleteSequence) {
                  self._callbacks[character].splice(i2, 1);
                }
                matches.push(callback);
              }
            }
            return matches;
          }
          function _fireCallback(callback, e, combo, sequence) {
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
              return;
            }
            if (callback(e, combo) === false) {
              _preventDefault(e);
              _stopPropagation(e);
            }
          }
          self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i2;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;
            for (i2 = 0; i2 < callbacks.length; ++i2) {
              if (callbacks[i2].seq) {
                maxLevel = Math.max(maxLevel, callbacks[i2].level);
              }
            }
            for (i2 = 0; i2 < callbacks.length; ++i2) {
              if (callbacks[i2].seq) {
                if (callbacks[i2].level != maxLevel) {
                  continue;
                }
                processedSequenceCallback = true;
                doNotReset[callbacks[i2].seq] = 1;
                _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo, callbacks[i2].seq);
                continue;
              }
              if (!processedSequenceCallback) {
                _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo);
              }
            }
            var ignoreThisKeypress = e.type == "keypress" && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
              _resetSequences(doNotReset);
            }
            _ignoreNextKeypress = processedSequenceCallback && e.type == "keydown";
          };
          function _handleKeyEvent(e) {
            if (typeof e.which !== "number") {
              e.which = e.keyCode;
            }
            var character = _characterFromEvent(e);
            if (!character) {
              return;
            }
            if (e.type == "keyup" && _ignoreNextKeyup === character) {
              _ignoreNextKeyup = false;
              return;
            }
            self.handleKey(character, _eventModifiers(e), e);
          }
          function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1e3);
          }
          function _bindSequence(combo, keys, callback, action) {
            _sequenceLevels[combo] = 0;
            function _increaseSequence(nextAction) {
              return function() {
                _nextExpectedAction = nextAction;
                ++_sequenceLevels[combo];
                _resetSequenceTimer();
              };
            }
            function _callbackAndReset(e) {
              _fireCallback(callback, e, combo);
              if (action !== "keyup") {
                _ignoreNextKeyup = _characterFromEvent(e);
              }
              setTimeout(_resetSequences, 10);
            }
            for (var i2 = 0; i2 < keys.length; ++i2) {
              var isFinal = i2 + 1 === keys.length;
              var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i2 + 1]).action);
              _bindSingle(keys[i2], wrappedCallback, action, combo, i2);
            }
          }
          function _bindSingle(combination, callback, action, sequenceName, level) {
            self._directMap[combination + ":" + action] = callback;
            combination = combination.replace(/\s+/g, " ");
            var sequence = combination.split(" ");
            var info;
            if (sequence.length > 1) {
              _bindSequence(combination, sequence, callback, action);
              return;
            }
            info = _getKeyInfo(combination, action);
            self._callbacks[info.key] = self._callbacks[info.key] || [];
            _getMatches(info.key, info.modifiers, { type: info.action }, sequenceName, combination, level);
            self._callbacks[info.key][sequenceName ? "unshift" : "push"]({
              callback,
              modifiers: info.modifiers,
              action: info.action,
              seq: sequenceName,
              level,
              combo: combination
            });
          }
          self._bindMultiple = function(combinations, callback, action) {
            for (var i2 = 0; i2 < combinations.length; ++i2) {
              _bindSingle(combinations[i2], callback, action);
            }
          };
          _addEvent(targetElement, "keypress", _handleKeyEvent);
          _addEvent(targetElement, "keydown", _handleKeyEvent);
          _addEvent(targetElement, "keyup", _handleKeyEvent);
        }
        Mousetrap8.prototype.bind = function(keys, callback, action) {
          var self = this;
          keys = keys instanceof Array ? keys : [keys];
          self._bindMultiple.call(self, keys, callback, action);
          return self;
        };
        Mousetrap8.prototype.unbind = function(keys, action) {
          var self = this;
          return self.bind.call(self, keys, function() {
          }, action);
        };
        Mousetrap8.prototype.trigger = function(keys, action) {
          var self = this;
          if (self._directMap[keys + ":" + action]) {
            self._directMap[keys + ":" + action]({}, keys);
          }
          return self;
        };
        Mousetrap8.prototype.reset = function() {
          var self = this;
          self._callbacks = {};
          self._directMap = {};
          return self;
        };
        Mousetrap8.prototype.stopCallback = function(e, element) {
          var self = this;
          if ((" " + element.className + " ").indexOf(" mousetrap ") > -1) {
            return false;
          }
          if (_belongsTo(element, self.target)) {
            return false;
          }
          if ("composedPath" in e && typeof e.composedPath === "function") {
            var initialEventTarget = e.composedPath()[0];
            if (initialEventTarget !== e.target) {
              element = initialEventTarget;
            }
          }
          return element.tagName == "INPUT" || element.tagName == "SELECT" || element.tagName == "TEXTAREA" || element.isContentEditable;
        };
        Mousetrap8.prototype.handleKey = function() {
          var self = this;
          return self._handleKey.apply(self, arguments);
        };
        Mousetrap8.addKeycodes = function(object) {
          for (var key in object) {
            if (object.hasOwnProperty(key)) {
              _MAP[key] = object[key];
            }
          }
          _REVERSE_MAP = null;
        };
        Mousetrap8.init = function() {
          var documentMousetrap = Mousetrap8(document2);
          for (var method in documentMousetrap) {
            if (method.charAt(0) !== "_") {
              Mousetrap8[method] = /* @__PURE__ */ function(method2) {
                return function() {
                  return documentMousetrap[method2].apply(documentMousetrap, arguments);
                };
              }(method);
            }
          }
        };
        Mousetrap8.init();
        window2.Mousetrap = Mousetrap8;
        if (typeof module !== "undefined" && module.exports) {
          module.exports = Mousetrap8;
        }
        if (typeof define === "function" && define.amd) {
          define(function() {
            return Mousetrap8;
          });
        }
      })(typeof window !== "undefined" ? window : null, typeof window !== "undefined" ? document : null);
    }
  });

  // src/main.ts
  var import_mousetrap7 = __toESM(require_mousetrap());

  // node_modules/idb-keyval/dist/index.js
  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.oncomplete = request.onsuccess = () => resolve(request.result);
      request.onabort = request.onerror = () => reject(request.error);
    });
  }
  function createStore(dbName, storeName) {
    let dbp;
    const getDB = () => {
      if (dbp)
        return dbp;
      const request = indexedDB.open(dbName);
      request.onupgradeneeded = () => request.result.createObjectStore(storeName);
      dbp = promisifyRequest(request);
      dbp.then((db) => {
        db.onclose = () => dbp = void 0;
      }, () => {
      });
      return dbp;
    };
    return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }
  var defaultGetStoreFunc;
  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("keyval-store", "keyval");
    }
    return defaultGetStoreFunc;
  }
  function get(key, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => promisifyRequest(store.get(key)));
  }
  function set(key, value, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.put(value, key);
      return promisifyRequest(store.transaction);
    });
  }

  // nsdotjs/src/gui/statusBubble.ts
  var StatusBubble = class _StatusBubble {
    static instance = null;
    element;
    constructor() {
      this.element = document.createElement("div");
      this.element.textContent = "Awaiting orders";
      this.element.style.color = "black";
      this.element.style.width = "200px";
      this.element.style.height = "100px";
      this.element.style.border = "solid 1px black";
      this.element.style.left = "20px";
      this.element.style.bottom = "20px";
      this.element.style.position = "fixed";
      this.element.style.fontSize = "12px";
      this.element.style.textAlign = "center";
      this.element.style.verticalAlign = "middle";
      this.element.style.lineHeight = "25px";
      this.element.style.overflowWrap = "anywhere";
      this.element.style.padding = "10px";
      this.element.style.zIndex = "20000";
      this.element.style.backgroundColor = "#9696FF";
      this.element.style.display = "block";
    }
    static getInstance() {
      if (!_StatusBubble.instance) {
        _StatusBubble.instance = new _StatusBubble();
        if (typeof document !== "undefined" && document.body) {
          document.body.appendChild(_StatusBubble.instance.element);
        }
      }
      return _StatusBubble.instance;
    }
    show(message) {
      if (message) {
        this.element.textContent = message;
      }
      this.element.style.display = "block";
    }
    hide() {
      this.element.style.display = "none";
    }
    setColor(color) {
      switch (color) {
        case "blue":
          this.element.style.backgroundColor = "#9696FF";
          break;
        case "yellow":
          this.element.style.backgroundColor = "#FFFF64";
          break;
        case "red":
          this.element.style.backgroundColor = "#FF6464";
          break;
        default:
          this.element.style.backgroundColor = color;
          break;
      }
    }
    success(message) {
      this.setColor("blue");
      this.show(message);
    }
    info(message) {
      this.setColor("yellow");
      this.show(message);
    }
    warn(message) {
      this.setColor("red");
      this.show(message);
    }
  };

  // nsdotjs/src/helpers.ts
  function parseHtml(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }
  function canonicalize(str) {
    if (!str) return "";
    return str.toLowerCase().trim().replace(/\s+/g, "_");
  }
  function prettify(str) {
    return str.replace(/_/g, " ").replace(
      /\b(a|an|the|and|but|or|for|nor|on|at|to|in)\b/gi,
      (match) => match.toLowerCase()
    ).replace(/\b\w/g, (match) => match.toUpperCase());
  }

  // nsdotjs/src/networking/html/auth.ts
  function extractNation(doc) {
    return doc.body?.getAttribute("data-nname") || null;
  }
  function extractChk(doc) {
    const chkInput = doc.querySelector(
      'input[name="chk"]'
    );
    return chkInput?.value || null;
  }
  function extractLocalid(doc) {
    const localidInput = doc.querySelector(
      'input[name="localid"]'
    );
    return localidInput?.value || null;
  }
  function storeAuth(doc) {
    const nation = extractNation(doc);
    const chk = extractChk(doc);
    const localid = extractLocalid(doc);
    if (nation) {
      try {
        localStorage.setItem("lastKnownNation", nation);
      } catch (error) {
        console.error("Error storing lastKnownNation to localStorage:", error);
      }
    }
    if (chk) {
      try {
        localStorage.setItem("lastKnownChk", chk);
      } catch (error) {
        console.error("Error storing lastKnownChk to localStorage:", error);
      }
    }
    if (localid) {
      try {
        localStorage.setItem("lastKnownLocalid", localid);
      } catch (error) {
        console.error("Error storing lastKnownLocalid to localStorage:", error);
      }
    }
  }
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      storeAuth(document);
    });
  }

  // nsdotjs/src/networking/html/handlers/nation.ts
  async function handleRestore(context, nationName, password) {
    const response = await context.makeNsHtmlRequest(
      "",
      {
        logging_in: "1",
        restore_password: password,
        restore_nation: "1",
        nation: nationName
      },
      false
    );
    if (response.status === 302) {
      context.statusBubble.success(
        `Successfully restored nation: ${prettify(nationName)}
You need to re-authenticate to perform actions on this nation.`
      );
      return true;
    }
    context.statusBubble.warn(
      `Failed to restore nation: ${prettify(nationName)}`
    );
    return false;
  }
  async function handleLogin(context, nationName, password) {
    const text = await context.getNsHtmlPage("page=display_region", {
      region: "rwby",
      nation: nationName,
      password,
      logging_in: "1",
      submit: "Login"
    });
    const canonNation = canonicalize(nationName);
    const re = /(?<=Move )(.*?)(?= to RWBY!)/;
    const match = text.match(re);
    if (match && canonicalize(match[0]) === canonNation) {
      context.statusBubble.success(
        `Logged in to nation: ${prettify(nationName)}`
      );
      return true;
    }
    context.statusBubble.warn(
      `Failed to log in to nation: ${prettify(nationName)}`
    );
    return false;
  }

  // nsdotjs/src/networking/html/handlers/region.ts
  async function handleMove(context, regionName, password) {
    const payload = {
      region_name: regionName,
      move_region: "1"
    };
    if (password) {
      payload.password = password;
    }
    const text = await context.getNsHtmlPage("page=change_region", payload);
    if (text.includes("Success!")) {
      context.statusBubble.success(`Moved to region: ${prettify(regionName)}`);
      return true;
    }
    context.statusBubble.warn(
      `Failed to move to region: ${prettify(regionName)}`
    );
    return false;
  }
  async function handleCreate(context, regionName, wfe, password = "", frontier = false, executiveDelegate = false) {
    const payload = {
      region_name: canonicalize(regionName),
      desc: wfe,
      create_region: "1",
      is_frontier: frontier ? "1" : "0",
      delegate_control: executiveDelegate ? "1" : "0"
    };
    if (password) {
      payload.pw = "1";
      payload.rpassword = password;
    }
    const text = await context.getNsHtmlPage("page=create_region", payload);
    if (text.includes("Success! You have founded ")) {
      context.statusBubble.success(`Created region: ${prettify(regionName)}`);
      return true;
    }
    context.statusBubble.warn(`Failed to create region: ${prettify(regionName)}`);
    return false;
  }
  async function handleChangeWFE(context, wfe) {
    const text = await context.getNsHtmlPage("page=region_control", {
      message: wfe.trim(),
      setwfebutton: "1"
    });
    if (text.includes("World Factbook Entry updated!")) {
      context.statusBubble.success("World Factbook Entry updated!");
      return true;
    }
    context.statusBubble.warn("Failed to update World Factbook Entry.");
    return false;
  }
  async function handleRequestEmbassy(context, target2) {
    const text = await context.getNsHtmlPage("page=region_control", {
      requestembassyregion: target2,
      requestembassy: "1"
    });
    if (text.includes("Your proposal for the construction of embassies with")) {
      context.statusBubble.success(`Requested embassy with ${prettify(target2)}`);
      return true;
    }
    context.statusBubble.warn(
      `Failed to request embassy with ${prettify(target2)}`
    );
    return false;
  }
  async function handleCloseEmbassy(context, target2) {
    const text = await context.getNsHtmlPage("page=region_control", {
      cancelembassyregion: target2
    });
    if (text.includes(" has been scheduled for demolition.")) {
      context.statusBubble.success(`Burned embassy with ${prettify(target2)}`);
      return true;
    }
    context.statusBubble.warn(`Failed to burn embassy with ${prettify(target2)}`);
    return false;
  }
  async function handleAbortEmbassy(context, target2) {
    const text = await context.getNsHtmlPage("page=region_control", {
      abortembassyregion: target2
    });
    if (text.includes(" aborted.")) {
      context.statusBubble.success(`Aborted embassy with ${prettify(target2)}`);
      return true;
    }
    context.statusBubble.warn(`Failed to abort embassy with ${prettify(target2)}`);
    return false;
  }
  async function handleCancelEmbassyClosure(context, target2) {
    const text = await context.getNsHtmlPage("page=region_control", {
      cancelembassyclosureregion: target2
    });
    if (text.includes("Embassy closure order cancelled.")) {
      context.statusBubble.success(
        `Cancelled embassy closure with ${prettify(target2)}`
      );
      return true;
    }
    context.statusBubble.warn(
      `Failed to cancel embassy closure with ${prettify(target2)}`
    );
    return false;
  }
  async function handleEject(context, nationName) {
    const text = await context.getNsHtmlPage("page=region_control", {
      nation_name: nationName,
      eject: "1"
    });
    if (text.includes("has been ejected from ")) {
      context.statusBubble.success(`Ejected nation: ${prettify(nationName)}`);
      return true;
    }
    context.statusBubble.warn(`Failed to eject nation: ${prettify(nationName)}`);
    return false;
  }
  async function handleBanject(context, nationName) {
    const text = await context.getNsHtmlPage("page=region_control", {
      nation_name: nationName,
      ban: "1"
    });
    if (text.includes("has been ejected and banned from ")) {
      context.statusBubble.success(`Banjected nation: ${prettify(nationName)}`);
      return true;
    }
    context.statusBubble.warn(
      `Failed to banject nation: ${prettify(nationName)}`
    );
    return false;
  }
  async function handleTag(context, action, tag) {
    let prettified_action = "";
    switch (action) {
      case "add":
        prettified_action = "Add";
        break;
      case "remove":
        prettified_action = "Remov";
        break;
    }
    const payload = {
      [`${action}_tag`]: tag,
      updatetagsbutton: "1"
    };
    const text = await context.getNsHtmlPage("page=region_control", payload);
    if (text.includes("Region Tags updated!")) {
      context.statusBubble.success(
        `${prettified_action}ed tag: ${prettify(tag)}`
      );
      return true;
    }
    if (prettified_action === "Remov") {
      prettified_action = "Remove";
    }
    context.statusBubble.warn(
      `Failed to ${prettified_action.toLowerCase()} tag: ${prettify(tag)}`
    );
    return false;
  }
  async function handleEditRO(context, nationName, officeName, authority, regionName) {
    const payload = {
      nation: nationName,
      office_name: officeName,
      editofficer: "1"
    };
    if (authority.includes("A")) payload.authority_A = "on";
    if (authority.includes("B")) payload.authority_B = "on";
    if (authority.includes("C")) payload.authority_C = "on";
    if (authority.includes("E")) payload.authority_E = "on";
    if (authority.includes("P")) payload.authority_P = "on";
    if (authority.includes("S")) payload.authority_S = "on";
    let page = "page=region_control";
    if (regionName) {
      page += `/region=${regionName}`;
      payload.region = regionName;
    }
    const text = await context.getNsHtmlPage(page, payload);
    if (text.includes("Appointed") && text.includes("with authority over")) {
      context.statusBubble.success(`Appointed ${prettify(nationName)} as RO`);
      return true;
    }
    if (text.includes("Renamed the authority held by") || (text.includes("authority from") || text.includes("authority to")) && (text.includes("Removed") || text.includes("Granted"))) {
      context.statusBubble.success(`Edited ${prettify(nationName)}'s office`);
      return true;
    }
    context.statusBubble.warn(
      `Failed to appoint/edit ${prettify(nationName)} as RO`
    );
    return false;
  }
  async function handleDismissRO(context, nationName, regionName) {
    const payload = {
      nation: nationName,
      abolishofficer: "1"
    };
    let page = "page=region_control";
    if (regionName) {
      page += `/region=${regionName}`;
      payload.region = regionName;
    }
    const text = await context.getNsHtmlPage(page, payload);
    if (text.includes("Dismissed") && text.includes("as")) {
      context.statusBubble.success(`Dismissed ${prettify(nationName)} from office`);
      return true;
    }
    context.statusBubble.warn(
      `Failed to dismiss ${prettify(nationName)} from office`
    );
    return false;
  }
  async function handleEditDelegate(context, authority, regionName) {
    const payload = {
      office: "delegate",
      editofficer: "1",
      authority_W: "on"
      // world assembly authority always on
    };
    if (authority.includes("A")) payload.authority_A = "on";
    if (authority.includes("B")) payload.authority_B = "on";
    if (authority.includes("C")) payload.authority_C = "on";
    if (authority.includes("E")) payload.authority_E = "on";
    if (authority.includes("P")) payload.authority_P = "on";
    if (authority.includes("X")) payload.authority_X = "on";
    let page = "page=region_control";
    if (regionName) {
      page += `/region=${regionName}`;
      payload.region = regionName;
    }
    const text = await context.getNsHtmlPage(page, payload);
    if (text.includes("Set Delegate authority to:")) {
      context.statusBubble.success("Modified delegate authority");
      return true;
    }
    context.statusBubble.warn(
      "Failed to modify delegate authority"
    );
    return false;
  }
  async function handleRenameGovernor(context, officeName, regionName) {
    const payload = {
      office: "governor",
      office_name: officeName,
      editofficer: "1"
    };
    let page = "page=region_control";
    if (regionName) {
      page += `/region=${regionName}`;
      payload.region = regionName;
    }
    const text = await context.getNsHtmlPage(page, payload);
    if (text.includes("Renamed the Governor's office")) {
      context.statusBubble.success("Renamed Governor");
      return true;
    }
    context.statusBubble.warn(
      "Failed to rename Governor"
    );
    return false;
  }
  async function handleUploadBanner(context, bannerFile, regionName) {
    const payload = {
      page: "region_control",
      expect: "json",
      uploadtype: "rbanner",
      file_upload_rbanner: bannerFile,
      region: regionName
    };
    const json = await context.makeNsJsonRequest("/cgi-bin/upload.cgi", payload);
    if ("id" in json) {
      context.statusBubble.success("Uploaded banner");
      return json.id.toString();
    }
    if ("err" in json) {
      context.statusBubble.warn(
        `Failed to upload banner: ${json.err}`
      );
    }
    context.statusBubble.warn(
      "Failed to upload banner"
    );
    return null;
  }
  async function handleUploadFlag(context, flagFile, regionName) {
    const payload = {
      page: "region_control",
      expect: "json",
      uploadtype: "rflag",
      file_upload_rflag: flagFile,
      region: regionName
    };
    const json = await context.makeNsJsonRequest("/cgi-bin/upload.cgi", payload);
    if ("id" in json) {
      context.statusBubble.success("Uploaded flag");
      return json.id.toString();
    }
    if ("err" in json) {
      context.statusBubble.warn(
        `Failed to upload flag: ${json.err}`
      );
    }
    context.statusBubble.warn(
      "Failed to upload flag"
    );
    return null;
  }
  async function handleSetBannerAndFlag(context, regionName, bannerId, flagId) {
    const payload = {
      page: "region_control",
      newbanner: bannerId.toString(),
      newflag: flagId.toString(),
      saveflagandbannerchanges: "1",
      flagmode: "flag",
      newflagmode: "flag",
      region: regionName
    };
    const text = await context.getNsHtmlPage(`page=region_control/region=${regionName}`, payload);
    if (text.includes("banner/flag updated!")) {
      context.statusBubble.success("Set new flag and banner");
      return true;
    }
    context.statusBubble.warn(
      "Failed to set new flag and banner"
    );
    return false;
  }

  // nsdotjs/src/networking/html/handlers/simultaneity.ts
  async function handleCheck(context) {
    if (context.isHtmlRequestInProgress) {
      context.statusBubble.warn("Another request is already in progress.");
      return Promise.reject(
        new Error(
          "Simultaneous request denied: Another request is already in progress."
        )
      );
    }
    context.isHtmlRequestInProgress = true;
    return true;
  }
  function handleUnlock(context) {
    for (const btn of document.querySelectorAll(
      'button[type="submit"]'
    )) {
      btn.disabled = false;
    }
    context.isHtmlRequestInProgress = false;
  }
  function handleLock(context) {
    for (const btn of document.querySelectorAll(
      'button[type="submit"]'
    )) {
      btn.disabled = true;
    }
    context.isHtmlRequestInProgress = true;
  }

  // nsdotjs/src/networking/html/handlers/userInput.ts
  async function waitForSpace() {
    return new Promise((resolve) => {
      const handleKeyDown = (event) => {
        if (event.key === " ") {
          document.removeEventListener("keydown", handleKeyDown);
          resolve();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
    });
  }

  // nsdotjs/src/networking/html/handlers/worldAssembly.ts
  async function handleApply(context, reapply) {
    let payload;
    if (reapply) {
      payload = {
        action: "join_UN",
        resend: "1"
      };
    } else {
      payload = {
        action: "join_UN",
        submit: "1"
      };
    }
    const text = await context.getNsHtmlPage("page=UN_status", payload);
    if (text.includes(
      "Your application to join the World Assembly has been received!"
    )) {
      context.statusBubble.success("Applied to World Assembly");
      return true;
    }
    context.statusBubble.warn("Failed to apply to World Assembly");
    return false;
  }
  async function handleJoin(context, nationName, appId) {
    const text = await context.getNsHtmlPage("cgi-bin/join_un.cgi", {
      nation: nationName,
      appid: appId.trim()
    });
    if (text.includes("Welcome to the World Assembly, new member ")) {
      context.statusBubble.success(
        `Joined World Assembly as ${prettify(nationName)}`
      );
      return true;
    }
    context.statusBubble.warn("Failed to join World Assembly");
    return false;
  }
  async function handleResign(context) {
    const text = await context.getNsHtmlPage("page=UN_status", {
      action: "leave_UN",
      submit: "1"
    });
    if (text.includes("From this moment forward, your nation is on its own.")) {
      context.statusBubble.success("Resigned from World Assembly");
      return true;
    }
    context.statusBubble.warn("Failed to resign from World Assembly");
    return false;
  }
  async function handleEndorse(context, nationName) {
    const response = await context.makeNsHtmlRequest(
      "cgi-bin/endorse.cgi",
      {
        nation: nationName,
        action: "endorse"
      }
    );
    const location = response.url;
    if (location.includes(`nation=${canonicalize(nationName)}`)) {
      context.statusBubble.success(`Endorsed ${prettify(nationName)}`);
      return true;
    }
    context.statusBubble.warn(`Failed to endorse ${prettify(nationName)}`);
    return false;
  }
  async function handleUnendorse(context, nationName) {
    const response = await context.makeNsHtmlRequest(
      "cgi-bin/endorse.cgi",
      {
        nation: nationName,
        action: "unendorse"
      }
    );
    const location = response.url;
    if (location.includes(`nation=${canonicalize(nationName)}`)) {
      context.statusBubble.success(`Unendorsed ${prettify(nationName)}`);
      return true;
    }
    context.statusBubble.warn(`Failed to unendorse ${prettify(nationName)}`);
    return false;
  }
  async function handleVote(context, council, vote) {
    const response = await context.getNsHtmlPage(`page=${council}`, {
      vote: `Vote ${vote}`
    });
    if (response.includes("Your vote has been lodged.")) {
      context.statusBubble.success(`Voted ${vote} in ${council}`);
      return true;
    }
    context.statusBubble.warn(`Failed to vote ${vote} in ${council}`);
    return false;
  }

  // nsdotjs/src/networking/api/rateLimiter.ts
  var RateLimiter = class {
    rateLimitAvailable;
    rateLimitRemaining;
    rateLimitReset;
    resetRateLimit;
    scriptName;
    scriptVersion;
    scriptAuthor;
    currentUser;
    constructor(name, version, author, user) {
      this.scriptName = name;
      this.scriptVersion = version;
      this.scriptAuthor = author;
      this.currentUser = user;
      this.rateLimitAvailable = 50;
      this.rateLimitRemaining = 50;
      this.rateLimitReset = 0;
      this.resetRateLimit = null;
    }
    /**
    * Decides which NationStates domain to send requests to.
    * @returns fast.nationstates.net if on the fast site, www.nationstates.net otherwise.
    */
    getRequestDomain() {
      if (window.location.host == "fast.nationstates.net") return "fast.nationstates.net";
      return "www.nationstates.net";
    }
    async makeRequest(url, payload) {
      const baseUrl = `https://${this.getRequestDomain()}/`;
      const scriptParamValue = `${this.scriptName} v${this.scriptVersion} by ${this.scriptAuthor} in use by ${this.currentUser}`;
      const requestParams = new URLSearchParams();
      requestParams.append("script", scriptParamValue);
      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          requestParams.append(key, String(value));
        });
      }
      if (this.resetRateLimit) {
        clearTimeout(this.resetRateLimit);
        this.resetRateLimit = null;
      }
      let unixTime = Math.floor(Date.now() / 1e3);
      if (this.rateLimitRemaining < 3 && unixTime < this.rateLimitReset) {
        console.log(`rate limit: ${this.rateLimitRemaining} left as of last check, pausing`);
        await new Promise((r) => setTimeout(r, (this.rateLimitReset - unixTime) * 1e3));
      }
      let requestUrl = new URL(url, baseUrl);
      requestUrl.search = requestParams.toString();
      while (true) {
        let response = await fetch(requestUrl.toString(), {
          credentials: "include",
          method: "GET",
          redirect: "manual"
        });
        if (response.status == 429) {
          let retryAfter = parseInt(response.headers.get("Retry-After"));
          console.log(`rate limit hit, retrying after ${retryAfter} seconds`);
          await new Promise((r) => setTimeout(r, retryAfter * 1e3));
          continue;
        }
        this.rateLimitAvailable = parseInt(response.headers.get("RateLimit-Limit"));
        this.rateLimitRemaining = parseInt(response.headers.get("RateLimit-Remaining"));
        let secondsToReset = parseInt(response.headers.get("RateLimit-Reset"));
        this.rateLimitReset = Math.floor(Date.now() / 1e3) + secondsToReset;
        console.log(`rate limit: ${this.rateLimitAvailable} limit, ${this.rateLimitRemaining} left, ${this.rateLimitReset} reset`);
        this.resetRateLimit = setTimeout(() => {
          this.resetRateLimit = null;
          this.rateLimitRemaining = this.rateLimitAvailable;
          console.log(`rate limit bucket reset: back to ${this.rateLimitAvailable}`);
        }, secondsToReset * 1e3);
        return response;
      }
    }
  };

  // nsdotjs/src/client.ts
  var NSScript = class {
    scriptName;
    scriptVersion;
    scriptAuthor;
    rateLimiter;
    statusBubble;
    currentUser;
    userInputHandler = waitForSpace;
    // Default user input handler
    isHtmlRequestInProgress = false;
    /**
     * Initializes a new NSScript instance with script metadata and current user information.
     *
     * @param name The name of the script
     * @param version The version of the script
     * @param author The author of the script
     * @param user The current user of the script
     */
    constructor(name, version, author, user, userInputHandler = waitForSpace) {
      this.scriptName = name;
      this.scriptVersion = version;
      this.scriptAuthor = author;
      this.currentUser = user;
      this.statusBubble = StatusBubble.getInstance();
      this.rateLimiter = new RateLimiter(name, version, author, user);
      this.userInputHandler = userInputHandler;
    }
    /**
     * Stores a key-value pair in the IndexedDB key-value store.
     *
     * @param key The key under which the value will be stored
     * @param value The value to be stored, which can be of any type
     * @returns A Promise that resolves when the value is successfully stored
     */
    async set(key, value) {
      return await set(key, value);
    }
    /**
     * Retrieves a value from the IndexedDB key-value store by its key.
     *
     * @param key The key of the value to retrieve
     * @returns A Promise that resolves to the stored value, or undefined if the key is not found
     */
    async get(key) {
      return await get(key);
    }
    /**
     * Decides which NationStates domain to send requests to.
     * @returns fast.nationstates.net if on the fast site, www.nationstates.net otherwise.
     */
    getRequestDomain() {
      if (window.location.host == "fast.nationstates.net") return "fast.nationstates.net";
      return "www.nationstates.net";
    }
    /**
     * Makes a request to a page on the NationStates HTML site.
     * @param pagePath The path to the page on NationStates (e.g., "index.html", "page=create_nation").
     *                This path is relative to "https://www.nationstates.net/".
     * @param payload An object containing key-value pairs to be sent as the request payload.
     * @returns A Promise that resolves to the Fetch API's Response object.
     */
    async makeNsHtmlRequest(pagePath, payload, followRedirects = true, shouldUnlockSimul = true) {
      if (!handleCheck(this)) {
        return Promise.reject(
          new Error("Simultaneity check failed. Please try again.")
        );
      }
      await this.userInputHandler();
      handleLock(this);
      try {
        this.statusBubble.info(`Loading: ${pagePath}...`);
        const baseUrl = `https://${this.getRequestDomain()}/`;
        const scriptParamValue = `${this.scriptName} v${this.scriptVersion} by ${this.scriptAuthor} in use by ${this.currentUser}`;
        const requestParams = new URLSearchParams();
        const payloadParams = new FormData();
        if (payload) {
          Object.entries(payload).forEach(([key, value]) => {
            if (value instanceof File)
              payloadParams.append(key, value);
            else
              payloadParams.append(key, String(value));
          });
        }
        requestParams.append("userclick", Date.now().toString());
        requestParams.append("script", scriptParamValue);
        if (!pagePath.endsWith(".cgi")) {
          requestParams.append("template-overall", "none");
        }
        const lastKnownChk = localStorage.getItem("lastKnownChk");
        if (lastKnownChk) {
          payloadParams.append("chk", lastKnownChk);
        }
        const lastKnownLocalid = localStorage.getItem("lastKnownLocalid");
        if (lastKnownLocalid) {
          payloadParams.append("localid", lastKnownLocalid);
        }
        const safeBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const finalUrl = new URL(pagePath, safeBaseUrl);
        finalUrl.search = requestParams.toString();
        const response = await fetch(finalUrl.toString(), {
          credentials: "include",
          method: "POST",
          body: payloadParams,
          redirect: followRedirects ? "follow" : "manual"
        });
        if (shouldUnlockSimul) {
          response.blob().then((_) => {
            handleUnlock(this);
          });
        }
        return response;
      } catch (err) {
        handleUnlock(this);
        throw err;
      }
    }
    async makeNsAPIRequest(payload) {
      return this.rateLimiter.makeRequest("cgi-bin/api.cgi", payload);
    }
    async makeNsAPIXmlRequest(payload) {
      let response = await this.makeNsAPIRequest(payload);
      let parser = new DOMParser();
      return parser.parseFromString(await response.text(), "text/xml");
    }
    /**
     * Fetches and processes an HTML page from the NationStates site.
     * Handles security checks and captcha detection.
     * @param pagePath The path to the page on NationStates.
     * @param payload Optional payload to send with the request.
     * @returns A Promise that resolves to the HTML content of the page as a string.
     * @throws Error if the request fails, security check fails, or captcha is detected.
     */
    async getNsHtmlPage(pagePath, payload) {
      const response = await this.makeNsHtmlRequest(pagePath, payload, true, false);
      if (!response.ok) {
        response.text().then((_) => {
          handleUnlock(this);
        });
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }
      const text = await response.text();
      handleUnlock(this);
      if (text.includes("Failed security check")) {
        throw new Error(
          "Failed security check. Please run reauth and try again."
        );
      }
      if (text.includes("Border Patrol")) {
        throw new Error(
          "You need to solve the border patrol captcha before proceeding."
        );
      }
      const doc = parseHtml(text);
      storeAuth(doc);
      return text;
    }
    /**
     * Makes a request to a NationStates page that 
     * provides a JSON response and parses said response.
     * While most NationStates pages don't provide JSON 
     * responses, this method is useful for the few that do.
     * (example: upload.cgi, to upload flags and banners)
     * @param pagePath The path to the page on NationStates.
     * @param payload Optional payload to send with the request.
     * @returns A Promise that resolves to the parsed JSON object.
     * @throws Error if the request fails.
     */
    async makeNsJsonRequest(pagePath, payload) {
      const response = await this.makeNsHtmlRequest(pagePath, payload, true, false);
      if (!response.ok) {
        response.text().then((_) => {
          handleUnlock(this);
        });
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }
      const text = await response.text();
      handleUnlock(this);
      return JSON.parse(text);
    }
    /**
     * Attempts to log in to a NationStates nation.
     * @param nationName The name of the nation to log in to.
     * @param password The password for the nation.
     * @returns A Promise that resolves to true if login is successful, false otherwise.
     */
    async login(nationName, password) {
      return handleLogin(this, nationName, password);
    }
    /**
     * Re-authenticates the current session by fetching the region page
     * for RWBY, getting the CHK and localid values from the response.
     */
    async reAuthenticate() {
      await this.getNsHtmlPage("page=display_region", {
        region: "rwby"
      });
      this.statusBubble.success("Re-authenticated");
    }
    /**
     * Attempts to create a new nation in the specified region.
     * @param nationName The name of the nation to create.
     * @param password Optional password for the nation.
     * @returns A Promise that resolves to true if the creation is successful, false otherwise.
     */
    async restoreNation(nationName, password) {
      return handleRestore(this, nationName, password);
    }
    /**
     * Attempts to move the current nation to a different region.
     * @param regionName The name of the region to move to.
     * @param password Optional password for the region.
     * @returns A Promise that resolves to true if the move is successful, false otherwise.
     */
    async moveToRegion(regionName, password) {
      return handleMove(this, regionName, password);
    }
    /**
     * Attempts to create a new region with the specified parameters.
     * @param regionName The name of the region to create.
     * @param wfe The World Factbook Entry for the region.
     * @param password Optional password for the region.
     * @param frontier Whether the region is a frontier region. Defaults to false.
     * @param executiveDelegate Whether the region has an executive delegate. Defaults to false.
     * @returns A Promise that resolves to true if the creation is successful, false otherwise.
     */
    async createRegion(regionName, wfe, password = "", frontier = false, executiveDelegate = false) {
      return handleCreate(
        this,
        regionName,
        wfe,
        password,
        frontier,
        executiveDelegate
      );
    }
    /**
     * Attempts to change the World Factbook Entry for the current region.
     * @param wfe The new World Factbook Entry.
     * @returns A Promise that resolves to true if the change is successful, false otherwise.
     */
    async changeWFE(wfe) {
      return handleChangeWFE(this, wfe);
    }
    /**
     * Requests an embassy from the current region to the specified region.
     * @param regionName The name of the region to request an embassy from.
     * @returns A Promise that resolves to true if the request is successful, false otherwise.
     */
    async requestEmbassy(regionName) {
      return handleRequestEmbassy(this, regionName);
    }
    /**
     * Attempts to close an embassy with the specified region.
     * @param regionName The name of the region to close the embassy with.
     * @returns A Promise that resolves to true if the embassy is closed, false otherwise.
     */
    async burnEmbassy(regionName) {
      return handleCloseEmbassy(this, regionName);
    }
    /**
     * Attempts to abort an embassy that is currently being opened.
     * @param regionName The name of the region to abort the embassy opening with.
     * @returns A Promise that resolves to true if the embassy opening is aborted, false otherwise.
     */
    async abortEmbassyOpening(regionName) {
      return handleAbortEmbassy(this, regionName);
    }
    /**
     * Attempts to cancel an embassy closure.
     * @param regionName The name of the region to cancel the embassy closure with.
     * @returns A Promise that resolves to true if the embassy closure is canceled, false otherwise.
     */
    async cancelEmbassyClosure(regionName) {
      return handleCancelEmbassyClosure(this, regionName);
    }
    /**
     * Attempts to ban and eject a nation from the current region.
     * @param nationName The name of the nation to ban and eject.
     * @returns A Promise that resolves to true if the ban and eject is successful, false otherwise.
     */
    async banject(nationName) {
      return handleBanject(this, nationName);
    }
    /**
     * Attempts to eject a nation from the current region.
     * @param nationName The name of the nation to ban and eject.
     * @returns A Promise that resolves to true if the ban and eject is successful, false otherwise.
     */
    async eject(nationName) {
      return handleEject(this, nationName);
    }
    /**
     * Adds a tag to the current region.
     * @param tag The tag to add.
     * @returns A Promise that resolves to true if the tag is added, false otherwise.
     */
    async addTag(tag) {
      return handleTag(this, "add", tag);
    }
    /**
     * Removes a tag from the current region.
     * @param tag The tag to remove.
     * @returns A Promise that resolves to true if the tag is removed, false otherwise.
     */
    async removeTag(tag) {
      return handleTag(this, "remove", tag);
    }
    /**
     * Attempts to edit or appoint a regional officer in a region (given that the current nation has Executive authority there).
     * @param nationName The nation to give said office to.
     * @param officeName The office name to use.
     * @param authority Authority to give to the officer: 
     * "A" for Appearance, "B" for Border Control, "C" for Communications, "E" for Embassies, "P" for Polls and "S" for Successor.
     * Example: "ACEP" will set the office's authority to Appearance, Communications, Embassies and Polls.
     * @param regionName The name of the region to edit/create the office in. If not given, defaults to the current region.
     * @returns A Promise that resolves to true if the operation is successful, false otherwise.
     */
    async editRegionalOfficer(nationName, officeName, authority, regionName) {
      return handleEditRO(this, nationName, officeName, authority, regionName);
    }
    /**
     * Attempts to dismiss a regional officer in a region (given that the current nation has Executive authority there).
     * @param nationName The officer to dismiss.
     * @param regionName The name of the region to dismiss the office in. If not given, defaults to the current region.
     * @returns A Promise that resolves to true if the operation is successful, false otherwise.
     */
    async dismissRegionalOfficer(nationName, regionName) {
      return handleDismissRO(this, nationName, regionName);
    }
    /**
     * Attempts to edit the delegate's authority in a region (given that the current nation has Executive authority there).
     * @param authority Authority to give to the delegate: 
     * "A" for Appearance, "B" for Border Control, "C" for Communications, "E" for Embassies, "P" for Polls and "X" for Executive.
     * Example: "ACEP" will set the office's authority to Appearance, Communications, Embassies and Polls.
     * World Assembly authority is always set and cannot be turned off.
     * @param regionName The name of the region to edit the delegacy of. If not given, defaults to the current region.
     * @returns A Promise that resolves to true if the operation is successful, false otherwise.
     */
    async editDelegate(authority, regionName) {
      return handleEditDelegate(this, authority, regionName);
    }
    /**
     * Attempts to edit the governor's title in a region (given that the current nation has Executive authority there).
     * @param officeName The title to give the Governor.
     * @param regionName The name of the region to edit the Governorship of. If not given, defaults to the current region.
     * @returns A Promise that resolves to true if the operation is successful, false otherwise.
     */
    async renameGovernor(officeName, regionName) {
      return handleRenameGovernor(this, officeName, regionName);
    }
    /**
     * Uploads a banner to the given region.
     * @param bannerFile The image file to upload.
     * @param regionName The region to upload the banner to.
     * @returns A Promise that resolves to the banner's ID (later used to actually set the banner) if
     * successful, null otherwise (if there is a security check or the current nation has no authority).
     */
    async uploadBanner(bannerFile, regionName) {
      return handleUploadBanner(this, bannerFile, regionName);
    }
    /**
     * Uploads a flag to the given region.
     * @param flagFile The image file to upload.
     * @param regionName The region to upload the flag to.
     * @returns A Promise that resolves to the flag's ID (later used to actually set the flag) if
     * successful, null otherwise (if there is a security check or the current nation has no authority).
     */
    async uploadFlag(flagFile, regionName) {
      return handleUploadFlag(this, flagFile, regionName);
    }
    /**
     * Sets a region's flag and banner after uploading.
     * @param regionName The region to update the appearance of.
     * @param bannerId The ID obtained from a successful call to uploadBanner().
     * @param flagId The ID obtained from a successful call to uploadFlag().
     * @returns A Promise that resolves to true if the operation is successful, false otherwise.
     */
    async setBannerAndFlag(regionName, bannerId, flagId) {
      return handleSetBannerAndFlag(this, regionName, bannerId, flagId);
    }
    /**
     * Attempts to apply to or reapply to the World Assembly.
     * @param reapply Whether to reapply to the World Assembly if you've already recently applied
     * @returns A Promise that resolves to true if the application is successful, false otherwise.
     */
    async applyToWorldAssembly(reapply) {
      return handleApply(this, reapply);
    }
    /**
     * Attempts to join the World Assembly as a member.
     * @param nationName The name of the nation to join as.
     * @param appId The application ID for the nation.
     * @returns A Promise that resolves to true if the join is successful, false otherwise.
     */
    async joinWorldAssembly(nationName, appId) {
      return handleJoin(this, nationName, appId);
    }
    /**
     * Attempts to resign from the World Assembly.
     * @returns A Promise that resolves to true if the resignation is successful, false otherwise.
     */
    async resignWorldAssembly() {
      return handleResign(this);
    }
    /**
     * Attempts to endorse a nation in the World Assembly.
     * @param nationName The name of the nation to endorse.
     * @returns A Promise that resolves to true if the endorsement is successful, false otherwise.
     */
    async endorseNation(nationName) {
      return handleEndorse(this, nationName);
    }
    /**
     * Attempts to unendorse a nation in the World Assembly.
     * @param nationName The name of the nation to unendorse.
     * @returns A Promise that resolves to true if the unendorsement is successful, false otherwise.
     */
    async unEndorseNation(nationName) {
      return handleUnendorse(this, nationName);
    }
    /**
     * Attempts to vote in the World Assembly.
     * @param council The council to vote in ("ga" for General Assembly, "sc" for Security Council).
     * @param vote The vote type ("for" or "against").
     * @returns A Promise that resolves to true if the vote is successful, false otherwise.
     */
    async waVote(council, vote) {
      return handleVote(this, council, vote);
    }
    // end WA functions
  };

  // nsdotjs/src/gui/identifyTheme.ts
  function detectNationStatesTheme(doc) {
    const stylesheets = Array.from(
      doc.querySelectorAll('link[rel="stylesheet"]')
    ).map((link) => link.href);
    const hasStylesheet = (substring) => stylesheets.some((href) => href.includes(substring));
    if (hasStylesheet("/ns.m_")) {
      return "Mobile";
    }
    if (hasStylesheet("/ns.antiquity_")) {
      return "Antiquity";
    }
    if (hasStylesheet("/ns.century_")) {
      return "Century";
    }
    const hasBaseStylesheet = hasStylesheet("/ns_v");
    const hasRiftPanel = doc.getElementById("panel");
    if (hasBaseStylesheet && hasRiftPanel) {
      return "Rift";
    }
    const hasFontelloStylesheet = hasStylesheet("/fontello/");
    if (!hasBaseStylesheet && !hasFontelloStylesheet) {
      return "None";
    }
    return "Unknown";
  }

  // nsdotjs/src/gui/sideBarButton.ts
  function addSidebarButton(text, iconClass, onClick, href = "#") {
    const theme = detectNationStatesTheme(document);
    switch (theme) {
      // Call the Rift-specific implementation
      case "Rift":
        return addSideBarButtonRift(text, iconClass, onClick, href);
      case "Antiquity":
        console.log("Not implemented yet");
        return null;
      case "Century":
        console.log("Not implemented yet");
        return null;
      case "Mobile":
        console.log("Not implemented yet");
        return null;
      case "None":
        console.log("Not implemented yet");
        return null;
      case "Unknown":
        console.error("Something has gone very wrong.");
        return null;
    }
  }
  function addSideBarButtonRift(text, iconClass, onClick, href = "#") {
    const panelContent = document.querySelector("#panel .panelcontent");
    if (!panelContent) {
      console.error(
        "NationStates Button Helper: Panel content (div#panel .panelcontent) not found."
      );
      return null;
    }
    const mainMenu = panelContent.querySelector("ul.menu");
    if (!mainMenu) {
      console.error(
        "NationStates Button Helper: Main menu (ul.menu) in sidebar not found."
      );
      return null;
    }
    const listItem = document.createElement("li");
    const linkElement = document.createElement("a");
    linkElement.href = href;
    if (href === "#") {
      linkElement.style.cursor = "pointer";
    }
    const iconElement = document.createElement("i");
    iconElement.className = `icon-${iconClass}`;
    const panelTextDiv = document.createElement("div");
    panelTextDiv.className = "paneltext";
    panelTextDiv.textContent = text.toUpperCase();
    linkElement.appendChild(iconElement);
    linkElement.appendChild(panelTextDiv);
    linkElement.addEventListener("click", (e) => {
      if (href === "#") {
        e.preventDefault();
      }
      onClick();
    });
    listItem.appendChild(linkElement);
    const minorMenuItems = mainMenu.querySelector("#minormenuitems");
    if (minorMenuItems) {
      mainMenu.insertBefore(listItem, minorMenuItems);
    } else {
      mainMenu.appendChild(listItem);
    }
    return listItem;
  }

  // nsdotjs/src/gui/topBarButton.ts
  function addTopBarButton(text, iconClass, onClick, position = "right") {
    const theme = detectNationStatesTheme(document);
    switch (theme) {
      // Call the Rift-specific implementation
      case "Rift":
        return addTopBarButtonRift(text, iconClass, onClick, position);
      case "Antiquity":
        console.log("Not implemented yet");
        return null;
      case "Century":
        console.log("Not implemented yet");
        return null;
      case "Mobile":
        console.log("Not implemented yet");
        return null;
      case "None":
        console.log("Not implemented yet");
        return null;
      case "Unknown":
        console.error("Something has gone very wrong.");
        return null;
    }
  }
  function addTopBarButtonRift(text, iconClass, onClick, position = "right") {
    const banner = document.getElementById("banner");
    if (!banner) {
      console.error(
        "NationStates Button Helper: Banner element (div#banner) not found."
      );
      return null;
    }
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "bel";
    const belContentDiv = document.createElement("div");
    belContentDiv.className = "belcontent";
    const linkElement = document.createElement("a");
    if (document.getElementById("welcomelinks")) {
      linkElement.style.background = "rgba(255,255,255,0.7)";
      linkElement.style.padding = "4px 18px";
      linkElement.style.color = "#000";
    }
    linkElement.className = "bellink";
    linkElement.href = "#";
    linkElement.style.cursor = "pointer";
    const iconElement = document.createElement("i");
    iconElement.className = `icon-${iconClass}`;
    linkElement.appendChild(iconElement);
    linkElement.appendChild(document.createTextNode(` ${text.toUpperCase()}`));
    linkElement.addEventListener("click", (e) => {
      e.preventDefault();
      onClick();
    });
    belContentDiv.appendChild(linkElement);
    buttonDiv.appendChild(belContentDiv);
    const spacer = banner.querySelector("div.belspacer.belspacermain");
    if (position === "right" || document.body.id === "loggedout") {
      if (spacer) {
        const loginSwitcher = spacer.querySelector("#loginswitcher");
        if (loginSwitcher) {
          spacer.insertBefore(buttonDiv, loginSwitcher);
        } else {
          const logoutBox = spacer.querySelector("#logoutbox")?.parentElement;
          if (logoutBox) {
            spacer.insertBefore(buttonDiv, logoutBox);
          } else {
            spacer.appendChild(buttonDiv);
          }
        }
      } else {
        console.error(
          "NationStates Button Helper: Top bar spacer (div.belspacer.belspacermain) not found for right positioning."
        );
        return null;
      }
    } else if (position === "left") {
      if (spacer) {
        banner.insertBefore(buttonDiv, spacer);
      } else {
        console.warn(
          "NationStates Button Helper: Top bar spacer (div.belspacer.belspacermain) not found for left positioning. Appending to banner."
        );
        banner.appendChild(buttonDiv);
      }
    } else {
      console.error(
        `NationStates Button Helper: Invalid position "${position}" provided. Must be "left" or "right".`
      );
      return null;
    }
    return buttonDiv;
  }

  // nsdotjs/src/nsdotjs.ts
  if (typeof window !== "undefined") {
    Object.assign(window, {
      NSScript,
      addTopBarButton,
      addSidebarButton,
      prettify,
      canonicalize
    });
  }

  // src/config.ts
  function readConfigValue(key) {
    return GM_getValue(key);
  }
  function getConfigValue(key, defaultValue) {
    let value = GM_getValue(key);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
  function setConfigValue(key, value) {
    GM_setValue(key, value);
  }
  function readConfigRecord(key) {
    var record = {};
    let recordJSON = GM_getValue(key);
    if (recordJSON != null) record = JSON.parse(recordJSON);
    return record;
  }
  function saveConfigRecord(key, record) {
    let recordJSON = JSON.stringify(record);
    GM_setValue(key, recordJSON);
  }

  // src/keybinds.ts
  var keybinds = {
    main: { key: "main", defaultValue: "M", label: "Open Main Page" },
    action: { key: "action", defaultValue: "Enter", label: "Perform Action" }
  };
  function getKeybind(keybind) {
    return getConfigValue(`keybind_${keybind.key}`, keybind.defaultValue);
  }
  function loadKeybind(keybind) {
    return getKeybind(keybind).toLowerCase();
  }

  // src/lib.ts
  function checkPage(page) {
    return window.location.href.includes(page);
  }
  function checkPageRegex(regex) {
    let result = regex.exec(window.location.href);
    if (result == null) return null;
    return result[1];
  }
  function generateRandomNumber(start, end) {
    return Math.random() * (end - start) + start;
  }

  // src/htmllib.ts
  function getElement(id) {
    return document.getElementById(id);
  }
  function getButtonElement(id) {
    return document.getElementById(id);
  }
  function getInputElement(id) {
    return document.getElementById(id);
  }
  function setText(id, text) {
    getElement(id).innerText = text;
  }
  function injectWarning(warning) {
    let html = `<p class="error">${warning}</p>`;
    let container = document.createElement("div");
    container.innerHTML = html;
    const content = document.getElementById("content");
    content.prepend(container);
  }
  function injectUserAgentWarning() {
    injectWarning("You have not set a User Agent! Anemone will not work until you do so <a href='/page=blank/nuke/config'>here</a>.");
  }

  // build/version.ts
  var VERSION = "0.1.0";

  // src/pages/html/station.ts
  var nukeStationHtml = `
<h1>Nuclear Control Station</h1>
<p id="puppet-status">0 Puppets Saved, 0 Alive / 0 Loaded (run Classify to load)</p>
<fieldset>
  <legend>Join Faction</legend>
  <div class="frdata"><p>Join a faction with all your puppets.</p></div>
  <input type="text" id="mass-join-fid" placeholder="Enter Faction ID..."></input>
  <button id="mass-join-faction" class="button primary">Join Faction</button>
</fieldset>
<fieldset>
  <legend>Classify Puppets</legend>
  <div class="frdata"><p>Fetch the specialization and stats of your nations.</p></div>
  <a class="button primary" href="/page=blank/nuke/classify">Classify Puppets</a>
</fieldset>
<fieldset>
  <legend>Convert Production</legend>
  <div class="frdata"><p>Select the nations to convert production on.</p></div>
  <input type="checkbox" id="prod-select-mil"></input> Military Specialists<br>
  <input type="checkbox" id="prod-select-strat"></input> Strategic Specialists<br>
  <input type="checkbox" id="prod-select-econ"></input> Economic Specialists<br>
  <input type="checkbox" id="prod-select-clean"></input> Cleanup Specialists<br>
  <button id="mass-produce-nukes" class="button primary">Generate Nukes</button><br>
  <button id="mass-produce-shields" class="button primary">Generate Shields</button>
</fieldset>
<fieldset>
  <legend>Donate Shields</legend>
  <div class="frdata"><p>Donate a certain percentage of your shields to the faction shield bank.</p></div>
  <p>Donate <input type="text" id="mass-donate-ratio" value="50" size="3"></input> % of each puppet's shields</p>
  <button id="mass-donate" class="button primary">Donate</button>
</fieldset>
<fieldset>
  <legend>Target Nukes</legend>
  <div class="frdata"><p>Target nukes at an enemy faction.</p></div>
  <input type="text" id="mass-target-fid" placeholder="Enter Faction ID..."></input>
  <p>Overkill: <input type="text" id="mass-target-overkill" value="1" size="3"></input> x</p>
  <button id="mass-target-faction" class="button primary">Target Faction</button>
</fieldset>
<fieldset>
  <legend>Cleanup Radiation</legend>
  <div class="frdata"><p>Bring destroyed nations back to life.</p></div>
  <input type="text" id="mass-clean-fid" placeholder="Enter Faction ID..."></input>
  <button id="mass-clean-faction" class="button primary">Cleanup Faction</button>
</fieldset>
<fieldset>
  <legend>Stat Tracking</legend>
  <p><span id="nuke-confirmed">0</span> Nukes</p>
  <p><span id="shield-confirmed">0</span> Shields</p>
  <p><span id="prod-confirmed">0</span> Production</p>
  <p><span id="destroyed-confirmed">0</span> Nations Destroyed</p>
  <br>
  <b>Military Specialists (<span id="mil-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-mil-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-mil-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-mil-estimated">0</span></p>
  <br>
  <b>Strategic Specialists (<span id="strat-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-strat-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-strat-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-strat-estimated">0</span></p>
  <br>
  <b>Economic Specialists (<span id="econ-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-econ-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-econ-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-econ-estimated">0</span></p>
  <br>
  <b>Cleanup Specialists (<span id="clean-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-clean-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-clean-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-clean-estimated">0</span></p>
  <p>Estimated Curable Nations: <span id="cure-clean-estimated">0</span></p>
</fieldset>`;

  // src/nukepage.ts
  function parseNukeStats(doc) {
    var header = doc.querySelector("h1.nukeh1");
    var nlink = header?.querySelector("a.nlink");
    const nationName = nlink?.querySelector("span")?.innerText;
    const nukeType = (header?.querySelector("span.fancylike")).innerText;
    const nukes = doc.querySelector("a.nukestat-nukes").innerText;
    const shields = doc.querySelector("a.nukestat-shield").innerText;
    const production = doc.querySelector("a.nukestat-production").innerText;
    const targets2 = doc.querySelector("a.nukestat-targets").innerText;
    const launches = doc.querySelector("a.nukestat-launches").innerText;
    const intercepts = doc.querySelector("a.nukestat-intercepts").innerText;
    const strikes = doc.querySelector("a.nukestat-strikes").innerText;
    const targeted = doc.querySelector("a.nukestat-targeted").innerText;
    const incoming = doc.querySelector("a.nukestat-incoming").innerText;
    const radiation = doc.querySelector("a.nukestat-radiation").innerText;
    const destroyedText = doc.querySelector(`span.smalltext[style*="color:red"]`);
    return {
      nation: canonicalize(nationName),
      nukeType: nukeType.slice(0, nukeType.indexOf(" Specialist")),
      isDestroyed: !!destroyedText,
      nukes: parseInt(nukes.replace(/,/g, "")),
      shields: parseInt(shields.replace(/,/g, "")),
      production: parseInt(production.replace(/,/g, "")),
      targets: parseInt(targets2.replace(/,/g, "")),
      launches: parseInt(launches.replace(/,/g, "")),
      intercepts: parseInt(intercepts.replace(/,/g, "")),
      strikes: parseInt(strikes.replace(/,/g, "")),
      targeted: parseInt(targeted.replace(/,/g, "")),
      incoming: parseInt(incoming.replace(/,/g, "")),
      radiation: parseInt(radiation.replace(/,/g, "")),
      scrapeTime: Date.now()
    };
  }
  var PRODUCTION_TICK_INTERVAL = 2 * 60 * 1e3;
  function productionCap(stats, isWa) {
    if (stats.nukeType == "Economic")
      return isWa ? 1e4 : 3e3;
    return isWa ? 2500 : 750;
  }
  var RADIATION_PENALTY = 0.66;
  function estimateProduction(stats, isWa) {
    if (stats.isDestroyed) return 0;
    const timeSinceScrape = Date.now() - stats.scrapeTime;
    const guaranteedTicks = Math.floor(timeSinceScrape / PRODUCTION_TICK_INTERVAL);
    const remainder = timeSinceScrape % PRODUCTION_TICK_INTERVAL;
    let productionRate = isWa ? 150 : 15;
    const productionDecay = stats.radiation / 100 * RADIATION_PENALTY;
    productionRate *= productionDecay;
    let estimatedProd = stats.production + productionRate * guaranteedTicks;
    if (remainder > PRODUCTION_TICK_INTERVAL / 2)
      estimatedProd += productionRate;
    return Math.min(Math.floor(estimatedProd), productionCap(stats, isWa));
  }
  function resourceCost(resource2, stats) {
    if (resource2 == "nuke") {
      if (stats.nukeType == "Military") return 2;
      else return 3;
    } else {
      if (stats.nukeType == "Strategic") return 4;
      else return 6;
    }
  }
  function estimatePossibleNukes(stats, isWa) {
    const prod2 = estimateProduction(stats, isWa);
    const cost = resourceCost("nuke", stats);
    return Math.floor(prod2 / cost);
  }
  function estimatePossibleShields(stats, isWa) {
    const prod2 = estimateProduction(stats, isWa);
    const cost = resourceCost("shield", stats);
    return Math.floor(prod2 / cost);
  }
  var CLEANUP_COST = 700;
  function estimateCleanupCount(stats, isWa) {
    const prod2 = estimateProduction(stats, isWa);
    return Math.floor(prod2 / CLEANUP_COST);
  }
  function saveNukeStats(stats) {
    GM_setValue(`nation:${stats.nation}`, JSON.stringify(stats));
  }
  function readNukeStatsAll() {
    let result = {};
    let keys = GM_listValues();
    Array.from(keys).filter((key) => key.startsWith("nation:")).forEach((key) => {
      const nationStats = JSON.parse(GM_getValue(key));
      result[nationStats.nation] = nationStats;
    });
    return result;
  }
  function readPuppets() {
    return Object.keys(readConfigRecord("puppets"));
  }
  function readNukeStatsPuppets() {
    let stats = readNukeStatsAll();
    let puppetNames = readPuppets();
    return Object.fromEntries(
      Object.entries(stats).filter(([nation, _]) => puppetNames.includes(nation))
    );
  }
  async function fetchNukeStats(script, nation) {
    let page = await script.getNsHtmlPage(
      `nation=${nation}/page=nukes`
    );
    script.statusBubble.success(
      `Queried N-Day stats for ${prettify(nation)}`
    );
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
    return stats;
  }

  // src/pages/station.ts
  function setupNukeStationPage() {
    let container = document.createElement("div");
    container.innerHTML = nukeStationHtml;
    getElement("content").appendChild(container);
    getButtonElement("mass-join-faction").onclick = () => {
      const fid3 = getInputElement("mass-join-fid").value;
      window.location.href = `https://${window.location.host}/page=blank/nuke/joinfaction/fid=${fid3}`;
    };
    const checkboxes = {
      "C": "prod-select-clean",
      "M": "prod-select-mil",
      "E": "prod-select-econ",
      "S": "prod-select-strat"
    };
    getButtonElement("mass-produce-nukes").onclick = () => {
      let groups2 = "";
      Object.entries(checkboxes).forEach(([group, id]) => {
        if (getInputElement(id).checked) groups2 += group;
      });
      window.location.href = `https://${window.location.host}/page=blank/nuke/prod/mode=nuke/groups=${groups2}`;
    };
    getButtonElement("mass-produce-shields").onclick = () => {
      let groups2 = "";
      Object.entries(checkboxes).forEach(([group, id]) => {
        if (getInputElement(id).checked) groups2 += group;
      });
      window.location.href = `https://${window.location.host}/page=blank/nuke/prod/mode=shield/groups=${groups2}`;
    };
    getButtonElement("mass-donate").onclick = () => {
      const ratio2 = parseInt(getInputElement("mass-donate-ratio").value);
      window.location.href = `https://${window.location.host}/page=blank/nuke/donate/ratio=${ratio2}`;
    };
    getButtonElement("mass-target-faction").onclick = () => {
      const fid3 = parseInt(getInputElement("mass-target-fid").value);
      const overkill = parseFloat(getInputElement("mass-target-overkill").value);
      window.location.href = `https://${window.location.host}/page=blank/nuke/target/fid=${fid3}/overkill=${overkill}`;
    };
    getButtonElement("mass-clean-faction").onclick = () => {
      const fid3 = parseInt(getInputElement("mass-clean-fid").value);
      window.location.href = `https://${window.location.host}/page=blank/nuke/clean/fid=${fid3}`;
    };
    let puppets7 = readPuppets();
    let stats = readNukeStatsPuppets();
    if (Object.keys(stats).length == 0) {
      setText("puppet-status", `${puppets7.length} Puppets Saved, 0 Alive / 0 Loaded (run Classify to load)`);
    } else {
      let prod2 = 0;
      let nukes = 0;
      let shields = 0;
      let destroyed = 0;
      let categoryTotals = {
        "Cleanup": { count: 0, estimatedProd: 0, estimatedNukes: 0, estimatedShield: 0, estimatedClean: 0 },
        "Military": { count: 0, estimatedProd: 0, estimatedNukes: 0, estimatedShield: 0, estimatedClean: 0 },
        "Economic": { count: 0, estimatedProd: 0, estimatedNukes: 0, estimatedShield: 0, estimatedClean: 0 },
        "Strategic": { count: 0, estimatedProd: 0, estimatedNukes: 0, estimatedShield: 0, estimatedClean: 0 }
      };
      Object.entries(stats).forEach(([_, stats2]) => {
        if (stats2.isDestroyed) destroyed += 1;
        else {
          prod2 += stats2.production;
          nukes += stats2.nukes;
          shields += stats2.shields;
          categoryTotals[stats2.nukeType].count += 1;
          categoryTotals[stats2.nukeType].estimatedProd += estimateProduction(stats2, false);
          categoryTotals[stats2.nukeType].estimatedNukes += estimatePossibleNukes(stats2, false);
          categoryTotals[stats2.nukeType].estimatedShield += estimatePossibleShields(stats2, false);
          if (stats2.nukeType === "Cleanup") {
            categoryTotals[stats2.nukeType].estimatedClean += estimateCleanupCount(stats2, false);
          }
        }
      });
      let puppetsLoaded = Object.keys(stats).length;
      let puppetsAlive = puppetsLoaded - destroyed;
      setText("puppet-status", `${puppets7.length} Puppets Saved, ${puppetsAlive} Alive / ${puppetsLoaded} Loaded`);
      setText(`prod-confirmed`, prod2.toString());
      setText(`nuke-confirmed`, nukes.toString());
      setText(`shield-confirmed`, shields.toString());
      setText(`destroyed-confirmed`, destroyed.toString());
      const categoryElementIds = {
        "Cleanup": "clean",
        "Military": "mil",
        "Economic": "econ",
        "Strategic": "strat"
      };
      Object.entries(categoryTotals).forEach(([category, stats2]) => {
        let id = categoryElementIds[category];
        setText(`${id}-count`, stats2.count.toString());
        setText(`prod-${id}-estimated`, stats2.estimatedProd.toString());
        setText(`nuke-${id}-estimated`, stats2.estimatedNukes.toString());
        setText(`shield-${id}-estimated`, stats2.estimatedShield.toString());
        if (category === "Cleanup") {
          setText(`cure-${id}-estimated`, stats2.estimatedClean.toString());
        }
      });
    }
  }

  // src/pages/html/config.ts
  var configHtml = `
<h1>Nuclear Configuration</h1>
<fieldset>
  <legend>User Agent</legend>
  <div class="frdata"><p>Your main nation name, used to identify yourself to the NS servers.</p></div></br>
  <input type="text" id="user-agent" placeholder="Enter nation name..."></input>
</fieldset>
<fieldset>
  <legend>Puppet List</legend>
  <div class="frdata"><p>A newline-separated list of your puppets in the format "nation,password" or "nation" to use the default password below.</p></div></br>
  <textarea id="puppet-list" rows="10" cols="30"></textarea>
</fieldset></br>
<fieldset>
  <legend>Default Password</legend>
  <div class="frdata"><p>The password to use for puppets if one is not provided above.</p></div></br>
  <input type="password" id="default-password" placeholder="Enter password here..."></input>
</fieldset>
<button id="save-settings" class="button big primary">Save Settings</button>
`;

  // src/pages/config.ts
  function setupConfigPage() {
    let container = document.createElement("div");
    container.innerHTML = configHtml;
    getElement("content").appendChild(container);
    getButtonElement("save-settings").onclick = () => {
      const userAgent = getInputElement("user-agent").value;
      const puppets7 = {};
      const puppetList = getInputElement("puppet-list").value;
      const defaultPassword = getInputElement("default-password").value;
      puppetList.split("\n").forEach((puppet) => {
        if (puppet.includes(",")) {
          let [nation, password] = puppet.split(",", 2);
          puppets7[canonicalize(nation)] = password;
        } else {
          puppets7[canonicalize(puppet)] = defaultPassword;
        }
      });
      setConfigValue("userAgent", userAgent);
      saveConfigRecord("puppets", puppets7);
      window.location.href = `https://${window.location.host}/page=blank/nuke/station`;
    };
  }

  // src/pages/html/classify.ts
  var classifyHtml = `
<br><b>Repeatedly press the button below or the Enter key until its label says "Done".</b>
<p id="progress">Progress: 0/?</p>
<button id="action" type="submit" class="button big primary">Start</button>
<p>Press M to go back to the nuclear control station when you're done.</p>
`;

  // src/pages/classify.ts
  var import_mousetrap = __toESM(require_mousetrap());
  var puppets = readPuppets();
  var index = 0;
  function updateProgress() {
    setText("progress", `Progress: ${index}/${puppets.length}`);
    if (index >= puppets.length) setText("action", `Done`);
    setText("action", `Query ${prettify(puppets[index])}`);
  }
  function setupClassifyPage() {
    let container = document.createElement("div");
    container.innerHTML = classifyHtml;
    getElement("content").appendChild(container);
    updateProgress();
    getButtonElement("action").onclick = () => {
      import_mousetrap.default.trigger(loadKeybind(keybinds.action));
    };
    return classify;
  }
  async function classify(script) {
    if (index >= puppets.length) return;
    const puppet = puppets[index];
    await fetchNukeStats(script, puppet);
    index += 1;
    updateProgress();
  }

  // src/pages/prod.ts
  var import_mousetrap2 = __toESM(require_mousetrap());

  // src/pages/html/prod.ts
  var prodHtml = `
<br><b>Repeatedly press the button below or the Enter key until its label says "Done".</b>
<p id="progress">Progress: 0/?</p>
<p id="nation">Current nation: none</p>
<button id="action" type="submit" class="button big primary">Start</button>
<p>Press M to go back to the nuclear control station when you're done.</p>
`;

  // src/endpoints.ts
  async function convertProductionToNukes(script, amount) {
    let page = await script.getNsHtmlPage(
      `page=nukes/view=production`,
      {
        convertproduction: `nukes:${amount}`
      }
    );
    if (page.includes(
      "Arms Control Treaty is now in effect!"
    )) {
      script.statusBubble.warn(
        "Arms Control Treaty in effect"
      );
    } else {
      script.statusBubble.success(
        `Created ${amount} nukes`
      );
    }
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
  }
  async function convertProductionToShields(script, amount) {
    let page = await script.getNsHtmlPage(
      `page=nukes/view=production`,
      {
        convertproduction: `shield:${amount}`
      }
    );
    if (page.includes(
      "Arms Control Treaty is now in effect!"
    )) {
      script.statusBubble.warn(
        "Arms Control Treaty in effect"
      );
    } else {
      script.statusBubble.success(
        `Created ${amount} shields`
      );
    }
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
  }
  async function targetNukesAtNation(script, target2, amount) {
    let page = await script.getNsHtmlPage(
      `page=nukes`,
      {
        target: target2,
        nukes: `${amount}`
      }
    );
    if (page.includes(
      "Arms Control Treaty is now in effect!"
    )) {
      script.statusBubble.warn(
        "Arms Control Treaty in effect"
      );
    } else {
      script.statusBubble.success(
        `Targeted ${amount} nukes at ${target2}`
      );
    }
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
  }
  async function cleanupNation(script, target2) {
    let page = await script.getNsHtmlPage(
      `page=nukes/view=radiation`,
      {
        cureradiation: target2
      }
    );
    if (page.includes(
      "Arms Control Treaty is now in effect!"
    )) {
      script.statusBubble.warn(
        "Arms Control Treaty in effect"
      );
    } else {
      script.statusBubble.success(
        `Cleaned up 10 radiation on ${target2}`
      );
    }
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
  }
  async function donateToShieldBank(script, amount) {
    let page = await script.getNsHtmlPage(
      `page=nukes/view=shield`,
      {
        donateshields: `${amount}`
      }
    );
    if (page.includes(
      "Arms Control Treaty is now in effect!"
    )) {
      script.statusBubble.warn(
        "Arms Control Treaty in effect"
      );
    } else {
      script.statusBubble.success(
        `Donated ${amount} shields to faction shieldbank`
      );
    }
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const stats = parseNukeStats(doc);
    saveNukeStats(stats);
  }
  async function joinFaction(script, fid3) {
    let page = await script.getNsHtmlPage(
      `page=faction/fid=${fid3}`,
      {
        consider_join_faction: `1`,
        join_faction: `1`
      }
    );
    if (page.includes(
      "N-Day has now finished."
    )) {
      script.statusBubble.warn(
        "Arms Control Treaty in effect"
      );
    } else {
      script.statusBubble.success(
        `Joined faction ${fid3}`
      );
    }
  }

  // src/pages/prod.ts
  var resource = checkPageRegex(/mode=(shield|nuke)/) || "nuke";
  var groups = checkPageRegex(/groups=([CESM]+)/) || "";
  var puppets2 = readConfigRecord("puppets");
  var puppetStats = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if (stats.isDestroyed) return false;
    let type = stats.nukeType.charAt(0);
    return groups.includes(type);
  }).map(
    (value) => ({ value, sort: estimateProduction(value[1], false) + generateRandomNumber(-150, 150) })
  ).sort(
    (a, b) => b.sort - a.sort
  ).map(({ value }) => value);
  var index2 = 0;
  var currentNation = "";
  var resourceAmount = 0;
  var prodState = 0 /* Login */;
  function updateProgress2() {
    setText("progress", `Progress: ${index2}/${puppetStats.length}`);
    if (index2 >= Object.keys(puppetStats).length) setText("action", `Done`);
  }
  function setupProdPage() {
    let container = document.createElement("div");
    container.innerHTML = prodHtml;
    getElement("content").appendChild(container);
    updateProgress2();
    getButtonElement("action").onclick = () => {
      import_mousetrap2.default.trigger(loadKeybind(keybinds.action));
    };
    return prod;
  }
  async function prod(script) {
    switch (prodState) {
      case 0 /* Login */: {
        if (index2 >= puppetStats.length) {
          index2 = puppetStats.length;
          updateProgress2();
          prodState = 3 /* Finish */;
          setText("action", "Done");
          return;
        }
        let [nation, _] = puppetStats[index2];
        await script.login(nation, puppets2[nation]);
        updateProgress2();
        index2 += 1;
        prodState = 1 /* Query */;
        currentNation = nation;
        setText("nation", `Current nation: ${prettify(currentNation)}`);
        setText("action", `Query Production for ${prettify(currentNation)}`);
        return;
      }
      case 1 /* Query */: {
        let newStats = await fetchNukeStats(script, currentNation);
        if (newStats.isDestroyed || newStats.production < resourceCost(resource, newStats)) {
          prodState = 0 /* Login */;
          setText("action", `Login to Next Nation`);
        } else {
          prodState = 2 /* Produce */;
          resourceAmount = Math.floor(newStats.production / resourceCost(resource, newStats));
          setText("action", `Build ${resourceAmount} ${resource}s on ${prettify(currentNation)}`);
        }
        return;
      }
      case 2 /* Produce */: {
        if (resource == "nuke") {
          await convertProductionToNukes(script, resourceAmount);
        } else {
          await convertProductionToShields(script, resourceAmount);
        }
        prodState = 0 /* Login */;
        setText("action", `Login to Next Nation`);
        return;
      }
      case 3 /* Finish */:
        return;
    }
  }

  // src/pages/joinfaction.ts
  var import_mousetrap3 = __toESM(require_mousetrap());

  // src/pages/html/joinfaction.ts
  var joinFactionHtml = `
<br><b>Repeatedly press the button below or the Enter key until its label says "Done".</b>
<p id="progress">Progress: 0/?</p>
<p id="nation">Current nation: none</p>
<button id="action" type="submit" class="button big primary">Start</button>
<p>Press M to go back to the nuclear control station when you're done.</p>
`;

  // src/pages/joinfaction.ts
  var targetFid = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");
  var puppets3 = readConfigRecord("puppets");
  var puppetCount = Object.keys(puppets3).length;
  var index3 = 0;
  var currentNation2 = "";
  var joinState = 0 /* Login */;
  function updateProgress3() {
    setText("progress", `Progress: ${index3}/${puppetCount}`);
    if (index3 >= Object.keys(puppets3).length) setText("action", `Done`);
  }
  function setupJoinFactionPage() {
    let container = document.createElement("div");
    container.innerHTML = joinFactionHtml;
    getElement("content").appendChild(container);
    updateProgress3();
    getButtonElement("action").onclick = () => {
      import_mousetrap3.default.trigger(loadKeybind(keybinds.action));
    };
    return joinfaction;
  }
  async function joinfaction(script) {
    switch (joinState) {
      case 0 /* Login */: {
        if (index3 >= puppetCount) {
          index3 = puppetCount;
          updateProgress3();
          joinState = 2 /* Finish */;
          setText("action", "Done");
          return;
        }
        let [nation, password] = Object.entries(puppets3)[index3];
        await script.login(nation, password);
        updateProgress3();
        index3 += 1;
        joinState = 1 /* Join */;
        currentNation2 = nation;
        setText("nation", `Current nation: ${prettify(currentNation2)}`);
        setText("action", `Join Faction ${targetFid} on ${prettify(currentNation2)}`);
        return;
      }
      case 1 /* Join */: {
        await joinFaction(script, targetFid);
        joinState = 0 /* Login */;
        setText("action", `Login to Next Nation`);
        return;
      }
      case 2 /* Finish */:
        return;
    }
  }

  // src/pages/donate.ts
  var import_mousetrap4 = __toESM(require_mousetrap());

  // src/pages/html/donate.ts
  var donateHtml = `
<br><b>Repeatedly press the button below or the Enter key until its label says "Done".</b>
<p id="progress">Progress: 0/?</p>
<p id="nation">Current nation: none</p>
<button id="action" type="submit" class="button big primary">Start</button>
<p>Press M to go back to the nuclear control station when you're done.</p>
`;

  // src/pages/donate.ts
  var ratio = Math.min(parseInt(checkPageRegex(/ratio=([0-9]+)/) || "50"), 100) / 100;
  var puppets4 = readConfigRecord("puppets");
  var puppetStats2 = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if (stats.isDestroyed) return false;
    return stats.shields > 0;
  }).map((value) => ({ value, sort: value[1].shields + generateRandomNumber(-25, 25) })).sort(
    (a, b) => b.sort - a.sort
  ).map(({ value }) => value);
  console.log(puppetStats2);
  var index4 = 0;
  var currentNation3 = "";
  var shieldAmount = 0;
  var donateState = 0 /* Login */;
  function updateProgress4() {
    setText("progress", `Progress: ${index4}/${puppetStats2.length}`);
    if (index4 >= Object.keys(puppetStats2).length) setText("action", `Done`);
  }
  function setupDonatePage() {
    let container = document.createElement("div");
    container.innerHTML = donateHtml;
    getElement("content").appendChild(container);
    updateProgress4();
    getButtonElement("action").onclick = () => {
      import_mousetrap4.default.trigger(loadKeybind(keybinds.action));
    };
    return donate;
  }
  async function donate(script) {
    switch (donateState) {
      case 0 /* Login */: {
        if (index4 >= puppetStats2.length) {
          index4 = puppetStats2.length;
          updateProgress4();
          donateState = 3 /* Finish */;
          setText("action", "Done");
          return;
        }
        let [nation, _] = puppetStats2[index4];
        await script.login(nation, puppets4[nation]);
        updateProgress4();
        index4 += 1;
        donateState = 1 /* Query */;
        currentNation3 = nation;
        setText("nation", `Current nation: ${prettify(currentNation3)}`);
        setText("action", `Query Shields for ${prettify(currentNation3)}`);
        return;
      }
      case 1 /* Query */: {
        let newStats = await fetchNukeStats(script, currentNation3);
        shieldAmount = Math.floor(newStats.shields * ratio);
        if (newStats.isDestroyed || shieldAmount == 0) {
          donateState = 0 /* Login */;
          setText("action", `Login to Next Nation`);
        } else {
          donateState = 2 /* Donate */;
          setText("action", `Donate ${shieldAmount} shields to shieldbank`);
        }
        return;
      }
      case 2 /* Donate */: {
        await donateToShieldBank(script, shieldAmount);
        donateState = 0 /* Login */;
        setText("action", `Login to Next Nation`);
        return;
      }
      case 3 /* Finish */:
        return;
    }
  }

  // src/pages/target.ts
  var import_mousetrap5 = __toESM(require_mousetrap());

  // src/pages/html/target.ts
  var targetHtml = `
<br><b>Repeatedly press the button below or the Enter key until its label says "Done".</b>
<p id="progress">Progress: 0/?</p>
<p id="targets">Targets left: 0 (finding random nations in target faction)</p>
<p id="nation">Current nation: none</p>
<button id="action" type="submit" class="button big primary">Start</button>
<p>Press M to go back to the nuclear control station when you're done.</p>

<b>Upload a target list: <input type="file" id="csv-import-targets"></input></p>
`;

  // src/factionpage.ts
  function parseNukeStat(doc, stat) {
    let element = doc.querySelector(`a.nukestat-${stat}`);
    return parseInt(
      element.childNodes[1].textContent.replace(/,/g, "")
    );
  }
  async function fetchFactionStats(script, fid3) {
    let page = await script.getNsHtmlPage(
      `page=faction/fid=${fid3}`
    );
    script.statusBubble.success(
      `Queried N-Day stats for faction ${fid3}`
    );
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    let faction = {
      fid: fid3,
      score: parseNukeStat(doc, "score"),
      nations: parseNukeStat(doc, "nations"),
      nukes: parseNukeStat(doc, "nukes"),
      shields: parseNukeStat(doc, "shield"),
      shieldbank: parseNukeStat(doc, "shieldbank"),
      production: parseNukeStat(doc, "production"),
      targets: parseNukeStat(doc, "targets"),
      launches: parseNukeStat(doc, "launches"),
      intercepts: parseNukeStat(doc, "intercepts"),
      strikes: parseNukeStat(doc, "strikes"),
      targeted: parseNukeStat(doc, "targeted"),
      incoming: parseNukeStat(doc, "incoming"),
      radiation: parseNukeStat(doc, "radiation"),
      scrapeTime: Date.now() / 1e3
    };
    return faction;
  }
  function extractNationFromURL(url) {
    let regexResult = /nation=([a-z0-9_\-]+)/.exec(url);
    if (regexResult == null) return void 0;
    return regexResult[1];
  }
  async function queryNationsPage(script, fid3, start) {
    let page = await script.getNsHtmlPage(
      `page=faction/fid=${fid3}/view=nations`,
      {
        start
      }
    );
    script.statusBubble.success(
      `Queried nations list for faction ${fid3}`
    );
    const parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    const tableBody = doc.querySelector("ol");
    return Array.from(tableBody?.children).map((element) => [
      extractNationFromURL(element.querySelector("a")?.href || ""),
      !!element.querySelector("span.nukedestroyedicon")
    ]);
  }

  // src/pages/target.ts
  var fid = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");
  var defaultOverkill = parseInt(checkPageRegex(/overkill=([0-9]+)/) || "1");
  var puppets5 = readConfigRecord("puppets");
  var puppetStats3 = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if (stats.isDestroyed) return false;
    return stats.nukes > 0;
  }).map((value) => ({ value, sort: value[1].nukes + generateRandomNumber(-50, 50) })).sort(
    (a, b) => b.sort - a.sort
  ).map(({ value }) => value);
  var index5 = 0;
  var currentNation4 = "";
  var currentTarget = "";
  var currentOverkill = 1;
  var nukeAmount = 0;
  var targetNukeAmount = 0;
  var targets = new Array();
  var targetFactionData = null;
  var targetState = 0 /* Login */;
  function updateProgress5() {
    setText("progress", `Progress: ${index5}/${puppetStats3.length}`);
    if (targets.length == 0) {
      setText("targets", `Targets left: 0 (finding random nations in target faction)`);
    } else {
      setText("targets", `Targets left: ${targets.length}`);
    }
    if (index5 >= Object.keys(puppetStats3).length) setText("action", `Done`);
  }
  function importTargets(csv) {
    csv.split("\n").forEach((value) => {
      if (!value.length) return;
      let [target2, multiplier] = value.split(",", 2);
      targets.push([target2, parseFloat(multiplier)]);
    });
    console.log(targets);
    updateProgress5();
  }
  function setupTargetPage() {
    let container = document.createElement("div");
    container.innerHTML = targetHtml;
    getElement("content").appendChild(container);
    updateProgress5();
    getButtonElement("action").onclick = () => {
      import_mousetrap5.default.trigger(loadKeybind(keybinds.action));
    };
    getInputElement("csv-import-targets").addEventListener("change", function(event) {
      const element = event.target;
      let fileList = element.files;
      if (fileList && fileList.length) {
        let file = fileList[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target?.result;
          importTargets(content);
        };
        reader.readAsText(file);
      }
    });
    return target;
  }
  async function target(script) {
    switch (targetState) {
      case 0 /* Login */: {
        if (index5 >= puppetStats3.length) {
          index5 = puppetStats3.length;
          updateProgress5();
          targetState = 5 /* Finish */;
          setText("action", "Done");
          return;
        }
        let [nation, _] = puppetStats3[index5];
        await script.login(nation, puppets5[nation]);
        updateProgress5();
        index5 += 1;
        targetState = 1 /* QuerySelf */;
        currentNation4 = nation;
        setText("nation", `Current nation: ${prettify(currentNation4)}`);
        setText("action", `Query Nukes for ${prettify(currentNation4)}`);
        return;
      }
      case 1 /* QuerySelf */: {
        let newStats = await fetchNukeStats(script, currentNation4);
        nukeAmount = newStats.nukes;
        if (newStats.isDestroyed || nukeAmount == 0) {
          targetState = 0 /* Login */;
          setText("action", `Login to Next Nation`);
        } else {
          let [target2, multiplier] = targets.pop() || [void 0, 1];
          if (target2 === void 0) {
            updateProgress5();
            targetState = 2 /* FindTarget */;
            setText("action", `Find Target in Enemy Faction`);
          } else {
            currentTarget = target2;
            currentOverkill = multiplier;
            targetState = 3 /* QueryTarget */;
            setText("action", `Target ${prettify(currentTarget)}`);
          }
        }
        return;
      }
      case 3 /* QueryTarget */: {
        let targetStats = await fetchNukeStats(script, currentTarget);
        if (targetStats.isDestroyed) {
          let [target2, multiplier] = targets.pop() || [void 0, 1];
          if (target2 === void 0) {
            targetState = 2 /* FindTarget */;
            setText("action", `Find Target in Enemy Faction`);
          } else {
            currentTarget = target2;
            currentOverkill = multiplier;
            targetState = 3 /* QueryTarget */;
            setText("action", `Prepare to Target ${prettify(currentTarget)}`);
          }
        } else {
          let targetRads = 100 - targetStats.radiation;
          let nukesRequired = Math.max(targetRads * 4 * currentOverkill - targetStats.targeted, 0);
          if (nukesRequired == 0) {
            let [target2, multiplier] = targets.pop() || [void 0, 1];
            if (target2 === void 0) {
              targetState = 2 /* FindTarget */;
              setText("action", `Find Target in Enemy Faction`);
            } else {
              currentTarget = target2;
              currentOverkill = multiplier;
              targetState = 3 /* QueryTarget */;
              setText("action", `Prepare to Target ${prettify(currentTarget)}`);
            }
            return;
          }
          if (nukesRequired > nukeAmount) {
            targets.push([currentTarget, currentOverkill]);
          }
          targetNukeAmount = Math.min(nukeAmount, nukesRequired);
        }
        return;
      }
      case 2 /* FindTarget */: {
        if (targetFactionData == null) {
          targetFactionData = await fetchFactionStats(script, fid);
          return;
        }
        let totalPages = Math.ceil(targetFactionData.nations / 50);
        let page = generateRandomNumber(0, totalPages - 1);
        let nations = await queryNationsPage(script, fid, page * 50);
        let eligibleNations = nations.filter(([_, isDestroyed]) => {
          return !isDestroyed;
        });
        if (!eligibleNations.length) return;
        let index7 = generateRandomNumber(0, eligibleNations.length - 1);
        currentTarget = eligibleNations[index7][0];
        currentOverkill = defaultOverkill;
        targetState = 3 /* QueryTarget */;
        setText("action", `Prepare to Target ${prettify(currentTarget)}`);
        return;
      }
      case 4 /* TargetNukes */: {
        await targetNukesAtNation(script, currentTarget, targetNukeAmount);
        updateProgress5();
        nukeAmount -= targetNukeAmount;
        if (nukeAmount <= 0) {
          targetState = 0 /* Login */;
          setText("action", `Login to Next Nation`);
          return;
        } else {
          let [target2, multiplier] = targets.pop() || [void 0, 1];
          if (target2 === void 0) {
            targetState = 2 /* FindTarget */;
            setText("action", `Find Target in Enemy Faction`);
          } else {
            currentTarget = target2;
            currentOverkill = multiplier;
            targetState = 3 /* QueryTarget */;
            setText("action", `Prepare to Target ${prettify(currentTarget)}`);
          }
        }
      }
      case 5 /* Finish */:
        return;
    }
  }

  // src/pages/cleanup.ts
  var import_mousetrap6 = __toESM(require_mousetrap());

  // src/pages/html/cleanup.ts
  var cleanupHtml = `
<br><b>Repeatedly press the button below or the Enter key until its label says "Done".</b>
<p id="progress">Progress: 0/?</p>
<p id="targets">Nations left: 0 (finding random nations in faction)</p>
<p id="nation">Current nation: none</p>
<button id="action" type="submit" class="button big primary">Start</button>
<p>Press M to go back to the nuclear control station when you're done.</p>

<b>Upload a cleanup list: <input type="file" id="csv-import-nations"></input></p>
`;

  // src/pages/cleanup.ts
  var fid2 = parseInt(checkPageRegex(/fid=([0-9]+)/) || "0");
  var puppets6 = readConfigRecord("puppets");
  var puppetStats4 = Object.entries(readNukeStatsPuppets()).filter(([_, stats]) => {
    if (stats.isDestroyed) return false;
    return stats.nukeType == "Cleanup";
  }).map((value) => ({ value, sort: estimateProduction(value[1], false) + generateRandomNumber(-150, 150) })).sort(
    (a, b) => b.sort - a.sort
  ).map(({ value }) => value);
  var index6 = 0;
  var currentNation5 = "";
  var currentTarget2 = "";
  var prodAmount = 0;
  var nationsToClean = new Array();
  var cleanFactionData = null;
  var CLEANUP_COST2 = 700;
  var cleanupState = 0 /* Login */;
  function updateProgress6() {
    setText("progress", `Progress: ${index6}/${puppetStats4.length}`);
    if (nationsToClean.length == 0) {
      setText("targets", `Nations left: 0 (finding random nations in faction)`);
    } else {
      setText("targets", `Nations left: ${nationsToClean.length}`);
    }
    if (index6 >= Object.keys(puppetStats4).length) setText("action", `Done`);
  }
  function importNations(csv) {
    csv.split("\n").forEach((value) => {
      if (!value.length) return;
      nationsToClean.push(value);
    });
    console.log(nationsToClean);
    updateProgress6();
  }
  function setupCleanupPage() {
    let container = document.createElement("div");
    container.innerHTML = cleanupHtml;
    getElement("content").appendChild(container);
    updateProgress6();
    getButtonElement("action").onclick = () => {
      import_mousetrap6.default.trigger(loadKeybind(keybinds.action));
    };
    getInputElement("csv-import-nations").addEventListener("change", function(event) {
      const element = event.target;
      let fileList = element.files;
      if (fileList && fileList.length) {
        let file = fileList[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target?.result;
          importNations(content);
        };
        reader.readAsText(file);
      }
    });
    return cleanup;
  }
  async function cleanup(script) {
    switch (cleanupState) {
      case 0 /* Login */: {
        if (index6 >= puppetStats4.length) {
          index6 = puppetStats4.length;
          updateProgress6();
          cleanupState = 5 /* Finish */;
          setText("action", "Done");
          return;
        }
        let [nation, _] = puppetStats4[index6];
        await script.login(nation, puppets6[nation]);
        updateProgress6();
        index6 += 1;
        cleanupState = 1 /* QuerySelf */;
        currentNation5 = nation;
        setText("nation", `Current nation: ${prettify(currentNation5)}`);
        setText("action", `Query Production for ${prettify(currentNation5)}`);
        return;
      }
      case 1 /* QuerySelf */: {
        let newStats = await fetchNukeStats(script, currentNation5);
        prodAmount = newStats.production;
        if (newStats.isDestroyed || prodAmount < CLEANUP_COST2) {
          cleanupState = 0 /* Login */;
          setText("action", `Login to Next Nation`);
        } else {
          let target2 = nationsToClean.pop();
          if (target2 === void 0) {
            updateProgress6();
            cleanupState = 2 /* FindTarget */;
            setText("action", `Find Nation to Clean in Faction`);
          } else {
            currentTarget2 = target2;
            cleanupState = 3 /* QueryTarget */;
            setText("action", `Prepare to Clean ${prettify(currentTarget2)}`);
          }
        }
        return;
      }
      case 3 /* QueryTarget */: {
        let targetStats = await fetchNukeStats(script, currentTarget2);
        if (!targetStats.isDestroyed) {
          let target2 = nationsToClean.pop();
          if (target2 === void 0) {
            updateProgress6();
            cleanupState = 2 /* FindTarget */;
            setText("action", `Find Nation to Clean in Faction`);
          } else {
            currentTarget2 = target2;
            cleanupState = 3 /* QueryTarget */;
            setText("action", `Prepare to Clean ${prettify(currentTarget2)}`);
          }
        } else {
          cleanupState = 4 /* Cleanup */;
          setText("action", `Clean ${prettify(currentTarget2)}`);
        }
        return;
      }
      case 2 /* FindTarget */: {
        if (cleanFactionData == null) {
          cleanFactionData = await fetchFactionStats(script, fid2);
          return;
        }
        let totalPages = Math.ceil(cleanFactionData.nations / 50);
        let page = generateRandomNumber(0, totalPages - 1);
        let nations = await queryNationsPage(script, fid2, page * 50);
        let eligibleNations = nations.filter(([_, isDestroyed]) => {
          return isDestroyed;
        });
        if (!eligibleNations.length) return;
        let index7 = generateRandomNumber(0, eligibleNations.length - 1);
        currentTarget2 = eligibleNations[index7][0];
        cleanupState = 3 /* QueryTarget */;
        setText("action", `Prepare to Clean ${prettify(currentTarget2)}`);
        return;
      }
      case 4 /* Cleanup */: {
        await cleanupNation(script, currentTarget2);
        updateProgress6();
        prodAmount -= CLEANUP_COST2;
        if (prodAmount < CLEANUP_COST2) {
          cleanupState = 0 /* Login */;
          setText("action", `Login to Next Nation`);
          return;
        } else {
          let target2 = nationsToClean.pop();
          if (target2 === void 0) {
            updateProgress6();
            cleanupState = 2 /* FindTarget */;
            setText("action", `Find Nation to Clean in Faction`);
          } else {
            currentTarget2 = target2;
            cleanupState = 3 /* QueryTarget */;
            setText("action", `Prepare to Clean ${prettify(currentTarget2)}`);
          }
        }
      }
      case 5 /* Finish */:
        return;
    }
  }

  // src/main.ts
  var SCRIPT_NAME = "Anemone";
  var AUTHOR = "Merethin";
  (async function() {
    "use strict";
    let action = async (_) => {
    };
    if (checkPage("page=blank/nuke/station")) {
      setupNukeStationPage();
    } else if (checkPage("page=blank/nuke/config")) {
      setupConfigPage();
    } else if (checkPage("page=blank/nuke/classify")) {
      action = setupClassifyPage();
    } else if (checkPage("page=blank/nuke/prod")) {
      action = setupProdPage();
    } else if (checkPage("page=blank/nuke/joinfaction")) {
      action = setupJoinFactionPage();
    } else if (checkPage("page=blank/nuke/donate")) {
      action = setupDonatePage();
    } else if (checkPage("page=blank/nuke/target")) {
      action = setupTargetPage();
    } else if (checkPage("page=blank/nuke/clean")) {
      action = setupCleanupPage();
    }
    let userAgent = readConfigValue("userAgent");
    if (userAgent == null) {
      if (!checkPage("page=blank/nuke/config")) {
        injectUserAgentWarning();
      }
    } else {
      let script = new NSScript(SCRIPT_NAME, VERSION, AUTHOR, userAgent, async () => {
      });
      import_mousetrap7.default.bind(loadKeybind(keybinds.main), (_) => {
        if (script.isHtmlRequestInProgress) return;
        window.location.href = `https://${window.location.host}/page=blank/nuke/station`;
      });
      import_mousetrap7.default.bind(loadKeybind(keybinds.action), (_) => {
        if (script.isHtmlRequestInProgress) return;
        if (action !== void 0) action(script);
      });
    }
  })();
})();
