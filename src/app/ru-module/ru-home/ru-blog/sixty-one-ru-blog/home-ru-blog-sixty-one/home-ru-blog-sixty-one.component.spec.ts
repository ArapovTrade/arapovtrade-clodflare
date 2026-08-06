import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyOneComponent } from './home-ru-blog-sixty-one.component';

describe('HomeRuBlogSixtyOneComponent', () => {
  let component: HomeRuBlogSixtyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
