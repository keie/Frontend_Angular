import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalReferenceListComponent } from './personal-reference-list.component';

describe('PersonalReferenceListComponent', () => {
  let component: PersonalReferenceListComponent;
  let fixture: ComponentFixture<PersonalReferenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalReferenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalReferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
