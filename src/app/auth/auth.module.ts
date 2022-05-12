import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { UserService } from './services/user.service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [],
    exports: [],
    providers: []
})

export class AuthModule { }
