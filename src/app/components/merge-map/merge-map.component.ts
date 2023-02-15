import { Component, OnInit } from '@angular/core';
import { merge, combineLatest, Subject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  switchMap
} from 'rxjs/operators';
import { Age, User, UserAge, UserAgeWithType } from '../../user.model';
import { API, UserService } from '../../user.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {
  users: UserAgeWithType[] = [];
  search: string;
  searchString: Subject<string> = new Subject();
  constructor(private readonly _userservice: UserService) {}

  ngOnInit() {
    this.searchString
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((id: string) => this.getUserDetails(parseInt(id)))
      )
      .subscribe(([usersAPI, ageType]) => {
        this.users.push({
          id: usersAPI.id,
          nume: usersAPI.nume,
          age: ageType.id.toString(),
          type: ageType.type
        } as UserAgeWithType);
        console.log(this.users);
      });
  }

  public updateSearch(value) {
    if (value && parseInt(value) >= 11 && parseInt(value) <= 20) {
      this.searchString.next(value);
    }
  }

  private getUserDetails(userID: number): Observable<any> {
    return combineLatest(
      this._userservice.getUser(userID),
      this._userservice
        .getAge(userID)
        .pipe(
          mergeMap((age: Age) =>
            this._userservice.getAgeType(parseInt(age.age))
          )
        )
    );
  }
}
