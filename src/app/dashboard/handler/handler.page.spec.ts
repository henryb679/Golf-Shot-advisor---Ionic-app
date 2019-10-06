import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerPage } from './handler.page';

describe('HandlerPage', () => {
  let component: HandlerPage;
  let fixture: ComponentFixture<HandlerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
