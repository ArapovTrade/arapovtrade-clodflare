import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtyComponent } from './home-uk-blog-onehundred-sixty.component';

describe('HomeUkBlogOnehundredSixtyComponent', () => {
  let component: HomeUkBlogOnehundredSixtyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
