import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyFourComponent } from './home-uk-blog-sixty-four.component';

describe('HomeUkBlogSixtyFourComponent', () => {
  let component: HomeUkBlogSixtyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
