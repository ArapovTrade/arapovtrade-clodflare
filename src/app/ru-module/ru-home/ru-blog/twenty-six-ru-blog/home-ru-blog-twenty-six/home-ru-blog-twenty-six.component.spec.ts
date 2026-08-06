import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogTwentySixComponent } from './home-ru-blog-twenty-six.component';

describe('HomeRuBlogTwentySixComponent', () => {
  let component: HomeRuBlogTwentySixComponent;
  let fixture: ComponentFixture<HomeRuBlogTwentySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogTwentySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogTwentySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
