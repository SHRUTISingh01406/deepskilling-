import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Course, Student } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

/*
switchMap is essential for type-ahead search and dependent HTTP calls.
It automatically unsubscribes/cancels the previous inner Observable (HTTP request) whenever a new outer emission arrives.
This prevents out-of-order responses and race conditions when users quickly switch between course detail views.
*/

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  public course$: Observable<Course | undefined> = of(undefined);
  public enrolledStudents$: Observable<Student[]> = of([]);
  public courseId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Read route parameter :id
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = Number(idParam);
      this.course$ = this.courseService.getCourseById(this.courseId);

      // switchMap chaining HTTP calls: course selection -> load enrolled students
      this.enrolledStudents$ = this.route.paramMap.pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.enrollmentService.getStudentsByCourse(id);
        })
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
