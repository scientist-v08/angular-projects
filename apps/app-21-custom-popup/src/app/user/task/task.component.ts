import { Component, input, signal } from "@angular/core";
import { TasksInterface } from "../../model/task.model";
import { DatePipe } from "@angular/common";
import { NewTaskComponent } from "../../new-task/new-task.component";

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [DatePipe,NewTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  selectedUserName = input.required<string>();
  selectedUserTasks = input.required<TasksInterface[] | undefined>();
  addTask = signal<boolean>(false);

  showAddTaskPopup(): void {
    this.addTask.set(true);
  }

  closePopup(): void {
    this.addTask.set(false);
  }

}
