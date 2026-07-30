import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course, Student } from '../models/course.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 2];

  // Injecting CourseService into EnrollmentService demonstrates service-to-service injection
  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    const allCourses = this.courseService.getCoursesSync();
    return allCourses.filter(c => this.enrolledCourseIds.includes(c.id));
  }

  // Used for switchMap demo in Hands-On 8
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    console.log(`Fetching enrolled students for courseId: ${courseId}`);
    const sampleStudents: Student[] = [
      { id: 101, name: 'Shruti Singh', email: 'shruti@example.com', gpa: 3.8 },
      { id: 102, name: 'Rahul Sharma', email: 'rahul@example.com', gpa: 3.6 }
    ];
    return of(sampleStudents);
  }
}
