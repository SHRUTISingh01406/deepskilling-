import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  template: `
    <div class="summary-widget">
      <h4>📌 Course Summary Widget</h4>
      <p>Total Courses available via shared service: <strong>{{ courseCount }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    .summary-widget h4 { margin: 0 0 0.5rem 0; color: #0f172a; }
  `]
})
export class CourseSummaryWidgetComponent {
  constructor(private courseService: CourseService) {}

  get courseCount(): number {
    return this.courseService.getCoursesSync().length;
  }
}
