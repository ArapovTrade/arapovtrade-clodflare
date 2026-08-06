import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSixtyFiveComponent } from './home-en-blog-sixty-five.component';

describe('HomeEnBlogSixtyFiveComponent', () => {
  let component: HomeEnBlogSixtyFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogSixtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSixtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSixtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
