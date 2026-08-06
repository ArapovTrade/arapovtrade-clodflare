import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentySixComponent } from './home-ru-twenty-six.component';

describe('HomeRuTwentySixComponent', () => {
  let component: HomeRuTwentySixComponent;
  let fixture: ComponentFixture<HomeRuTwentySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
