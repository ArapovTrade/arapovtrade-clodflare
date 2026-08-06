import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentySixComponent } from './home-en-twenty-six.component';

describe('HomeEnTwentySixComponent', () => {
  let component: HomeEnTwentySixComponent;
  let fixture: ComponentFixture<HomeEnTwentySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
