import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrecipeListComponent } from './allrecipe-list.component';

describe('AllrecipeListComponent', () => {
  let component: AllrecipeListComponent;
  let fixture: ComponentFixture<AllrecipeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllrecipeListComponent]
    });
    fixture = TestBed.createComponent(AllrecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
