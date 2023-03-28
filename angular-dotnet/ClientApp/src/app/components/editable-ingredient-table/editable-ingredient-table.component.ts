import {Component, DefaultIterableDiffer, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientFto, IngredientFtoColumns } from "../../models/ingredientFto";
import {StoreSection} from "../../models/store-section";

@Component({
  selector: 'editable-ingredient-table',
  templateUrl: './editable-ingredient-table.component.html',
  styleUrls: ['./editable-ingredient-table.component.scss'],
})
export class EditableIngredientTableComponent {

  @Input() ingredients!: IngredientFto[];
  @Input() storeSections!: StoreSection[];
  displayedColumns: string[] = IngredientFtoColumns.map((col) => col.key);
  columnsSchema: any = IngredientFtoColumns;
  dataSource = new MatTableDataSource<IngredientFto>();
  valid: any = {};

  constructor(public dialog: MatDialog, private ingredientService: IngredientService) {}

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  // TODO - return from update ingredient should maybe set the ingredientColumns part ??? see Users item
  editRow(row: IngredientFto) {
    if (row.isNew) {
      debugger;
      this.ingredientService.addIngredient(row).subscribe((newIngredient: IngredientFto) => {
        row.id = newIngredient.id;
        row.name = newIngredient.name;
        row.description = newIngredient.description;
        row.storeSectionId = newIngredient.storeSectionId;
        row.isEdit = false;
        row.isNew = false;
      });
    }
    else {
      debugger;
      this.ingredientService.updateIngredient(row).subscribe(
        () => (row.isEdit = false)
      );
    }
  }

  addRow() {
    debugger;
    const newRow: IngredientFto = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      unit: "",
      storeSectionId: "00000000-0000-0000-0000-000000000000",
      isEdit: true,
      isNew: true
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: string) {
    this.ingredientService.deleteIngredient(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: IngredientFto) => u.id !== id
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
    return false;
    // TODO - add validation back I guess?
    if (this.valid[id]) {
      debugger;
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}
