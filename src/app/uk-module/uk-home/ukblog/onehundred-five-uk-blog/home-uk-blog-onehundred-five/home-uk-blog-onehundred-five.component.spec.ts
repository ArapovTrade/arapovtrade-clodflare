import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiveComponent } from './home-uk-blog-onehundred-five.component';

describe('HomeUkBlogOnehundredFiveComponent', () => {
  let component: HomeUkBlogOnehundredFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
