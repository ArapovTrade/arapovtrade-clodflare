import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtyoneComponent } from './home-uk-blog-onehundred-sixtyone.component';

describe('HomeUkBlogOnehundredSixtyoneComponent', () => {
  let component: HomeUkBlogOnehundredSixtyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
