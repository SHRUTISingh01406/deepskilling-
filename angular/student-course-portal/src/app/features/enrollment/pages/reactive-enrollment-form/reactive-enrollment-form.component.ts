import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../../services/course.service';
import { ComponentWithForm } from '../../../../guards/unsaved-changes.guard';

// Custom Synchronous Validator: rejects course codes starting with 'XX'
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '');
  if (value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom Async Validator: simulates server check for email availability after 800ms
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = String(control.value || '');
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit, ComponentWithForm {
  public enrollForm!: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Apply async validator simulateEmailCheck as third parameter
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Typed getter for FormArray: better than casting in template to maintain strict type safety and clean HTML
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  isFormDirty(): boolean {
    return this.enrollForm ? this.enrollForm.dirty && !this.submitted : false;
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      /*
      Difference between enrollForm.value and enrollForm.getRawValue():
      - enrollForm.value: Returns an object containing values of enabled controls only (excludes disabled controls).
      - enrollForm.getRawValue(): Returns an object containing values of all controls, regardless of disabled status.
      */
      console.log('enrollForm.value (enabled controls):', this.enrollForm.value);
      console.log('enrollForm.getRawValue() (all controls):', this.enrollForm.getRawValue());
      this.submitted = true;
    }
  }
}
