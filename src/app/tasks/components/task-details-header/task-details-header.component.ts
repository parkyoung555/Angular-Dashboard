import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, HostListener} from '@angular/core';

@Component({
  selector: 'app-task-details-header',
  templateUrl: './task-details-header.component.html',
  styleUrls: ['./task-details-header.component.scss']
})
export class TaskDetailsHeaderComponent implements OnInit {

  editActive: boolean;
  editedTitleValue: string;
  @ViewChild('editableHeader') editableHeaderElement: ElementRef;
  @Input() titleEditable: boolean;
  @Input() titleValue: string;
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();

  static selectText(element: Element) {
    const doc = window.document;
    let sel, range;

    if (window.getSelection && doc.createRange) {
      sel = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(element);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  static clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }

  constructor(
    private componentElement: ElementRef
  ) { }

  ngOnInit() {
    this.editedTitleValue = this.titleValue;
  }

  @HostListener('document:click', ['$event'])
  blur(event) {
    if (!this.componentElement.nativeElement.contains(event.target)) {
      this.save();
    }
  }

  cancel() {
    this.editedTitleValue = this.titleValue;
    this.onCancel.emit();
    this.editActive = false;
    this.editableHeaderElement.nativeElement.blur(); 
    // TaskDetailsHeaderComponent.clearSelection();
  }

  editMode() {
    this.editActive = true;
    // TaskDetailsHeaderComponent.selectText(this.editableHeaderElement.nativeElement);
  }

  keydown(event) {
    if (event.which === 13) {
      event.preventDefault();
      if (!this.editActive) {
        this.editMode();
      } else {
        this.save();
      }
    }
  }

  save() {
     if (this.editActive) {
      this.onSave.emit(this.editedTitleValue);
      this.editActive = false;
      // TaskDetailsHeaderComponent.clearSelection();
      this.editableHeaderElement.nativeElement.blur(); 
    }
  }

}
