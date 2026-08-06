import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyEightComponent } from './home-uk-blog-sixty-eight.component';

describe('HomeUkBlogSixtyEightComponent', () => {
  let component: HomeUkBlogSixtyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
