import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherbycityComponent } from './weatherbycity.component';

describe('WeatherbycityComponent', () => {
  let component: WeatherbycityComponent;
  let fixture: ComponentFixture<WeatherbycityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherbycityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherbycityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
