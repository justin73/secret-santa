import { Component, OnInit } from '@angular/core';
import { MemberService } from "../service/member.service";
import { Member } from "../../member";
import { find } from 'lodash';

@Component({
  selector: 'app-managemember',
  templateUrl: './managemember.component.html',
  styleUrls: ['./managemember.component.css']
})
export class ManagememberComponent{
  title = 'Manage family members'
  members: Member[];
  memberName: string = "";
  spouseName: string = "";
  errorMsg:string;

  constructor(private memberService:MemberService) { 
    this.memberService.getMembers()
      .subscribe(
        members =>{
          this.members = members;
        }
      )
  }

  addMember(event){
    event.preventDefault();
    let newMember = {
      name: this.memberName,
      spouse: this.spouseName,
      santa: '',
      isMatched: false
    }
    let existing = find(this.members, {"name": newMember.name})
    if(existing){
      this.errorMsg = "Can't add existing participants"
    }else{
      let existing_spouse = find(this.members, {"spouse":this.memberName})
      if(existing_spouse){
        if (existing_spouse.name != this.spouseName){
          this.errorMsg = "Are you sure you entered your spouse's name right? ;-)"
        } else {
          this.memberService.addMember(newMember)
          .subscribe(member => {
            this.members.push(member);
            this.memberName = "";
            this.spouseName = "";
            this.errorMsg = "";
          })
        }
      }else{
        this.memberService.addMember(newMember)
          .subscribe(member => {
            this.members.push(member);
            this.memberName = "";
            this.spouseName = "";
            this.errorMsg = "";
          })
      }
    }
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
