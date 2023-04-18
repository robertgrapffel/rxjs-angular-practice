import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { combineLatest, shareReplay, take } from "rxjs";
import { User, UserId } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

export interface ICustomUser {
  id: number;
  nume: string;
  age: string;
}

@Component({
  selector: "app-hard",
  templateUrl: "./hard.component.html",
  styleUrls: ["./hard.component.css"],
})
export class HardComponent implements OnInit {
  public hardForm: FormGroup;
  public isInBlackList = false;
  public matchedUser: any = {};

  private _allUsers: User[] = [];
  private _blackList: UserId[] = [];

  constructor(private _fb: FormBuilder, private _userService: UserService) {
    this.hardForm = this._buildForm();
  }

  ngOnInit() {
    this._getData();
    this.hardForm
      .get("userId")
      ?.valueChanges.pipe()
      .subscribe((input) => {
        this.isInBlackList = this._blackList.some(
          (blockedUser) => blockedUser.id === input
        );

        // if (document.getElementById("error") !== null) {
        //   setTimeout(
        //     () => (document.getElementById("error").style.display = "none"),
        //     1000
        //   );
        // }

        this.matchedUser = this._allUsers.find((user) => user.id === input);
      });
  }

  private _buildForm = () => {
    return this._fb.group({
      userId: ["", [Validators.min(0), Validators.max(40)]],
    });
  };

  private _getData = () => {
    return combineLatest([
      this._userService.getUsers(),
      this._userService.getUsersAges(),
      this._userService.getBlackList(),
    ])
      .pipe(take(1), shareReplay())
      .subscribe(([allUsers, userAges, blackList]) => {
        allUsers.map((user) => {
          const userAge = userAges.find((ages) => ages.id === user.id);

          this._blackList = blackList;

          return this._allUsers.push({
            ...user,
            ...userAge,
          });
        });
      });
  };
}
