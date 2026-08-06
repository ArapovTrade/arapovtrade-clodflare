import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiveComponent } from './home-ru-blog-onehundred-five.component';

describe('HomeRuBlogOnehundredFiveComponent', () => {
  let component: HomeRuBlogOnehundredFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
