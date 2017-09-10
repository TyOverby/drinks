/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
function prepareText(text, searches) {
    for (const search of searches) {
        const idx = text.toLowerCase().indexOf(search);
        if (idx === -1 || search === "") {
            continue;
        }
        else {
            return React.createElement("span", null,
                text.slice(0, idx),
                React.createElement("span", { className: "highlight" }, text.slice(idx, idx + search.length)),
                text.slice(idx + search.length));
        }
    }
    return React.createElement("span", null,
        " ",
        text,
        " ");
}
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class Recipe extends React.Component {
    render() {
        return React.createElement("div", { className: "recipe" },
            React.createElement("h1", null,
                " ",
                prepareText(this.props.name, [this.props.nameSearch]),
                " "),
            React.createElement("h2", null, " Ingredients "),
            React.createElement("ul", null, this.props.ingredients.map((i, x) => React.createElement("li", { key: x },
                " ",
                prepareText(i, this.props.ingredientSearch),
                " "))),
            React.createElement("h2", null, " Preparation "),
            this.props.preparation,
            React.createElement("h2", null, " Garnish "),
            this.props.standard_garnish,
            React.createElement("h2", null, " Drinkware "),
            this.props.standard_drinkware,
            React.createElement("h2", null, " Serve "),
            this.props.served);
    }
}
exports.Recipe = Recipe;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model = __webpack_require__(7);
const global_1 = __webpack_require__(9);
(() => __awaiter(this, void 0, void 0, function* () {
    const recipies = yield model.getRecipies();
    const render = global_1.get_rerenderer(recipies);
    render({
        nameSearch: "",
        ingredientSearch: [],
        rerender: render,
    });
}))();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const Recipe_1 = __webpack_require__(1);
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class RecipeGrid extends React.Component {
    render() {
        const rs = this.props.recipies.map(r => React.createElement(Recipe_1.Recipe, Object.assign({ key: r.name }, r, this.props.app), " "));
        return React.createElement("div", { id: "grid" }, rs);
    }
}
exports.RecipeGrid = RecipeGrid;


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getRecipies() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield fetch("./res/list.json")).json();
    });
}
exports.getRecipies = getRecipies;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class ControlPanel extends React.Component {
    updateNameSearch(event) {
        const value = event.target.value.toLowerCase().trim();
        this.props.rerender({
            nameSearch: value,
            ingredientSearch: this.props.ingredientSearch,
            rerender: this.props.rerender,
        });
    }
    updateIngredientsSearch(event) {
        const value = event.target.value.toLowerCase().split(",").map(s => s.trim());
        this.props.rerender({
            nameSearch: this.props.nameSearch,
            ingredientSearch: value,
            rerender: this.props.rerender,
        });
    }
    render() {
        return React.createElement("div", { id: "control" },
            React.createElement("h1", null, " DRINKS "),
            React.createElement("form", null,
                React.createElement("div", { className: "search-group" },
                    React.createElement("label", { htmlFor: "name-search" }, " \uD83D\uDD0D Names "),
                    React.createElement("input", { id: "name-search", type: "text", onChange: this.updateNameSearch.bind(this) })),
                React.createElement("div", { className: "search-group" },
                    React.createElement("label", { htmlFor: "ingredient-search" }, " \uD83D\uDD0D Ingredients "),
                    React.createElement("input", { id: "ingredient-search", type: "text", onChange: this.updateIngredientsSearch.bind(this) })),
                React.createElement("div", null,
                    "Showing ",
                    this.props.searchCount,
                    " of ",
                    this.props.totalCount)));
    }
}
exports.ControlPanel = ControlPanel;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
const RecipeGrid_1 = __webpack_require__(4);
const ControlPanel_1 = __webpack_require__(8);
function get_rerenderer(recipies) {
    return function (appprops) {
        const nameFilter = (r) => {
            if (appprops.nameSearch == "") {
                return true;
            }
            if (r.name.toLowerCase().indexOf(appprops.nameSearch) !== -1) {
                return true;
            }
            return false;
        };
        const ingredientFilter = (r) => {
            if (appprops.ingredientSearch.length === 0) {
                return true;
            }
            for (const singr of appprops.ingredientSearch) {
                const contained = r.ingredients.some(i => i.toLowerCase().indexOf(singr) != -1);
                if (!contained) {
                    return false;
                }
            }
            return true;
        };
        const r2 = recipies.filter(nameFilter).filter(ingredientFilter);
        ReactDOM.render(React.createElement("div", { id: "wrapper" },
            React.createElement(ControlPanel_1.ControlPanel, Object.assign({}, appprops, { searchCount: r2.length, totalCount: recipies.length })),
            React.createElement(RecipeGrid_1.RecipeGrid, { recipies: r2, app: appprops })), document.querySelector("#container"));
    };
}
exports.get_rerenderer = get_rerenderer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map