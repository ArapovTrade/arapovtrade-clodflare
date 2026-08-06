import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwohundredComponent } from './home-ru-blog-twohundred.component';

describe('HomeRuBlogTwohundredComponent', () => {
  let component: HomeRuBlogTwohundredComponent;
  let fixture: ComponentFixture<HomeRuBlogTwohundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwohundredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwohundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
