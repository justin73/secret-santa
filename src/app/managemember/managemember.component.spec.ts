import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagememberComponent } from './managemember.component';
import { MemberService } from "../service/member.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { inject } from "@angular/core/testing";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Member } from "../../member";

const mockMemberData: Member[] = [
    {
        "_id": "596ec7574631eb2d0e034d42",
        "name": "a",
        "spouse": null,
        "santa": "d",
        "isMatched": true
    },
    {
        "_id": "596ec75b4631eb2d0e034d43",
        "name": "b",
        "spouse": "c",
        "santa": "a",
        "isMatched": true
    },
    {
        "_id": "596ec76e4631eb2d0e034d44",
        "name": "c",
        "spouse": "b",
        "santa": "f",
        "isMatched": true
    },
    {
        "_id": "596ec7864631eb2d0e034d45",
        "name": "d",
        "spouse": "f",
        "santa": "b",
        "isMatched": true
    },
    {
        "_id": "596ec7924631eb2d0e034d46",
        "name": "f",
        "spouse": "d",
        "santa": "c",
        "isMatched": true
    }
];

const mockRefreshMemberData: Member[] = [
    {
        "_id": "596ec7574631eb2d0e034d42",
        "name": "a",
        "spouse": null,
        "santa": "d",
        "isMatched": true
    },
    {
        "_id": "596ec76e4631eb2d0e034d44",
        "name": "c",
        "spouse": "b",
        "santa": "f",
        "isMatched": true
    },
    {
        "_id": "596ec7864631eb2d0e034d45",
        "name": "d",
        "spouse": "f",
        "santa": "b",
        "isMatched": true
    },
    {
        "_id": "596ec7924631eb2d0e034d46",
        "name": "f",
        "spouse": "d",
        "santa": "c",
        "isMatched": true
    }
];

class MockMemberService {
  getMembers() {
    return Observable.of(mockMemberData);
  }
  addMember () {
    return Observable.of({})
  }
  deleteMember(){
    return Observable.of({n:1})
  }
}

describe('ManagememberComponent', () => {
  let component: ManagememberComponent;
  let fixture: ComponentFixture<ManagememberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpModule],
      declarations: [ ManagememberComponent ],
      providers: [{ provide: MemberService, useClass: MockMemberService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagememberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should get members', async(inject([], () => {
    component.ngOnInit();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        expect(component.members).toEqual(mockMemberData);
      });
  })));

  it('should delete a selected member', async(inject([], () => {
    const toDeleteMember = {
      "_id": "596ec75b4631eb2d0e034d43",
      "name": "b",
      "spouse": "c",
      "santa": "a",
      "isMatched": true
    }
    component.deleteMember("596ec75b4631eb2d0e034d43");
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        expect(component.members).toEqual(mockRefreshMemberData);
      });    
  })));
  describe('check validate member related functions', () => {

    it('should not pass the new member validation', async(() => {
      component.memberName = "a";
      component.spouseName = "b";
      const setErrorMsgSpy = spyOn(component, 'setErrorMsg').and.callThrough();
      component.validateMember();
      expect(setErrorMsgSpy).toHaveBeenCalledWith("duplicates | spouse mismatch");      
    }));

    it('should pass the new member validation', async(() => {
      component.memberName = "h";
      component.spouseName = "";
      const saveMemberSpy = spyOn(component, 'saveMember').and.callThrough();
      component.validateMember();
      expect(saveMemberSpy).toHaveBeenCalled();      
    }));

    it('should indicate duplicate error', async(() => {
      const testNewMember = {
        name: 'a',
        spouse: null,
        santa: '',
        isMatched: false
      }
      expect(component.hasDuplicates(testNewMember)).toBeTruthy()
    }));

    it('should pass duplicate check', async(() => {
      const testNewMember = {
        name: 'z',
        spouse: null,
        santa: '',
        isMatched: false
      }
      expect(component.hasDuplicates(testNewMember)).toBeFalsy()
    }));

    describe('check three conditions for spouse validation', () => {
      it('should return true for overall mismatchSpouse checking ', async(() => {
        const newTestMember = {
          _id : '123rfaesdf',
          name: 'h',
          spouse: 'a',
          santa: '',
          isMatched: false
        }
        
        const mismatchSpouseSpy = spyOn(component, 'mismatchSpouse').and.callThrough();
        component.mismatchSpouse(newTestMember);
        expect(mismatchSpouseSpy).toBeTruthy();
      }));

      it('should return true for getWrongSpouseName checking', async(() => {
        const newTestMember = {
          _id : 'fa32qfwsadf',
          name: 'h',
          spouse: 'c',
          santa: '',
          isMatched: false
        }
        const getWrongSpouseNameSpy = spyOn(component, 'getWrongSpouseName').and.callThrough();
        component.getWrongSpouseName(newTestMember);
        expect(getWrongSpouseNameSpy).toBeTruthy();
      }));

      it('should return true for forceSpouse checking ', async(() => {
        const newTestMember = {
          _id : '123rfaesdf',
          name: 'h',
          spouse: 'a',
          santa: '',
          isMatched: false
        }
        const forceSpouseSpy = spyOn(component, 'forceSpouse').and.callThrough();
        component.forceSpouse(newTestMember);
        expect(forceSpouseSpy).toBeTruthy();
      }));

      it('should return true for multipeToOneSpouse checking ', async(() => {
        const newTestMember = {
          _id : '2334tgdfs',
          name: 'h',
          spouse: 'b',
          santa: '',
          isMatched: false
        }
        const multipeToOneSpouseSpy = spyOn(component, 'multipeToOneSpouse').and.callThrough();
        component.forceSpouse(newTestMember);
        expect(multipeToOneSpouseSpy).toBeTruthy();
      }));
    });
  });

});
