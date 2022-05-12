import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from '../../../auth/models/user';

@Component({
  selector: 'home-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    this.userService.search().subscribe((model) => {
      this.users = []
      if (model && model.length) {
        model.forEach((m) => {
          this.users.push(new User(m))
        })
      }
    });
  }
}
