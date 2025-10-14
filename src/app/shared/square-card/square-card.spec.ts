import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareCard } from './square-card';

describe('SquareCard', () => {
  let component: SquareCard;
  let fixture: ComponentFixture<SquareCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
