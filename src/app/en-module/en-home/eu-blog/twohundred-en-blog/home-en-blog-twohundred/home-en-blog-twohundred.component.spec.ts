import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwohundredComponent } from './home-en-blog-twohundred.component';

describe('HomeEnBlogTwohundredComponent', () => {
  let component: HomeEnBlogTwohundredComponent;
  let fixture: ComponentFixture<HomeEnBlogTwohundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwohundredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwohundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
