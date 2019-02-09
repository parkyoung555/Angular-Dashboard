import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HeaderModule } from './header/header.module';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {HttpClientModule} from '@angular/common/http';
import {AppearanceModule} from './appearance/appearance.module';
import {SideNavigationModule} from './navigation/components/side-navigation/side-navigation.module';

@NgModule({
  imports: [
    AppearanceModule,
    BrowserAnimationsModule,
    HeaderModule,
    HttpClientModule,
    SideNavigationModule
  ],
  exports: [
    HeaderModule,
    SideNavigationModule
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
