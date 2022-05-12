import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { DummyApi } from './dummy.api';


@Injectable({
  providedIn: 'root'
})
export class RegisterService extends DummyApi<Register> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'register');
  }
}
