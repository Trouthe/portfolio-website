import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalSkillsComponent } from './professional-skills.component';

describe('ProfessionalSkillsComponent', () => {
  let component: ProfessionalSkillsComponent;
  let fixture: ComponentFixture<ProfessionalSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionalSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
