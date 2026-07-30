import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Input() isEnrolledOverride?: boolean;
  @Output() enrollRequested = new EventEmitter<number>();

  public isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('CourseCardComponent ngOnChanges:', {
        previousValue: changes['course'].previousValue,
        currentValue: changes['course'].currentValue
      });
    }
  }

  // Refactored ngClass object binding using a getter: getters keep templates clean and maintainable.
  get cardClasses(): { [key: string]: boolean } {
    const enrolled = this.isEnrolled;
    return {
      'card--enrolled': enrolled,
      'card--full': this.course ? this.course.credits >= 4 : false,
      'expanded': this.isExpanded
    };
  }

  get isEnrolled(): boolean {
    if (this.isEnrolledOverride !== undefined) {
      return this.isEnrolledOverride;
    }
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  get statusColor(): string {
    if (!this.course) return 'grey';
    switch (this.course.gradeStatus) {
      case 'passed': return '#10b981'; // green
      case 'failed': return '#ef4444'; // red
      case 'pending': return '#6b7280'; // grey
      default: return 'grey';
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(event: Event): void {
    event.stopPropagation();
    if (this.course) {
      if (this.isEnrolled) {
        this.enrollmentService.unenroll(this.course.id);
      } else {
        this.enrollmentService.enroll(this.course.id);
      }
      this.enrollRequested.emit(this.course.id);
    }
  }
}
