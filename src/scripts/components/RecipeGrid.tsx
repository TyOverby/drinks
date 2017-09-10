import * as React from "react";
import { Recipe } from "./Recipe";
import * as model from "../model";
import { ApplicationProps }  from "../global";

export interface GridProps {
    recipies: model.RecipeJson[];
    app: ApplicationProps,
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class RecipeGrid extends React.Component<GridProps> {
    render() {

        const rs =
            this.props.recipies.map(r => <Recipe key={r.name} {...r} {...this.props.app}> </Recipe>);

        return <div id="grid">
            {...rs}
        </div>
    }
}
