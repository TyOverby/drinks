export interface RecipeJson {
    name: string,
    notes?: string,
    primary_alcohol: string[],
    served: string,
    standard_garnish?: string,
    standard_drinkware?: string,
    ingredients: string[],
    preparation?: string,
}

export async function getRecipies(): Promise<RecipeJson[]> {
    return (await fetch("./res/list.json")).json();
}
