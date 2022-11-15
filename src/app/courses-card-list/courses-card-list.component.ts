import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { filter, tap } from "rxjs/operators";

import { Course } from "../model/course";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { LoadingService } from "./../service/loading.service";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.scss"],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  beginnerCourses: Course[] = [];
  @Input()
  advancedCourses: Course[] = [];

  @Output()
  private courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // this.loadingService.logger();
  }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.exitAnimationDuration = "200ms";
    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    // afterClosed dialog
    dialogRef
      // subscribe to afterClosed events (which return an observable) to get notified when the dialog is closed
      .afterClosed() // return an observable that contains value of dialogRef.close()
      //  add event emiter to notify that values have been updated
      .pipe(
        filter((val) => !!val),
        tap((val) => {
          this.courseChanged.emit(val);
          console.log("After closed works");
        }) // course has been updated
      )
      .subscribe();
  }
}
