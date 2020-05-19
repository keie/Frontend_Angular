import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeValueListComponent } from './size-value-list.component';

describe('SizeValueListComponent', () => {
  let component: SizeValueListComponent;
  let fixture: ComponentFixture<SizeValueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeValueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
