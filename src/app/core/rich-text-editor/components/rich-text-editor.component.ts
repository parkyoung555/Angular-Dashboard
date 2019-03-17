import {Component, ElementRef, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const keys = {
  enter: 13
};

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichTextEditorComponent),
    multi: true
  }]
})
export class RichTextEditorComponent implements OnInit, ControlValueAccessor {

  disabled: boolean;
  @ViewChild('textBody') textBodyElement: ElementRef;
  @Input() data: string;

  private _value: string;

  onChange: any = () => { };
  onTouch: any = () => { };

  constructor() { }

  ngOnInit() {
    this._value = this.data;
  }

  keydown(event) {
    if (event.which === keys.enter) {
      // document.execCommand('defaultParagraphSeparator', false, 'p');
      // return false;
    }
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(this._value);
    this.onTouch();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
