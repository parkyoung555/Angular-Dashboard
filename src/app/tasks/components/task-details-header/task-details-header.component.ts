import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.editedTitleValue = this.titleValue;
  }

  blur() {
    this.editActive = false;
    this.editableHeaderElement.nativeElement.blur();
  }

  cancel() {alert(99);
    this.editedTitleValue = this.titleValue;
    this.onCancel.emit();
    this.blur();
  }

  focus() {
    this.editActive = true;
    // this.editableHeaderElement.nativeElement.select();
    // document.execCommand('selectAll', false, null);
    TaskDetailsHeaderComponent.selectText(this.editableHeaderElement.nativeElement);
  }

  keydown(event) {
    if (event.which === 13) {
      event.preventDefault();
      this.save();
    }
  }

  save() {
    this.onSave.emit(this.editedTitleValue);
    this.blur();
  }

}
