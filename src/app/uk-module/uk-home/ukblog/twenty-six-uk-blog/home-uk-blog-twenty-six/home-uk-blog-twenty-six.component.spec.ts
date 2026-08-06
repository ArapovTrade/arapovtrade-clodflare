import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogTwentySixComponent } from './home-uk-blog-twenty-six.component';

describe('HomeUkBlogTwentySixComponent', () => {
  let component: HomeUkBlogTwentySixComponent;
  let fixture: ComponentFixture<HomeUkBlogTwentySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogTwentySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
