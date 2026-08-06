import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtyOneComponent } from './home-uk-blog-sixty-one.component';

describe('HomeUkBlogSixtyOneComponent', () => {
  let component: HomeUkBlogSixtyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
