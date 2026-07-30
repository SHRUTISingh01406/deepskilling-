import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { CourseService } from '../../services/course.service';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, CourseSummaryWidgetComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  public courses$: Observable<Course[]>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public enrolledIds$: Observable<number[]>;

  public isLoading = true;
  public selectedCourseId: number | null = null;
  public searchTerm = '';
  public errorMessage: string | null = null;

  constructor(
    private store: Store,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnInit(): void {
    // Hands-On 9: Dispatch NgRx load action
    this.store.dispatch(CourseActions.loadCourses());

    // Hands-On 3: Simulate 1.5s initial loading state
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // Hands-On 7: Read search query parameter
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }
  }

  // trackBy is essential for large lists — without it, Angular re-renders every list item on any array change. With trackBy, only changed items are updated.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
    this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId }));
  }

  onCardClick(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  onSearchChange(): void {
    // Hands-On 7: Update URL query parameter
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }
}
