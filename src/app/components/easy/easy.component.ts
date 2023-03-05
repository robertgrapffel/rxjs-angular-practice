import { Component, OnInit } from "@angular/core";
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

  //TODO: Add sorting buttons
}
