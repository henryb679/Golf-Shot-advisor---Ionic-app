import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAdvisorPage } from './start-advisor.page';

describe('StartAdvisorPage', () => {
  let component: StartAdvisorPage;
  let fixture: ComponentFixture<StartAdvisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartAdvisorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAdvisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
