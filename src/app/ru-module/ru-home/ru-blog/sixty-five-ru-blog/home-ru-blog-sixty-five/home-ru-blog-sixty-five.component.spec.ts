import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyFiveComponent } from './home-ru-blog-sixty-five.component';

describe('HomeRuBlogSixtyFiveComponent', () => {
  let component: HomeRuBlogSixtyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
