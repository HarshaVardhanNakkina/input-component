import { r as react } from '../common/index-e66f0a38.js';

var tokenTypes = ['colors', 'space', 'fontSizes', 'fonts', 'fontWeights', 'lineHeights', 'letterSpacings', 'sizes', 'borderWidths', 'borderStyles', 'radii', 'shadows', 'zIndices', 'transitions']; // Note: when running Jest tests, make sure that the test file is running in node env
// if this constant was giving incorrect results.

var isServer = typeof window === 'undefined';

var ATOM = Symbol('ATOM');

var unitlessKeys = {
  // animation duration only added so that it's ignored:
  animationDuration: 1,
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var TOKEN_STRING = 1;
var TOKEN_QUOTED_STRING = 2;
var TOKEN_FUNCTION = 3;
var TOKEN_BRACKET = 4;
var currentType;
var currentToken = '';
var currentDepth = 0;
var tokenGroups = [[]];
var tokenizeValue = function tokenizeValue(str) {
  resetCurrentToken();
  tokenGroups = [[]];

  if (!str) {
    return tokenGroups;
  }

  var strLength = str.length;

  for (var i = 0; i < strLength; i++) {
    var _char = str[i];

    switch (_char) {
      // whitespace
      case ' ':
        if (currentType === TOKEN_STRING) {
          addCurrentTokenToGroup();
        } else if (currentType) {
          currentToken += _char;
        }

        break;
      // new token group

      case ',':
        if (!currentDepth) {
          addCurrentTokenToGroup();
          addNewTokenGroup();
        } else {
          currentToken += _char;
        }

        break;
      // Quoted string:

      case '"':
        currentToken += _char;

        if (!currentDepth && !currentType) {
          currentType = TOKEN_QUOTED_STRING;
          currentDepth = 1;
        } else if (currentDepth === 1 && currentType === TOKEN_QUOTED_STRING) {
          currentDepth = 0;
          addCurrentTokenToGroup();
        }

        break;
      // Css function:

      case '(':
        if (!currentDepth) currentType = TOKEN_FUNCTION;
        currentDepth++;
        currentToken += _char;
        break;

      case ')':
        currentToken += _char;
        currentDepth--;
        if (currentType === TOKEN_FUNCTION && !currentDepth) addCurrentTokenToGroup();
        break;
      // Bracket values:

      case '[':
        if (!currentDepth) currentType = TOKEN_BRACKET;
        currentToken += _char;
        currentDepth++;
        break;

      case ']':
        currentToken += _char;
        currentDepth--;
        if (!currentDepth) addCurrentTokenToGroup();
        break;

      default:
        if (!currentType) currentType = TOKEN_STRING;
        currentToken += _char;
    }
  }

  if (currentToken) addCurrentTokenToGroup();
  return tokenGroups;
};
/**
 * UTILS:
 */

/**
 * Resets the current token info
 */

function resetCurrentToken() {
  currentDepth = currentType = 0;
  currentToken = '';
}
/**
 * Adds current token to the stack then starts a new one
 */


function addCurrentTokenToGroup() {
  if (currentType) tokenGroups[tokenGroups.length - 1].push(currentToken);
  resetCurrentToken();
}
/**
 * Adds a new token group and requests a new one
 * For things like animations or box shadow where there might be multiple rules
 * applied to the same value
 */


function addNewTokenGroup() {
  tokenGroups[tokenGroups.length] = [];
  resetCurrentToken();
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var unitMatch = /^[0-9.]+[a-z|%]/;
var easingMatch = /\(.*\)|ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end/;
var fontSizeMatch = /^([+-]?[0-9.]+([a-z]+|%)?|large(r)?|medium|small(er)?|x{1,3}-large|x{1,2}-small)(\/[+-]?[0-9.]+([a-z]+|%)?)?$/;
var fontStyleMatch = /^[+-]?[0-9.]+deg$/;
var fontWeightMatch = /^(0*[1-9][0-9]{0,2}|1000|bold(er)?|lighter)$/;

var matchString = function matchString(val, regex) {
  return typeof val === 'number' ? false : val.match(regex);
};

var setChainedValue = function setChainedValue(existingValue, value) {
  return existingValue ? "".concat(existingValue, ",").concat(value) : value;
};

var emptyTokens = {};
tokenTypes.forEach(function (type) {
  return emptyTokens[type] = {};
});
/*
  The generic CSS prop value parser. Converts any css value into an
  array of chains, where each chain is an array of individual values
*/

var createPropertyParser = function createPropertyParser(type) {
  return function (tokens, value) {
    var chains = typeof value === 'number' ? [[value]] : tokenizeValue(value);
    var css = {}; // TODO: refactor this

    var tmpTokens = typeof value === 'number' ? emptyTokens : tokens;
    chains.forEach(function (chain, chainIndex) {
      // tslint:disable-next-line
      chain.forEach(function (_value, index) {
        type(tmpTokens, css, _value, index, chain, chainIndex, chains);
      });
    });
    return css;
  };
};

var background = createPropertyParser(function (tokens, css, value, index, chain, chainIndex, chains) {
  if (value === '/') {
    return;
  } else if (matchString(value, /scroll|local|fixed/)) css.backgroundAttachment = setChainedValue(css.backgroundAttachment, value);else if (matchString(value, /^url|linear-gradient|element|image|cross-fade|image-set/)) css.backgroundImage = setChainedValue(css.backgroundImage, value);else if (matchString(value, /border-box|padding-box|content-box|text/)) {
    if (chain.filter(function (chainPart) {
      return chainPart.match(/border-box|padding-box|content-box|text/);
    }).length === 1) {
      css.backgroundOrigin = setChainedValue(css.backgroundOrigin, value);
      css.backgroundClip = setChainedValue(css.backgroundClip, value);
    } else if (chain.findIndex(function (chainPart) {
      return chainPart.match(/border-box|padding-box|content-box|text/);
    }) === index) {
      css.backgroundOrigin = setChainedValue(css.backgroundOrigin, value);
    } else {
      css.backgroundClip = setChainedValue(css.backgroundClip, value);
    }
  } else if (chain[index - 1] === '/') {
    css.backgroundSize = setChainedValue(css.backgroundSize, tokens.sizes[value] || value);
  } else if (matchString(value, /center|top|right|bottom|left/) || matchString(value, unitMatch) || tokens.sizes[value]) css.backgroundPosition = setChainedValue(css.backgroundPosition, tokens.sizes[value] || value);else if (matchString(value, /repeat|no-repeat|repeat-x|repeat-y|space|round/)) css.backgroundRepeat = setChainedValue(css.backgroundRepeat, value);else {
    if (chainIndex !== chains.length - 1) {
      throw new Error('You can only add background colors on the last chain');
    }

    css.backgroundColor = setChainedValue(css.backgroundColor, tokens.colors[value] || value);
  }
});
var animation = createPropertyParser(function (_, css, value, index, chain) {
  if (matchString(value, easingMatch)) {
    css.animationTimingFunction = setChainedValue(css.animationTimingFunction, value);
  } else if (matchString(value, /^\d+$|infinite/)) {
    css.animationIterationCount = setChainedValue(css.animationIterationCount, value);
  } else if (matchString(value, /normal|reverse|alternate|alternate-reverse/)) {
    css.animationDirection = setChainedValue(css.animationDirection, value);
  } else if (matchString(value, /none|forward|backwards|both/)) {
    css.animationFillMode = setChainedValue(css.animationFillMode, value);
  } else if (matchString(value, /running|paused/)) {
    css.animationPlayState = setChainedValue(css.animationPlayState, value);
  } else if (matchString(value, unitMatch)) {
    if (chain.findIndex(function (part) {
      return part.match(unitMatch);
    }) === index) {
      css.animationDuration = setChainedValue(css.animationDuration, value);
    } else {
      css.animationDelay = setChainedValue(css.animationDelay, value);
    }
  } else {
    css.animationName = setChainedValue(css.animationName, value);
  }
});
var font = createPropertyParser(function (tokens, css, value, index, chain, chainIndex, chains) {
  if (chains.shouldParseFontFamily) {
    css.fontFamily = setChainedValue(css.fontFamily, tokens.fonts[value] || value);
  } else {
    var lower = value.toLowerCase();

    switch (true) {
      case fontStyleMatch.test(lower):
        css.fontStyle += " ".concat(value);
        break;

      case fontWeightMatch.test(lower):
        css.fontWeight = tokens.fontWeights[value] || value;
        break;

      case fontSizeMatch.test(lower):
        chains.shouldParseFontFamily = true;

        var _value$split = value.split('/'),
            _value$split2 = _slicedToArray(_value$split, 2),
            fontSize = _value$split2[0],
            lineHeight = _value$split2[1];

        css.fontSize = tokens.fontSizes[fontSize] || fontSize;

        if (lineHeight) {
          css.lineHeight = tokens.lineHeights[lineHeight] || lineHeight;
        }

        break;

      case lower === 'italic':
      case lower === 'oblique':
        css.fontStyle = value;
        break;

      case lower === 'small-caps':
        css.fontVariant = value;
        break;

      case lower === 'condensed':
      case lower === 'expanded':
      case lower === 'extra-condensed':
      case lower === 'extra-expanded':
      case lower === 'semi-condensed':
      case lower === 'semi-expanded':
      case lower === 'ultra-condensed':
      case lower === 'ultra-expanded':
        css.fontStretch = value;
        break;

      case lower === 'caption':
      case lower === 'icon':
      case lower === 'menu':
      case lower === 'message-box':
      case lower === 'small-caption':
      case lower === 'status-bar':
        chains.shouldParseFontFamily = true;
        css.fontFamily = setChainedValue(css.fontFamily, tokens.fonts[value] || value);
        break;
    }
  }
});
var transition = createPropertyParser( // The whole token is a transition, so need to grab it before passing in here
function (_, css, value, index, chain) {
  if (matchString(value, unitMatch)) {
    if (chain.findIndex(function (part) {
      return part.match(unitMatch);
    }) === index) {
      css.transitionDuration = setChainedValue(css.transitionDuration, value);
    } else {
      css.transitionDelay = setChainedValue(css.transitionDelay, value);
    }
  } else if (matchString(value, easingMatch)) {
    css.transitionTimingFunction = setChainedValue(css.transitionTimingFunction, value);
  } else {
    css.transitionProperty = setChainedValue(css.transitionProperty, value);
  }
});
var margin = createPropertyParser(function (tokens, css, value, index) {
  if (index === 0) {
    css.marginTop = tokens.space[value] || value;
    css.marginRight = tokens.space[value] || value;
    css.marginBottom = tokens.space[value] || value;
    css.marginLeft = tokens.space[value] || value;
  } else if (index === 1) {
    css.marginRight = tokens.space[value] || value;
    css.marginLeft = tokens.space[value] || value;
  } else if (index === 2) {
    css.marginBottom = tokens.space[value] || value;
  } else {
    css.marginLeft = tokens.space[value] || value;
  }
});
var padding = createPropertyParser(function (tokens, css, value, index) {
  if (index === 0) {
    css.paddingTop = tokens.space[value] || value;
    css.paddingRight = tokens.space[value] || value;
    css.paddingBottom = tokens.space[value] || value;
    css.paddingLeft = tokens.space[value] || value;
  } else if (index === 1) {
    css.paddingRight = tokens.space[value] || value;
    css.paddingLeft = tokens.space[value] || value;
  } else if (index === 2) {
    css.paddingBottom = tokens.space[value] || value;
  } else {
    css.paddingLeft = tokens.space[value] || value;
  }
});
var border = createPropertyParser(function (tokens, css, value) {
  if (matchString(value, /none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/)) {
    css.borderTopStyle = value;
    css.borderRightStyle = value;
    css.borderBottomStyle = value;
    css.borderLeftStyle = value;
  } else if (matchString(value, unitMatch) || tokens.borderWidths[value] || !isNaN(value)) {
    css.borderTopWidth = tokens.borderWidths[value] || value;
    css.borderRightWidth = tokens.borderWidths[value] || value;
    css.borderBottomWidth = tokens.borderWidths[value] || value;
    css.borderLeftWidth = tokens.borderWidths[value] || value;
  } else {
    css.borderTopColor = tokens.colors[value] || value;
    css.borderRightColor = tokens.colors[value] || value;
    css.borderBottomColor = tokens.colors[value] || value;
    css.borderLeftColor = tokens.colors[value] || value;
  }
});
var borderTop = createPropertyParser(function (tokens, css, value) {
  if (matchString(value, /none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/)) {
    css.borderTopStyle = value;
  } else if (matchString(value, unitMatch) || tokens.borderWidths[value] || !isNaN(value)) {
    css.borderTopWidth = tokens.borderWidths[value] || value;
  } else {
    css.borderTopColor = tokens.colors[value] || value;
  }
});
var borderRight = createPropertyParser(function (tokens, css, value) {
  if (matchString(value, /none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/)) {
    css.borderRightStyle = value;
  } else if (matchString(value, unitMatch) || tokens.borderWidths[value] || !isNaN(value)) {
    css.borderRightWidth = tokens.borderWidths[value] || value;
  } else {
    css.borderRightColor = tokens.colors[value] || value;
  }
});
var borderLeft = createPropertyParser(function (tokens, css, value) {
  if (matchString(value, /none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/)) {
    css.borderLeftStyle = value;
  } else if (matchString(value, unitMatch) || tokens.borderWidths[value] || !isNaN(value)) {
    css.borderLeftWidth = tokens.borderWidths[value] || value;
  } else {
    css.borderLeftColor = tokens.colors[value] || value;
  }
});
var borderBottom = createPropertyParser(function (tokens, css, value) {
  if (matchString(value, /none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset/)) {
    css.borderBottomStyle = value;
  } else if (matchString(value, unitMatch) || tokens.borderWidths[value] || !isNaN(value)) {
    css.borderBottomWidth = tokens.borderWidths[value] || value;
  } else {
    css.borderBottomColor = tokens.colors[value] || value;
  }
});
var borderWidth = createPropertyParser(function (tokens, css, value, index) {
  if (index === 0) {
    css.borderTopWidth = tokens.borderWidths[value] || value;
    css.borderRightWidth = tokens.borderWidths[value] || value;
    css.borderBottomWidth = tokens.borderWidths[value] || value;
    css.borderLeftWidth = tokens.borderWidths[value] || value;
  } else if (index === 1) {
    css.borderRightWidth = tokens.borderWidths[value] || value;
    css.borderLeftWidth = tokens.borderWidths[value] || value;
  } else if (index === 2) {
    css.borderBottomWidth = tokens.borderWidths[value] || value;
  } else {
    css.borderLeftWidth = tokens.borderWidths[value] || value;
  }
});
var borderColor = createPropertyParser(function (tokens, css, value, index) {
  if (index === 0) {
    css.borderTopColor = tokens.colors[value] || value;
    css.borderRightColor = tokens.colors[value] || value;
    css.borderBottomColor = tokens.colors[value] || value;
    css.borderLeftColor = tokens.colors[value] || value;
  } else if (index === 1) {
    css.borderRightColor = tokens.colors[value] || value;
    css.borderLeftColor = tokens.colors[value] || value;
  } else if (index === 2) {
    css.borderBottomColor = tokens.colors[value] || value;
  } else {
    css.borderLeftColor = tokens.colors[value] || value;
  }
});
var borderStyle = createPropertyParser(function (tokens, css, value, index) {
  if (index === 0) {
    css.borderTopStyle = value;
    css.borderRightStyle = value;
    css.borderBottomStyle = value;
    css.borderLeftStyle = value;
  } else if (index === 1) {
    css.borderRightStyle = value;
    css.borderLeftStyle = value;
  } else if (index === 2) {
    css.borderBottomStyle = value;
  } else {
    css.borderLeftStyle = value;
  }
});
var borderRadius = createPropertyParser(function (tokens, css, value, index) {
  if (index === 0) {
    css.borderBottomLeftRadius = tokens.radii[value] || value;
    css.borderTopLeftRadius = tokens.radii[value] || value;
    css.borderTopRightRadius = tokens.radii[value] || value;
    css.borderBottomRightRadius = tokens.radii[value] || value;
  } else if (index === 1) {
    css.borderTopRightRadius = tokens.radii[value] || value;
    css.borderBottomLeftRadius = tokens.radii[value] || value;
  } else if (index === 2) {
    css.borderBottomRightRadius = tokens.radii[value] || value;
  } else if (index === 3) {
    css.borderBottomLeftRadius = tokens.radii[value] || value;
  }
});
var boxShadow = function boxShadow(tokens, value) {
  return {
    boxShadow: tokenizeValue(value).map(function (chain) {
      return chain.map(function (val) {
        return tokens.colors[val] || val;
      }).join(' ');
    }).join(', ')
  };
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var MAIN_BREAKPOINT_ID = 'initial';
var cssPropToToken = {
  gap: 'space',
  gridGap: 'space',
  columnGap: 'space',
  gridColumnGap: 'space',
  rowGap: 'space',
  gridRowGap: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  fontSize: 'fontSizes',
  backgroundColor: 'colors',
  border: ['', 'borderStyles', 'colors'],
  borderColor: 'colors',
  borderTopColor: 'colors',
  borderRightColor: 'colors',
  borderBottomColor: 'colors',
  borderLeftColor: 'colors',
  caretColor: 'colors',
  color: 'colors',
  columnRuleColor: 'colors',
  outlineColor: 'colors',
  fill: 'colors',
  stroke: 'colors',
  fontFamily: 'fonts',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  blockSize: 'sizes',
  minBlockSize: 'sizes',
  maxBlockSize: 'sizes',
  inlineSize: 'sizes',
  minInlineSize: 'sizes',
  maxInlineSize: 'sizes',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  borderWidth: 'borderWidths',
  borderTopWidth: 'borderWidths',
  borderLeftWidth: 'borderWidths',
  borderRightWidth: 'borderWidths',
  borderBottomWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderTopStyle: 'borderStyles',
  borderLeftStyle: 'borderStyles',
  borderRightStyle: 'borderStyles',
  borderBottomStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  transition: 'transitions'
};

var enhanceSheet = function enhanceSheet(sheet) {
  return {
    content: sheet.content,
    cssRules: sheet.cssRules,
    insertRule: function insertRule(rule, index) {
      try {
        sheet.insertRule(rule, index);
        return index;
      } catch (_unused) {
        return -1;
      }
    }
  };
};

var createSheets = function createSheets(env) {
  var screens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var tags = [];

  if (env && env.document) {
    var head = env.document.querySelector('head');

    if (!head) {
      throw new Error('There is no HEAD element on this document');
    }

    var styles = Array.from(head.querySelectorAll('style'));
    var existingStyles = styles.filter(function (style) {
      return Boolean(style.textContent && style.textContent.startsWith('/* STITCHES'));
    });
    return {
      tags: tags,
      sheets: ['__variables__', MAIN_BREAKPOINT_ID].concat(Object.keys(screens)).reduce(function (aggr, key, index) {
        var style = existingStyles[index];

        if (!style) {
          style = env.document.createElement('style');
          head.appendChild(style);
        }

        tags.push(style);
        aggr[key] = enhanceSheet(style.sheet);
        return aggr;
      }, {})
    };
  }

  return {
    tags: tags,
    sheets: ['__variables__', MAIN_BREAKPOINT_ID].concat(Object.keys(screens)).reduce(function (aggr, key) {
      aggr[key] = enhanceSheet({
        content: '',
        cssRules: [],
        insertRule: function insertRule(content) {
          var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          this.cssRules.splice(index, 0, content);
        }
      });
      return aggr;
    }, {})
  };
};
var specificityProps = {
  border: border,
  boxShadow: boxShadow,
  flex: function flex(tokens, value) {
    if (Array.isArray(value)) {
      if (value.length === 2) {
        return _objectSpread({
          flexGrow: value[0]
        }, isNaN(value[1]) ? {
          flexBasis: value[1]
        } : {
          flexShrink: value[1]
        });
      }

      if (value.length === 3) {
        return {
          flexGrow: value[0],
          flexShrink: value[1],
          flexBasis: value[2]
        };
      }
    }

    return isNaN(value) ? {
      flexBasis: value
    } : {
      flexGrow: value
    };
  },
  overflow: function overflow(tokens, value) {
    return {
      overflowX: value,
      overflowY: value
    };
  },
  margin: margin,
  padding: padding,
  borderRadius: borderRadius,
  borderColor: borderColor,
  borderStyle: borderStyle,
  borderWidth: borderWidth,
  background: background,
  animation: animation,
  transition: transition,
  font: font,
  borderBottom: borderBottom,
  borderLeft: borderLeft,
  borderTop: borderTop,
  borderRight: borderRight
};
var getVendorPrefixAndProps = function getVendorPrefixAndProps(env) {
  var styles = env.getComputedStyle(env.document.documentElement);
  var vendorProps = Array.from(styles).filter(function (prop) {
    return prop[0] === '-';
  }); // @ts-ignore

  var vendorPrefix = (vendorProps.join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
  return {
    vendorPrefix: "-".concat(vendorPrefix, "-"),
    vendorProps: vendorProps
  };
};
var hashString = function hashString(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = hash * 33 ^ str.charCodeAt(--i);
  }
  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */


  return generateAlphabeticName(hash >>> 0);
};
/**
 * Converts a hash number to alphabetic representation:
 * Copied from:
 * https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/generateAlphabeticName.js
 */

var AD_REPLACER_R = /(a)(d)/gi;
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */

var charsLength = 52;
/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */

var getAlphabeticChar = function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
};
/* input a number, usually a hash and convert it to base-52 */


function generateAlphabeticName(code) {
  var name = '';
  var x;
  /* get a char and divide by alphabet-length */

  for (x = Math.abs(code); x > charsLength; x = x / charsLength | 0) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2');
}

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit$1(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
var hotReloadingCache = new Map();

var cleanSSRClass = function cleanSSRClass(s) {
  // removes the atom class marker & removes any escaping that was done on the server for the class
  return s.replace(/(\/\*X\*\/|\\([^-_a-zA-Z\d]*))/g, '$2');
};

var createSSRCssRuleClass = function createSSRCssRuleClass(s) {
  return "/*X*/".concat(s.replace(/[^-_a-zA-Z\d]/g, "\\$&"), "/*X*/");
};

var createSelector = function createSelector(className, selector) {
  var cssRuleClassName = className ? ".".concat(className) : '';
  if (selector && selector.includes('&')) return selector.replace(/&/gi, cssRuleClassName);

  if (selector) {
    return "".concat(cssRuleClassName).concat(selector);
  }

  return cssRuleClassName;
};
/**
 * Resolves a token to its css value in the context of the passed css prop:
 */


var resolveTokens = function resolveTokens(cssProp, value, tokens) {
  var token = cssPropToToken[cssProp];
  var tokenValue;

  if (token) {
    if (Array.isArray(token) && Array.isArray(value)) {
      tokenValue = token.map(function (tokenName, index) {
        return token && tokens[tokenName] && tokens[tokenName][value[index]] ? tokens[tokenName][value[index]] : value[index];
      });
    } else {
      tokenValue = token && tokens[token] && tokens[token][value] ? tokens[token][value] : value;
    }
  } else {
    tokenValue = value;
  }

  return tokenValue;
};
/**
 * iterates over a style object keys and values,
 * resolving them to their final form then calls the value callback with the prop, value
 * and the current value nesting path in the style object:
 * - handles utilities
 * - handles specificity props
 * - handles nesting
 * - TODO: also handle the things below once we handle envs differently (to avoid passing a lot of props around):
 * - handles tokens
 * - handles vendor prefixing
 */


var processStyleObject = function processStyleObject(obj, config, valueMiddleware) {
  var currentNestingPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var shouldHandleUtils = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var shouldHandleSpecificityProps = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

  // key: css prop or override or a selector
  // value is: cssValue, a util, specificity prop, or
  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var val = obj[key];
    var isUtilProp = shouldHandleUtils && key in config.utils;
    var isSpecificityProp = shouldHandleSpecificityProps && !isUtilProp && key in specificityProps;
    /** Nested styles: */

    if (_typeof(val) === 'object' && !isSpecificityProp && !isUtilProp) {
      // Atom value:
      if (val[ATOM]) {
        valueMiddleware(key, val, currentNestingPath);
        continue;
      } // handle the value object


      processStyleObject(val, config, valueMiddleware, [].concat(_toConsumableArray(currentNestingPath), [key]));
      continue;
    }
    /** Utils: */


    if (isUtilProp) {
      // Resolve the util from the util function:
      var resolvedUtils = config.utils[key](config)(val);
      processStyleObject(resolvedUtils, config, valueMiddleware, _toConsumableArray(currentNestingPath), false);
      continue;
    }
    /** Specificity Props: */
    // shorthand css props or css props that has baked in handling:
    // see specificityProps in ./utils


    if (isSpecificityProp) {
      var resolvedSpecificityProps = specificityProps[key](config.tokens, val);
      processStyleObject(resolvedSpecificityProps, config, valueMiddleware, _toConsumableArray(currentNestingPath), false, false);
      continue;
    }

    if (typeof val === 'number') {
      // handle unitless numbers:
      valueMiddleware(key, // tslint:disable-next-line: prefer-template
      "".concat(unitlessKeys[key] ? val : val + 'px'), currentNestingPath);
    } else if (val !== undefined) {
      valueMiddleware(key, resolveTokens(key, val, config.tokens), currentNestingPath);
    }
  }
};
/**
 * Resolves a css prop nesting path to a css selector and the breakpoint the css prop is meant to be injected to
 */


var resolveBreakpointAndSelectorAndInlineMedia = function resolveBreakpointAndSelectorAndInlineMedia(nestingPath, config) {
  return nestingPath.reduce(function (acc, breakpointOrSelector, i) {
    // breakpoints handling:
    if (breakpointOrSelector in config.breakpoints || breakpointOrSelector === MAIN_BREAKPOINT_ID) {
      acc.breakpoint = breakpointOrSelector;
      return acc;
    }

    if (breakpointOrSelector[0] === '@') {
      acc.inlineMediaQueries.push(breakpointOrSelector);
      return acc;
    } // Normal css nesting selector:


    acc.nestingPath = acc.nestingPath + ( // If you manually prefix with '&' we remove it for identity consistency
    // only for pseudo selectors and nothing else
    breakpointOrSelector[0] === '&' && breakpointOrSelector[1] === ':' ? breakpointOrSelector.substr(1) : // pseudo elements/class
    // don't prepend with a whitespace
    breakpointOrSelector[0] === ':' ? breakpointOrSelector : // else just nest with a space
    // tslint:disable-next-line: prefer-template
    ' ' + breakpointOrSelector);
    return acc;
  }, {
    breakpoint: MAIN_BREAKPOINT_ID,
    nestingPath: '',
    inlineMediaQueries: []
  });
};
/**
 * converts an object style css prop to its normal css style object prop and handles prefixing:
 * borderColor => border-color
 */


var hyphenAndVendorPrefixCssProp = function hyphenAndVendorPrefixCssProp(cssProp, vendorProps, vendorPrefix) {
  var isVendorPrefixed = cssProp[0] === cssProp[0].toUpperCase();
  var cssHyphenProp = cssProp.split(/(?=[A-Z])/).map(function (g) {
    return g.toLowerCase();
  }).join('-');

  if (isVendorPrefixed) {
    cssHyphenProp = "-".concat(cssHyphenProp);
  } else if (vendorProps.includes("".concat(vendorPrefix).concat(cssHyphenProp))) {
    cssHyphenProp = "".concat(vendorPrefix).concat(cssHyphenProp);
  }

  return cssHyphenProp;
};

var toStringCachedAtom = function toStringCachedAtom() {
  return this._className;
};

var toStringCompose = function toStringCompose() {
  var className = this.atoms.map(function (atom) {
    return atom.toString();
  }).join(' '); // cache the className on this instance
  // @ts-ignore

  this._className = className; // we only want to enable caching on the client
  // because on the server we want to make sure that the composition is evaluated on each request

  if (!isServer) {
    this.toString = toStringCachedAtom;
  }

  return className;
};

var createCssRule = function createCssRule(breakpoints, atom, className) {
  var cssRule = '';

  if (atom.inlineMediaQueries && atom.inlineMediaQueries.length) {
    var allMediaQueries = '';
    var endBrackets = '';
    atom.inlineMediaQueries.forEach(function (breakpoint) {
      allMediaQueries += "".concat(breakpoint, "{");
      endBrackets += '}';
    });
    cssRule = "".concat(allMediaQueries).concat(createSelector(className, atom.selector), "{").concat(atom.cssHyphenProp, ":").concat(atom.value, ";}").concat(endBrackets);
  } else {
    cssRule = "".concat(createSelector(className, atom.selector), "{").concat(atom.cssHyphenProp, ":").concat(atom.value, ";}");
  }

  return atom.breakpoint !== MAIN_BREAKPOINT_ID ? breakpoints[atom.breakpoint](cssRule) : cssRule;
};

var createToString = function createToString(sheets) {
  var breakpoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cssClassnameProvider = arguments.length > 2 ? arguments[2] : undefined;
  var preInjectedRules = arguments.length > 3 ? arguments[3] : undefined;
  return function toString() {
    var className = cssClassnameProvider(this);
    var shouldInject = !preInjectedRules.size || !preInjectedRules.has(".".concat(className));

    if (shouldInject) {
      var sheet = sheets[this.breakpoint];
      sheet.insertRule(createCssRule(breakpoints, this, className), this.inlineMediaQueries.length ? sheet.cssRules.length : 0);
    } // We are switching this atom from IAtom simpler representation
    // 1. delete everything but `id` for specificity check
    // @ts-ignore


    this.cssHyphenProp = this.value = this.pseudo = this.breakpoint = this.inlineMediaQueries = undefined; // 2. put on a _className

    this._className = className; // 3. switch from this `toString` to a much simpler one

    this.toString = toStringCachedAtom;
    return className;
  };
};

var createServerToString = function createServerToString(sheets) {
  var breakpoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cssClassnameProvider = arguments.length > 2 ? arguments[2] : undefined;
  return function toString() {
    var className = cssClassnameProvider(this);
    var sheet = sheets[this.breakpoint];
    sheets[this.breakpoint].insertRule(createCssRule(breakpoints, this, className.length ? createSSRCssRuleClass(className) : ''), this.inlineMediaQueries.length ? sheet.cssRules.length : 0); // We do not clean out the atom here, cause it will be reused
    // to inject multiple times for each request
    // 1. put on a _className

    this._className = className; // 2. switch from this `toString` to a much simpler one

    this.toString = toStringCachedAtom;
    return className;
  };
};

var createThemeToString = function createThemeToString(classPrefix, variablesSheet) {
  return function toString() {
    var _this = this;

    var themeClassName = "".concat(classPrefix ? "".concat(classPrefix, "-") : '', "theme-").concat(this.name); // @ts-ignore

    variablesSheet.insertRule(".".concat(themeClassName, "{").concat(Object.keys(this.definition).reduce(function (aggr, tokenType) {
      // @ts-ignore
      return "".concat(aggr).concat(Object.keys(_this.definition[tokenType]).reduce(function (subAggr, tokenKey) {
        return "".concat(subAggr, "--").concat(tokenType, "-").concat(tokenKey.replace(/[^\w\s-]/gi, ''), ":").concat( // @ts-ignore
        _this.definition[tokenType][tokenKey], ";");
      }, aggr));
    }, ''), "}"));

    this.toString = function () {
      return themeClassName;
    };

    return themeClassName;
  };
};

var createKeyframesToString = function createKeyframesToString(sheet) {
  return function toString() {
    var _this2 = this;

    if (this._cssRuleString) {
      sheet.insertRule(this._cssRuleString);
    }

    this.toString = function () {
      return _this2.id;
    };

    return this.id;
  };
};

var composeIntoMap = function composeIntoMap(map, atoms) {
  var i = atoms.length - 1;

  for (; i >= 0; i--) {
    var item = atoms[i]; // atoms can be undefined, null, false or '' using ternary like
    // expressions with the properties

    if (item && item[ATOM] && 'atoms' in item) {
      composeIntoMap(map, item.atoms);
    } else if (item && item[ATOM]) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    } else if (item) {
      map.set(item, item);
    }
  }
};
var createCss = function createCss(_config) {
  var env = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : typeof window === 'undefined' ? null : window;
  // pre-checked config to avoid checking these all the time
  // tslint:disable-next-line
  var config = Object.assign({
    tokens: {},
    utils: {},
    breakpoints: {}
  }, _config); // prefill with empty token groups

  tokenTypes.forEach(function (tokenType) {
    return config.tokens[tokenType] = config.tokens[tokenType] || {};
  });
  var tokens = config.tokens,
      breakpoints = config.breakpoints;
  var showFriendlyClassnames = typeof config.showFriendlyClassnames === 'boolean' ? config.showFriendlyClassnames : "production" === 'development';
  var prefix = config.prefix || '';

  var _ref = env ? getVendorPrefixAndProps(env) : {
    vendorPrefix: '-node-',
    vendorProps: []
  },
      vendorPrefix = _ref.vendorPrefix,
      vendorProps = _ref.vendorProps;

  if (env && hotReloadingCache.has(prefix)) {
    var instance = hotReloadingCache.get(prefix);
    instance.dispose();
  } // pre-compute class prefix


  var classPrefix = prefix ? showFriendlyClassnames ? "".concat(prefix, "_") : prefix : '';

  var cssClassnameProvider = function cssClassnameProvider(atom) {
    var _atom$inlineMediaQuer;

    if (atom._isGlobal) {
      return '';
    }

    var hash = hashString("".concat(atom.breakpoint || '').concat(atom.cssHyphenProp.replace(/-(moz|webkit|ms)-/, '')).concat(atom.selector || '').concat(((_atom$inlineMediaQuer = atom.inlineMediaQueries) === null || _atom$inlineMediaQuer === void 0 ? void 0 : _atom$inlineMediaQuer.join('')) || '').concat(atom.value));
    var name = showFriendlyClassnames ? // HTML has this weird treatment to css classes. it's ok if they start with everything except digits
    // where in CSS a class can only start with an underscore (_), a hyphen (-) or a letter (a-z)/(A-Z)
    // so we're prefixing the breakpoint with _ incase the user sets an invalid character at the start of the string
    "".concat(atom.breakpoint ? "_".concat(atom.breakpoint, "_") : '').concat(atom.cssHyphenProp.replace(/-(moz|webkit|ms)-/, '').split('-').map(function (part) {
      return part[0];
    }).join(''), "_").concat(hash) : "_".concat(hash);
    return "".concat(classPrefix).concat(name);
  };

  var _createSheets = createSheets(env, config.breakpoints),
      tags = _createSheets.tags,
      sheets = _createSheets.sheets;

  var preInjectedRules = new Set(); // tslint:disable-next-line

  var _iterator = _createForOfIteratorHelper(tags),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tag = _step.value;
      ((tag.textContent || '').match(/\/\*\X\*\/.*?\/\*\X\*\//g) || []).forEach(function (rule) {
        // tslint:disable-next-line
        preInjectedRules.add('.' + cleanSSRClass(rule));
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var toString = env ? createToString(sheets, config.breakpoints, cssClassnameProvider, preInjectedRules) : createServerToString(sheets, config.breakpoints, cssClassnameProvider);
  var themeToString = createThemeToString(classPrefix, sheets.__variables__);
  var keyframesToString = createKeyframesToString(sheets[MAIN_BREAKPOINT_ID]);

  var compose = function compose() {
    var map = new Map();

    for (var _len = arguments.length, atoms = new Array(_len), _key = 0; _key < _len; _key++) {
      atoms[_key] = arguments[_key];
    }

    composeIntoMap(map, atoms);
    return _defineProperty$1({
      atoms: Array.from(map.values()),
      toString: toStringCompose
    }, ATOM, true);
  };

  var createAtom = function createAtom(cssProp, value) {
    var _selectorString, _atom;

    var breakpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MAIN_BREAKPOINT_ID;
    var selectorString = arguments.length > 3 ? arguments[3] : undefined;
    var inlineMediaQueries = arguments.length > 4 ? arguments[4] : undefined;
    var isGlobal = arguments.length > 5 ? arguments[5] : undefined;
    // generate id used for specificity check
    // two atoms are considered equal in regard to there specificity if the id is equal
    var inlineMediasAsString = inlineMediaQueries ? inlineMediaQueries.join('') : '';
    var id = cssProp.toLowerCase() + selectorString + (inlineMediaQueries ? inlineMediaQueries.join('') : '') + breakpoint; // make a uid accouting for different values

    var uid = id + value; // If this was created before return the cached atom

    if (atomCache.has(uid)) {
      // check if this has a breakpoint based media query
      if (inlineMediasAsString.match(/@media.*\((min|max)?.*(width|height).*\)/)) {
        // tslint:disable-next-line
        console.warn("The property \"".concat(cssProp, "\" with media query ").concat(inlineMediasAsString, " can cause a specificity issue. You should create a breakpoint"));
      }

      return atomCache.get(uid);
    } // prepare the cssProp


    var cssHyphenProp = hyphenAndVendorPrefixCssProp(cssProp, vendorProps, vendorPrefix); // We want certain pseudo selectors to take presedence over other pseudo
    // selectors, so we increase specificity

    if (!((_selectorString = selectorString) === null || _selectorString === void 0 ? void 0 : _selectorString.match('&'))) {
      var _selectorString2, _selectorString3, _selectorString4, _selectorString5, _selectorString6;

      if ((_selectorString2 = selectorString) === null || _selectorString2 === void 0 ? void 0 : _selectorString2.match(/\:hover/)) {
        selectorString = "&&".concat(selectorString);
      } else if ((_selectorString3 = selectorString) === null || _selectorString3 === void 0 ? void 0 : _selectorString3.match(/\:active/)) {
        selectorString = "&&&".concat(selectorString);
      } else if ((_selectorString4 = selectorString) === null || _selectorString4 === void 0 ? void 0 : _selectorString4.match(/\:focus|\:focus-visible/)) {
        selectorString = "&&&&".concat(selectorString);
      } else if ((_selectorString5 = selectorString) === null || _selectorString5 === void 0 ? void 0 : _selectorString5.match(/\:read-only/)) {
        selectorString = "&&&&&".concat(selectorString);
      } else if ((_selectorString6 = selectorString) === null || _selectorString6 === void 0 ? void 0 : _selectorString6.match(/\:disabled/)) {
        selectorString = "&&&&&&".concat(selectorString);
      }
    } // Create a new atom


    var atom = (_atom = {
      id: id,
      cssHyphenProp: cssHyphenProp,
      value: value,
      selector: selectorString,
      inlineMediaQueries: inlineMediaQueries,
      breakpoint: breakpoint,
      toString: toString
    }, _defineProperty$1(_atom, ATOM, true), _defineProperty$1(_atom, "_isGlobal", isGlobal), _atom); // Cache it

    atomCache.set(uid, atom);
    return atom;
  };

  var baseTokens = ':root{'; // tslint:disable-next-line

  for (var tokenType in tokens) {
    var isNumericScale = tokenType.match(/^(sizes|space|letterSpacings|zIndices)$/); // @ts-ignore
    // tslint:disable-next-line

    var scaleTokenKeys = Object.keys(tokens[tokenType]);

    for (var index = 0; index < scaleTokenKeys.length; index++) {
      var token = scaleTokenKeys[index]; // format token to remove special characters
      // https://stackoverflow.com/a/4374890

      var formattedToken = token.replace(/[^\w\s-]/gi, '');
      var cssVar = "--".concat(tokenType, "-").concat(formattedToken); // @ts-ignore

      baseTokens += "".concat(cssVar, ":").concat(tokens[tokenType][token], ";"); // @ts-ignore

      tokens[tokenType][token] = "var(".concat(cssVar, ")"); // Add negative tokens
      // tslint:disable-next-line: prefer-template

      var negativeTokenKey = '-' + token; // check that it's a numericScale and that the user didn't already set a negative token witht this name

      var isAlreadyANegativeToken = // @ts-ignore
      token[0] === '-' ? !!tokens[tokenType][token.substring(1)] : false;

      if (isNumericScale && // @ts-ignore
      !tokens[tokenType][negativeTokenKey] && !isAlreadyANegativeToken) {
        // @ts-ignore
        tokens[tokenType][negativeTokenKey] = "calc(var(".concat(cssVar, ") * -1)");
      }
    }
  }

  baseTokens += '}';

  if (!preInjectedRules.has(':root')) {
    sheets.__variables__.insertRule(baseTokens);
  } // Keeping track of all atoms for SSR


  var atomCache = new Map();
  var keyFramesCache = new Map();
  var themeCache = new Map();

  var cssInstance = function cssInstance() {
    var args = [];
    var index = 0;

    for (var _len2 = arguments.length, definitions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      definitions[_key2] = arguments[_key2];
    }

    for (var x = 0; x < definitions.length; x++) {
      if (!definitions[x]) {
        continue;
      }

      if (typeof definitions[x] === 'string' || definitions[x][ATOM]) {
        args[index++] = definitions[x];
      } else {
        processStyleObject(definitions[x], config, function (prop, value, path) {
          var _resolveBreakpointAnd = resolveBreakpointAndSelectorAndInlineMedia(path, config),
              nestingPath = _resolveBreakpointAnd.nestingPath,
              breakpoint = _resolveBreakpointAnd.breakpoint,
              inlineMediaQueries = _resolveBreakpointAnd.inlineMediaQueries;

          args[index++] = createAtom(prop, value, breakpoint, nestingPath, inlineMediaQueries);
        });
      }
    } // might cause memory leaks when doing css() inside a component
    // but we need this for now to fix SSR


    var composition = compose.apply(void 0, args);
    return composition;
  };

  cssInstance.dispose = function () {
    atomCache.clear();
    tags.forEach(function (tag) {
      var _tag$parentNode;

      (_tag$parentNode = tag.parentNode) === null || _tag$parentNode === void 0 ? void 0 : _tag$parentNode.removeChild(tag);
    });
  };

  cssInstance._config = function () {
    return config;
  };

  cssInstance.theme = function (definition) {
    if (themeCache.has(definition)) {
      return themeCache.get(definition);
    }

    var themeAtom = _defineProperty$1({
      // We could here also check if theme has been added from server,
      // though thinking it does not matter... just a simple rule
      name: String(themeCache.size),
      definition: definition,
      toString: themeToString
    }, ATOM, true);

    themeCache.set(definition, themeAtom);
    return themeAtom;
  };

  cssInstance.global = function (definitions) {
    processStyleObject(definitions, config, function (prop, value, path) {
      var _resolveBreakpointAnd2 = resolveBreakpointAndSelectorAndInlineMedia(path, config),
          nestingPath = _resolveBreakpointAnd2.nestingPath,
          breakpoint = _resolveBreakpointAnd2.breakpoint,
          inlineMediaQueries = _resolveBreakpointAnd2.inlineMediaQueries;

      if (!nestingPath.length) {
        throw new Error('Global styles need to be nested');
      } // Create a global atom and call toString() on it directly to inject it
      // as global atoms don't generate class names of their own


      createAtom(prop, value, breakpoint, nestingPath, inlineMediaQueries, true).toString();
    });
  };

  cssInstance.keyframes = function (definition) {
    var cssRule = '';
    var currentTimeProp = '';
    processStyleObject(definition, config, function (key, value, _ref3) {
      var _ref4 = _slicedToArray$1(_ref3, 1),
          timeProp = _ref4[0];

      if (timeProp !== currentTimeProp) {
        if (cssRule) {
          cssRule += "}";
        }

        currentTimeProp = timeProp;
        cssRule += "".concat(timeProp, " {");
      }

      cssRule += "".concat(hyphenAndVendorPrefixCssProp(key, vendorProps, vendorPrefix), ": ").concat(resolveTokens(key, value, tokens), ";");
    });
    var hash = hashString(cssRule); // Check if an atom exist with the same hash and return it if so

    var cachedAtom = keyFramesCache.get(hash);

    if (cachedAtom) {
      return cachedAtom;
    } // wrap it with the generated keyframes name


    cssRule = "@keyframes ".concat(hash, " {").concat(cssRule, "}");

    var keyframesAtom = _defineProperty$1({
      id: String(hash),
      _cssRuleString: cssRule,
      toString: keyframesToString
    }, ATOM, true);

    keyFramesCache.set(hash, keyframesAtom);
    return keyframesAtom;
  };

  cssInstance.getStyles = function (cb) {
    // tslint:disable-next-line
    for (var sheet in sheets) {
      sheets[sheet].cssRules.length = 0;
    }

    if (baseTokens) {
      sheets.__variables__.insertRule(baseTokens);
    } // We have to reset our toStrings so that they will now inject again,
    // and still cache is it is being reused


    toString = createServerToString(sheets, config.breakpoints, cssClassnameProvider);
    keyframesToString = createKeyframesToString(sheets[MAIN_BREAKPOINT_ID]);
    themeToString = createThemeToString(classPrefix, sheets.__variables__);
    atomCache.forEach(function (atom) {
      atom.toString = toString;
    });
    keyFramesCache.forEach(function (atom) {
      atom.toString = keyframesToString;
    });
    themeCache.forEach(function (atom) {
      atom.toString = themeToString;
    });
    var result = cb();
    return {
      result: result,
      styles: Object.keys(breakpoints).reduce(function (aggr, key) {
        return aggr.concat("/* STITCHES:".concat(key, " */\n").concat(sheets[key].cssRules.join('\n')));
      }, ["/* STITCHES:__variables__ */\n".concat(sheets.__variables__.cssRules.join('\n')), "/* STITCHES */\n".concat(sheets[MAIN_BREAKPOINT_ID].cssRules.join('\n'))])
    };
  };

  if (env) {
    hotReloadingCache.set(prefix, cssInstance);
  }

  return cssInstance;
};

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }

function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit$2(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }

function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$1(); }

function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createCompoundVariantsMatcher = function createCompoundVariantsMatcher(breakPoints, existingMap) {
  var map = new Map();
  map.set(MAIN_BREAKPOINT_ID, _toConsumableArray$1((existingMap === null || existingMap === void 0 ? void 0 : existingMap.get(MAIN_BREAKPOINT_ID)) || []));
  Object.keys(breakPoints).forEach(function (breakpoint) {
    return map.set(breakpoint, _toConsumableArray$1((existingMap === null || existingMap === void 0 ? void 0 : existingMap.get(breakpoint)) || []));
  });
  return map;
};

var createStyled = function createStyled(config) {
  var css = createCss(config);
  var defaultElement = 'div';
  var Box = react.forwardRef(function (props, ref) {
    var Element = props.as || defaultElement;
    return react.createElement(Element, _objectSpread$1(_objectSpread$1({
      ref: ref
    }, props), {}, {
      as: undefined
    }));
  });
  var currentAs;
  var configBreakpoints = config.breakpoints || {};

  var styledInstance = function styledInstance() {
    var baseAndVariantStyles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (cssComposer) {
      return cssComposer.compose();
    };
    var Component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Box;
    var numberOfCompoundVariants = 0;
    var as = currentAs;

    var _baseAndVariantStyles = baseAndVariantStyles.variants,
        variants = _baseAndVariantStyles === void 0 ? {} : _baseAndVariantStyles,
        base = _objectWithoutProperties(baseAndVariantStyles, ["variants"]);

    var baseStyles = css(base); // compound s vars & constants:
    // keep track of all compound variants:

    var compoundVariants = []; // a map that keeps track of the required number of matching s left for each break point:

    var requiredMatches = createCompoundVariantsMatcher(configBreakpoints); // keep track of the number of available variants

    var evaluatedVariantMap = new Map(); // store pre evaluated variants

    var evaluatedCompoundVariants = new Map(); // tslint:disable-next-line: forin

    for (var Name in variants) {
      var variantMap = new Map(); // tslint:disable-next-line: forin

      for (var ValueName in variants[Name]) {
        var evaluatedStyles = evaluateStylesForAllBreakpoints(variants[Name][ValueName], configBreakpoints, css);
        variantMap.set(ValueName, evaluatedStyles);
      }

      evaluatedVariantMap.set(Name, variantMap);
    }

    var stitchesComponentId = "scid-".concat(hashString(JSON.stringify(baseAndVariantStyles)));
    var StitchesComponent = react.forwardRef(function (props, ref) {

      var compositions = [baseStyles];
      var propsWithoutVariantsAndCssProp = {}; // clone the compound s matcher

      var compoundRequiredMatches = createCompoundVariantsMatcher(configBreakpoints, requiredMatches); // keep track of the number of unResolved s so that we could bail early:

      var numberOfUnResolvedCompoundVariants = {
        current: numberOfCompoundVariants
      };

      var _loop = function _loop(_key) {
        // check if the prop is a variant
        if (_key in variants) {
          (function () {
            var evaluatedVariant = evaluatedVariantMap.get(_key); // normalize the value so that we only have to deal with one structure:

            var keyVal = props[_key] && _typeof$1(props[_key]) !== 'object' ? _defineProperty$2({}, MAIN_BREAKPOINT_ID, props[_key]) : props[_key]; // tslint:disable-next-line: forin

            var _loop2 = function _loop2(breakpoint) {
              // check if the variant exist for this breakpoint
              if (keyVal[breakpoint] && evaluatedVariant && evaluatedVariant.get(String(keyVal[breakpoint]))) {
                var _evaluatedVariant$get;

                compositions.push((_evaluatedVariant$get = evaluatedVariant.get(String(keyVal[breakpoint]))) === null || _evaluatedVariant$get === void 0 ? void 0 : _evaluatedVariant$get[breakpoint]);
              }
              /** Compound variants: */


              if (numberOfUnResolvedCompoundVariants.current) {
                compoundVariants.forEach(function (compoundVariant, i) {
                  // if this breakpoint  matches a compound
                  // eslint-disable-next-line
                  if (String(keyVal[breakpoint]) === String(compoundVariant[_key])) {
                    compoundRequiredMatches.get(breakpoint)[i]--;
                  } // when the required matches reach 0 for any compound ...
                  // we know we have a matched compoundVariant


                  if (compoundRequiredMatches.get(breakpoint)[i] === 0) {
                    var _evaluatedCompoundVar;

                    numberOfUnResolvedCompoundVariants.current--;
                    compositions.push((_evaluatedCompoundVar = evaluatedCompoundVariants.get(compoundVariant)) === null || _evaluatedCompoundVar === void 0 ? void 0 : _evaluatedCompoundVar[breakpoint]);
                  }
                });
              }
              /** End compound variants */

            };

            for (var breakpoint in keyVal) {
              _loop2(breakpoint);
            }
          })();
        } else {
          propsWithoutVariantsAndCssProp[_key] = props[_key];
        }
      };

      for (var _key in props) {
        _loop(_key);
      }

      if (propsWithoutVariantsAndCssProp.css) {
        compositions.push(propsWithoutVariantsAndCssProp.css);
        propsWithoutVariantsAndCssProp.css = undefined;
      }

      return react.createElement(Component, _objectSpread$1(_objectSpread$1({}, propsWithoutVariantsAndCssProp), {}, {
        as: props.as || as,
        ref: ref,
        className: css.apply(void 0, [stitchesComponentId].concat(compositions, [props.className]))
      }));
    });
    StitchesComponent.displayName = typeof currentAs === 'string' ? "styled(".concat(currentAs, ")") : Component && Component.displayName ? "styled(".concat(Component.displayName, ")") : "styled(Component)";

    StitchesComponent.toString = function () {
      return ".".concat(stitchesComponentId);
    };

    StitchesComponent.compoundVariant = function (compundVariantsObject, compoundVariantStyles) {
      // Update component level variables:
      numberOfCompoundVariants++; // Each time we add

      compoundVariants.push(compundVariantsObject); // required matches is a map with breakpoints
      // each time we add a compound variant, we also push its length to
      // all of the breakpoints so:
      // requiredMatches.get(breakpoint)[i] === Object.keys(compoundVariants[i]).length
      // at render time we clone the requiredMatches map and whenever a prop matches a compound variant we decrement
      // the required matches for this compound variant at this breakpoint
      // when the required matches hit 0 we know it's a mtach

      requiredMatches.forEach(function (value, key) {
        value.push(Object.keys(compundVariantsObject).length);
      });
      var evaluatedStyles = evaluateStylesForAllBreakpoints(compoundVariantStyles, configBreakpoints, css);
      evaluatedCompoundVariants.set(compundVariantsObject, evaluatedStyles);
      return StitchesComponent;
    };

    return StitchesComponent;
  }; // tslint:disable-next-line


  var styledProxy = new Proxy(function () {}, {
    get: function get(_, prop) {
      if (prop === 'Box') {
        return Box;
      }

      currentAs = String(prop);
      return styledInstance;
    },
    apply: function apply(_, __, _ref2) {
      var _ref3 = _slicedToArray$2(_ref2, 2),
          Element = _ref3[0],
          styling = _ref3[1];

      if (typeof Element === 'string') {
        currentAs = Element;
        return styledInstance(styling);
      }

      currentAs = undefined;
      return styledInstance(styling, Element);
    }
  });
  return {
    styled: styledProxy,
    css: css
  };
};

function evaluateStylesForAllBreakpoints(styleObject, configBreakpoints, css) {
  var breakpoints = _defineProperty$2({}, MAIN_BREAKPOINT_ID, css(styleObject));

  if (configBreakpoints) {
    // tslint:disable-next-line
    for (var breakpoint in configBreakpoints) {
      breakpoints[breakpoint] = css(_defineProperty$2({}, breakpoint, styleObject));
    }
  }

  return breakpoints;
}

export { createStyled };
