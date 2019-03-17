import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from './components/rich-text-editor.component';

@NgModule({
  declarations: [RichTextEditorComponent],
  imports: [
    CommonModule
  ],
  exports: [
      RichTextEditorComponent
  ]
})
export class RichTextEditorModule { }
