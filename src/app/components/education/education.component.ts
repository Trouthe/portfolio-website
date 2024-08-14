import { Component } from '@angular/core';
import educationInformation from './education-info.json';
import { EducationInterface } from './education-interface';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  educationObject: EducationInterface[] = educationInformation;
}
