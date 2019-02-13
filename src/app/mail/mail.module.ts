import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './pages/mail.component';
import {MailRoutingModule} from './mail-routing.module';
import {PageTitleModule} from '../core/title/components/page-title/page-title.module';
import {FlaggedMailComponent} from './pages/flagged-mail/flagged-mail.component';
import {InboxMailComponent} from './pages/inbox-mail/inbox-mail.component';
import {TrashMailComponent} from './pages/trash-mail/trash-mail.component';

@NgModule({
  declarations: [
    FlaggedMailComponent,
    InboxMailComponent,
    MailComponent,
    TrashMailComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    PageTitleModule
  ]
})
export class MailModule { }
