import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

type FormAnswers = FormGroup<{
  text: FormControl<string>;
}>;

type FormQuestions = FormGroup<{
  questionName: FormControl<string>;
  answers: FormArray<FormAnswers>;
}>;

type Form = FormGroup<{
  questions: FormArray<FormQuestions>;
}>;

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quizForm.component.html',
  styleUrls: ['./quizForm.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class QuizFormComponent {
  fb = inject(NonNullableFormBuilder);
  quizForm: Form = this.fb.group({
    questions: this.fb.array<FormQuestions>([this.generateQuestion()]),
  });

  generateQuestion(): FormQuestions {
    return this.fb.group({
      questionName: '',
      answers: this.fb.array<FormAnswers>([]),
    });
  }

  addQuestion(): void {
    this.quizForm.controls.questions.push(this.generateQuestion());
  }

  removeQuestion(index: number): void {
    this.quizForm.controls.questions.removeAt(index);
  }

  addAnswer(index: number): void {
    const newAnswers: FormAnswers = this.fb.group({
      text: '',
    });
    this.quizForm.controls.questions
      .at(index)
      .controls.answers.push(newAnswers);
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.quizForm.controls.questions
      .at(questionIndex)
      .controls.answers.removeAt(answerIndex);
  }

  onSubmit(): void {
    console.log(this.quizForm.getRawValue());
  }
}
