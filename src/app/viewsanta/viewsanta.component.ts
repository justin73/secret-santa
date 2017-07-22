import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.service';
import { Member } from '../../member';

@Component({
  selector: 'app-viewsanta',
  templateUrl: './viewsanta.component.html',
  styleUrls: ['./viewsanta.component.scss']
})
export class ViewsantaComponent {
  title = 'I am the Santa to ...?';
  result: Member[] = [];
  memberName: string;
  errorMsg: string;
  constructor(private memberService: MemberService) { }

  findMatchFor() {
    this.result = [];
    const member = {
      name: this.memberName.toLocaleLowerCase()
    };

    this.memberService.findMember(member)
      .subscribe((element) => {
        if (element) {
          this.result.push(element);
          this.errorMsg = '';
          this.memberName = '';
        } else {
          this.errorMsg = `There is no member named ${this.memberName}`;
        }
      });
  }
}
