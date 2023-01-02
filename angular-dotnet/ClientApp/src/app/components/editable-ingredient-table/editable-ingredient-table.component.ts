import {Component, DefaultIterableDiffer, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { User, UserColumns } from '../../models/user';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient, IngredientColumns } from "../../models/ingredient";

@Component({
  selector: 'editable-ingredient-table',
  templateUrl: './editable-ingredient-table.component.html',
  styleUrls: ['./editable-ingredient-table.component.scss'],
})
export class EditableIngredientTableComponent {

  @Input() ingredients!: Ingredient[];
  displayedColumns: string[] = IngredientColumns.map((col) => col.key);
  columnsSchema: any = IngredientColumns;
  dataSource = new MatTableDataSource<Ingredient>();
  valid: any = {};

  constructor(public dialog: MatDialog, private ingredientService: IngredientService) {}

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  editRow(row: Ingredient) {
    if (row.id.startsWith('00000')) {
      this.ingredientService.addIngredient(row).subscribe((newIngredient: Ingredient) => {
        row.id = newIngredient.id;
        // row.isEdit = false;
      });
    }
    // else {
    //   this.ingredientService.updateIngredient(row).subscribe(
    //     () => (row.isEdit = false)
    //   );
    // }
  }

  addRow() {
    const newRow: Ingredient = {
      id: "",
      name: "",
      description: "",
      unit: "",
      storeSectionId: ""
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: string) {
    this.ingredientService.deleteIngredient(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Ingredient) => u.id !== id
      );
    });
  }

  removeSelectedRows() {
    // const ingredients = this.dataSource.data.filter((u: Ingredient) => u.isSelected);
    // this.dialog
    //   .open(ConfirmDialogComponent)
    //   .afterClosed()
    //   .subscribe((confirm) => {
    //     if (confirm) {
    //       this.ingredientService.deleteIngredients(ingredients).subscribe(() => {
    //         this.dataSource.data = this.dataSource.data.filter(
    //           (u: Ingredient) => !u.isSelected
    //         );
    //       });
    //     }
    //   });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}
