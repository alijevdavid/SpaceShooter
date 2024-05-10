import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrecipeItemComponent } from './allrecipe-item.component';

describe('AllrecipeItemComponent', () => {
  let component: AllrecipeItemComponent;
  let fixture: ComponentFixture<AllrecipeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllrecipeItemComponent]
    });
    fixture = TestBed.createComponent(AllrecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
