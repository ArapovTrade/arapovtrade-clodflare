import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkStudyingHomeComponent } from './uk-studying-home.component';

describe('UkStudyingHomeComponent', () => {
  let component: UkStudyingHomeComponent;
  let fixture: ComponentFixture<UkStudyingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UkStudyingHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkStudyingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
