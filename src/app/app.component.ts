import { Component, OnInit, VERSION } from "@angular/core";
import { UserService } from "./services/user.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
