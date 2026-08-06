import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyFiveComponent } from './home-uk-blog-sixty-five.component';

describe('HomeUkBlogSixtyFiveComponent', () => {
  let component: HomeUkBlogSixtyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
