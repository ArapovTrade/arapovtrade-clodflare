import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyNineComponent } from './home-en-blog-sixty-nine.component';

describe('HomeEnBlogSixtyNineComponent', () => {
  let component: HomeEnBlogSixtyNineComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
