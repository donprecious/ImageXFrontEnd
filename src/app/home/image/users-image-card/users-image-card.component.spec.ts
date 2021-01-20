import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersImageCardComponent } from './users-image-card.component';

describe('UsersImageCardComponent', () => {
  let component: UsersImageCardComponent;
  let fixture: ComponentFixture<UsersImageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersImageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
