import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtySixComponent } from './home-ru-fourty-six.component';

describe('HomeRuFourtySixComponent', () => {
  let component: HomeRuFourtySixComponent;
  let fixture: ComponentFixture<HomeRuFourtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
