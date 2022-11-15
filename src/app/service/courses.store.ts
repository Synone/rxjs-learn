import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, takeUntil, tap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { MessagesService } from "../messages/messages.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStore {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.loadAllCourses();
  }

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>(`api/courses`).pipe(
      map((res) => res["payload"]),
      catchError((err) => {
        const message = "Could not load all courses";
        this.messagesService.showMessages(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses) => {
        this.coursesSubject.next(courses);
        console.log(this.coursesSubject.getValue());
      })
    );

    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe({
      next: (res) => {
        console.log("res", res);
      },
      error: (err) => {
        console.log("err", err);
      },
      complete() {
        console.log("done");
      },
    });
  }

  saveCourse(courseId: string, changes: any): Observable<any> {
    // Get current list of courses
    const courses = this.coursesSubject.getValue();
    // Get index of change course
    const courseIndex = courses.findIndex((course) => course.id === courseId);
    let { releasedAt, ...compareChange } = changes;
    let newCourseCompare = { ...courses[courseIndex], ...compareChange };

    console.log(JSON.stringify(newCourseCompare));

    if (
      JSON.stringify(newCourseCompare) === JSON.stringify(courses[courseIndex])
    ) {
      return of(null);
    } else {
      const newCourse: Course = {
        ...courses[courseIndex],
        ...changes,
      };
      // Clone shallow copy of courses
      const newCourses = courses.slice(0);
      // replace course locates at courseIndex with new course
      newCourses[courseIndex] = newCourse;
      this.coursesSubject.next(newCourses);
      return this.http.put(`api/courses/${courseId}`, changes).pipe(
        catchError((err) => {
          const message = "Could not save course";
          console.log(message, err);
          this.messagesService.showMessages(message);
          return throwError(err);
        }),
        shareReplay()
      );
    }
    // Because we change partial of course, so we use rest to keep the unchanged values
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) =>
        courses.filter((c) => c.category === category).sort(sortCoursesBySeqNo)
      )
    );
  }
}
