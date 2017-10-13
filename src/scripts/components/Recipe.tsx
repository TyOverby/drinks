import * as React from "react";
import * as ReactDom from "react-dom";
import { RecipeJson } from "../model";
import { ApplicationProps } from "../global";

function prepareText(text: string, searches: string[]): JSX.Element {
    for (const search of searches) {
        const nameNorm = text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
        const idx = nameNorm.indexOf(search);
        if (idx === -1 || search === "") {
            continue;
        } else {
            return <span>
                {text.slice(0, idx)}
                <span className="highlight" key="hi">
                    {text.slice(idx, idx + search.length)}
                </span>
                {text.slice(idx + search.length)}
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

        const prepped_ingredients = this.props.ingredients.map((i, x) =>
            <li key={x}>
                {prepareText(i, this.props.ingredientSearch)}
            </li>)

        return <div className="recipe">
            <h1> {prepareText(this.props.name, [this.props.nameSearch])} </h1>
            <span className="drinkware"> ({this.props.standard_drinkware}) </span>

            <h2>Ingredients</h2>
            <ul>{prepped_ingredients}</ul>

            <h2>Preparation</h2>
            {this.props.preparation}

            {garnishText}

            <h2>Serve</h2>
            {this.props.served}
        </div>;
    }
}
