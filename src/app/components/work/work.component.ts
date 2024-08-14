import { Component } from '@angular/core';
import workInformation from './work-info.json'
import { WorkInterface } from './work-interface';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  workObject: WorkInterface[] = workInformation;
}
