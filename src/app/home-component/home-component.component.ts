import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  title = 'Smith\'s Family Secret Santa Draw'
  info = {
    author: 'Made by Meng Jia (jiameng_73@hotmail.com)',
    stack: 'it is a MEAN (MongoDB, Express, Angular4, Node) project'
  }
  constructor() { }

  ngOnInit() {
  }

}
