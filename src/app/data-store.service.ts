import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserAge } from './user.model';

@Injectable()
export class DataStoreService {
  private dataSource = new BehaviorSubject<UserAge[]>([]);
  data = this.dataSource.asObservable();

  constructor() {}

  updatedDataSelection(data: UserAge[]) {
    this.dataSource.next(data);
  }
}
