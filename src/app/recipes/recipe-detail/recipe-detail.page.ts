import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../recipe.model';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
    selectedRecipes: Recipe;

    constructor(
        private activatedRoute: ActivatedRoute,
        private rs: RecipesService,
        private router: Router,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!paramMap.has('recipeId')) {
                this.router.navigate(['/recipes']);
                return;
            }
            const recipeId = paramMap.get('recipeId');
            this.selectedRecipes = this.rs.getRecipe(+recipeId);
        });
    }

    deleteRecipe() {
        this.alertController.create({
            message: 'Are you sure you wanna delete this ?',
            header: 'WARNING',
            buttons: [{
                text: 'Cancel',
                role: 'cancel'
            },
                {
                    text: 'Delete',
                    role: 'danger',
                    handler: () => {
                        this.rs.deleteRecipe(this.selectedRecipes.id);
                        this.router.navigate(['/recipes']);
                    }
                }]
        }).then(alert => alert.present());
    }

}
