import * as React from "react";
import * as ReactDom from "react-dom";
import { RecipeJson } from "../model";
import { ApplicationProps } from "../global";

function prepareText(text: string, searches: string[]): JSX.Element {
    for (const search of searches) {
        const idx = text.toLowerCase().indexOf(search);
        if (idx === -1 || search === "") {
            continue;
        } else {
            return <span>
                {text.slice(0, idx)}
                <span className="highlight" key="hi">
                    {text.slice(idx, idx + search.length)}
                </span>
                { text.slice(idx + search.length) }
            </span>
        }
    }

    return <span>{text}</span>
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Recipe extends React.Component<RecipeJson & ApplicationProps> {
    render() {
        const garnishText = this.props.standard_garnish !== undefined ?
            [<h2 key="garnish-title">Garnish</h2>,
             <span key="garnish-body">
                 {prepareText(this.props.standard_garnish, this.props.ingredientSearch)}
             </span>] :
            [];

        return <div className="recipe">
            <h1> {prepareText(this.props.name, [this.props.nameSearch])} </h1>

            <h2>Ingredients</h2>
            <ul>{this.props.ingredients.map((i, x) => <li key={x}> {prepareText(i, this.props.ingredientSearch)} </li>)}</ul>

            <h2>Preparation</h2>
            {this.props.preparation}

            {garnishText}

            <h2>Drinkware</h2>
            {this.props.standard_drinkware}

            <h2>Serve</h2>
            {this.props.served}
        </div>;
    }
}
