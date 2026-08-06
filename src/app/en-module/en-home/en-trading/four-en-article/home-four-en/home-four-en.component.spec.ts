import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFourEnComponent } from './home-four-en.component';

describe('HomeFourEnComponent', () => {
  let component: HomeFourEnComponent;
  let fixture: ComponentFixture<HomeFourEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeFourEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFourEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
