import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

// providedIn: 'root' makes the service a singleton — one instance shared across the entire application.
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private localCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development Fundamentals', code: 'CS102', credits: 3, gradeStatus: 'passed' },
    { id: 3, name: 'Database Management Systems', code: 'CS201', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Software Engineering Principles', code: 'CS202', credits: 3, gradeStatus: 'passed' },
    { id: 5, name: 'Cloud Computing & DevOps', code: 'CS301', credits: 2, gradeStatus: 'failed' }
  ];

  constructor(private http: HttpClient) {}

  // Synchronous getter for shared service demonstration (Hands-On 6)
  getCoursesSync(): Course[] {
    return this.localCourses;
  }

  // HTTP Observable getter with RxJS operators (Hands-On 8)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // retry strategy: retries failed HTTP requests up to 2 times before propagating the error
      retry(2),
      // tap is used for side effects (logging, analytics) that should not alter the stream
      tap(courses => console.log('Courses loaded via HTTP:', courses.length)),
      // map operator transforms the API response before reaching the component
      map(courses => courses.filter(c => c.credits > 0)),
      catchError(err => {
        console.error('HTTP Course Fetch Error (falling back to local state):', err);
        // Fallback to local array if JSON Server is not running
        return of(this.localCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(() => {
        const found = this.localCourses.find(c => c.id === Number(id));
        return of(found);
      })
    );
  }

  getCourseByIdSync(id: number): Course | undefined {
    return this.localCourses.find(c => c.id === Number(id));
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    const newCourse: Course = {
      ...course,
      id: this.localCourses.length > 0 ? Math.max(...this.localCourses.map(c => c.id)) + 1 : 1
    };
    this.localCourses.push(newCourse);

    return this.http.post<Course>(this.apiUrl, newCourse).pipe(
      catchError(() => of(newCourse))
    );
  }

  updateCourse(course: Course): Observable<Course> {
    const index = this.localCourses.findIndex(c => c.id === course.id);
    if (index !== -1) {
      this.localCourses[index] = course;
    }
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(() => of(course))
    );
  }

  deleteCourse(id: number): Observable<void> {
    this.localCourses = this.localCourses.filter(c => c.id !== id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }

  addCourse(course: Course): void {
    this.localCourses.push(course);
  }
}
