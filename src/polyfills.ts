/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';

const promisifiedOldGUM = function(constraints, successCallback, errorCallback) {
  // First get ahold of getUserMedia, if present
  const getUserMedia = (navigator.getUserMedia ||
    navigator['webkitGetUserMedia'] ||
    navigator['mozGetUserMedia'] ||
    navigator['msGetUserMedia']);

  // Some browsers just don't implement it - return a rejected promise with an error
  // to keep a consistent interface
  if (!getUserMedia) {
    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
  }

  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
  return new Promise(function(successCallbac, errorCallbac) {
    getUserMedia.call(navigator, constraints, successCallbac, errorCallbac);
  });
};

// Schwartzian transform from https://stackoverflow.com/a/10124053
(function() {
  if (typeof Object.defineProperty === 'function') {
    try {Object.defineProperty(Array.prototype, 'sortBy', { value: sb }); } catch (e) {}
  }
  if (!Array.prototype['sortBy']) Array.prototype['sortBy'] = sb;

  function sb(f) {
    for (let i = this.length; i;) {
      const o = this[--i];
      this[i] = [].concat(f.call(o, o, i), o);
    }
    this.sort(function(a, b) {
      for (let i = 0, len = a.length; i < len; ++i) {
        if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
      }
      return 0;
    });
    for (let i = this.length; i;) {
      this[--i] = this[i][this[i].length - 1];
    }
    return this;
  }
})();

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = promisifiedOldGUM as any;
}

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices)
  alert('camera features not supported; use latest Firefox or latest Chrome');
