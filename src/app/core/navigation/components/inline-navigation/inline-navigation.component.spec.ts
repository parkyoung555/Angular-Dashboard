import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineNavigationComponent } from './inline-navigation.component';

describe('InlineNavigationComponent', () => {
  let component: InlineNavigationComponent;
  let fixture: ComponentFixture<InlineNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
