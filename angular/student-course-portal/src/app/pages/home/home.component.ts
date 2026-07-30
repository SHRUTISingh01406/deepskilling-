import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { NotificationComponent } from '../../components/notification/notification.component';

/*
Difference between property binding [property] and two-way binding [(ngModel)]:
- [property]: One-way binding (Component -> DOM). Data flows from the component class to target DOM properties. Changes in the DOM do not update the component property.
- [(ngModel)]: Two-way binding (DOM <-> Component). Shorthand for [ngModel]="prop" (ngModelChange)="prop=$event". Data flows automatically in both directions when either component state or input element value changes.
*/

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  public portalName = 'Student Course Portal';
  public isPortalActive = true;
  public message = '';
  public searchTerm = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // ngOnInit fires once after the component's inputs are first set — use it for data fetching, not the constructor.
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    // ngOnDestroy is critical for unsubscribing from Observables and clearing timers — forgetting it causes memory leaks in long-running SPAs.
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  get availableCoursesCount(): number {
    return this.courseService.getCoursesSync().length;
  }
}
