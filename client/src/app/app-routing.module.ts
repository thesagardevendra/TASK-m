import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloginComponent } from './prelogin/prelogin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: PreloginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: PreloginComponent,canActivate: [AuthGuard] },
  { path: 'login', component: PreloginComponent,canActivate: [AuthGuard] },
  {
    path: 'task-m',
    loadChildren: () => import('./module-authenticated/module-authenticated.module').then(m => m.ModuleAuthenticatedModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
