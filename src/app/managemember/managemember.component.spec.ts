import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagememberComponent } from './managemember.component';

describe('ManagememberComponent', () => {
  let component: ManagememberComponent;
  let fixture: ComponentFixture<ManagememberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagememberComponent ]
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
