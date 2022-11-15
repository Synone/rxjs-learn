import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { filter } from "rxjs/operators";

@Injectable()
export class MessagesService {
  private errSubject$ = new BehaviorSubject<string[]>([]);
  // ----------------------------------------------------------------
  errors$: Observable<string[]> = this.errSubject$
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));
  // ----------------------------------------------------------------
  showMessages(...errors: any) {
    this.errSubject$.next(errors);
  }
}
