import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLogoIconComponent } from './dynamic-logo-icon.component';

describe('DynamicLogoIconComponent', () => {
  let component: DynamicLogoIconComponent;
  let fixture: ComponentFixture<DynamicLogoIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicLogoIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLogoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
