webpackJsonp([ 3 ], {
    LMZF: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(global) {
            function makeDecorator(name, props, parentClass, chainFn) {
                function DecoratorFactory(objOrType) {
                    if (this instanceof DecoratorFactory) return metaCtor.call(this, objOrType), this;
                    var annotationInstance = new DecoratorFactory(objOrType), TypeDecorator = function TypeDecorator(cls) {
                        return (cls.hasOwnProperty(ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, {
                            value: []
                        })[ANNOTATIONS]).push(annotationInstance), cls;
                    };
                    return chainFn && chainFn(TypeDecorator), TypeDecorator;
                }
                var metaCtor = makeMetadataCtor(props);
                return parentClass && (DecoratorFactory.prototype = Object.create(parentClass.prototype)), 
                DecoratorFactory.prototype.ngMetadataName = name, DecoratorFactory.annotationCls = DecoratorFactory, 
                DecoratorFactory;
            }
            function makeMetadataCtor(props) {
                return function ctor() {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    if (props) {
                        var values = props.apply(void 0, args);
                        for (var propName in values) this[propName] = values[propName];
                    }
                };
            }
            function makeParamDecorator(name, props, parentClass) {
                function ParamDecoratorFactory() {
                    function ParamDecorator(cls, unusedKey, index) {
                        for (var parameters = cls.hasOwnProperty(PARAMETERS) ? cls[PARAMETERS] : Object.defineProperty(cls, PARAMETERS, {
                            value: []
                        })[PARAMETERS]; parameters.length <= index; ) parameters.push(null);
                        return (parameters[index] = parameters[index] || []).push(annotationInstance), cls;
                    }
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    if (this instanceof ParamDecoratorFactory) return metaCtor.apply(this, args), this;
                    var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, [ void 0 ].concat(args)))();
                    return ParamDecorator.annotation = annotationInstance, ParamDecorator;
                    var _a;
                }
                var metaCtor = makeMetadataCtor(props);
                return parentClass && (ParamDecoratorFactory.prototype = Object.create(parentClass.prototype)), 
                ParamDecoratorFactory.prototype.ngMetadataName = name, ParamDecoratorFactory.annotationCls = ParamDecoratorFactory, 
                ParamDecoratorFactory;
            }
            function makePropDecorator(name, props, parentClass) {
                function PropDecoratorFactory() {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    if (this instanceof PropDecoratorFactory) return metaCtor.apply(this, args), this;
                    var decoratorInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, [ void 0 ].concat(args)))();
                    return function PropDecorator(target, name) {
                        var constructor = target.constructor, meta = constructor.hasOwnProperty(PROP_METADATA) ? constructor[PROP_METADATA] : Object.defineProperty(constructor, PROP_METADATA, {
                            value: {}
                        })[PROP_METADATA];
                        meta[name] = meta.hasOwnProperty(name) && meta[name] || [], meta[name].unshift(decoratorInstance);
                    };
                    var _a;
                }
                var metaCtor = makeMetadataCtor(props);
                return parentClass && (PropDecoratorFactory.prototype = Object.create(parentClass.prototype)), 
                PropDecoratorFactory.prototype.ngMetadataName = name, PropDecoratorFactory.annotationCls = PropDecoratorFactory, 
                PropDecoratorFactory;
            }
            function getSymbolIterator() {
                if (!_symbolIterator) {
                    var Symbol_1 = _global.Symbol;
                    if (Symbol_1 && Symbol_1.iterator) _symbolIterator = Symbol_1.iterator; else for (var keys = Object.getOwnPropertyNames(Map.prototype), i = 0; i < keys.length; ++i) {
                        var key = keys[i];
                        "entries" !== key && "size" !== key && Map.prototype[key] === Map.prototype.entries && (_symbolIterator = key);
                    }
                }
                return _symbolIterator;
            }
            function scheduleMicroTask(fn) {
                Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
            }
            function looseIdentical(a, b) {
                return a === b || "number" == typeof a && "number" == typeof b && isNaN(a) && isNaN(b);
            }
            function stringify(token) {
                if ("string" == typeof token) return token;
                if (token instanceof Array) return "[" + token.map(stringify).join(", ") + "]";
                if (null == token) return "" + token;
                if (token.overriddenName) return "" + token.overriddenName;
                if (token.name) return "" + token.name;
                var res = token.toString();
                if (null == res) return "" + res;
                var newLineIndex = res.indexOf("\n");
                return -1 === newLineIndex ? res : res.substring(0, newLineIndex);
            }
            function forwardRef(forwardRefFn) {
                return forwardRefFn.__forward_ref__ = forwardRef, forwardRefFn.toString = function() {
                    return stringify(this());
                }, forwardRefFn;
            }
            function resolveForwardRef(type) {
                return "function" == typeof type && type.hasOwnProperty("__forward_ref__") && type.__forward_ref__ === forwardRef ? type() : type;
            }
            function resolveProvider(provider) {
                var deps = function computeDeps(provider) {
                    var deps = EMPTY, providerDeps = provider.deps;
                    if (providerDeps && providerDeps.length) {
                        deps = [];
                        for (var i = 0; i < providerDeps.length; i++) {
                            var options = 6, token = resolveForwardRef(providerDeps[i]);
                            if (token instanceof Array) for (var j = 0, annotations = token; j < annotations.length; j++) {
                                var annotation = annotations[j];
                                annotation instanceof Optional || annotation == Optional ? options |= 1 : annotation instanceof SkipSelf || annotation == SkipSelf ? options &= -3 : annotation instanceof Self || annotation == Self ? options &= -5 : token = annotation instanceof Inject ? annotation.token : resolveForwardRef(annotation);
                            }
                            deps.push({
                                token: token,
                                options: options
                            });
                        }
                    } else if (provider.useExisting) {
                        var token = resolveForwardRef(provider.useExisting);
                        deps = [ {
                            token: token,
                            options: 6
                        } ];
                    } else if (!(providerDeps || USE_VALUE in provider)) throw staticError("'deps' required", provider);
                    return deps;
                }(provider), fn = IDENT, value = EMPTY, useNew = !1, provide = resolveForwardRef(provider.provide);
                if (USE_VALUE in provider) value = provider.useValue; else if (provider.useFactory) fn = provider.useFactory; else if (provider.useExisting) ; else if (provider.useClass) useNew = !0, 
                fn = resolveForwardRef(provider.useClass); else {
                    if ("function" != typeof provide) throw staticError("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", provider);
                    useNew = !0, fn = provide;
                }
                return {
                    deps: deps,
                    fn: fn,
                    useNew: useNew,
                    value: value
                };
            }
            function multiProviderMixError(token) {
                return staticError("Cannot mix multi providers and regular providers", token);
            }
            function recursivelyProcessProviders(records, provider) {
                if (provider) if ((provider = resolveForwardRef(provider)) instanceof Array) for (var i = 0; i < provider.length; i++) recursivelyProcessProviders(records, provider[i]); else {
                    if ("function" == typeof provider) throw staticError("Function/Class not supported", provider);
                    if (!provider || "object" != typeof provider || !provider.provide) throw staticError("Unexpected provider", provider);
                    var token = resolveForwardRef(provider.provide), resolvedProvider = resolveProvider(provider);
                    if (!0 === provider.multi) {
                        var multiProvider = records.get(token);
                        if (multiProvider) {
                            if (multiProvider.fn !== MULTI_PROVIDER_FN) throw multiProviderMixError(token);
                        } else records.set(token, multiProvider = {
                            token: provider.provide,
                            deps: [],
                            useNew: !1,
                            fn: MULTI_PROVIDER_FN,
                            value: EMPTY
                        });
                        token = provider, multiProvider.deps.push({
                            token: token,
                            options: 6
                        });
                    }
                    var record = records.get(token);
                    if (record && record.fn == MULTI_PROVIDER_FN) throw multiProviderMixError(token);
                    records.set(token, resolvedProvider);
                }
            }
            function tryResolveToken(token, record, records, parent, notFoundValue) {
                try {
                    return function resolveToken(token, record, records, parent, notFoundValue) {
                        var value;
                        if (record) {
                            if ((value = record.value) == CIRCULAR) throw Error(NO_NEW_LINE + "Circular dependency");
                            if (value === EMPTY) {
                                record.value = CIRCULAR;
                                var obj = void 0, useNew = record.useNew, fn = record.fn, depRecords = record.deps, deps = EMPTY;
                                if (depRecords.length) {
                                    deps = [];
                                    for (var i = 0; i < depRecords.length; i++) {
                                        var depRecord = depRecords[i], options = depRecord.options, childRecord = 2 & options ? records.get(depRecord.token) : void 0;
                                        deps.push(tryResolveToken(depRecord.token, childRecord, records, childRecord || 4 & options ? parent : NULL_INJECTOR, 1 & options ? null : Injector.THROW_IF_NOT_FOUND));
                                    }
                                }
                                record.value = value = useNew ? new ((_a = fn).bind.apply(_a, [ void 0 ].concat(deps)))() : fn.apply(obj, deps);
                            }
                        } else value = parent.get(token, notFoundValue);
                        return value;
                        var _a;
                    }(token, record, records, parent, notFoundValue);
                } catch (e) {
                    e instanceof Error || (e = new Error(e));
                    throw (e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || []).unshift(token), record && record.value == CIRCULAR && (record.value = EMPTY), 
                    e;
                }
            }
            function formatError(text, obj) {
                text = text && "\n" === text.charAt(0) && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
                var context = stringify(obj);
                if (obj instanceof Array) context = obj.map(stringify).join(" -> "); else if ("object" == typeof obj) {
                    var parts = [];
                    for (var key in obj) if (obj.hasOwnProperty(key)) {
                        var value = obj[key];
                        parts.push(key + ":" + ("string" == typeof value ? JSON.stringify(value) : stringify(value)));
                    }
                    context = "{" + parts.join(", ") + "}";
                }
                return "StaticInjectorError[" + context + "]: " + text.replace(NEW_LINE, "\n  ");
            }
            function staticError(text, obj) {
                return new Error(formatError(text, obj));
            }
            function getDebugContext(error) {
                return error[ERROR_DEBUG_CONTEXT];
            }
            function getOriginalError(error) {
                return error[ERROR_ORIGINAL_ERROR];
            }
            function defaultErrorLogger(console) {
                for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
                console.error.apply(console, values);
            }
            function constructResolvingPath(keys) {
                if (keys.length > 1) {
                    return " (" + function findFirstClosedCycle(keys) {
                        for (var res = [], i = 0; i < keys.length; ++i) {
                            if (res.indexOf(keys[i]) > -1) return res.push(keys[i]), res;
                            res.push(keys[i]);
                        }
                        return res;
                    }(keys.slice().reverse()).map(function(k) {
                        return stringify(k.token);
                    }).join(" -> ") + ")";
                }
                return "";
            }
            function injectionError(injector, key, constructResolvingMessage, originalError) {
                var keys = [ key ], errMsg = constructResolvingMessage(keys), error = originalError ? function wrappedError(message, originalError) {
                    var msg = message + " caused by: " + (originalError instanceof Error ? originalError.message : originalError), error = Error(msg);
                    return error[ERROR_ORIGINAL_ERROR] = originalError, error;
                }(errMsg, originalError) : Error(errMsg);
                return error.addKey = addKey, error.keys = keys, error.injectors = [ injector ], 
                error.constructResolvingMessage = constructResolvingMessage, error[ERROR_ORIGINAL_ERROR] = originalError, 
                error;
            }
            function addKey(injector, key) {
                this.injectors.push(injector), this.keys.push(key), this.message = this.constructResolvingMessage(this.keys);
            }
            function noAnnotationError(typeOrFunc, params) {
                for (var signature = [], i = 0, ii = params.length; i < ii; i++) {
                    var parameter = params[i];
                    parameter && 0 != parameter.length ? signature.push(parameter.map(stringify).join(" ")) : signature.push("?");
                }
                return Error("Cannot resolve all parameters for '" + stringify(typeOrFunc) + "'(" + signature.join(", ") + "). Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" + stringify(typeOrFunc) + "' is decorated with Injectable.");
            }
            function isType(v) {
                return "function" == typeof v;
            }
            function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
                return decoratorInvocations ? decoratorInvocations.map(function(decoratorInvocation) {
                    var annotationCls = decoratorInvocation.type.annotationCls, annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
                    return new (annotationCls.bind.apply(annotationCls, [ void 0 ].concat(annotationArgs)))();
                }) : [];
            }
            function getParentCtor(ctor) {
                var parentProto = Object.getPrototypeOf(ctor.prototype);
                return (parentProto ? parentProto.constructor : null) || Object;
            }
            function resolveReflectiveFactory(provider) {
                var factoryFn, resolvedDeps;
                if (provider.useClass) {
                    var useClass = resolveForwardRef(provider.useClass);
                    factoryFn = reflector.factory(useClass), resolvedDeps = _dependenciesFor(useClass);
                } else provider.useExisting ? (factoryFn = function(aliasInstance) {
                    return aliasInstance;
                }, resolvedDeps = [ ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting)) ]) : provider.useFactory ? (factoryFn = provider.useFactory, 
                resolvedDeps = function constructDependencies(typeOrFunc, dependencies) {
                    if (dependencies) {
                        var params_1 = dependencies.map(function(t) {
                            return [ t ];
                        });
                        return dependencies.map(function(t) {
                            return _extractToken(typeOrFunc, t, params_1);
                        });
                    }
                    return _dependenciesFor(typeOrFunc);
                }(provider.useFactory, provider.deps)) : (factoryFn = function() {
                    return provider.useValue;
                }, resolvedDeps = _EMPTY_LIST);
                return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
            }
            function resolveReflectiveProvider(provider) {
                return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [ resolveReflectiveFactory(provider) ], provider.multi || !1);
            }
            function resolveReflectiveProviders(providers) {
                var resolvedProviderMap = function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
                    for (var i = 0; i < providers.length; i++) {
                        var provider = providers[i], existing = normalizedProvidersMap.get(provider.key.id);
                        if (existing) {
                            if (provider.multiProvider !== existing.multiProvider) throw Error("Cannot mix multi providers and regular providers, got: " + existing + " " + provider);
                            if (provider.multiProvider) for (var j = 0; j < provider.resolvedFactories.length; j++) existing.resolvedFactories.push(provider.resolvedFactories[j]); else normalizedProvidersMap.set(provider.key.id, provider);
                        } else {
                            var resolvedProvider = void 0;
                            resolvedProvider = provider.multiProvider ? new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider) : provider, 
                            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
                        }
                    }
                    return normalizedProvidersMap;
                }(_normalizeProviders(providers, []).map(resolveReflectiveProvider), new Map());
                return Array.from(resolvedProviderMap.values());
            }
            function _normalizeProviders(providers, res) {
                return providers.forEach(function(b) {
                    if (b instanceof Type) res.push({
                        provide: b,
                        useClass: b
                    }); else if (b && "object" == typeof b && void 0 !== b.provide) res.push(b); else {
                        if (!(b instanceof Array)) throw function invalidProviderError(provider) {
                            return Error("Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
                        }(b);
                        _normalizeProviders(b, res);
                    }
                }), res;
            }
            function _dependenciesFor(typeOrFunc) {
                var params = reflector.parameters(typeOrFunc);
                if (!params) return [];
                if (params.some(function(p) {
                    return null == p;
                })) throw noAnnotationError(typeOrFunc, params);
                return params.map(function(p) {
                    return _extractToken(typeOrFunc, p, params);
                });
            }
            function _extractToken(typeOrFunc, metadata, params) {
                var token = null, optional = !1;
                if (!Array.isArray(metadata)) return _createDependency(metadata instanceof Inject ? metadata.token : metadata, optional, null);
                for (var visibility = null, i = 0; i < metadata.length; ++i) {
                    var paramMetadata = metadata[i];
                    paramMetadata instanceof Type ? token = paramMetadata : paramMetadata instanceof Inject ? token = paramMetadata.token : paramMetadata instanceof Optional ? optional = !0 : paramMetadata instanceof Self || paramMetadata instanceof SkipSelf ? visibility = paramMetadata : paramMetadata instanceof InjectionToken && (token = paramMetadata);
                }
                if (null != (token = resolveForwardRef(token))) return _createDependency(token, optional, visibility);
                throw noAnnotationError(typeOrFunc, params);
            }
            function _createDependency(token, optional, visibility) {
                return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
            }
            function isPromise(obj) {
                return !!obj && "function" == typeof obj.then;
            }
            function isObservable(obj) {
                return !!obj && "function" == typeof obj.subscribe;
            }
            function _appIdRandomProviderFactory() {
                return "" + _randomChar() + _randomChar() + _randomChar();
            }
            function _randomChar() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()));
            }
            function _throwError() {
                throw new Error("Runtime compiler is not loaded");
            }
            function noComponentFactoryError(component) {
                var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
                return error[ERROR_COMPONENT] = component, error;
            }
            function noopScope(arg0, arg1) {
                return null;
            }
            function noop() {}
            function checkStable(zone) {
                if (0 == zone._nesting && !zone.hasPendingMicrotasks && !zone.isStable) try {
                    zone._nesting++, zone.onMicrotaskEmpty.emit(null);
                } finally {
                    if (zone._nesting--, !zone.hasPendingMicrotasks) try {
                        zone.runOutsideAngular(function() {
                            return zone.onStable.emit(null);
                        });
                    } finally {
                        zone.isStable = !0;
                    }
                }
            }
            function onEnter(zone) {
                zone._nesting++, zone.isStable && (zone.isStable = !1, zone.onUnstable.emit(null));
            }
            function onLeave(zone) {
                zone._nesting--, checkStable(zone);
            }
            function setTestabilityGetter(getter) {
                _testabilityGetter = getter;
            }
            function enableProdMode() {
                if (_runModeLocked) throw new Error("Cannot enable prod mode after platform setup.");
                _devMode = !1;
            }
            function isDevMode() {
                return _runModeLocked = !0, _devMode;
            }
            function createPlatformFactory(parentPlatformFactory, name, providers) {
                void 0 === providers && (providers = []);
                var marker = new InjectionToken("Platform: " + name);
                return function(extraProviders) {
                    void 0 === extraProviders && (extraProviders = []);
                    var platform = getPlatform();
                    return platform && !platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1) || (parentPlatformFactory ? parentPlatformFactory(providers.concat(extraProviders).concat({
                        provide: marker,
                        useValue: !0
                    })) : function createPlatform(injector) {
                        if (_platform && !_platform.destroyed && !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                        _platform = injector.get(PlatformRef);
                        var inits = injector.get(PLATFORM_INITIALIZER, null);
                        return inits && inits.forEach(function(init) {
                            return init();
                        }), _platform;
                    }(Injector.create(providers.concat(extraProviders).concat({
                        provide: marker,
                        useValue: !0
                    })))), function assertPlatform(requiredToken) {
                        var platform = getPlatform();
                        if (!platform) throw new Error("No platform exists!");
                        if (!platform.injector.get(requiredToken, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                        return platform;
                    }(marker);
                };
            }
            function getPlatform() {
                return _platform && !_platform.destroyed ? _platform : null;
            }
            function optionsReducer(dst, objs) {
                return dst = Array.isArray(objs) ? objs.reduce(optionsReducer, dst) : Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({}, dst, objs);
            }
            function remove(list, el) {
                var index = list.indexOf(el);
                index > -1 && list.splice(index, 1);
            }
            function flatten(list) {
                return list.reduce(function(flat, item) {
                    var flatItem = Array.isArray(item) ? flatten(item) : item;
                    return flat.concat(flatItem);
                }, []);
            }
            function checkNotEmpty(value, modulePath, exportName) {
                if (!value) throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
                return value;
            }
            function _queryElementChildren(element, predicate, matches) {
                element.childNodes.forEach(function(node) {
                    node instanceof DebugElement && (predicate(node) && matches.push(node), _queryElementChildren(node, predicate, matches));
                });
            }
            function _queryNodeChildren(parentNode, predicate, matches) {
                parentNode instanceof DebugElement && parentNode.childNodes.forEach(function(node) {
                    predicate(node) && matches.push(node), node instanceof DebugElement && _queryNodeChildren(node, predicate, matches);
                });
            }
            function getDebugNode(nativeNode) {
                return _nativeNodeToDebugNode.get(nativeNode) || null;
            }
            function indexDebugNode(node) {
                _nativeNodeToDebugNode.set(node.nativeNode, node);
            }
            function devModeEqual(a, b) {
                var isListLikeIterableA = isListLikeIterable(a), isListLikeIterableB = isListLikeIterable(b);
                if (isListLikeIterableA && isListLikeIterableB) return function areIterablesEqual(a, b, comparator) {
                    var iterator1 = a[getSymbolIterator()](), iterator2 = b[getSymbolIterator()]();
                    for (;;) {
                        var item1 = iterator1.next(), item2 = iterator2.next();
                        if (item1.done && item2.done) return !0;
                        if (item1.done || item2.done) return !1;
                        if (!comparator(item1.value, item2.value)) return !1;
                    }
                }(a, b, devModeEqual);
                return !(isListLikeIterableA || !(a && ("object" == typeof a || "function" == typeof a)) || isListLikeIterableB || !(b && ("object" == typeof b || "function" == typeof b))) || looseIdentical(a, b);
            }
            function isListLikeIterable(obj) {
                return !!isJsObject(obj) && (Array.isArray(obj) || !(obj instanceof Map) && getSymbolIterator() in obj);
            }
            function isJsObject(o) {
                return null !== o && ("function" == typeof o || "object" == typeof o);
            }
            function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
                var previousIndex = item.previousIndex;
                if (null === previousIndex) return previousIndex;
                var moveOffset = 0;
                return moveOffsets && previousIndex < moveOffsets.length && (moveOffset = moveOffsets[previousIndex]), 
                previousIndex + addRemoveOffset + moveOffset;
            }
            function _iterableDiffersFactory() {
                return defaultIterableDiffers;
            }
            function _keyValueDiffersFactory() {
                return defaultKeyValueDiffers;
            }
            function _localeFactory(locale) {
                return locale || "en-US";
            }
            function shiftInitState(view, priorInitState, newInitState) {
                var state = view.state, initState = 1792 & state;
                return initState === priorInitState ? (view.state = -1793 & state | newInitState, 
                view.initIndex = -1, !0) : initState === newInitState;
            }
            function shouldCallLifecycleInitHook(view, initState, index) {
                return (1792 & view.state) === initState && view.initIndex <= index && (view.initIndex = index + 1, 
                !0);
            }
            function asTextData(view, index) {
                return view.nodes[index];
            }
            function asElementData(view, index) {
                return view.nodes[index];
            }
            function asProviderData(view, index) {
                return view.nodes[index];
            }
            function asPureExpressionData(view, index) {
                return view.nodes[index];
            }
            function asQueryList(view, index) {
                return view.nodes[index];
            }
            function expressionChangedAfterItHasBeenCheckedError(context, oldValue, currValue, isFirstCheck) {
                var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
                return isFirstCheck && (msg += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"), 
                function viewDebugError(msg, context) {
                    var err = new Error(msg);
                    return _addDebugContext(err, context), err;
                }(msg, context);
            }
            function _addDebugContext(err, context) {
                err[ERROR_DEBUG_CONTEXT] = context, err[ERROR_LOGGER] = context.logError.bind(context);
            }
            function viewDestroyedError(action) {
                return new Error("ViewDestroyedError: Attempt to use a destroyed view: " + action);
            }
            function tokenKey(token) {
                var key = _tokenKeyCache.get(token);
                return key || (key = stringify(token) + "_" + _tokenKeyCache.size, _tokenKeyCache.set(token, key)), 
                key;
            }
            function createRendererType2(values) {
                return {
                    id: UNDEFINED_RENDERER_TYPE_ID,
                    styles: values.styles,
                    encapsulation: values.encapsulation,
                    data: values.data
                };
            }
            function checkBinding(view, def, bindingIdx, value) {
                var oldValues = view.oldValues;
                return !(!(2 & view.state) && looseIdentical(oldValues[def.bindingIndex + bindingIdx], value));
            }
            function checkAndUpdateBinding(view, def, bindingIdx, value) {
                return !!checkBinding(view, def, bindingIdx, value) && (view.oldValues[def.bindingIndex + bindingIdx] = value, 
                !0);
            }
            function checkBindingNoChanges(view, def, bindingIdx, value) {
                var oldValue = view.oldValues[def.bindingIndex + bindingIdx];
                if (1 & view.state || !devModeEqual(oldValue, value)) throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, def.nodeIndex), oldValue, value, 0 != (1 & view.state));
            }
            function markParentViewsForCheck(view) {
                for (var currView = view; currView; ) 2 & currView.def.flags && (currView.state |= 8), 
                currView = currView.viewContainerParent || currView.parent;
            }
            function markParentViewsForCheckProjectedViews(view, endView) {
                for (var currView = view; currView && currView !== endView; ) currView.state |= 64, 
                currView = currView.viewContainerParent || currView.parent;
            }
            function dispatchEvent(view, nodeIndex, eventName, event) {
                try {
                    return markParentViewsForCheck(33554432 & view.def.nodes[nodeIndex].flags ? asElementData(view, nodeIndex).componentView : view), 
                    Services.handleEvent(view, nodeIndex, eventName, event);
                } catch (e) {
                    view.root.errorHandler.handleError(e);
                }
            }
            function declaredViewContainer(view) {
                if (view.parent) {
                    return asElementData(view.parent, view.parentNodeDef.nodeIndex);
                }
                return null;
            }
            function viewParentEl(view) {
                return view.parent ? view.parentNodeDef.parent : null;
            }
            function renderNode(view, def) {
                switch (201347067 & def.flags) {
                  case 1:
                    return asElementData(view, def.nodeIndex).renderElement;

                  case 2:
                    return asTextData(view, def.nodeIndex).renderText;
                }
            }
            function isComponentView(view) {
                return !!view.parent && !!(32768 & view.parentNodeDef.flags);
            }
            function isEmbeddedView(view) {
                return !(!view.parent || 32768 & view.parentNodeDef.flags);
            }
            function filterQueryId(queryId) {
                return 1 << queryId % 32;
            }
            function splitMatchedQueriesDsl(matchedQueriesDsl) {
                var matchedQueries = {}, matchedQueryIds = 0, references = {};
                return matchedQueriesDsl && matchedQueriesDsl.forEach(function(_a) {
                    var queryId = _a[0], valueType = _a[1];
                    "number" == typeof queryId ? (matchedQueries[queryId] = valueType, matchedQueryIds |= filterQueryId(queryId)) : references[queryId] = valueType;
                }), {
                    matchedQueries: matchedQueries,
                    references: references,
                    matchedQueryIds: matchedQueryIds
                };
            }
            function splitDepsDsl(deps) {
                return deps.map(function(value) {
                    var token, flags;
                    return Array.isArray(value) ? (flags = value[0], token = value[1]) : (flags = 0, 
                    token = value), {
                        flags: flags,
                        token: token,
                        tokenKey: tokenKey(token)
                    };
                });
            }
            function getParentRenderElement(view, renderHost, def) {
                var renderParent = def.renderParent;
                return renderParent ? 0 == (1 & renderParent.flags) || 0 == (33554432 & renderParent.flags) || renderParent.element.componentRendererType && renderParent.element.componentRendererType.encapsulation === ViewEncapsulation.Native ? asElementData(view, def.renderParent.nodeIndex).renderElement : void 0 : renderHost;
            }
            function resolveDefinition(factory) {
                var value = DEFINITION_CACHE.get(factory);
                return value || ((value = factory(function() {
                    return NOOP;
                })).factory = factory, DEFINITION_CACHE.set(factory, value)), value;
            }
            function visitRootRenderNodes(view, action, parentNode, nextSibling, target) {
                3 === action && (parentNode = view.renderer.parentNode(renderNode(view, view.def.lastRenderRootNode))), 
                visitSiblingRenderNodes(view, action, 0, view.def.nodes.length - 1, parentNode, nextSibling, target);
            }
            function visitSiblingRenderNodes(view, action, startIndex, endIndex, parentNode, nextSibling, target) {
                for (var i = startIndex; i <= endIndex; i++) {
                    var nodeDef = view.def.nodes[i];
                    11 & nodeDef.flags && visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target), 
                    i += nodeDef.childCount;
                }
            }
            function visitProjectedRenderNodes(view, ngContentIndex, action, parentNode, nextSibling, target) {
                for (var compView = view; compView && !isComponentView(compView); ) compView = compView.parent;
                for (var hostView = compView.parent, hostElDef = viewParentEl(compView), startIndex = hostElDef.nodeIndex + 1, endIndex = hostElDef.nodeIndex + hostElDef.childCount, i = startIndex; i <= endIndex; i++) {
                    var nodeDef = hostView.def.nodes[i];
                    nodeDef.ngContentIndex === ngContentIndex && visitRenderNode(hostView, nodeDef, action, parentNode, nextSibling, target), 
                    i += nodeDef.childCount;
                }
                if (!hostView.parent) {
                    var projectedNodes = view.root.projectableNodes[ngContentIndex];
                    if (projectedNodes) for (i = 0; i < projectedNodes.length; i++) execRenderNodeAction(view, projectedNodes[i], action, parentNode, nextSibling, target);
                }
            }
            function visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target) {
                if (8 & nodeDef.flags) visitProjectedRenderNodes(view, nodeDef.ngContent.index, action, parentNode, nextSibling, target); else {
                    var rn = renderNode(view, nodeDef);
                    if (3 === action && 33554432 & nodeDef.flags && 48 & nodeDef.bindingFlags) {
                        if (16 & nodeDef.bindingFlags && execRenderNodeAction(view, rn, action, parentNode, nextSibling, target), 
                        32 & nodeDef.bindingFlags) {
                            execRenderNodeAction(asElementData(view, nodeDef.nodeIndex).componentView, rn, action, parentNode, nextSibling, target);
                        }
                    } else execRenderNodeAction(view, rn, action, parentNode, nextSibling, target);
                    if (16777216 & nodeDef.flags) for (var embeddedViews = asElementData(view, nodeDef.nodeIndex).viewContainer._embeddedViews, k = 0; k < embeddedViews.length; k++) visitRootRenderNodes(embeddedViews[k], action, parentNode, nextSibling, target);
                    1 & nodeDef.flags && !nodeDef.element.name && visitSiblingRenderNodes(view, action, nodeDef.nodeIndex + 1, nodeDef.nodeIndex + nodeDef.childCount, parentNode, nextSibling, target);
                }
            }
            function execRenderNodeAction(view, renderNode, action, parentNode, nextSibling, target) {
                var renderer = view.renderer;
                switch (action) {
                  case 1:
                    renderer.appendChild(parentNode, renderNode);
                    break;

                  case 2:
                    renderer.insertBefore(parentNode, renderNode, nextSibling);
                    break;

                  case 3:
                    renderer.removeChild(parentNode, renderNode);
                    break;

                  case 0:
                    target.push(renderNode);
                }
            }
            function splitNamespace(name) {
                if (":" === name[0]) {
                    var match = name.match(NS_PREFIX_RE);
                    return [ match[1], match[2] ];
                }
                return [ "", name ];
            }
            function calcBindingFlags(bindings) {
                for (var flags = 0, i = 0; i < bindings.length; i++) flags |= bindings[i].flags;
                return flags;
            }
            function elementDef(checkIndex, flags, matchedQueriesDsl, ngContentIndex, childCount, namespaceAndName, fixedAttrs, bindings, outputs, handleEvent, componentView, componentRendererType) {
                void 0 === fixedAttrs && (fixedAttrs = []), handleEvent || (handleEvent = NOOP);
                var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds, ns = null, name = null;
                namespaceAndName && (ns = (_b = splitNamespace(namespaceAndName))[0], name = _b[1]), 
                bindings = bindings || [];
                for (var bindingDefs = new Array(bindings.length), i = 0; i < bindings.length; i++) {
                    var _c = bindings[i], bindingFlags = _c[0], namespaceAndName_1 = _c[1], suffixOrSecurityContext = _c[2], _d = splitNamespace(namespaceAndName_1), ns_1 = _d[0], name_1 = _d[1], securityContext = void 0, suffix = void 0;
                    switch (15 & bindingFlags) {
                      case 4:
                        suffix = suffixOrSecurityContext;
                        break;

                      case 1:
                      case 8:
                        securityContext = suffixOrSecurityContext;
                    }
                    bindingDefs[i] = {
                        flags: bindingFlags,
                        ns: ns_1,
                        name: name_1,
                        nonMinifiedName: name_1,
                        securityContext: securityContext,
                        suffix: suffix
                    };
                }
                outputs = outputs || [];
                var outputDefs = new Array(outputs.length);
                for (i = 0; i < outputs.length; i++) {
                    var _e = outputs[i], target = _e[0], eventName = _e[1];
                    outputDefs[i] = {
                        type: 0,
                        target: target,
                        eventName: eventName,
                        propName: null
                    };
                }
                var attrs = (fixedAttrs = fixedAttrs || []).map(function(_a) {
                    var namespaceAndName = _a[0], value = _a[1], _b = splitNamespace(namespaceAndName);
                    return [ _b[0], _b[1], value ];
                });
                return componentRendererType = function resolveRendererType2(type) {
                    if (type && type.id === UNDEFINED_RENDERER_TYPE_ID) {
                        var isFilled = null != type.encapsulation && type.encapsulation !== ViewEncapsulation.None || type.styles.length || Object.keys(type.data).length;
                        type.id = isFilled ? "c" + _renderCompCount++ : EMPTY_RENDERER_TYPE_ID;
                    }
                    return type && type.id === EMPTY_RENDERER_TYPE_ID && (type = null), type || null;
                }(componentRendererType), componentView && (flags |= 33554432), {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: flags |= 1,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: matchedQueries,
                    matchedQueryIds: matchedQueryIds,
                    references: references,
                    ngContentIndex: ngContentIndex,
                    childCount: childCount,
                    bindings: bindingDefs,
                    bindingFlags: calcBindingFlags(bindingDefs),
                    outputs: outputDefs,
                    element: {
                        ns: ns,
                        name: name,
                        attrs: attrs,
                        template: null,
                        componentProvider: null,
                        componentView: componentView || null,
                        componentRendererType: componentRendererType,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: handleEvent || NOOP
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                };
                var _b;
            }
            function createElement(view, renderHost, def) {
                var el, elDef = def.element, rootSelectorOrNode = view.root.selectorOrNode, renderer = view.renderer;
                if (view.parent || !rootSelectorOrNode) {
                    el = elDef.name ? renderer.createElement(elDef.name, elDef.ns) : renderer.createComment("");
                    var parentEl = getParentRenderElement(view, renderHost, def);
                    parentEl && renderer.appendChild(parentEl, el);
                } else el = renderer.selectRootElement(rootSelectorOrNode);
                if (elDef.attrs) for (var i = 0; i < elDef.attrs.length; i++) {
                    var _a = elDef.attrs[i], ns = _a[0], name_2 = _a[1], value = _a[2];
                    renderer.setAttribute(el, name_2, value, ns);
                }
                return el;
            }
            function listenToElementOutputs(view, compView, def, el) {
                for (var i = 0; i < def.outputs.length; i++) {
                    var output = def.outputs[i], handleEventClosure = renderEventHandlerClosure(view, def.nodeIndex, (target = output.target, 
                    name = output.eventName, target ? target + ":" + name : name)), listenTarget = output.target, listenerView = view;
                    "component" === output.target && (listenTarget = null, listenerView = compView);
                    var disposable = listenerView.renderer.listen(listenTarget || el, output.eventName, handleEventClosure);
                    view.disposables[def.outputIndex + i] = disposable;
                }
                var target, name;
            }
            function renderEventHandlerClosure(view, index, eventName) {
                return function(event) {
                    return dispatchEvent(view, index, eventName, event);
                };
            }
            function checkAndUpdateElementValue(view, def, bindingIdx, value) {
                if (!checkAndUpdateBinding(view, def, bindingIdx, value)) return !1;
                var binding = def.bindings[bindingIdx], elData = asElementData(view, def.nodeIndex), renderNode$$1 = elData.renderElement, name = binding.name;
                switch (15 & binding.flags) {
                  case 1:
                    !function setElementAttribute(view, binding, renderNode$$1, ns, name, value) {
                        var securityContext = binding.securityContext, renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
                        renderValue = null != renderValue ? renderValue.toString() : null;
                        var renderer = view.renderer;
                        null != value ? renderer.setAttribute(renderNode$$1, name, renderValue, ns) : renderer.removeAttribute(renderNode$$1, name, ns);
                    }(view, binding, renderNode$$1, binding.ns, name, value);
                    break;

                  case 2:
                    !function setElementClass(view, renderNode$$1, name, value) {
                        var renderer = view.renderer;
                        value ? renderer.addClass(renderNode$$1, name) : renderer.removeClass(renderNode$$1, name);
                    }(view, renderNode$$1, name, value);
                    break;

                  case 4:
                    !function setElementStyle(view, binding, renderNode$$1, name, value) {
                        var renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
                        if (null != renderValue) {
                            renderValue = renderValue.toString();
                            var unit = binding.suffix;
                            null != unit && (renderValue += unit);
                        } else renderValue = null;
                        var renderer = view.renderer;
                        null != renderValue ? renderer.setStyle(renderNode$$1, name, renderValue) : renderer.removeStyle(renderNode$$1, name);
                    }(view, binding, renderNode$$1, name, value);
                    break;

                  case 8:
                    !function setElementProperty(view, binding, renderNode$$1, name, value) {
                        var securityContext = binding.securityContext, renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
                        view.renderer.setProperty(renderNode$$1, name, renderValue);
                    }(33554432 & def.flags && 32 & binding.flags ? elData.componentView : view, binding, renderNode$$1, name, value);
                }
                return !0;
            }
            function moduleProvideDef(flags, token, value, deps) {
                value = resolveForwardRef(value);
                return {
                    index: -1,
                    deps: splitDepsDsl(deps),
                    flags: flags,
                    token: token,
                    value: value
                };
            }
            function moduleDef(providers) {
                for (var providersByKey = {}, i = 0; i < providers.length; i++) {
                    var provider = providers[i];
                    provider.index = i, providersByKey[tokenKey(provider.token)] = provider;
                }
                return {
                    factory: null,
                    providersByKey: providersByKey,
                    providers: providers
                };
            }
            function resolveNgModuleDep(data, depDef, notFoundValue) {
                if (void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), 8 & depDef.flags) return depDef.token;
                if (2 & depDef.flags && (notFoundValue = null), 1 & depDef.flags) return data._parent.get(depDef.token, notFoundValue);
                var tokenKey$$1 = depDef.tokenKey;
                switch (tokenKey$$1) {
                  case InjectorRefTokenKey$1:
                  case NgModuleRefTokenKey:
                    return data;
                }
                var providerDef = data._def.providersByKey[tokenKey$$1];
                if (providerDef) {
                    var providerInstance = data._providers[providerDef.index];
                    return void 0 === providerInstance && (providerInstance = data._providers[providerDef.index] = _createProviderInstance$1(data, providerDef)), 
                    providerInstance === UNDEFINED_VALUE ? void 0 : providerInstance;
                }
                return data._parent.get(depDef.token, notFoundValue);
            }
            function _createProviderInstance$1(ngModule, providerDef) {
                var injectable;
                switch (201347067 & providerDef.flags) {
                  case 512:
                    injectable = function _createClass(ngModule, ctor, deps) {
                        var len = deps.length;
                        switch (len) {
                          case 0:
                            return new ctor();

                          case 1:
                            return new ctor(resolveNgModuleDep(ngModule, deps[0]));

                          case 2:
                            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));

                          case 3:
                            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));

                          default:
                            for (var depValues = new Array(len), i = 0; i < len; i++) depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
                            return new (ctor.bind.apply(ctor, [ void 0 ].concat(depValues)))();
                        }
                    }(ngModule, providerDef.value, providerDef.deps);
                    break;

                  case 1024:
                    injectable = function _callFactory(ngModule, factory, deps) {
                        var len = deps.length;
                        switch (len) {
                          case 0:
                            return factory();

                          case 1:
                            return factory(resolveNgModuleDep(ngModule, deps[0]));

                          case 2:
                            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));

                          case 3:
                            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));

                          default:
                            for (var depValues = Array(len), i = 0; i < len; i++) depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
                            return factory.apply(void 0, depValues);
                        }
                    }(ngModule, providerDef.value, providerDef.deps);
                    break;

                  case 2048:
                    injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
                    break;

                  case 256:
                    injectable = providerDef.value;
                }
                return void 0 === injectable ? UNDEFINED_VALUE : injectable;
            }
            function attachEmbeddedView(parentView, elementData, viewIndex, view) {
                var embeddedViews = elementData.viewContainer._embeddedViews;
                null !== viewIndex && void 0 !== viewIndex || (viewIndex = embeddedViews.length), 
                view.viewContainerParent = parentView, addToArray(embeddedViews, viewIndex, view), 
                function attachProjectedView(vcElementData, view) {
                    var dvcElementData = declaredViewContainer(view);
                    if (!dvcElementData || dvcElementData === vcElementData || 16 & view.state) return;
                    view.state |= 16;
                    var projectedViews = dvcElementData.template._projectedViews;
                    projectedViews || (projectedViews = dvcElementData.template._projectedViews = []);
                    projectedViews.push(view), function markNodeAsProjectedTemplate(viewDef, nodeDef) {
                        if (4 & nodeDef.flags) return;
                        viewDef.nodeFlags |= 4, nodeDef.flags |= 4;
                        var parentNodeDef = nodeDef.parent;
                        for (;parentNodeDef; ) parentNodeDef.childFlags |= 4, parentNodeDef = parentNodeDef.parent;
                    }(view.parent.def, view.parentNodeDef);
                }(elementData, view), Services.dirtyParentQueries(view);
                renderAttachEmbeddedView(elementData, viewIndex > 0 ? embeddedViews[viewIndex - 1] : null, view);
            }
            function detachEmbeddedView(elementData, viewIndex) {
                var embeddedViews = elementData.viewContainer._embeddedViews;
                if ((null == viewIndex || viewIndex >= embeddedViews.length) && (viewIndex = embeddedViews.length - 1), 
                viewIndex < 0) return null;
                var view = embeddedViews[viewIndex];
                return view.viewContainerParent = null, removeFromArray(embeddedViews, viewIndex), 
                Services.dirtyParentQueries(view), renderDetachView(view), view;
            }
            function renderAttachEmbeddedView(elementData, prevView, view) {
                var prevRenderNode = prevView ? renderNode(prevView, prevView.def.lastRenderRootNode) : elementData.renderElement;
                visitRootRenderNodes(view, 2, view.renderer.parentNode(prevRenderNode), view.renderer.nextSibling(prevRenderNode), void 0);
            }
            function renderDetachView(view) {
                visitRootRenderNodes(view, 3, null, null, void 0);
            }
            function addToArray(arr, index, value) {
                index >= arr.length ? arr.push(value) : arr.splice(index, 0, value);
            }
            function removeFromArray(arr, index) {
                index >= arr.length - 1 ? arr.pop() : arr.splice(index, 1);
            }
            function createComponentFactory(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors) {
                return new ComponentFactory_(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors);
            }
            function createViewContainerData(view, elDef, elData) {
                return new ViewContainerRef_(view, elDef, elData);
            }
            function createChangeDetectorRef(view) {
                return new ViewRef_(view);
            }
            function createTemplateData(view, def) {
                return new TemplateRef_(view, def);
            }
            function createInjector(view, elDef) {
                return new Injector_(view, elDef);
            }
            function nodeValue(view, index) {
                var def = view.def.nodes[index];
                if (1 & def.flags) {
                    var elData = asElementData(view, def.nodeIndex);
                    return def.element.template ? elData.template : elData.renderElement;
                }
                if (2 & def.flags) return asTextData(view, def.nodeIndex).renderText;
                if (20240 & def.flags) return asProviderData(view, def.nodeIndex).instance;
                throw new Error("Illegal state: read nodeValue for node index " + index);
            }
            function createRendererV1(view) {
                return new RendererAdapter(view.renderer);
            }
            function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
                return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
            }
            function directiveDef(checkIndex, flags, matchedQueries, childCount, ctor, deps, props, outputs) {
                var bindings = [];
                if (props) for (var prop in props) {
                    var _a = props[prop], bindingIndex = _a[0], nonMinifiedName = _a[1];
                    bindings[bindingIndex] = {
                        flags: 8,
                        name: prop,
                        nonMinifiedName: nonMinifiedName,
                        ns: null,
                        securityContext: null,
                        suffix: null
                    };
                }
                var outputDefs = [];
                if (outputs) for (var propName in outputs) outputDefs.push({
                    type: 1,
                    propName: propName,
                    target: null,
                    eventName: outputs[propName]
                });
                return _def(checkIndex, flags |= 16384, matchedQueries, childCount, ctor, ctor, deps, bindings, outputDefs);
            }
            function providerDef(flags, matchedQueries, token, value, deps) {
                return _def(-1, flags, matchedQueries, 0, token, value, deps);
            }
            function _def(checkIndex, flags, matchedQueriesDsl, childCount, token, value, deps, bindings, outputs) {
                var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
                outputs || (outputs = []), bindings || (bindings = []), value = resolveForwardRef(value);
                var depDefs = splitDepsDsl(deps);
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: flags,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: matchedQueries,
                    matchedQueryIds: matchedQueryIds,
                    references: references,
                    ngContentIndex: -1,
                    childCount: childCount,
                    bindings: bindings,
                    bindingFlags: calcBindingFlags(bindings),
                    outputs: outputs,
                    element: null,
                    provider: {
                        token: token,
                        value: value,
                        deps: depDefs
                    },
                    text: null,
                    query: null,
                    ngContent: null
                };
            }
            function createProviderInstance(view, def) {
                return _createProviderInstance(view, def);
            }
            function createPipeInstance(view, def) {
                for (var compView = view; compView.parent && !isComponentView(compView); ) compView = compView.parent;
                return createClass(compView.parent, viewParentEl(compView), !0, def.provider.value, def.provider.deps);
            }
            function createDirectiveInstance(view, def) {
                var allowPrivateServices = (32768 & def.flags) > 0, instance = createClass(view, def.parent, allowPrivateServices, def.provider.value, def.provider.deps);
                if (def.outputs.length) for (var i = 0; i < def.outputs.length; i++) {
                    var output = def.outputs[i], subscription = instance[output.propName].subscribe(eventHandlerClosure(view, def.parent.nodeIndex, output.eventName));
                    view.disposables[def.outputIndex + i] = subscription.unsubscribe.bind(subscription);
                }
                return instance;
            }
            function eventHandlerClosure(view, index, eventName) {
                return function(event) {
                    return dispatchEvent(view, index, eventName, event);
                };
            }
            function _createProviderInstance(view, def) {
                var allowPrivateServices = (8192 & def.flags) > 0, providerDef = def.provider;
                switch (201347067 & def.flags) {
                  case 512:
                    return createClass(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);

                  case 1024:
                    return function callFactory(view, elDef, allowPrivateServices, factory, deps) {
                        var len = deps.length;
                        switch (len) {
                          case 0:
                            return factory();

                          case 1:
                            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));

                          case 2:
                            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));

                          case 3:
                            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));

                          default:
                            for (var depValues = Array(len), i = 0; i < len; i++) depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
                            return factory.apply(void 0, depValues);
                        }
                    }(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);

                  case 2048:
                    return resolveDep(view, def.parent, allowPrivateServices, providerDef.deps[0]);

                  case 256:
                    return providerDef.value;
                }
            }
            function createClass(view, elDef, allowPrivateServices, ctor, deps) {
                var len = deps.length;
                switch (len) {
                  case 0:
                    return new ctor();

                  case 1:
                    return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));

                  case 2:
                    return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));

                  case 3:
                    return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));

                  default:
                    for (var depValues = new Array(len), i = 0; i < len; i++) depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
                    return new (ctor.bind.apply(ctor, [ void 0 ].concat(depValues)))();
                }
            }
            function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue) {
                if (void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), 8 & depDef.flags) return depDef.token;
                var startView = view;
                2 & depDef.flags && (notFoundValue = null);
                var tokenKey$$1 = depDef.tokenKey;
                for (tokenKey$$1 === ChangeDetectorRefTokenKey && (allowPrivateServices = !(!elDef || !elDef.element.componentView)), 
                elDef && 1 & depDef.flags && (allowPrivateServices = !1, elDef = elDef.parent); view; ) {
                    if (elDef) switch (tokenKey$$1) {
                      case RendererV1TokenKey:
                        return createRendererV1(findCompView(view, elDef, allowPrivateServices));

                      case Renderer2TokenKey:
                        return findCompView(view, elDef, allowPrivateServices).renderer;

                      case ElementRefTokenKey:
                        return new ElementRef(asElementData(view, elDef.nodeIndex).renderElement);

                      case ViewContainerRefTokenKey:
                        return asElementData(view, elDef.nodeIndex).viewContainer;

                      case TemplateRefTokenKey:
                        if (elDef.element.template) return asElementData(view, elDef.nodeIndex).template;
                        break;

                      case ChangeDetectorRefTokenKey:
                        return createChangeDetectorRef(findCompView(view, elDef, allowPrivateServices));

                      case InjectorRefTokenKey:
                        return createInjector(view, elDef);

                      default:
                        var providerDef_1 = (allowPrivateServices ? elDef.element.allProviders : elDef.element.publicProviders)[tokenKey$$1];
                        if (providerDef_1) {
                            var providerData = asProviderData(view, providerDef_1.nodeIndex);
                            return providerData || (providerData = {
                                instance: _createProviderInstance(view, providerDef_1)
                            }, view.nodes[providerDef_1.nodeIndex] = providerData), providerData.instance;
                        }
                    }
                    allowPrivateServices = isComponentView(view), elDef = viewParentEl(view), view = view.parent;
                }
                var value = startView.root.injector.get(depDef.token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
                return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ? value : startView.root.ngModule.injector.get(depDef.token, notFoundValue);
            }
            function findCompView(view, elDef, allowPrivateServices) {
                var compView;
                if (allowPrivateServices) compView = asElementData(view, elDef.nodeIndex).componentView; else for (compView = view; compView.parent && !isComponentView(compView); ) compView = compView.parent;
                return compView;
            }
            function updateProp(view, providerData, def, bindingIdx, value, changes) {
                if (32768 & def.flags) {
                    var compView = asElementData(view, def.parent.nodeIndex).componentView;
                    2 & compView.def.flags && (compView.state |= 8);
                }
                var propName = def.bindings[bindingIdx].name;
                if (providerData.instance[propName] = value, 524288 & def.flags) {
                    changes = changes || {};
                    var oldValue = view.oldValues[def.bindingIndex + bindingIdx];
                    oldValue instanceof WrappedValue && (oldValue = oldValue.wrapped);
                    changes[def.bindings[bindingIdx].nonMinifiedName] = new SimpleChange(oldValue, value, 0 != (2 & view.state));
                }
                return view.oldValues[def.bindingIndex + bindingIdx] = value, changes;
            }
            function callLifecycleHooksChildrenFirst(view, lifecycles) {
                if (view.def.nodeFlags & lifecycles) for (var nodes = view.def.nodes, initIndex = 0, i = 0; i < nodes.length; i++) {
                    var nodeDef = nodes[i], parent_1 = nodeDef.parent;
                    for (!parent_1 && nodeDef.flags & lifecycles && callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++), 
                    0 == (nodeDef.childFlags & lifecycles) && (i += nodeDef.childCount); parent_1 && 1 & parent_1.flags && i === parent_1.nodeIndex + parent_1.childCount; ) parent_1.directChildFlags & lifecycles && (initIndex = callElementProvidersLifecycles(view, parent_1, lifecycles, initIndex)), 
                    parent_1 = parent_1.parent;
                }
            }
            function callElementProvidersLifecycles(view, elDef, lifecycles, initIndex) {
                for (var i = elDef.nodeIndex + 1; i <= elDef.nodeIndex + elDef.childCount; i++) {
                    var nodeDef = view.def.nodes[i];
                    nodeDef.flags & lifecycles && callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++), 
                    i += nodeDef.childCount;
                }
                return initIndex;
            }
            function callProviderLifecycles(view, index, lifecycles, initIndex) {
                var providerData = asProviderData(view, index);
                if (providerData) {
                    var provider = providerData.instance;
                    provider && (Services.setCurrentNode(view, index), 1048576 & lifecycles && shouldCallLifecycleInitHook(view, 512, initIndex) && provider.ngAfterContentInit(), 
                    2097152 & lifecycles && provider.ngAfterContentChecked(), 4194304 & lifecycles && shouldCallLifecycleInitHook(view, 768, initIndex) && provider.ngAfterViewInit(), 
                    8388608 & lifecycles && provider.ngAfterViewChecked(), 131072 & lifecycles && provider.ngOnDestroy());
                }
            }
            function dirtyParentQueries(view) {
                for (var queryIds = view.def.nodeMatchedQueries; view.parent && isEmbeddedView(view); ) {
                    var tplDef = view.parentNodeDef;
                    view = view.parent;
                    for (var end = tplDef.nodeIndex + tplDef.childCount, i = 0; i <= end; i++) {
                        67108864 & (nodeDef = view.def.nodes[i]).flags && 536870912 & nodeDef.flags && (nodeDef.query.filterId & queryIds) === nodeDef.query.filterId && asQueryList(view, i).setDirty(), 
                        !(1 & nodeDef.flags && i + nodeDef.childCount < tplDef.nodeIndex) && 67108864 & nodeDef.childFlags && 536870912 & nodeDef.childFlags || (i += nodeDef.childCount);
                    }
                }
                if (134217728 & view.def.nodeFlags) for (i = 0; i < view.def.nodes.length; i++) {
                    var nodeDef;
                    134217728 & (nodeDef = view.def.nodes[i]).flags && 536870912 & nodeDef.flags && asQueryList(view, i).setDirty(), 
                    i += nodeDef.childCount;
                }
            }
            function checkAndUpdateQuery(view, nodeDef) {
                var queryList = asQueryList(view, nodeDef.nodeIndex);
                if (queryList.dirty) {
                    var directiveInstance, newValues = void 0;
                    if (67108864 & nodeDef.flags) {
                        var elementDef = nodeDef.parent.parent;
                        newValues = calcQueryValues(view, elementDef.nodeIndex, elementDef.nodeIndex + elementDef.childCount, nodeDef.query, []), 
                        directiveInstance = asProviderData(view, nodeDef.parent.nodeIndex).instance;
                    } else 134217728 & nodeDef.flags && (newValues = calcQueryValues(view, 0, view.def.nodes.length - 1, nodeDef.query, []), 
                    directiveInstance = view.component);
                    queryList.reset(newValues);
                    for (var bindings = nodeDef.query.bindings, notify = !1, i = 0; i < bindings.length; i++) {
                        var binding = bindings[i], boundValue = void 0;
                        switch (binding.bindingType) {
                          case 0:
                            boundValue = queryList.first;
                            break;

                          case 1:
                            boundValue = queryList, notify = !0;
                        }
                        directiveInstance[binding.propName] = boundValue;
                    }
                    notify && queryList.notifyOnChanges();
                }
            }
            function calcQueryValues(view, startIndex, endIndex, queryDef, values) {
                for (var i = startIndex; i <= endIndex; i++) {
                    var nodeDef = view.def.nodes[i], valueType = nodeDef.matchedQueries[queryDef.id];
                    if (null != valueType && values.push(getQueryValue(view, nodeDef, valueType)), 1 & nodeDef.flags && nodeDef.element.template && (nodeDef.element.template.nodeMatchedQueries & queryDef.filterId) === queryDef.filterId) {
                        var elementData = asElementData(view, i);
                        if ((nodeDef.childMatchedQueries & queryDef.filterId) === queryDef.filterId && (calcQueryValues(view, i + 1, i + nodeDef.childCount, queryDef, values), 
                        i += nodeDef.childCount), 16777216 & nodeDef.flags) for (var embeddedViews = elementData.viewContainer._embeddedViews, k = 0; k < embeddedViews.length; k++) {
                            var embeddedView = embeddedViews[k], dvc = declaredViewContainer(embeddedView);
                            dvc && dvc === elementData && calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryDef, values);
                        }
                        var projectedViews = elementData.template._projectedViews;
                        if (projectedViews) for (k = 0; k < projectedViews.length; k++) {
                            var projectedView = projectedViews[k];
                            calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryDef, values);
                        }
                    }
                    (nodeDef.childMatchedQueries & queryDef.filterId) !== queryDef.filterId && (i += nodeDef.childCount);
                }
                return values;
            }
            function getQueryValue(view, nodeDef, queryValueType) {
                if (null != queryValueType) switch (queryValueType) {
                  case 1:
                    return asElementData(view, nodeDef.nodeIndex).renderElement;

                  case 0:
                    return new ElementRef(asElementData(view, nodeDef.nodeIndex).renderElement);

                  case 2:
                    return asElementData(view, nodeDef.nodeIndex).template;

                  case 3:
                    return asElementData(view, nodeDef.nodeIndex).viewContainer;

                  case 4:
                    return asProviderData(view, nodeDef.nodeIndex).instance;
                }
            }
            function appendNgContent(view, renderHost, def) {
                var parentEl = getParentRenderElement(view, renderHost, def);
                if (parentEl) {
                    visitProjectedRenderNodes(view, def.ngContent.index, 1, parentEl, null, void 0);
                }
            }
            function textDef(checkIndex, ngContentIndex, staticText) {
                for (var bindings = new Array(staticText.length - 1), i = 1; i < staticText.length; i++) bindings[i - 1] = {
                    flags: 8,
                    name: null,
                    ns: null,
                    nonMinifiedName: null,
                    securityContext: null,
                    suffix: staticText[i]
                };
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: 2,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: ngContentIndex,
                    childCount: 0,
                    bindings: bindings,
                    bindingFlags: 8,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: {
                        prefix: staticText[0]
                    },
                    query: null,
                    ngContent: null
                };
            }
            function createText(view, renderHost, def) {
                var renderNode$$1, renderer = view.renderer;
                renderNode$$1 = renderer.createText(def.text.prefix);
                var parentEl = getParentRenderElement(view, renderHost, def);
                return parentEl && renderer.appendChild(parentEl, renderNode$$1), {
                    renderText: renderNode$$1
                };
            }
            function _addInterpolationPart(value, binding) {
                return (null != value ? value.toString() : "") + binding.suffix;
            }
            function viewDef(flags, nodes, updateDirectives, updateRenderer) {
                for (var viewBindingCount = 0, viewDisposableCount = 0, viewNodeFlags = 0, viewRootNodeFlags = 0, viewMatchedQueries = 0, currentParent = null, currentRenderParent = null, currentElementHasPublicProviders = !1, currentElementHasPrivateProviders = !1, lastRenderRootNode = null, i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    if (node.nodeIndex = i, node.parent = currentParent, node.bindingIndex = viewBindingCount, 
                    node.outputIndex = viewDisposableCount, node.renderParent = currentRenderParent, 
                    viewNodeFlags |= node.flags, viewMatchedQueries |= node.matchedQueryIds, node.element) {
                        var elDef = node.element;
                        elDef.publicProviders = currentParent ? currentParent.element.publicProviders : Object.create(null), 
                        elDef.allProviders = elDef.publicProviders, currentElementHasPublicProviders = !1, 
                        currentElementHasPrivateProviders = !1, node.element.template && (viewMatchedQueries |= node.element.template.nodeMatchedQueries);
                    }
                    if (validateNode(currentParent, node, nodes.length), viewBindingCount += node.bindings.length, 
                    viewDisposableCount += node.outputs.length, !currentRenderParent && 3 & node.flags && (lastRenderRootNode = node), 
                    20224 & node.flags) {
                        currentElementHasPublicProviders || (currentElementHasPublicProviders = !0, currentParent.element.publicProviders = Object.create(currentParent.element.publicProviders), 
                        currentParent.element.allProviders = currentParent.element.publicProviders);
                        var isPrivateService = 0 != (8192 & node.flags), isComponent = 0 != (32768 & node.flags);
                        !isPrivateService || isComponent ? currentParent.element.publicProviders[tokenKey(node.provider.token)] = node : (currentElementHasPrivateProviders || (currentElementHasPrivateProviders = !0, 
                        currentParent.element.allProviders = Object.create(currentParent.element.publicProviders)), 
                        currentParent.element.allProviders[tokenKey(node.provider.token)] = node), isComponent && (currentParent.element.componentProvider = node);
                    }
                    if (currentParent ? (currentParent.childFlags |= node.flags, currentParent.directChildFlags |= node.flags, 
                    currentParent.childMatchedQueries |= node.matchedQueryIds, node.element && node.element.template && (currentParent.childMatchedQueries |= node.element.template.nodeMatchedQueries)) : viewRootNodeFlags |= node.flags, 
                    node.childCount > 0) currentParent = node, isNgContainer(node) || (currentRenderParent = node); else for (;currentParent && i === currentParent.nodeIndex + currentParent.childCount; ) {
                        var newParent = currentParent.parent;
                        newParent && (newParent.childFlags |= currentParent.childFlags, newParent.childMatchedQueries |= currentParent.childMatchedQueries), 
                        currentRenderParent = (currentParent = newParent) && isNgContainer(currentParent) ? currentParent.renderParent : currentParent;
                    }
                }
                return {
                    factory: null,
                    nodeFlags: viewNodeFlags,
                    rootNodeFlags: viewRootNodeFlags,
                    nodeMatchedQueries: viewMatchedQueries,
                    flags: flags,
                    nodes: nodes,
                    updateDirectives: updateDirectives || NOOP,
                    updateRenderer: updateRenderer || NOOP,
                    handleEvent: function(view, nodeIndex, eventName, event) {
                        return nodes[nodeIndex].element.handleEvent(view, eventName, event);
                    },
                    bindingCount: viewBindingCount,
                    outputCount: viewDisposableCount,
                    lastRenderRootNode: lastRenderRootNode
                };
            }
            function isNgContainer(node) {
                return 0 != (1 & node.flags) && null === node.element.name;
            }
            function validateNode(parent, node, nodeCount) {
                var template = node.element && node.element.template;
                if (template) {
                    if (!template.lastRenderRootNode) throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                    if (template.lastRenderRootNode && 16777216 & template.lastRenderRootNode.flags) throw new Error("Illegal State: Last root node of a template can't have embedded views, at index " + node.nodeIndex + "!");
                }
                if (20224 & node.flags) {
                    if (0 == (1 & (parent ? parent.flags : 0))) throw new Error("Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index " + node.nodeIndex + "!");
                }
                if (node.query) {
                    if (67108864 & node.flags && (!parent || 0 == (16384 & parent.flags))) throw new Error("Illegal State: Content Query nodes need to be children of directives, at index " + node.nodeIndex + "!");
                    if (134217728 & node.flags && parent) throw new Error("Illegal State: View Query nodes have to be top level nodes, at index " + node.nodeIndex + "!");
                }
                if (node.childCount) {
                    var parentEnd = parent ? parent.nodeIndex + parent.childCount : nodeCount - 1;
                    if (node.nodeIndex <= parentEnd && node.nodeIndex + node.childCount > parentEnd) throw new Error("Illegal State: childCount of node leads outside of parent, at index " + node.nodeIndex + "!");
                }
            }
            function createEmbeddedView(parent, anchorDef$$1, viewDef, context) {
                var view = createView(parent.root, parent.renderer, parent, anchorDef$$1, viewDef);
                return initView(view, parent.component, context), createViewNodes(view), view;
            }
            function createRootView(root, def, context) {
                var view = createView(root, root.renderer, null, null, def);
                return initView(view, context, context), createViewNodes(view), view;
            }
            function createComponentView(parentView, nodeDef, viewDef, hostElement) {
                var compRenderer, rendererType = nodeDef.element.componentRendererType;
                return compRenderer = rendererType ? parentView.root.rendererFactory.createRenderer(hostElement, rendererType) : parentView.root.renderer, 
                createView(parentView.root, compRenderer, parentView, nodeDef.element.componentProvider, viewDef);
            }
            function createView(root, renderer, parent, parentNodeDef, def) {
                var nodes = new Array(def.nodes.length), disposables = def.outputCount ? new Array(def.outputCount) : null;
                return {
                    def: def,
                    parent: parent,
                    viewContainerParent: null,
                    parentNodeDef: parentNodeDef,
                    context: null,
                    component: null,
                    nodes: nodes,
                    state: 13,
                    root: root,
                    renderer: renderer,
                    oldValues: new Array(def.bindingCount),
                    disposables: disposables,
                    initIndex: -1
                };
            }
            function initView(view, component, context) {
                view.component = component, view.context = context;
            }
            function createViewNodes(view) {
                var renderHost;
                if (isComponentView(view)) {
                    var hostDef = view.parentNodeDef;
                    renderHost = asElementData(view.parent, hostDef.parent.nodeIndex).renderElement;
                }
                for (var def = view.def, nodes = view.nodes, i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    Services.setCurrentNode(view, i);
                    var nodeData = void 0;
                    switch (201347067 & nodeDef.flags) {
                      case 1:
                        var el = createElement(view, renderHost, nodeDef), componentView = void 0;
                        if (33554432 & nodeDef.flags) {
                            var compViewDef = resolveDefinition(nodeDef.element.componentView);
                            componentView = Services.createComponentView(view, nodeDef, compViewDef, el);
                        }
                        listenToElementOutputs(view, componentView, nodeDef, el), nodeData = {
                            renderElement: el,
                            componentView: componentView,
                            viewContainer: null,
                            template: nodeDef.element.template ? createTemplateData(view, nodeDef) : void 0
                        }, 16777216 & nodeDef.flags && (nodeData.viewContainer = createViewContainerData(view, nodeDef, nodeData));
                        break;

                      case 2:
                        nodeData = createText(view, renderHost, nodeDef);
                        break;

                      case 512:
                      case 1024:
                      case 2048:
                      case 256:
                        if (!((nodeData = nodes[i]) || 4096 & nodeDef.flags)) {
                            nodeData = {
                                instance: createProviderInstance(view, nodeDef)
                            };
                        }
                        break;

                      case 16:
                        nodeData = {
                            instance: createPipeInstance(view, nodeDef)
                        };
                        break;

                      case 16384:
                        if (!(nodeData = nodes[i])) {
                            nodeData = {
                                instance: createDirectiveInstance(view, nodeDef)
                            };
                        }
                        if (32768 & nodeDef.flags) {
                            initView(asElementData(view, nodeDef.parent.nodeIndex).componentView, nodeData.instance, nodeData.instance);
                        }
                        break;

                      case 32:
                      case 64:
                      case 128:
                        nodeData = {
                            value: void 0
                        };
                        break;

                      case 67108864:
                      case 134217728:
                        nodeData = new QueryList();
                        break;

                      case 8:
                        appendNgContent(view, renderHost, nodeDef), nodeData = void 0;
                    }
                    nodes[i] = nodeData;
                }
                execComponentViewsAction(view, ViewAction.CreateViewNodes), execQueriesAction(view, 201326592, 268435456, 0);
            }
            function checkNoChangesView(view) {
                markProjectedViewsForCheck(view), Services.updateDirectives(view, 1), execEmbeddedViewsAction(view, ViewAction.CheckNoChanges), 
                Services.updateRenderer(view, 1), execComponentViewsAction(view, ViewAction.CheckNoChanges), 
                view.state &= -97;
            }
            function checkAndUpdateView(view) {
                1 & view.state ? (view.state &= -2, view.state |= 2) : view.state &= -3, shiftInitState(view, 0, 256), 
                markProjectedViewsForCheck(view), Services.updateDirectives(view, 0), execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate), 
                execQueriesAction(view, 67108864, 536870912, 0);
                var callInit = shiftInitState(view, 256, 512);
                callLifecycleHooksChildrenFirst(view, 2097152 | (callInit ? 1048576 : 0)), Services.updateRenderer(view, 0), 
                execComponentViewsAction(view, ViewAction.CheckAndUpdate), execQueriesAction(view, 134217728, 536870912, 0), 
                callLifecycleHooksChildrenFirst(view, 8388608 | ((callInit = shiftInitState(view, 512, 768)) ? 4194304 : 0)), 
                2 & view.def.flags && (view.state &= -9), view.state &= -97, shiftInitState(view, 768, 1024);
            }
            function checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                return 0 === argStyle ? function checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                    switch (201347067 & nodeDef.flags) {
                      case 1:
                        return function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                            var bindLen = def.bindings.length, changed = !1;
                            return bindLen > 0 && checkAndUpdateElementValue(view, def, 0, v0) && (changed = !0), 
                            bindLen > 1 && checkAndUpdateElementValue(view, def, 1, v1) && (changed = !0), bindLen > 2 && checkAndUpdateElementValue(view, def, 2, v2) && (changed = !0), 
                            bindLen > 3 && checkAndUpdateElementValue(view, def, 3, v3) && (changed = !0), bindLen > 4 && checkAndUpdateElementValue(view, def, 4, v4) && (changed = !0), 
                            bindLen > 5 && checkAndUpdateElementValue(view, def, 5, v5) && (changed = !0), bindLen > 6 && checkAndUpdateElementValue(view, def, 6, v6) && (changed = !0), 
                            bindLen > 7 && checkAndUpdateElementValue(view, def, 7, v7) && (changed = !0), bindLen > 8 && checkAndUpdateElementValue(view, def, 8, v8) && (changed = !0), 
                            bindLen > 9 && checkAndUpdateElementValue(view, def, 9, v9) && (changed = !0), changed;
                        }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                      case 2:
                        return function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                            var changed = !1, bindings = def.bindings, bindLen = bindings.length;
                            if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0) && (changed = !0), bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1) && (changed = !0), 
                            bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2) && (changed = !0), bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3) && (changed = !0), 
                            bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4) && (changed = !0), bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5) && (changed = !0), 
                            bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6) && (changed = !0), bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7) && (changed = !0), 
                            bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8) && (changed = !0), bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9) && (changed = !0), 
                            changed) {
                                var value = def.text.prefix;
                                bindLen > 0 && (value += _addInterpolationPart(v0, bindings[0])), bindLen > 1 && (value += _addInterpolationPart(v1, bindings[1])), 
                                bindLen > 2 && (value += _addInterpolationPart(v2, bindings[2])), bindLen > 3 && (value += _addInterpolationPart(v3, bindings[3])), 
                                bindLen > 4 && (value += _addInterpolationPart(v4, bindings[4])), bindLen > 5 && (value += _addInterpolationPart(v5, bindings[5])), 
                                bindLen > 6 && (value += _addInterpolationPart(v6, bindings[6])), bindLen > 7 && (value += _addInterpolationPart(v7, bindings[7])), 
                                bindLen > 8 && (value += _addInterpolationPart(v8, bindings[8])), bindLen > 9 && (value += _addInterpolationPart(v9, bindings[9]));
                                var renderNode$$1 = asTextData(view, def.nodeIndex).renderText;
                                view.renderer.setValue(renderNode$$1, value);
                            }
                            return changed;
                        }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                      case 16384:
                        return function checkAndUpdateDirectiveInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                            var providerData = asProviderData(view, def.nodeIndex), directive = providerData.instance, changed = !1, changes = void 0, bindLen = def.bindings.length;
                            return bindLen > 0 && checkBinding(view, def, 0, v0) && (changed = !0, changes = updateProp(view, providerData, def, 0, v0, changes)), 
                            bindLen > 1 && checkBinding(view, def, 1, v1) && (changed = !0, changes = updateProp(view, providerData, def, 1, v1, changes)), 
                            bindLen > 2 && checkBinding(view, def, 2, v2) && (changed = !0, changes = updateProp(view, providerData, def, 2, v2, changes)), 
                            bindLen > 3 && checkBinding(view, def, 3, v3) && (changed = !0, changes = updateProp(view, providerData, def, 3, v3, changes)), 
                            bindLen > 4 && checkBinding(view, def, 4, v4) && (changed = !0, changes = updateProp(view, providerData, def, 4, v4, changes)), 
                            bindLen > 5 && checkBinding(view, def, 5, v5) && (changed = !0, changes = updateProp(view, providerData, def, 5, v5, changes)), 
                            bindLen > 6 && checkBinding(view, def, 6, v6) && (changed = !0, changes = updateProp(view, providerData, def, 6, v6, changes)), 
                            bindLen > 7 && checkBinding(view, def, 7, v7) && (changed = !0, changes = updateProp(view, providerData, def, 7, v7, changes)), 
                            bindLen > 8 && checkBinding(view, def, 8, v8) && (changed = !0, changes = updateProp(view, providerData, def, 8, v8, changes)), 
                            bindLen > 9 && checkBinding(view, def, 9, v9) && (changed = !0, changes = updateProp(view, providerData, def, 9, v9, changes)), 
                            changes && directive.ngOnChanges(changes), 65536 & def.flags && shouldCallLifecycleInitHook(view, 256, def.nodeIndex) && directive.ngOnInit(), 
                            262144 & def.flags && directive.ngDoCheck(), changed;
                        }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                      case 32:
                      case 64:
                      case 128:
                        return function checkAndUpdatePureExpressionInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                            var bindings = def.bindings, changed = !1, bindLen = bindings.length;
                            if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0) && (changed = !0), bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1) && (changed = !0), 
                            bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2) && (changed = !0), bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3) && (changed = !0), 
                            bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4) && (changed = !0), bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5) && (changed = !0), 
                            bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6) && (changed = !0), bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7) && (changed = !0), 
                            bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8) && (changed = !0), bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9) && (changed = !0), 
                            changed) {
                                var data = asPureExpressionData(view, def.nodeIndex), value = void 0;
                                switch (201347067 & def.flags) {
                                  case 32:
                                    value = new Array(bindings.length), bindLen > 0 && (value[0] = v0), bindLen > 1 && (value[1] = v1), 
                                    bindLen > 2 && (value[2] = v2), bindLen > 3 && (value[3] = v3), bindLen > 4 && (value[4] = v4), 
                                    bindLen > 5 && (value[5] = v5), bindLen > 6 && (value[6] = v6), bindLen > 7 && (value[7] = v7), 
                                    bindLen > 8 && (value[8] = v8), bindLen > 9 && (value[9] = v9);
                                    break;

                                  case 64:
                                    value = {}, bindLen > 0 && (value[bindings[0].name] = v0), bindLen > 1 && (value[bindings[1].name] = v1), 
                                    bindLen > 2 && (value[bindings[2].name] = v2), bindLen > 3 && (value[bindings[3].name] = v3), 
                                    bindLen > 4 && (value[bindings[4].name] = v4), bindLen > 5 && (value[bindings[5].name] = v5), 
                                    bindLen > 6 && (value[bindings[6].name] = v6), bindLen > 7 && (value[bindings[7].name] = v7), 
                                    bindLen > 8 && (value[bindings[8].name] = v8), bindLen > 9 && (value[bindings[9].name] = v9);
                                    break;

                                  case 128:
                                    var pipe = v0;
                                    switch (bindLen) {
                                      case 1:
                                        value = pipe.transform(v0);
                                        break;

                                      case 2:
                                        value = pipe.transform(v1);
                                        break;

                                      case 3:
                                        value = pipe.transform(v1, v2);
                                        break;

                                      case 4:
                                        value = pipe.transform(v1, v2, v3);
                                        break;

                                      case 5:
                                        value = pipe.transform(v1, v2, v3, v4);
                                        break;

                                      case 6:
                                        value = pipe.transform(v1, v2, v3, v4, v5);
                                        break;

                                      case 7:
                                        value = pipe.transform(v1, v2, v3, v4, v5, v6);
                                        break;

                                      case 8:
                                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7);
                                        break;

                                      case 9:
                                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8);
                                        break;

                                      case 10:
                                        value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8, v9);
                                    }
                                }
                                data.value = value;
                            }
                            return changed;
                        }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                      default:
                        throw "unreachable";
                    }
                }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) : function checkAndUpdateNodeDynamic(view, nodeDef, values) {
                    switch (201347067 & nodeDef.flags) {
                      case 1:
                        return function checkAndUpdateElementDynamic(view, def, values) {
                            for (var changed = !1, i = 0; i < values.length; i++) checkAndUpdateElementValue(view, def, i, values[i]) && (changed = !0);
                            return changed;
                        }(view, nodeDef, values);

                      case 2:
                        return function checkAndUpdateTextDynamic(view, def, values) {
                            for (var bindings = def.bindings, changed = !1, i = 0; i < values.length; i++) checkAndUpdateBinding(view, def, i, values[i]) && (changed = !0);
                            if (changed) {
                                var value = "";
                                for (i = 0; i < values.length; i++) value += _addInterpolationPart(values[i], bindings[i]);
                                value = def.text.prefix + value;
                                var renderNode$$1 = asTextData(view, def.nodeIndex).renderText;
                                view.renderer.setValue(renderNode$$1, value);
                            }
                            return changed;
                        }(view, nodeDef, values);

                      case 16384:
                        return function checkAndUpdateDirectiveDynamic(view, def, values) {
                            for (var providerData = asProviderData(view, def.nodeIndex), directive = providerData.instance, changed = !1, changes = void 0, i = 0; i < values.length; i++) checkBinding(view, def, i, values[i]) && (changed = !0, 
                            changes = updateProp(view, providerData, def, i, values[i], changes));
                            return changes && directive.ngOnChanges(changes), 65536 & def.flags && shouldCallLifecycleInitHook(view, 256, def.nodeIndex) && directive.ngOnInit(), 
                            262144 & def.flags && directive.ngDoCheck(), changed;
                        }(view, nodeDef, values);

                      case 32:
                      case 64:
                      case 128:
                        return function checkAndUpdatePureExpressionDynamic(view, def, values) {
                            for (var bindings = def.bindings, changed = !1, i = 0; i < values.length; i++) checkAndUpdateBinding(view, def, i, values[i]) && (changed = !0);
                            if (changed) {
                                var data = asPureExpressionData(view, def.nodeIndex), value = void 0;
                                switch (201347067 & def.flags) {
                                  case 32:
                                    value = values;
                                    break;

                                  case 64:
                                    for (value = {}, i = 0; i < values.length; i++) value[bindings[i].name] = values[i];
                                    break;

                                  case 128:
                                    var pipe = values[0], params = values.slice(1);
                                    value = pipe.transform.apply(pipe, params);
                                }
                                data.value = value;
                            }
                            return changed;
                        }(view, nodeDef, values);

                      default:
                        throw "unreachable";
                    }
                }(view, nodeDef, v0);
            }
            function markProjectedViewsForCheck(view) {
                var def = view.def;
                if (4 & def.nodeFlags) for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    if (4 & nodeDef.flags) {
                        var projectedViews = asElementData(view, i).template._projectedViews;
                        if (projectedViews) for (var i_1 = 0; i_1 < projectedViews.length; i_1++) {
                            var projectedView = projectedViews[i_1];
                            projectedView.state |= 32, markParentViewsForCheckProjectedViews(projectedView, view);
                        }
                    } else 0 == (4 & nodeDef.childFlags) && (i += nodeDef.childCount);
                }
            }
            function checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                return 0 === argStyle ? function checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                    var bindLen = nodeDef.bindings.length;
                    bindLen > 0 && checkBindingNoChanges(view, nodeDef, 0, v0);
                    bindLen > 1 && checkBindingNoChanges(view, nodeDef, 1, v1);
                    bindLen > 2 && checkBindingNoChanges(view, nodeDef, 2, v2);
                    bindLen > 3 && checkBindingNoChanges(view, nodeDef, 3, v3);
                    bindLen > 4 && checkBindingNoChanges(view, nodeDef, 4, v4);
                    bindLen > 5 && checkBindingNoChanges(view, nodeDef, 5, v5);
                    bindLen > 6 && checkBindingNoChanges(view, nodeDef, 6, v6);
                    bindLen > 7 && checkBindingNoChanges(view, nodeDef, 7, v7);
                    bindLen > 8 && checkBindingNoChanges(view, nodeDef, 8, v8);
                    bindLen > 9 && checkBindingNoChanges(view, nodeDef, 9, v9);
                }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) : function checkNoChangesNodeDynamic(view, nodeDef, values) {
                    for (var i = 0; i < values.length; i++) checkBindingNoChanges(view, nodeDef, i, values[i]);
                }(view, nodeDef, v0), !1;
            }
            function checkNoChangesQuery(view, nodeDef) {
                if (asQueryList(view, nodeDef.nodeIndex).dirty) throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, nodeDef.nodeIndex), "Query " + nodeDef.query.id + " not dirty", "Query " + nodeDef.query.id + " dirty", 0 != (1 & view.state));
            }
            function destroyView(view) {
                if (!(128 & view.state)) {
                    if (execEmbeddedViewsAction(view, ViewAction.Destroy), execComponentViewsAction(view, ViewAction.Destroy), 
                    callLifecycleHooksChildrenFirst(view, 131072), view.disposables) for (var i = 0; i < view.disposables.length; i++) view.disposables[i]();
                    !function detachProjectedView(view) {
                        if (16 & view.state) {
                            var dvcElementData = declaredViewContainer(view);
                            if (dvcElementData) {
                                var projectedViews = dvcElementData.template._projectedViews;
                                projectedViews && (removeFromArray(projectedViews, projectedViews.indexOf(view)), 
                                Services.dirtyParentQueries(view));
                            }
                        }
                    }(view), view.renderer.destroyNode && function destroyViewNodes(view) {
                        for (var len = view.def.nodes.length, i = 0; i < len; i++) {
                            var def = view.def.nodes[i];
                            1 & def.flags ? view.renderer.destroyNode(asElementData(view, i).renderElement) : 2 & def.flags ? view.renderer.destroyNode(asTextData(view, i).renderText) : (67108864 & def.flags || 134217728 & def.flags) && asQueryList(view, i).destroy();
                        }
                    }(view), isComponentView(view) && view.renderer.destroy(), view.state |= 128;
                }
            }
            function execComponentViewsAction(view, action) {
                var def = view.def;
                if (33554432 & def.nodeFlags) for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    33554432 & nodeDef.flags ? callViewAction(asElementData(view, i).componentView, action) : 0 == (33554432 & nodeDef.childFlags) && (i += nodeDef.childCount);
                }
            }
            function execEmbeddedViewsAction(view, action) {
                var def = view.def;
                if (16777216 & def.nodeFlags) for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    if (16777216 & nodeDef.flags) for (var embeddedViews = asElementData(view, i).viewContainer._embeddedViews, k = 0; k < embeddedViews.length; k++) callViewAction(embeddedViews[k], action); else 0 == (16777216 & nodeDef.childFlags) && (i += nodeDef.childCount);
                }
            }
            function callViewAction(view, action) {
                var viewState = view.state;
                switch (action) {
                  case ViewAction.CheckNoChanges:
                    0 == (128 & viewState) && (12 == (12 & viewState) ? checkNoChangesView(view) : 64 & viewState && execProjectedViewsAction(view, ViewAction.CheckNoChangesProjectedViews));
                    break;

                  case ViewAction.CheckNoChangesProjectedViews:
                    0 == (128 & viewState) && (32 & viewState ? checkNoChangesView(view) : 64 & viewState && execProjectedViewsAction(view, action));
                    break;

                  case ViewAction.CheckAndUpdate:
                    0 == (128 & viewState) && (12 == (12 & viewState) ? checkAndUpdateView(view) : 64 & viewState && execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews));
                    break;

                  case ViewAction.CheckAndUpdateProjectedViews:
                    0 == (128 & viewState) && (32 & viewState ? checkAndUpdateView(view) : 64 & viewState && execProjectedViewsAction(view, action));
                    break;

                  case ViewAction.Destroy:
                    destroyView(view);
                    break;

                  case ViewAction.CreateViewNodes:
                    createViewNodes(view);
                }
            }
            function execProjectedViewsAction(view, action) {
                execEmbeddedViewsAction(view, action), execComponentViewsAction(view, action);
            }
            function execQueriesAction(view, queryFlags, staticDynamicQueryFlag, checkType) {
                if (view.def.nodeFlags & queryFlags && view.def.nodeFlags & staticDynamicQueryFlag) for (var nodeCount = view.def.nodes.length, i = 0; i < nodeCount; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (nodeDef.flags & queryFlags && nodeDef.flags & staticDynamicQueryFlag) switch (Services.setCurrentNode(view, nodeDef.nodeIndex), 
                    checkType) {
                      case 0:
                        checkAndUpdateQuery(view, nodeDef);
                        break;

                      case 1:
                        checkNoChangesQuery(view, nodeDef);
                    }
                    nodeDef.childFlags & queryFlags && nodeDef.childFlags & staticDynamicQueryFlag || (i += nodeDef.childCount);
                }
            }
            function initServicesIfNeeded() {
                if (!initialized) {
                    initialized = !0;
                    var services = isDevMode() ? function createDebugServices() {
                        return {
                            setCurrentNode: debugSetCurrentNode,
                            createRootView: debugCreateRootView,
                            createEmbeddedView: debugCreateEmbeddedView,
                            createComponentView: debugCreateComponentView,
                            createNgModuleRef: debugCreateNgModuleRef,
                            overrideProvider: debugOverrideProvider,
                            overrideComponentView: debugOverrideComponentView,
                            clearOverrides: debugClearOverrides,
                            checkAndUpdateView: debugCheckAndUpdateView,
                            checkNoChangesView: debugCheckNoChangesView,
                            destroyView: debugDestroyView,
                            createDebugContext: function(view, nodeIndex) {
                                return new DebugContext_(view, nodeIndex);
                            },
                            handleEvent: debugHandleEvent,
                            updateDirectives: debugUpdateDirectives,
                            updateRenderer: debugUpdateRenderer
                        };
                    }() : function createProdServices() {
                        return {
                            setCurrentNode: function() {},
                            createRootView: createProdRootView,
                            createEmbeddedView: createEmbeddedView,
                            createComponentView: createComponentView,
                            createNgModuleRef: createNgModuleRef,
                            overrideProvider: NOOP,
                            overrideComponentView: NOOP,
                            clearOverrides: NOOP,
                            checkAndUpdateView: checkAndUpdateView,
                            checkNoChangesView: checkNoChangesView,
                            destroyView: destroyView,
                            createDebugContext: function(view, nodeIndex) {
                                return new DebugContext_(view, nodeIndex);
                            },
                            handleEvent: function(view, nodeIndex, eventName, event) {
                                return view.def.handleEvent(view, nodeIndex, eventName, event);
                            },
                            updateDirectives: function(view, checkType) {
                                return view.def.updateDirectives(0 === checkType ? prodCheckAndUpdateNode : prodCheckNoChangesNode, view);
                            },
                            updateRenderer: function(view, checkType) {
                                return view.def.updateRenderer(0 === checkType ? prodCheckAndUpdateNode : prodCheckNoChangesNode, view);
                            }
                        };
                    }();
                    Services.setCurrentNode = services.setCurrentNode, Services.createRootView = services.createRootView, 
                    Services.createEmbeddedView = services.createEmbeddedView, Services.createComponentView = services.createComponentView, 
                    Services.createNgModuleRef = services.createNgModuleRef, Services.overrideProvider = services.overrideProvider, 
                    Services.overrideComponentView = services.overrideComponentView, Services.clearOverrides = services.clearOverrides, 
                    Services.checkAndUpdateView = services.checkAndUpdateView, Services.checkNoChangesView = services.checkNoChangesView, 
                    Services.destroyView = services.destroyView, Services.resolveDep = resolveDep, Services.createDebugContext = services.createDebugContext, 
                    Services.handleEvent = services.handleEvent, Services.updateDirectives = services.updateDirectives, 
                    Services.updateRenderer = services.updateRenderer, Services.dirtyParentQueries = dirtyParentQueries;
                }
            }
            function createProdRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
                return createRootView(createRootData(elInjector, ngModule, ngModule.injector.get(RendererFactory2), projectableNodes, rootSelectorOrNode), def, context);
            }
            function debugCreateRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
                var rendererFactory = ngModule.injector.get(RendererFactory2), root = createRootData(elInjector, ngModule, new DebugRendererFactory2(rendererFactory), projectableNodes, rootSelectorOrNode), defWithOverride = applyProviderOverridesToView(def);
                return callWithDebugContext(DebugAction.create, createRootView, null, [ root, defWithOverride, context ]);
            }
            function createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode) {
                var sanitizer = ngModule.injector.get(Sanitizer), errorHandler = ngModule.injector.get(ErrorHandler);
                return {
                    ngModule: ngModule,
                    injector: elInjector,
                    projectableNodes: projectableNodes,
                    selectorOrNode: rootSelectorOrNode,
                    sanitizer: sanitizer,
                    rendererFactory: rendererFactory,
                    renderer: rendererFactory.createRenderer(null, null),
                    errorHandler: errorHandler
                };
            }
            function debugCreateEmbeddedView(parentView, anchorDef, viewDef$$1, context) {
                var defWithOverride = applyProviderOverridesToView(viewDef$$1);
                return callWithDebugContext(DebugAction.create, createEmbeddedView, null, [ parentView, anchorDef, defWithOverride, context ]);
            }
            function debugCreateComponentView(parentView, nodeDef, viewDef$$1, hostElement) {
                var overrideComponentView = viewDefOverrides.get(nodeDef.element.componentProvider.provider.token);
                return viewDef$$1 = overrideComponentView || applyProviderOverridesToView(viewDef$$1), 
                callWithDebugContext(DebugAction.create, createComponentView, null, [ parentView, nodeDef, viewDef$$1, hostElement ]);
            }
            function debugCreateNgModuleRef(moduleType, parentInjector, bootstrapComponents, def) {
                return createNgModuleRef(moduleType, parentInjector, bootstrapComponents, function applyProviderOverridesToNgModule(def) {
                    var _a = function calcHasOverrides(def) {
                        var hasOverrides = !1, hasDeprecatedOverrides = !1;
                        if (0 === providerOverrides.size) return {
                            hasOverrides: hasOverrides,
                            hasDeprecatedOverrides: hasDeprecatedOverrides
                        };
                        return def.providers.forEach(function(node) {
                            var override = providerOverrides.get(node.token);
                            3840 & node.flags && override && (hasOverrides = !0, hasDeprecatedOverrides = hasDeprecatedOverrides || override.deprecatedBehavior);
                        }), {
                            hasOverrides: hasOverrides,
                            hasDeprecatedOverrides: hasDeprecatedOverrides
                        };
                    }(def), hasOverrides = _a.hasOverrides, hasDeprecatedOverrides = _a.hasDeprecatedOverrides;
                    if (!hasOverrides) return def;
                    return function applyProviderOverrides(def) {
                        for (var i = 0; i < def.providers.length; i++) {
                            var provider = def.providers[i];
                            hasDeprecatedOverrides && (provider.flags |= 4096);
                            var override = providerOverrides.get(provider.token);
                            override && (provider.flags = -3841 & provider.flags | override.flags, provider.deps = splitDepsDsl(override.deps), 
                            provider.value = override.value);
                        }
                    }(def = def.factory(function() {
                        return NOOP;
                    })), def;
                }(def));
            }
            function debugOverrideProvider(override) {
                providerOverrides.set(override.token, override);
            }
            function debugOverrideComponentView(comp, compFactory) {
                var compViewDef = resolveDefinition(resolveDefinition(function getComponentViewDefinitionFactory(componentFactory) {
                    return componentFactory.viewDefFactory;
                }(compFactory)).nodes[0].element.componentView);
                viewDefOverrides.set(comp, compViewDef);
            }
            function debugClearOverrides() {
                providerOverrides.clear(), viewDefOverrides.clear();
            }
            function applyProviderOverridesToView(def) {
                function applyProviderOverridesToElement(viewDef$$1, elIndex) {
                    for (var i = elIndex + 1; i < viewDef$$1.nodes.length; i++) {
                        var nodeDef = viewDef$$1.nodes[i];
                        if (1 & nodeDef.flags) return;
                        if (3840 & nodeDef.flags) {
                            var provider = nodeDef.provider, override = providerOverrides.get(provider.token);
                            override && (nodeDef.flags = -3841 & nodeDef.flags | override.flags, provider.deps = splitDepsDsl(override.deps), 
                            provider.value = override.value);
                        }
                    }
                }
                if (0 === providerOverrides.size) return def;
                var elementIndicesWithOverwrittenProviders = function findElementIndicesWithOverwrittenProviders(def) {
                    for (var elIndicesWithOverwrittenProviders = [], lastElementDef = null, i = 0; i < def.nodes.length; i++) {
                        var nodeDef = def.nodes[i];
                        1 & nodeDef.flags && (lastElementDef = nodeDef), lastElementDef && 3840 & nodeDef.flags && providerOverrides.has(nodeDef.provider.token) && (elIndicesWithOverwrittenProviders.push(lastElementDef.nodeIndex), 
                        lastElementDef = null);
                    }
                    return elIndicesWithOverwrittenProviders;
                }(def);
                if (0 === elementIndicesWithOverwrittenProviders.length) return def;
                def = def.factory(function() {
                    return NOOP;
                });
                for (var i = 0; i < elementIndicesWithOverwrittenProviders.length; i++) applyProviderOverridesToElement(def, elementIndicesWithOverwrittenProviders[i]);
                return def;
            }
            function prodCheckAndUpdateNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var nodeDef = view.def.nodes[checkIndex];
                return checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9), 
                224 & nodeDef.flags ? asPureExpressionData(view, checkIndex).value : void 0;
            }
            function prodCheckNoChangesNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var nodeDef = view.def.nodes[checkIndex];
                return checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9), 
                224 & nodeDef.flags ? asPureExpressionData(view, checkIndex).value : void 0;
            }
            function debugCheckAndUpdateView(view) {
                return callWithDebugContext(DebugAction.detectChanges, checkAndUpdateView, null, [ view ]);
            }
            function debugCheckNoChangesView(view) {
                return callWithDebugContext(DebugAction.checkNoChanges, checkNoChangesView, null, [ view ]);
            }
            function debugDestroyView(view) {
                return callWithDebugContext(DebugAction.destroy, destroyView, null, [ view ]);
            }
            function debugSetCurrentNode(view, nodeIndex) {
                _currentView = view, _currentNodeIndex = nodeIndex;
            }
            function debugHandleEvent(view, nodeIndex, eventName, event) {
                return debugSetCurrentNode(view, nodeIndex), callWithDebugContext(DebugAction.handleEvent, view.def.handleEvent, null, [ view, nodeIndex, eventName, event ]);
            }
            function debugUpdateDirectives(view, checkType) {
                if (128 & view.state) throw viewDestroyedError(DebugAction[_currentAction]);
                return debugSetCurrentNode(view, nextDirectiveWithBinding(view, 0)), view.def.updateDirectives(function debugCheckDirectivesFn(view, nodeIndex, argStyle) {
                    for (var values = [], _i = 3; _i < arguments.length; _i++) values[_i - 3] = arguments[_i];
                    var nodeDef = view.def.nodes[nodeIndex];
                    return 0 === checkType ? debugCheckAndUpdateNode(view, nodeDef, argStyle, values) : debugCheckNoChangesNode(view, nodeDef, argStyle, values), 
                    16384 & nodeDef.flags && debugSetCurrentNode(view, nextDirectiveWithBinding(view, nodeIndex)), 
                    224 & nodeDef.flags ? asPureExpressionData(view, nodeDef.nodeIndex).value : void 0;
                }, view);
            }
            function debugUpdateRenderer(view, checkType) {
                if (128 & view.state) throw viewDestroyedError(DebugAction[_currentAction]);
                return debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0)), view.def.updateRenderer(function debugCheckRenderNodeFn(view, nodeIndex, argStyle) {
                    for (var values = [], _i = 3; _i < arguments.length; _i++) values[_i - 3] = arguments[_i];
                    var nodeDef = view.def.nodes[nodeIndex];
                    return 0 === checkType ? debugCheckAndUpdateNode(view, nodeDef, argStyle, values) : debugCheckNoChangesNode(view, nodeDef, argStyle, values), 
                    3 & nodeDef.flags && debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex)), 
                    224 & nodeDef.flags ? asPureExpressionData(view, nodeDef.nodeIndex).value : void 0;
                }, view);
            }
            function debugCheckAndUpdateNode(view, nodeDef, argStyle, givenValues) {
                if (checkAndUpdateNode.apply(void 0, [ view, nodeDef, argStyle ].concat(givenValues))) {
                    var values = 1 === argStyle ? givenValues[0] : givenValues;
                    if (16384 & nodeDef.flags) {
                        for (var bindingValues = {}, i = 0; i < nodeDef.bindings.length; i++) {
                            var binding = nodeDef.bindings[i], value = values[i];
                            8 & binding.flags && (bindingValues[normalizeDebugBindingName(binding.nonMinifiedName)] = normalizeDebugBindingValue(value));
                        }
                        var elDef = nodeDef.parent, el = asElementData(view, elDef.nodeIndex).renderElement;
                        if (elDef.element.name) for (var attr in bindingValues) {
                            null != (value = bindingValues[attr]) ? view.renderer.setAttribute(el, attr, value) : view.renderer.removeAttribute(el, attr);
                        } else view.renderer.setValue(el, "bindings=" + JSON.stringify(bindingValues, null, 2));
                    }
                }
            }
            function debugCheckNoChangesNode(view, nodeDef, argStyle, values) {
                checkNoChangesNode.apply(void 0, [ view, nodeDef, argStyle ].concat(values));
            }
            function normalizeDebugBindingName(name) {
                return "ng-reflect-" + (name = function camelCaseToDashCase(input) {
                    return input.replace(CAMEL_CASE_REGEXP, function() {
                        for (var m = [], _i = 0; _i < arguments.length; _i++) m[_i] = arguments[_i];
                        return "-" + m[1].toLowerCase();
                    });
                }(name.replace(/[$@]/g, "_")));
            }
            function normalizeDebugBindingValue(value) {
                try {
                    return null != value ? value.toString().slice(0, 30) : value;
                } catch (e) {
                    return "[ERROR] Exception while trying to serialize the value";
                }
            }
            function nextDirectiveWithBinding(view, nodeIndex) {
                for (var i = nodeIndex; i < view.def.nodes.length; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (16384 & nodeDef.flags && nodeDef.bindings && nodeDef.bindings.length) return i;
                }
                return null;
            }
            function nextRenderNodeWithBinding(view, nodeIndex) {
                for (var i = nodeIndex; i < view.def.nodes.length; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (3 & nodeDef.flags && nodeDef.bindings && nodeDef.bindings.length) return i;
                }
                return null;
            }
            function collectReferences(view, nodeDef, references) {
                for (var refName in nodeDef.references) references[refName] = getQueryValue(view, nodeDef, nodeDef.references[refName]);
            }
            function callWithDebugContext(action, fn, self, args) {
                var oldAction = _currentAction, oldView = _currentView, oldNodeIndex = _currentNodeIndex;
                try {
                    _currentAction = action;
                    var result = fn.apply(self, args);
                    return _currentView = oldView, _currentNodeIndex = oldNodeIndex, _currentAction = oldAction, 
                    result;
                } catch (e) {
                    if (function isViewDebugError(err) {
                        return !!getDebugContext(err);
                    }(e) || !_currentView) throw e;
                    throw function viewWrappedDebugError(err, context) {
                        return err instanceof Error || (err = new Error(err.toString())), _addDebugContext(err, context), 
                        err;
                    }(e, getCurrentDebugContext());
                }
            }
            function getCurrentDebugContext() {
                return _currentView ? new DebugContext_(_currentView, _currentNodeIndex) : null;
            }
            function createNgModuleFactory(ngModuleType, bootstrapComponents, defFactory) {
                return new NgModuleFactory_(ngModuleType, bootstrapComponents, defFactory);
            }
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return ApplicationRef;
            }), __webpack_require__.d(__webpack_exports__, "T", function() {
                return enableProdMode;
            }), __webpack_require__.d(__webpack_exports__, "W", function() {
                return isDevMode;
            }), __webpack_require__.d(__webpack_exports__, "S", function() {
                return createPlatformFactory;
            }), __webpack_require__.d(__webpack_exports__, "y", function() {
                return NgProbeToken;
            }), __webpack_require__.d(__webpack_exports__, "a", function() {
                return APP_ID;
            }), __webpack_require__.d(__webpack_exports__, "D", function() {
                return PLATFORM_INITIALIZER;
            }), __webpack_require__.d(__webpack_exports__, "C", function() {
                return PLATFORM_ID;
            }), __webpack_require__.d(__webpack_exports__, "b", function() {
                return APP_INITIALIZER;
            }), __webpack_require__.d(__webpack_exports__, "c", function() {
                return ApplicationInitStatus;
            }), __webpack_require__.d(__webpack_exports__, "V", function() {
                return getDebugNode;
            }), __webpack_require__.d(__webpack_exports__, "N", function() {
                return Testability;
            }), __webpack_require__.d(__webpack_exports__, "Y", function() {
                return setTestabilityGetter;
            }), __webpack_require__.d(__webpack_exports__, "v", function() {
                return LOCALE_ID;
            }), __webpack_require__.d(__webpack_exports__, "d", function() {
                return ApplicationModule;
            }), __webpack_require__.d(__webpack_exports__, "m", function() {
                return EventEmitter;
            }), __webpack_require__.d(__webpack_exports__, "l", function() {
                return ErrorHandler;
            }), __webpack_require__.d(__webpack_exports__, "I", function() {
                return Sanitizer;
            }), __webpack_require__.d(__webpack_exports__, "J", function() {
                return SecurityContext;
            }), __webpack_require__.d(__webpack_exports__, "f", function() {
                return Attribute;
            }), __webpack_require__.d(__webpack_exports__, "j", function() {
                return Directive;
            }), __webpack_require__.d(__webpack_exports__, "s", function() {
                return Input;
            }), __webpack_require__.d(__webpack_exports__, "B", function() {
                return Output;
            }), __webpack_require__.d(__webpack_exports__, "E", function() {
                return Pipe;
            }), __webpack_require__.d(__webpack_exports__, "w", function() {
                return NgModule;
            }), __webpack_require__.d(__webpack_exports__, "Q", function() {
                return ViewEncapsulation;
            }), __webpack_require__.d(__webpack_exports__, "O", function() {
                return Version;
            }), __webpack_require__.d(__webpack_exports__, "U", function() {
                return forwardRef;
            }), __webpack_require__.d(__webpack_exports__, "r", function() {
                return Injector;
            }), __webpack_require__.d(__webpack_exports__, "q", function() {
                return InjectionToken;
            }), __webpack_require__.d(__webpack_exports__, "o", function() {
                return Inject;
            }), __webpack_require__.d(__webpack_exports__, "A", function() {
                return Optional;
            }), __webpack_require__.d(__webpack_exports__, "p", function() {
                return Injectable;
            }), __webpack_require__.d(__webpack_exports__, "K", function() {
                return Self;
            }), __webpack_require__.d(__webpack_exports__, "L", function() {
                return SkipSelf;
            }), __webpack_require__.d(__webpack_exports__, "n", function() {
                return Host;
            }), __webpack_require__.d(__webpack_exports__, "z", function() {
                return NgZone;
            }), __webpack_require__.d(__webpack_exports__, "F", function() {
                return Renderer2;
            }), __webpack_require__.d(__webpack_exports__, "G", function() {
                return RendererFactory2;
            }), __webpack_require__.d(__webpack_exports__, "H", function() {
                return RendererStyleFlags2;
            }), __webpack_require__.d(__webpack_exports__, "h", function() {
                return Compiler;
            }), __webpack_require__.d(__webpack_exports__, "i", function() {
                return ComponentFactoryResolver;
            }), __webpack_require__.d(__webpack_exports__, "k", function() {
                return ElementRef;
            }), __webpack_require__.d(__webpack_exports__, "x", function() {
                return NgModuleRef;
            }), __webpack_require__.d(__webpack_exports__, "M", function() {
                return TemplateRef;
            }), __webpack_require__.d(__webpack_exports__, "P", function() {
                return ViewContainerRef;
            }), __webpack_require__.d(__webpack_exports__, "g", function() {
                return ChangeDetectorRef;
            }), __webpack_require__.d(__webpack_exports__, "t", function() {
                return IterableDiffers;
            }), __webpack_require__.d(__webpack_exports__, "u", function() {
                return KeyValueDiffers;
            }), __webpack_require__.d(__webpack_exports__, "R", function() {
                return WrappedValue;
            }), __webpack_require__.d(__webpack_exports__, "X", function() {
                return platformCore;
            }), __webpack_require__.d(__webpack_exports__, "_8", function() {
                return isListLikeIterable;
            }), __webpack_require__.d(__webpack_exports__, "_0", function() {
                return Console;
            }), __webpack_require__.d(__webpack_exports__, "Z", function() {
                return CodegenComponentFactoryResolver;
            }), __webpack_require__.d(__webpack_exports__, "_7", function() {
                return _global;
            }), __webpack_require__.d(__webpack_exports__, "_13", function() {
                return looseIdentical;
            }), __webpack_require__.d(__webpack_exports__, "_19", function() {
                return stringify;
            }), __webpack_require__.d(__webpack_exports__, "_9", function() {
                return isObservable;
            }), __webpack_require__.d(__webpack_exports__, "_10", function() {
                return isPromise;
            }), __webpack_require__.d(__webpack_exports__, "_1", function() {
                return createComponentFactory;
            }), __webpack_require__.d(__webpack_exports__, "_2", function() {
                return createNgModuleFactory;
            }), __webpack_require__.d(__webpack_exports__, "_3", function() {
                return createRendererType2;
            }), __webpack_require__.d(__webpack_exports__, "_4", function() {
                return directiveDef;
            }), __webpack_require__.d(__webpack_exports__, "_5", function() {
                return elementDef;
            }), __webpack_require__.d(__webpack_exports__, "_15", function() {
                return moduleDef;
            }), __webpack_require__.d(__webpack_exports__, "_16", function() {
                return moduleProvideDef;
            }), __webpack_require__.d(__webpack_exports__, "_17", function() {
                return nodeValue;
            }), __webpack_require__.d(__webpack_exports__, "_18", function() {
                return providerDef;
            }), __webpack_require__.d(__webpack_exports__, "_20", function() {
                return textDef;
            }), __webpack_require__.d(__webpack_exports__, "_21", function() {
                return viewDef;
            }), __webpack_require__.d(__webpack_exports__, "_11", function() {
                return _iterableDiffersFactory;
            }), __webpack_require__.d(__webpack_exports__, "_12", function() {
                return _keyValueDiffersFactory;
            }), __webpack_require__.d(__webpack_exports__, "_14", function() {
                return _localeFactory;
            }), __webpack_require__.d(__webpack_exports__, "_6", function() {
                return _appIdRandomProviderFactory;
            });
            var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("6Xbx"), __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("AP4T"), __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_merge__ = __webpack_require__("2kLc"), __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_share__ = __webpack_require__("URbD"), __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("TO51"), InjectionToken = function() {
                function InjectionToken(_desc) {
                    this._desc = _desc, this.ngMetadataName = "InjectionToken";
                }
                return InjectionToken.prototype.toString = function() {
                    return "InjectionToken " + this._desc;
                }, InjectionToken;
            }(), ANNOTATIONS = "__annotations__", PARAMETERS = "__paramaters__", PROP_METADATA = "__prop__metadata__", Attribute = (new InjectionToken("AnalyzeForEntryComponents"), 
            makeParamDecorator("Attribute", function(attributeName) {
                return {
                    attributeName: attributeName
                };
            })), Query = function() {
                return function Query() {};
            }(), ChangeDetectionStrategy = (makePropDecorator("ContentChildren", function(selector, data) {
                return void 0 === data && (data = {}), Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({
                    selector: selector,
                    first: !1,
                    isViewQuery: !1,
                    descendants: !1
                }, data);
            }, Query), makePropDecorator("ContentChild", function(selector, data) {
                return void 0 === data && (data = {}), Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({
                    selector: selector,
                    first: !0,
                    isViewQuery: !1,
                    descendants: !0
                }, data);
            }, Query), makePropDecorator("ViewChildren", function(selector, data) {
                return void 0 === data && (data = {}), Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({
                    selector: selector,
                    first: !1,
                    isViewQuery: !0,
                    descendants: !0
                }, data);
            }, Query), makePropDecorator("ViewChild", function(selector, data) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({
                    selector: selector,
                    first: !0,
                    isViewQuery: !0,
                    descendants: !0
                }, data);
            }, Query), {
                OnPush: 0,
                Default: 1
            });
            ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = "OnPush", ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = "Default";
            var ChangeDetectorStatus = {
                CheckOnce: 0,
                Checked: 1,
                CheckAlways: 2,
                Detached: 3,
                Errored: 4,
                Destroyed: 5
            };
            ChangeDetectorStatus[ChangeDetectorStatus.CheckOnce] = "CheckOnce", ChangeDetectorStatus[ChangeDetectorStatus.Checked] = "Checked", 
            ChangeDetectorStatus[ChangeDetectorStatus.CheckAlways] = "CheckAlways", ChangeDetectorStatus[ChangeDetectorStatus.Detached] = "Detached", 
            ChangeDetectorStatus[ChangeDetectorStatus.Errored] = "Errored", ChangeDetectorStatus[ChangeDetectorStatus.Destroyed] = "Destroyed";
            var Directive = makeDecorator("Directive", function(dir) {
                return void 0 === dir && (dir = {}), dir;
            }), Pipe = (makeDecorator("Component", function(c) {
                return void 0 === c && (c = {}), Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({
                    changeDetection: ChangeDetectionStrategy.Default
                }, c);
            }, Directive), makeDecorator("Pipe", function(p) {
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.a)({
                    pure: !0
                }, p);
            })), Input = makePropDecorator("Input", function(bindingPropertyName) {
                return {
                    bindingPropertyName: bindingPropertyName
                };
            }), Output = makePropDecorator("Output", function(bindingPropertyName) {
                return {
                    bindingPropertyName: bindingPropertyName
                };
            }), NgModule = (makePropDecorator("HostBinding", function(hostPropertyName) {
                return {
                    hostPropertyName: hostPropertyName
                };
            }), makePropDecorator("HostListener", function(eventName, args) {
                return {
                    eventName: eventName,
                    args: args
                };
            }), makeDecorator("NgModule", function(ngModule) {
                return ngModule;
            })), ViewEncapsulation = {
                Emulated: 0,
                Native: 1,
                None: 2
            };
            ViewEncapsulation[ViewEncapsulation.Emulated] = "Emulated", ViewEncapsulation[ViewEncapsulation.Native] = "Native", 
            ViewEncapsulation[ViewEncapsulation.None] = "None";
            var trace, events, _platform, Version = function() {
                return function Version(full) {
                    this.full = full, this.major = full.split(".")[0], this.minor = full.split(".")[1], 
                    this.patch = full.split(".").slice(2).join(".");
                };
            }(), VERSION = new Version("5.1.2"), Inject = makeParamDecorator("Inject", function(token) {
                return {
                    token: token
                };
            }), Optional = makeParamDecorator("Optional"), Injectable = makeDecorator("Injectable"), Self = makeParamDecorator("Self"), SkipSelf = makeParamDecorator("SkipSelf"), Host = makeParamDecorator("Host"), __window = "undefined" != typeof window && window, __self = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self, _global = __window || void 0 !== global && global || __self, _symbolIterator = null, _THROW_IF_NOT_FOUND = new Object(), THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND, _NullInjector = function() {
                function _NullInjector() {}
                return _NullInjector.prototype.get = function(token, notFoundValue) {
                    if (void 0 === notFoundValue && (notFoundValue = _THROW_IF_NOT_FOUND), notFoundValue === _THROW_IF_NOT_FOUND) throw new Error("NullInjectorError: No provider for " + stringify(token) + "!");
                    return notFoundValue;
                }, _NullInjector;
            }(), Injector = function() {
                function Injector() {}
                return Injector.create = function(providers, parent) {
                    return new StaticInjector(providers, parent);
                }, Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND, Injector.NULL = new _NullInjector(), 
                Injector;
            }(), IDENT = function(value) {
                return value;
            }, EMPTY = [], CIRCULAR = IDENT, MULTI_PROVIDER_FN = function() {
                return Array.prototype.slice.call(arguments);
            }, GET_PROPERTY_NAME = {}, USE_VALUE = function getClosureSafeProperty(objWithPropertyToExtract) {
                for (var key in objWithPropertyToExtract) if (objWithPropertyToExtract[key] === GET_PROPERTY_NAME) return key;
                throw Error("!prop");
            }({
                provide: String,
                useValue: GET_PROPERTY_NAME
            }), NG_TEMP_TOKEN_PATH = "ngTempTokenPath", NULL_INJECTOR = Injector.NULL, NEW_LINE = /\n/gm, NO_NEW_LINE = "\u0275", StaticInjector = function() {
                function StaticInjector(providers, parent) {
                    void 0 === parent && (parent = NULL_INJECTOR), this.parent = parent;
                    var records = this._records = new Map();
                    records.set(Injector, {
                        token: Injector,
                        fn: IDENT,
                        deps: EMPTY,
                        value: this,
                        useNew: !1
                    }), recursivelyProcessProviders(records, providers);
                }
                return StaticInjector.prototype.get = function(token, notFoundValue) {
                    var record = this._records.get(token);
                    try {
                        return tryResolveToken(token, record, this._records, this.parent, notFoundValue);
                    } catch (e) {
                        var tokenPath = e[NG_TEMP_TOKEN_PATH];
                        throw e.message = formatError("\n" + e.message, tokenPath), e.ngTokenPath = tokenPath, 
                        e[NG_TEMP_TOKEN_PATH] = null, e;
                    }
                }, StaticInjector.prototype.toString = function() {
                    var tokens = [];
                    return this._records.forEach(function(v, token) {
                        return tokens.push(stringify(token));
                    }), "StaticInjector[" + tokens.join(", ") + "]";
                }, StaticInjector;
            }(), ERROR_DEBUG_CONTEXT = "ngDebugContext", ERROR_ORIGINAL_ERROR = "ngOriginalError", ERROR_LOGGER = "ngErrorLogger", ErrorHandler = function() {
                function ErrorHandler() {
                    this._console = console;
                }
                return ErrorHandler.prototype.handleError = function(error) {
                    var originalError = this._findOriginalError(error), context = this._findContext(error), errorLogger = function getErrorLogger(error) {
                        return error[ERROR_LOGGER] || defaultErrorLogger;
                    }(error);
                    errorLogger(this._console, "ERROR", error), originalError && errorLogger(this._console, "ORIGINAL ERROR", originalError), 
                    context && errorLogger(this._console, "ERROR CONTEXT", context);
                }, ErrorHandler.prototype._findContext = function(error) {
                    return error ? getDebugContext(error) ? getDebugContext(error) : this._findContext(getOriginalError(error)) : null;
                }, ErrorHandler.prototype._findOriginalError = function(error) {
                    for (var e = getOriginalError(error); e && getOriginalError(e); ) e = getOriginalError(e);
                    return e;
                }, ErrorHandler;
            }(), ReflectiveKey = function() {
                function ReflectiveKey(token, id) {
                    if (this.token = token, this.id = id, !token) throw new Error("Token must be defined!");
                    this.displayName = stringify(this.token);
                }
                return ReflectiveKey.get = function(token) {
                    return _globalKeyRegistry.get(resolveForwardRef(token));
                }, Object.defineProperty(ReflectiveKey, "numberOfKeys", {
                    get: function() {
                        return _globalKeyRegistry.numberOfKeys;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ReflectiveKey;
            }(), _globalKeyRegistry = new (function() {
                function KeyRegistry() {
                    this._allKeys = new Map();
                }
                return KeyRegistry.prototype.get = function(token) {
                    if (token instanceof ReflectiveKey) return token;
                    if (this._allKeys.has(token)) return this._allKeys.get(token);
                    var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
                    return this._allKeys.set(token, newKey), newKey;
                }, Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
                    get: function() {
                        return this._allKeys.size;
                    },
                    enumerable: !0,
                    configurable: !0
                }), KeyRegistry;
            }())(), Type = Function, DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/, ReflectionCapabilities = function() {
                function ReflectionCapabilities(reflect) {
                    this._reflect = reflect || _global.Reflect;
                }
                return ReflectionCapabilities.prototype.isReflectionEnabled = function() {
                    return !0;
                }, ReflectionCapabilities.prototype.factory = function(t) {
                    return function() {
                        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                        return new (t.bind.apply(t, [ void 0 ].concat(args)))();
                    };
                }, ReflectionCapabilities.prototype._zipTypesAndAnnotations = function(paramTypes, paramAnnotations) {
                    var result;
                    result = void 0 === paramTypes ? new Array(paramAnnotations.length) : new Array(paramTypes.length);
                    for (var i = 0; i < result.length; i++) void 0 === paramTypes ? result[i] = [] : paramTypes[i] != Object ? result[i] = [ paramTypes[i] ] : result[i] = [], 
                    paramAnnotations && null != paramAnnotations[i] && (result[i] = result[i].concat(paramAnnotations[i]));
                    return result;
                }, ReflectionCapabilities.prototype._ownParameters = function(type, parentCtor) {
                    if (DELEGATE_CTOR.exec(type.toString())) return null;
                    if (type.parameters && type.parameters !== parentCtor.parameters) return type.parameters;
                    var tsickleCtorParams = type.ctorParameters;
                    if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
                        var ctorParameters = "function" == typeof tsickleCtorParams ? tsickleCtorParams() : tsickleCtorParams, paramTypes_1 = ctorParameters.map(function(ctorParam) {
                            return ctorParam && ctorParam.type;
                        }), paramAnnotations_1 = ctorParameters.map(function(ctorParam) {
                            return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
                        });
                        return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
                    }
                    var paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS], paramTypes = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", type);
                    return paramTypes || paramAnnotations ? this._zipTypesAndAnnotations(paramTypes, paramAnnotations) : new Array(type.length).fill(void 0);
                }, ReflectionCapabilities.prototype.parameters = function(type) {
                    if (!isType(type)) return [];
                    var parentCtor = getParentCtor(type), parameters = this._ownParameters(type, parentCtor);
                    return parameters || parentCtor === Object || (parameters = this.parameters(parentCtor)), 
                    parameters || [];
                }, ReflectionCapabilities.prototype._ownAnnotations = function(typeOrFunc, parentCtor) {
                    if (typeOrFunc.annotations && typeOrFunc.annotations !== parentCtor.annotations) {
                        var annotations = typeOrFunc.annotations;
                        return "function" == typeof annotations && annotations.annotations && (annotations = annotations.annotations), 
                        annotations;
                    }
                    return typeOrFunc.decorators && typeOrFunc.decorators !== parentCtor.decorators ? convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators) : typeOrFunc.hasOwnProperty(ANNOTATIONS) ? typeOrFunc[ANNOTATIONS] : null;
                }, ReflectionCapabilities.prototype.annotations = function(typeOrFunc) {
                    if (!isType(typeOrFunc)) return [];
                    var parentCtor = getParentCtor(typeOrFunc), ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
                    return (parentCtor !== Object ? this.annotations(parentCtor) : []).concat(ownAnnotations);
                }, ReflectionCapabilities.prototype._ownPropMetadata = function(typeOrFunc, parentCtor) {
                    if (typeOrFunc.propMetadata && typeOrFunc.propMetadata !== parentCtor.propMetadata) {
                        var propMetadata = typeOrFunc.propMetadata;
                        return "function" == typeof propMetadata && propMetadata.propMetadata && (propMetadata = propMetadata.propMetadata), 
                        propMetadata;
                    }
                    if (typeOrFunc.propDecorators && typeOrFunc.propDecorators !== parentCtor.propDecorators) {
                        var propDecorators_1 = typeOrFunc.propDecorators, propMetadata_1 = {};
                        return Object.keys(propDecorators_1).forEach(function(prop) {
                            propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
                        }), propMetadata_1;
                    }
                    return typeOrFunc.hasOwnProperty(PROP_METADATA) ? typeOrFunc[PROP_METADATA] : null;
                }, ReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
                    if (!isType(typeOrFunc)) return {};
                    var parentCtor = getParentCtor(typeOrFunc), propMetadata = {};
                    if (parentCtor !== Object) {
                        var parentPropMetadata_1 = this.propMetadata(parentCtor);
                        Object.keys(parentPropMetadata_1).forEach(function(propName) {
                            propMetadata[propName] = parentPropMetadata_1[propName];
                        });
                    }
                    var ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
                    return ownPropMetadata && Object.keys(ownPropMetadata).forEach(function(propName) {
                        var decorators = [];
                        propMetadata.hasOwnProperty(propName) && decorators.push.apply(decorators, propMetadata[propName]), 
                        decorators.push.apply(decorators, ownPropMetadata[propName]), propMetadata[propName] = decorators;
                    }), propMetadata;
                }, ReflectionCapabilities.prototype.hasLifecycleHook = function(type, lcProperty) {
                    return type instanceof Type && lcProperty in type.prototype;
                }, ReflectionCapabilities.prototype.getter = function(name) {
                    return new Function("o", "return o." + name + ";");
                }, ReflectionCapabilities.prototype.setter = function(name) {
                    return new Function("o", "v", "return o." + name + " = v;");
                }, ReflectionCapabilities.prototype.method = function(name) {
                    return new Function("o", "args", "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);");
                }, ReflectionCapabilities.prototype.importUri = function(type) {
                    return "object" == typeof type && type.filePath ? type.filePath : "./" + stringify(type);
                }, ReflectionCapabilities.prototype.resourceUri = function(type) {
                    return "./" + stringify(type);
                }, ReflectionCapabilities.prototype.resolveIdentifier = function(name, moduleUrl, members, runtime) {
                    return runtime;
                }, ReflectionCapabilities.prototype.resolveEnum = function(enumIdentifier, name) {
                    return enumIdentifier[name];
                }, ReflectionCapabilities;
            }(), reflector = new (function() {
                function Reflector(reflectionCapabilities) {
                    this.reflectionCapabilities = reflectionCapabilities;
                }
                return Reflector.prototype.updateCapabilities = function(caps) {
                    this.reflectionCapabilities = caps;
                }, Reflector.prototype.factory = function(type) {
                    return this.reflectionCapabilities.factory(type);
                }, Reflector.prototype.parameters = function(typeOrFunc) {
                    return this.reflectionCapabilities.parameters(typeOrFunc);
                }, Reflector.prototype.annotations = function(typeOrFunc) {
                    return this.reflectionCapabilities.annotations(typeOrFunc);
                }, Reflector.prototype.propMetadata = function(typeOrFunc) {
                    return this.reflectionCapabilities.propMetadata(typeOrFunc);
                }, Reflector.prototype.hasLifecycleHook = function(type, lcProperty) {
                    return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
                }, Reflector.prototype.getter = function(name) {
                    return this.reflectionCapabilities.getter(name);
                }, Reflector.prototype.setter = function(name) {
                    return this.reflectionCapabilities.setter(name);
                }, Reflector.prototype.method = function(name) {
                    return this.reflectionCapabilities.method(name);
                }, Reflector.prototype.importUri = function(type) {
                    return this.reflectionCapabilities.importUri(type);
                }, Reflector.prototype.resourceUri = function(type) {
                    return this.reflectionCapabilities.resourceUri(type);
                }, Reflector.prototype.resolveIdentifier = function(name, moduleUrl, members, runtime) {
                    return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
                }, Reflector.prototype.resolveEnum = function(identifier, name) {
                    return this.reflectionCapabilities.resolveEnum(identifier, name);
                }, Reflector;
            }())(new ReflectionCapabilities()), ReflectiveDependency = function() {
                function ReflectiveDependency(key, optional, visibility) {
                    this.key = key, this.optional = optional, this.visibility = visibility;
                }
                return ReflectiveDependency.fromKey = function(key) {
                    return new ReflectiveDependency(key, !1, null);
                }, ReflectiveDependency;
            }(), _EMPTY_LIST = [], ResolvedReflectiveProvider_ = function() {
                function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
                    this.key = key, this.resolvedFactories = resolvedFactories, this.multiProvider = multiProvider;
                }
                return Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
                    get: function() {
                        return this.resolvedFactories[0];
                    },
                    enumerable: !0,
                    configurable: !0
                }), ResolvedReflectiveProvider_;
            }(), ResolvedReflectiveFactory = function() {
                return function ResolvedReflectiveFactory(factory, dependencies) {
                    this.factory = factory, this.dependencies = dependencies;
                };
            }(), UNDEFINED = new Object(), ReflectiveInjector = function() {
                function ReflectiveInjector() {}
                return ReflectiveInjector.resolve = function(providers) {
                    return resolveReflectiveProviders(providers);
                }, ReflectiveInjector.resolveAndCreate = function(providers, parent) {
                    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
                    return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
                }, ReflectiveInjector.fromResolvedProviders = function(providers, parent) {
                    return new ReflectiveInjector_(providers, parent);
                }, ReflectiveInjector;
            }(), ReflectiveInjector_ = function() {
                function ReflectiveInjector_(_providers, _parent) {
                    this._constructionCounter = 0, this._providers = _providers, this.parent = _parent || null;
                    var len = _providers.length;
                    this.keyIds = new Array(len), this.objs = new Array(len);
                    for (var i = 0; i < len; i++) this.keyIds[i] = _providers[i].key.id, this.objs[i] = UNDEFINED;
                }
                return ReflectiveInjector_.prototype.get = function(token, notFoundValue) {
                    return void 0 === notFoundValue && (notFoundValue = THROW_IF_NOT_FOUND), this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
                }, ReflectiveInjector_.prototype.resolveAndCreateChild = function(providers) {
                    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
                    return this.createChildFromResolved(ResolvedReflectiveProviders);
                }, ReflectiveInjector_.prototype.createChildFromResolved = function(providers) {
                    var inj = new ReflectiveInjector_(providers);
                    return inj.parent = this, inj;
                }, ReflectiveInjector_.prototype.resolveAndInstantiate = function(provider) {
                    return this.instantiateResolved(ReflectiveInjector.resolve([ provider ])[0]);
                }, ReflectiveInjector_.prototype.instantiateResolved = function(provider) {
                    return this._instantiateProvider(provider);
                }, ReflectiveInjector_.prototype.getProviderAtIndex = function(index) {
                    if (index < 0 || index >= this._providers.length) throw function outOfBoundsError(index) {
                        return Error("Index " + index + " is out-of-bounds.");
                    }(index);
                    return this._providers[index];
                }, ReflectiveInjector_.prototype._new = function(provider) {
                    if (this._constructionCounter++ > this._getMaxNumberOfObjects()) throw function cyclicDependencyError(injector, key) {
                        return injectionError(injector, key, function(keys) {
                            return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
                        });
                    }(this, provider.key);
                    return this._instantiateProvider(provider);
                }, ReflectiveInjector_.prototype._getMaxNumberOfObjects = function() {
                    return this.objs.length;
                }, ReflectiveInjector_.prototype._instantiateProvider = function(provider) {
                    if (provider.multiProvider) {
                        for (var res = new Array(provider.resolvedFactories.length), i = 0; i < provider.resolvedFactories.length; ++i) res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
                        return res;
                    }
                    return this._instantiate(provider, provider.resolvedFactories[0]);
                }, ReflectiveInjector_.prototype._instantiate = function(provider, ResolvedReflectiveFactory$$1) {
                    var deps, _this = this, factory = ResolvedReflectiveFactory$$1.factory;
                    try {
                        deps = ResolvedReflectiveFactory$$1.dependencies.map(function(dep) {
                            return _this._getByReflectiveDependency(dep);
                        });
                    } catch (e) {
                        throw e.addKey && e.addKey(this, provider.key), e;
                    }
                    var obj;
                    try {
                        obj = factory.apply(void 0, deps);
                    } catch (e) {
                        throw function instantiationError(injector, originalException, originalStack, key) {
                            return injectionError(injector, key, function(keys) {
                                var first = stringify(keys[0].token);
                                return originalException.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".";
                            }, originalException);
                        }(this, e, e.stack, provider.key);
                    }
                    return obj;
                }, ReflectiveInjector_.prototype._getByReflectiveDependency = function(dep) {
                    return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
                }, ReflectiveInjector_.prototype._getByKey = function(key, visibility, notFoundValue) {
                    return key === ReflectiveInjector_.INJECTOR_KEY ? this : visibility instanceof Self ? this._getByKeySelf(key, notFoundValue) : this._getByKeyDefault(key, notFoundValue, visibility);
                }, ReflectiveInjector_.prototype._getObjByKeyId = function(keyId) {
                    for (var i = 0; i < this.keyIds.length; i++) if (this.keyIds[i] === keyId) return this.objs[i] === UNDEFINED && (this.objs[i] = this._new(this._providers[i])), 
                    this.objs[i];
                    return UNDEFINED;
                }, ReflectiveInjector_.prototype._throwOrNull = function(key, notFoundValue) {
                    if (notFoundValue !== THROW_IF_NOT_FOUND) return notFoundValue;
                    throw function noProviderError(injector, key) {
                        return injectionError(injector, key, function(keys) {
                            return "No provider for " + stringify(keys[0].token) + "!" + constructResolvingPath(keys);
                        });
                    }(this, key);
                }, ReflectiveInjector_.prototype._getByKeySelf = function(key, notFoundValue) {
                    var obj = this._getObjByKeyId(key.id);
                    return obj !== UNDEFINED ? obj : this._throwOrNull(key, notFoundValue);
                }, ReflectiveInjector_.prototype._getByKeyDefault = function(key, notFoundValue, visibility) {
                    var inj;
                    for (inj = visibility instanceof SkipSelf ? this.parent : this; inj instanceof ReflectiveInjector_; ) {
                        var inj_ = inj, obj = inj_._getObjByKeyId(key.id);
                        if (obj !== UNDEFINED) return obj;
                        inj = inj_.parent;
                    }
                    return null !== inj ? inj.get(key.token, notFoundValue) : this._throwOrNull(key, notFoundValue);
                }, Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
                    get: function() {
                        return "ReflectiveInjector(providers: [" + function _mapProviders(injector, fn) {
                            for (var res = new Array(injector._providers.length), i = 0; i < injector._providers.length; ++i) res[i] = fn(injector.getProviderAtIndex(i));
                            return res;
                        }(this, function(b) {
                            return ' "' + b.key.displayName + '" ';
                        }).join(", ") + "])";
                    },
                    enumerable: !0,
                    configurable: !0
                }), ReflectiveInjector_.prototype.toString = function() {
                    return this.displayName;
                }, ReflectiveInjector_.INJECTOR_KEY = ReflectiveKey.get(Injector), ReflectiveInjector_;
            }(), APP_INITIALIZER = new InjectionToken("Application Initializer"), ApplicationInitStatus = function() {
                function ApplicationInitStatus(appInits) {
                    var _this = this;
                    this.appInits = appInits, this.initialized = !1, this.done = !1, this.donePromise = new Promise(function(res, rej) {
                        _this.resolve = res, _this.reject = rej;
                    });
                }
                return ApplicationInitStatus.prototype.runInitializers = function() {
                    var _this = this;
                    if (!this.initialized) {
                        var asyncInitPromises = [], complete = function() {
                            _this.done = !0, _this.resolve();
                        };
                        if (this.appInits) for (var i = 0; i < this.appInits.length; i++) {
                            var initResult = this.appInits[i]();
                            isPromise(initResult) && asyncInitPromises.push(initResult);
                        }
                        Promise.all(asyncInitPromises).then(function() {
                            complete();
                        }).catch(function(e) {
                            _this.reject(e);
                        }), 0 === asyncInitPromises.length && complete(), this.initialized = !0;
                    }
                }, ApplicationInitStatus.decorators = [ {
                    type: Injectable
                } ], ApplicationInitStatus.ctorParameters = function() {
                    return [ {
                        type: Array,
                        decorators: [ {
                            type: Inject,
                            args: [ APP_INITIALIZER ]
                        }, {
                            type: Optional
                        } ]
                    } ];
                }, ApplicationInitStatus;
            }(), APP_ID = new InjectionToken("AppId"), APP_ID_RANDOM_PROVIDER = {
                provide: APP_ID,
                useFactory: _appIdRandomProviderFactory,
                deps: []
            }, PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer"), PLATFORM_ID = new InjectionToken("Platform ID"), APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener"), Console = (new InjectionToken("Application Packages Root URL"), 
            function() {
                function Console() {}
                return Console.prototype.log = function(message) {
                    console.log(message);
                }, Console.prototype.warn = function(message) {
                    console.warn(message);
                }, Console.decorators = [ {
                    type: Injectable
                } ], Console.ctorParameters = function() {
                    return [];
                }, Console;
            }()), Compiler = (function() {
            }(), function() {
                function Compiler() {}
                return Compiler.prototype.compileModuleSync = function(moduleType) {
                    throw _throwError();
                }, Compiler.prototype.compileModuleAsync = function(moduleType) {
                    throw _throwError();
                }, Compiler.prototype.compileModuleAndAllComponentsSync = function(moduleType) {
                    throw _throwError();
                }, Compiler.prototype.compileModuleAndAllComponentsAsync = function(moduleType) {
                    throw _throwError();
                }, Compiler.prototype.clearCache = function() {}, Compiler.prototype.clearCacheFor = function(type) {}, 
                Compiler.decorators = [ {
                    type: Injectable
                } ], Compiler.ctorParameters = function() {
                    return [];
                }, Compiler;
            }()), CompilerFactory = (new InjectionToken("compilerOptions"), function() {
                return function CompilerFactory() {};
            }()), ComponentRef = function() {
                return function ComponentRef() {};
            }(), ComponentFactory = function() {
                return function ComponentFactory() {};
            }(), ERROR_COMPONENT = "ngComponent", _NullComponentFactoryResolver = function() {
                function _NullComponentFactoryResolver() {}
                return _NullComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                    throw noComponentFactoryError(component);
                }, _NullComponentFactoryResolver;
            }(), ComponentFactoryResolver = function() {
                function ComponentFactoryResolver() {}
                return ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver(), ComponentFactoryResolver;
            }(), CodegenComponentFactoryResolver = function() {
                function CodegenComponentFactoryResolver(factories, _parent, _ngModule) {
                    this._parent = _parent, this._ngModule = _ngModule, this._factories = new Map();
                    for (var i = 0; i < factories.length; i++) {
                        var factory = factories[i];
                        this._factories.set(factory.componentType, factory);
                    }
                }
                return CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                    var factory = this._factories.get(component);
                    if (!factory && this._parent && (factory = this._parent.resolveComponentFactory(component)), 
                    !factory) throw noComponentFactoryError(component);
                    return new ComponentFactoryBoundToModule(factory, this._ngModule);
                }, CodegenComponentFactoryResolver;
            }(), ComponentFactoryBoundToModule = function(_super) {
                function ComponentFactoryBoundToModule(factory, ngModule) {
                    var _this = _super.call(this) || this;
                    return _this.factory = factory, _this.ngModule = ngModule, _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(ComponentFactoryBoundToModule, _super), 
                Object.defineProperty(ComponentFactoryBoundToModule.prototype, "selector", {
                    get: function() {
                        return this.factory.selector;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentFactoryBoundToModule.prototype, "componentType", {
                    get: function() {
                        return this.factory.componentType;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentFactoryBoundToModule.prototype, "ngContentSelectors", {
                    get: function() {
                        return this.factory.ngContentSelectors;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentFactoryBoundToModule.prototype, "inputs", {
                    get: function() {
                        return this.factory.inputs;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentFactoryBoundToModule.prototype, "outputs", {
                    get: function() {
                        return this.factory.outputs;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ComponentFactoryBoundToModule.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                    return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
                }, ComponentFactoryBoundToModule;
            }(ComponentFactory), NgModuleRef = function() {
                return function NgModuleRef() {};
            }(), NgModuleFactory = function() {
                return function NgModuleFactory() {};
            }(), wtfEnabled = function detectWTF() {
                var wtf = _global.wtf;
                return !(!wtf || !(trace = wtf.trace) || (events = trace.events, 0));
            }(), wtfCreateScope = wtfEnabled ? function createScope(signature, flags) {
                return void 0 === flags && (flags = null), events.createScope(signature, flags);
            } : function(signature, flags) {
                return noopScope;
            }, wtfLeave = wtfEnabled ? function leave(scope, returnValue) {
                return trace.leaveScope(scope, returnValue), returnValue;
            } : function(s, r) {
                return r;
            }, EventEmitter = function(_super) {
                function EventEmitter(isAsync) {
                    void 0 === isAsync && (isAsync = !1);
                    var _this = _super.call(this) || this;
                    return _this.__isAsync = isAsync, _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(EventEmitter, _super), EventEmitter.prototype.emit = function(value) {
                    _super.prototype.next.call(this, value);
                }, EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
                    var schedulerFn, errorFn = function(err) {
                        return null;
                    }, completeFn = function() {
                        return null;
                    };
                    return generatorOrNext && "object" == typeof generatorOrNext ? (schedulerFn = this.__isAsync ? function(value) {
                        setTimeout(function() {
                            return generatorOrNext.next(value);
                        });
                    } : function(value) {
                        generatorOrNext.next(value);
                    }, generatorOrNext.error && (errorFn = this.__isAsync ? function(err) {
                        setTimeout(function() {
                            return generatorOrNext.error(err);
                        });
                    } : function(err) {
                        generatorOrNext.error(err);
                    }), generatorOrNext.complete && (completeFn = this.__isAsync ? function() {
                        setTimeout(function() {
                            return generatorOrNext.complete();
                        });
                    } : function() {
                        generatorOrNext.complete();
                    })) : (schedulerFn = this.__isAsync ? function(value) {
                        setTimeout(function() {
                            return generatorOrNext(value);
                        });
                    } : function(value) {
                        generatorOrNext(value);
                    }, error && (errorFn = this.__isAsync ? function(err) {
                        setTimeout(function() {
                            return error(err);
                        });
                    } : function(err) {
                        error(err);
                    }), complete && (completeFn = this.__isAsync ? function() {
                        setTimeout(function() {
                            return complete();
                        });
                    } : function() {
                        complete();
                    })), _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
                }, EventEmitter;
            }(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__.a), NgZone = function() {
                function NgZone(_a) {
                    var _b = _a.enableLongStackTrace, enableLongStackTrace = void 0 !== _b && _b;
                    if (this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, 
                    this.onUnstable = new EventEmitter(!1), this.onMicrotaskEmpty = new EventEmitter(!1), 
                    this.onStable = new EventEmitter(!1), this.onError = new EventEmitter(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                    Zone.assertZonePatched();
                    this._nesting = 0, this._outer = this._inner = Zone.current, Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)), 
                    enableLongStackTrace && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)), 
                    function forkInnerZoneWithAngularBehavior(zone) {
                        zone._inner = zone._inner.fork({
                            name: "angular",
                            properties: {
                                isAngularZone: !0
                            },
                            onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
                                try {
                                    return onEnter(zone), delegate.invokeTask(target, task, applyThis, applyArgs);
                                } finally {
                                    onLeave(zone);
                                }
                            },
                            onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
                                try {
                                    return onEnter(zone), delegate.invoke(target, callback, applyThis, applyArgs, source);
                                } finally {
                                    onLeave(zone);
                                }
                            },
                            onHasTask: function(delegate, current, target, hasTaskState) {
                                delegate.hasTask(target, hasTaskState), current === target && ("microTask" == hasTaskState.change ? (zone.hasPendingMicrotasks = hasTaskState.microTask, 
                                checkStable(zone)) : "macroTask" == hasTaskState.change && (zone.hasPendingMacrotasks = hasTaskState.macroTask));
                            },
                            onHandleError: function(delegate, current, target, error) {
                                return delegate.handleError(target, error), zone.runOutsideAngular(function() {
                                    return zone.onError.emit(error);
                                }), !1;
                            }
                        });
                    }(this);
                }
                return NgZone.isInAngularZone = function() {
                    return !0 === Zone.current.get("isAngularZone");
                }, NgZone.assertInAngularZone = function() {
                    if (!NgZone.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!");
                }, NgZone.assertNotInAngularZone = function() {
                    if (NgZone.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!");
                }, NgZone.prototype.run = function(fn, applyThis, applyArgs) {
                    return this._inner.run(fn, applyThis, applyArgs);
                }, NgZone.prototype.runTask = function(fn, applyThis, applyArgs, name) {
                    var zone = this._inner, task = zone.scheduleEventTask("NgZoneEvent: " + name, fn, EMPTY_PAYLOAD, noop, noop);
                    try {
                        return zone.runTask(task, applyThis, applyArgs);
                    } finally {
                        zone.cancelTask(task);
                    }
                }, NgZone.prototype.runGuarded = function(fn, applyThis, applyArgs) {
                    return this._inner.runGuarded(fn, applyThis, applyArgs);
                }, NgZone.prototype.runOutsideAngular = function(fn) {
                    return this._outer.run(fn);
                }, NgZone;
            }(), EMPTY_PAYLOAD = {}, NoopNgZone = function() {
                function NoopNgZone() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, 
                    this.onUnstable = new EventEmitter(), this.onMicrotaskEmpty = new EventEmitter(), 
                    this.onStable = new EventEmitter(), this.onError = new EventEmitter();
                }
                return NoopNgZone.prototype.run = function(fn) {
                    return fn();
                }, NoopNgZone.prototype.runGuarded = function(fn) {
                    return fn();
                }, NoopNgZone.prototype.runOutsideAngular = function(fn) {
                    return fn();
                }, NoopNgZone.prototype.runTask = function(fn) {
                    return fn();
                }, NoopNgZone;
            }(), Testability = function() {
                function Testability(_ngZone) {
                    this._ngZone = _ngZone, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, 
                    this._callbacks = [], this._watchAngularEvents();
                }
                return Testability.prototype._watchAngularEvents = function() {
                    var _this = this;
                    this._ngZone.onUnstable.subscribe({
                        next: function() {
                            _this._didWork = !0, _this._isZoneStable = !1;
                        }
                    }), this._ngZone.runOutsideAngular(function() {
                        _this._ngZone.onStable.subscribe({
                            next: function() {
                                NgZone.assertNotInAngularZone(), scheduleMicroTask(function() {
                                    _this._isZoneStable = !0, _this._runCallbacksIfReady();
                                });
                            }
                        });
                    });
                }, Testability.prototype.increasePendingRequestCount = function() {
                    return this._pendingCount += 1, this._didWork = !0, this._pendingCount;
                }, Testability.prototype.decreasePendingRequestCount = function() {
                    if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(), this._pendingCount;
                }, Testability.prototype.isStable = function() {
                    return this._isZoneStable && 0 == this._pendingCount && !this._ngZone.hasPendingMacrotasks;
                }, Testability.prototype._runCallbacksIfReady = function() {
                    var _this = this;
                    this.isStable() ? scheduleMicroTask(function() {
                        for (;0 !== _this._callbacks.length; ) _this._callbacks.pop()(_this._didWork);
                        _this._didWork = !1;
                    }) : this._didWork = !0;
                }, Testability.prototype.whenStable = function(callback) {
                    this._callbacks.push(callback), this._runCallbacksIfReady();
                }, Testability.prototype.getPendingRequestCount = function() {
                    return this._pendingCount;
                }, Testability.prototype.findProviders = function(using, provider, exactMatch) {
                    return [];
                }, Testability.decorators = [ {
                    type: Injectable
                } ], Testability.ctorParameters = function() {
                    return [ {
                        type: NgZone
                    } ];
                }, Testability;
            }(), TestabilityRegistry = function() {
                function TestabilityRegistry() {
                    this._applications = new Map(), _testabilityGetter.addToWindow(this);
                }
                return TestabilityRegistry.prototype.registerApplication = function(token, testability) {
                    this._applications.set(token, testability);
                }, TestabilityRegistry.prototype.unregisterApplication = function(token) {
                    this._applications.delete(token);
                }, TestabilityRegistry.prototype.unregisterAllApplications = function() {
                    this._applications.clear();
                }, TestabilityRegistry.prototype.getTestability = function(elem) {
                    return this._applications.get(elem) || null;
                }, TestabilityRegistry.prototype.getAllTestabilities = function() {
                    return Array.from(this._applications.values());
                }, TestabilityRegistry.prototype.getAllRootElements = function() {
                    return Array.from(this._applications.keys());
                }, TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
                    return void 0 === findInAncestors && (findInAncestors = !0), _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
                }, TestabilityRegistry.decorators = [ {
                    type: Injectable
                } ], TestabilityRegistry.ctorParameters = function() {
                    return [];
                }, TestabilityRegistry;
            }(), _testabilityGetter = new (function() {
                function _NoopGetTestability() {}
                return _NoopGetTestability.prototype.addToWindow = function(registry) {}, _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
                    return null;
                }, _NoopGetTestability;
            }())(), _devMode = !0, _runModeLocked = !1, ALLOW_MULTIPLE_PLATFORMS = new InjectionToken("AllowMultipleToken"), NgProbeToken = function() {
                return function NgProbeToken(name, token) {
                    this.name = name, this.token = token;
                };
            }(), PlatformRef = function() {
                function PlatformRef(_injector) {
                    this._injector = _injector, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
                }
                return PlatformRef.prototype.bootstrapModuleFactory = function(moduleFactory, options) {
                    var _this = this, ngZone = function getNgZone(ngZoneOption) {
                        return "noop" === ngZoneOption ? new NoopNgZone() : ("zone.js" === ngZoneOption ? void 0 : ngZoneOption) || new NgZone({
                            enableLongStackTrace: isDevMode()
                        });
                    }(options ? options.ngZone : void 0);
                    return ngZone.run(function() {
                        var ngZoneInjector = Injector.create([ {
                            provide: NgZone,
                            useValue: ngZone
                        } ], _this.injector), moduleRef = moduleFactory.create(ngZoneInjector), exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                        if (!exceptionHandler) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                        return moduleRef.onDestroy(function() {
                            return remove(_this._modules, moduleRef);
                        }), ngZone.runOutsideAngular(function() {
                            return ngZone.onError.subscribe({
                                next: function(error) {
                                    exceptionHandler.handleError(error);
                                }
                            });
                        }), function _callAndReportToErrorHandler(errorHandler, ngZone, callback) {
                            try {
                                var result = callback();
                                return isPromise(result) ? result.catch(function(e) {
                                    throw ngZone.runOutsideAngular(function() {
                                        return errorHandler.handleError(e);
                                    }), e;
                                }) : result;
                            } catch (e) {
                                throw ngZone.runOutsideAngular(function() {
                                    return errorHandler.handleError(e);
                                }), e;
                            }
                        }(exceptionHandler, ngZone, function() {
                            var initStatus = moduleRef.injector.get(ApplicationInitStatus);
                            return initStatus.runInitializers(), initStatus.donePromise.then(function() {
                                return _this._moduleDoBootstrap(moduleRef), moduleRef;
                            });
                        });
                    });
                }, PlatformRef.prototype.bootstrapModule = function(moduleType, compilerOptions) {
                    var _this = this;
                    void 0 === compilerOptions && (compilerOptions = []);
                    var compilerFactory = this.injector.get(CompilerFactory), options = optionsReducer({}, compilerOptions);
                    return compilerFactory.createCompiler([ options ]).compileModuleAsync(moduleType).then(function(moduleFactory) {
                        return _this.bootstrapModuleFactory(moduleFactory, options);
                    });
                }, PlatformRef.prototype._moduleDoBootstrap = function(moduleRef) {
                    var appRef = moduleRef.injector.get(ApplicationRef);
                    if (moduleRef._bootstrapComponents.length > 0) moduleRef._bootstrapComponents.forEach(function(f) {
                        return appRef.bootstrap(f);
                    }); else {
                        if (!moduleRef.instance.ngDoBootstrap) throw new Error("The module " + stringify(moduleRef.instance.constructor) + ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.');
                        moduleRef.instance.ngDoBootstrap(appRef);
                    }
                    this._modules.push(moduleRef);
                }, PlatformRef.prototype.onDestroy = function(callback) {
                    this._destroyListeners.push(callback);
                }, Object.defineProperty(PlatformRef.prototype, "injector", {
                    get: function() {
                        return this._injector;
                    },
                    enumerable: !0,
                    configurable: !0
                }), PlatformRef.prototype.destroy = function() {
                    if (this._destroyed) throw new Error("The platform has already been destroyed!");
                    this._modules.slice().forEach(function(module) {
                        return module.destroy();
                    }), this._destroyListeners.forEach(function(listener) {
                        return listener();
                    }), this._destroyed = !0;
                }, Object.defineProperty(PlatformRef.prototype, "destroyed", {
                    get: function() {
                        return this._destroyed;
                    },
                    enumerable: !0,
                    configurable: !0
                }), PlatformRef.decorators = [ {
                    type: Injectable
                } ], PlatformRef.ctorParameters = function() {
                    return [ {
                        type: Injector
                    } ];
                }, PlatformRef;
            }(), ApplicationRef = function() {
                function ApplicationRef(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
                    var _this = this;
                    this._zone = _zone, this._console = _console, this._injector = _injector, this._exceptionHandler = _exceptionHandler, 
                    this._componentFactoryResolver = _componentFactoryResolver, this._initStatus = _initStatus, 
                    this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._enforceNoNewChanges = !1, 
                    this._stable = !0, this.componentTypes = [], this.components = [], this._enforceNoNewChanges = isDevMode(), 
                    this._zone.onMicrotaskEmpty.subscribe({
                        next: function() {
                            _this._zone.run(function() {
                                _this.tick();
                            });
                        }
                    });
                    var isCurrentlyStable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__.a(function(observer) {
                        _this._stable = _this._zone.isStable && !_this._zone.hasPendingMacrotasks && !_this._zone.hasPendingMicrotasks, 
                        _this._zone.runOutsideAngular(function() {
                            observer.next(_this._stable), observer.complete();
                        });
                    }), isStable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__.a(function(observer) {
                        var stableSub;
                        _this._zone.runOutsideAngular(function() {
                            stableSub = _this._zone.onStable.subscribe(function() {
                                NgZone.assertNotInAngularZone(), scheduleMicroTask(function() {
                                    _this._stable || _this._zone.hasPendingMacrotasks || _this._zone.hasPendingMicrotasks || (_this._stable = !0, 
                                    observer.next(!0));
                                });
                            });
                        });
                        var unstableSub = _this._zone.onUnstable.subscribe(function() {
                            NgZone.assertInAngularZone(), _this._stable && (_this._stable = !1, _this._zone.runOutsideAngular(function() {
                                observer.next(!1);
                            }));
                        });
                        return function() {
                            stableSub.unsubscribe(), unstableSub.unsubscribe();
                        };
                    });
                    this.isStable = Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_merge__.a)(isCurrentlyStable, __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_share__.a.call(isStable));
                }
                return ApplicationRef.prototype.bootstrap = function(componentOrFactory, rootSelectorOrNode) {
                    var _this = this;
                    if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    var componentFactory;
                    componentFactory = componentOrFactory instanceof ComponentFactory ? componentOrFactory : this._componentFactoryResolver.resolveComponentFactory(componentOrFactory), 
                    this.componentTypes.push(componentFactory.componentType);
                    var ngModule = componentFactory instanceof ComponentFactoryBoundToModule ? null : this._injector.get(NgModuleRef), selectorOrNode = rootSelectorOrNode || componentFactory.selector, compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);
                    compRef.onDestroy(function() {
                        _this._unloadComponent(compRef);
                    });
                    var testability = compRef.injector.get(Testability, null);
                    return testability && compRef.injector.get(TestabilityRegistry).registerApplication(compRef.location.nativeElement, testability), 
                    this._loadComponent(compRef), isDevMode() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."), 
                    compRef;
                }, ApplicationRef.prototype.tick = function() {
                    var _this = this;
                    if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                    var scope = ApplicationRef._tickScope();
                    try {
                        this._runningTick = !0, this._views.forEach(function(view) {
                            return view.detectChanges();
                        }), this._enforceNoNewChanges && this._views.forEach(function(view) {
                            return view.checkNoChanges();
                        });
                    } catch (e) {
                        this._zone.runOutsideAngular(function() {
                            return _this._exceptionHandler.handleError(e);
                        });
                    } finally {
                        this._runningTick = !1, wtfLeave(scope);
                    }
                }, ApplicationRef.prototype.attachView = function(viewRef) {
                    var view = viewRef;
                    this._views.push(view), view.attachToAppRef(this);
                }, ApplicationRef.prototype.detachView = function(viewRef) {
                    var view = viewRef;
                    remove(this._views, view), view.detachFromAppRef();
                }, ApplicationRef.prototype._loadComponent = function(componentRef) {
                    this.attachView(componentRef.hostView), this.tick(), this.components.push(componentRef);
                    this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners).forEach(function(listener) {
                        return listener(componentRef);
                    });
                }, ApplicationRef.prototype._unloadComponent = function(componentRef) {
                    this.detachView(componentRef.hostView), remove(this.components, componentRef);
                }, ApplicationRef.prototype.ngOnDestroy = function() {
                    this._views.slice().forEach(function(view) {
                        return view.destroy();
                    });
                }, Object.defineProperty(ApplicationRef.prototype, "viewCount", {
                    get: function() {
                        return this._views.length;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ApplicationRef._tickScope = wtfCreateScope("ApplicationRef#tick()"), ApplicationRef.decorators = [ {
                    type: Injectable
                } ], ApplicationRef.ctorParameters = function() {
                    return [ {
                        type: NgZone
                    }, {
                        type: Console
                    }, {
                        type: Injector
                    }, {
                        type: ErrorHandler
                    }, {
                        type: ComponentFactoryResolver
                    }, {
                        type: ApplicationInitStatus
                    } ];
                }, ApplicationRef;
            }(), Renderer = (function() {
            }(), function() {
            }(), function() {
                return function Renderer() {};
            }()), RendererFactory2 = (new InjectionToken("Renderer2Interceptor"), function() {
            }(), function() {
                return function RendererFactory2() {};
            }()), RendererStyleFlags2 = {
                Important: 1,
                DashCase: 2
            };
            RendererStyleFlags2[RendererStyleFlags2.Important] = "Important", RendererStyleFlags2[RendererStyleFlags2.DashCase] = "DashCase";
            var Renderer2 = function() {
                return function Renderer2() {};
            }(), ElementRef = function() {
                return function ElementRef(nativeElement) {
                    this.nativeElement = nativeElement;
                };
            }(), QueryList = (function() {
            }(), new Map(), function() {
                function QueryList() {
                    this.dirty = !0, this._results = [], this.changes = new EventEmitter();
                }
                return Object.defineProperty(QueryList.prototype, "length", {
                    get: function() {
                        return this._results.length;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(QueryList.prototype, "first", {
                    get: function() {
                        return this._results[0];
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(QueryList.prototype, "last", {
                    get: function() {
                        return this._results[this.length - 1];
                    },
                    enumerable: !0,
                    configurable: !0
                }), QueryList.prototype.map = function(fn) {
                    return this._results.map(fn);
                }, QueryList.prototype.filter = function(fn) {
                    return this._results.filter(fn);
                }, QueryList.prototype.find = function(fn) {
                    return this._results.find(fn);
                }, QueryList.prototype.reduce = function(fn, init) {
                    return this._results.reduce(fn, init);
                }, QueryList.prototype.forEach = function(fn) {
                    this._results.forEach(fn);
                }, QueryList.prototype.some = function(fn) {
                    return this._results.some(fn);
                }, QueryList.prototype.toArray = function() {
                    return this._results.slice();
                }, QueryList.prototype[getSymbolIterator()] = function() {
                    return this._results[getSymbolIterator()]();
                }, QueryList.prototype.toString = function() {
                    return this._results.toString();
                }, QueryList.prototype.reset = function(res) {
                    this._results = flatten(res), this.dirty = !1;
                }, QueryList.prototype.notifyOnChanges = function() {
                    this.changes.emit(this);
                }, QueryList.prototype.setDirty = function() {
                    this.dirty = !0;
                }, QueryList.prototype.destroy = function() {
                    this.changes.complete(), this.changes.unsubscribe();
                }, QueryList;
            }()), SystemJsNgModuleLoaderConfig = function() {
                return function SystemJsNgModuleLoaderConfig() {};
            }(), DEFAULT_CONFIG = {
                factoryPathPrefix: "",
                factoryPathSuffix: ".ngfactory"
            }, TemplateRef = (function() {
                function SystemJsNgModuleLoader(_compiler, config) {
                    this._compiler = _compiler, this._config = config || DEFAULT_CONFIG;
                }
                SystemJsNgModuleLoader.prototype.load = function(path) {
                    return this._compiler instanceof Compiler ? this.loadFactory(path) : this.loadAndCompile(path);
                }, SystemJsNgModuleLoader.prototype.loadAndCompile = function(path) {
                    var _this = this, _a = path.split("#"), module = _a[0], exportName = _a[1];
                    return void 0 === exportName && (exportName = "default"), __webpack_require__("YuZA")(module).then(function(module) {
                        return module[exportName];
                    }).then(function(type) {
                        return checkNotEmpty(type, module, exportName);
                    }).then(function(type) {
                        return _this._compiler.compileModuleAsync(type);
                    });
                }, SystemJsNgModuleLoader.prototype.loadFactory = function(path) {
                    var _a = path.split("#"), module = _a[0], exportName = _a[1], factoryClassSuffix = "NgFactory";
                    return void 0 === exportName && (exportName = "default", factoryClassSuffix = ""), 
                    __webpack_require__("YuZA")(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix).then(function(module) {
                        return module[exportName + factoryClassSuffix];
                    }).then(function(factory) {
                        return checkNotEmpty(factory, module, exportName);
                    });
                }, SystemJsNgModuleLoader.decorators = [ {
                    type: Injectable
                } ], SystemJsNgModuleLoader.ctorParameters = function() {
                    return [ {
                        type: Compiler
                    }, {
                        type: SystemJsNgModuleLoaderConfig,
                        decorators: [ {
                            type: Optional
                        } ]
                    } ];
                };
            }(), function() {
                return function TemplateRef() {};
            }()), ViewContainerRef = function() {
                return function ViewContainerRef() {};
            }(), ChangeDetectorRef = function() {
                return function ChangeDetectorRef() {};
            }(), EventListener = (function(_super) {
                function EmbeddedViewRef() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(EmbeddedViewRef, _super);
            }(function(_super) {
                function ViewRef() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(ViewRef, _super), ViewRef;
            }(ChangeDetectorRef)), function() {
                return function EventListener(name, callback) {
                    this.name = name, this.callback = callback;
                };
            }()), DebugNode = function() {
                function DebugNode(nativeNode, parent, _debugContext) {
                    this._debugContext = _debugContext, this.nativeNode = nativeNode, parent && parent instanceof DebugElement ? parent.addChild(this) : this.parent = null, 
                    this.listeners = [];
                }
                return Object.defineProperty(DebugNode.prototype, "injector", {
                    get: function() {
                        return this._debugContext.injector;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugNode.prototype, "componentInstance", {
                    get: function() {
                        return this._debugContext.component;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugNode.prototype, "context", {
                    get: function() {
                        return this._debugContext.context;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugNode.prototype, "references", {
                    get: function() {
                        return this._debugContext.references;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugNode.prototype, "providerTokens", {
                    get: function() {
                        return this._debugContext.providerTokens;
                    },
                    enumerable: !0,
                    configurable: !0
                }), DebugNode;
            }(), DebugElement = function(_super) {
                function DebugElement(nativeNode, parent, _debugContext) {
                    var _this = _super.call(this, nativeNode, parent, _debugContext) || this;
                    return _this.properties = {}, _this.attributes = {}, _this.classes = {}, _this.styles = {}, 
                    _this.childNodes = [], _this.nativeElement = nativeNode, _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(DebugElement, _super), DebugElement.prototype.addChild = function(child) {
                    child && (this.childNodes.push(child), child.parent = this);
                }, DebugElement.prototype.removeChild = function(child) {
                    var childIndex = this.childNodes.indexOf(child);
                    -1 !== childIndex && (child.parent = null, this.childNodes.splice(childIndex, 1));
                }, DebugElement.prototype.insertChildrenAfter = function(child, newChildren) {
                    var _this = this, siblingIndex = this.childNodes.indexOf(child);
                    -1 !== siblingIndex && ((_a = this.childNodes).splice.apply(_a, [ siblingIndex + 1, 0 ].concat(newChildren)), 
                    newChildren.forEach(function(c) {
                        c.parent && c.parent.removeChild(c), c.parent = _this;
                    }));
                    var _a;
                }, DebugElement.prototype.insertBefore = function(refChild, newChild) {
                    var refIndex = this.childNodes.indexOf(refChild);
                    -1 === refIndex ? this.addChild(newChild) : (newChild.parent && newChild.parent.removeChild(newChild), 
                    newChild.parent = this, this.childNodes.splice(refIndex, 0, newChild));
                }, DebugElement.prototype.query = function(predicate) {
                    return this.queryAll(predicate)[0] || null;
                }, DebugElement.prototype.queryAll = function(predicate) {
                    var matches = [];
                    return _queryElementChildren(this, predicate, matches), matches;
                }, DebugElement.prototype.queryAllNodes = function(predicate) {
                    var matches = [];
                    return _queryNodeChildren(this, predicate, matches), matches;
                }, Object.defineProperty(DebugElement.prototype, "children", {
                    get: function() {
                        return this.childNodes.filter(function(node) {
                            return node instanceof DebugElement;
                        });
                    },
                    enumerable: !0,
                    configurable: !0
                }), DebugElement.prototype.triggerEventHandler = function(eventName, eventObj) {
                    this.listeners.forEach(function(listener) {
                        listener.name == eventName && listener.callback(eventObj);
                    });
                }, DebugElement;
            }(DebugNode), _nativeNodeToDebugNode = new Map(), WrappedValue = function() {
                function WrappedValue(wrapped) {
                    this.wrapped = wrapped;
                }
                return WrappedValue.wrap = function(value) {
                    return new WrappedValue(value);
                }, WrappedValue;
            }(), SimpleChange = (function() {
                function ValueUnwrapper() {
                    this.hasWrappedValue = !1;
                }
                ValueUnwrapper.prototype.unwrap = function(value) {
                    return value instanceof WrappedValue ? (this.hasWrappedValue = !0, value.wrapped) : value;
                }, ValueUnwrapper.prototype.reset = function() {
                    this.hasWrappedValue = !1;
                };
            }(), function() {
                function SimpleChange(previousValue, currentValue, firstChange) {
                    this.previousValue = previousValue, this.currentValue = currentValue, this.firstChange = firstChange;
                }
                return SimpleChange.prototype.isFirstChange = function() {
                    return this.firstChange;
                }, SimpleChange;
            }()), DefaultIterableDifferFactory = function() {
                function DefaultIterableDifferFactory() {}
                return DefaultIterableDifferFactory.prototype.supports = function(obj) {
                    return isListLikeIterable(obj);
                }, DefaultIterableDifferFactory.prototype.create = function(trackByFn) {
                    return new DefaultIterableDiffer(trackByFn);
                }, DefaultIterableDifferFactory;
            }(), trackByIdentity = function(index, item) {
                return item;
            }, DefaultIterableDiffer = function() {
                function DefaultIterableDiffer(trackByFn) {
                    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, 
                    this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, 
                    this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, 
                    this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = trackByFn || trackByIdentity;
                }
                return DefaultIterableDiffer.prototype.forEachItem = function(fn) {
                    var record;
                    for (record = this._itHead; null !== record; record = record._next) fn(record);
                }, DefaultIterableDiffer.prototype.forEachOperation = function(fn) {
                    for (var nextIt = this._itHead, nextRemove = this._removalsHead, addRemoveOffset = 0, moveOffsets = null; nextIt || nextRemove; ) {
                        var record = !nextRemove || nextIt && nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? nextIt : nextRemove, adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets), currentIndex = record.currentIndex;
                        if (record === nextRemove) addRemoveOffset--, nextRemove = nextRemove._nextRemoved; else if (nextIt = nextIt._next, 
                        null == record.previousIndex) addRemoveOffset++; else {
                            moveOffsets || (moveOffsets = []);
                            var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset, localCurrentIndex = currentIndex - addRemoveOffset;
                            if (localMovePreviousIndex != localCurrentIndex) {
                                for (var i = 0; i < localMovePreviousIndex; i++) {
                                    var offset = i < moveOffsets.length ? moveOffsets[i] : moveOffsets[i] = 0, index = offset + i;
                                    localCurrentIndex <= index && index < localMovePreviousIndex && (moveOffsets[i] = offset + 1);
                                }
                                moveOffsets[record.previousIndex] = localCurrentIndex - localMovePreviousIndex;
                            }
                        }
                        adjPreviousIndex !== currentIndex && fn(record, adjPreviousIndex, currentIndex);
                    }
                }, DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
                    var record;
                    for (record = this._previousItHead; null !== record; record = record._nextPrevious) fn(record);
                }, DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
                    var record;
                    for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
                }, DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
                    var record;
                    for (record = this._movesHead; null !== record; record = record._nextMoved) fn(record);
                }, DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
                    var record;
                    for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
                }, DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
                    var record;
                    for (record = this._identityChangesHead; null !== record; record = record._nextIdentityChange) fn(record);
                }, DefaultIterableDiffer.prototype.diff = function(collection) {
                    if (null == collection && (collection = []), !isListLikeIterable(collection)) throw new Error("Error trying to diff '" + stringify(collection) + "'. Only arrays and iterables are allowed");
                    return this.check(collection) ? this : null;
                }, DefaultIterableDiffer.prototype.onDestroy = function() {}, DefaultIterableDiffer.prototype.check = function(collection) {
                    var _this = this;
                    this._reset();
                    var index, item, itemTrackBy, record = this._itHead, mayBeDirty = !1;
                    if (Array.isArray(collection)) {
                        this.length = collection.length;
                        for (var index_1 = 0; index_1 < this.length; index_1++) item = collection[index_1], 
                        itemTrackBy = this._trackByFn(index_1, item), null !== record && looseIdentical(record.trackById, itemTrackBy) ? (mayBeDirty && (record = this._verifyReinsertion(record, item, itemTrackBy, index_1)), 
                        looseIdentical(record.item, item) || this._addIdentityChange(record, item)) : (record = this._mismatch(record, item, itemTrackBy, index_1), 
                        mayBeDirty = !0), record = record._next;
                    } else index = 0, function iterateListLike(obj, fn) {
                        if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) fn(obj[i]); else for (var iterator = obj[getSymbolIterator()](), item = void 0; !(item = iterator.next()).done; ) fn(item.value);
                    }(collection, function(item) {
                        itemTrackBy = _this._trackByFn(index, item), null !== record && looseIdentical(record.trackById, itemTrackBy) ? (mayBeDirty && (record = _this._verifyReinsertion(record, item, itemTrackBy, index)), 
                        looseIdentical(record.item, item) || _this._addIdentityChange(record, item)) : (record = _this._mismatch(record, item, itemTrackBy, index), 
                        mayBeDirty = !0), record = record._next, index++;
                    }), this.length = index;
                    return this._truncate(record), this.collection = collection, this.isDirty;
                }, Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
                    get: function() {
                        return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
                    },
                    enumerable: !0,
                    configurable: !0
                }), DefaultIterableDiffer.prototype._reset = function() {
                    if (this.isDirty) {
                        var record = void 0, nextRecord = void 0;
                        for (record = this._previousItHead = this._itHead; null !== record; record = record._next) record._nextPrevious = record._next;
                        for (record = this._additionsHead; null !== record; record = record._nextAdded) record.previousIndex = record.currentIndex;
                        for (this._additionsHead = this._additionsTail = null, record = this._movesHead; null !== record; record = nextRecord) record.previousIndex = record.currentIndex, 
                        nextRecord = record._nextMoved;
                        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, 
                        this._identityChangesHead = this._identityChangesTail = null;
                    }
                }, DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
                    var previousRecord;
                    return null === record ? previousRecord = this._itTail : (previousRecord = record._prev, 
                    this._remove(record)), null !== (record = null === this._linkedRecords ? null : this._linkedRecords.get(itemTrackBy, index)) ? (looseIdentical(record.item, item) || this._addIdentityChange(record, item), 
                    this._moveAfter(record, previousRecord, index)) : null !== (record = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null)) ? (looseIdentical(record.item, item) || this._addIdentityChange(record, item), 
                    this._reinsertAfter(record, previousRecord, index)) : record = this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index), 
                    record;
                }, DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
                    var reinsertRecord = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null);
                    return null !== reinsertRecord ? record = this._reinsertAfter(reinsertRecord, record._prev, index) : record.currentIndex != index && (record.currentIndex = index, 
                    this._addToMoves(record, index)), record;
                }, DefaultIterableDiffer.prototype._truncate = function(record) {
                    for (;null !== record; ) {
                        var nextRecord = record._next;
                        this._addToRemovals(this._unlink(record)), record = nextRecord;
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), 
                    null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), 
                    null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
                }, DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(record);
                    var prev = record._prevRemoved, next = record._nextRemoved;
                    return null === prev ? this._removalsHead = next : prev._nextRemoved = next, null === next ? this._removalsTail = prev : next._prevRemoved = prev, 
                    this._insertAfter(record, prevRecord, index), this._addToMoves(record, index), record;
                }, DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
                    return this._unlink(record), this._insertAfter(record, prevRecord, index), this._addToMoves(record, index), 
                    record;
                }, DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
                    return this._insertAfter(record, prevRecord, index), null === this._additionsTail ? this._additionsTail = this._additionsHead = record : this._additionsTail = this._additionsTail._nextAdded = record, 
                    record;
                }, DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
                    var next = null === prevRecord ? this._itHead : prevRecord._next;
                    return record._next = next, record._prev = prevRecord, null === next ? this._itTail = record : next._prev = record, 
                    null === prevRecord ? this._itHead = record : prevRecord._next = record, null === this._linkedRecords && (this._linkedRecords = new _DuplicateMap()), 
                    this._linkedRecords.put(record), record.currentIndex = index, record;
                }, DefaultIterableDiffer.prototype._remove = function(record) {
                    return this._addToRemovals(this._unlink(record));
                }, DefaultIterableDiffer.prototype._unlink = function(record) {
                    null !== this._linkedRecords && this._linkedRecords.remove(record);
                    var prev = record._prev, next = record._next;
                    return null === prev ? this._itHead = next : prev._next = next, null === next ? this._itTail = prev : next._prev = prev, 
                    record;
                }, DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
                    return record.previousIndex === toIndex ? record : (null === this._movesTail ? this._movesTail = this._movesHead = record : this._movesTail = this._movesTail._nextMoved = record, 
                    record);
                }, DefaultIterableDiffer.prototype._addToRemovals = function(record) {
                    return null === this._unlinkedRecords && (this._unlinkedRecords = new _DuplicateMap()), 
                    this._unlinkedRecords.put(record), record.currentIndex = null, record._nextRemoved = null, 
                    null === this._removalsTail ? (this._removalsTail = this._removalsHead = record, 
                    record._prevRemoved = null) : (record._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = record), 
                    record;
                }, DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
                    return record.item = item, null === this._identityChangesTail ? this._identityChangesTail = this._identityChangesHead = record : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record, 
                    record;
                }, DefaultIterableDiffer;
            }(), IterableChangeRecord_ = function() {
                return function IterableChangeRecord_(item, trackById) {
                    this.item = item, this.trackById = trackById, this.currentIndex = null, this.previousIndex = null, 
                    this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, 
                    this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, 
                    this._nextMoved = null, this._nextIdentityChange = null;
                };
            }(), _DuplicateItemRecordList = function() {
                function _DuplicateItemRecordList() {
                    this._head = null, this._tail = null;
                }
                return _DuplicateItemRecordList.prototype.add = function(record) {
                    null === this._head ? (this._head = this._tail = record, record._nextDup = null, 
                    record._prevDup = null) : (this._tail._nextDup = record, record._prevDup = this._tail, 
                    record._nextDup = null, this._tail = record);
                }, _DuplicateItemRecordList.prototype.get = function(trackById, atOrAfterIndex) {
                    var record;
                    for (record = this._head; null !== record; record = record._nextDup) if ((null === atOrAfterIndex || atOrAfterIndex <= record.currentIndex) && looseIdentical(record.trackById, trackById)) return record;
                    return null;
                }, _DuplicateItemRecordList.prototype.remove = function(record) {
                    var prev = record._prevDup, next = record._nextDup;
                    return null === prev ? this._head = next : prev._nextDup = next, null === next ? this._tail = prev : next._prevDup = prev, 
                    null === this._head;
                }, _DuplicateItemRecordList;
            }(), _DuplicateMap = function() {
                function _DuplicateMap() {
                    this.map = new Map();
                }
                return _DuplicateMap.prototype.put = function(record) {
                    var key = record.trackById, duplicates = this.map.get(key);
                    duplicates || (duplicates = new _DuplicateItemRecordList(), this.map.set(key, duplicates)), 
                    duplicates.add(record);
                }, _DuplicateMap.prototype.get = function(trackById, atOrAfterIndex) {
                    var key = trackById, recordList = this.map.get(key);
                    return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
                }, _DuplicateMap.prototype.remove = function(record) {
                    var key = record.trackById;
                    return this.map.get(key).remove(record) && this.map.delete(key), record;
                }, Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
                    get: function() {
                        return 0 === this.map.size;
                    },
                    enumerable: !0,
                    configurable: !0
                }), _DuplicateMap.prototype.clear = function() {
                    this.map.clear();
                }, _DuplicateMap;
            }(), DefaultKeyValueDifferFactory = function() {
                function DefaultKeyValueDifferFactory() {}
                return DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
                    return obj instanceof Map || isJsObject(obj);
                }, DefaultKeyValueDifferFactory.prototype.create = function() {
                    return new DefaultKeyValueDiffer();
                }, DefaultKeyValueDifferFactory;
            }(), DefaultKeyValueDiffer = function() {
                function DefaultKeyValueDiffer() {
                    this._records = new Map(), this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, 
                    this._changesHead = null, this._changesTail = null, this._additionsHead = null, 
                    this._additionsTail = null, this._removalsHead = null, this._removalsTail = null;
                }
                return Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
                    get: function() {
                        return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
                    },
                    enumerable: !0,
                    configurable: !0
                }), DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
                    var record;
                    for (record = this._mapHead; null !== record; record = record._next) fn(record);
                }, DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
                    var record;
                    for (record = this._previousMapHead; null !== record; record = record._nextPrevious) fn(record);
                }, DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
                    var record;
                    for (record = this._changesHead; null !== record; record = record._nextChanged) fn(record);
                }, DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
                    var record;
                    for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
                }, DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
                    var record;
                    for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
                }, DefaultKeyValueDiffer.prototype.diff = function(map) {
                    if (map) {
                        if (!(map instanceof Map || isJsObject(map))) throw new Error("Error trying to diff '" + stringify(map) + "'. Only maps and objects are allowed");
                    } else map = new Map();
                    return this.check(map) ? this : null;
                }, DefaultKeyValueDiffer.prototype.onDestroy = function() {}, DefaultKeyValueDiffer.prototype.check = function(map) {
                    var _this = this;
                    this._reset();
                    var insertBefore = this._mapHead;
                    if (this._appendAfter = null, this._forEach(map, function(value, key) {
                        if (insertBefore && insertBefore.key === key) _this._maybeAddToChanges(insertBefore, value), 
                        _this._appendAfter = insertBefore, insertBefore = insertBefore._next; else {
                            var record = _this._getOrCreateRecordForKey(key, value);
                            insertBefore = _this._insertBeforeOrAppend(insertBefore, record);
                        }
                    }), insertBefore) {
                        insertBefore._prev && (insertBefore._prev._next = null), this._removalsHead = insertBefore;
                        for (var record = insertBefore; null !== record; record = record._nextRemoved) record === this._mapHead && (this._mapHead = null), 
                        this._records.delete(record.key), record._nextRemoved = record._next, record.previousValue = record.currentValue, 
                        record.currentValue = null, record._prev = null, record._next = null;
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), 
                    this.isDirty;
                }, DefaultKeyValueDiffer.prototype._insertBeforeOrAppend = function(before, record) {
                    if (before) {
                        var prev = before._prev;
                        return record._next = before, record._prev = prev, before._prev = record, prev && (prev._next = record), 
                        before === this._mapHead && (this._mapHead = record), this._appendAfter = before, 
                        before;
                    }
                    return this._appendAfter ? (this._appendAfter._next = record, record._prev = this._appendAfter) : this._mapHead = record, 
                    this._appendAfter = record, null;
                }, DefaultKeyValueDiffer.prototype._getOrCreateRecordForKey = function(key, value) {
                    if (this._records.has(key)) {
                        var record_1 = this._records.get(key);
                        this._maybeAddToChanges(record_1, value);
                        var prev = record_1._prev, next = record_1._next;
                        return prev && (prev._next = next), next && (next._prev = prev), record_1._next = null, 
                        record_1._prev = null, record_1;
                    }
                    var record = new KeyValueChangeRecord_(key);
                    return this._records.set(key, record), record.currentValue = value, this._addToAdditions(record), 
                    record;
                }, DefaultKeyValueDiffer.prototype._reset = function() {
                    if (this.isDirty) {
                        var record = void 0;
                        for (this._previousMapHead = this._mapHead, record = this._previousMapHead; null !== record; record = record._next) record._nextPrevious = record._next;
                        for (record = this._changesHead; null !== record; record = record._nextChanged) record.previousValue = record.currentValue;
                        for (record = this._additionsHead; null != record; record = record._nextAdded) record.previousValue = record.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, 
                        this._removalsHead = null;
                    }
                }, DefaultKeyValueDiffer.prototype._maybeAddToChanges = function(record, newValue) {
                    looseIdentical(newValue, record.currentValue) || (record.previousValue = record.currentValue, 
                    record.currentValue = newValue, this._addToChanges(record));
                }, DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = record : (this._additionsTail._nextAdded = record, 
                    this._additionsTail = record);
                }, DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
                    null === this._changesHead ? this._changesHead = this._changesTail = record : (this._changesTail._nextChanged = record, 
                    this._changesTail = record);
                }, DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
                    obj instanceof Map ? obj.forEach(fn) : Object.keys(obj).forEach(function(k) {
                        return fn(obj[k], k);
                    });
                }, DefaultKeyValueDiffer;
            }(), KeyValueChangeRecord_ = function() {
                return function KeyValueChangeRecord_(key) {
                    this.key = key, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, 
                    this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, 
                    this._nextChanged = null;
                };
            }(), IterableDiffers = function() {
                function IterableDiffers(factories) {
                    this.factories = factories;
                }
                return IterableDiffers.create = function(factories, parent) {
                    if (null != parent) {
                        var copied = parent.factories.slice();
                        return new IterableDiffers(factories = factories.concat(copied));
                    }
                    return new IterableDiffers(factories);
                }, IterableDiffers.extend = function(factories) {
                    return {
                        provide: IterableDiffers,
                        useFactory: function(parent) {
                            if (!parent) throw new Error("Cannot extend IterableDiffers without a parent injector");
                            return IterableDiffers.create(factories, parent);
                        },
                        deps: [ [ IterableDiffers, new SkipSelf(), new Optional() ] ]
                    };
                }, IterableDiffers.prototype.find = function(iterable) {
                    var factory = this.factories.find(function(f) {
                        return f.supports(iterable);
                    });
                    if (null != factory) return factory;
                    throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + function getTypeNameForDebugging(type) {
                        return type.name || typeof type;
                    }(iterable) + "'");
                }, IterableDiffers;
            }(), KeyValueDiffers = function() {
                function KeyValueDiffers(factories) {
                    this.factories = factories;
                }
                return KeyValueDiffers.create = function(factories, parent) {
                    if (parent) {
                        var copied = parent.factories.slice();
                        factories = factories.concat(copied);
                    }
                    return new KeyValueDiffers(factories);
                }, KeyValueDiffers.extend = function(factories) {
                    return {
                        provide: KeyValueDiffers,
                        useFactory: function(parent) {
                            if (!parent) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                            return KeyValueDiffers.create(factories, parent);
                        },
                        deps: [ [ KeyValueDiffers, new SkipSelf(), new Optional() ] ]
                    };
                }, KeyValueDiffers.prototype.find = function(kv) {
                    var factory = this.factories.find(function(f) {
                        return f.supports(kv);
                    });
                    if (factory) return factory;
                    throw new Error("Cannot find a differ supporting object '" + kv + "'");
                }, KeyValueDiffers;
            }(), keyValDiff = [ new DefaultKeyValueDifferFactory() ], iterableDiff = [ new DefaultIterableDifferFactory() ], defaultIterableDiffers = new IterableDiffers(iterableDiff), defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff), platformCore = createPlatformFactory(null, "core", [ {
                provide: PLATFORM_ID,
                useValue: "unknown"
            }, {
                provide: PlatformRef,
                deps: [ Injector ]
            }, {
                provide: TestabilityRegistry,
                deps: []
            }, {
                provide: Console,
                deps: []
            } ]), LOCALE_ID = new InjectionToken("LocaleId"), MissingTranslationStrategy = (new InjectionToken("Translations"), 
            new InjectionToken("TranslationsFormat"), {
                Error: 0,
                Warning: 1,
                Ignore: 2
            });
            MissingTranslationStrategy[MissingTranslationStrategy.Error] = "Error", MissingTranslationStrategy[MissingTranslationStrategy.Warning] = "Warning", 
            MissingTranslationStrategy[MissingTranslationStrategy.Ignore] = "Ignore";
            var ApplicationModule = function() {
                function ApplicationModule(appRef) {}
                return ApplicationModule.decorators = [ {
                    type: NgModule,
                    args: [ {
                        providers: [ ApplicationRef, ApplicationInitStatus, Compiler, APP_ID_RANDOM_PROVIDER, {
                            provide: IterableDiffers,
                            useFactory: _iterableDiffersFactory
                        }, {
                            provide: KeyValueDiffers,
                            useFactory: _keyValueDiffersFactory
                        }, {
                            provide: LOCALE_ID,
                            useFactory: _localeFactory,
                            deps: [ [ new Inject(LOCALE_ID), new Optional(), new SkipSelf() ] ]
                        } ]
                    } ]
                } ], ApplicationModule.ctorParameters = function() {
                    return [ {
                        type: ApplicationRef
                    } ];
                }, ApplicationModule;
            }(), SecurityContext = {
                NONE: 0,
                HTML: 1,
                STYLE: 2,
                SCRIPT: 3,
                URL: 4,
                RESOURCE_URL: 5
            };
            SecurityContext[SecurityContext.NONE] = "NONE", SecurityContext[SecurityContext.HTML] = "HTML", 
            SecurityContext[SecurityContext.STYLE] = "STYLE", SecurityContext[SecurityContext.SCRIPT] = "SCRIPT", 
            SecurityContext[SecurityContext.URL] = "URL", SecurityContext[SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
            var Sanitizer = function() {
                return function Sanitizer() {};
            }(), Services = (function() {
            }(), {
                setCurrentNode: void 0,
                createRootView: void 0,
                createEmbeddedView: void 0,
                createComponentView: void 0,
                createNgModuleRef: void 0,
                overrideProvider: void 0,
                overrideComponentView: void 0,
                clearOverrides: void 0,
                checkAndUpdateView: void 0,
                checkNoChangesView: void 0,
                destroyView: void 0,
                resolveDep: void 0,
                createDebugContext: void 0,
                handleEvent: void 0,
                updateDirectives: void 0,
                updateRenderer: void 0,
                dirtyParentQueries: void 0
            }), NOOP = function() {}, _tokenKeyCache = new Map(), UNDEFINED_RENDERER_TYPE_ID = "$$undefined", EMPTY_RENDERER_TYPE_ID = "$$empty", _renderCompCount = 0, DEFINITION_CACHE = new WeakMap(), NS_PREFIX_RE = /^:([^:]+):(.+)$/, UNDEFINED_VALUE = new Object(), InjectorRefTokenKey$1 = tokenKey(Injector), NgModuleRefTokenKey = tokenKey(NgModuleRef), EMPTY_CONTEXT = new Object(), ComponentFactory_ = function(_super) {
                function ComponentFactory_(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
                    var _this = _super.call(this) || this;
                    return _this.selector = selector, _this.componentType = componentType, _this._inputs = _inputs, 
                    _this._outputs = _outputs, _this.ngContentSelectors = ngContentSelectors, _this.viewDefFactory = viewDefFactory, 
                    _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(ComponentFactory_, _super), 
                Object.defineProperty(ComponentFactory_.prototype, "inputs", {
                    get: function() {
                        var inputsArr = [], inputs = this._inputs;
                        for (var propName in inputs) {
                            var templateName = inputs[propName];
                            inputsArr.push({
                                propName: propName,
                                templateName: templateName
                            });
                        }
                        return inputsArr;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentFactory_.prototype, "outputs", {
                    get: function() {
                        var outputsArr = [];
                        for (var propName in this._outputs) {
                            var templateName = this._outputs[propName];
                            outputsArr.push({
                                propName: propName,
                                templateName: templateName
                            });
                        }
                        return outputsArr;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ComponentFactory_.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                    if (!ngModule) throw new Error("ngModule should be provided");
                    var viewDef = resolveDefinition(this.viewDefFactory), componentNodeIndex = viewDef.nodes[0].element.componentProvider.nodeIndex, view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT), component = asProviderData(view, componentNodeIndex).instance;
                    return rootSelectorOrNode && view.renderer.setAttribute(asElementData(view, 0).renderElement, "ng-version", VERSION.full), 
                    new ComponentRef_(view, new ViewRef_(view), component);
                }, ComponentFactory_;
            }(ComponentFactory), ComponentRef_ = function(_super) {
                function ComponentRef_(_view, _viewRef, _component) {
                    var _this = _super.call(this) || this;
                    return _this._view = _view, _this._viewRef = _viewRef, _this._component = _component, 
                    _this._elDef = _this._view.def.nodes[0], _this.hostView = _viewRef, _this.changeDetectorRef = _viewRef, 
                    _this.instance = _component, _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(ComponentRef_, _super), Object.defineProperty(ComponentRef_.prototype, "location", {
                    get: function() {
                        return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentRef_.prototype, "injector", {
                    get: function() {
                        return new Injector_(this._view, this._elDef);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ComponentRef_.prototype, "componentType", {
                    get: function() {
                        return this._component.constructor;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ComponentRef_.prototype.destroy = function() {
                    this._viewRef.destroy();
                }, ComponentRef_.prototype.onDestroy = function(callback) {
                    this._viewRef.onDestroy(callback);
                }, ComponentRef_;
            }(ComponentRef), ViewContainerRef_ = function() {
                function ViewContainerRef_(_view, _elDef, _data) {
                    this._view = _view, this._elDef = _elDef, this._data = _data, this._embeddedViews = [];
                }
                return Object.defineProperty(ViewContainerRef_.prototype, "element", {
                    get: function() {
                        return new ElementRef(this._data.renderElement);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ViewContainerRef_.prototype, "injector", {
                    get: function() {
                        return new Injector_(this._view, this._elDef);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
                    get: function() {
                        for (var view = this._view, elDef = this._elDef.parent; !elDef && view; ) elDef = viewParentEl(view), 
                        view = view.parent;
                        return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
                    },
                    enumerable: !0,
                    configurable: !0
                }), ViewContainerRef_.prototype.clear = function() {
                    for (var i = this._embeddedViews.length - 1; i >= 0; i--) {
                        var view = detachEmbeddedView(this._data, i);
                        Services.destroyView(view);
                    }
                }, ViewContainerRef_.prototype.get = function(index) {
                    var view = this._embeddedViews[index];
                    if (view) {
                        var ref = new ViewRef_(view);
                        return ref.attachToViewContainerRef(this), ref;
                    }
                    return null;
                }, Object.defineProperty(ViewContainerRef_.prototype, "length", {
                    get: function() {
                        return this._embeddedViews.length;
                    },
                    enumerable: !0,
                    configurable: !0
                }), ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
                    var viewRef = templateRef.createEmbeddedView(context || {});
                    return this.insert(viewRef, index), viewRef;
                }, ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes, ngModuleRef) {
                    var contextInjector = injector || this.parentInjector;
                    ngModuleRef || componentFactory instanceof ComponentFactoryBoundToModule || (ngModuleRef = contextInjector.get(NgModuleRef));
                    var componentRef = componentFactory.create(contextInjector, projectableNodes, void 0, ngModuleRef);
                    return this.insert(componentRef.hostView, index), componentRef;
                }, ViewContainerRef_.prototype.insert = function(viewRef, index) {
                    if (viewRef.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                    var viewRef_ = viewRef, viewData = viewRef_._view;
                    return attachEmbeddedView(this._view, this._data, index, viewData), viewRef_.attachToViewContainerRef(this), 
                    viewRef;
                }, ViewContainerRef_.prototype.move = function(viewRef, currentIndex) {
                    if (viewRef.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                    var previousIndex = this._embeddedViews.indexOf(viewRef._view);
                    return function moveEmbeddedView(elementData, oldViewIndex, newViewIndex) {
                        var embeddedViews = elementData.viewContainer._embeddedViews, view = embeddedViews[oldViewIndex];
                        return removeFromArray(embeddedViews, oldViewIndex), null == newViewIndex && (newViewIndex = embeddedViews.length), 
                        addToArray(embeddedViews, newViewIndex, view), Services.dirtyParentQueries(view), 
                        renderDetachView(view), renderAttachEmbeddedView(elementData, newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null, view), 
                        view;
                    }(this._data, previousIndex, currentIndex), viewRef;
                }, ViewContainerRef_.prototype.indexOf = function(viewRef) {
                    return this._embeddedViews.indexOf(viewRef._view);
                }, ViewContainerRef_.prototype.remove = function(index) {
                    var viewData = detachEmbeddedView(this._data, index);
                    viewData && Services.destroyView(viewData);
                }, ViewContainerRef_.prototype.detach = function(index) {
                    var view = detachEmbeddedView(this._data, index);
                    return view ? new ViewRef_(view) : null;
                }, ViewContainerRef_;
            }(), ViewRef_ = function() {
                function ViewRef_(_view) {
                    this._view = _view, this._viewContainerRef = null, this._appRef = null;
                }
                return Object.defineProperty(ViewRef_.prototype, "rootNodes", {
                    get: function() {
                        return function rootRenderNodes(view) {
                            var renderNodes = [];
                            return visitRootRenderNodes(view, 0, void 0, void 0, renderNodes), renderNodes;
                        }(this._view);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ViewRef_.prototype, "context", {
                    get: function() {
                        return this._view.context;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(ViewRef_.prototype, "destroyed", {
                    get: function() {
                        return 0 != (128 & this._view.state);
                    },
                    enumerable: !0,
                    configurable: !0
                }), ViewRef_.prototype.markForCheck = function() {
                    markParentViewsForCheck(this._view);
                }, ViewRef_.prototype.detach = function() {
                    this._view.state &= -5;
                }, ViewRef_.prototype.detectChanges = function() {
                    var fs = this._view.root.rendererFactory;
                    fs.begin && fs.begin();
                    try {
                        Services.checkAndUpdateView(this._view);
                    } finally {
                        fs.end && fs.end();
                    }
                }, ViewRef_.prototype.checkNoChanges = function() {
                    Services.checkNoChangesView(this._view);
                }, ViewRef_.prototype.reattach = function() {
                    this._view.state |= 4;
                }, ViewRef_.prototype.onDestroy = function(callback) {
                    this._view.disposables || (this._view.disposables = []), this._view.disposables.push(callback);
                }, ViewRef_.prototype.destroy = function() {
                    this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)), 
                    Services.destroyView(this._view);
                }, ViewRef_.prototype.detachFromAppRef = function() {
                    this._appRef = null, renderDetachView(this._view), Services.dirtyParentQueries(this._view);
                }, ViewRef_.prototype.attachToAppRef = function(appRef) {
                    if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
                    this._appRef = appRef;
                }, ViewRef_.prototype.attachToViewContainerRef = function(vcRef) {
                    if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                    this._viewContainerRef = vcRef;
                }, ViewRef_;
            }(), TemplateRef_ = function(_super) {
                function TemplateRef_(_parentView, _def) {
                    var _this = _super.call(this) || this;
                    return _this._parentView = _parentView, _this._def = _def, _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(TemplateRef_, _super), TemplateRef_.prototype.createEmbeddedView = function(context) {
                    return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, this._def.element.template, context));
                }, Object.defineProperty(TemplateRef_.prototype, "elementRef", {
                    get: function() {
                        return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
                    },
                    enumerable: !0,
                    configurable: !0
                }), TemplateRef_;
            }(TemplateRef), Injector_ = function() {
                function Injector_(view, elDef) {
                    this.view = view, this.elDef = elDef;
                }
                return Injector_.prototype.get = function(token, notFoundValue) {
                    void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND);
                    var allowPrivateServices = !!this.elDef && 0 != (33554432 & this.elDef.flags);
                    return Services.resolveDep(this.view, this.elDef, allowPrivateServices, {
                        flags: 0,
                        token: token,
                        tokenKey: tokenKey(token)
                    }, notFoundValue);
                }, Injector_;
            }(), RendererAdapter = function() {
                function RendererAdapter(delegate) {
                    this.delegate = delegate;
                }
                return RendererAdapter.prototype.selectRootElement = function(selectorOrNode) {
                    return this.delegate.selectRootElement(selectorOrNode);
                }, RendererAdapter.prototype.createElement = function(parent, namespaceAndName) {
                    var _a = splitNamespace(namespaceAndName), ns = _a[0], name = _a[1], el = this.delegate.createElement(name, ns);
                    return parent && this.delegate.appendChild(parent, el), el;
                }, RendererAdapter.prototype.createViewRoot = function(hostElement) {
                    return hostElement;
                }, RendererAdapter.prototype.createTemplateAnchor = function(parentElement) {
                    var comment = this.delegate.createComment("");
                    return parentElement && this.delegate.appendChild(parentElement, comment), comment;
                }, RendererAdapter.prototype.createText = function(parentElement, value) {
                    var node = this.delegate.createText(value);
                    return parentElement && this.delegate.appendChild(parentElement, node), node;
                }, RendererAdapter.prototype.projectNodes = function(parentElement, nodes) {
                    for (var i = 0; i < nodes.length; i++) this.delegate.appendChild(parentElement, nodes[i]);
                }, RendererAdapter.prototype.attachViewAfter = function(node, viewRootNodes) {
                    for (var parentElement = this.delegate.parentNode(node), nextSibling = this.delegate.nextSibling(node), i = 0; i < viewRootNodes.length; i++) this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
                }, RendererAdapter.prototype.detachView = function(viewRootNodes) {
                    for (var i = 0; i < viewRootNodes.length; i++) {
                        var node = viewRootNodes[i], parentElement = this.delegate.parentNode(node);
                        this.delegate.removeChild(parentElement, node);
                    }
                }, RendererAdapter.prototype.destroyView = function(hostElement, viewAllNodes) {
                    for (var i = 0; i < viewAllNodes.length; i++) this.delegate.destroyNode(viewAllNodes[i]);
                }, RendererAdapter.prototype.listen = function(renderElement, name, callback) {
                    return this.delegate.listen(renderElement, name, callback);
                }, RendererAdapter.prototype.listenGlobal = function(target, name, callback) {
                    return this.delegate.listen(target, name, callback);
                }, RendererAdapter.prototype.setElementProperty = function(renderElement, propertyName, propertyValue) {
                    this.delegate.setProperty(renderElement, propertyName, propertyValue);
                }, RendererAdapter.prototype.setElementAttribute = function(renderElement, namespaceAndName, attributeValue) {
                    var _a = splitNamespace(namespaceAndName), ns = _a[0], name = _a[1];
                    null != attributeValue ? this.delegate.setAttribute(renderElement, name, attributeValue, ns) : this.delegate.removeAttribute(renderElement, name, ns);
                }, RendererAdapter.prototype.setBindingDebugInfo = function(renderElement, propertyName, propertyValue) {}, 
                RendererAdapter.prototype.setElementClass = function(renderElement, className, isAdd) {
                    isAdd ? this.delegate.addClass(renderElement, className) : this.delegate.removeClass(renderElement, className);
                }, RendererAdapter.prototype.setElementStyle = function(renderElement, styleName, styleValue) {
                    null != styleValue ? this.delegate.setStyle(renderElement, styleName, styleValue) : this.delegate.removeStyle(renderElement, styleName);
                }, RendererAdapter.prototype.invokeElementMethod = function(renderElement, methodName, args) {
                    renderElement[methodName].apply(renderElement, args);
                }, RendererAdapter.prototype.setText = function(renderNode$$1, text) {
                    this.delegate.setValue(renderNode$$1, text);
                }, RendererAdapter.prototype.animate = function() {
                    throw new Error("Renderer.animate is no longer supported!");
                }, RendererAdapter;
            }(), NgModuleRef_ = function() {
                function NgModuleRef_(_moduleType, _parent, _bootstrapComponents, _def) {
                    this._moduleType = _moduleType, this._parent = _parent, this._bootstrapComponents = _bootstrapComponents, 
                    this._def = _def, this._destroyListeners = [], this._destroyed = !1, function initNgModule(data) {
                        for (var def = data._def, providers = data._providers = new Array(def.providers.length), i = 0; i < def.providers.length; i++) {
                            var provDef = def.providers[i];
                            4096 & provDef.flags || (providers[i] = _createProviderInstance$1(data, provDef));
                        }
                    }(this);
                }
                return NgModuleRef_.prototype.get = function(token, notFoundValue) {
                    return void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), 
                    resolveNgModuleDep(this, {
                        token: token,
                        tokenKey: tokenKey(token),
                        flags: 0
                    }, notFoundValue);
                }, Object.defineProperty(NgModuleRef_.prototype, "instance", {
                    get: function() {
                        return this.get(this._moduleType);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(NgModuleRef_.prototype, "componentFactoryResolver", {
                    get: function() {
                        return this.get(ComponentFactoryResolver);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(NgModuleRef_.prototype, "injector", {
                    get: function() {
                        return this;
                    },
                    enumerable: !0,
                    configurable: !0
                }), NgModuleRef_.prototype.destroy = function() {
                    if (this._destroyed) throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
                    this._destroyed = !0, function callNgModuleLifecycle(ngModule, lifecycles) {
                        for (var def = ngModule._def, i = 0; i < def.providers.length; i++) if (131072 & def.providers[i].flags) {
                            var instance = ngModule._providers[i];
                            instance && instance !== UNDEFINED_VALUE && instance.ngOnDestroy();
                        }
                    }(this), this._destroyListeners.forEach(function(listener) {
                        return listener();
                    });
                }, NgModuleRef_.prototype.onDestroy = function(callback) {
                    this._destroyListeners.push(callback);
                }, NgModuleRef_;
            }(), RendererV1TokenKey = tokenKey(Renderer), Renderer2TokenKey = tokenKey(Renderer2), ElementRefTokenKey = tokenKey(ElementRef), ViewContainerRefTokenKey = tokenKey(ViewContainerRef), TemplateRefTokenKey = tokenKey(TemplateRef), ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef), InjectorRefTokenKey = tokenKey(Injector), NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {}, ViewAction = {
                CreateViewNodes: 0,
                CheckNoChanges: 1,
                CheckNoChangesProjectedViews: 2,
                CheckAndUpdate: 3,
                CheckAndUpdateProjectedViews: 4,
                Destroy: 5
            };
            ViewAction[ViewAction.CreateViewNodes] = "CreateViewNodes", ViewAction[ViewAction.CheckNoChanges] = "CheckNoChanges", 
            ViewAction[ViewAction.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews", 
            ViewAction[ViewAction.CheckAndUpdate] = "CheckAndUpdate", ViewAction[ViewAction.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews", 
            ViewAction[ViewAction.Destroy] = "Destroy";
            var initialized = !1, providerOverrides = new Map(), viewDefOverrides = new Map(), DebugAction = {
                create: 0,
                detectChanges: 1,
                checkNoChanges: 2,
                destroy: 3,
                handleEvent: 4
            };
            DebugAction[DebugAction.create] = "create", DebugAction[DebugAction.detectChanges] = "detectChanges", 
            DebugAction[DebugAction.checkNoChanges] = "checkNoChanges", DebugAction[DebugAction.destroy] = "destroy", 
            DebugAction[DebugAction.handleEvent] = "handleEvent";
            var _currentAction, _currentView, _currentNodeIndex, CAMEL_CASE_REGEXP = /([A-Z])/g, DebugContext_ = function() {
                function DebugContext_(view, nodeIndex) {
                    this.view = view, this.nodeIndex = nodeIndex, null == nodeIndex && (this.nodeIndex = nodeIndex = 0), 
                    this.nodeDef = view.def.nodes[nodeIndex];
                    for (var elDef = this.nodeDef, elView = view; elDef && 0 == (1 & elDef.flags); ) elDef = elDef.parent;
                    if (!elDef) for (;!elDef && elView; ) elDef = viewParentEl(elView), elView = elView.parent;
                    this.elDef = elDef, this.elView = elView;
                }
                return Object.defineProperty(DebugContext_.prototype, "elOrCompView", {
                    get: function() {
                        return asElementData(this.elView, this.elDef.nodeIndex).componentView || this.view;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "injector", {
                    get: function() {
                        return createInjector(this.elView, this.elDef);
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "component", {
                    get: function() {
                        return this.elOrCompView.component;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "context", {
                    get: function() {
                        return this.elOrCompView.context;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "providerTokens", {
                    get: function() {
                        var tokens = [];
                        if (this.elDef) for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                            var childDef = this.elView.def.nodes[i];
                            20224 & childDef.flags && tokens.push(childDef.provider.token), i += childDef.childCount;
                        }
                        return tokens;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "references", {
                    get: function() {
                        var references = {};
                        if (this.elDef) {
                            collectReferences(this.elView, this.elDef, references);
                            for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                                var childDef = this.elView.def.nodes[i];
                                20224 & childDef.flags && collectReferences(this.elView, childDef, references), 
                                i += childDef.childCount;
                            }
                        }
                        return references;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "componentRenderElement", {
                    get: function() {
                        var elData = function findHostElement(view) {
                            for (;view && !isComponentView(view); ) view = view.parent;
                            return view.parent ? asElementData(view.parent, viewParentEl(view).nodeIndex) : null;
                        }(this.elOrCompView);
                        return elData ? elData.renderElement : void 0;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DebugContext_.prototype, "renderNode", {
                    get: function() {
                        return 2 & this.nodeDef.flags ? renderNode(this.view, this.nodeDef) : renderNode(this.elView, this.elDef);
                    },
                    enumerable: !0,
                    configurable: !0
                }), DebugContext_.prototype.logError = function(console) {
                    for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
                    var logViewDef, logNodeIndex;
                    2 & this.nodeDef.flags ? (logViewDef = this.view.def, logNodeIndex = this.nodeDef.nodeIndex) : (logViewDef = this.elView.def, 
                    logNodeIndex = this.elDef.nodeIndex);
                    var renderNodeIndex = function getRenderNodeIndex(viewDef$$1, nodeIndex) {
                        for (var renderNodeIndex = -1, i = 0; i <= nodeIndex; i++) 3 & viewDef$$1.nodes[i].flags && renderNodeIndex++;
                        return renderNodeIndex;
                    }(logViewDef, logNodeIndex), currRenderNodeIndex = -1;
                    logViewDef.factory(function() {
                        return ++currRenderNodeIndex === renderNodeIndex ? (_a = console.error).bind.apply(_a, [ console ].concat(values)) : NOOP;
                        var _a;
                    }), currRenderNodeIndex < renderNodeIndex && (console.error("Illegal state: the ViewDefinitionFactory did not call the logger!"), 
                    console.error.apply(console, values));
                }, DebugContext_;
            }(), DebugRendererFactory2 = function() {
                function DebugRendererFactory2(delegate) {
                    this.delegate = delegate;
                }
                return DebugRendererFactory2.prototype.createRenderer = function(element, renderData) {
                    return new DebugRenderer2(this.delegate.createRenderer(element, renderData));
                }, DebugRendererFactory2.prototype.begin = function() {
                    this.delegate.begin && this.delegate.begin();
                }, DebugRendererFactory2.prototype.end = function() {
                    this.delegate.end && this.delegate.end();
                }, DebugRendererFactory2.prototype.whenRenderingDone = function() {
                    return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null);
                }, DebugRendererFactory2;
            }(), DebugRenderer2 = function() {
                function DebugRenderer2(delegate) {
                    this.delegate = delegate;
                }
                return Object.defineProperty(DebugRenderer2.prototype, "data", {
                    get: function() {
                        return this.delegate.data;
                    },
                    enumerable: !0,
                    configurable: !0
                }), DebugRenderer2.prototype.destroyNode = function(node) {
                    !function removeDebugNodeFromIndex(node) {
                        _nativeNodeToDebugNode.delete(node.nativeNode);
                    }(getDebugNode(node)), this.delegate.destroyNode && this.delegate.destroyNode(node);
                }, DebugRenderer2.prototype.destroy = function() {
                    this.delegate.destroy();
                }, DebugRenderer2.prototype.createElement = function(name, namespace) {
                    var el = this.delegate.createElement(name, namespace), debugCtx = getCurrentDebugContext();
                    if (debugCtx) {
                        var debugEl = new DebugElement(el, null, debugCtx);
                        debugEl.name = name, indexDebugNode(debugEl);
                    }
                    return el;
                }, DebugRenderer2.prototype.createComment = function(value) {
                    var comment = this.delegate.createComment(value), debugCtx = getCurrentDebugContext();
                    return debugCtx && indexDebugNode(new DebugNode(comment, null, debugCtx)), comment;
                }, DebugRenderer2.prototype.createText = function(value) {
                    var text = this.delegate.createText(value), debugCtx = getCurrentDebugContext();
                    return debugCtx && indexDebugNode(new DebugNode(text, null, debugCtx)), text;
                }, DebugRenderer2.prototype.appendChild = function(parent, newChild) {
                    var debugEl = getDebugNode(parent), debugChildEl = getDebugNode(newChild);
                    debugEl && debugChildEl && debugEl instanceof DebugElement && debugEl.addChild(debugChildEl), 
                    this.delegate.appendChild(parent, newChild);
                }, DebugRenderer2.prototype.insertBefore = function(parent, newChild, refChild) {
                    var debugEl = getDebugNode(parent), debugChildEl = getDebugNode(newChild), debugRefEl = getDebugNode(refChild);
                    debugEl && debugChildEl && debugEl instanceof DebugElement && debugEl.insertBefore(debugRefEl, debugChildEl), 
                    this.delegate.insertBefore(parent, newChild, refChild);
                }, DebugRenderer2.prototype.removeChild = function(parent, oldChild) {
                    var debugEl = getDebugNode(parent), debugChildEl = getDebugNode(oldChild);
                    debugEl && debugChildEl && debugEl instanceof DebugElement && debugEl.removeChild(debugChildEl), 
                    this.delegate.removeChild(parent, oldChild);
                }, DebugRenderer2.prototype.selectRootElement = function(selectorOrNode) {
                    var el = this.delegate.selectRootElement(selectorOrNode), debugCtx = getCurrentDebugContext();
                    return debugCtx && indexDebugNode(new DebugElement(el, null, debugCtx)), el;
                }, DebugRenderer2.prototype.setAttribute = function(el, name, value, namespace) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        var fullName = namespace ? namespace + ":" + name : name;
                        debugEl.attributes[fullName] = value;
                    }
                    this.delegate.setAttribute(el, name, value, namespace);
                }, DebugRenderer2.prototype.removeAttribute = function(el, name, namespace) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        var fullName = namespace ? namespace + ":" + name : name;
                        debugEl.attributes[fullName] = null;
                    }
                    this.delegate.removeAttribute(el, name, namespace);
                }, DebugRenderer2.prototype.addClass = function(el, name) {
                    var debugEl = getDebugNode(el);
                    debugEl && debugEl instanceof DebugElement && (debugEl.classes[name] = !0), this.delegate.addClass(el, name);
                }, DebugRenderer2.prototype.removeClass = function(el, name) {
                    var debugEl = getDebugNode(el);
                    debugEl && debugEl instanceof DebugElement && (debugEl.classes[name] = !1), this.delegate.removeClass(el, name);
                }, DebugRenderer2.prototype.setStyle = function(el, style, value, flags) {
                    var debugEl = getDebugNode(el);
                    debugEl && debugEl instanceof DebugElement && (debugEl.styles[style] = value), this.delegate.setStyle(el, style, value, flags);
                }, DebugRenderer2.prototype.removeStyle = function(el, style, flags) {
                    var debugEl = getDebugNode(el);
                    debugEl && debugEl instanceof DebugElement && (debugEl.styles[style] = null), this.delegate.removeStyle(el, style, flags);
                }, DebugRenderer2.prototype.setProperty = function(el, name, value) {
                    var debugEl = getDebugNode(el);
                    debugEl && debugEl instanceof DebugElement && (debugEl.properties[name] = value), 
                    this.delegate.setProperty(el, name, value);
                }, DebugRenderer2.prototype.listen = function(target, eventName, callback) {
                    if ("string" != typeof target) {
                        var debugEl = getDebugNode(target);
                        debugEl && debugEl.listeners.push(new EventListener(eventName, callback));
                    }
                    return this.delegate.listen(target, eventName, callback);
                }, DebugRenderer2.prototype.parentNode = function(node) {
                    return this.delegate.parentNode(node);
                }, DebugRenderer2.prototype.nextSibling = function(node) {
                    return this.delegate.nextSibling(node);
                }, DebugRenderer2.prototype.setValue = function(node, value) {
                    return this.delegate.setValue(node, value);
                }, DebugRenderer2;
            }(), NgModuleFactory_ = function(_super) {
                function NgModuleFactory_(moduleType, _bootstrapComponents, _ngModuleDefFactory) {
                    var _this = _super.call(this) || this;
                    return _this.moduleType = moduleType, _this._bootstrapComponents = _bootstrapComponents, 
                    _this._ngModuleDefFactory = _ngModuleDefFactory, _this;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_0_tslib__.b)(NgModuleFactory_, _super), 
                NgModuleFactory_.prototype.create = function(parentInjector) {
                    initServicesIfNeeded();
                    var def = resolveDefinition(this._ngModuleDefFactory);
                    return Services.createNgModuleRef(this.moduleType, parentInjector || Injector.NULL, this._bootstrapComponents, def);
                }, NgModuleFactory_;
            }(NgModuleFactory);
        }).call(__webpack_exports__, __webpack_require__("fRUx"));
    }
});