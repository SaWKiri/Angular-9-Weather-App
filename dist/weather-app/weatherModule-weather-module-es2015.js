(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["weatherModule-weather-module"],{

/***/ "./node_modules/immutability-helper/index.js":
/*!***************************************************!*\
  !*** ./node_modules/immutability-helper/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function stringifiable(obj) {
    // Safely stringify Object.create(null)
    /* istanbul ignore next */
    return typeof obj === 'object' && !('toString' in obj) ?
        Object.prototype.toString.call(obj).slice(8, -1) :
        obj;
}
var isProduction = typeof process === 'object' && "development" === 'production';
function invariant(condition, message) {
    if (!condition) {
        /* istanbul ignore next */
        if (isProduction) {
            throw new Error('Invariant failed');
        }
        throw new Error(message());
    }
}
exports.invariant = invariant;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var splice = Array.prototype.splice;
var toString = Object.prototype.toString;
function type(obj) {
    return toString.call(obj).slice(8, -1);
}
var assign = Object.assign || /* istanbul ignore next */ (function (target, source) {
    getAllKeys(source).forEach(function (key) {
        if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    });
    return target;
});
var getAllKeys = typeof Object.getOwnPropertySymbols === 'function'
    ? function (obj) { return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)); }
    /* istanbul ignore next */
    : function (obj) { return Object.keys(obj); };
function copy(object) {
    return Array.isArray(object)
        ? assign(object.constructor(object.length), object)
        : (type(object) === 'Map')
            ? new Map(object)
            : (type(object) === 'Set')
                ? new Set(object)
                : (object && typeof object === 'object')
                    ? assign(Object.create(Object.getPrototypeOf(object)), object)
                    /* istanbul ignore next */
                    : object;
}
var Context = /** @class */ (function () {
    function Context() {
        this.commands = assign({}, defaultCommands);
        this.update = this.update.bind(this);
        // Deprecated: update.extend, update.isEquals and update.newContext
        this.update.extend = this.extend = this.extend.bind(this);
        this.update.isEquals = function (x, y) { return x === y; };
        this.update.newContext = function () { return new Context().update; };
    }
    Object.defineProperty(Context.prototype, "isEquals", {
        get: function () {
            return this.update.isEquals;
        },
        set: function (value) {
            this.update.isEquals = value;
        },
        enumerable: true,
        configurable: true
    });
    Context.prototype.extend = function (directive, fn) {
        this.commands[directive] = fn;
    };
    Context.prototype.update = function (object, $spec) {
        var _this = this;
        var spec = (typeof $spec === 'function') ? { $apply: $spec } : $spec;
        if (!(Array.isArray(object) && Array.isArray(spec))) {
            invariant(!Array.isArray(spec), function () { return "update(): You provided an invalid spec to update(). The spec may " +
                "not contain an array except as the value of $set, $push, $unshift, " +
                "$splice or any custom command allowing an array value."; });
        }
        invariant(typeof spec === 'object' && spec !== null, function () { return "update(): You provided an invalid spec to update(). The spec and " +
            "every included key path must be plain objects containing one of the " +
            ("following commands: " + Object.keys(_this.commands).join(', ') + "."); });
        var nextObject = object;
        getAllKeys(spec).forEach(function (key) {
            if (hasOwnProperty.call(_this.commands, key)) {
                var objectWasNextObject = object === nextObject;
                nextObject = _this.commands[key](spec[key], nextObject, spec, object);
                if (objectWasNextObject && _this.isEquals(nextObject, object)) {
                    nextObject = object;
                }
            }
            else {
                var nextValueForKey = type(object) === 'Map'
                    ? _this.update(object.get(key), spec[key])
                    : _this.update(object[key], spec[key]);
                var nextObjectValue = type(nextObject) === 'Map'
                    ? nextObject.get(key)
                    : nextObject[key];
                if (!_this.isEquals(nextValueForKey, nextObjectValue)
                    || typeof nextValueForKey === 'undefined'
                        && !hasOwnProperty.call(object, key)) {
                    if (nextObject === object) {
                        nextObject = copy(object);
                    }
                    if (type(nextObject) === 'Map') {
                        nextObject.set(key, nextValueForKey);
                    }
                    else {
                        nextObject[key] = nextValueForKey;
                    }
                }
            }
        });
        return nextObject;
    };
    return Context;
}());
exports.Context = Context;
var defaultCommands = {
    $push: function (value, nextObject, spec) {
        invariantPushAndUnshift(nextObject, spec, '$push');
        return value.length ? nextObject.concat(value) : nextObject;
    },
    $unshift: function (value, nextObject, spec) {
        invariantPushAndUnshift(nextObject, spec, '$unshift');
        return value.length ? value.concat(nextObject) : nextObject;
    },
    $splice: function (value, nextObject, spec, originalObject) {
        invariantSplices(nextObject, spec);
        value.forEach(function (args) {
            invariantSplice(args);
            if (nextObject === originalObject && args.length) {
                nextObject = copy(originalObject);
            }
            splice.apply(nextObject, args);
        });
        return nextObject;
    },
    $set: function (value, _nextObject, spec) {
        invariantSet(spec);
        return value;
    },
    $toggle: function (targets, nextObject) {
        invariantSpecArray(targets, '$toggle');
        var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;
        targets.forEach(function (target) {
            nextObjectCopy[target] = !nextObject[target];
        });
        return nextObjectCopy;
    },
    $unset: function (value, nextObject, _spec, originalObject) {
        invariantSpecArray(value, '$unset');
        value.forEach(function (key) {
            if (Object.hasOwnProperty.call(nextObject, key)) {
                if (nextObject === originalObject) {
                    nextObject = copy(originalObject);
                }
                delete nextObject[key];
            }
        });
        return nextObject;
    },
    $add: function (values, nextObject, _spec, originalObject) {
        invariantMapOrSet(nextObject, '$add');
        invariantSpecArray(values, '$add');
        if (type(nextObject) === 'Map') {
            values.forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (nextObject === originalObject && nextObject.get(key) !== value) {
                    nextObject = copy(originalObject);
                }
                nextObject.set(key, value);
            });
        }
        else {
            values.forEach(function (value) {
                if (nextObject === originalObject && !nextObject.has(value)) {
                    nextObject = copy(originalObject);
                }
                nextObject.add(value);
            });
        }
        return nextObject;
    },
    $remove: function (value, nextObject, _spec, originalObject) {
        invariantMapOrSet(nextObject, '$remove');
        invariantSpecArray(value, '$remove');
        value.forEach(function (key) {
            if (nextObject === originalObject && nextObject.has(key)) {
                nextObject = copy(originalObject);
            }
            nextObject.delete(key);
        });
        return nextObject;
    },
    $merge: function (value, nextObject, _spec, originalObject) {
        invariantMerge(nextObject, value);
        getAllKeys(value).forEach(function (key) {
            if (value[key] !== nextObject[key]) {
                if (nextObject === originalObject) {
                    nextObject = copy(originalObject);
                }
                nextObject[key] = value[key];
            }
        });
        return nextObject;
    },
    $apply: function (value, original) {
        invariantApply(value);
        return value(original);
    },
};
var defaultContext = new Context();
exports.isEquals = defaultContext.update.isEquals;
exports.extend = defaultContext.extend;
exports.default = defaultContext.update;
// @ts-ignore
exports.default.default = module.exports = assign(exports.default, exports);
// invariants
function invariantPushAndUnshift(value, spec, command) {
    invariant(Array.isArray(value), function () { return "update(): expected target of " + stringifiable(command) + " to be an array; got " + stringifiable(value) + "."; });
    invariantSpecArray(spec[command], command);
}
function invariantSpecArray(spec, command) {
    invariant(Array.isArray(spec), function () { return "update(): expected spec of " + stringifiable(command) + " to be an array; got " + stringifiable(spec) + ". " +
        "Did you forget to wrap your parameter in an array?"; });
}
function invariantSplices(value, spec) {
    invariant(Array.isArray(value), function () { return "Expected $splice target to be an array; got " + stringifiable(value); });
    invariantSplice(spec.$splice);
}
function invariantSplice(value) {
    invariant(Array.isArray(value), function () { return "update(): expected spec of $splice to be an array of arrays; got " + stringifiable(value) + ". " +
        "Did you forget to wrap your parameters in an array?"; });
}
function invariantApply(fn) {
    invariant(typeof fn === 'function', function () { return "update(): expected spec of $apply to be a function; got " + stringifiable(fn) + "."; });
}
function invariantSet(spec) {
    invariant(Object.keys(spec).length === 1, function () { return "Cannot have more than one key in an object with $set"; });
}
function invariantMerge(target, specValue) {
    invariant(specValue && typeof specValue === 'object', function () { return "update(): $merge expects a spec of type 'object'; got " + stringifiable(specValue); });
    invariant(target && typeof target === 'object', function () { return "update(): $merge expects a target of type 'object'; got " + stringifiable(target); });
}
function invariantMapOrSet(target, command) {
    var typeOfTarget = type(target);
    invariant(typeOfTarget === 'Map' || typeOfTarget === 'Set', function () { return "update(): " + stringifiable(command) + " expects a target of type Set or Map; got " + stringifiable(typeOfTarget); });
}


/***/ }),

/***/ "./src/app/utils/update.ts":
/*!*********************************!*\
  !*** ./src/app/utils/update.ts ***!
  \*********************************/
/*! exports provided: update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var immutability_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutability-helper */ "./node_modules/immutability-helper/index.js");
/* harmony import */ var immutability_helper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutability_helper__WEBPACK_IMPORTED_MODULE_0__);


const UpdateContext = new immutability_helper__WEBPACK_IMPORTED_MODULE_0__["Context"]();
const updateInternal = UpdateContext.update;
Object(immutability_helper__WEBPACK_IMPORTED_MODULE_0__["extend"])('$auto', function (value, object) {
    return object ?
        updateInternal(object, value) :
        updateInternal({}, value);
});
Object(immutability_helper__WEBPACK_IMPORTED_MODULE_0__["extend"])('$autoArray', function (value, object) {
    return object ?
        updateInternal(object, value) :
        updateInternal([], value);
});
const update = updateInternal;


/***/ }),

/***/ "./src/app/weatherModule/components/favorites/favorites.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/weatherModule/components/favorites/favorites.component.ts ***!
  \***************************************************************************/
/*! exports provided: FavoritesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoritesComponent", function() { return FavoritesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_favorites_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/favorites.service */ "./src/app/weatherModule/services/favorites.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");







function FavoritesComponent_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-card-subtitle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FavoritesComponent_mat_card_1_Template_mat_icon_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const weather_r2 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.removeFromFavorites(weather_r2[0]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "highlight_off");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-card-content", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const weather_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/weather-icons/", weather_r2[0].WeatherIcon, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 5, ctx_r0.extractName(weather_r2[0].Link)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](8, 7, weather_r2[0].LocalObservationDateTime, "EEEE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", weather_r2[0].WeatherText, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", weather_r2[0].Temperature.Metric.Value + "" + weather_r2[0].Temperature.Metric.Unit, " ");
} }
function FavoritesComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Favorites Empty");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class FavoritesComponent {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
        this.favorites = [];
        this.favoritesService.getFavorites().pipe(
        // distinctUntilChanged((a,b) => JSON.stringify(a) === JSON.stringify(b)),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(a => {
            this.favorites = a;
        })).subscribe();
    }
    ngOnInit() { }
    extractName(link) {
        return this.extractFromArrayAt(link.split('/'), 4);
    }
    extractKey(link) {
        return this.extractFromArrayAt(link.split('/'), 3);
    }
    extractFromArrayAt(arr, index) {
        return arr[arr.length - index];
    }
    removeFromFavorites(weather) {
        this.favoritesService.removeFromFavorites(this.extractName(weather.Link), this.extractKey(weather.Link));
    }
}
FavoritesComponent.ɵfac = function FavoritesComponent_Factory(t) { return new (t || FavoritesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_favorites_service__WEBPACK_IMPORTED_MODULE_2__["FavoritesService"])); };
FavoritesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FavoritesComponent, selectors: [["ng-component"]], decls: 3, vars: 2, consts: [[1, "grid-container"], ["class", "card", 4, "ngFor", "ngForOf"], ["class", "empty-fav", 4, "ngIf"], [1, "card"], ["mat-card-avatar", "", 1, "header-image", 3, "src"], [1, "spacer"], ["aria-hidden", "false", "aria-label", "remove", 3, "click"], [1, "card-content"], [1, "weather-text"], [1, "weather-temp"], [1, "empty-fav"]], template: function FavoritesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FavoritesComponent_mat_card_1_Template, 17, 10, "mat-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FavoritesComponent_div_2_Template, 3, 0, "div", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.favorites);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.favorites.length === 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardSubtitle"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardContent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["TitleCasePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]], styles: [".card[_ngcontent-%COMP%] {\n  max-width: 400px;\n}\n\n.header-image[_ngcontent-%COMP%] {\n  background-size: cover;\n}\n\n.grid-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: auto;\n  grid-column-gap: 20px;\n  grid-row-gap: 20px;\n  margin-top: 50px;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-flow: column;\n}\n\n.empty-fav[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 82px auto 32px;\n  padding: 0 16px;\n  max-width: 960px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.weather-text[_ngcontent-%COMP%] {\n  font-size: 30px;\n  font-weight: 800;\n}\n\n.weather-temp[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2JsYWNreS9Qcm9ncmFtbWluZy93ZWF0aGVyLWFwcC93ZWF0aGVyLWFwcC9zcmMvYXBwL3dlYXRoZXJNb2R1bGUvY29tcG9uZW50cy9mYXZvcml0ZXMvZmF2b3JpdGVzLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC93ZWF0aGVyTW9kdWxlL2NvbXBvbmVudHMvZmF2b3JpdGVzL2Zhdm9yaXRlcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtFQUNBLHFDQUFBO0VBRUEsb0JBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNBRjs7QURHQTtFQUNFLGNBQUE7QUNBRjs7QURHQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUNBRjs7QURHQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUNBRjs7QURHQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ0FGOztBREdBO0VBQ0UsZ0JBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL3dlYXRoZXJNb2R1bGUvY29tcG9uZW50cy9mYXZvcml0ZXMvZmF2b3JpdGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG4uaGVhZGVyLWltYWdlIHtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLmdyaWQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcbiAgLy8gZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAwLCAxZnIpO1xuICBncmlkLWF1dG8tcm93czogYXV0bztcbiAgZ3JpZC1jb2x1bW4tZ2FwOiAyMHB4O1xuICBncmlkLXJvdy1nYXA6IDIwcHg7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG59XG5cbi5zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLmNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWZsb3c6IGNvbHVtbjtcbn1cblxuLmVtcHR5LWZhdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogODJweCBhdXRvIDMycHg7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgbWF4LXdpZHRoOiA5NjBweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLndlYXRoZXItdGV4dCB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbn1cblxuLndlYXRoZXItdGVtcCB7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG59XG4iLCIuY2FyZCB7XG4gIG1heC13aWR0aDogNDAwcHg7XG59XG5cbi5oZWFkZXItaW1hZ2Uge1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uZ3JpZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xuICBncmlkLWF1dG8tcm93czogYXV0bztcbiAgZ3JpZC1jb2x1bW4tZ2FwOiAyMHB4O1xuICBncmlkLXJvdy1nYXA6IDIwcHg7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG59XG5cbi5zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLmNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWZsb3c6IGNvbHVtbjtcbn1cblxuLmVtcHR5LWZhdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogODJweCBhdXRvIDMycHg7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgbWF4LXdpZHRoOiA5NjBweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLndlYXRoZXItdGV4dCB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbn1cblxuLndlYXRoZXItdGVtcCB7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FavoritesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './favorites.component.html',
                styleUrls: ['./favorites.component.scss'],
            }]
    }], function () { return [{ type: _services_favorites_service__WEBPACK_IMPORTED_MODULE_2__["FavoritesService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/components/footer/footer.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/weatherModule/components/footer/footer.component.ts ***!
  \*********************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 2, vars: 0, template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "footer works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3dlYXRoZXJNb2R1bGUvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/components/header/header.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/weatherModule/components/header/header.component.ts ***!
  \*********************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");






class HeaderComponent {
    constructor(router) {
        this.router = router;
        this.clickFavorite = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    favoriteClicked() {
        this.clickFavorite.emit();
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], outputs: { clickFavorite: "clickFavorite" }, decls: 10, vars: 0, consts: [["color", "primary"], [1, "spacer"], ["mat-icon-button", "", "aria-label", "icon-button with menu icon", "routerLink", "weatherbycity", 1, "icon"], ["mat-icon-button", "", "aria-label", "icon-button with menu icon", "routerLink", "/weather/favorites", 1, "icon"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Weather App");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "cloud");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "favorite");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"]], styles: [".spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.icon[_ngcontent-%COMP%] {\n  margin-left: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2VhdGhlck1vZHVsZS9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvd2VhdGhlck1vZHVsZS9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLnNwYWNlciB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4uaWNvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxNXB4O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, { clickFavorite: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/weatherModule/components/weatherbycity/forcast-card/forcast-card.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/weatherModule/components/weatherbycity/forcast-card/forcast-card.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: ForcastCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForcastCardComponent", function() { return ForcastCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




class ForcastCardComponent {
    constructor() { }
    ngOnInit() { }
}
ForcastCardComponent.ɵfac = function ForcastCardComponent_Factory(t) { return new (t || ForcastCardComponent)(); };
ForcastCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ForcastCardComponent, selectors: [["app-forcast-card"]], inputs: { forcast: "forcast" }, decls: 16, vars: 10, consts: [[1, "card"], [1, "card-header"], [1, "card-content"], ["mat-card-avatar", "", 1, "header-image", 3, "src"], [1, "card-footer"], ["mat-card-avatar", "", 1, "example-header-image", 3, "src"], [1, "night-text"]], template: function ForcastCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card-content", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-card-footer", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-card-subtitle", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](4, 7, ctx.forcast.Date, "EEEE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/weather-icons/", ctx.forcast.Day.Icon, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.forcast.Temperature.Maximum.Value + "" + ctx.forcast.Temperature.Maximum.Unit);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.forcast.Day.IconPhrase);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/weather-icons/", ctx.forcast.Night.Icon, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" Night ", ctx.forcast.Temperature.Minimum.Value + "" + ctx.forcast.Temperature.Minimum.Unit, " - ", ctx.forcast.Night.IconPhrase, "");
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardContent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardFooter"], _angular_material_card__WEBPACK_IMPORTED_MODULE_1__["MatCardSubtitle"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]], styles: [".card[_ngcontent-%COMP%] {\n  width: 250px;\n  margin-left: 50px;\n  background: #2980b9;  \n  background: linear-gradient(to top, #2980b9, #6dd5fa, #ffffff); \n}\n\n.header-image[_ngcontent-%COMP%] {\n  \n  background-size: cover;\n}\n\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-flow: column;\n}\n\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  vertical-align: middle;\n  flex-flow: row;\n}\n\n.night-text[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2VhdGhlck1vZHVsZS9jb21wb25lbnRzL3dlYXRoZXJieWNpdHkvZm9yY2FzdC1jYXJkL2ZvcmNhc3QtY2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixtQkFBbUIsRUFBRSw4QkFBOEIsRUFDdUIsK0JBQStCO0VBQ3pHLDhEQUE4RCxFQUFFLHFFQUFxRTtBQUN2STs7QUFFQTtFQUNFLHlGQUF5RjtFQUN6RixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvd2VhdGhlck1vZHVsZS9jb21wb25lbnRzL3dlYXRoZXJieWNpdHkvZm9yY2FzdC1jYXJkL2ZvcmNhc3QtY2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xuICB3aWR0aDogMjUwcHg7XG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xuICBiYWNrZ3JvdW5kOiAjMjk4MGI5OyAvKiBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzICovXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjMjk4MGI5LCAjNmRkNWZhLCAjZmZmZmZmKTsgLyogQ2hyb21lIDEwLTI1LCBTYWZhcmkgNS4xLTYgKi9cbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzI5ODBiOSwgIzZkZDVmYSwgI2ZmZmZmZik7IC8qIFczQywgSUUgMTArLyBFZGdlLCBGaXJlZm94IDE2KywgQ2hyb21lIDI2KywgT3BlcmEgMTIrLCBTYWZhcmkgNysgKi9cbn1cblxuLmhlYWRlci1pbWFnZSB7XG4gIC8qIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2Fzc2V0cy9pbWcvZXhhbXBsZXMvc2hpYmExLmpwZycpOyAqL1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWZsb3c6IGNvbHVtbjtcbn1cblxuLmNhcmQtZm9vdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGZsZXgtZmxvdzogcm93O1xufVxuXG4ubmlnaHQtdGV4dCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ForcastCardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-forcast-card',
                templateUrl: './forcast-card.component.html',
                styleUrls: ['./forcast-card.component.css']
            }]
    }], function () { return []; }, { forcast: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/weatherModule/components/weatherbycity/weatherbycity.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/weatherModule/components/weatherbycity/weatherbycity.component.ts ***!
  \***********************************************************************************/
/*! exports provided: WeatherbycityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherbycityComponent", function() { return WeatherbycityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _services_accuweather_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/accuweather-api.service */ "./src/app/weatherModule/services/accuweather-api.service.ts");
/* harmony import */ var _services_geolocation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/geolocation.service */ "./src/app/weatherModule/services/geolocation.service.ts");
/* harmony import */ var _services_weatherAppStoreFacade_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/weatherAppStoreFacade.service */ "./src/app/weatherModule/services/weatherAppStoreFacade.service.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/autocomplete.js");
/* harmony import */ var _directives_english_only_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../directives/english-only.directive */ "./src/app/weatherModule/directives/english-only.directive.ts");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _forcast_card_forcast_card_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./forcast-card/forcast-card.component */ "./src/app/weatherModule/components/weatherbycity/forcast-card/forcast-card.component.ts");


















function WeatherbycityComponent_mat_option_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WeatherbycityComponent_mat_option_9_Template_mat_option_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const suggestion_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.selectSuggestion(suggestion_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const suggestion_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", suggestion_r3.LocalizedName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", suggestion_r3.LocalizedName, " ");
} }
function WeatherbycityComponent_ng_container_11_mat_card_1_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WeatherbycityComponent_ng_container_11_mat_card_1_ng_container_14_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const inFavorite_r11 = ctx.ngIf; const areaName_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf; const areaWeather_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return inFavorite_r11 === "accent" ? ctx_r12.storeFacade.removeFromFavorites(areaName_r8, areaWeather_r6.AreaKey) : ctx_r12.storeFacade.addToFavorites(areaName_r8, areaWeather_r6.AreaKey); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "favorite");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const inFavorite_r11 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("color", inFavorite_r11);
} }
function WeatherbycityComponent_ng_container_11_mat_card_1_app_forcast_card_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-forcast-card", 21);
} if (rf & 2) {
    const forcast_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("forcast", forcast_r16);
} }
function WeatherbycityComponent_ng_container_11_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-title", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-subtitle", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u00B0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-card-actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, WeatherbycityComponent_ng_container_11_mat_card_1_ng_container_14_Template, 4, 1, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-card-content", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](19, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, WeatherbycityComponent_ng_container_11_mat_card_1_app_forcast_card_21_Template, 1, 1, "app-forcast-card", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](22, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const areaWeather_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/weather-icons/", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 6, ctx_r7.storeFacade.cuurentWeatherIcon$), ".png", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 8, ctx_r7.storeFacade.currentCityName$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](9, 10, ctx_r7.storeFacade.currentCityTemp$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 12, ctx_r7.storeFacade.isInFavorites(areaWeather_r6.AreaKey)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](19, 14, ctx_r7.storeFacade.currentWeatherText$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](22, 16, ctx_r7.storeFacade.fiveDayForcast$));
} }
function WeatherbycityComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WeatherbycityComponent_ng_container_11_mat_card_1_Template, 23, 18, "mat-card", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx_r2.storeFacade.currentCityName$));
} }
class WeatherbycityComponent {
    constructor(accuweatherApiService, geoLocationService, storeFacade) {
        this.accuweatherApiService = accuweatherApiService;
        this.geoLocationService = geoLocationService;
        this.storeFacade = storeFacade;
        this.autoCompleteInput = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.autoCompleteInput
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((data) => data.length > 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(900), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((data) => {
            const a = this.accuweatherApiService.getAutoComplete(data);
            return a;
        }))
            .subscribe((suggestions) => {
            this.autoCompletedSuggestions = suggestions;
        }, console.error);
        this.geoLocationService
            .getAccuWeatherByLocation()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((location) => {
            this.storeFacade.setAreaWeather(location.Key, location.LocalizedName);
        }))
            .subscribe();
    }
    selectSuggestion(option) {
        this.autoCompleteValue = option.LocalizedName;
        this.storeFacade.setAreaWeather(option.Key, option.LocalizedName);
    }
    ngOnInit() { }
    ngOnDestroy() { }
}
WeatherbycityComponent.ɵfac = function WeatherbycityComponent_Factory(t) { return new (t || WeatherbycityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_accuweather_api_service__WEBPACK_IMPORTED_MODULE_3__["AccuweatherApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_geolocation_service__WEBPACK_IMPORTED_MODULE_4__["GeolocationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_weatherAppStoreFacade_service__WEBPACK_IMPORTED_MODULE_5__["WeatherAppStoreService"])); };
WeatherbycityComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WeatherbycityComponent, selectors: [["app-weatherbycity"]], decls: 13, vars: 6, consts: [[1, "city-search"], [1, "city-search-input"], ["type", "text", "placeholder", "search", "matInput", "", "appEnglishOnly", "", 3, "ngModel", "matAutocomplete", "input"], ["matSuffix", ""], ["autoActiveFirstOption", ""], ["auto", "matAutocomplete"], [3, "value", "click", 4, "ngFor", "ngForOf"], [1, "content-wrapper"], [4, "ngIf"], [3, "value", "click"], ["class", "weather-card", 4, "ngIf"], [1, "weather-card"], [1, "weather-card-header"], ["mat-card-avatar", "", 1, "weather-header-image", 3, "src"], [1, "card-city-name"], [1, "city-temp"], [1, "spacer"], [1, "main-card-content"], [1, "forcast"], [3, "forcast", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", 3, "color", "click"], [3, "forcast"]], template: function WeatherbycityComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Search By City");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function WeatherbycityComponent_Template_input_input_4_listener($event) { return ctx.autoCompleteInput.next($event.target.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-autocomplete", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WeatherbycityComponent_mat_option_9_Template, 2, 2, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, WeatherbycityComponent_ng_container_11_Template, 3, 3, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.autoCompleteValue)("matAutocomplete", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.autoCompletedSuggestions);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](12, 4, ctx.storeFacade.areaWeather$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocompleteTrigger"], _directives_english_only_directive__WEBPACK_IMPORTED_MODULE_10__["EnglishOnlyDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIcon"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatSuffix"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__["MatAutocomplete"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOption"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardAvatar"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardSubtitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardActions"], _angular_material_card__WEBPACK_IMPORTED_MODULE_14__["MatCardContent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"], _forcast_card_forcast_card_component__WEBPACK_IMPORTED_MODULE_16__["ForcastCardComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__["AsyncPipe"]], styles: [".city-search[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 82px auto 32px;\n  padding: 0 16px;\n  max-width: 960px;\n  flex-direction: column;\n  align-items: center;\n}\n\n.search-form[_ngcontent-%COMP%] {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.search-full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.city-search-input[_ngcontent-%COMP%]{\n  width: 500px;\n}\n\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 0px;\n  margin-top: -10px;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.weather-card[_ngcontent-%COMP%] {\n  background: #2980b9;  \n  background: linear-gradient(\n    to top,\n    #2980b9,\n    #6dd5fa,\n    #ffffff\n  ); \n  max-width: 90%;\n  border: 1px solid #000;\n  display: flex;\n  margin: 82px auto 32px;\n  padding: 0 16px;\n  max-width: 90%;\n  flex-direction: column;\n  padding-bottom: 15px;\n}\n\n.weather-card-header[_ngcontent-%COMP%] {\n  padding-top: 15px;\n}\n\n.weather-header-image[_ngcontent-%COMP%] {\n  \n  background-size: cover;\n  width: 70px;\n  height: 100px;\n}\n\n.card-city-name[_ngcontent-%COMP%] {\n  font-size: 50px;\n  font-weight: 800;\n}\n\n.city-temp[_ngcontent-%COMP%]{\n  font-size: 40px;\n}\n\n.main-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  \n  flex-direction: column;\n  align-items: center;\n}\n\n.forcast[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n}\n\nh1[_ngcontent-%COMP%] {\n  font-family: \"Sriracha\", cursive;\n  font-size: 80px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2VhdGhlck1vZHVsZS9jb21wb25lbnRzL3dlYXRoZXJieWNpdHkvd2VhdGhlcmJ5Y2l0eS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFHQTtFQUNFLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUIsRUFBRSw4QkFBOEIsRUFNaEQsK0JBQStCO0VBQ2xDOzs7OztHQUtDLEVBQUUscUVBQXFFO0VBQ3hFLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx5RkFBeUY7RUFDekYsc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYjs7cUJBRW1CO0VBQ25CLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvd2VhdGhlck1vZHVsZS9jb21wb25lbnRzL3dlYXRoZXJieWNpdHkvd2VhdGhlcmJ5Y2l0eS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNpdHktc2VhcmNoIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiA4MnB4IGF1dG8gMzJweDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBtYXgtd2lkdGg6IDk2MHB4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc2VhcmNoLWZvcm0ge1xuICBtaW4td2lkdGg6IDE1MHB4O1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnNlYXJjaC1mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jaXR5LXNlYXJjaC1pbnB1dHtcbiAgd2lkdGg6IDUwMHB4O1xufVxuXG5cbi5zZWFyY2gtaWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHJpZ2h0OiAwcHg7XG4gIG1hcmdpbi10b3A6IC0xMHB4O1xufVxuXG4uc3BhY2VyIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi53ZWF0aGVyLWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjMjk4MGI5OyAvKiBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzICovXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KFxuICAgIHRvIHJpZ2h0LFxuICAgICMyOTgwYjksXG4gICAgIzZkZDVmYSxcbiAgICAjZmZmZmZmXG4gICk7IC8qIENocm9tZSAxMC0yNSwgU2FmYXJpIDUuMS02ICovXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICB0byB0b3AsXG4gICAgIzI5ODBiOSxcbiAgICAjNmRkNWZhLFxuICAgICNmZmZmZmZcbiAgKTsgLyogVzNDLCBJRSAxMCsvIEVkZ2UsIEZpcmVmb3ggMTYrLCBDaHJvbWUgMjYrLCBPcGVyYSAxMissIFNhZmFyaSA3KyAqL1xuICBtYXgtd2lkdGg6IDkwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiA4MnB4IGF1dG8gMzJweDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBtYXgtd2lkdGg6IDkwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7XG59XG5cbi53ZWF0aGVyLWNhcmQtaGVhZGVyIHtcbiAgcGFkZGluZy10b3A6IDE1cHg7XG59XG5cbi53ZWF0aGVyLWhlYWRlci1pbWFnZSB7XG4gIC8qIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2Fzc2V0cy9pbWcvZXhhbXBsZXMvc2hpYmExLmpwZycpOyAqL1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICB3aWR0aDogNzBweDtcbiAgaGVpZ2h0OiAxMDBweDtcbn1cblxuLmNhcmQtY2l0eS1uYW1lIHtcbiAgZm9udC1zaXplOiA1MHB4O1xuICBmb250LXdlaWdodDogODAwO1xufVxuXG4uY2l0eS10ZW1we1xuICBmb250LXNpemU6IDQwcHg7XG59XG5cbi5tYWluLWNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC8qIG1hcmdpbjogODJweCBhdXRvIDMycHg7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgbWF4LXdpZHRoOiA5NjBweDsgKi9cbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmZvcmNhc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cblxuaDEge1xuICBmb250LWZhbWlseTogXCJTcmlyYWNoYVwiLCBjdXJzaXZlO1xuICBmb250LXNpemU6IDgwcHg7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WeatherbycityComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-weatherbycity',
                templateUrl: './weatherbycity.component.html',
                styleUrls: ['./weatherbycity.component.css'],
            }]
    }], function () { return [{ type: _services_accuweather_api_service__WEBPACK_IMPORTED_MODULE_3__["AccuweatherApiService"] }, { type: _services_geolocation_service__WEBPACK_IMPORTED_MODULE_4__["GeolocationService"] }, { type: _services_weatherAppStoreFacade_service__WEBPACK_IMPORTED_MODULE_5__["WeatherAppStoreService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/directives/english-only.directive.ts":
/*!********************************************************************!*\
  !*** ./src/app/weatherModule/directives/english-only.directive.ts ***!
  \********************************************************************/
/*! exports provided: EnglishOnlyDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnglishOnlyDirective", function() { return EnglishOnlyDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class EnglishOnlyDirective {
    constructor(_el) {
        this._el = _el;
    }
    onInputChange(event) {
        const initalValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z ]*/g, '');
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
EnglishOnlyDirective.ɵfac = function EnglishOnlyDirective_Factory(t) { return new (t || EnglishOnlyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
EnglishOnlyDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: EnglishOnlyDirective, selectors: [["", "appEnglishOnly", ""]], hostBindings: function EnglishOnlyDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function EnglishOnlyDirective_input_HostBindingHandler($event) { return ctx.onInputChange($event); });
    } } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EnglishOnlyDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appEnglishOnly]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { onInputChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['input', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/app/weatherModule/services/accuweather-api.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/weatherModule/services/accuweather-api.service.ts ***!
  \*******************************************************************/
/*! exports provided: AccuweatherApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccuweatherApiService", function() { return AccuweatherApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _repository_urls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repository-urls */ "./src/app/weatherModule/services/repository-urls.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");






class AccuweatherApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.API_KEY = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].API_KEY;
    }
    getRequest(url, p) {
        if (p) {
            const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]({
                fromObject: Object.assign({ apikey: this.API_KEY }, p),
            });
            return this.httpClient.get(url, { params });
        }
        else {
            const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]({ fromObject: { apikey: this.API_KEY } });
            return this.httpClient.get(url, { params });
        }
    }
    getGeoPosition(geoPosition) {
        return this.getRequest(_repository_urls__WEBPACK_IMPORTED_MODULE_2__["repositoryUrl"].geoposition.geoPosition, { q: `${geoPosition.lat},${geoPosition.lon}` });
    }
    getAutoComplete(key) {
        return this.getRequest(_repository_urls__WEBPACK_IMPORTED_MODULE_2__["repositoryUrl"].geoposition.autoComplete, { q: `${key}` });
    }
    get5DaysOfForecasts(key, metric = true) {
        return this.getRequest(_repository_urls__WEBPACK_IMPORTED_MODULE_2__["repositoryUrl"].forcasts.getFiveDaysForcast(key), { metric: metric });
    }
    getCurrentConditions(key) {
        return this.getRequest(_repository_urls__WEBPACK_IMPORTED_MODULE_2__["repositoryUrl"].currentConditions.getCurrentCondition(key));
    }
}
AccuweatherApiService.ɵfac = function AccuweatherApiService_Factory(t) { return new (t || AccuweatherApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
AccuweatherApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AccuweatherApiService, factory: AccuweatherApiService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AccuweatherApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/services/favorites.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/weatherModule/services/favorites.service.ts ***!
  \*************************************************************/
/*! exports provided: FavoritesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoritesService", function() { return FavoritesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _weatherAppStoreFacade_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./weatherAppStoreFacade.service */ "./src/app/weatherModule/services/weatherAppStoreFacade.service.ts");
/* harmony import */ var _accuweather_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accuweather-api.service */ "./src/app/weatherModule/services/accuweather-api.service.ts");






class FavoritesService {
    constructor(storeFacade, accuWeatherApi) {
        this.storeFacade = storeFacade;
        this.accuWeatherApi = accuWeatherApi;
    }
    getFavorites() {
        return this.storeFacade.favorites$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((f) => {
            let data = [];
            if (f.length === 0) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])([]);
            }
            f.forEach((element) => {
                data.push(this.accuWeatherApi.getCurrentConditions(element.Key));
            });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(...data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(zip => zip));
    }
    getCurrentWeather(key) {
        return this.accuWeatherApi.getCurrentConditions(key);
    }
    removeFromFavorites(name, key) {
        this.storeFacade.removeFromFavorites(key, name);
    }
}
FavoritesService.ɵfac = function FavoritesService_Factory(t) { return new (t || FavoritesService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_weatherAppStoreFacade_service__WEBPACK_IMPORTED_MODULE_3__["WeatherAppStoreService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_accuweather_api_service__WEBPACK_IMPORTED_MODULE_4__["AccuweatherApiService"])); };
FavoritesService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: FavoritesService, factory: FavoritesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FavoritesService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _weatherAppStoreFacade_service__WEBPACK_IMPORTED_MODULE_3__["WeatherAppStoreService"] }, { type: _accuweather_api_service__WEBPACK_IMPORTED_MODULE_4__["AccuweatherApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/services/geolocation.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/weatherModule/services/geolocation.service.ts ***!
  \***************************************************************/
/*! exports provided: GeolocationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeolocationService", function() { return GeolocationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _accuweather_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accuweather-api.service */ "./src/app/weatherModule/services/accuweather-api.service.ts");





class GeolocationService {
    constructor(accuweatherApiService) {
        this.accuweatherApiService = accuweatherApiService;
        this.geolocation = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        if (!navigator.geolocation) {
            console.log('location is not supported');
        }
        navigator.geolocation.getCurrentPosition((position) => {
            this.updatgeGeolocatgion({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        });
    }
    updatgeGeolocatgion(location) {
        this.geolocation.next(location);
    }
    getGeolocation() {
        return this.geolocation.value;
    }
    getAccuWeatherByLocation() {
        if (this.geolocation.value !== null) {
            return this.accuweatherApiService.getGeoPosition({ lat: this.geolocation.value.lat, lon: this.geolocation.value.lon });
        }
        else {
            return this.accuweatherApiService.getGeoPosition(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].DefaultLocation);
        }
    }
}
GeolocationService.ɵfac = function GeolocationService_Factory(t) { return new (t || GeolocationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_accuweather_api_service__WEBPACK_IMPORTED_MODULE_3__["AccuweatherApiService"])); };
GeolocationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GeolocationService, factory: GeolocationService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GeolocationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _accuweather_api_service__WEBPACK_IMPORTED_MODULE_3__["AccuweatherApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/services/repository-urls.ts":
/*!***********************************************************!*\
  !*** ./src/app/weatherModule/services/repository-urls.ts ***!
  \***********************************************************/
/*! exports provided: repositoryUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repositoryUrl", function() { return repositoryUrl; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");

const baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].apiUrl;
const repositoryUrlGeoPositionUrl = baseUrl + '/locations/v1';
const repositoryUrlGeoPositioController = {
    geoPosition: repositoryUrlGeoPositionUrl + '/cities/geoposition/search',
    autoComplete: repositoryUrlGeoPositionUrl + '/cities/autocomplete',
};
const repositoryUrlForcastUrl = baseUrl + '/forecasts/v1';
const repositoryUrlForcastController = {
    getFiveDaysForcast: (key) => `${repositoryUrlForcastUrl}/daily/5day/${key}`
};
const repositoryUrlCurrentConditionUrl = baseUrl;
const repositoryUrlCurrentConditionController = {
    getCurrentCondition: (key) => `${repositoryUrlCurrentConditionUrl}/currentconditions/v1/${key}`
};
const repositoryUrl = {
    geoposition: repositoryUrlGeoPositioController,
    forcasts: repositoryUrlForcastController,
    currentConditions: repositoryUrlCurrentConditionController
};


/***/ }),

/***/ "./src/app/weatherModule/services/tempSelection.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/weatherModule/services/tempSelection.service.ts ***!
  \*****************************************************************/
/*! exports provided: TempSelectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TempSelectionService", function() { return TempSelectionService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");



class TempSelectionService {
    constructor() {
        this.isCelsiusSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](true);
        this.isCelsius$ = this.isCelsiusSubject.asObservable();
        this.getIsCelsius = () => {
            return this.isCelsiusSubject.value;
        };
        this.setIsCelsius = (isCelsius) => {
            this.isCelsiusSubject.next(isCelsius);
        };
    }
}
TempSelectionService.ɵfac = function TempSelectionService_Factory(t) { return new (t || TempSelectionService)(); };
TempSelectionService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TempSelectionService, factory: TempSelectionService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](TempSelectionService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/services/weatherAppStoreFacade.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/weatherModule/services/weatherAppStoreFacade.service.ts ***!
  \*************************************************************************/
/*! exports provided: WeatherAppStoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherAppStoreService", function() { return WeatherAppStoreService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _store_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/selectors */ "./src/app/weatherModule/store/selectors/index.ts");
/* harmony import */ var _store_actions_favorites_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/actions/favorites.actions */ "./src/app/weatherModule/store/actions/favorites.actions.ts");
/* harmony import */ var _store_actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/actions/areaWeather.action */ "./src/app/weatherModule/store/actions/areaWeather.action.ts");
/* harmony import */ var _tempSelection_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tempSelection.service */ "./src/app/weatherModule/services/tempSelection.service.ts");









class WeatherAppStoreService {
    constructor(_store, tempSelectionService) {
        this._store = _store;
        this.tempSelectionService = tempSelectionService;
        this.areaWeather$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaWeather));
        this.currentCityName$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaName), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((option) => option !== null));
        this.currentCityKey$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaKey));
        this.currentCityTemp$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaTemp), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((temp) => temp !== null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((temp) => {
            if (this.tempSelectionService.getIsCelsius()) {
                return temp.Metric.Value + ' ' + temp.Metric.Unit;
            }
            return temp.Imperial.Value + ' ' + temp.Imperial.Unit;
        }));
        this.cuurentWeatherIcon$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaWeatherIcon), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((a) => a !== null));
        this.currentWeatherText$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaWeatherText), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((a) => a !== null));
        this.fiveDayForcast$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].areaWeatherSelectors.areaWeatherForcast), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((forcast) => forcast !== null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((forcast) => forcast.DailyForecasts));
        this.favorites$ = this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].favoritesSelectors.getFavorites), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((a) => a !== null));
        // currentSelectedCity$: Observable<autoCompleteOption> = this._store.pipe(
        //   select(weatherAppSelectors.optionSelectors.selectedCity),
        //   tap((a) => a)
        // );
        this.setAreaWeather = (key, name) => {
            this._store.dispatch(_store_actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_5__["areaWeatherAction"].getAreaWeather({
                payload: { areaKey: key, areaName: name },
            }));
        };
        this.addToFavorites = (key, name) => {
            this._store.dispatch(_store_actions_favorites_actions__WEBPACK_IMPORTED_MODULE_4__["favoriteAction"].addFavorite({
                payload: { fav: { Key: key, LocalizedName: name } },
            }));
        };
        this.removeFromFavorites = (key, name) => {
            this._store.dispatch(_store_actions_favorites_actions__WEBPACK_IMPORTED_MODULE_4__["favoriteAction"].removeFavorite({
                payload: { fav: { Key: key, LocalizedName: name } },
            }));
        };
        this.isInFavorites = (key) => {
            return this._store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["select"])(_store_selectors__WEBPACK_IMPORTED_MODULE_3__["weatherAppSelectors"].favoritesSelectors.getFavorites), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((favorites) => {
                return favorites.findIndex((f) => f.Key === key) >= 0
                    ? 'accent'
                    : 'primary';
            }));
        };
    }
}
WeatherAppStoreService.ɵfac = function WeatherAppStoreService_Factory(t) { return new (t || WeatherAppStoreService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_tempSelection_service__WEBPACK_IMPORTED_MODULE_6__["TempSelectionService"])); };
WeatherAppStoreService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: WeatherAppStoreService, factory: WeatherAppStoreService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WeatherAppStoreService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"] }, { type: _tempSelection_service__WEBPACK_IMPORTED_MODULE_6__["TempSelectionService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/store/actions/areaWeather.action.ts":
/*!*******************************************************************!*\
  !*** ./src/app/weatherModule/store/actions/areaWeather.action.ts ***!
  \*******************************************************************/
/*! exports provided: areaWeatherAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaWeatherAction", function() { return areaWeatherAction; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");

var AreaWeatherActionTypes;
(function (AreaWeatherActionTypes) {
    AreaWeatherActionTypes["GET_AREA_WEATHER"] = "[Area Weather] getAreaWeather";
    AreaWeatherActionTypes["APPLY_AREA_WEATHER"] = "[Area Weather] applyAreaWeather";
})(AreaWeatherActionTypes || (AreaWeatherActionTypes = {}));
const areaWeatherAction = {
    getAreaWeather: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])(AreaWeatherActionTypes.GET_AREA_WEATHER, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])()),
    applyAreaWeather: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])(AreaWeatherActionTypes.APPLY_AREA_WEATHER, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])())
};


/***/ }),

/***/ "./src/app/weatherModule/store/actions/favorites.actions.ts":
/*!******************************************************************!*\
  !*** ./src/app/weatherModule/store/actions/favorites.actions.ts ***!
  \******************************************************************/
/*! exports provided: favoriteAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "favoriteAction", function() { return favoriteAction; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");

var FavoritesActionType;
(function (FavoritesActionType) {
    FavoritesActionType["ADD_FAVORITE"] = "[Favorites] addFavorite";
    FavoritesActionType["REMOVE_FAVORITE"] = "[Favorites] removeFavorite";
    FavoritesActionType["APPLY_FAVORITE"] = "[Favorites] applyFavorite";
})(FavoritesActionType || (FavoritesActionType = {}));
const favoriteAction = {
    addFavorite: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])(FavoritesActionType.ADD_FAVORITE, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])()),
    removeFavorite: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])(FavoritesActionType.REMOVE_FAVORITE, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])()),
    applyFavorite: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])(FavoritesActionType.APPLY_FAVORITE, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])())
};


/***/ }),

/***/ "./src/app/weatherModule/store/effects/areaWeather.effects.ts":
/*!********************************************************************!*\
  !*** ./src/app/weatherModule/store/effects/areaWeather.effects.ts ***!
  \********************************************************************/
/*! exports provided: AreaWeatherEffect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaWeatherEffect", function() { return AreaWeatherEffect; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/__ivy_ngcc__/fesm2015/effects.js");
/* harmony import */ var _actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/areaWeather.action */ "./src/app/weatherModule/store/actions/areaWeather.action.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _services_accuweather_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/accuweather-api.service */ "./src/app/weatherModule/services/accuweather-api.service.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");









class AreaWeatherEffect {
    constructor(actions$, accuweatherApiService, _store) {
        this.actions$ = actions$;
        this.accuweatherApiService = accuweatherApiService;
        this._store = _store;
        this.getAreaWeather$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["createEffect"])(() => {
            return this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["ofType"])(_actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_2__["areaWeatherAction"].getAreaWeather), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])((val) => {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(val.payload), this.accuweatherApiService.getCurrentConditions(val.payload.areaKey), this.accuweatherApiService.get5DaysOfForecasts(val.payload.areaKey, true));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(([payload, cityWeather, forcast]) => {
                return _actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_2__["areaWeatherAction"].applyAreaWeather({
                    payload: {
                        areaWeather: Object.assign(Object.assign({ AreaKey: payload.areaKey, AreaName: payload.areaName }, cityWeather[0]), { Forcast: forcast }),
                    },
                });
            }));
        });
    }
}
AreaWeatherEffect.ɵfac = function AreaWeatherEffect_Factory(t) { return new (t || AreaWeatherEffect)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_accuweather_api_service__WEBPACK_IMPORTED_MODULE_5__["AccuweatherApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_6__["Store"])); };
AreaWeatherEffect.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AreaWeatherEffect, factory: AreaWeatherEffect.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AreaWeatherEffect, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"] }, { type: _services_accuweather_api_service__WEBPACK_IMPORTED_MODULE_5__["AccuweatherApiService"] }, { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_6__["Store"] }]; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/store/reducers/areaWeather.reducer.ts":
/*!*********************************************************************!*\
  !*** ./src/app/weatherModule/store/reducers/areaWeather.reducer.ts ***!
  \*********************************************************************/
/*! exports provided: reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _states_areaWeather_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../states/areaWeather.state */ "./src/app/weatherModule/store/states/areaWeather.state.ts");
/* harmony import */ var _actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/areaWeather.action */ "./src/app/weatherModule/store/actions/areaWeather.action.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var src_app_utils_update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/update */ "./src/app/utils/update.ts");




const areaWeatherReducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["createReducer"])(_states_areaWeather_state__WEBPACK_IMPORTED_MODULE_0__["initialState"], Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["on"])(_actions_areaWeather_action__WEBPACK_IMPORTED_MODULE_1__["areaWeatherAction"].applyAreaWeather, (state, action) => {
    return Object(src_app_utils_update__WEBPACK_IMPORTED_MODULE_3__["update"])(state, { $set: action.payload.areaWeather });
}));
function reducer(state, action) {
    return areaWeatherReducer(state, action);
}


/***/ }),

/***/ "./src/app/weatherModule/store/reducers/favorites.reducer.ts":
/*!*******************************************************************!*\
  !*** ./src/app/weatherModule/store/reducers/favorites.reducer.ts ***!
  \*******************************************************************/
/*! exports provided: reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _utils_update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/update */ "./src/app/utils/update.ts");
/* harmony import */ var _actions_favorites_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/favorites.actions */ "./src/app/weatherModule/store/actions/favorites.actions.ts");
/* harmony import */ var _states_favorites_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../states/favorites.state */ "./src/app/weatherModule/store/states/favorites.state.ts");




const favoritesReducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(_states_favorites_state__WEBPACK_IMPORTED_MODULE_3__["initialState"], Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_actions_favorites_actions__WEBPACK_IMPORTED_MODULE_2__["favoriteAction"].addFavorite, (state, action) => {
    if (state &&
        state.findIndex((arr) => arr.Key === action.payload.fav.Key) > -1) {
        return state;
    }
    else {
        return Object(_utils_update__WEBPACK_IMPORTED_MODULE_1__["update"])(state, {
            $push: [{
                    Key: action.payload.fav.Key,
                    LocalizedName: action.payload.fav.LocalizedName,
                }],
        });
    }
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_actions_favorites_actions__WEBPACK_IMPORTED_MODULE_2__["favoriteAction"].removeFavorite, (state, action) => {
    if (!state) {
        return state;
    }
    let index = state.findIndex((arr) => arr.Key == action.payload.fav.Key);
    if (index < 0) {
        return state;
    }
    else {
        return Object(_utils_update__WEBPACK_IMPORTED_MODULE_1__["update"])(state, { $splice: [[index, 1]] });
    }
}));
function reducer(state, action) {
    return favoritesReducer(state, action);
}


/***/ }),

/***/ "./src/app/weatherModule/store/reducers/index.ts":
/*!*******************************************************!*\
  !*** ./src/app/weatherModule/store/reducers/index.ts ***!
  \*******************************************************/
/*! exports provided: CITY_WEATHER_FEATURE, reducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CITY_WEATHER_FEATURE", function() { return CITY_WEATHER_FEATURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony import */ var _favorites_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./favorites.reducer */ "./src/app/weatherModule/store/reducers/favorites.reducer.ts");
/* harmony import */ var _areaWeather_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./areaWeather.reducer */ "./src/app/weatherModule/store/reducers/areaWeather.reducer.ts");


const CITY_WEATHER_FEATURE = 'CITY_WEATHER_FEATURE';
const reducers = {
    favorites: _favorites_reducer__WEBPACK_IMPORTED_MODULE_0__["reducer"],
    areaWeather: _areaWeather_reducer__WEBPACK_IMPORTED_MODULE_1__["reducer"],
};


/***/ }),

/***/ "./src/app/weatherModule/store/selectors/areaWeather.selectors.ts":
/*!************************************************************************!*\
  !*** ./src/app/weatherModule/store/selectors/areaWeather.selectors.ts ***!
  \************************************************************************/
/*! exports provided: areaWeatherSelectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaWeatherSelectors", function() { return areaWeatherSelectors; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/app/weatherModule/store/selectors/common.ts");


const areaWeatherSelectors = {
    areaWeather: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather),
    areaName: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather.AreaName),
    areaKey: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather.AreaKey),
    areaTemp: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather.Temperature),
    areaWeatherText: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather.WeatherText),
    areaWeatherIcon: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather.WeatherIcon),
    areaWeatherForcast: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.areaWeather.Forcast),
};


/***/ }),

/***/ "./src/app/weatherModule/store/selectors/common.ts":
/*!*********************************************************!*\
  !*** ./src/app/weatherModule/store/selectors/common.ts ***!
  \*********************************************************/
/*! exports provided: weatherAppSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weatherAppSelector", function() { return weatherAppSelector; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers */ "./src/app/weatherModule/store/reducers/index.ts");


const weatherAppSelector = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_reducers__WEBPACK_IMPORTED_MODULE_1__["CITY_WEATHER_FEATURE"]);


/***/ }),

/***/ "./src/app/weatherModule/store/selectors/favorites.selectors.ts":
/*!**********************************************************************!*\
  !*** ./src/app/weatherModule/store/selectors/favorites.selectors.ts ***!
  \**********************************************************************/
/*! exports provided: favoritesSelectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "favoritesSelectors", function() { return favoritesSelectors; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/app/weatherModule/store/selectors/common.ts");


const favoritesSelectors = {
    getFavorites: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_common__WEBPACK_IMPORTED_MODULE_1__["weatherAppSelector"], (state) => state.favorites),
};


/***/ }),

/***/ "./src/app/weatherModule/store/selectors/index.ts":
/*!********************************************************!*\
  !*** ./src/app/weatherModule/store/selectors/index.ts ***!
  \********************************************************/
/*! exports provided: weatherAppSelectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weatherAppSelectors", function() { return weatherAppSelectors; });
/* harmony import */ var _favorites_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./favorites.selectors */ "./src/app/weatherModule/store/selectors/favorites.selectors.ts");
/* harmony import */ var _areaWeather_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./areaWeather.selectors */ "./src/app/weatherModule/store/selectors/areaWeather.selectors.ts");


const weatherAppSelectors = {
    areaWeatherSelectors: _areaWeather_selectors__WEBPACK_IMPORTED_MODULE_1__["areaWeatherSelectors"],
    favoritesSelectors: _favorites_selectors__WEBPACK_IMPORTED_MODULE_0__["favoritesSelectors"]
};


/***/ }),

/***/ "./src/app/weatherModule/store/states/areaWeather.state.ts":
/*!*****************************************************************!*\
  !*** ./src/app/weatherModule/store/states/areaWeather.state.ts ***!
  \*****************************************************************/
/*! exports provided: AreaWeatherState, initialState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaWeatherState", function() { return AreaWeatherState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
class AreaWeatherState {
}
const initialState = null;


/***/ }),

/***/ "./src/app/weatherModule/store/states/favorites.state.ts":
/*!***************************************************************!*\
  !*** ./src/app/weatherModule/store/states/favorites.state.ts ***!
  \***************************************************************/
/*! exports provided: initialState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
const initialState = [];


/***/ }),

/***/ "./src/app/weatherModule/weather-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/weatherModule/weather-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: WeatherRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherRoutingModule", function() { return WeatherRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _weather_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weather.component */ "./src/app/weatherModule/weather.component.ts");
/* harmony import */ var _components_weatherbycity_weatherbycity_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/weatherbycity/weatherbycity.component */ "./src/app/weatherModule/components/weatherbycity/weatherbycity.component.ts");
/* harmony import */ var _components_favorites_favorites_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/favorites/favorites.component */ "./src/app/weatherModule/components/favorites/favorites.component.ts");







const routes = [
    {
        path: '', component: _weather_component__WEBPACK_IMPORTED_MODULE_2__["WeatherComponent"], children: [
            { path: '', redirectTo: 'weatherbycity', pathMatch: 'full' },
            { path: 'weatherbycity', component: _components_weatherbycity_weatherbycity_component__WEBPACK_IMPORTED_MODULE_3__["WeatherbycityComponent"] },
            { path: 'favorites', component: _components_favorites_favorites_component__WEBPACK_IMPORTED_MODULE_4__["FavoritesComponent"] }
        ]
    }
];
class WeatherRoutingModule {
}
WeatherRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: WeatherRoutingModule });
WeatherRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function WeatherRoutingModule_Factory(t) { return new (t || WeatherRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WeatherRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WeatherRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/weatherModule/weather.component.ts":
/*!****************************************************!*\
  !*** ./src/app/weatherModule/weather.component.ts ***!
  \****************************************************/
/*! exports provided: WeatherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherComponent", function() { return WeatherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/weatherModule/components/header/header.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class WeatherComponent {
    constructor() { }
    ngOnInit() { }
}
WeatherComponent.ɵfac = function WeatherComponent_Factory(t) { return new (t || WeatherComponent)(); };
WeatherComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WeatherComponent, selectors: [["app-weather"]], decls: 2, vars: 0, template: function WeatherComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    } }, directives: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3dlYXRoZXJNb2R1bGUvd2VhdGhlci5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WeatherComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-weather',
                templateUrl: './weather.component.html',
                styleUrls: ['./weather.component.css'],
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/weatherModule/weather.module.ts":
/*!*************************************************!*\
  !*** ./src/app/weatherModule/weather.module.ts ***!
  \*************************************************/
/*! exports provided: WeatherModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherModule", function() { return WeatherModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _weather_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weather-routing.module */ "./src/app/weatherModule/weather-routing.module.ts");
/* harmony import */ var _weather_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./weather.component */ "./src/app/weatherModule/weather.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/weatherModule/components/header/header.component.ts");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/footer/footer.component */ "./src/app/weatherModule/components/footer/footer.component.ts");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _components_weatherbycity_weatherbycity_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/weatherbycity/weatherbycity.component */ "./src/app/weatherModule/components/weatherbycity/weatherbycity.component.ts");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _components_weatherbycity_forcast_card_forcast_card_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/weatherbycity/forcast-card/forcast-card.component */ "./src/app/weatherModule/components/weatherbycity/forcast-card/forcast-card.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/autocomplete.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/__ivy_ngcc__/fesm2015/store.js");
/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./store/reducers */ "./src/app/weatherModule/store/reducers/index.ts");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/__ivy_ngcc__/fesm2015/effects.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _directives_english_only_directive__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./directives/english-only.directive */ "./src/app/weatherModule/directives/english-only.directive.ts");
/* harmony import */ var _components_favorites_favorites_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/favorites/favorites.component */ "./src/app/weatherModule/components/favorites/favorites.component.ts");
/* harmony import */ var _store_effects_areaWeather_effects__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./store/effects/areaWeather.effects */ "./src/app/weatherModule/store/effects/areaWeather.effects.ts");

























class WeatherModule {
}
WeatherModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: WeatherModule });
WeatherModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function WeatherModule_Factory(t) { return new (t || WeatherModule)(); }, providers: [], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _weather_routing_module__WEBPACK_IMPORTED_MODULE_2__["WeatherRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_18__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__["MatAutocompleteModule"],
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_17__["EffectsModule"].forFeature([_store_effects_areaWeather_effects__WEBPACK_IMPORTED_MODULE_21__["AreaWeatherEffect"]]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_15__["StoreModule"].forFeature(_store_reducers__WEBPACK_IMPORTED_MODULE_16__["CITY_WEATHER_FEATURE"], _store_reducers__WEBPACK_IMPORTED_MODULE_16__["reducers"]),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](WeatherModule, { declarations: [_weather_component__WEBPACK_IMPORTED_MODULE_3__["WeatherComponent"], _components_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"], _components_weatherbycity_weatherbycity_component__WEBPACK_IMPORTED_MODULE_8__["WeatherbycityComponent"], _components_weatherbycity_forcast_card_forcast_card_component__WEBPACK_IMPORTED_MODULE_11__["ForcastCardComponent"], _directives_english_only_directive__WEBPACK_IMPORTED_MODULE_19__["EnglishOnlyDirective"], _components_favorites_favorites_component__WEBPACK_IMPORTED_MODULE_20__["FavoritesComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _weather_routing_module__WEBPACK_IMPORTED_MODULE_2__["WeatherRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_18__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__["MatAutocompleteModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_17__["EffectsFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_15__["StoreFeatureModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WeatherModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_weather_component__WEBPACK_IMPORTED_MODULE_3__["WeatherComponent"], _components_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"], _components_weatherbycity_weatherbycity_component__WEBPACK_IMPORTED_MODULE_8__["WeatherbycityComponent"], _components_weatherbycity_forcast_card_forcast_card_component__WEBPACK_IMPORTED_MODULE_11__["ForcastCardComponent"], _directives_english_only_directive__WEBPACK_IMPORTED_MODULE_19__["EnglishOnlyDirective"], _components_favorites_favorites_component__WEBPACK_IMPORTED_MODULE_20__["FavoritesComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _weather_routing_module__WEBPACK_IMPORTED_MODULE_2__["WeatherRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_18__["MatButtonModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
                    _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__["MatAutocompleteModule"],
                    _ngrx_effects__WEBPACK_IMPORTED_MODULE_17__["EffectsModule"].forFeature([_store_effects_areaWeather_effects__WEBPACK_IMPORTED_MODULE_21__["AreaWeatherEffect"]]),
                    _ngrx_store__WEBPACK_IMPORTED_MODULE_15__["StoreModule"].forFeature(_store_reducers__WEBPACK_IMPORTED_MODULE_16__["CITY_WEATHER_FEATURE"], _store_reducers__WEBPACK_IMPORTED_MODULE_16__["reducers"]),
                ],
                providers: []
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=weatherModule-weather-module-es2015.js.map