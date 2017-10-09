/// <reference path="../react-checkbox-tree.d.ts"/>
import * as React from "react";
import * as CheckboxTree from "react-checkbox-tree";
import { ApplicationProps } from "../global";
import { RecipeJson } from "../model";

interface TreeNode {
    value: string,
    label: string,
    children?: TreeNode[],
}

interface CategoryTreeState {
    checked: any[],
}

export class CategoryTree extends React.Component<ApplicationProps, CategoryTreeState> {
    constructor() {
        super();

        this.state = {
            checked: [],
        };
    }

    render() {
        const [nodes, expanded] = generateNodes(this.props.recipies);

        return (
            <CheckboxTree
                showNodeIcon={false}
                nodes={nodes}
                checked={this.state.checked}
                expanded={expanded}
                onCheck={(checked: any) => this.setState({ checked })}
            />
        );
    }
}

function generateNodes(recipies: RecipeJson[]): [TreeNode[], string[]] {
    function uniq(a: string[]) {
        return a.filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }

    function group<T>(items: T[], f: (a: T, b: T) => boolean): T[][] {
        const out: T[][] = [];
        if (items.length === 0) {
            return out;
        }

        let [first, ...rest] = items;
        let run: T[] = [first];
        let run_p = first;

        while (rest.length !== 0) {
            let [head, ...tail] = rest;
            rest = tail;

            if (f(run_p, head)) {
                run.push(head);
            } else {
                out.push(run);
                run = [head];
                run_p = head;
            }
        }

        out.push(run);

        return out;
    }

    function to_tree(prefix: string, paths: string[][], allLabels: string[]): TreeNode[] {
        let sorted = paths.sort((a, b) => a.length - b.length);
        let terminals = paths.filter(path => path.length === 1);
        let nodes = group(paths.filter(path => path.length !== 1), (a, b) => a[0] == b[0]);

        let term_map = terminals.map(t => ({
            value: prefix + t[0],
            label: t[0],
        }));

        let nodes_map = nodes.map(g => ({
            value: prefix + g[0][0],
            label: g[0][0],
            children: to_tree(prefix + "/" + g[0][0], g.map(s => s.slice(1)), allLabels)
        }));

        allLabels.push(...nodes_map.map(n => n.value));

        return [...nodes_map, ...term_map];
    }

    let categories = recipies.map(r => r.category);
    let sorted = categories.sort();
    let unique = uniq(sorted);
    let splitted = unique.map(s => s.split('/'));
    let allLabels: string[] = [];
    let grouped = to_tree("", splitted, allLabels);

    return [grouped, allLabels];
}
