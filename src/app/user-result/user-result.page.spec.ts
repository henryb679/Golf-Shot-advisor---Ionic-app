import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultPage } from './user-result.page';

describe('UserResultPage', () => {
  let component: UserResultPage;
  let fixture: ComponentFixture<UserResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
