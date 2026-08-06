import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiveComponent } from './home-en-blog-onehundred-five.component';

describe('HomeEnBlogOnehundredFiveComponent', () => {
  let component: HomeEnBlogOnehundredFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
