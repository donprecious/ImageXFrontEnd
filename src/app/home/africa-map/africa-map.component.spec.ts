import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfricaMapComponent } from './africa-map.component';

describe('AfricaMapComponent', () => {
  let component: AfricaMapComponent;
  let fixture: ComponentFixture<AfricaMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfricaMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfricaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
