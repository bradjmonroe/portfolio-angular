import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedSection } from './animated-section';

describe('AnimatedSection', () => {
  let component: AnimatedSection;
  let fixture: ComponentFixture<AnimatedSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
