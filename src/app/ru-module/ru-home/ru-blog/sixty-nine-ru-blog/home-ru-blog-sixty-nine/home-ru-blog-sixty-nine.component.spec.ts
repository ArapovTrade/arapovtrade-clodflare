import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyNineComponent } from './home-ru-blog-sixty-nine.component';

describe('HomeRuBlogSixtyNineComponent', () => {
  let component: HomeRuBlogSixtyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
