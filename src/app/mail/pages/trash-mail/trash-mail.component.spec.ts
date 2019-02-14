import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashMailComponent } from './trash-mail.component';

describe('TrashMailComponent', () => {
  let component: TrashMailComponent;
  let fixture: ComponentFixture<TrashMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
