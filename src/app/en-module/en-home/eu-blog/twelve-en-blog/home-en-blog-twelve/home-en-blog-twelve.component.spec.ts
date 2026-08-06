import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwelveComponent } from './home-en-blog-twelve.component';

describe('HomeEnBlogTwelveComponent', () => {
  let component: HomeEnBlogTwelveComponent;
  let fixture: ComponentFixture<HomeEnBlogTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
