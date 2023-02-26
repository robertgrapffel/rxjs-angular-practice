import { Component, OnInit } from "@angular/core";
import { combineLatest, map, take } from "rxjs";
import {
  Age,
  customUser,
  Identity,
  IdentityEnum,
} from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css'],
})
export class EasyComponent implements OnInit {
  customUsers: customUser[] = [];

  users: any = [];

  users$ = this.usersService.getUsers();
  ages$ = this.usersService.getUsersAges();
  ageTypes$ = this.usersService.getUsersAgesTypes();
  identities$ = this.usersService.getUsersIdentities();

  constructor(private usersService: UserService) {}

  ngOnInit() {
    this.getCustomUser();
  }

  getCustomUser = () => {
    return combineLatest([
      this.users$,
      this.ages$,
      this.identities$,
      this.ageTypes$,
    ])
      .pipe(
        take(1),
        map(([users, ages, identities, ageTypes]) => {
          return users.map((user) => {
            const { id, nume } = user;
            const userAge: string | undefined = ages.find(
              (age: Age | undefined) => (age ? age.id === user.id : "None")
            )?.age;
            const userIdentity: Identity | undefined = identities.find(
              (identity: Identity) => identity.id === user.id
            );
            const identity = IdentityEnum[userIdentity?.type || IdentityEnum.Personal];

            //TODO Ask why is not working!!
            // const userAgeType = ageTypes.find(
            //   (type) =>
            //     userAge && type.ageMin <= userAge && type.ageMax >= userAge
            // )?.type;

            // console.log(userAge);
            // console.log(userAgeType);

            return this.users.push({ id, nume, userAge, identity });
          });
        })
      )
      .subscribe();
  };
}
