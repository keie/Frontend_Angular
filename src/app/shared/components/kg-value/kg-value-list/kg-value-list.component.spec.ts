import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KgValueListComponent } from './kg-value-list.component';

describe('KgValueListComponent', () => {
  let component: KgValueListComponent;
  let fixture: ComponentFixture<KgValueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KgValueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KgValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
