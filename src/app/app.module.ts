import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {NavbarComponent} from './navbar/navbar.component';
import {OnlineReaderComponent} from './online-reader/online-reader.component';
import {TokenInputFormComponent} from './token-input-form/token-input-form.component';
import {CurrentReadingsTableComponent} from './current-readings-table/current-readings-table.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

const appRoutes: Routes = [
  {path: 'online-reader', component: OnlineReaderComponent},
  {
    path: 'front',
    component: FrontpageComponent,
    data: {title: 'countmatic home'}
  },
  {
    path: '',
    redirectTo: '/front',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OnlineReaderComponent,
    PageNotFoundComponent,
    FrontpageComponent,
    NavbarComponent,
    TokenInputFormComponent,
    CurrentReadingsTableComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false,}) // <-- true for debugging purposes only
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
