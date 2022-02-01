import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button mat-raised-button *ngIf="!value">{{ value }}</button>
    <button mat-raised-button *ngIf="value == 'X'">{{ value }}</button>
    <button mat-raised-button *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 3em !important; color: #F39C12} font-family: Franklin Gothic Medium, Arial Narrow, Arial, sans-serif;']
})
export class SquareComponent  {

  @Input() value: 'X' | 'O';

}