import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkSixComponent } from './home-uk-six.component';

describe('HomeUkSixComponent', () => {
  let component: HomeUkSixComponent;
  let fixture: ComponentFixture<HomeUkSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
