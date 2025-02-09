import { Component } from '@angular/core';
import { OneComponent } from './component-one/component-one.component';
import { TwoComponent } from './component-two/component-two.component';
import { ThreeComponent } from './component-three/component-three.component';
import { FourComponent } from './component-four/component-four.component';

@Component({
  standalone: true,
  imports: [OneComponent, TwoComponent, ThreeComponent, FourComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
