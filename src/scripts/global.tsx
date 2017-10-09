import * as React from "react";
import * as ReactDOM from "react-dom";
import * as model from "./model";

import { RecipeGrid } from "./components/RecipeGrid";
import { ControlPanel } from "./components/ControlPanel";

export interface ApplicationProps {
    nameSearch: string;
    ingredientSearch: string[];
    recipies: model.RecipeJson[],
    rerender: (app: ApplicationProps) => void;
}

export function get_rerenderer(recipies: model.RecipeJson[]): (app: ApplicationProps) => void {
    return function (appprops: ApplicationProps) {
        const nameFilter = (r: model.RecipeJson) => {
            if (appprops.nameSearch == "") { return true; }
            if (r.name.toLowerCase().indexOf(appprops.nameSearch) !== -1) {
                return true;
            }
            return false;
        };

        const ingredientFilter = (r: model.RecipeJson) => {
            if (appprops.ingredientSearch.length === 0 ) { return true; }

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

        const r2 = recipies.filter(nameFilter).filter(ingredientFilter);

        ReactDOM.render(
            <div id="wrapper">
                <ControlPanel {...appprops} searchCount={r2.length} totalCount={recipies.length} />
                <RecipeGrid recipies={r2} app={appprops} />
            </div>,
            document.querySelector("#container"));
    }
}
