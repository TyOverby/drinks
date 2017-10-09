import * as React from "react";
import * as ReactDOM from "react-dom";
import * as model from "./model";


import { RecipeGrid } from "./components/RecipeGrid";
import { ControlPanel } from "./components/ControlPanel";
import { get_rerenderer } from "./global";


(async () => {
    const recipies = await model.getRecipies();
    const render = get_rerenderer(recipies);
    render({
        nameSearch: "",
        ingredientSearch: [],
        rerender: render,
        recipies: recipies,
    });
})();
