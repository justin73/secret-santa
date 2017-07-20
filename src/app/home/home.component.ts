import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Smith\'s Family Secret Santa Draw'
  info = {
    author: 'Made by Meng Jia (jiameng_73@hotmail.com)',
    stack: 'it is a MEAN (MongoDB, Express, Angular4, Node) project'
  }
  constructor(){}
}
