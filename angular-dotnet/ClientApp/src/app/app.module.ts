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
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { ExpansionOverviewExample } from "./components/expansion-overview-example";
import {AutocompleteExample} from "./components/autocomplete-example";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {SelectOverviewExample} from "./components/select-overview-example";
import {MatSelectModule} from "@angular/material/select";
import {TableDynamicArrayDataExample} from "./components/table-dynamic-array-data-example";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {EditableTableComponent} from "./components/editable-table/editable-table.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ExpandingRecipe} from "./components/expanding-recipe/expanding-recipe.component";
import {
    EditableIngredientTableComponent
} from "./components/editable-ingredient-table/editable-ingredient-table.component";
import {MatNativeDateModule} from '@angular/material/core';
import {AutocompleteComponent} from "./components/autocomplete/autocomplete.component";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ExpansionOverviewExample,
    AutocompleteExample,
    SelectOverviewExample,
    TableDynamicArrayDataExample,
    ConfirmDialogComponent,
    EditableTableComponent,
    ExpandingRecipe,
    EditableIngredientTableComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
      {path: 'fetch-data', component: FetchDataComponent},
    ]),
    MatTableModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
