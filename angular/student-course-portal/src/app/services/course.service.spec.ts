import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'CS 101', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'CS 102', code: 'CS102', credits: 3, gradeStatus: 'passed' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asserts that there are no outstanding (unsatisfied) HTTP requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses via GET request', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('CS 101');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle error when API returns 500 (flushing retry attempts)', () => {
    service.getCourses().subscribe(courses => {
      // Falls back to local courses on error
      expect(courses).toBeDefined();
    });

    // Handle initial request + 2 retries (retry(2))
    const requests = httpMock.match('http://localhost:3000/courses');
    requests.forEach(req => req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' }));
  });
});
