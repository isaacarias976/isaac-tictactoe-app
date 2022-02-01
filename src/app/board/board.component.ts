import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  startgame:boolean = false;
  squares: string[];
  xIsNext: boolean;

  constructor(public dialogo: MatDialog) {}

  ngOnInit() {
  }

  newGame() {
    this.startgame = true;
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.validateWinner();
  }

  validateWinner(){
    let w = this.calculateWinner();
    if(w !== null){
      this.showDialog("El ganador es: " + w + "!");
    }else{
      let noWin = this.squares.indexOf(null);
      if(noWin === -1){
        this.showDialog("Ha sido un empate!")
      }
    }
  }

  showDialog(msg:string):void{
    this.dialogo
      .open(DialogConfirmComponent, {
        data: msg
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.startgame = false;
        }else{
          this.newGame();
        }
      });
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}