import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../data-store.service';
import { UserAge } from '../../user.model';

@Component({
  selector: 'app-data-store',
  templateUrl: './data-store.component.html',
  styleUrls: ['./data-store.component.css']
})
export class DataStoreComponent implements OnInit {
  users: UserAge[] = [];
  showInfo: boolean;
  constructor(private readonly _dataStoreService: DataStoreService) {}

  ngOnInit() {
    this._dataStoreService.data.subscribe(users => {
      this.users = users;
      this.showInfo = !!(users && users.length);
    });
  }
}
