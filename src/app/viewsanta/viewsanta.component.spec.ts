import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsantaComponent } from './viewsanta.component';
import { MemberService } from '../service/member.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

describe('ViewsantaComponent', () => {
  let component: ViewsantaComponent;
  let fixture: ComponentFixture<ViewsantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpModule ],
      declarations: [ ViewsantaComponent ],
      providers: [ MemberService ]
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
    const findMatchForSpy = spyOn(component, 'findMatchFor').and.callThrough();
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(findMatchForSpy).toHaveBeenCalled();
  }))
});
