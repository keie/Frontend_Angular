import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNutritionGeneralListComponent } from './status-nutrition-general-list.component';

describe('StatusNutritionGeneralListComponent', () => {
  let component: StatusNutritionGeneralListComponent;
  let fixture: ComponentFixture<StatusNutritionGeneralListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusNutritionGeneralListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNutritionGeneralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
