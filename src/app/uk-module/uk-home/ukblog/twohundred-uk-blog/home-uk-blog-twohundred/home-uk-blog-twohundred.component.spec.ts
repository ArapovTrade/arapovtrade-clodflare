import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwohundredComponent } from './home-uk-blog-twohundred.component';

describe('HomeUkBlogTwohundredComponent', () => {
  let component: HomeUkBlogTwohundredComponent;
  let fixture: ComponentFixture<HomeUkBlogTwohundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwohundredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwohundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
