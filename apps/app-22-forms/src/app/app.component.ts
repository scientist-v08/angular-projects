import { Component } from '@angular/core';
import { QuizFormComponent } from './quizForm/quizForm.component';

@Component({
  standalone: true,
  imports: [QuizFormComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
