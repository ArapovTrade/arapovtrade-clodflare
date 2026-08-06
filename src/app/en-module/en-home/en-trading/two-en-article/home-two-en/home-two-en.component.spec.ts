import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTwoEnComponent } from './home-two-en.component';

describe('HomeTwoEnComponent', () => {
  let component: HomeTwoEnComponent;
  let fixture: ComponentFixture<HomeTwoEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTwoEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTwoEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
