import * as React from "react";
import { ApplicationProps } from "../global";
import { CategoryTree } from "./CategoryTree";

type ControlPanelProps = ApplicationProps & {
    searchCount: number,
    totalCount: number,
};

export class ControlPanel extends React.Component<ControlPanelProps> {
    updateNameSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value.toLowerCase().trim();
        this.props.rerender({
            nameSearch: value,
            ingredientSearch: this.props.ingredientSearch,
            recipies: this.props.recipies,
            rerender: this.props.rerender,
        });
    }

    updateIngredientsSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value.toLowerCase().split(",").map(s => s.trim());
        this.props.rerender({
            nameSearch: this.props.nameSearch,
            ingredientSearch: value,
            rerender: this.props.rerender,
            recipies: this.props.recipies,
        });
    }

    render() {
        return <div id="control">
            <h1> Drinks</h1>
            <div className="search-group">
                <label htmlFor="name-search"> <span className="search-specifier"></span>&nbsp;Names </label>
                <input id="name-search" placeholder='"martini"' type="text" onChange={this.updateNameSearch.bind(this)}></input>
            </div>

            <div className="search-group">
                <label htmlFor="ingredient-search"> <span className="search-specifier"></span>&nbsp;Ingredients </label>
                <input id="ingredient-search" placeholder='"rum"' type="text" onChange={this.updateIngredientsSearch.bind(this)}></input>
            </div>

            <div id="cat-tree">
                <label> Categories </label>
                <CategoryTree {... this.props} />
            </div>
            <div id="showing">
                Showing {this.props.searchCount} of {this.props.totalCount}
            </div>
        </div>;
    }
}
