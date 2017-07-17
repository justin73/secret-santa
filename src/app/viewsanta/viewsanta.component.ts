import { Component, OnInit } from '@angular/core';
import { MemberService } from "../service/member.service";
import { Member } from "../../member";

@Component({
  selector: 'app-viewsanta',
  templateUrl: './viewsanta.component.html',
  styleUrls: ['./viewsanta.component.css']
})
export class ViewsantaComponent implements OnInit {
  title = 'I am the Santa to ...?'
  result: Member[] = [];
  memberName:string;
  constructor(private memberService: MemberService) { }

  ngOnInit() {
  }
  findMatchFor(event){
    this.result = [];
    event.preventDefault();
    let member = {
      name: this.memberName
    }

    this.memberService.findMember(member)
      .subscribe(member => {
        this.result.push(member);
        this.memberName = "";
      })
  }
}
