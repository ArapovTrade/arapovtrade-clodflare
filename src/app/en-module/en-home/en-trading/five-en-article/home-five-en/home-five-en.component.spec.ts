import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFiveEnComponent } from './home-five-en.component';

describe('HomeFiveEnComponent', () => {
  let component: HomeFiveEnComponent;
  let fixture: ComponentFixture<HomeFiveEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeFiveEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFiveEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
