import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    private recipes: Recipe[] = [
        {
            id: 1,
            title: 'Schnitzel',
            imageUrl: `https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg`,
            ingredients: ['French Fries', 'Pork Meat', 'Salad']
        },
        {
            id: 2,
            title: 'Spaghetti',
            imageUrl: `https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg`,
            ingredients: ['Spaghetti', 'Meat', 'Tomato']
        }
    ];

    constructor() {
    }

    getAllRecipes(): Recipe[] {
        return [...this.recipes];
    }

    getRecipe(recipeId: number): Recipe {
        return {
            ...this.recipes.find(recipe => {
                return recipe.id === recipeId;
            })
        };
    }

    deleteRecipe(recipeId: number) {
        this.recipes = this.recipes.filter(recipe => {
            return recipe.id !== recipeId;
        });
    }
}
