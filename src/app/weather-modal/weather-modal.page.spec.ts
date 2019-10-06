import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherModalPage } from './weather-modal.page';

describe('WeatherModalPage', () => {
  let component: WeatherModalPage;
  let fixture: ComponentFixture<WeatherModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
