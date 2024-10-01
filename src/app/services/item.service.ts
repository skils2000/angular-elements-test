import { Injectable } from '@angular/core';

export interface Item {
  title: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = [
    {
      // id: 0,
      title: 'Элемент 1',
      creationDate: new Date(),
      dueDate: new Date(),
      description: 'string description',
    },
    {
      // id: 0,
      title: 'Элемент 2',
      creationDate: new Date(),
      dueDate: new Date(),
      description: 'string description',
    },
    {
      // id: 0,
      title: 'Элемент 3',
      creationDate: new Date(),
      dueDate: new Date(),
      description: 'string description',
    },
    {
      // id: 0,
      title: 'Элемент 4',
      creationDate: new Date(),
      dueDate: new Date(),
      description: 'string description',
    },
  ];

  addItem(item: Item) {
    this.items.push(item);
  }

  getItems(): Item[] {
    return this.items;
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  moveItemUp(index: number) {
    if (index > 0) {
      const item = this.items[index];
      this.items[index] = this.items[index - 1];
      this.items[index - 1] = item;
    }
  }

  moveItemDown(index: number) {
    if (index < this.items.length - 1) {
      const item = this.items[index];
      this.items[index] = this.items[index + 1];
      this.items[index + 1] = item;
    }
  }

  copyItem(index: number) {
    const item = this.items[index];
    const newItem: Item = { ...item, creationDate: new Date() };
    this.addItem(newItem);
  }
}
