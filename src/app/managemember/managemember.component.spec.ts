import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagememberComponent } from './managemember.component';
import { MemberService } from "../service/member.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('ManagememberComponent', () => {
  let component: ManagememberComponent;
  let fixture: ComponentFixture<ManagememberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpModule],
      declarations: [ ManagememberComponent ],
      providers: [MemberService]
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
});
