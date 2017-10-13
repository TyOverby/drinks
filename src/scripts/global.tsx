import * as React from "react";
import * as ReactDOM from "react-dom";
import { RecipeJson } from "./model";

import { RecipeGrid } from "./components/RecipeGrid";
import { ControlPanel } from "./components/ControlPanel";

export interface ApplicationProps {
    nameSearch: string;
    ingredientSearch: string[];
    recipies: RecipeJson[];
    categories_checked: string[];
    rerender: (app: ApplicationProps) => void;
}

export function get_rerenderer(recipies: RecipeJson[]): (app: ApplicationProps) => void {
    return function (appprops: ApplicationProps) {
        console.log(appprops);

        const nameFilter = (r: RecipeJson) => {
            if (appprops.nameSearch == "") { return true; }
            const nameNorm = r.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
            if (nameNorm.indexOf(appprops.nameSearch) !== -1) {
                return true;
            }
            return false;
        };

        const ingredientFilter = (r: RecipeJson) => {
            if (appprops.ingredientSearch.length === 0) { return true; }

            for (const singr of appprops.ingredientSearch) {

                let searching = r.ingredients;
                if (r.standard_garnish) {
                    searching = searching.concat([r.standard_garnish]);
                }

                const contained = searching.some(i => i.toLowerCase().indexOf(singr) != -1);
                if (!contained) { return false; }
            }

            return true;
        };

        const categoryFilter = (r: RecipeJson) => {
            return appprops.categories_checked.indexOf(r.category) != -1;
        };

        const catfiltered = recipies.filter(categoryFilter);
        const filteredRecipies = catfiltered.filter(nameFilter).filter(ingredientFilter);

        ReactDOM.render(
            <div id="wrapper">
                <ControlPanel
                    app={appprops}
                    searchCount={filteredRecipies.length}
                    totalCount={recipies.length} />
                <RecipeGrid recipies={filteredRecipies} app={appprops} />
            </div>,
            document.querySelector("#container"));
    }
}
