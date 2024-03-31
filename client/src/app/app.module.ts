import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { PreloginComponent } from './prelogin/prelogin.component';
import { LoginComponent } from './login/login.component'
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ModuleAuthenticatedModule } from './module-authenticated/module-authenticated.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    PreloginComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      primaryColour: "#1e40af",
    }),
    HttpClientModule,
    ModuleAuthenticatedModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
