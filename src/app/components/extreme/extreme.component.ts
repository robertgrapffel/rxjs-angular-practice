import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  User,
  Age,
  Identity,
  IdentityEnum,
  UserId,
} from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { combineLatest, debounceTime, shareReplay, take } from "rxjs";

@Component({
  selector: "app-extreme",
  templateUrl: "./extreme.component.html",
  styleUrls: ["./extreme.component.css"],
})
export class ExtremeComponent implements OnInit {
  public extremeForm: FormGroup;
  public matchedUsers: any = [];
  public userAges: Age[] | undefined = [];
  public isInBlackList: boolean = false;
  public isDirty = false;
  public userType: string | undefined = "";

  private _allUsers: User[] = [];
  private _blackList: UserId[] = [];

  constructor(private _fb: FormBuilder, private _userService: UserService) {
    this.extremeForm = this._buildForm();
  }

  ngOnInit() {
    this._getData();

    this.extremeForm
      .get("userInput")
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((input) => {
        this.matchedUsers = this._allUsers.filter((user) =>
          user.nume.toLowerCase().includes(input)
        );
        this._checkBlackList();
      });
  }

  public getMoreInfo = (user: any) => {
    return combineLatest([
      this._userService.getUsersAgesTypes(),
      this._userService.getUsersIdentities(),
    ])
      .pipe(take(1))
      .subscribe(([types, identities]) => {
        const userType = types.find(
          (type) =>
            user.age && +type.ageMax >= +user.age && +type.ageMin <= +user.age
        )?.type;
        const userIdentity = identities.find(
          (identity: Identity) => identity.id === user.id
        );

        const identity =
          IdentityEnum[userIdentity?.type || IdentityEnum.Personal];

        alert(userType + " " + identity);
      });
  };

  private _buildForm = () => {
    return this._fb.group({
      userInput: ["", [Validators.pattern("[a-zA-Z ]*")]],
    });
  };

  private _checkBlackList = () => {
    this.matchedUsers.map((user: User) => {
      this.isInBlackList = this._blackList.some(
        (blockedUser) => blockedUser.id === user.id
      );
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
