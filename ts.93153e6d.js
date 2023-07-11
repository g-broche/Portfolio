// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/ts/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
/* ********** DATABASE AND HELPER FUNCTION********** */
var pathToImg = 'src/assets/pictures/';
function getImagePath(fileNamePattern) {
  var imagePath = pathToImg + fileNamePattern;
  return imagePath;
}
var PhotoCollection = [{
  id: 1,
  title: "Bee and sunflower",
  fileNames: {
    xsmall: getImagePath("bee-sunflower_160.webp"),
    small: getImagePath("bee-sunflower_240.webp"),
    medium: getImagePath("bee-sunflower_480.webp"),
    large: getImagePath("bee-sunflower_720.webp")
  },
  tag: ["abeille", "tournesol"]
}, {
  id: 2,
  title: "Crabier chevelu",
  fileNames: {
    xsmall: getImagePath("crabier_160.webp"),
    small: getImagePath("crabier_240.webp"),
    medium: getImagePath("crabier_480.webp"),
    large: getImagePath("crabier_720.webp")
  },
  tag: ["crabier"]
}, {
  id: 3,
  title: "Renard du soir",
  fileNames: {
    xsmall: getImagePath("fox_160.webp"),
    small: getImagePath("fox_240.webp"),
    medium: getImagePath("fox_480.webp"),
    large: getImagePath("fox_720.webp")
  },
  tag: ["renard"]
}, {
  id: 4,
  title: "Hermine",
  fileNames: {
    xsmall: getImagePath("hermine_160.webp"),
    small: getImagePath("hermine_240.webp"),
    medium: getImagePath("hermine_480.webp"),
    large: getImagePath("hermine_720.webp")
  },
  tag: ["hermine"]
}, {
  id: 5,
  title: "Libellule en vol",
  fileNames: {
    xsmall: getImagePath("libellule_160.webp"),
    small: getImagePath("libellule_240.webp"),
    medium: getImagePath("libellule_480.webp"),
    large: getImagePath("libellule_720.webp")
  },
  tag: ["libellule"]
}, {
  id: 6,
  title: "Marmottes du Taillefer",
  fileNames: {
    xsmall: getImagePath("marmottes_160.webp"),
    small: getImagePath("marmottes_240.webp"),
    medium: getImagePath("marmottes_480.webp"),
    large: getImagePath("marmottes_720.webp")
  },
  tag: ["marmottes"]
}];
/* ********** PAGE ELEMENTS ********** */
var pictureGrid = document.getElementById("picture-grid");
var modalPictureContainer = document.getElementById("modal-picture-container");
var modalPreviousButton = document.getElementById("modal-picture-previous");
var modalNextButton = document.getElementById("modal-picture-next");
var modalCloseButton = document.getElementById("modal-picture-close");
var modalPicture = document.getElementById("modal-picture-img");
var modalPhotoOverlay = document.getElementById("modal-photo-overlay");
// const btnContact = document.getElementById("btn-contact")! as HTMLButtonElement;
// const modalFormContainer = document.getElementById("modal-form-wrapper");
// const submitErrorMsg = document.getElementById("submit-error") as HTMLSpanElement;
// const contactEmail = document.getElementById("email-field") as HTMLInputElement;
// const contactMessage = document.getElementById("message-field") as HTMLTextAreaElement;
// const contactLengthFeedback = document.getElementById("message-length") as HTMLSpanElement;
// const contactCancel = document.getElementById("form-cancel") as HTMLButtonElement;
// const contactSubmit = document.getElementById("form-submit") as HTMLButtonElement;
// const modalContactOverlay = document.getElementById("modal-contact-overlay");
/* ********** EVENT LISTENERS ********** */
modalCloseButton === null || modalCloseButton === void 0 ? void 0 : modalCloseButton.addEventListener("click", hideModalPictureContainer);
modalPhotoOverlay === null || modalPhotoOverlay === void 0 ? void 0 : modalPhotoOverlay.addEventListener("click", hideModalPictureContainer);
modalNextButton === null || modalNextButton === void 0 ? void 0 : modalNextButton.addEventListener("click", toNextPhoto);
modalPreviousButton === null || modalPreviousButton === void 0 ? void 0 : modalPreviousButton.addEventListener("click", toPreviousPhoto);
// btnContact.addEventListener("click", openContactModal)
// contactMessage.addEventListener("input", displayCurrentLength);
// contactCancel.addEventListener("click", closeContactModal)
// contactSubmit.addEventListener("click", handleSubmit)
/* ********** FUNCTIONS ********** */
function createOneThumbnail(image) {
  var newPictureContainer = document.createElement("picture");
  var sourcemedium = document.createElement("source");
  var sourcesmall = document.createElement("source");
  var imgDefaut = document.createElement("img");
  newPictureContainer.classList.add("thumbnail");
  newPictureContainer.dataset.id = String(image.id);
  newPictureContainer.addEventListener("click", function (event) {
    displayModalPicture(event);
  });
  sourcemedium.setAttribute("srcset", image.fileNames.medium);
  sourcemedium.setAttribute("media", "(min-width: 1080px)");
  sourcemedium.setAttribute("alt", image.title);
  sourcesmall.setAttribute("srcset", image.fileNames.small);
  sourcesmall.setAttribute("media", "(min-width: 720px)");
  sourcesmall.setAttribute("alt", image.title);
  imgDefaut.setAttribute("src", image.fileNames.xsmall);
  imgDefaut.setAttribute("alt", image.title);
  newPictureContainer.append(sourcemedium, sourcesmall, imgDefaut);
  return newPictureContainer;
}
function displayPictures() {
  PhotoCollection.forEach(function (photo) {
    pictureGrid === null || pictureGrid === void 0 ? void 0 : pictureGrid.appendChild(createOneThumbnail(photo));
  });
}
function displayModalPicture(event) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var sourceImage, imageToLoad;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          sourceImage = getSourceImage(event);
          if (!sourceImage) {
            _context.next = 10;
            break;
          }
          if (!((modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.dataset.id) && sourceImage.id === parseInt(modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.dataset.id))) {
            _context.next = 6;
            break;
          }
          showModalPictureContainer();
          _context.next = 10;
          break;
        case 6:
          setModalPictureContent(sourceImage);
          imageToLoad = modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.querySelector(".source-main");
          _context.next = 10;
          return loadImage(imageToLoad).then(function () {
            showModalPictureContainer();
            imageToLoad.onload = null;
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
function loadImage(elem) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            elem.onload = function () {
              return resolve(elem);
            };
            elem.onerror = reject;
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
}
function getSourceImage(event) {
  var _a;
  var targetImage = event.target;
  var imageId = (_a = targetImage.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.id;
  return findImageFromId(imageId ? parseInt(imageId) : null);
}
function setModalPictureContent(image) {
  var _a, _b, _c;
  if (modalPicture) {
    modalPicture.dataset.id = String(image.id);
  }
  ;
  (_a = modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.querySelector(".source-main")) === null || _a === void 0 ? void 0 : _a.setAttribute("srcset", image.fileNames.large);
  (_b = modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.querySelector(".source-medium")) === null || _b === void 0 ? void 0 : _b.setAttribute("srcset", image.fileNames.medium);
  (_c = modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.querySelector(".source-small")) === null || _c === void 0 ? void 0 : _c.setAttribute("src", image.fileNames.small);
}
function findImageFromId(id) {
  var newMainImage = id !== null ? PhotoCollection.find(function (photo) {
    return photo.id == id;
  }) : null;
  return newMainImage ? newMainImage : null;
}
function hideModalPictureContainer() {
  modalPictureContainer === null || modalPictureContainer === void 0 ? void 0 : modalPictureContainer.classList.remove("visible");
  modalPhotoOverlay === null || modalPhotoOverlay === void 0 ? void 0 : modalPhotoOverlay.classList.remove("visible");
  modalPictureContainer === null || modalPictureContainer === void 0 ? void 0 : modalPictureContainer.classList.add("hidden");
  modalPhotoOverlay === null || modalPhotoOverlay === void 0 ? void 0 : modalPhotoOverlay.classList.add("hidden");
}
function showModalPictureContainer() {
  modalPictureContainer === null || modalPictureContainer === void 0 ? void 0 : modalPictureContainer.classList.remove("hidden");
  modalPhotoOverlay === null || modalPhotoOverlay === void 0 ? void 0 : modalPhotoOverlay.classList.remove("hidden");
  modalPictureContainer === null || modalPictureContainer === void 0 ? void 0 : modalPictureContainer.classList.add("visible");
  modalPhotoOverlay === null || modalPhotoOverlay === void 0 ? void 0 : modalPhotoOverlay.classList.add("visible");
}
function toNextPhoto() {
  var imageId = getIdFromModalPicture();
  if (imageId) {
    var nextPhoto = getNextPhotoFromCurrent(parseInt(imageId));
    if (nextPhoto) {
      setModalPictureContent(nextPhoto);
    }
  }
}
function toPreviousPhoto() {
  var imageId = getIdFromModalPicture();
  if (imageId) {
    var previousPhoto = getPreviousPhotoFromCurrent(parseInt(imageId));
    if (previousPhoto) {
      setModalPictureContent(previousPhoto);
    }
  }
}
function getIdFromModalPicture() {
  return (modalPicture === null || modalPicture === void 0 ? void 0 : modalPicture.dataset.id) ? modalPicture.dataset.id : null;
}
function getNextPhotoFromCurrent(currentId) {
  var currentIndex = PhotoCollection.findIndex(function (photo) {
    return photo.id === currentId;
  });
  var nextIndex = currentIndex < PhotoCollection.length - 1 ? currentIndex + 1 : 0;
  return PhotoCollection[nextIndex];
}
function getPreviousPhotoFromCurrent(currentId) {
  var currentIndex = PhotoCollection.findIndex(function (photo) {
    return photo.id === currentId;
  });
  var previousIndex = currentIndex > 0 ? currentIndex - 1 : PhotoCollection.length - 1;
  return PhotoCollection[previousIndex];
}
// function verifyEmail() {
//     isEmailValid = regPattern.email.test(contactEmail.value);
// }
// function verifyMessage() {
//     isMessageValid = (contactMessage.value.length >= messageLengthRange.min && contactMessage.value.length <= messageLengthRange.max);
// }
// function displayCurrentLength() {
//     let currentlength = contactMessage.value.length;
//     let message = "";
//     if (currentlength < messageLengthRange.min) {
//         message = "veuillez écrire au moins 10 caractères."
//         contactLengthFeedback.classList.add("error");
//     } else if (currentlength >= messageLengthRange.min && currentlength <= messageLengthRange.max) {
//         message = currentlength + "/" + messageLengthRange.max
//         if (contactLengthFeedback.classList.contains("error")) { contactLengthFeedback.classList.remove("error") }
//     } else {
//         message = currentlength + "/" + messageLengthRange.max
//         contactLengthFeedback.classList.add("error");
//     }
//     contactLengthFeedback.textContent = message;
// }
// function openContactModal() {
//     displayCurrentLength();
//     modalFormContainer?.classList.remove("hidden");
//     modalContactOverlay?.classList.remove("hidden");
// }
// function closeContactModal() {
//     modalFormContainer?.classList.add("hidden");
//     modalContactOverlay?.classList.add("hidden");
//     contactMessage.value = ""
//     contactEmail.value = "";
//     contactMessage.value = "";
//     isEmailValid = false;
//     isMessageValid = false;
// }
// function getRequestBody() {
//     return {
//         email: contactEmail.value,
//         message: contactMessage.value
//     }
// }
// async function handleSubmit() {
//     verifyEmail();
//     verifyMessage();
//     if (isEmailValid && isMessageValid) {
//         fetch(formAction, {
//             method: "POST",
//             body: JSON.stringify(getRequestBody()),
//             headers: {
//                 'Accept': 'application/json'
//             }
//         }).then(response => {
//             if (response.ok) {
//                 alert("le message a bien été envoyé");
//                 closeContactModal();
//             } else {
//                 alert("une erreur a eu lieu durant la transmission de l'email via formspree")
//             }
//         }).catch(error => {
//             alert("une erreur a eu lieu durant la transmission de l'email via formspree")
//         });
//     } else {
//         if (!isEmailValid && !isMessageValid) {
//             submitErrorMsg.textContent = "Le format de l'email est incorrect et le message ne satisfait pas la longueur attendue";
//         }
//         else if (!isEmailValid) {
//             submitErrorMsg.textContent = "Le format de l'email est incorrect";
//         }
//         else {
//             if (contactMessage.value.length < messageLengthRange.min) {
//                 submitErrorMsg.textContent = "Le message est trop court";
//             } else if (contactMessage.value.length > messageLengthRange.max) {
//                 submitErrorMsg.textContent = "Le message est trop long";
//             }
//         }
//         submitErrorMsg.classList.remove("transparent");
//         setTimeout(() => {
//             submitErrorMsg.classList.add("transparent")
//         }, 5000);
//     }
// }
/* ********** Initialization ********** */
displayPictures();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61903" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/ts/index.ts"], null)
//# sourceMappingURL=/ts.93153e6d.js.map