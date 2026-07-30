import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {
  public studentName = '';
  public studentEmail = '';
  public courseId: number | null = null;
  public preferredSemester = 'Odd';
  public agreeToTerms = false;

  public submitted = false;

  constructor(private courseService: CourseService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Template-Driven Form submitted value:', form.value);
      console.log('Form validity:', form.valid);
      this.submitted = true;

      if (this.courseId) {
        this.courseService.createCourse({
          name: `Course ${this.courseId}`,
          code: `CS${this.courseId}`,
          credits: 3,
          gradeStatus: 'pending'
        }).subscribe();
      }
    }
  }

  onReset(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd'
    });
    this.submitted = false;
  }
}
