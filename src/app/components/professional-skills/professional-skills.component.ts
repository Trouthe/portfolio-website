import { Component } from '@angular/core';

interface Skills {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-professional-skills',
  standalone: true,
  imports: [],
  templateUrl: './professional-skills.component.html',
  styleUrl: './professional-skills.component.scss',
})
export class ProfessionalSkillsComponent {
  professionalSkills: Skills[] = [
    {
      // image: '⚡',
      image: '/assets/emojies/high-voltage.png',
      title: 'Rapid Decision-Making',
      description:
        'Quickly assesses situations, weighing options to make effective decisions under pressure.',
    },
    {
      // image: '💬',
      image: '/assets/emojies/speech-balloon.png',
      title: 'Communication',
      description:
        'Effectively convey ideas and information, ensuring clarity and understanding in both written and verbal exchanges.',
    },
    {
      // image: '🧘',
      image: '/assets/emojies/mental.png',
      title: 'Mental Resilience',
      description:
        'Maintain composure and focus under pressure, effectively managing stress and emotions to navigate challenges with a clear mind.',
    },
    {
      // image: '🔄',
      image: '/assets/emojies/adaptation.png',
      title: 'Adaptability',
      description:
        'Adapt quickly to changing environments and evolving situations, embracing new challenges and solutions with ease.',
    },
    {
      // image: '📚',
      image: '/assets/emojies/books.png',
      title: 'Learning',
      description:
        'Proactively seeking out new knowledge and skills, staying updated and adaptable in a constantly evolving landscape.',
    },
    {
      // image: '🧠',
      image: '/assets/emojies/brain.png',
      title: 'Critical Thinking',
      description:
        'Analyze situations logically, evaluate evidence and perspectives to make informed, well-reasoned decisions.',
    },
  ];
}
