import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AboutComponent } from "./about/about.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CourseComponent } from "./course/course.component";
import { CourseDialogComponent } from "./course-dialog/course-dialog.component";
import { CoursesCardListComponent } from "./courses-card-list/courses-card-list.component";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { LessonComponent } from "./lesson/lesson.component";
import { LoadingComponent } from "./loading/loading.component";
import { LoadingService } from "./service/loading.service";
import { LoginComponent } from "./login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MessagesComponent } from "./messages/messages.component";
import { MessagesService } from "./messages/messages.service";
import { NgModule } from "@angular/core";
import { SafeUrlPipe } from "./common/safe-url.pipe";
import { SearchLessonsComponent } from "./search-lessons/search-lessons.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CourseComponent,
    CourseDialogComponent,
    LoginComponent,
    LessonComponent,
    SafeUrlPipe,
    MessagesComponent,
    SearchLessonsComponent,
    LoadingComponent,
    CoursesCardListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AppRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
  ],
  providers: [LoadingService, MessagesService],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent],
})
export class AppModule {}
