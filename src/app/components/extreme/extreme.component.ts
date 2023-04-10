import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AgeType,
  User,
  Age,
  Identity,
  IdentityEnum,
} from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { combineLatest, map, take, tap } from "rxjs";

@Component({
  selector: "app-extreme",
  templateUrl: "./extreme.component.html",
  styleUrls: ["./extreme.component.css"],
})
export class ExtremeComponent implements OnInit {
  public extremeForm: FormGroup;
  public searchedUser;
  public foundUsers: User[] | [] = [];
  public isInBlackList: boolean = false;
  public isDirty = false;
  public userType: string | undefined = "";

  constructor(private _fb: FormBuilder, private _userService: UserService) {
    this.extremeForm = this._buildForm();

    this.searchedUser = this.extremeForm.get("userInput")?.value;
  }

  ngOnInit() {}

  private _buildForm = () => {
    return this._fb.group({
      userInput: ["", [Validators.pattern("[a-zA-Z ]*")]],
    });
  };

  //Stuck here !!!!
  onInputChange() {
    this.isDirty = this.extremeForm.get("userInput")?.dirty!;
    combineLatest([
      this._userService.getUsers(),
      this._userService.getBlackList(),
      this._userService.getUsersAges(),
      this._userService.getUsersAgesTypes(),
      this._userService.getUsersIdentities(),
    ])
      .pipe(
        take(1),
        map(([users, blackList, ages, ageTypes, identities]) => {
          if (this.isDirty) {
            this.foundUsers = users.filter((user) =>
              user.nume.toLowerCase().includes(this.searchedUser)
            );
            this.foundUsers.map((user) => {
              if (blackList.find((blockedUser) => blockedUser.id === user.id)) {
                this.isInBlackList = true;
              }
              let userAge = ages.find((age) =>
                age ? age.id === user.id : "None"
              )?.age;

              return userAge;
            });
          }
        })
      )
      .subscribe((res) => console.log(res));
  }
}
