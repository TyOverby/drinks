import * as React from "react";
import * as ReactDOM from "react-dom";
import * as model from "./model";


import { get_rerenderer } from "./global";


(async () => {
    const recipies = await model.getRecipies();
    const render = get_rerenderer(recipies);
    render({
        nameSearch: "",
        ingredientSearch: [],
        rerender: render,
        recipies: recipies,
        categories_checked: ["IBA/Contemporary", "IBA/New Era", "IBA/Unforgettable"]
    });
})();
