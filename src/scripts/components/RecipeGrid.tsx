import * as React from "react";
import { Recipe } from "./Recipe";
import { RecipeJson } from "../model";
import { ApplicationProps } from "../global";

export interface GridProps {
    recipies: RecipeJson[];
    app: ApplicationProps,
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class RecipeGrid extends React.Component<GridProps> {
    render() {
        const sorter = (a: RecipeJson, b: RecipeJson): number =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        const recipieify = (r: RecipeJson) =>
            <Recipe key={r.name} {...r} {...this.props.app}></Recipe>

        const rs =
            this.props.recipies
                .sort(sorter)
                .map(recipieify);

        return <div id="grid">
            {...rs}
        </div>
    }
}
