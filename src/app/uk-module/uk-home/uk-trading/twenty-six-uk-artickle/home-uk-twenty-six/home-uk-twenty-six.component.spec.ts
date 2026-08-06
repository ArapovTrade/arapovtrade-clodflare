import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentySixComponent } from './home-uk-twenty-six.component';

describe('HomeUkTwentySixComponent', () => {
  let component: HomeUkTwentySixComponent;
  let fixture: ComponentFixture<HomeUkTwentySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
