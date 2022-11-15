import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject$.asObservable();
  constructor() {
    console.log("Info: Loading Service initialized");
  }
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => {
        this.loadingOn();
      }),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn(): void {
    this.loadingSubject$.next(true);
  }

  loadingOff(): void {
    this.loadingSubject$.next(false);
  }
}
