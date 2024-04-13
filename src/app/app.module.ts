import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StorePageComponent } from './components/pages/store-page/store-page.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ForSaleCardComponent } from './components/pages/store-page/for-sale-list/for-sale-card/for-sale-card.component';
import { ForSaleListComponent } from './components/pages/store-page/for-sale-list/for-sale-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './components/pages/Auth/login-page/login-page.component';
import { SignUpPageComponent } from './components/pages/Auth/sign-up-page/sign-up-page.component';
import { AddItemComponent } from './components/pages/store-page/add-item/add-item.component';
// import AuthInterceptor from './components/pages/Auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StorePageComponent,
    LeftSideBarComponent,
    RightSidebarComponent,
    ForSaleCardComponent,
    ForSaleListComponent,
    LoginPageComponent,
    SignUpPageComponent,
    AddItemComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
