import {Component, ElementRef, EventEmitter, Input, OnInit, OnChanges, Output, ViewChild, HostListener, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-task-details-header',
  templateUrl: './task-details-header.component.html',
  styleUrls: ['./task-details-header.component.scss']
})
export class TaskDetailsHeaderComponent implements OnInit, OnChanges {

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

  static placeCaretAtEnd(element) {
    element.focus();
    if (typeof window.getSelection !== void(0) && typeof document.createRange !== void(0)) {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (
        // @ts-ignore
        document.body.createTextRange !== void(0)
    ) {
      // @ts-ignore
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(element);
      textRange.collapse(false);
      textRange.select();
    }
  }

  constructor(
    private componentElement: ElementRef
  ) { }

  ngOnInit() {
    this.editedTitleValue = this.titleValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    const title = changes.titleValue;
    if (title) {
      this.editedTitleValue = title.currentValue;
    }
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
    if (!this.editActive) {
      this.editActive = true;
      // TaskDetailsHeaderComponent.selectText(this.editableHeaderElement.nativeElement);
      TaskDetailsHeaderComponent.placeCaretAtEnd(this.editableHeaderElement.nativeElement);
    }
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
      if (!this.editedTitleValue || !this.editedTitleValue.trim()) {
        this.cancel();
        return;
      }
      this.editedTitleValue = this.editedTitleValue.trim();
      this.onSave.emit(this.editedTitleValue);
      this.editActive = false;
      // TaskDetailsHeaderComponent.clearSelection();
      this.editableHeaderElement.nativeElement.blur();
    }
  }

}
