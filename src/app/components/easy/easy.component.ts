import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css'],
})
export class EasyComponent implements OnInit {
  constructor(private readonly _userservice: UserService) {}

  ngOnInit() {
    this._userservice.getUsers().subscribe();
  }
}
