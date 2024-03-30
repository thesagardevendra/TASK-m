import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModuleAuthenticatedComponent } from './module-authenticated.component';
import { YourWorkComponent } from './your-work/your-work.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuard } from '../guard/auth.guard';


const routes: Routes = [
  {
    path: '', component: ModuleAuthenticatedComponent, children: [
      { path: 'your-work', component: YourWorkComponent, },
      { path: 'project', component: ProjectComponent, }
    ],
    canActivate: [AuthGuard]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAuthenticatedRoutingModule { }
