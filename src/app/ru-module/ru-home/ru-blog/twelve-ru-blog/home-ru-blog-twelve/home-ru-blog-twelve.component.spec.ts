import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwelveComponent } from './home-ru-blog-twelve.component';

describe('HomeRuBlogTwelveComponent', () => {
  let component: HomeRuBlogTwelveComponent;
  let fixture: ComponentFixture<HomeRuBlogTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
