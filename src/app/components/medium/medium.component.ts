import { Component, OnInit } from "@angular/core";
import { combineLatest, map, shareReplay, take, tap } from "rxjs";
import { CustomUser, UserId } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.css']
})
export class MediumComponent implements OnInit {
  users: CustomUser[] = [];
  blockedUsers: UserId[] = [];

  constructor(private usersService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers = () => {
    combineLatest([
      this.usersService.getCustomUsers(),
      this.usersService.getBlackList(),
    ])
      .pipe(
        take(1),
        shareReplay(1),
        map(([users, blockedUsers]) => {
          const filteredUsers = users.filter(
            (user) =>
              !blockedUsers.some((blockedUser) => blockedUser.id === user.id)
          );

          return (this.users = filteredUsers);
        })
      )
      .subscribe();
  };

  onUserClick = (user: CustomUser) => {
    alert(
      user.nume + " is " + user.userAge + " years old and is " + user.ageType
    );
  };
}
