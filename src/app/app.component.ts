import { Component, OnInit } from "@angular/core";

import { AuthStore } from "./service/auth.store";
import { BoundElementProperty } from "@angular/compiler";
import { LoadingService } from "./service/loading.service";
import { MessagesService } from "./messages/messages.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthStore) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
