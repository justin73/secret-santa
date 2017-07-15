import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsantaComponent } from './viewsanta.component';

describe('ViewsantaComponent', () => {
  let component: ViewsantaComponent;
  let fixture: ComponentFixture<ViewsantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsantaComponent ]
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
});
