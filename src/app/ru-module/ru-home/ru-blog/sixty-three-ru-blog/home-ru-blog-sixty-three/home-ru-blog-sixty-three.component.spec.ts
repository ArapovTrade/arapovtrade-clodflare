import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyThreeComponent } from './home-ru-blog-sixty-three.component';

describe('HomeRuBlogSixtyThreeComponent', () => {
  let component: HomeRuBlogSixtyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
