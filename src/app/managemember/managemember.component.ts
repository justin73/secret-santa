import { Component, OnInit, AfterViewInit, Input, DoCheck } from '@angular/core';
import { MemberService } from '../service/member.service';
import { Member } from '../../member';
import { forEach, find, includes } from 'lodash';

@Component({
  selector: 'app-managemember',
  templateUrl: './managemember.component.html',
  styleUrls: ['./managemember.component.scss']
})
export class ManagememberComponent implements OnInit, DoCheck {
  title = 'Manage family members';
  members: Member[];
  @Input() memberName = '';
  @Input() spouseName = '';
  errorMsg: string;
  disableBtn: Boolean = true;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.getMembers().subscribe(
      members => {
        this.members = members;
      }
    );
  }

  ngDoCheck() {
    if (this.memberName.length > 0) {
      this.disableBtn = false;
    } else {
      this.disableBtn = true;
    }
  }

  validateMember() {
    const newMember = {
      name: this.memberName.toLocaleLowerCase(),
      spouse: this.spouseName.trim() === '' ? null : this.spouseName.toLocaleLowerCase(),
      santa: '',
      isMatched: false
    };

    if (newMember.name.length > 0) {
      if (this.hasDuplicates(newMember) || this.mismatchSpouse(newMember)) {
        this.setErrorMsg('duplicates | spouse mismatch');
      } else {
        this.saveMember(newMember);
      }
    }
  }

  hasDuplicates(newMember) {
    const existing = find(this.members, {'name': newMember.name});
    return existing;
  }

  mismatchSpouse(newMember) {
    if (this.isSamePerson(newMember) || this. getWrongSpouseName(newMember)
      || this.multipeToOneSpouse(newMember) || this.forceSpouse(newMember)) {
      return true;
    } else {
      return false;
    }
  }
  // member can't have itself as spouse
  isSamePerson(newMember) {
    if (newMember.name === newMember.spouse) {
      return true;
    } else {
      return false;
    }
  }

  getWrongSpouseName(newMember) {
    const existing_spouse = find(this.members, {'spouse': newMember.name});
    if (existing_spouse) {
      if (existing_spouse.name !== newMember.spouse) {
        return true;
      }
    }
  }
  // add someone who is already the spouse to other ppl
  multipeToOneSpouse(newMember) {
    const existingSpouseList: string[] = [];
    forEach(this.members, (element) => {
      if (element.spouse) {
        existingSpouseList.push(element.spouse);
      }
    });
    if (includes(existingSpouseList, newMember.spouse)) {
      return true;
    }

  }
  // add someone who doesn't have spouse as your spouse
  forceSpouse(newMember) {
    const spouse = find(this.members, {'name': newMember.spouse});
    if (spouse && (!spouse.spouse || spouse.spouse !== newMember.name)) {
      return true;
    }
  }

  setErrorMsg(msg) {
    this.errorMsg = msg;
  }

  saveMember(newMember) {
    this.memberService.addMember(newMember)
      .subscribe(member => {
        this.members.push(member);
        this.memberName = '';
        this.spouseName = '';
        this.errorMsg = '';
      });
  }

  deleteMember(id) {
    const members = this.members;
    this.memberService.deleteMember(id).subscribe(data => {
      if (data.n === 1) {
        for (let i = 0; i < members.length; i++) {
          if (members[i]._id === id) {
            members.splice(i, 1);
          }
        }
      }
    });
  }
}
