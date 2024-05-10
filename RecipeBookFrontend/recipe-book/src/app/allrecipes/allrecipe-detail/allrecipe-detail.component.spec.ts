import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrecipeDetailComponent } from './allrecipe-detail.component';

describe('AllrecipeDetailComponent', () => {
  let component: AllrecipeDetailComponent;
  let fixture: ComponentFixture<AllrecipeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllrecipeDetailComponent]
    });
    fixture = TestBed.createComponent(AllrecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
