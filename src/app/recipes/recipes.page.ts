import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipesService} from './recipes.service';
import {Recipe} from './recipe.model';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.page.html',
    styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {

    recipes: Recipe[] = [];

    constructor(private rs: RecipesService) {
    }

    ngOnInit() {
        console.log('ng on init');
    }

    ionViewWillEnter() {
        this.recipes = this.rs.getAllRecipes();
    }

    ionViewDidEnter() {
        console.log('ion did enter');
    }

    ionViewDidLeave() {
        console.log('ionViewDidLeave');
    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave');
    }

    ngOnDestroy() {
    }
}
