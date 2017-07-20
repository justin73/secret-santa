import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsantaComponent } from './viewsanta.component';
import { MemberService } from '../service/member.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs/Observable";
import { inject } from "@angular/core/testing";

class MockMemberService {
  findMember(){
    return Observable.of({
      "_id": "596ec7574631eb2d0e034d42",
      "name": "a",
      "spouse": null,
      "santa": "d",
      "isMatched": true
    })
  }
}


describe('ViewsantaComponent', () => {
  let component: ViewsantaComponent;
  let fixture: ComponentFixture<ViewsantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpModule ],
      declarations: [ ViewsantaComponent ],
      providers: [{ provide: MemberService, useClass: MockMemberService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call findMatchFor() function when enter is pressed', async(() => {
    let form = fixture.debugElement.query(By.css('form'));
    component.memberName = "a"
    const findMatchForSpy = spyOn(component, 'findMatchFor').and.callThrough();
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(findMatchForSpy).toHaveBeenCalled();
  }));

  it('should do a service call to find the member', async(inject([], () => {
    component.memberName = "a";
    component.findMatchFor();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        expect(component.result.length).toEqual(1);
      });    
  })));
});
