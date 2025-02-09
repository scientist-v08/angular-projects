import { Component } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faLinesLeaning, faListUl, faMoneyBill, faTags } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './main.component.html'
})
export class MainComponent {
  faList = faListUl;
  faTacos = faLinesLeaning;
  faMoney = faMoneyBill;
  faTags = faTags;
}
