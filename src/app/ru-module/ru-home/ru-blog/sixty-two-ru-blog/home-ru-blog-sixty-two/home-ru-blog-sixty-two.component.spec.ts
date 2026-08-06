import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyTwoComponent } from './home-ru-blog-sixty-two.component';

describe('HomeRuBlogSixtyTwoComponent', () => {
  let component: HomeRuBlogSixtyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
