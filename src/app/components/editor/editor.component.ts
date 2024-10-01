import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemService, Item } from '../../services/item.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  constructor(public itemService: ItemService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: Item) => {
      if (result) {
        this.itemService.addItem(result);
      }
    });
  }
}

@Component({
  selector: 'item-dialog',
  templateUrl: 'item-dialog-edit.html',
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
  styleUrl: './item-dialog-edit.css',
})
export class ItemDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ItemDialogComponent>
  ) {
    this.form = this.fb.group({
      title: [''],
      dueDate: [''],
      description: [''],
    });
  }

  onSubmit(): void {
    const item: Item = {
      title: this.form.value.title,
      creationDate: new Date(),
      dueDate: new Date(this.form.value.dueDate),
      description: this.form.value.description,
    };
    this.dialogRef.close(item);
  }
}
