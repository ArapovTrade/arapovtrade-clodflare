import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyTwoComponent } from './home-uk-blog-sixty-two.component';

describe('HomeUkBlogSixtyTwoComponent', () => {
  let component: HomeUkBlogSixtyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
