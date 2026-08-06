import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtySixComponent } from './home-ru-thirty-six.component';

describe('HomeRuThirtySixComponent', () => {
  let component: HomeRuThirtySixComponent;
  let fixture: ComponentFixture<HomeRuThirtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
