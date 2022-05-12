import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { UsersComponent } from './components/users/users.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    ListPageComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthModule
  ]
})
export class HomeModule { }
