import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.service';
import { Member } from '../../member';
import { forEach, remove, find, includes } from 'lodash';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  title = 'Admin Panel';
  missing_member_message: string;
  btnContent: string = 'Activate the draw'
  members: Member[];
  memberList = [];
  spouseList = [];
  disableBtn:Boolean = false;
  showResult:Boolean = false;
  participants = []
  copy=[]

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.checkDrawStatus(this.members);
    })
  }
  checkDrawStatus(members) {
    // if the draw was activated before, then show the relations 
    if (find(members, ['isMatched', true])) {
      this.showResult = true;
      this.btnContent = 'Re-assign Santas'
    }
    /* 
      checking all the conditions, disabled the button when conditions are not met.
       1. participants couldn't be one or 0 
       2. participants couldn't be less than 3 with a couple in them
       3. with more than 3 participants, the draw will work unconditionally 
    */
    if (this.members.length <= 1) {
      this.disableDraw('Please add at least two non-spouse relation participants');
    } else {
      if (this.members.length <= 3) {
        let findCouple = find(this.members, (member) => { return member.spouse != null })
        if (findCouple) {
          this.disableDraw('With a couple, there must be at least 4 participants');
        } else {
          this.validateParticipants(members);
        }
      } else {
        this.validateParticipants(members);
      }
    }
  }

  disableDraw(msg){
    this.missing_member_message = msg;
    this.disableBtn = true;
  }

  validateParticipants(memberList){
    forEach(memberList, member => {
      this.memberList.push(member.name);
      if (member.spouse) {
        this.spouseList.push(member.spouse);
      }
    });
    this.spouseList.filter((element) => {
      if (this.memberList.indexOf(element)<0) {
        this.disableBtn = true;
        this.missing_member_message = 'Oops... It seems like you\'ve forgotten to put someone\'s name';
      }
    })
  }

  activateDraw() {
    this.participants = this.memberList;
    this.copy         = this.participants.slice();
    let result        = {};
    let equal         = true;
    
    // shuffle the list until we find a combination which meets the criteria. 
    while (equal) {
        this.shuffle(this.copy);
        equal  = this.listsEqual(this.members);
    }

    for (let i = this.participants.length; i--;) {
        result[this.participants[i]] = this.copy[i];
    }
    if (!this.disableBtn){
      this.showResult = true;
      this.saveResult(result);
    }
  }
  
  listsEqual(members){
    // if the element order in the copy is the same as participants or its spouse, then keep shuffling
    for (let i = this.participants.length; i--;){
      let member_info = find(members, {'name': this.participants[i]})
      if (this.participants[i] === this.copy[i] || this.copy[i] === member_info.spouse){
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

  saveResult(result){
    for(let name in result){
      let member = find(this.members, {'name': name})
      member.santa = result[name];
      member.isMatched = true;
      this.memberService.updateMember(member).subscribe(data => {
        member = data;
      });
    }
  }
}
