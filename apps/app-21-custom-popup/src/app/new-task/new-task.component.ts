import { Component, output } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  close = output<void>();

  closePopup(): void {
    this.close.emit();
  }

}
