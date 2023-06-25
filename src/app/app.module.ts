import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BlogComponent } from './blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { UserFormComponent } from './user-form/user-form.component';
import { JwtInterceptor } from './_helpers/JWT.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ScrollToBottomDirective} from "./_helpers/scroll-to-bottom.directive";

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    BlogComponent,
    AdminComponent,
    ChatMessageComponent,
    UserFormComponent,
    UserLoginComponent,
    NavBarComponent,
    ScrollToBottomDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
