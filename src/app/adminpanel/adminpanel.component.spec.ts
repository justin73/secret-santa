import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelComponent } from './adminpanel.component';
import { MemberService } from "../service/member.service";
import { HttpModule } from '@angular/http';
import { Member } from "../../member";
import { Observable } from "rxjs/Observable";

const mockMemberList: Member[] = [
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
const MockMissingMemberList: Member[] = [
    {
        "_id": "596ec7574631eb2d0e034d42",
        "name": "a",
        "spouse": null,
        "santa": "",
        "isMatched": false
    }
];
class MockMemberService {
  getMembers() {
    return Observable.of(mockMemberList);
  }
  updateMember () {
    return Observable.of({})
  }
}

class MockMissingMemberService {
  getMembers() {
    return Observable.of([]);
  }
  updateMember () {
    return Observable.of({})
  }
}

describe('AdminpanelComponent with proper data', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ AdminpanelComponent ],
      providers: [{ provide: MemberService, useClass: MockMemberService }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeDefined();
  });
  it('should call memberservice and getMembers and checkDrawStatus is called', async(() => {
    const checkDrawStatusSpy = spyOn(component, 'checkDrawStatus').and.callThrough();
    component.ngOnInit();
    expect(component.memberList).toEqual([ 'a', 'b', 'c', 'd', 'f', 'a', 'b', 'c', 'd', 'f' ]);
    expect(checkDrawStatusSpy).toHaveBeenCalled();
  }))

  describe('Activate draw functions', () => {
    it('should call activateDraw function when button is clicked and able to successfully set the draw by given data', async(() => {
      const activateDrawSpy = spyOn(component, 'activateDraw').and.callThrough()
      const compiled = fixture.debugElement.nativeElement;
      const el = compiled.querySelector('button');
      el.click();
      expect(activateDrawSpy).toHaveBeenCalled();
    }));
  });
});


describe('AdminpanelComponent with data list empty', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ AdminpanelComponent ],
      providers: [{ provide: MemberService, useClass: MockMissingMemberService }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should call memberservice and getMembers and checkDrawStatus is called', async(() => {
    const checkDrawStatusSpy = spyOn(component, 'checkDrawStatus').and.callThrough();
    component.ngOnInit();
    expect(component.memberList).toEqual([]);
    expect(checkDrawStatusSpy).toHaveBeenCalled();
  }))

  it('should disable the draw when list is less than 2', async(() => {
    const disabledSpy = spyOn(component, 'disableDraw').and.callThrough();
    component.checkDrawStatus([]);
    expect(disabledSpy).toHaveBeenCalledWith("Please add at least two non-spouse relation participants");
  }))
});