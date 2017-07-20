import { Component, OnInit } from '@angular/core';
import { MemberService } from "../service/member.service";
import { Member } from "../../member";

@Component({
  selector: 'app-viewsanta',
  templateUrl: './viewsanta.component.html',
  styleUrls: ['./viewsanta.component.scss']
})
export class ViewsantaComponent {
  title = 'I am the Santa to ...?'
  result: Member[] = [];
  memberName:string;
  errorMsg: string;
  constructor(private memberService: MemberService) { }

  findMatchFor(){
    this.result = [];
    let member = {
      name: this.memberName
    }

    this.memberService.findMember(member)
      .subscribe((member) => {
        if(member) {
          this.result.push(member);
          this.errorMsg = "";
          this.memberName = "";
        } else {
          this.errorMsg = `There is no paricipant named ${this.memberName}`
        }
      })
  }
}
