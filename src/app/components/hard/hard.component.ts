import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { combineLatest, map, take } from "rxjs";
import { User, UserId } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-hard",
  templateUrl: "./hard.component.html",
  styleUrls: ["./hard.component.css"],
})
export class HardComponent implements OnInit {
  public hardForm: FormGroup;
  public userIsBlocked = false;
  public userInput: number;

  public userName = "";
  public userAge = "";

  constructor(private _fb: FormBuilder, private _userService: UserService) {
    this.hardForm = this._buildForm();

    this.userInput = +this.hardForm.get("userId")!;
  }

  ngOnInit() {}

  private _buildForm = () => {
    return this._fb.group({
      userId: [this.userInput, [Validators.min(0), Validators.max(40)]],
    });
  };

  public onInputChange = () => {
    this._checkUser(this.userInput).subscribe((res) => {
      this.userName = res?.nume!;
      this.userAge = res?.age!;
    });
  };

  private _checkUser = (id: number) => {
    return combineLatest([
      this._userService.getUserById(id),
      this._userService.getBlackList(),
      this._userService.getUserAgeById(id),
    ]).pipe(
      take(1),
      map(([user, blackList, userAge]) => {
        if (user.id) {
          const { nume } = user;
          const { age } = userAge;

          this.userIsBlocked = false;

          if (blackList.find((user) => user.id === id)) {
            console.log("este blocat");
            this.userIsBlocked = true;
          }

          return { nume, age };
        }

        return;
      })
    );
  };
}
