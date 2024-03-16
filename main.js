(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/shallowequal/index.js
  var require_shallowequal = __commonJS({
    "node_modules/shallowequal/index.js"(exports, module) {
      module.exports = function shallowEqual2(objA, objB, compare, compareContext) {
        var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
        if (ret !== void 0) {
          return !!ret;
        }
        if (objA === objB) {
          return true;
        }
        if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
          return false;
        }
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) {
          return false;
        }
        var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
        for (var idx = 0; idx < keysA.length; idx++) {
          var key = keysA[idx];
          if (!bHasOwnProperty(key)) {
            return false;
          }
          var valueA = objA[key];
          var valueB = objB[key];
          ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
          if (ret === false || ret === void 0 && valueA !== valueB) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/invariant/browser.js
  var require_browser = __commonJS({
    "node_modules/invariant/browser.js"(exports, module) {
      "use strict";
      var invariant2 = function(condition, format, a2, b2, c, d2, e2, f2) {
        if (true) {
          if (format === void 0) {
            throw new Error("invariant requires an error message argument");
          }
        }
        if (!condition) {
          var error;
          if (format === void 0) {
            error = new Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          } else {
            var args = [a2, b2, c, d2, e2, f2];
            var argIndex = 0;
            error = new Error(
              format.replace(/%s/g, function() {
                return args[argIndex++];
              })
            );
            error.name = "Invariant Violation";
          }
          error.framesToPop = 1;
          throw error;
        }
      };
      module.exports = invariant2;
    }
  });

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.2.0";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
              return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a2) {
            return isArrayImpl(a2);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e2) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x2) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i2 = 0; i2 < childrenLength; i2++) {
                childArray[i2] = arguments[i2 + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i2 = 0; i2 < childrenLength; i2++) {
                childArray[i2] = arguments[i2 + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i2 = 0; i2 < children.length; i2++) {
                child = children[i2];
                nextName = nextNamePrefix + getElementKey(child, i2);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n2 = 0;
            mapChildren(children, function() {
              n2++;
            });
            return n2;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray2(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              // As a workaround to support multiple concurrent renderers, we categorize
              // some renderers as primary and others as secondary. We only expect
              // there to be two concurrent renderers at most: React Native (primary) and
              // Fabric (secondary); React DOM (primary) and React ART (secondary).
              // Secondary renderers store their context values on separate fields.
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              // Used to track how many concurrent renderers this context currently
              // supports within in a single renderer. Such as parallel server rendering.
              _threadCount: 0,
              // These are circular
              Provider: null,
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x2) {
                  var match = x2.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x2) {
                    control = x2;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x2) {
                    control = x2;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x2) {
                  control = x2;
                }
                fn();
              }
            } catch (sample2) {
              if (sample2 && control && typeof sample2.stack === "string") {
                var sampleLines = sample2.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s2 = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s2 >= 1 && c >= 0 && sampleLines[s2] !== controlLines[c]) {
                  c--;
                }
                for (; s2 >= 1 && c >= 0; s2--, c--) {
                  if (sampleLines[s2] !== controlLines[c]) {
                    if (s2 !== 1 || c !== 1) {
                      do {
                        s2--;
                        c--;
                        if (c < 0 || sampleLines[s2] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s2 >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x2) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i2 = 0; i2 < node.length; i2++) {
                var child = node[i2];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i2 = 0; i2 < keys.length; i2++) {
                var key = keys[i2];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i2 = 2; i2 < arguments.length; i2++) {
                validateChildKeys(arguments[i2], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i2 = 2; i2 < arguments.length; i2++) {
              validateChildKeys(arguments[i2], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope2, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope2();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve2, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve2, reject);
                      } else {
                        resolve2(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve2, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve2, reject);
                      } else {
                        resolve2(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve2, reject) {
                      resolve2(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve2, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve2(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve2, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve2(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i2 = 0;
                try {
                  for (; i2 < queue.length; i2++) {
                    var callback = queue[i2];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i2 + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray: toArray2,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/@elemaudio/core/dist/index.js
  var import_shallowequal = __toESM(require_shallowequal(), 1);
  var import_invariant = __toESM(require_browser(), 1);
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp2.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a2, prop, b2[prop]);
      }
    return a2;
  };
  var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
  var __export = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var curry_exports = {};
  __export(curry_exports, {
    _1: () => _1,
    _2: () => _2,
    _3: () => _3,
    _4: () => _4,
    _5: () => _5,
    _6: () => _6,
    _7: () => _7,
    _8: () => _8,
    __1: () => __1,
    __2: () => __2,
    __3: () => __3,
    __4: () => __4,
    __5: () => __5,
    __6: () => __6,
    __7: () => __7,
    __8: () => __8,
    app: () => app
  });
  function sub(x2, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i2 = offset;
    while (j < len) {
      result[j] = x2[i2];
      j = j + 1 | 0;
      i2 = i2 + 1 | 0;
    }
    ;
    return result;
  }
  function app(_f, _args) {
    while (true) {
      var args = _args;
      var f2 = _f;
      var init_arity = f2.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d2 = arity - len | 0;
      if (d2 === 0) {
        return f2.apply(null, args);
      }
      if (d2 >= 0) {
        return function(f22, args2) {
          return function(x2) {
            return app(f22, args2.concat([x2]));
          };
        }(f2, args);
      }
      _args = sub(args, arity, -d2 | 0);
      _f = f2.apply(null, sub(args, 0, arity));
      continue;
    }
    ;
  }
  function _1(o2, a0) {
    var arity = o2.length;
    if (arity === 1) {
      return o2(a0);
    } else {
      switch (arity) {
        case 1:
          return o2(a0);
        case 2:
          return function(param) {
            return o2(a0, param);
          };
        case 3:
          return function(param, param$1) {
            return o2(a0, param, param$1);
          };
        case 4:
          return function(param, param$1, param$2) {
            return o2(a0, param, param$1, param$2);
          };
        case 5:
          return function(param, param$1, param$2, param$3) {
            return o2(a0, param, param$1, param$2, param$3);
          };
        case 6:
          return function(param, param$1, param$2, param$3, param$4) {
            return o2(a0, param, param$1, param$2, param$3, param$4);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4, param$5) {
            return o2(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
        default:
          return app(o2, [a0]);
      }
    }
  }
  function __1(o2) {
    var arity = o2.length;
    if (arity === 1) {
      return o2;
    } else {
      return function(a0) {
        return _1(o2, a0);
      };
    }
  }
  function _2(o2, a0, a1) {
    var arity = o2.length;
    if (arity === 2) {
      return o2(a0, a1);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [a1]);
        case 2:
          return o2(a0, a1);
        case 3:
          return function(param) {
            return o2(a0, a1, param);
          };
        case 4:
          return function(param, param$1) {
            return o2(a0, a1, param, param$1);
          };
        case 5:
          return function(param, param$1, param$2) {
            return o2(a0, a1, param, param$1, param$2);
          };
        case 6:
          return function(param, param$1, param$2, param$3) {
            return o2(a0, a1, param, param$1, param$2, param$3);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4) {
            return o2(a0, a1, param, param$1, param$2, param$3, param$4);
          };
        default:
          return app(o2, [
            a0,
            a1
          ]);
      }
    }
  }
  function __2(o2) {
    var arity = o2.length;
    if (arity === 2) {
      return o2;
    } else {
      return function(a0, a1) {
        return _2(o2, a0, a1);
      };
    }
  }
  function _3(o2, a0, a1, a2) {
    var arity = o2.length;
    if (arity === 3) {
      return o2(a0, a1, a2);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [
            a1,
            a2
          ]);
        case 2:
          return app(o2(a0, a1), [a2]);
        case 3:
          return o2(a0, a1, a2);
        case 4:
          return function(param) {
            return o2(a0, a1, a2, param);
          };
        case 5:
          return function(param, param$1) {
            return o2(a0, a1, a2, param, param$1);
          };
        case 6:
          return function(param, param$1, param$2) {
            return o2(a0, a1, a2, param, param$1, param$2);
          };
        case 7:
          return function(param, param$1, param$2, param$3) {
            return o2(a0, a1, a2, param, param$1, param$2, param$3);
          };
        default:
          return app(o2, [
            a0,
            a1,
            a2
          ]);
      }
    }
  }
  function __3(o2) {
    var arity = o2.length;
    if (arity === 3) {
      return o2;
    } else {
      return function(a0, a1, a2) {
        return _3(o2, a0, a1, a2);
      };
    }
  }
  function _4(o2, a0, a1, a2, a3) {
    var arity = o2.length;
    if (arity === 4) {
      return o2(a0, a1, a2, a3);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [
            a1,
            a2,
            a3
          ]);
        case 2:
          return app(o2(a0, a1), [
            a2,
            a3
          ]);
        case 3:
          return app(o2(a0, a1, a2), [a3]);
        case 4:
          return o2(a0, a1, a2, a3);
        case 5:
          return function(param) {
            return o2(a0, a1, a2, a3, param);
          };
        case 6:
          return function(param, param$1) {
            return o2(a0, a1, a2, a3, param, param$1);
          };
        case 7:
          return function(param, param$1, param$2) {
            return o2(a0, a1, a2, a3, param, param$1, param$2);
          };
        default:
          return app(o2, [
            a0,
            a1,
            a2,
            a3
          ]);
      }
    }
  }
  function __4(o2) {
    var arity = o2.length;
    if (arity === 4) {
      return o2;
    } else {
      return function(a0, a1, a2, a3) {
        return _4(o2, a0, a1, a2, a3);
      };
    }
  }
  function _5(o2, a0, a1, a2, a3, a4) {
    var arity = o2.length;
    if (arity === 5) {
      return o2(a0, a1, a2, a3, a4);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [
            a1,
            a2,
            a3,
            a4
          ]);
        case 2:
          return app(o2(a0, a1), [
            a2,
            a3,
            a4
          ]);
        case 3:
          return app(o2(a0, a1, a2), [
            a3,
            a4
          ]);
        case 4:
          return app(o2(a0, a1, a2, a3), [a4]);
        case 5:
          return o2(a0, a1, a2, a3, a4);
        case 6:
          return function(param) {
            return o2(a0, a1, a2, a3, a4, param);
          };
        case 7:
          return function(param, param$1) {
            return o2(a0, a1, a2, a3, a4, param, param$1);
          };
        default:
          return app(o2, [
            a0,
            a1,
            a2,
            a3,
            a4
          ]);
      }
    }
  }
  function __5(o2) {
    var arity = o2.length;
    if (arity === 5) {
      return o2;
    } else {
      return function(a0, a1, a2, a3, a4) {
        return _5(o2, a0, a1, a2, a3, a4);
      };
    }
  }
  function _6(o2, a0, a1, a2, a3, a4, a5) {
    var arity = o2.length;
    if (arity === 6) {
      return o2(a0, a1, a2, a3, a4, a5);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [
            a1,
            a2,
            a3,
            a4,
            a5
          ]);
        case 2:
          return app(o2(a0, a1), [
            a2,
            a3,
            a4,
            a5
          ]);
        case 3:
          return app(o2(a0, a1, a2), [
            a3,
            a4,
            a5
          ]);
        case 4:
          return app(o2(a0, a1, a2, a3), [
            a4,
            a5
          ]);
        case 5:
          return app(o2(a0, a1, a2, a3, a4), [a5]);
        case 6:
          return o2(a0, a1, a2, a3, a4, a5);
        case 7:
          return function(param) {
            return o2(a0, a1, a2, a3, a4, a5, param);
          };
        default:
          return app(o2, [
            a0,
            a1,
            a2,
            a3,
            a4,
            a5
          ]);
      }
    }
  }
  function __6(o2) {
    var arity = o2.length;
    if (arity === 6) {
      return o2;
    } else {
      return function(a0, a1, a2, a3, a4, a5) {
        return _6(o2, a0, a1, a2, a3, a4, a5);
      };
    }
  }
  function _7(o2, a0, a1, a2, a3, a4, a5, a6) {
    var arity = o2.length;
    if (arity === 7) {
      return o2(a0, a1, a2, a3, a4, a5, a6);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [
            a1,
            a2,
            a3,
            a4,
            a5,
            a6
          ]);
        case 2:
          return app(o2(a0, a1), [
            a2,
            a3,
            a4,
            a5,
            a6
          ]);
        case 3:
          return app(o2(a0, a1, a2), [
            a3,
            a4,
            a5,
            a6
          ]);
        case 4:
          return app(o2(a0, a1, a2, a3), [
            a4,
            a5,
            a6
          ]);
        case 5:
          return app(o2(a0, a1, a2, a3, a4), [
            a5,
            a6
          ]);
        case 6:
          return app(o2(a0, a1, a2, a3, a4, a5), [a6]);
        case 7:
          return o2(a0, a1, a2, a3, a4, a5, a6);
        default:
          return app(o2, [
            a0,
            a1,
            a2,
            a3,
            a4,
            a5,
            a6
          ]);
      }
    }
  }
  function __7(o2) {
    var arity = o2.length;
    if (arity === 7) {
      return o2;
    } else {
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return _7(o2, a0, a1, a2, a3, a4, a5, a6);
      };
    }
  }
  function _8(o2, a0, a1, a2, a3, a4, a5, a6, a7) {
    var arity = o2.length;
    if (arity === 8) {
      return o2(a0, a1, a2, a3, a4, a5, a6, a7);
    } else {
      switch (arity) {
        case 1:
          return app(o2(a0), [
            a1,
            a2,
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
        case 2:
          return app(o2(a0, a1), [
            a2,
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
        case 3:
          return app(o2(a0, a1, a2), [
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
        case 4:
          return app(o2(a0, a1, a2, a3), [
            a4,
            a5,
            a6,
            a7
          ]);
        case 5:
          return app(o2(a0, a1, a2, a3, a4), [
            a5,
            a6,
            a7
          ]);
        case 6:
          return app(o2(a0, a1, a2, a3, a4, a5), [
            a6,
            a7
          ]);
        case 7:
          return app(o2(a0, a1, a2, a3, a4, a5, a6), [a7]);
        default:
          return app(o2, [
            a0,
            a1,
            a2,
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
      }
    }
  }
  function __8(o2) {
    var arity = o2.length;
    if (arity === 8) {
      return o2;
    } else {
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return _8(o2, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    }
  }
  var Reconciler_bs_exports = {};
  __export(Reconciler_bs_exports, {
    $$Map: () => $$Map,
    $$Set: () => $$Set,
    NodeRepr: () => NodeRepr,
    RenderDelegate: () => RenderDelegate,
    mount: () => mount,
    renderWithDelegate: () => renderWithDelegate,
    stepGarbageCollector: () => stepGarbageCollector,
    visit: () => visit
  });
  function raiseError(str) {
    throw new Error(str);
  }
  function classify(x2) {
    var ty = typeof x2;
    if (ty === "undefined") {
      return 3;
    } else if (x2 === null) {
      return 2;
    } else if (ty === "number") {
      return {
        TAG: 0,
        _0: x2
      };
    } else if (ty === "bigint") {
      return {
        TAG: 5,
        _0: x2
      };
    } else if (ty === "string") {
      return {
        TAG: 1,
        _0: x2
      };
    } else if (ty === "boolean") {
      if (x2 === true) {
        return 1;
      } else {
        return 0;
      }
    } else if (ty === "symbol") {
      return {
        TAG: 4,
        _0: x2
      };
    } else if (ty === "function") {
      return {
        TAG: 2,
        _0: x2
      };
    } else {
      return {
        TAG: 3,
        _0: x2
      };
    }
  }
  function test(x2, v2) {
    switch (v2) {
      case 0:
        return typeof x2 === "undefined";
      case 1:
        return x2 === null;
      case 2:
        return typeof x2 === "boolean";
      case 3:
        return typeof x2 === "number";
      case 4:
        return typeof x2 === "string";
      case 5:
        return typeof x2 === "function";
      case 6:
        return typeof x2 === "object";
      case 7:
        return typeof x2 === "symbol";
      case 8:
        return typeof x2 === "bigint";
    }
  }
  function valFromOption(x2) {
    if (!(x2 !== null && x2.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
      return x2;
    }
    var depth = x2.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return;
    } else {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
      };
    }
  }
  function add(xs, x2) {
    return {
      hd: x2,
      tl: xs
    };
  }
  function copyAuxCont(_cellX, _prec) {
    while (true) {
      var prec = _prec;
      var cellX = _cellX;
      if (!cellX) {
        return prec;
      }
      var next = {
        hd: cellX.hd,
        tl: 0
      };
      prec.tl = next;
      _prec = next;
      _cellX = cellX.tl;
      continue;
    }
    ;
  }
  function copyAuxWithMap(_cellX, _prec, f2) {
    while (true) {
      var prec = _prec;
      var cellX = _cellX;
      if (!cellX) {
        return;
      }
      var next = {
        hd: f2(cellX.hd),
        tl: 0
      };
      prec.tl = next;
      _prec = next;
      _cellX = cellX.tl;
      continue;
    }
    ;
  }
  function copyAuxWithMapI(f2, _i, _cellX, _prec) {
    while (true) {
      var prec = _prec;
      var cellX = _cellX;
      var i2 = _i;
      if (!cellX) {
        return;
      }
      var next = {
        hd: f2(i2, cellX.hd),
        tl: 0
      };
      prec.tl = next;
      _prec = next;
      _cellX = cellX.tl;
      _i = i2 + 1 | 0;
      continue;
    }
    ;
  }
  function concat(xs, ys) {
    if (!xs) {
      return ys;
    }
    var cell = {
      hd: xs.hd,
      tl: 0
    };
    copyAuxCont(xs.tl, cell).tl = ys;
    return cell;
  }
  function mapU(xs, f2) {
    if (!xs) {
      return 0;
    }
    var cell = {
      hd: f2(xs.hd),
      tl: 0
    };
    copyAuxWithMap(xs.tl, cell, f2);
    return cell;
  }
  function map(xs, f2) {
    return mapU(xs, __1(f2));
  }
  function mapWithIndexU(xs, f2) {
    if (!xs) {
      return 0;
    }
    var cell = {
      hd: f2(0, xs.hd),
      tl: 0
    };
    copyAuxWithMapI(f2, 1, xs.tl, cell);
    return cell;
  }
  function mapWithIndex(xs, f2) {
    return mapWithIndexU(xs, __2(f2));
  }
  function length(xs) {
    var _x = xs;
    var _acc = 0;
    while (true) {
      var acc = _acc;
      var x2 = _x;
      if (!x2) {
        return acc;
      }
      _acc = acc + 1 | 0;
      _x = x2.tl;
      continue;
    }
    ;
  }
  function fillAux(arr, _i, _x) {
    while (true) {
      var x2 = _x;
      var i2 = _i;
      if (!x2) {
        return;
      }
      arr[i2] = x2.hd;
      _x = x2.tl;
      _i = i2 + 1 | 0;
      continue;
    }
    ;
  }
  function fromArray(a2) {
    var _i = a2.length - 1 | 0;
    var _res = 0;
    while (true) {
      var res = _res;
      var i2 = _i;
      if (i2 < 0) {
        return res;
      }
      _res = {
        hd: a2[i2],
        tl: res
      };
      _i = i2 - 1 | 0;
      continue;
    }
    ;
  }
  function toArray(x2) {
    var len = length(x2);
    var arr = new Array(len);
    fillAux(arr, 0, x2);
    return arr;
  }
  function forEachU(_xs, f2) {
    while (true) {
      var xs = _xs;
      if (!xs) {
        return;
      }
      f2(xs.hd);
      _xs = xs.tl;
      continue;
    }
    ;
  }
  function forEach(xs, f2) {
    forEachU(xs, __1(f2));
  }
  function reduceU(_l, _accu, f2) {
    while (true) {
      var accu = _accu;
      var l2 = _l;
      if (!l2) {
        return accu;
      }
      _accu = f2(accu, l2.hd);
      _l = l2.tl;
      continue;
    }
    ;
  }
  function everyU(_xs, p2) {
    while (true) {
      var xs = _xs;
      if (!xs) {
        return true;
      }
      if (!p2(xs.hd)) {
        return false;
      }
      _xs = xs.tl;
      continue;
    }
    ;
  }
  function every(xs, p2) {
    return everyU(xs, __1(p2));
  }
  function updateNodeProps(renderer, hash, prevProps, nextProps) {
    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {
        const value = nextProps[key];
        const shouldUpdate = !prevProps.hasOwnProperty(key) || !(0, import_shallowequal.default)(prevProps[key], value);
        if (shouldUpdate) {
          const seemsInvalid = typeof value === "undefined" || value === null || typeof value === "number" && isNaN(value) || typeof value === "number" && !isFinite(value);
          if (seemsInvalid) {
            console.warn(`Warning: applying a potentially erroneous property value. ${key}: ${value}`);
          }
          renderer.setProperty(hash, key, value);
        }
      }
    }
  }
  function getExn(x2) {
    if (x2 !== void 0) {
      return valFromOption(x2);
    }
    throw new Error("getExn");
  }
  function updateNodeProps2(prim0, prim1, prim2, prim3) {
    updateNodeProps(prim0, prim1, prim2, prim3);
  }
  function mixNumber(seed, n2) {
    return Math.imul(seed ^ n2, 16777619);
  }
  function hashString(seed, s2) {
    var r3 = seed;
    for (var i2 = 0, i_finish = s2.length; i2 <= i_finish; ++i2) {
      r3 = mixNumber(r3, s2.charCodeAt(i2) | 0);
    }
    return r3;
  }
  function hashNode(kind, props, children) {
    var r3 = hashString(-2128831035, kind);
    var r22 = test(props.key, 4) ? hashString(r3, props.key) : hashString(r3, getExn(JSON.stringify(props)));
    return reduceU(children, r22, mixNumber) & 2147483647;
  }
  var symbol = Symbol.for("ELEM_NODE");
  function createPrimitive(kind, props, children) {
    return {
      symbol,
      kind: {
        NAME: "Primitive",
        VAL: kind
      },
      props,
      children: fromArray(children)
    };
  }
  function createComposite(fn, props, children) {
    return {
      symbol,
      kind: {
        NAME: "Composite",
        VAL: [
          {
            contents: void 0
          },
          fn
        ]
      },
      props,
      children: fromArray(children)
    };
  }
  function isNode(a2) {
    var match = classify(a2);
    if (typeof match === "number") {
      return false;
    }
    if (match.TAG !== 3) {
      return false;
    }
    var s2 = classify(a2.symbol);
    if (typeof s2 === "number" || s2.TAG !== 4) {
      return false;
    } else {
      return s2._0 === symbol;
    }
  }
  function getHashUnchecked(n2) {
    var x2 = n2.hash;
    if (x2 !== void 0) {
      return x2;
    } else {
      return raiseError("Missing hash property");
    }
  }
  function shallowCopy(node) {
    var match = node.kind;
    if (match.NAME === "Composite") {
      return raiseError("Attempting to shallow copy a composite node");
    } else {
      return {
        symbol,
        hash: getHashUnchecked(node),
        kind: match.VAL,
        props: Object.assign({}, node.props),
        generation: {
          contents: 0
        }
      };
    }
  }
  var NodeRepr = {
    symbol,
    createPrimitive,
    createComposite,
    isNode,
    getHashUnchecked,
    shallowCopy
  };
  function valuesArray(m2) {
    return Array.from(m2.values());
  }
  var $$Map = {
    valuesArray
  };
  var $$Set = {};
  var RenderDelegate = {};
  function mount(delegate, node, kind, hash, childHashes) {
    var nodeMap = delegate.getNodeMap();
    if (nodeMap.has(hash)) {
      var existing = nodeMap.get(hash);
      updateNodeProps2(delegate, hash, existing.props, node.props);
      nodeMap.set(hash, shallowCopy(node));
      return;
    }
    delegate.createNode(hash, kind);
    updateNodeProps2(delegate, hash, {}, node.props);
    forEach(childHashes, function(ch) {
      delegate.appendChild(hash, ch);
    });
    nodeMap.set(hash, shallowCopy(node));
  }
  function visit(delegate, visitSet, _ns) {
    while (true) {
      var ns = _ns;
      var visited = function(x2) {
        return visitSet.has(x2);
      };
      if (!ns) {
        return;
      }
      var rest = ns.tl;
      var n2 = ns.hd;
      if (visitSet.has(n2)) {
        _ns = rest;
        continue;
      }
      var childrenVisited = every(n2.children, visited);
      if (childrenVisited) {
        var childHashes = map(n2.children, function(child) {
          return getExn(child.hash);
        });
        var match = n2.kind;
        if (match.NAME === "Composite") {
          var match$1 = match.VAL;
          var res = match$1[0];
          var context = delegate.getRenderContext();
          var n$1 = res.contents;
          var resolved = n$1 !== void 0 ? n$1 : _1(match$1[1], {
            context,
            props: n2.props,
            children: toArray(n2.children)
          });
          res.contents = resolved;
          if (visitSet.has(resolved)) {
            n2.hash = getExn(resolved.hash);
            visitSet.add(n2);
            _ns = rest;
            continue;
          }
          _ns = add(add(rest, n2), resolved);
          continue;
        }
        var k2 = match.VAL;
        var hash = hashNode(k2, n2.props, childHashes);
        n2.hash = hash;
        mount(delegate, n2, k2, hash, childHashes);
        visitSet.add(n2);
        _ns = rest;
        continue;
      }
      _ns = concat(n2.children, ns);
      continue;
    }
    ;
  }
  function renderWithDelegate(delegate, graphs) {
    var visitSet = /* @__PURE__ */ new Set();
    var roots = mapWithIndex(fromArray(graphs), function(i2, g2) {
      return createPrimitive("root", {
        channel: i2
      }, [g2]);
    });
    visit(delegate, visitSet, roots);
    delegate.activateRoots(toArray(map(roots, getHashUnchecked)));
    delegate.commitUpdates();
  }
  function stepGarbageCollector(delegate) {
    var nodeMap = delegate.getNodeMap();
    var term = delegate.getTerminalGeneration();
    var deleted = Array.from(nodeMap.values()).reduce(function(acc, n2) {
      n2.generation.contents = n2.generation.contents + 1 | 0;
      if (n2.generation.contents >= term) {
        delegate.deleteNode(n2.hash);
        return add(acc, n2);
      } else {
        return acc;
      }
    }, 0);
    if (length(deleted) > 0) {
      delegate.commitUpdates();
      return forEach(deleted, function(n2) {
        nodeMap.delete(n2.hash);
      });
    }
  }
  var Curry = curry_exports;
  var ReconcilerBS = Reconciler_bs_exports;
  var NodeRepr_createPrimitive = function(Arg1, Arg2, Arg3) {
    const result = Curry._3(ReconcilerBS.NodeRepr.createPrimitive, Arg1, Arg2, Arg3);
    return result;
  };
  var NodeRepr_createComposite = function(Arg1, Arg2, Arg3) {
    const result = Curry._3(ReconcilerBS.NodeRepr.createComposite, Arg1, Arg2, Arg3);
    return result;
  };
  var NodeRepr_isNode = ReconcilerBS.NodeRepr.isNode;
  var NodeRepr_getHashUnchecked = ReconcilerBS.NodeRepr.getHashUnchecked;
  var NodeRepr_shallowCopy = ReconcilerBS.NodeRepr.shallowCopy;
  var renderWithDelegate2 = function(Arg1, Arg2) {
    const result = Curry._2(ReconcilerBS.renderWithDelegate, Arg1, Arg2);
    return result;
  };
  var stepGarbageCollector2 = ReconcilerBS.stepGarbageCollector;
  function resolve(n2) {
    if (typeof n2 === "number")
      return NodeRepr_createPrimitive("const", { value: n2 }, []);
    (0, import_invariant.default)(isNode2(n2), `Whoops, expecting a Node type here! Got: ${typeof n2}`);
    return n2;
  }
  function isNode2(n2) {
    return NodeRepr_isNode(n2);
  }
  function createNode(kind, props, children) {
    (0, import_invariant.default)(children.length <= 8, `Nodes can only have at most 8 children.`);
    if (typeof kind === "string") {
      return NodeRepr_createPrimitive(kind, props, children.map(resolve));
    }
    return NodeRepr_createComposite(kind, props, children.map(resolve));
  }
  var core_exports = {};
  __export(core_exports, {
    accum: () => accum,
    biquad: () => biquad,
    constant: () => constant,
    convolve: () => convolve,
    counter: () => counter,
    delay: () => delay,
    env: () => env,
    fft: () => fft,
    latch: () => latch,
    maxhold: () => maxhold,
    meter: () => meter,
    metro: () => metro,
    once: () => once,
    phasor: () => phasor,
    pole: () => pole,
    rand: () => rand,
    sample: () => sample,
    scope: () => scope,
    sdelay: () => sdelay,
    seq: () => seq,
    seq2: () => seq2,
    snapshot: () => snapshot,
    sparseq: () => sparseq,
    sr: () => sr,
    svf: () => svf,
    svfshelf: () => svfshelf,
    table: () => table,
    tapIn: () => tapIn,
    tapOut: () => tapOut,
    time: () => time,
    z: () => z
  });
  function constant(props) {
    return createNode("const", props, []);
  }
  function sr() {
    return createNode("sr", {}, []);
  }
  function time() {
    return createNode("time", {}, []);
  }
  function counter(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("counter", {}, [resolve(a2)]);
    }
    return createNode("counter", a2, [resolve(b2)]);
  }
  function accum(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("accum", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("accum", a2, [resolve(b2), resolve(c)]);
  }
  function phasor(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("phasor", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("phasor", a2, [resolve(b2), resolve(c)]);
  }
  function latch(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("latch", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("latch", a2, [resolve(b2), resolve(c)]);
  }
  function maxhold(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("maxhold", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("maxhold", a2, [resolve(b2), resolve(c)]);
  }
  function once(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("once", {}, [resolve(a2)]);
    }
    return createNode("once", a2, [resolve(b2)]);
  }
  function rand(a2) {
    if (typeof a2 !== "undefined") {
      return createNode("rand", a2, []);
    }
    return createNode("rand", {}, []);
  }
  function metro(a2) {
    if (typeof a2 !== "undefined") {
      return createNode("metro", a2, []);
    }
    return createNode("metro", {}, []);
  }
  function sample(props, trigger, rate) {
    return createNode("sample", props, [resolve(trigger), resolve(rate)]);
  }
  function table(props, t2) {
    return createNode("table", props, [resolve(t2)]);
  }
  function convolve(props, x2) {
    return createNode("convolve", props, [resolve(x2)]);
  }
  function seq(props, trigger, reset) {
    return createNode("seq", props, [resolve(trigger), resolve(reset)]);
  }
  function seq2(props, trigger, reset) {
    return createNode("seq2", props, [resolve(trigger), resolve(reset)]);
  }
  function sparseq(props, trigger, reset) {
    return createNode("sparseq", props, [resolve(trigger), resolve(reset)]);
  }
  function pole(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("pole", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("pole", a2, [resolve(b2), resolve(c)]);
  }
  function env(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("env", {}, [resolve(a2), resolve(b2), resolve(c)]);
    }
    return createNode("env", a2, [resolve(b2), resolve(c), resolve(d2)]);
  }
  function z(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("z", {}, [resolve(a2)]);
    }
    return createNode("z", a2, [resolve(b2)]);
  }
  function delay(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("delay", {}, [resolve(a2), resolve(b2), resolve(c)]);
    }
    return createNode("delay", a2, [resolve(b2), resolve(c), resolve(d2)]);
  }
  function sdelay(props, x2) {
    return createNode("sdelay", props, [resolve(x2)]);
  }
  function svf(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("svf", {}, [
        resolve(a2),
        resolve(b2),
        resolve(c)
      ]);
    }
    return createNode("svf", a2, [
      resolve(b2),
      resolve(c),
      resolve(d2)
    ]);
  }
  function svfshelf(a2, b2, c, d2, e2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("svfshelf", {}, [
        resolve(a2),
        resolve(b2),
        resolve(c),
        resolve(d2)
      ]);
    }
    return createNode("svfshelf", a2, [
      resolve(b2),
      resolve(c),
      resolve(d2),
      resolve(e2)
    ]);
  }
  function biquad(a2, b2, c, d2, e2, f2, g2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("biquad", {}, [
        resolve(a2),
        resolve(b2),
        resolve(c),
        resolve(d2),
        resolve(e2),
        resolve(f2)
      ]);
    }
    return createNode("biquad", a2, [
      resolve(b2),
      resolve(c),
      resolve(d2),
      resolve(e2),
      resolve(f2),
      resolve(g2)
    ]);
  }
  function tapIn(props) {
    return createNode("tapIn", props, []);
  }
  function tapOut(props, x2) {
    return createNode("tapOut", props, [resolve(x2)]);
  }
  function meter(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("meter", {}, [resolve(a2)]);
    }
    return createNode("meter", a2, [resolve(b2)]);
  }
  function snapshot(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("snapshot", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("snapshot", a2, [resolve(b2), resolve(c)]);
  }
  function scope(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("scope", {}, [a2, ...bs].map(resolve));
    }
    return createNode("scope", a2, bs.map(resolve));
  }
  function fft(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("fft", {}, [resolve(a2)]);
    }
    return createNode("fft", a2, [resolve(b2)]);
  }
  var dynamics_exports = {};
  __export(dynamics_exports, {
    compress: () => compress
  });
  var math_exports = {};
  __export(math_exports, {
    abs: () => abs,
    add: () => add2,
    and: () => and,
    asinh: () => asinh,
    ceil: () => ceil,
    cos: () => cos,
    div: () => div,
    eq: () => eq,
    exp: () => exp,
    floor: () => floor,
    ge: () => ge,
    geq: () => geq,
    identity: () => identity,
    le: () => le,
    leq: () => leq,
    ln: () => ln,
    log: () => log,
    log2: () => log2,
    max: () => max2,
    min: () => min2,
    mod: () => mod,
    mul: () => mul,
    or: () => or,
    pow: () => pow,
    sin: () => sin,
    sqrt: () => sqrt,
    sub: () => sub2,
    tan: () => tan,
    tanh: () => tanh
  });
  function identity(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("in", {}, [resolve(a2)]) : typeof b2 === "number" || isNode2(b2) ? createNode("in", a2, [resolve(b2)]) : createNode("in", a2, []);
  }
  function sin(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("sin", {}, [resolve(a2)]) : createNode("sin", a2, [resolve(b2)]);
  }
  function cos(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("cos", {}, [resolve(a2)]) : createNode("cos", a2, [resolve(b2)]);
  }
  function tan(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("tan", {}, [resolve(a2)]) : createNode("tan", a2, [resolve(b2)]);
  }
  function tanh(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("tanh", {}, [resolve(a2)]) : createNode("tanh", a2, [resolve(b2)]);
  }
  function asinh(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("asinh", {}, [resolve(a2)]) : createNode("asinh", a2, [resolve(b2)]);
  }
  function ln(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("ln", {}, [resolve(a2)]) : createNode("ln", a2, [resolve(b2)]);
  }
  function log(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("log", {}, [resolve(a2)]) : createNode("log", a2, [resolve(b2)]);
  }
  function log2(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("log2", {}, [resolve(a2)]) : createNode("log2", a2, [resolve(b2)]);
  }
  function ceil(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("ceil", {}, [resolve(a2)]) : createNode("ceil", a2, [resolve(b2)]);
  }
  function floor(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("floor", {}, [resolve(a2)]) : createNode("floor", a2, [resolve(b2)]);
  }
  function sqrt(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("sqrt", {}, [resolve(a2)]) : createNode("sqrt", a2, [resolve(b2)]);
  }
  function exp(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("exp", {}, [resolve(a2)]) : createNode("exp", a2, [resolve(b2)]);
  }
  function abs(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? createNode("abs", {}, [resolve(a2)]) : createNode("abs", a2, [resolve(b2)]);
  }
  function le(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("le", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("le", a2, [resolve(b2), resolve(c)]);
  }
  function leq(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("leq", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("leq", a2, [resolve(b2), resolve(c)]);
  }
  function ge(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("ge", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("ge", a2, [resolve(b2), resolve(c)]);
  }
  function geq(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("geq", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("geq", a2, [resolve(b2), resolve(c)]);
  }
  function pow(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("pow", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("pow", a2, [resolve(b2), resolve(c)]);
  }
  function eq(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("eq", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("eq", a2, [resolve(b2), resolve(c)]);
  }
  function and(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("and", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("and", a2, [resolve(b2), resolve(c)]);
  }
  function or(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("or", {}, [resolve(a2), resolve(b2)]);
    }
    return createNode("or", a2, [resolve(b2), resolve(c)]);
  }
  function add2(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("add", {}, [a2, ...bs].map(resolve));
    }
    return createNode("add", a2, bs.map(resolve));
  }
  function sub2(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("sub", {}, [a2, ...bs].map(resolve));
    }
    return createNode("sub", a2, bs.map(resolve));
  }
  function mul(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("mul", {}, [a2, ...bs].map(resolve));
    }
    return createNode("mul", a2, bs.map(resolve));
  }
  function div(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("div", {}, [a2, ...bs].map(resolve));
    }
    return createNode("div", a2, bs.map(resolve));
  }
  function mod(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("mod", {}, [a2, ...bs].map(resolve));
    }
    return createNode("mod", a2, bs.map(resolve));
  }
  function min2(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("min", {}, [a2, ...bs].map(resolve));
    }
    return createNode("min", a2, bs.map(resolve));
  }
  function max2(a2, ...bs) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode("max", {}, [a2, ...bs].map(resolve));
    }
    return createNode("max", a2, bs.map(resolve));
  }
  var signals_exports = {};
  __export(signals_exports, {
    db2gain: () => db2gain,
    gain2db: () => gain2db,
    hann: () => hann,
    ms2samps: () => ms2samps,
    select: () => select,
    tau2pole: () => tau2pole
  });
  var el = __spreadValues(__spreadValues({}, core_exports), math_exports);
  function ms2samps(t2) {
    return el.mul(el.sr(), el.div(t2, 1e3));
  }
  function tau2pole(t2) {
    return el.exp(el.div(-1, el.mul(t2, el.sr())));
  }
  function db2gain(db) {
    return el.pow(10, el.mul(db, 1 / 20));
  }
  function gain2db(gain) {
    return select(el.ge(gain, 0), el.max(-120, el.mul(20, el.log(gain))), -120);
  }
  function select(g2, a2, b2) {
    return el.add(el.mul(g2, a2), el.mul(el.sub(1, g2), b2));
  }
  function hann(t2) {
    return el.mul(0.5, el.sub(1, el.cos(el.mul(2 * Math.PI, t2))));
  }
  var el2 = __spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), signals_exports);
  function CompressComposite({ children }) {
    const [atkMs, relMs, threshold, ratio, sidechain, xn] = children;
    const env2 = el2.env(el2.tau2pole(el2.mul(1e-3, atkMs)), el2.tau2pole(el2.mul(1e-3, relMs)), sidechain);
    const envDecibels = el2.gain2db(env2);
    const strength = el2.select(el2.leq(ratio, 1), 0, el2.select(el2.geq(ratio, 50), 1, el2.div(1, ratio)));
    const gain = el2.select(el2.ge(envDecibels, threshold), el2.db2gain(el2.mul(el2.sub(threshold, envDecibels), strength)), 1);
    return resolve(el2.mul(xn, gain));
  }
  function compress(a2, b2, c, d2, e2, f2, g2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode(CompressComposite, {}, [a2, b2, c, d2, e2, f2]);
    }
    return createNode(CompressComposite, a2, [b2, c, d2, e2, f2, g2]);
  }
  var envelopes_exports = {};
  __export(envelopes_exports, {
    adsr: () => adsr
  });
  var filters_exports = {};
  __export(filters_exports, {
    allpass: () => allpass,
    bandpass: () => bandpass,
    dcblock: () => dcblock,
    df11: () => df11,
    highpass: () => highpass,
    highshelf: () => highshelf,
    lowpass: () => lowpass,
    lowshelf: () => lowshelf,
    notch: () => notch,
    peak: () => peak,
    pink: () => pink,
    sm: () => sm,
    smooth: () => smooth,
    zero: () => zero
  });
  var el3 = __spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), signals_exports);
  function smooth(a2, b2, c) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.pole(a2, el3.mul(el3.sub(1, a2), b2));
    }
    return el3.pole(a2, b2, el3.mul(el3.sub(1, b2), c));
  }
  function sm(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return smooth(el3.tau2pole(0.02), a2);
    }
    return smooth(a2, el3.tau2pole(0.02), b2);
  }
  function zero(a2, b2, c, d2) {
    let [b0, b1, x2] = typeof a2 === "number" || isNode2(a2) ? [a2, b2, c] : [b2, c, d2];
    return el3.sub(el3.mul(b0, x2), el3.mul(b1, el3.z(x2)));
  }
  function dcblock(a2, b2) {
    let x2 = typeof a2 === "number" || isNode2(a2) ? a2 : b2;
    return el3.pole(0.995, zero(1, 1, x2));
  }
  function df11(a2, b2, c, d2, e2) {
    let [b0, b1, a1, x2] = typeof a2 === "number" || isNode2(a2) ? [a2, b2, c, d2] : [b2, c, d2, e2];
    return el3.pole(a1, zero(b0, b1, x2));
  }
  function lowpass(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svf({ mode: "lowpass" }, a2, b2, c);
    }
    return el3.svf(Object.assign({}, a2, { mode: "lowpass" }), b2, c, d2);
  }
  function highpass(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svf({ mode: "highpass" }, a2, b2, c);
    }
    return el3.svf(Object.assign({}, a2, { mode: "highpass" }), b2, c, d2);
  }
  function bandpass(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svf({ mode: "bandpass" }, a2, b2, c);
    }
    return el3.svf(Object.assign({}, a2, { mode: "bandpass" }), b2, c, d2);
  }
  function notch(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svf({ mode: "notch" }, a2, b2, c);
    }
    return el3.svf(Object.assign({}, a2, { mode: "notch" }), b2, c, d2);
  }
  function allpass(a2, b2, c, d2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svf({ mode: "allpass" }, a2, b2, c);
    }
    return el3.svf(Object.assign({}, a2, { mode: "allpass" }), b2, c, d2);
  }
  function peak(a2, b2, c, d2, e2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svfshelf({ mode: "peak" }, a2, b2, c, d2);
    }
    return el3.svfshelf(Object.assign({}, a2, { mode: "peak" }), b2, c, d2, e2);
  }
  function lowshelf(a2, b2, c, d2, e2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svfshelf({ mode: "lowshelf" }, a2, b2, c, d2);
    }
    return el3.svfshelf(Object.assign({}, a2, { mode: "lowshelf" }), b2, c, d2, e2);
  }
  function highshelf(a2, b2, c, d2, e2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el3.svfshelf({ mode: "highshelf" }, a2, b2, c, d2);
    }
    return el3.svfshelf(Object.assign({}, a2, { mode: "highshelf" }), b2, c, d2, e2);
  }
  function pink(a2, b2) {
    let x2 = typeof a2 === "number" || isNode2(a2) ? a2 : b2;
    let clip = (min3, max3, x22) => el3.min(max3, el3.max(min3, x22));
    return clip(-1, 1, el3.mul(el3.db2gain(-30), el3.add(el3.pole(0.99765, el3.mul(x2, 0.099046)), el3.pole(0.963, el3.mul(x2, 0.2965164)), el3.pole(0.57, el3.mul(x2, 1.0526913)), el3.mul(0.1848, x2))));
  }
  var el4 = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), filters_exports), signals_exports);
  function AdsrComposite({ children }) {
    let [a2, d2, s2, r3, g2] = children;
    let atkSamps = el4.mul(a2, el4.sr());
    let atkGate = el4.le(el4.counter(g2), atkSamps);
    let target = el4.select(g2, el4.select(atkGate, 1, s2), 0);
    let t60 = el4.select(g2, el4.select(atkGate, a2, d2), r3);
    let p2 = el4.tau2pole(el4.div(t60, 6.91));
    return el4.smooth(p2, target);
  }
  function adsr(a2, b2, c, d2, e2, f2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return createNode(AdsrComposite, {}, [a2, b2, c, d2, e2]);
    }
    return createNode(AdsrComposite, a2, [b2, c, d2, e2, f2]);
  }
  var oscillators_exports = {};
  __export(oscillators_exports, {
    blepsaw: () => blepsaw,
    blepsquare: () => blepsquare,
    bleptriangle: () => bleptriangle,
    cycle: () => cycle,
    noise: () => noise,
    pinknoise: () => pinknoise,
    saw: () => saw,
    square: () => square,
    train: () => train,
    triangle: () => triangle
  });
  var el5 = __spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), filters_exports);
  function train(a2, b2) {
    if (typeof a2 === "number" || isNode2(a2)) {
      return el5.le(el5.phasor(a2, 0), 0.5);
    }
    return el5.le(el5.phasor(a2, b2, 0), 0.5);
  }
  function cycle(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? el5.sin(el5.mul(2 * Math.PI, el5.phasor(a2, 0))) : el5.sin(el5.mul(2 * Math.PI, el5.phasor(a2, b2, 0)));
  }
  function saw(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? el5.sub(el5.mul(2, el5.phasor(a2, 0)), 1) : el5.sub(el5.mul(2, el5.phasor(a2, b2, 0)), 1);
  }
  function square(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? el5.sub(el5.mul(2, train(a2)), 1) : el5.sub(el5.mul(2, train(a2, b2)), 1);
  }
  function triangle(a2, b2) {
    return typeof a2 === "number" || isNode2(a2) ? el5.mul(2, el5.sub(0.5, el5.abs(saw(a2)))) : el5.mul(2, el5.sub(0.5, el5.abs(saw(a2, b2))));
  }
  function polyblep(step, phase) {
    let leftgate = el5.le(phase, step);
    let rightgate = el5.ge(phase, el5.sub(1, step));
    let lx = el5.div(phase, step);
    let rx = el5.div(el5.sub(phase, 1), step);
    return el5.add(el5.mul(leftgate, el5.sub(el5.mul(2, lx), el5.mul(lx, lx), 1)), el5.mul(rightgate, el5.add(el5.mul(2, rx), el5.mul(rx, rx), 1)));
  }
  function blepsaw(a2, b2) {
    let hasProps = !(typeof a2 === "number" || isNode2(a2));
    let props = hasProps ? a2 : {};
    let rate = hasProps ? b2 : a2;
    let phase = el5.phasor(props, rate, 0);
    let naive = el5.sub(el5.mul(2, phase), 1);
    let step = el5.div(rate, el5.sr());
    return el5.sub(naive, polyblep(step, phase));
  }
  function blepsquare(a2, b2) {
    let hasProps = !(typeof a2 === "number" || isNode2(a2));
    let props = hasProps ? a2 : {};
    let rate = hasProps ? b2 : a2;
    let phase = el5.phasor(props, rate, 0);
    let trn = el5.le(phase, 0.5);
    let naive = el5.sub(el5.mul(2, trn), 1);
    let step = el5.div(rate, el5.sr());
    let blep1 = polyblep(step, phase);
    let blep2 = polyblep(step, el5.mod(el5.add(phase, 0.5), 1));
    return el5.sub(el5.add(naive, blep1), blep2);
  }
  function bleptriangle(a2, b2) {
    let hasProps = !(typeof a2 === "number" || isNode2(a2));
    let props = hasProps ? a2 : {};
    let rate = hasProps ? b2 : a2;
    let gain = el5.div(el5.mul(4, rate), el5.sr());
    return el5.mul(gain, el5.pole(0.999, blepsquare(props, rate)));
  }
  function noise(a2) {
    if (typeof a2 === "undefined") {
      return el5.sub(el5.mul(2, el5.rand()), 1);
    }
    return el5.sub(el5.mul(2, el5.rand(a2)), 1);
  }
  function pinknoise(a2) {
    if (typeof a2 === "undefined") {
      return el5.pink(noise());
    }
    return el5.pink(noise(a2));
  }
  var stdlib = __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, core_exports), dynamics_exports), envelopes_exports), filters_exports), math_exports), oscillators_exports), signals_exports), {
    "const": constant,
    "in": identity
  });
  var InstructionTypes = {
    CREATE_NODE: 0,
    DELETE_NODE: 1,
    APPEND_CHILD: 2,
    SET_PROPERTY: 3,
    ACTIVATE_ROOTS: 4,
    COMMIT_UPDATES: 5
  };
  var Delegate = class {
    constructor(sampleRate, batchHandler) {
      this.nodesAdded = 0;
      this.nodesRemoved = 0;
      this.edgesAdded = 0;
      this.propsWritten = 0;
      this.nodeMap = /* @__PURE__ */ new Map();
      this.renderContext = {
        sampleRate,
        blockSize: 512,
        numInputs: 1,
        numOutputs: 1
      };
      this.batch = [];
      this.batchHandler = batchHandler;
    }
    getNodeMap() {
      return this.nodeMap;
    }
    getTerminalGeneration() {
      return 4;
    }
    getRenderContext() {
      return this.renderContext;
    }
    createNode(hash, type) {
      this.nodesAdded++;
      this.batch.push([InstructionTypes.CREATE_NODE, hash, type]);
    }
    deleteNode(hash) {
      this.nodesRemoved++;
      this.batch.push([InstructionTypes.DELETE_NODE, hash]);
    }
    appendChild(parentHash, childHash) {
      this.edgesAdded++;
      this.batch.push([InstructionTypes.APPEND_CHILD, parentHash, childHash]);
    }
    setProperty(hash, key, value) {
      this.propsWritten++;
      this.batch.push([InstructionTypes.SET_PROPERTY, hash, key, value]);
    }
    activateRoots(roots) {
      this.batch.push([InstructionTypes.ACTIVATE_ROOTS, roots]);
    }
    commitUpdates() {
      this.batch.push([InstructionTypes.COMMIT_UPDATES]);
      this.batchHandler(this.batch);
      this.batch = [];
    }
  };
  function now() {
    if (typeof performance === "undefined") {
      return Date.now();
    }
    return performance.now();
  }
  var Renderer = class {
    constructor(sampleRate, sendMessage) {
      this._delegate = new Delegate(sampleRate, (batch) => {
        sendMessage(batch);
      });
    }
    render(...args) {
      const t0 = now();
      this._delegate.nodesAdded = 0;
      this._delegate.nodesRemoved = 0;
      this._delegate.edgesAdded = 0;
      this._delegate.propsWritten = 0;
      renderWithDelegate2(this._delegate, args);
      const t1 = now();
      return {
        nodesAdded: this._delegate.nodesAdded,
        edgesAdded: this._delegate.edgesAdded,
        propsWritten: this._delegate.propsWritten,
        elapsedTimeMs: t1 - t0
      };
    }
  };

  // node_modules/react-toastify/dist/react-toastify.esm.mjs
  var import_react = __toESM(require_react(), 1);

  // node_modules/clsx/dist/clsx.m.js
  function r(e2) {
    var t2, f2, n2 = "";
    if ("string" == typeof e2 || "number" == typeof e2)
      n2 += e2;
    else if ("object" == typeof e2)
      if (Array.isArray(e2))
        for (t2 = 0; t2 < e2.length; t2++)
          e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
      else
        for (t2 in e2)
          e2[t2] && (n2 && (n2 += " "), n2 += t2);
    return n2;
  }
  function clsx() {
    for (var e2, t2, f2 = 0, n2 = ""; f2 < arguments.length; )
      (e2 = arguments[f2++]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
    return n2;
  }
  var clsx_m_default = clsx;

  // node_modules/react-toastify/dist/react-toastify.esm.mjs
  var u = (t2) => "number" == typeof t2 && !isNaN(t2);
  var d = (t2) => "string" == typeof t2;
  var p = (t2) => "function" == typeof t2;
  var m = (t2) => d(t2) || p(t2) ? t2 : null;
  var f = (t2) => (0, import_react.isValidElement)(t2) || d(t2) || p(t2) || u(t2);
  function g(t2, e2, n2) {
    void 0 === n2 && (n2 = 300);
    const { scrollHeight: o2, style: s2 } = t2;
    requestAnimationFrame(() => {
      s2.minHeight = "initial", s2.height = o2 + "px", s2.transition = `all ${n2}ms`, requestAnimationFrame(() => {
        s2.height = "0", s2.padding = "0", s2.margin = "0", setTimeout(e2, n2);
      });
    });
  }
  function h(e2) {
    let { enter: a2, exit: r3, appendPosition: i2 = false, collapse: l2 = true, collapseDuration: c = 300 } = e2;
    return function(e3) {
      let { children: u2, position: d2, preventExitTransition: p2, done: m2, nodeRef: f2, isIn: h2 } = e3;
      const y2 = i2 ? `${a2}--${d2}` : a2, v2 = i2 ? `${r3}--${d2}` : r3, T2 = (0, import_react.useRef)(0);
      return (0, import_react.useLayoutEffect)(() => {
        const t2 = f2.current, e4 = y2.split(" "), n2 = (o2) => {
          o2.target === f2.current && (t2.dispatchEvent(new Event("d")), t2.removeEventListener("animationend", n2), t2.removeEventListener("animationcancel", n2), 0 === T2.current && "animationcancel" !== o2.type && t2.classList.remove(...e4));
        };
        t2.classList.add(...e4), t2.addEventListener("animationend", n2), t2.addEventListener("animationcancel", n2);
      }, []), (0, import_react.useEffect)(() => {
        const t2 = f2.current, e4 = () => {
          t2.removeEventListener("animationend", e4), l2 ? g(t2, m2, c) : m2();
        };
        h2 || (p2 ? e4() : (T2.current = 1, t2.className += ` ${v2}`, t2.addEventListener("animationend", e4)));
      }, [h2]), import_react.default.createElement(import_react.default.Fragment, null, u2);
    };
  }
  function y(t2, e2) {
    return null != t2 ? { content: t2.content, containerId: t2.props.containerId, id: t2.props.toastId, theme: t2.props.theme, type: t2.props.type, data: t2.props.data || {}, isLoading: t2.props.isLoading, icon: t2.props.icon, status: e2 } : {};
  }
  var v = { list: /* @__PURE__ */ new Map(), emitQueue: /* @__PURE__ */ new Map(), on(t2, e2) {
    return this.list.has(t2) || this.list.set(t2, []), this.list.get(t2).push(e2), this;
  }, off(t2, e2) {
    if (e2) {
      const n2 = this.list.get(t2).filter((t3) => t3 !== e2);
      return this.list.set(t2, n2), this;
    }
    return this.list.delete(t2), this;
  }, cancelEmit(t2) {
    const e2 = this.emitQueue.get(t2);
    return e2 && (e2.forEach(clearTimeout), this.emitQueue.delete(t2)), this;
  }, emit(t2) {
    this.list.has(t2) && this.list.get(t2).forEach((e2) => {
      const n2 = setTimeout(() => {
        e2(...[].slice.call(arguments, 1));
      }, 0);
      this.emitQueue.has(t2) || this.emitQueue.set(t2, []), this.emitQueue.get(t2).push(n2);
    });
  } };
  var T = (e2) => {
    let { theme: n2, type: o2, ...s2 } = e2;
    return import_react.default.createElement("svg", { viewBox: "0 0 24 24", width: "100%", height: "100%", fill: "colored" === n2 ? "currentColor" : `var(--toastify-icon-color-${o2})`, ...s2 });
  };
  var E = { info: function(e2) {
    return import_react.default.createElement(T, { ...e2 }, import_react.default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z" }));
  }, warning: function(e2) {
    return import_react.default.createElement(T, { ...e2 }, import_react.default.createElement("path", { d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" }));
  }, success: function(e2) {
    return import_react.default.createElement(T, { ...e2 }, import_react.default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" }));
  }, error: function(e2) {
    return import_react.default.createElement(T, { ...e2 }, import_react.default.createElement("path", { d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" }));
  }, spinner: function() {
    return import_react.default.createElement("div", { className: "Toastify__spinner" });
  } };
  function C(t2) {
    const [, o2] = (0, import_react.useReducer)((t3) => t3 + 1, 0), [l2, c] = (0, import_react.useState)([]), g2 = (0, import_react.useRef)(null), h2 = (0, import_react.useRef)(/* @__PURE__ */ new Map()).current, T2 = (t3) => -1 !== l2.indexOf(t3), C2 = (0, import_react.useRef)({ toastKey: 1, displayedToast: 0, count: 0, queue: [], props: t2, containerId: null, isToastActive: T2, getToast: (t3) => h2.get(t3) }).current;
    function b2(t3) {
      let { containerId: e2 } = t3;
      const { limit: n2 } = C2.props;
      !n2 || e2 && C2.containerId !== e2 || (C2.count -= C2.queue.length, C2.queue = []);
    }
    function I2(t3) {
      c((e2) => null == t3 ? [] : e2.filter((e3) => e3 !== t3));
    }
    function _9() {
      const { toastContent: t3, toastProps: e2, staleId: n2 } = C2.queue.shift();
      O2(t3, e2, n2);
    }
    function L2(t3, n2) {
      let { delay: s2, staleId: r3, ...i2 } = n2;
      if (!f(t3) || function(t4) {
        return !g2.current || C2.props.enableMultiContainer && t4.containerId !== C2.props.containerId || h2.has(t4.toastId) && null == t4.updateId;
      }(i2))
        return;
      const { toastId: l3, updateId: c2, data: T3 } = i2, { props: b3 } = C2, L3 = () => I2(l3), N2 = null == c2;
      N2 && C2.count++;
      const M2 = { ...b3, style: b3.toastStyle, key: C2.toastKey++, ...Object.fromEntries(Object.entries(i2).filter((t4) => {
        let [e2, n3] = t4;
        return null != n3;
      })), toastId: l3, updateId: c2, data: T3, closeToast: L3, isIn: false, className: m(i2.className || b3.toastClassName), bodyClassName: m(i2.bodyClassName || b3.bodyClassName), progressClassName: m(i2.progressClassName || b3.progressClassName), autoClose: !i2.isLoading && (R2 = i2.autoClose, w2 = b3.autoClose, false === R2 || u(R2) && R2 > 0 ? R2 : w2), deleteToast() {
        const t4 = y(h2.get(l3), "removed");
        h2.delete(l3), v.emit(4, t4);
        const e2 = C2.queue.length;
        if (C2.count = null == l3 ? C2.count - C2.displayedToast : C2.count - 1, C2.count < 0 && (C2.count = 0), e2 > 0) {
          const t5 = null == l3 ? C2.props.limit : 1;
          if (1 === e2 || 1 === t5)
            C2.displayedToast++, _9();
          else {
            const n3 = t5 > e2 ? e2 : t5;
            C2.displayedToast = n3;
            for (let t6 = 0; t6 < n3; t6++)
              _9();
          }
        } else
          o2();
      } };
      var R2, w2;
      M2.iconOut = function(t4) {
        let { theme: n3, type: o3, isLoading: s3, icon: r4 } = t4, i3 = null;
        const l4 = { theme: n3, type: o3 };
        return false === r4 || (p(r4) ? i3 = r4(l4) : (0, import_react.isValidElement)(r4) ? i3 = (0, import_react.cloneElement)(r4, l4) : d(r4) || u(r4) ? i3 = r4 : s3 ? i3 = E.spinner() : ((t5) => t5 in E)(o3) && (i3 = E[o3](l4))), i3;
      }(M2), p(i2.onOpen) && (M2.onOpen = i2.onOpen), p(i2.onClose) && (M2.onClose = i2.onClose), M2.closeButton = b3.closeButton, false === i2.closeButton || f(i2.closeButton) ? M2.closeButton = i2.closeButton : true === i2.closeButton && (M2.closeButton = !f(b3.closeButton) || b3.closeButton);
      let x2 = t3;
      (0, import_react.isValidElement)(t3) && !d(t3.type) ? x2 = (0, import_react.cloneElement)(t3, { closeToast: L3, toastProps: M2, data: T3 }) : p(t3) && (x2 = t3({ closeToast: L3, toastProps: M2, data: T3 })), b3.limit && b3.limit > 0 && C2.count > b3.limit && N2 ? C2.queue.push({ toastContent: x2, toastProps: M2, staleId: r3 }) : u(s2) ? setTimeout(() => {
        O2(x2, M2, r3);
      }, s2) : O2(x2, M2, r3);
    }
    function O2(t3, e2, n2) {
      const { toastId: o3 } = e2;
      n2 && h2.delete(n2);
      const s2 = { content: t3, props: e2 };
      h2.set(o3, s2), c((t4) => [...t4, o3].filter((t5) => t5 !== n2)), v.emit(4, y(s2, null == s2.props.updateId ? "added" : "updated"));
    }
    return (0, import_react.useEffect)(() => (C2.containerId = t2.containerId, v.cancelEmit(3).on(0, L2).on(1, (t3) => g2.current && I2(t3)).on(5, b2).emit(2, C2), () => {
      h2.clear(), v.emit(3, C2);
    }), []), (0, import_react.useEffect)(() => {
      C2.props = t2, C2.isToastActive = T2, C2.displayedToast = l2.length;
    }), { getToastToRender: function(e2) {
      const n2 = /* @__PURE__ */ new Map(), o3 = Array.from(h2.values());
      return t2.newestOnTop && o3.reverse(), o3.forEach((t3) => {
        const { position: e3 } = t3.props;
        n2.has(e3) || n2.set(e3, []), n2.get(e3).push(t3);
      }), Array.from(n2, (t3) => e2(t3[0], t3[1]));
    }, containerRef: g2, isToastActive: T2 };
  }
  function b(t2) {
    return t2.targetTouches && t2.targetTouches.length >= 1 ? t2.targetTouches[0].clientX : t2.clientX;
  }
  function I(t2) {
    return t2.targetTouches && t2.targetTouches.length >= 1 ? t2.targetTouches[0].clientY : t2.clientY;
  }
  function _(t2) {
    const [o2, a2] = (0, import_react.useState)(false), [r3, l2] = (0, import_react.useState)(false), c = (0, import_react.useRef)(null), u2 = (0, import_react.useRef)({ start: 0, x: 0, y: 0, delta: 0, removalDistance: 0, canCloseOnClick: true, canDrag: false, boundingRect: null, didMove: false }).current, d2 = (0, import_react.useRef)(t2), { autoClose: m2, pauseOnHover: f2, closeToast: g2, onClick: h2, closeOnClick: y2 } = t2;
    function v2(e2) {
      if (t2.draggable) {
        "touchstart" === e2.nativeEvent.type && e2.nativeEvent.preventDefault(), u2.didMove = false, document.addEventListener("mousemove", _9), document.addEventListener("mouseup", L2), document.addEventListener("touchmove", _9), document.addEventListener("touchend", L2);
        const n2 = c.current;
        u2.canCloseOnClick = true, u2.canDrag = true, u2.boundingRect = n2.getBoundingClientRect(), n2.style.transition = "", u2.x = b(e2.nativeEvent), u2.y = I(e2.nativeEvent), "x" === t2.draggableDirection ? (u2.start = u2.x, u2.removalDistance = n2.offsetWidth * (t2.draggablePercent / 100)) : (u2.start = u2.y, u2.removalDistance = n2.offsetHeight * (80 === t2.draggablePercent ? 1.5 * t2.draggablePercent : t2.draggablePercent / 100));
      }
    }
    function T2(e2) {
      if (u2.boundingRect) {
        const { top: n2, bottom: o3, left: s2, right: a3 } = u2.boundingRect;
        "touchend" !== e2.nativeEvent.type && t2.pauseOnHover && u2.x >= s2 && u2.x <= a3 && u2.y >= n2 && u2.y <= o3 ? C2() : E2();
      }
    }
    function E2() {
      a2(true);
    }
    function C2() {
      a2(false);
    }
    function _9(e2) {
      const n2 = c.current;
      u2.canDrag && n2 && (u2.didMove = true, o2 && C2(), u2.x = b(e2), u2.y = I(e2), u2.delta = "x" === t2.draggableDirection ? u2.x - u2.start : u2.y - u2.start, u2.start !== u2.x && (u2.canCloseOnClick = false), n2.style.transform = `translate${t2.draggableDirection}(${u2.delta}px)`, n2.style.opacity = "" + (1 - Math.abs(u2.delta / u2.removalDistance)));
    }
    function L2() {
      document.removeEventListener("mousemove", _9), document.removeEventListener("mouseup", L2), document.removeEventListener("touchmove", _9), document.removeEventListener("touchend", L2);
      const e2 = c.current;
      if (u2.canDrag && u2.didMove && e2) {
        if (u2.canDrag = false, Math.abs(u2.delta) > u2.removalDistance)
          return l2(true), void t2.closeToast();
        e2.style.transition = "transform 0.2s, opacity 0.2s", e2.style.transform = `translate${t2.draggableDirection}(0)`, e2.style.opacity = "1";
      }
    }
    (0, import_react.useEffect)(() => {
      d2.current = t2;
    }), (0, import_react.useEffect)(() => (c.current && c.current.addEventListener("d", E2, { once: true }), p(t2.onOpen) && t2.onOpen((0, import_react.isValidElement)(t2.children) && t2.children.props), () => {
      const t3 = d2.current;
      p(t3.onClose) && t3.onClose((0, import_react.isValidElement)(t3.children) && t3.children.props);
    }), []), (0, import_react.useEffect)(() => (t2.pauseOnFocusLoss && (document.hasFocus() || C2(), window.addEventListener("focus", E2), window.addEventListener("blur", C2)), () => {
      t2.pauseOnFocusLoss && (window.removeEventListener("focus", E2), window.removeEventListener("blur", C2));
    }), [t2.pauseOnFocusLoss]);
    const O2 = { onMouseDown: v2, onTouchStart: v2, onMouseUp: T2, onTouchEnd: T2 };
    return m2 && f2 && (O2.onMouseEnter = C2, O2.onMouseLeave = E2), y2 && (O2.onClick = (t3) => {
      h2 && h2(t3), u2.canCloseOnClick && g2();
    }), { playToast: E2, pauseToast: C2, isRunning: o2, preventExitTransition: r3, toastRef: c, eventHandlers: O2 };
  }
  function L(e2) {
    let { closeToast: n2, theme: o2, ariaLabel: s2 = "close" } = e2;
    return import_react.default.createElement("button", { className: `Toastify__close-button Toastify__close-button--${o2}`, type: "button", onClick: (t2) => {
      t2.stopPropagation(), n2(t2);
    }, "aria-label": s2 }, import_react.default.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 14 16" }, import_react.default.createElement("path", { fillRule: "evenodd", d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" })));
  }
  function O(e2) {
    let { delay: n2, isRunning: o2, closeToast: s2, type: a2 = "default", hide: r3, className: i2, style: l2, controlledProgress: u2, progress: d2, rtl: m2, isIn: f2, theme: g2 } = e2;
    const h2 = r3 || u2 && 0 === d2, y2 = { ...l2, animationDuration: `${n2}ms`, animationPlayState: o2 ? "running" : "paused", opacity: h2 ? 0 : 1 };
    u2 && (y2.transform = `scaleX(${d2})`);
    const v2 = clsx_m_default("Toastify__progress-bar", u2 ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g2}`, `Toastify__progress-bar--${a2}`, { "Toastify__progress-bar--rtl": m2 }), T2 = p(i2) ? i2({ rtl: m2, type: a2, defaultClassName: v2 }) : clsx_m_default(v2, i2);
    return import_react.default.createElement("div", { role: "progressbar", "aria-hidden": h2 ? "true" : "false", "aria-label": "notification timer", className: T2, style: y2, [u2 && d2 >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: u2 && d2 < 1 ? null : () => {
      f2 && s2();
    } });
  }
  var N = (n2) => {
    const { isRunning: o2, preventExitTransition: s2, toastRef: r3, eventHandlers: i2 } = _(n2), { closeButton: l2, children: u2, autoClose: d2, onClick: m2, type: f2, hideProgressBar: g2, closeToast: h2, transition: y2, position: v2, className: T2, style: E2, bodyClassName: C2, bodyStyle: b2, progressClassName: I2, progressStyle: N2, updateId: M2, role: R2, progress: w2, rtl: x2, toastId: $2, deleteToast: k2, isIn: P2, isLoading: B2, iconOut: D2, closeOnClick: A2, theme: z3 } = n2, F2 = clsx_m_default("Toastify__toast", `Toastify__toast-theme--${z3}`, `Toastify__toast--${f2}`, { "Toastify__toast--rtl": x2 }, { "Toastify__toast--close-on-click": A2 }), H2 = p(T2) ? T2({ rtl: x2, position: v2, type: f2, defaultClassName: F2 }) : clsx_m_default(F2, T2), S2 = !!w2 || !d2, q2 = { closeToast: h2, type: f2, theme: z3 };
    let Q2 = null;
    return false === l2 || (Q2 = p(l2) ? l2(q2) : (0, import_react.isValidElement)(l2) ? (0, import_react.cloneElement)(l2, q2) : L(q2)), import_react.default.createElement(y2, { isIn: P2, done: k2, position: v2, preventExitTransition: s2, nodeRef: r3 }, import_react.default.createElement("div", { id: $2, onClick: m2, className: H2, ...i2, style: E2, ref: r3 }, import_react.default.createElement("div", { ...P2 && { role: R2 }, className: p(C2) ? C2({ type: f2 }) : clsx_m_default("Toastify__toast-body", C2), style: b2 }, null != D2 && import_react.default.createElement("div", { className: clsx_m_default("Toastify__toast-icon", { "Toastify--animate-icon Toastify__zoom-enter": !B2 }) }, D2), import_react.default.createElement("div", null, u2)), Q2, import_react.default.createElement(O, { ...M2 && !S2 ? { key: `pb-${M2}` } : {}, rtl: x2, theme: z3, delay: d2, isRunning: o2, isIn: P2, closeToast: h2, hide: g2, type: f2, style: N2, className: I2, controlledProgress: S2, progress: w2 || 0 })));
  };
  var M = function(t2, e2) {
    return void 0 === e2 && (e2 = false), { enter: `Toastify--animate Toastify__${t2}-enter`, exit: `Toastify--animate Toastify__${t2}-exit`, appendPosition: e2 };
  };
  var R = h(M("bounce", true));
  var w = h(M("slide", true));
  var x = h(M("zoom"));
  var $ = h(M("flip"));
  var k = (0, import_react.forwardRef)((e2, n2) => {
    const { getToastToRender: o2, containerRef: a2, isToastActive: r3 } = C(e2), { className: i2, style: l2, rtl: u2, containerId: d2 } = e2;
    function f2(t2) {
      const e3 = clsx_m_default("Toastify__toast-container", `Toastify__toast-container--${t2}`, { "Toastify__toast-container--rtl": u2 });
      return p(i2) ? i2({ position: t2, rtl: u2, defaultClassName: e3 }) : clsx_m_default(e3, m(i2));
    }
    return (0, import_react.useEffect)(() => {
      n2 && (n2.current = a2.current);
    }, []), import_react.default.createElement("div", { ref: a2, className: "Toastify", id: d2 }, o2((e3, n3) => {
      const o3 = n3.length ? { ...l2 } : { ...l2, pointerEvents: "none" };
      return import_react.default.createElement("div", { className: f2(e3), style: o3, key: `container-${e3}` }, n3.map((e4, o4) => {
        let { content: s2, props: a3 } = e4;
        return import_react.default.createElement(N, { ...a3, isIn: r3(a3.toastId), style: { ...a3.style, "--nth": o4 + 1, "--len": n3.length }, key: `toast-${a3.key}` }, s2);
      }));
    }));
  });
  k.displayName = "ToastContainer", k.defaultProps = { position: "top-right", transition: R, autoClose: 5e3, closeButton: L, pauseOnHover: true, pauseOnFocusLoss: true, closeOnClick: true, draggable: true, draggablePercent: 80, draggableDirection: "x", role: "alert", theme: "light" };
  var P;
  var B = /* @__PURE__ */ new Map();
  var D = [];
  var A = 1;
  function z2() {
    return "" + A++;
  }
  function F(t2) {
    return t2 && (d(t2.toastId) || u(t2.toastId)) ? t2.toastId : z2();
  }
  function H(t2, e2) {
    return B.size > 0 ? v.emit(0, t2, e2) : D.push({ content: t2, options: e2 }), e2.toastId;
  }
  function S(t2, e2) {
    return { ...e2, type: e2 && e2.type || t2, toastId: F(e2) };
  }
  function q(t2) {
    return (e2, n2) => H(e2, S(t2, n2));
  }
  function Q(t2, e2) {
    return H(t2, S("default", e2));
  }
  Q.loading = (t2, e2) => H(t2, S("default", { isLoading: true, autoClose: false, closeOnClick: false, closeButton: false, draggable: false, ...e2 })), Q.promise = function(t2, e2, n2) {
    let o2, { pending: s2, error: a2, success: r3 } = e2;
    s2 && (o2 = d(s2) ? Q.loading(s2, n2) : Q.loading(s2.render, { ...n2, ...s2 }));
    const i2 = { isLoading: null, autoClose: null, closeOnClick: null, closeButton: null, draggable: null }, l2 = (t3, e3, s3) => {
      if (null == e3)
        return void Q.dismiss(o2);
      const a3 = { type: t3, ...i2, ...n2, data: s3 }, r4 = d(e3) ? { render: e3 } : e3;
      return o2 ? Q.update(o2, { ...a3, ...r4 }) : Q(r4.render, { ...a3, ...r4 }), s3;
    }, c = p(t2) ? t2() : t2;
    return c.then((t3) => l2("success", r3, t3)).catch((t3) => l2("error", a2, t3)), c;
  }, Q.success = q("success"), Q.info = q("info"), Q.error = q("error"), Q.warning = q("warning"), Q.warn = Q.warning, Q.dark = (t2, e2) => H(t2, S("default", { theme: "dark", ...e2 })), Q.dismiss = (t2) => {
    B.size > 0 ? v.emit(1, t2) : D = D.filter((e2) => null != t2 && e2.options.toastId !== t2);
  }, Q.clearWaitingQueue = function(t2) {
    return void 0 === t2 && (t2 = {}), v.emit(5, t2);
  }, Q.isActive = (t2) => {
    let e2 = false;
    return B.forEach((n2) => {
      n2.isToastActive && n2.isToastActive(t2) && (e2 = true);
    }), e2;
  }, Q.update = function(t2, e2) {
    void 0 === e2 && (e2 = {}), setTimeout(() => {
      const n2 = function(t3, e3) {
        let { containerId: n3 } = e3;
        const o2 = B.get(n3 || P);
        return o2 && o2.getToast(t3);
      }(t2, e2);
      if (n2) {
        const { props: o2, content: s2 } = n2, a2 = { delay: 100, ...o2, ...e2, toastId: e2.toastId || t2, updateId: z2() };
        a2.toastId !== t2 && (a2.staleId = t2);
        const r3 = a2.render || s2;
        delete a2.render, H(r3, a2);
      }
    }, 0);
  }, Q.done = (t2) => {
    Q.update(t2, { progress: 1 });
  }, Q.onChange = (t2) => (v.on(4, t2), () => {
    v.off(4, t2);
  }), Q.POSITION = { TOP_LEFT: "top-left", TOP_RIGHT: "top-right", TOP_CENTER: "top-center", BOTTOM_LEFT: "bottom-left", BOTTOM_RIGHT: "bottom-right", BOTTOM_CENTER: "bottom-center" }, Q.TYPE = { INFO: "info", SUCCESS: "success", WARNING: "warning", ERROR: "error", DEFAULT: "default" }, v.on(2, (t2) => {
    P = t2.containerId || t2, B.set(P, t2), D.forEach((t3) => {
      v.emit(0, t3.content, t3.options);
    }), D = [];
  }).on(3, (t2) => {
    B.delete(t2.containerId || t2), 0 === B.size && v.off(0).off(1).off(5);
  });

  // dsp/main.js
  var core = new Renderer(__getSampleRate__(), (batch) => {
    __postNativeMessage__(JSON.stringify(batch));
  });
  function chorus(props, xn) {
    let rate = stdlib.sm(stdlib.const({ key: "rate", value: 1e-3 + props.rate }));
    let depth = stdlib.sm(stdlib.const({ key: "depth", value: 10 + 20 * props.depth }));
    let sr2 = __getSampleRate__();
    let wet = stdlib.delay(
      { size: sr2 * 100 / 1e3 },
      stdlib.ms2samps(stdlib.add(20, stdlib.mul(depth, 0.5), stdlib.mul(0.5, depth, stdlib.triangle(rate)))),
      0,
      xn
    );
    return stdlib.mul(Math.sqrt(2) / 2, stdlib.add(xn, wet));
  }
  globalThis.__receiveStateChange__ = (state) => {
    const props = JSON.parse(state);
    let stats = core.render(
      chorus(props, stdlib.in({ channel: 0 })),
      chorus(props, stdlib.in({ channel: 1 }))
    );
    console.log(stats);
  };
  globalThis.__receiveError__ = (err) => {
    console.log(`[Error: ${err.name}] ${err.message}`);
  };
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
