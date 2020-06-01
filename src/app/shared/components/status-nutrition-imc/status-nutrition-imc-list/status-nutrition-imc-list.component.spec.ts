import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNutritionImcListComponent } from './status-nutrition-imc-list.component';

describe('StatusNutritionImcListComponent', () => {
  let component: StatusNutritionImcListComponent;
  let fixture: ComponentFixture<StatusNutritionImcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusNutritionImcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusNutritionImcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
