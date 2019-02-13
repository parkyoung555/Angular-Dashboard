import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedMailComponent } from './flagged-mail.component';

describe('FlaggedMailComponent', () => {
  let component: FlaggedMailComponent;
  let fixture: ComponentFixture<FlaggedMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
