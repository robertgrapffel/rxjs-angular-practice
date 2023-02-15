import { Component, OnInit } from '@angular/core';
import { merge, combineLatest } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../user.model';
import { API, UserService } from '../../user.service';

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css'],
})
export class EasyComponent implements OnInit {
  users: User[] = [];
  constructor(private readonly _userservice: UserService) {}

  ngOnInit() {
    merge(
      this._userservice.getUsers(),
      this._userservice.getUsers(API.usersApiSecond).pipe(delay(5000))
    ).subscribe((users: User[]) => {
      console.log(users);
      this.users = [...this.users, ...users];
    });

    // combineLatest(
    //   this._userservice.getUsers(),
    //   this._userservice.getUsers(API.usersApiSecond).pipe(delay(5000))
    // ).subscribe(([usersAPI, usersApiSecond]) => {
    //   console.log(usersAPI);
    //   console.log(usersApiSecond);
    //   this.users = [...usersAPI, ...usersApiSecond];
    // });
  }
}
