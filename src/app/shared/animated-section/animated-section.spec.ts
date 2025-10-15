import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedSectionComponent } from './animated-section';

describe('AnimatedSection', () => {
  let component: AnimatedSectionComponent;
  let fixture: ComponentFixture<AnimatedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
