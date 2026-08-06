import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyFiveComponent } from './home-ru-blog-fourty-five.component';

describe('HomeRuBlogFourtyFiveComponent', () => {
  let component: HomeRuBlogFourtyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
