import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Age, AgeType, User } from './user.model';

export const API = {
  users: 'api/usersApiFirst',
  usersApiSecond: 'api/usersApiSecond',
  ages: 'api/ages',
  agesType: 'api/agesType'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  /** GET Users from the server */
  getUsers(userApi?: string): Observable<User[]> {
    return this.http.get<User[]>(userApi || API.users).pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  /** GET Ages from the server */
  getAges(): Observable<Age[]> {
    return this.http.get<Age[]>(API.ages).pipe(
      tap(_ => this.log('fetched ages')),
      catchError(this.handleError<Age[]>('getAges', []))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${API.users}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** GET age by id. Will 404 if id not found */
  getAge(id: number): Observable<Age> {
    const url = `${API.ages}/${id}`;
    return this.http.get<Age>(url).pipe(
      tap(_ => this.log(`fetched age id=${id}`)),
      catchError(this.handleError<User>(`getAge id=${id}`))
    ) as Observable<Age>;
  }
  /** GET agesType by id. Will 404 if id not found */
  getAgeType(id: number): Observable<AgeType> {
    const url = `${API.agesType}/${id}`;
    return this.http.get<AgeType>(url).pipe(
      tap(_ => this.log(`fetched age type id=${id}`)),
      catchError(this.handleError<User>(`getAgeType id=${id}`))
    ) as Observable<AgeType>;
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API.users, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    const url = `${API.users}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    ) as Observable<User>;
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${API.users}/?name=${term}`).pipe(
      tap(x =>
        x.length
          ? this.log(`found users matching "${term}"`)
          : this.log(`no users matching "${term}"`)
      ),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(param: string): void {
    console.log(param);
  }

  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }
}
