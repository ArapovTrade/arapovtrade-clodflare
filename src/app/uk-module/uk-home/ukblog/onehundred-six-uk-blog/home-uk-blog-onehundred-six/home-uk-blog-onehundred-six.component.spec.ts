import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixComponent } from './home-uk-blog-onehundred-six.component';

describe('HomeUkBlogOnehundredSixComponent', () => {
  let component: HomeUkBlogOnehundredSixComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
