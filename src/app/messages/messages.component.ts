import { Component, OnInit } from "@angular/core";

import { Message } from "../model/message";
import { MessagesService } from "./messages.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  errors$: Observable<string[]>;
  constructor(public messagesService: MessagesService) {
    console.log("Info: Messages Component initialized");
  }

  ngOnInit() {
    const me = this;
    me.errors$ = me.messagesService.errors$.pipe(
      tap(() => (me.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
