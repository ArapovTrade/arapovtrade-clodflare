import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuStudyingHomeComponent } from './ru-studying-home.component';

describe('RuStudyingHomeComponent', () => {
  let component: RuStudyingHomeComponent;
  let fixture: ComponentFixture<RuStudyingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuStudyingHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuStudyingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
