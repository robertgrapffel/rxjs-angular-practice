import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, combineLatest } from "rxjs";
import { catchError, map, shareReplay, take, tap } from "rxjs/operators";
import {
  Age,
  AgeType,
  CustomUser,
  Identity,
  IdentityEnum,
  User,
  UserId,
} from "../models/user.model";

export const API = {
  users: "api/users",
  blackList: "api/blackList",
  ages: "api/ages",
  agesType: "api/agesType",
  identity: "api/identity",
};

/**
 * To get the data from mock-memory-data.service you just need to do a http call to the API above
 * Ex: check getUsers method from this service to get multiple data
 * Ex: check getUserById method from this service to get just one user (one data)
 */

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
  }

  /** GET Users from the server */
  getUsers(userApi?: string): Observable<User[]> {
    return this.http.get<User[]>(userApi || API.users).pipe(
      tap((users) => this.log("fetched users", users)),
      catchError(this.handleError<User[]>("getUsers", []))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUserById(id: number): Observable<User> {
    const url = `${API.users}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((_) => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUsersAges(userApi?: string): Observable<Age[]> {
    return this.http.get<Age[]>(userApi || API.ages).pipe(
      tap((ages) => this.log("fetched users ages", ages)),
      catchError(this.handleError<Age[]>("getUsersAges", []))
    );
  }

  getUsersIdentities(userApi?: string): Observable<Identity[]> {
    return this.http.get<Identity[]>(userApi || API.identity).pipe(
      tap((identities) => this.log("fetched users identities", identities)),
      catchError(this.handleError<Identity[]>("getUsersIdentities", []))
    );
  }

  getUsersAgesTypes(userApi?: string): Observable<AgeType[]> {
    return this.http.get<AgeType[]>(userApi || API.agesType).pipe(
      tap((agesType) => this.log("fetched users agesType", agesType)),
      catchError(this.handleError<AgeType[]>("getUsersIdentities", []))
    );
  }

  getBlackList(userApi?: string): Observable<UserId[]> {
    return this.http.get<UserId[]>(userApi || API.blackList).pipe(
      tap((blockedUsers) => this.log("fetched blocked users", blockedUsers)),
      catchError(this.handleError<UserId[]>("getUsersIdentities", []))
    );
  }

  getCustomUsers = (): Observable<CustomUser[]> => {
    return combineLatest([
      this.getUsers(),
      this.getUsersAges(),
      this.getUsersIdentities(),
      this.getUsersAgesTypes(),
    ]).pipe(
      take(1),
      shareReplay(1),
      map(([users, ages, identities, ageTypes]) => {
        return users.map((user: User) => {
          const { id, nume } = user;
          const userAge: string | undefined = ages.find(
            (age: Age | undefined) => (age ? age.id === user.id : "None")
          )?.age;
          const userIdentity: Identity | undefined = identities.find(
            (identity: Identity) => identity.id === user.id
          );
          const identity =
            IdentityEnum[userIdentity?.type || IdentityEnum.Personal];
          const ageType = ageTypes.find(
            (type: AgeType) =>
              userAge && +type.ageMax >= +userAge && +type.ageMin <= +userAge
          )?.type;

          return { id, nume, userAge, identity, ageType };
        });
      })
    );
  };

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string, param?: any): void {
    console.log(message, param);
  }
}
