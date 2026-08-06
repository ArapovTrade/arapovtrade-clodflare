import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogSixtyFourComponent } from './home-ru-blog-sixty-four.component';

describe('HomeRuBlogSixtyFourComponent', () => {
  let component: HomeRuBlogSixtyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogSixtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogSixtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogSixtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
