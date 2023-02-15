import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Age, AgeType, User } from './user.model';
import { QueryUsageStrategy } from '@angular/core/schematics/migrations/static-queries/strategies/usage_strategy/usage_strategy';

export const API = {
  users: 'api/usersApiFirst',
  usersApiSecond: 'api/usersApiSecond',
  ages: 'api/ages',
  agesType: 'api/agesType',
  identity: 'api/identity',
};

/**
 * To get the data from mock-memory-data.service you just need to do a http call to the api above
 * Ex: check getUsers
 */

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  /** GET Users from the server */
  getUsers(userApi?: string): Observable<User[]> {
    return this.http.get<User[]>(userApi || API.users).pipe(
      tap((users) => this.log('fetched users', users)),
      catchError(this.handleError<User[]>('getUsers', []))
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

  private log(message: string, param?: any): void {
    console.log(message, param);
  }
}
