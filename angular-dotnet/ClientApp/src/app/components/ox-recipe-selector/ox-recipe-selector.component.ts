import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {RecipeService} from "../../services/recipe.service";
import {Recipe_Checked} from "../../models/recipe";

@Component({
  selector: 'app-ox-recipe-selector',
  templateUrl: './ox-recipe-selector.component.html',
  styleUrls: ['./ox-recipe-selector.component.css']
})
export class OxRecipeSelectorComponent implements OnInit {


  // public recipesChecked: Recipe_Checked[] = [];
  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {

    // console.log('recipeService.recipes',this.recipeService.recipes);
    // console.log('ox-recipe-selector.recipesChecked',this.recipesChecked);
    // this.recipesChecked = this.recipeService.recipes.map(r => {
    //
    //   const tmp: Recipe_Checked = {
    //     id: r.id,
    //     name : r.name,
    //     url : r.url,
    //     isChecked: false
    //   }
    //   return tmp;
    // })


    // console.log('recipeService.recipes',this.recipeService.recipes);
    // console.log('ox-recipe-selector.recipesChecked',this.recipesChecked);

  }

}
