import * as React from "react";
import { ApplicationProps } from "../global";

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
            rerender: this.props.rerender,
        });
    }

    updateIngredientsSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value =event.target.value.toLowerCase().split(",").map(s => s.trim());
        this.props.rerender({
            nameSearch: this.props.nameSearch,
            ingredientSearch: value,
            rerender: this.props.rerender,
        });
    }

    render() {
        return <div id="control">
            <h1> DRINKS </h1>
            <form>
                <div className="search-group">
                    <label htmlFor="name-search"> 🔍 Names </label>
                    <input id="name-search" type="text" onChange={this.updateNameSearch.bind(this)}></input>
                </div>

                <div className= "search-group">
                    <label htmlFor="ingredient-search"> 🔍 Ingredients </label>
                    <input id="ingredient-search" type="text" onChange={this.updateIngredientsSearch.bind(this)}></input>
                </div>

                <div>
                    Showing {this.props.searchCount} of {this.props.totalCount}
                </div>
            </form>
        </div>;
    }
}
