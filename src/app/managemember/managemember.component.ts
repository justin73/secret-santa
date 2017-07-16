import { Component, OnInit } from '@angular/core';
import { MemberService } from "../service/member.service";
import { Member } from "../../member";

@Component({
  selector: 'app-managemember',
  templateUrl: './managemember.component.html',
  styleUrls: ['./managemember.component.css']
})
export class ManagememberComponent implements OnInit {
  title = 'Manage family members'
  members: Member[];
  memberName: string = "";
  spouseName: string = "";
  constructor(private memberService:MemberService) { 
    this.memberService.getMembers()
      .subscribe(
        members =>{
          this.members = members;
        }
      )
  }

  ngOnInit() {
  }

  addMember(event){
    event.preventDefault();
    let newMember = {
      name: this.memberName,
      spouse: this.spouseName,
      santa: '',
      isMatched: false
    }

    this.memberService.addMember(newMember)
      .subscribe(member => {
        this.members.push(member);
        this.memberName = "";
        this.spouseName = "";
      })
  }

  deleteMember(id){
    const members = this.members;
    this.memberService.deleteMember(id).subscribe(data => {
      if(data.n ==1){
        for(let i=0; i<members.length;i++){
          if(members[i]._id == id){
            members.splice(i, 1);
          }
        }
      }
    })
  }
}
