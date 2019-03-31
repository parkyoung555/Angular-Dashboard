import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsDrawerComponent } from './task-details-drawer.component';

describe('TaskDetailsDrawerComponent', () => {
  let component: TaskDetailsDrawerComponent;
  let fixture: ComponentFixture<TaskDetailsDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailsDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
