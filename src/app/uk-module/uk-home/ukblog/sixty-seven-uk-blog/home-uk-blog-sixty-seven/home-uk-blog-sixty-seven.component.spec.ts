import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogSixtySevenComponent } from './home-uk-blog-sixty-seven.component';

describe('HomeUkBlogSixtySevenComponent', () => {
  let component: HomeUkBlogSixtySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogSixtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogSixtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogSixtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
