import { Component, computed, signal } from "@angular/core";
import { DUMMY_USERS } from "../dummy-users";
import { TaskComponent } from "./task/task.component";
import { dummyTasks } from "../dummy-tasks";

@Component({
  standalone: true,
  imports: [TaskComponent],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users = signal(DUMMY_USERS);
  selectedUserName = signal<string>(this.users()[0].name);
  tasks = signal(dummyTasks);
  selectedTask = computed(() => {
    return this.tasks().filter((task) => task.name === this.selectedUserName())
  });

  onSelectedUser(name: string): void {
    this.selectedUserName.set(name);
  }

}
