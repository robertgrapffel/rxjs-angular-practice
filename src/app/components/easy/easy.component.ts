import { Component, OnInit } from "@angular/core";
import { CustomUser, User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-easy",
  templateUrl: "./easy.component.html",
  styleUrls: ["./easy.component.css"],
})
export class EasyComponent implements OnInit {
  users: any;

  constructor(private usersService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers = () => {
    this.usersService.getCustomUsers().subscribe((users) => {
      return (this.users = users);
    });
  };

  sortByName = () => {
    this.users = this.users.sort((first: CustomUser, second: CustomUser) => {
      return first.nume < second.nume ? -1 : 1;
    });
  };

  sortByAge = () => {
    this.users = this.users.sort((first: CustomUser, second: CustomUser) => {
      return +first.userAge! < +second.userAge! ? -1 : 1;
    });
  };

  sortByApi = () => {
    this.getUsers();
  };
}
