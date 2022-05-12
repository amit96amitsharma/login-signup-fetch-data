import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { DummyApi } from './dummy.api';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DummyApi<User> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'users');
  }
}
