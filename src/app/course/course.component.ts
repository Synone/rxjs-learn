import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable, concat, fromEvent, merge, throwError } from "rxjs";
import {
  catchError,
  concatAll,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";

import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from "@angular/material/progress-spinner";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  course: Course;

  lessons: Lesson[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
