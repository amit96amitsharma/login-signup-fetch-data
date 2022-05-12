import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { DummyApi } from './dummy.api';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends DummyApi<Login> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'login');
  }
}