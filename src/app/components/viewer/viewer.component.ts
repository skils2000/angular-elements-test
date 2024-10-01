import { Component, Inject } from '@angular/core';
import { Item, ItemService } from '../../services/item.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import {
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  styleUrl: './viewer.component.css',
})
export class ViewerComponent {
  displayedColumns: string[] = ['title', 'creationDate', 'dueDate', 'actions'];
  items: Item[];

  constructor(private itemService: ItemService, private dialog: MatDialog) {
    this.items = this.itemService.getItems();
  }

  openDialog(item: Item): void {
    console.log(item);

    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '500px',
      data: { item },
    });
  }

  moveUp(index: number): void {
    if (index > 0) {
      const newItems = [...this.items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      this.items = newItems;
    }
    console.log(this.items, this.items[index - 1], this.items[index]);
  }

  moveDown(index: number): void {
    if (index < this.items.length - 1) {
      const newItems = [...this.items];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      this.items = newItems;
    }
  }
}

@Component({
  selector: 'item-dialog',
  templateUrl: 'item-dialog-view.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,

    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  styleUrl: 'item-dialog-view.css',
})
class ItemDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {
    this.form = this.fb.group({
      title: [data.item.title],
      creationDate: [data.item.creationDate],
      dueDate: [data.item.dueDate],
      description: [data.item.description],
    });
  }

  onSubmit(): void {
    this.dialogRef.close();
  }
}
