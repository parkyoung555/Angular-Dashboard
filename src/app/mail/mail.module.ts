import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './pages/mail.component';
import {MailRoutingModule} from './mail-routing.module';
import {PageTitleModule} from '../core/title/components/page-title/page-title.module';

@NgModule({
  declarations: [MailComponent],
  imports: [
    CommonModule,
    MailRoutingModule,
    PageTitleModule
  ]
})
export class MailModule { }
