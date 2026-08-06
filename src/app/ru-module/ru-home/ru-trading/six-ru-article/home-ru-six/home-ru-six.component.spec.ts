import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuSixComponent } from './home-ru-six.component';

describe('HomeRuSixComponent', () => {
  let component: HomeRuSixComponent;
  let fixture: ComponentFixture<HomeRuSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
