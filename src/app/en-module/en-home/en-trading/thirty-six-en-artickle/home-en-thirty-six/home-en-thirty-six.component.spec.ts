import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtySixComponent } from './home-en-thirty-six.component';

describe('HomeEnThirtySixComponent', () => {
  let component: HomeEnThirtySixComponent;
  let fixture: ComponentFixture<HomeEnThirtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
