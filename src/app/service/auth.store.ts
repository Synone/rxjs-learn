import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: "root",
})
export class AuthStore {
  constructor(private http: HttpClient) {
    this.isLoggedIn = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut = this.isLoggedIn.pipe(map((loggedIn) => !loggedIn));
    const localStorage_user = localStorage.getItem(AUTH_DATA);
    if (localStorage_user) {
      this.subject.next(JSON.parse(localStorage_user));
    }
  }
  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn: Observable<boolean>;
  isLoggedOut: Observable<boolean>;

  login(email: string, password: string): Observable<User> {
    const self = this;
    return self.http.post<User>("/api/login", { email, password }).pipe(
      tap((user) => {
        self.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
