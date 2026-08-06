import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyEightComponent } from './home-ru-blog-sixty-eight.component';

describe('HomeRuBlogSixtyEightComponent', () => {
  let component: HomeRuBlogSixtyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
