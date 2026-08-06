import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightyeightComponent } from './home-en-blog-onehundred-eightyeight.component';

describe('HomeEnBlogOnehundredEightyeightComponent', () => {
  let component: HomeEnBlogOnehundredEightyeightComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
