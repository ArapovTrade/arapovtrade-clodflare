import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtySevenComponent } from './home-ru-blog-sixty-seven.component';

describe('HomeRuBlogSixtySevenComponent', () => {
  let component: HomeRuBlogSixtySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
