import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count',
  standalone: true,
  template: ` <h3>Count in child component: {{ Counter() }}</h3> `,
})
export class ChildComponent {
  Counter = input.required<number>();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h2>Zoneless Change Detection</h2>
    <app-count [Counter]="Counter"></app-count>
    <button (mousedown)="CountIncrement()">Add Count</button>
    <h2>Zones code: broken code</h2>
    <div>Counter 2: {{ counter2 }}</div>
  `,
})
export class AppComponent implements OnInit {
  Counter = 0;
  counter2 = 0;

  CountIncrement() {
    this.Counter = this.Counter + 1;
  }

  ngOnInit() {
    setInterval(() => {
      this.counter2 += 1;
    }, 1000);
  }
}
