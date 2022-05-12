import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const landingModule = () => import('./landing/landing.module').then(x => x.LandingModule);
const listModule = () => import('./home/home.module').then(x => x.HomeModule);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  { path: 'landing', loadChildren: landingModule, canActivate: [GuestGuard] },
  { path: 'users', loadChildren: listModule, canActivate: [AuthGuard] },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
