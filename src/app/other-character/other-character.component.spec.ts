import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCharacterComponent } from './other-character.component';

describe('OtherCharacterComponent', () => {
  let component: OtherCharacterComponent;
  let fixture: ComponentFixture<OtherCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
