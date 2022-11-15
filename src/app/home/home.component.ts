import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable, interval, noop, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";

// import { CourseService } from "./../service/courses.service";
import { CoursesStore } from "./../service/courses.store";

// import { LoadingService } from "../service/loading.service";
// import { MessagesService } from "../messages/messages.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public beginnerCourses$: Observable<Course[]>;

  public advancedCourses$: Observable<Course[]>;

  constructor(
    // private courseService: CourseService,
    // private loadingService: LoadingService,
    // private messagesService: MessagesService
    private courseStore: CoursesStore
  ) {}

  ngOnInit() {
    const me = this;
    me.reloadPages();
  }

  public reloadPages() {
    const me = this;
    // me.loadingService.loadingOn();
    //  $ sign to make it easier to know it is an observable
    // add $ sign after observable variables
    /*
     **
     const courses$ = me.courseService.loadAllCourses().pipe(
       map((courses) => courses.sort(sortCoursesBySeqNo)),
       catchError((err) => {
         const message = "Could not load all courses";
         this.messagesService.showMessages(message);
         console.log(message, err);
         return throwError(err);
       })
        finalize(() => {
        me.loadingService.loadingOff();
       })  // finalize will call the function when the observable completes or error occurs
     );
     */

    //----------------------------------------------------------------

    // const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);
    //----------------------------------------------------------------
    // me.beginnerCourses$ = loadCourses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.category == "BEGINNER")
    //   )
    // );
    // me.advancedCourses$ = loadCourses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.category == "ADVANCED")
    //   )
    // );

    // -- New code here --
    me.beginnerCourses$ = me.courseStore.filterByCategory("BEGINNER");
    me.advancedCourses$ = me.courseStore.filterByCategory("ADVANCED");
  }

  logger(eventCaught: any): void {
    console.log(
      "Event caught when closing dialog, using event emit (Output)",
      eventCaught
    );
  }
}
