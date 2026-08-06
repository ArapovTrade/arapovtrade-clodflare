import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnStudyingHomeComponent } from './en-studying-home.component';

describe('EnStudyingHomeComponent', () => {
  let component: EnStudyingHomeComponent;
  let fixture: ComponentFixture<EnStudyingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnStudyingHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnStudyingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
