import { Component, OnInit } from '@angular/core';
import { MemberService } from "../service/member.service";
import { Member } from "../../member";
import { forEach, remove } from 'lodash';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent{
  title = "Admin Panel";
  missing_member_message: string;
  members: Member[];
  memberList = [];
  spouseList = [];
  disableBtn:Boolean = false;
  participants = []
  copy=[]
  constructor(private memberService: MemberService) { 
    this.memberService.getMembers().subscribe(members=>{
      this.members = members;
      this.checkDrawStatus(members);
    })
  }
  checkDrawStatus(memberList){
    forEach(memberList, member => {
      this.memberList.push(member.name);
      if (member.spouse) {
        this.spouseList.push(member.spouse);
      }
    });
    this.spouseList.filter((element) => {
      if(this.memberList.indexOf(element)<0){
        this.disableBtn = true;
        this.missing_member_message = "Oops... It seems like you've forgotten to put someone's name";
      }
    })
  }

  activateDraw(){

    // forEach(this.members, member => {       
    //   let temp = this.memberList.slice();
    //   let member_index = temp.indexOf(member.name);
    //   let spouse_index = temp.indexOf(member.spouse);
    //   temp.splice(member_index, 1);
    //   console.log("current member: "+member.name+", spouse:"+member.spouse);
    //   console.log("after remove the member itself: "+temp)
    //   if(member.spouse !== ""){
    //     temp.splice(spouse_index, 1);
    //     console.log("after remove the member spouse: "+temp)
    //   }
    //   console.log("options available: "+temp);
    // });

    this.participants = this.memberList;
    this.copy         = this.participants.slice();
    let result       = {};
    let equal        = true;

    while (equal){
        this.shuffle(this.copy);
        equal  = this.listsEqual();
    }

    for (var i = this.participants.length; i--;){
        result[this.participants[i]] = this.copy[i];
    }
    console.log(result);
  }
  
  
  listsEqual(){
    for (var i = this.participants.length; i--;){
      if (this.participants[i] === this.copy[i]){
        return true;
      }
    }

    return false;
  }
  shuffle(list){
    let counter = list.length, temp, index;

    while (counter > 0){
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = list[counter];
      list[counter] = list[index];
      list[index] = temp;
    }   

    return list;
  }
}
