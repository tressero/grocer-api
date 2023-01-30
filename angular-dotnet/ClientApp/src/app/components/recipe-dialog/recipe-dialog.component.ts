import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Recipe} from "../../models/recipe";
import {MatDialogModule} from '@angular/material/dialog';
// https://material.angular.io/components/dialog/examples#dialog-overview

@Component({
  selector: 'recipe-dialog',
  templateUrl: 'recipe-dialog.component.html',
})

export class RecipeDialog {
  constructor(
    public dialogRef: MatDialogRef<RecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe,
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
