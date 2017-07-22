import { Component, OnInit } from '@angular/core';
import { Granim } from 'granim';
@Component({
  selector: 'app-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Smith\'s Family Secret Santa Draw';
  info = {
    author: 'Made by Meng Jia (jiameng_73@hotmail.com)',
    stack: 'it is a MEAN (MongoDB, Express, Angular4, Node) project'
  };
  constructor() {}

  ngOnInit(): void {
  }
}
