import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* UI components */
import { MatTableModule } from "@angular/material/table";
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';

import { ExpansionOverviewExample } from "./components/expansion-overview-example";
import {AutocompleteExample} from "./components/autocomplete-example";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {RecipeDialog} from "./components/recipe-dialog/recipe-dialog.component";

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ExpandingRecipe} from "./components/expanding-recipe/expanding-recipe.component";
import {
    EditableIngredientTableComponent
} from "./components/editable-ingredient-table/editable-ingredient-table.component";
import {MatNativeDateModule} from '@angular/material/core';
import {AutocompleteComponent} from "./components/autocomplete/autocomplete.component";
import {MatButtonModule} from "@angular/material/button";
import {
    EditableRecipeIngredientTableComponent
} from "./components/editable-recipe-ingredient-table/editable-recipe-ingredient-table.component";
import {MatIconModule} from "@angular/material/icon";
import {OxRecipeSelectorComponent} from "./components/ox-recipe-selector/ox-recipe-selector.component";


@NgModule({
    declarations: [
        AppComponent,
        ExpansionOverviewExample,
        AutocompleteExample,
        ConfirmDialogComponent,
        RecipeDialog,
        ExpandingRecipe,
        EditableIngredientTableComponent,
        AutocompleteComponent,
        EditableRecipeIngredientTableComponent,
        OxRecipeSelectorComponent,
        OxRecipeSelectorComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            // {path: '', component: HomeComponent, pathMatch: 'full'},
            // {path: 'counter', component: CounterComponent},
            // {path: 'fetch-data', component: FetchDataComponent},
        ]),
        MatTableModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
