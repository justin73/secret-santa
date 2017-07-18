import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelComponent } from './adminpanel.component';
import { MemberService } from "../service/member.service";
import { HttpModule } from '@angular/http';

describe('AdminpanelComponent', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ AdminpanelComponent ],
      providers: [ MemberService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  // it('should call checkDrawStatus function when component is defined', () => {
  //   const checkDrawStatusSpy = spyOn(component, 'checkDrawStatus').and.callThrough();
  //   component.ngOnInit();
  //   expect(checkDrawStatusSpy).toHaveBeenCalledWith([]);
  // })
});
