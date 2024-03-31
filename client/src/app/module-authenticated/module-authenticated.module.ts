import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { ModuleAuthenticatedComponent } from './module-authenticated.component';
import { YourWorkComponent } from './your-work/your-work.component';
import { ModuleAuthenticatedRoutingModule } from './module-authenticated-routing.module';
import { ProjectComponent } from './project/project.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';
import { ClickoutsidedirectiveDirective } from './clickoutsidedirective.directive';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TeamsComponent } from './teams/teams.component';
import { ExtractInitialsPipe } from '../pipes/ExtractInitialsPipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ModuleAuthenticatedComponent,
    YourWorkComponent,
    ProjectComponent,
    ClickoutsidedirectiveDirective,
    ProjectDetailsComponent,
    TeamsComponent,
    ExtractInitialsPipe
  ],
  imports: [
    CommonModule,
    ModuleAuthenticatedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      primaryColour: "#1e40af",
    }),
    HttpClientModule,
  ]
})
export class ModuleAuthenticatedModule { }
